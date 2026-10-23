import "server-only";

import { cache } from "react";

import { query, queryOne } from "@/lib/db";
import { intakeList, recordedValue } from "@/lib/recordValue";

/*
 * Facts for a university page, read from the courses and info we hold
 * for it: how many live courses, their levels, durations, intakes and
 * IELTS scores as written in the course records, the main course areas,
 * the university's own website when one is stored, and the date of the
 * newest record. Nothing is estimated or converted: fees are left to
 * the course pages, where their basis is shown.
 */

function clean(value) {
    return String(value ?? "").replace(/\s+/g, " ").trim();
}

function websiteFrom(value) {
    const text = clean(value);

    if (!text) return "";

    const url = /^https?:\/\//i.test(text) ? text : /^www\.[^\s/]+\.[a-z]{2,}/i.test(text) ? `https://${text}` : "";

    try {
        return url ? new URL(url).toString() : "";
    } catch {
        return "";
    }
}

export const getUniversityFacts = cache(async (universityId) => {
    const id = clean(universityId);

    if (!/^\d+$/.test(id)) {
        return null;
    }

    try {
        const [courses, info, university] = await Promise.all([
            query(
                `SELECT c.level, c.duration, c.intakes, c.ielts, c.created_at, m.name AS area
                 FROM tb_courses c
                 LEFT JOIN tb_main_course m ON m.id = c.c_id
                 WHERE c.u_id = ? AND c.status = '1'`,
                [id]
            ),
            query("SELECT type, text, created_at FROM tb_university_info WHERE u_id = ? AND status = '1'", [id]),
            queryOne("SELECT * FROM tb_universities WHERE id = ?", [id]),
        ]);

        const tally = (values) => {
            const counts = new Map();

            // Placeholders ("-", "0", "N/A", "none") are not values.
            for (const value of values.map(recordedValue).filter(Boolean)) {
                const key = value.toLowerCase();
                const entry = counts.get(key) ?? { value, n: 0 };

                entry.n += 1;
                counts.set(key, entry);
            }

            return [...counts.values()].sort((a, b) => b.n - a.n).map((entry) => entry.value);
        };

        // One entry per month in calendar order, placeholders dropped.
        const intakes = intakeList(courses.map((course) => course.intakes)).filter((value) => value.length <= 20);

        const ielts = courses
            .map((course) => Number.parseFloat(clean(course.ielts)))
            .filter((score) => Number.isFinite(score) && score > 0 && score <= 9);

        const website =
            websiteFrom(university?.website) ||
            websiteFrom(university?.website_url) ||
            websiteFrom(
                info.find((item) => ["website", "official website", "web", "url"].includes(clean(item.type).toLowerCase()))?.text
            );

        const dates = [university?.created_at, ...courses.map((course) => course.created_at), ...info.map((item) => item.created_at)]
            .map((value) => (value instanceof Date ? value : value ? new Date(String(value).replace(" ", "T")) : null))
            .filter((value) => value && !Number.isNaN(value.getTime()));

        return {
            courses: courses.length,
            levels: tally(courses.map((course) => course.level)).slice(0, 4),
            durations: tally(courses.map((course) => course.duration)).slice(0, 4),
            intakes: intakes.slice(0, 6),
            areas: tally(courses.map((course) => course.area)).slice(0, 4),
            ieltsMin: ielts.length ? Math.min(...ielts) : null,
            ieltsMax: ielts.length ? Math.max(...ielts) : null,
            location: clean(university?.location) || null,
            website: website || null,
            // Recorded yes or no flags, used to link the matching guides.
            withoutIelts: ["yes", "1", "true"].includes(clean(university?.without_ielts).toLowerCase()),
            scholarship: ["yes", "1", "true"].includes(clean(university?.scholarship).toLowerCase()),
            latest: dates.length ? new Date(Math.max(...dates.map((date) => date.getTime()))) : null,
        };
    } catch (error) {
        console.error("University facts could not be loaded:", error);

        return null;
    }
});
