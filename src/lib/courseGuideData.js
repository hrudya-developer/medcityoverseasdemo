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

const cachedGuide = unstable_cache(
    async (slug) => {
        const guide = findCourseGuide(slug);

        if (!guide) {
            return null;
        }

        const where = guideCourseWhere(guide);
        const rows = await query(
            `SELECT ${COURSE_COLUMNS} ${LIVE_COURSE_FROM}
               AND ${where.clause}
             ORDER BY u.name ASC, c.course ASC
             LIMIT ${GUIDE_READ_LIMIT + 1}`,
            where.params
        );
        const truncated = rows.length > GUIDE_READ_LIMIT;
        const courses = rows
            .slice(0, GUIDE_READ_LIMIT)
            .map(courseRow)
            .filter((course) => courseMatchesGuide(course, guide));

        // Only the summary is cached, not every row read.
        return summariseGuideCourses(courses, { truncated });
    },
    ["course-guide-v1"],
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
