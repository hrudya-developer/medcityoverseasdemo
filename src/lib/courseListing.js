import "server-only";

import { cache } from "react";

import { listCourses } from "@/lib/courseIndex";
import { query } from "@/lib/db";

/*
 * The most recently added courses, with the fields the course finder
 * page shows in its server-rendered list. Addresses come from the
 * course index, so every link opens a live course page. Empty fields
 * stay null so the page can show "Not recorded".
 */
export const getLatestCourses = cache(async (limit = 24) => {
    try {
        const all = await listCourses();
        const latest = all.slice(-limit).reverse();

        if (!latest.length) {
            return { total: 0, courses: [] };
        }

        const rows = await query(
            `SELECT c.id, c.level, c.duration, c.intakes, d.country
             FROM tb_courses c
             JOIN tb_universities u ON u.id = c.u_id
             LEFT JOIN tb_destinations d ON d.id = u.d_id
             WHERE c.id IN (?)`,
            [latest.map((course) => course.id)]
        );

        const byId = new Map(rows.map((row) => [String(row.id), row]));
        const text = (value) => {
            const clean = String(value ?? "").replace(/\s+/g, " ").trim();

            return clean || null;
        };

        return {
            total: all.length,
            courses: latest.map((course) => {
                const row = byId.get(course.id) ?? {};

                return {
                    id: course.id,
                    slug: course.slug,
                    name: text(course.course),
                    university: text(course.university),
                    country: text(row.country),
                    level: text(row.level),
                    duration: text(row.duration),
                    intakes: text(row.intakes),
                };
            }),
        };
    } catch (error) {
        console.error("Latest courses could not be loaded:", error);

        return { total: 0, courses: [] };
    }
});
