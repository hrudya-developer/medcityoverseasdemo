import "server-only";

import { cache } from "react";

import { createPublicCourseHref } from "@/lib/courseSlug";
import { query } from "@/lib/db";
import { countrySlug } from "@/lib/sitemapData";
import { createUniversityPublicHref } from "@/lib/universitySlug";

/*
 * Database reads for the keyword landing pages (nursing, without IELTS,
 * after 12th, scholarships). Every value is shown as recorded: an empty
 * field becomes null so the page prints "Not recorded", a fee of 0 is a
 * missing value, and nothing is converted (no yearly fees from course
 * fees, no percentages from grades).
 */

export const NOT_RECORDED = "Not recorded";

function text(value) {
    const clean = String(value ?? "")
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/\s+/g, " ")
        .trim();

    return clean && !/^(-|null|n\/a|na|0+(\.0+)?)$/i.test(clean) ? clean : null;
}

/** "Yes", "No" or null (unknown) from a recorded yes or no field. */
export function yesNo(value) {
    const clean = String(value ?? "").trim().toLowerCase();

    if (["yes", "1", "true", "y"].includes(clean)) return "Yes";
    if (["no", "0", "false", "n"].includes(clean)) return "No";

    return null;
}

/** The fee exactly as recorded, with its currency when one is stored. */
export function recordedFee(fees, currency) {
    const amount = text(fees);

    if (!amount) return null;

    const unit = text(currency);

    return unit ? `${unit} ${amount}` : `${amount} (currency not recorded)`;
}

const COURSE_COLUMNS = `
    c.id, c.course, c.level, c.duration, c.intakes, c.deadline, c.entryrequirement,
    c.fees, c.currency, c.ielts, c.ieltsless, c.pte, c.pteless, c.toefl, c.toeflless, c.duolingo,
    c.created_at AS course_created,
    u.id AS university_id, u.name AS university, u.location, u.without_ielts, u.scholarship,
    u.applicationfeewaiver, u.created_at AS university_created,
    d.id AS country_id, d.country`;

function courseRow(row) {
    return {
        id: String(row.id),
        course: text(row.course) ?? "Course",
        href: createPublicCourseHref({ course: row.course, university: row.university }),
        level: text(row.level),
        duration: text(row.duration),
        intakes: text(row.intakes),
        deadline: text(row.deadline),
        entry: text(row.entryrequirement),
        fee: recordedFee(row.fees, row.currency),
        ielts: text(row.ielts),
        ieltsLess: text(row.ieltsless),
        pte: text(row.pte),
        pteLess: text(row.pteless),
        toefl: text(row.toefl),
        toeflLess: text(row.toeflless),
        duolingo: text(row.duolingo),
        university: text(row.university) ?? "University",
        universityHref: createUniversityPublicHref({ name: row.university }),
        location: text(row.location),
        withoutIelts: yesNo(row.without_ielts),
        scholarship: yesNo(row.scholarship),
        feeWaiver: yesNo(row.applicationfeewaiver),
        country: text(row.country),
        countrySlug: row.country ? countrySlug(row.country) : "",
        updated: row.course_created || row.university_created || null,
    };
}

async function safeQuery(label, sql, params = []) {
    try {
        return await query(sql, params);
    } catch (error) {
        console.error(`${label} could not be loaded:`, error);

        return [];
    }
}

/** Live courses whose name mentions nursing, with their university and country. */
export const getNursingCourses = cache(async () => {
    const rows = await safeQuery(
        "Nursing courses",
        `SELECT ${COURSE_COLUMNS}
         FROM tb_courses c
         JOIN tb_universities u ON u.id = c.u_id
         LEFT JOIN tb_destinations d ON d.id = u.d_id
         WHERE c.status = '1' AND u.status = '1' AND (d.id IS NULL OR d.status = '1')
           AND c.course LIKE '%nursing%'
         ORDER BY d.order ASC, u.name ASC, c.course ASC
         LIMIT 400`
    );

    return rows.map(courseRow);
});

/** Masters level nursing courses at UK universities. */
export const getUkNursingMasters = cache(async () => {
    const courses = await getNursingCourses();

    return courses.filter(
        (row) =>
            row.countrySlug === "uk" &&
            (/\b(msc|ma|mres|masters?|postgraduate|pg)\b/i.test(row.course) || /master|postgraduate|\bpg\b/i.test(row.level ?? ""))
    );
});

/** Nursing courses grouped by country: [{ country, slug, courses: [...] }]. */
export function groupByCountry(courses) {
    const groups = new Map();

    for (const course of courses) {
        const key = course.country ?? NOT_RECORDED;
        const group = groups.get(key) ?? { country: key, slug: course.countrySlug, courses: [] };

        group.courses.push(course);
        groups.set(key, group);
    }

    return [...groups.values()];
}

/*
 * Universities recorded as accepting students without IELTS, and
 * courses that record a lower IELTS, PTE or TOEFL score or a Duolingo
 * score, so a reader can see the options and check each course page.
 */
export const getWithoutIeltsOptions = cache(async () => {
    const [universities, courses] = await Promise.all([
        safeQuery(
            "Universities without IELTS",
            `SELECT u.id, u.name, u.location, u.without_ielts, u.created_at, d.country,
                    (SELECT COUNT(*) FROM tb_courses c WHERE c.u_id = u.id AND c.status = '1') AS courses
             FROM tb_universities u
             LEFT JOIN tb_destinations d ON d.id = u.d_id
             WHERE u.status = '1' AND (d.id IS NULL OR d.status = '1')
             ORDER BY d.order ASC, u.name ASC`
        ),
        safeQuery(
            "Courses with other English options",
            `SELECT ${COURSE_COLUMNS}
             FROM tb_courses c
             JOIN tb_universities u ON u.id = c.u_id
             LEFT JOIN tb_destinations d ON d.id = u.d_id
             WHERE c.status = '1' AND u.status = '1' AND (d.id IS NULL OR d.status = '1')
               AND (TRIM(COALESCE(c.ieltsless, '')) NOT IN ('', '-', '0')
                 OR TRIM(COALESCE(c.pteless, '')) NOT IN ('', '-', '0')
                 OR TRIM(COALESCE(c.toeflless, '')) NOT IN ('', '-', '0')
                 OR TRIM(COALESCE(c.duolingo, '')) NOT IN ('', '-', '0'))
             ORDER BY d.order ASC, u.name ASC, c.course ASC
             LIMIT 200`
        ),
    ]);

    const flagged = universities
        .filter((row) => yesNo(row.without_ielts) === "Yes")
        .map((row) => ({
            id: String(row.id),
            name: text(row.name) ?? "University",
            href: createUniversityPublicHref({ name: row.name }),
            location: text(row.location),
            country: text(row.country),
            countrySlug: row.country ? countrySlug(row.country) : "",
            courses: Number(row.courses) || 0,
        }));

    return {
        universities: flagged,
        universitiesChecked: universities.length,
        courses: courses.map(courseRow),
    };
});

/** Universities with the scholarship and application fee waiver flags as recorded. */
export const getScholarshipUniversities = cache(async () => {
    const [rows, deadlines] = await Promise.all([
        safeQuery(
            "Scholarship universities",
            `SELECT u.id, u.name, u.location, u.scholarship, u.applicationfeewaiver, u.created_at, d.country,
                    (SELECT COUNT(*) FROM tb_courses c WHERE c.u_id = u.id AND c.status = '1') AS courses
             FROM tb_universities u
             LEFT JOIN tb_destinations d ON d.id = u.d_id
             WHERE u.status = '1' AND (d.id IS NULL OR d.status = '1')
             ORDER BY d.order ASC, u.name ASC`
        ),
        safeQuery(
            "Course deadlines",
            `SELECT c.u_id, COUNT(*) AS n
             FROM tb_courses c
             WHERE c.status = '1' AND TRIM(COALESCE(c.deadline, '')) NOT IN ('', '-', '0')
             GROUP BY c.u_id`
        ),
    ]);

    const withDeadline = new Map(deadlines.map((row) => [String(row.u_id), Number(row.n) || 0]));

    const all = rows.map((row) => ({
        id: String(row.id),
        name: text(row.name) ?? "University",
        href: createUniversityPublicHref({ name: row.name }),
        location: text(row.location),
        country: text(row.country),
        countrySlug: row.country ? countrySlug(row.country) : "",
        scholarship: yesNo(row.scholarship),
        feeWaiver: yesNo(row.applicationfeewaiver),
        courses: Number(row.courses) || 0,
        deadlines: withDeadline.get(String(row.id)) ?? 0,
    }));

    return {
        universities: all.filter((row) => row.scholarship === "Yes" || row.feeWaiver === "Yes"),
        universitiesChecked: all.length,
    };
});

/*
 * Undergraduate (bachelor, diploma, foundation) courses we list, counted
 * by country, for the after 12th page.
 */
export const getUndergraduateByCountry = cache(async () => {
    const rows = await safeQuery(
        "Undergraduate courses",
        `SELECT d.id, d.country,
                COUNT(c.id) AS courses,
                COUNT(DISTINCT u.id) AS universities,
                GROUP_CONCAT(DISTINCT c.level ORDER BY c.level SEPARATOR '|') AS levels
         FROM tb_courses c
         JOIN tb_universities u ON u.id = c.u_id
         JOIN tb_destinations d ON d.id = u.d_id
         WHERE c.status = '1' AND u.status = '1' AND d.status = '1'
           AND (c.level LIKE '%bachelor%' OR c.level LIKE '%undergrad%' OR c.level LIKE '%diploma%'
             OR c.level LIKE '%foundation%' OR c.course LIKE 'BSc%' OR c.course LIKE 'B.Sc%' OR c.course LIKE 'BA %'
             OR c.course LIKE 'Bachelor%')
         GROUP BY d.id, d.country
         ORDER BY d.order ASC`
    );

    return rows.map((row) => ({
        id: String(row.id),
        country: text(row.country) ?? NOT_RECORDED,
        slug: countrySlug(row.country),
        courses: Number(row.courses) || 0,
        universities: Number(row.universities) || 0,
        levels: String(row.levels ?? "")
            .split("|")
            .map(text)
            .filter(Boolean)
            .slice(0, 4),
    }));
});

/** The live destinations (id, country, slug) for country links. */
export const getLiveDestinations = cache(async () => {
    const rows = await safeQuery(
        "Destinations",
        `SELECT d.id, d.country,
                (SELECT COUNT(*) FROM tb_universities u WHERE u.d_id = d.id AND u.status = '1') AS universities
         FROM tb_destinations d WHERE d.status = '1' ORDER BY d.order ASC`
    );

    return rows
        .map((row) => ({ id: String(row.id), country: text(row.country), slug: countrySlug(row.country), universities: Number(row.universities) || 0 }))
        .filter((row) => row.country && row.slug);
});
