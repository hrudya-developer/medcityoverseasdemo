import "server-only";

import { unstable_cache } from "next/cache";
import { cache } from "react";

import { createPublicCourseHref } from "@/lib/courseSlug";
import { query } from "@/lib/db";
import { isNo, isYes, recordedValue, YES_VALUES } from "@/lib/recordValue";
import { countrySlug } from "@/lib/slug";
import { createUniversityPublicHref } from "@/lib/universitySlug";

/*
 * Database reads for the keyword landing pages (nursing, without IELTS,
 * after 12th, scholarships). Every value is shown as recorded: an empty
 * or placeholder field becomes null so the page prints "Not recorded",
 * and nothing is converted (no yearly fees from course fees, no
 * percentages from grades).
 *
 * Each read is cached for an hour with unstable_cache, like
 * lib/germanPrograms.js. The cached function throws on a database
 * error, so a failure is never cached; the exported getter then
 * returns { error: true } and the page shows a "could not load" line.
 */

export const NOT_RECORDED = "Not recorded";

const REVALIDATE = 3600;
const TAGS = ["landing-pages"];

// "yes", "y", "1", "true" in any case, for SQL: LOWER(TRIM(field)) IN (...)
const YES_SQL = YES_VALUES.map(() => "?").join(", ");

function text(value) {
    return recordedValue(String(value ?? "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ")) || null;
}

/** "Yes", "No" or null (unknown) from a recorded yes or no field. */
export function yesNo(value) {
    if (isYes(value)) return "Yes";
    if (isNo(value)) return "No";

    return null;
}

/** The fee exactly as recorded, with its currency when one is stored. */
export function recordedFee(fees, currency) {
    const amount = text(fees);

    if (!amount) return null;

    const unit = text(currency);

    return unit ? `${unit} ${amount}` : `${amount} (currency not recorded)`;
}

// Shared with lib/courseGuideData.js, which reads the same course rows.
export const COURSE_COLUMNS = `
    c.id, c.course, c.level, c.duration, c.intakes, c.deadline, c.entryrequirement,
    c.fees, c.currency, c.ielts, c.ieltsless, c.pte, c.pteless, c.toefl, c.toeflless, c.duolingo,
    u.id AS university_id, u.name AS university, u.location, u.without_ielts, u.scholarship,
    u.applicationfeewaiver, d.id AS country_id, d.country`;

export const LIVE_COURSE_FROM = `
    FROM tb_courses c
    JOIN tb_universities u ON u.id = c.u_id
    LEFT JOIN tb_destinations d ON d.id = u.d_id
    WHERE c.status = '1' AND u.status = '1' AND (d.id IS NULL OR d.status = '1')`;

export function courseRow(row) {
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
    };
}

function universityRow(row) {
    return {
        id: String(row.id),
        name: text(row.name) ?? "University",
        href: createUniversityPublicHref({ name: row.name }),
        location: text(row.location),
        country: text(row.country),
        countrySlug: row.country ? countrySlug(row.country) : "",
        scholarship: yesNo(row.scholarship),
        feeWaiver: yesNo(row.applicationfeewaiver),
        courses: Number(row.courses) || 0,
    };
}

/** Run a cached read; a database error gives { error: true } and is logged, not cached. */
export async function guarded(label, read, empty) {
    try {
        return { ...(await read()), error: false };
    } catch (error) {
        console.error(`${label} could not be loaded:`, error);

        return { ...empty, error: true };
    }
}

/* ---------------------------------------------------------------- */

const cachedNursingCourses = unstable_cache(
    async () => {
        const rows = await query(
            `SELECT ${COURSE_COLUMNS} ${LIVE_COURSE_FROM}
               AND c.course LIKE '%nursing%'
             ORDER BY d.order ASC, u.name ASC, c.course ASC
             LIMIT 400`
        );

        return { courses: rows.map(courseRow) };
    },
    ["landing-nursing-courses-v1"],
    { revalidate: REVALIDATE, tags: TAGS }
);

/** Live courses whose name mentions nursing: { courses, error }. */
export const getNursingCourses = cache(() => guarded("Nursing courses", cachedNursingCourses, { courses: [] }));

const cachedUkNursingMasters = unstable_cache(
    async () => {
        // Country and level are filtered here, not after a LIMIT, so no
        // UK course is dropped and the count is right.
        const rows = await query(
            `SELECT ${COURSE_COLUMNS} ${LIVE_COURSE_FROM}
               AND c.course LIKE '%nursing%'
               AND LOWER(TRIM(d.country)) IN ('uk', 'united kingdom')
               AND (c.level LIKE '%master%' OR c.level LIKE '%postgrad%' OR LOWER(TRIM(c.level)) IN ('pg', 'pgt')
                 OR c.course LIKE 'MSc%' OR c.course LIKE '% MSc%' OR c.course LIKE 'MA %' OR c.course LIKE 'MRes%'
                 OR c.course LIKE '%Master%' OR c.course LIKE '%Postgraduate%')
             ORDER BY u.name ASC, c.course ASC
             LIMIT 400`
        );

        return { courses: rows.map(courseRow) };
    },
    ["landing-uk-nursing-masters-v1"],
    { revalidate: REVALIDATE, tags: TAGS }
);

/** Masters level nursing courses at UK universities: { courses, error }. */
export const getUkNursingMasters = cache(() => guarded("UK nursing masters courses", cachedUkNursingMasters, { courses: [] }));

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

/* ---------------------------------------------------------------- */

const cachedWithoutIelts = unstable_cache(
    async () => {
        const [universities, courses] = await Promise.all([
            query(
                `SELECT u.id, u.name, u.location, u.scholarship, u.applicationfeewaiver, d.country,
                        (SELECT COUNT(*) FROM tb_courses c WHERE c.u_id = u.id AND c.status = '1') AS courses
                 FROM tb_universities u
                 LEFT JOIN tb_destinations d ON d.id = u.d_id
                 WHERE u.status = '1' AND (d.id IS NULL OR d.status = '1')
                   AND LOWER(TRIM(COALESCE(u.without_ielts, ''))) IN (${YES_SQL})
                 ORDER BY d.order ASC, u.name ASC
                 LIMIT 300`,
                YES_VALUES
            ),
            query(
                `SELECT ${COURSE_COLUMNS} ${LIVE_COURSE_FROM}
                   AND (TRIM(COALESCE(c.ieltsless, '')) NOT IN ('', '-', '0')
                     OR TRIM(COALESCE(c.pteless, '')) NOT IN ('', '-', '0')
                     OR TRIM(COALESCE(c.toeflless, '')) NOT IN ('', '-', '0')
                     OR TRIM(COALESCE(c.duolingo, '')) NOT IN ('', '-', '0'))
                 ORDER BY d.order ASC, u.name ASC, c.course ASC
                 LIMIT 200`
            ),
        ]);

        return {
            universities: universities.map(universityRow),
            // Placeholders such as "N/A" are dropped, so keep only rows with a real option left.
            courses: courses.map(courseRow).filter((row) => row.ieltsLess || row.pteLess || row.toeflLess || row.duolingo),
        };
    },
    ["landing-without-ielts-v1"],
    { revalidate: REVALIDATE, tags: TAGS }
);

/*
 * Universities recorded as accepting students without IELTS, and
 * courses that record a lower IELTS, PTE or TOEFL score or a Duolingo
 * score: { universities, courses, error }.
 */
export const getWithoutIeltsOptions = cache(() =>
    guarded("Without IELTS options", cachedWithoutIelts, { universities: [], courses: [] })
);

/* ---------------------------------------------------------------- */

const cachedScholarships = unstable_cache(
    async () => {
        const rows = await query(
            // Course counts come from one grouped pass over tb_courses rather than
            // a count per university, which took over a minute during builds.
            `SELECT u.id, u.name, u.location, u.scholarship, u.applicationfeewaiver, d.country,
                    COALESCE(cc.courses, 0) AS courses
             FROM tb_universities u
             LEFT JOIN tb_destinations d ON d.id = u.d_id
             LEFT JOIN (SELECT u_id, COUNT(*) AS courses FROM tb_courses WHERE status = '1' GROUP BY u_id) cc
               ON cc.u_id = u.id
             WHERE u.status = '1' AND (d.id IS NULL OR d.status = '1')
               AND (LOWER(TRIM(COALESCE(u.scholarship, ''))) IN (${YES_SQL})
                 OR LOWER(TRIM(COALESCE(u.applicationfeewaiver, ''))) IN (${YES_SQL}))
             ORDER BY d.order ASC, u.name ASC
             LIMIT 300`,
            [...YES_VALUES, ...YES_VALUES]
        );

        return { universities: rows.map(universityRow) };
    },
    ["landing-scholarships-v1"],
    { revalidate: REVALIDATE, tags: TAGS }
);

/** Universities marked with a scholarship or an application fee waiver: { universities, error }. */
export const getScholarshipUniversities = cache(() =>
    guarded("Scholarship universities", cachedScholarships, { universities: [] })
);

/* ---------------------------------------------------------------- */

const cachedUndergraduate = unstable_cache(
    async () => {
        const rows = await query(
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
               AND COALESCE(c.level, '') NOT LIKE '%post%' AND COALESCE(c.level, '') NOT LIKE '%graduate diploma%' AND COALESCE(c.level, '') NOT LIKE '%master%'
             GROUP BY d.id, d.country, d.order
             ORDER BY d.order ASC`
        );

        return {
            countries: rows.map((row) => ({
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
            })),
        };
    },
    ["landing-undergraduate-v1"],
    { revalidate: REVALIDATE, tags: TAGS }
);

/*
 * Undergraduate (bachelor, diploma, foundation) courses we list, counted
 * by country, for the after 12th page: { countries, error }.
 */
export const getUndergraduateByCountry = cache(() =>
    guarded("Undergraduate courses", cachedUndergraduate, { countries: [] })
);

/* ---------------------------------------------------------------- */

const cachedDestinations = unstable_cache(
    async () => {
        const rows = await query(`SELECT d.id, d.country FROM tb_destinations d WHERE d.status = '1' ORDER BY d.order ASC`);

        return {
            destinations: rows
                .map((row) => ({ id: String(row.id), country: text(row.country), slug: countrySlug(row.country) }))
                .filter((row) => row.country && row.slug),
        };
    },
    ["landing-destinations-v1"],
    { revalidate: REVALIDATE, tags: TAGS }
);

/** The live destinations' slugs, for country links (empty on a database error, so no link can 404). */
export const getLiveSlugs = cache(async () => {
    const { destinations } = await guarded("Destinations", cachedDestinations, { destinations: [] });

    return new Set(destinations.map((item) => item.slug));
});
