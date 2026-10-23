import "server-only";

import { unstable_cache } from "next/cache";
import { cache } from "react";

import {
    COURSE_GUIDES,
    GUIDE_READ_LIMIT,
    courseMatchesGuide,
    findCourseGuide,
    guideCourseWhere,
    guideLinkLabel,
    guidePath,
    guidesForCountrySlug,
    passesGuideGate,
    summariseGuideCourses,
} from "@/lib/courseGuides";
import { query } from "@/lib/db";
import { COURSE_COLUMNS, LIVE_COURSE_FROM, courseRow } from "@/lib/landingData";
import { recordedValue } from "@/lib/recordValue";
import { createUniversityPublicHref } from "@/lib/universitySlug";

/*
 * Database reads for the course guides (lib/courseGuides.js). Each
 * guide's courses are read once an hour with unstable_cache; the cached
 * function throws on a database error, so a failure is never cached.
 * The page getter returns { error: true } instead, and the link helpers
 * leave a guide out when its courses could not be read, so a link never
 * points to a page that may turn out thin.
 */

const REVALIDATE = 3600;
const TAGS = ["landing-pages", "course-guides"];

function clean(value) {
    return recordedValue(String(value ?? "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ")) || null;
}

// The fields the summary counts, without fees and with only the start
// of the entry text (enough to tell whether one is recorded).
function summaryRow(row) {
    return {
        id: String(row.id),
        course: clean(row.course) ?? "Course",
        level: clean(row.level),
        duration: clean(row.duration),
        intakes: clean(row.intakes),
        entry: clean(row.entry_start),
        ielts: clean(row.ielts),
        ieltsLess: clean(row.ieltsless),
        pte: clean(row.pte),
        pteLess: clean(row.pteless),
        toefl: clean(row.toefl),
        toeflLess: clean(row.toeflless),
        duolingo: clean(row.duolingo),
        university: clean(row.university) ?? "University",
    };
}

async function readGuide(guide) {
    const where = guideCourseWhere(guide);
    const [counts, rows] = await Promise.all([
        // Exact totals: one row per university with its matching courses.
        query(
            `SELECT u.id, u.name, COUNT(*) AS courses ${LIVE_COURSE_FROM}
               AND ${where.clause}
             GROUP BY u.id, u.name`,
            where.params
        ),
        // The fields for the summary, capped at GUIDE_READ_LIMIT rows. In id
        // order, so a capped read still spans many universities.
        query(
            `SELECT c.id, c.course, c.level, c.duration, c.intakes, LEFT(c.entryrequirement, 300) AS entry_start,
                    c.ielts, c.ieltsless, c.pte, c.pteless, c.toefl, c.toeflless, c.duolingo, u.name AS university
             ${LIVE_COURSE_FROM}
               AND ${where.clause}
             ORDER BY c.id ASC
             LIMIT ${GUIDE_READ_LIMIT + 1}`,
            where.params
        ),
    ]);

    const universities = counts.map((row) => ({
        name: clean(row.name) ?? "University",
        href: createUniversityPublicHref({ name: row.name }),
        courses: Number(row.courses) || 0,
    }));
    const total = universities.reduce((sum, row) => sum + row.courses, 0);
    const truncated = rows.length > GUIDE_READ_LIMIT;
    // The SQL is the same test; the JS check only guards against the
    // collation keeping an accented name the page would not.
    const courses = rows
        .slice(0, GUIDE_READ_LIMIT)
        .map(summaryRow)
        .filter((course) => courseMatchesGuide(course, guide));
    const { rowIds, entryIds, ...summary } = summariseGuideCourses(courses, { universities, total, truncated });

    // The full records (fees, the whole entry text) only for the rows shown.
    const ids = [...new Set([...rowIds, ...entryIds])];
    const full = ids.length
        ? await query(`SELECT ${COURSE_COLUMNS} ${LIVE_COURSE_FROM} AND c.id IN (${ids.map(() => "?").join(", ")})`, ids)
        : [];
    const byId = new Map(full.map((row) => [String(row.id), courseRow(row)]));

    return {
        ...summary,
        rows: rowIds.map((id) => byId.get(id)).filter(Boolean),
        entries: entryIds
            .map((id) => byId.get(id))
            .filter((course) => course?.entry)
            .map((course) => ({ id: course.id, course: course.course, university: course.university, href: course.href, entry: course.entry })),
    };
}

const cachedGuide = unstable_cache(
    async (slug) => {
        const guide = findCourseGuide(slug);

        // Only the summary is cached, not every row read.
        return guide ? readGuide(guide) : null;
    },
    ["course-guide-v2"],
    { revalidate: REVALIDATE, tags: TAGS }
);

/** A guide's summary, throwing on a database error (for the sitemap, which must not drop pages). */
export const loadCourseGuide = cache((slug) => cachedGuide(String(slug ?? "").trim().toLowerCase()));

/** A guide's summary for its page: { data, error }. data is null for an unknown slug. */
export const getCourseGuide = cache(async (slug) => {
    try {
        return { data: await loadCourseGuide(slug), error: false };
    } catch (error) {
        console.error(`Course guide ${slug} could not be loaded:`, error);

        return { data: null, error: true };
    }
});

/** Whether a guide passes the quality gate: false when thin or when it could not be read. */
export async function courseGuideIndexable(slug) {
    const { data, error } = await getCourseGuide(slug);

    return !error && Boolean(data) && passesGuideGate(data.total);
}

function linkFor(guide) {
    return { href: guidePath(guide), label: guideLinkLabel(guide) };
}

async function indexableLinks(guides) {
    const flags = await Promise.all(guides.map((guide) => courseGuideIndexable(guide.slug)));

    return guides.filter((guide, index) => flags[index]).map(linkFor);
}

/** Links ({ href, label }) to every guide that passes the gate. */
export function courseGuideLinks() {
    return indexableLinks(COURSE_GUIDES);
}

/** Links to the guides for one country (slug as in /study-in-<slug>) that pass the gate. */
export function courseGuideLinksForCountry(slug) {
    return indexableLinks(guidesForCountrySlug(slug));
}

/** The link to one guide when it passes the gate, or null. */
export async function courseGuideLink(guide) {
    return guide && (await courseGuideIndexable(guide.slug)) ? linkFor(guide) : null;
}
