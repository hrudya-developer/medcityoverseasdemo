import "server-only";

import { unstable_cache } from "next/cache";
import { cache } from "react";

import { query } from "@/lib/db";
import { countrySlug, createSlug } from "@/lib/slug";

/*
 * One row per live study destination, straight from the database:
 * the country's own fields and how many universities and courses we
 * list there. Empty fields stay null so pages can show "Not recorded".
 *
 * The counts are two grouped scans (not a subquery per country) and
 * the result is cached for 15 minutes, so the tables on /destinations,
 * /universities and /courses stay fast with tens of thousands of courses.
 */

const REVALIDATE_SECONDS = 15 * 60;

function text(value) {
    const clean = String(value ?? "").replace(/\s+/g, " ").trim();

    return clean || null;
}

async function liveDestinations() {
    const rows = await query(
        `SELECT d.id, d.country, d.capital, d.language, d.currency
         FROM tb_destinations d
         WHERE d.status = '1'
         ORDER BY d.order ASC`
    );

    return rows
        .map((row) => ({
            id: String(row.id),
            country: text(row.country),
            slug: countrySlug(row.country),
            capital: text(row.capital),
            language: text(row.language),
            currency: text(row.currency),
        }))
        .filter((row) => row.country && row.slug);
}

// Errors are thrown so unstable_cache never stores a failed result.
const cachedSummaries = unstable_cache(
    async () => {
        const [destinations, universities, courses] = await Promise.all([
            liveDestinations(),
            query(
                `SELECT u.d_id, COUNT(*) AS n
                 FROM tb_universities u
                 WHERE u.status = '1'
                 GROUP BY u.d_id`
            ),
            query(
                `SELECT u.d_id, COUNT(*) AS n
                 FROM tb_courses c
                 JOIN tb_universities u ON u.id = c.u_id
                 WHERE u.status = '1' AND c.status = '1'
                 GROUP BY u.d_id`
            ),
        ]);

        const counts = (rows) => new Map(rows.map((row) => [String(row.d_id), Number(row.n) || 0]));
        const universityCounts = counts(universities);
        const courseCounts = counts(courses);

        return destinations.map((row) => ({
            ...row,
            universities: universityCounts.get(row.id) ?? 0,
            courses: courseCounts.get(row.id) ?? 0,
        }));
    },
    ["destination-summaries-v2"],
    { revalidate: REVALIDATE_SECONDS }
);

/** The summaries, throwing when the database fails (for the sitemap and llms.txt, which must not drop pages). */
export const loadDestinationSummaries = cache(() => cachedSummaries());

export const getDestinationSummaries = cache(async () => {
    try {
        return await loadDestinationSummaries();
    } catch (error) {
        console.error("Destination summaries could not be loaded:", error);

        return [];
    }
});

function matchesSlug(row, key) {
    return row.slug === key || createSlug(row.country) === key;
}

// The summaries, or null when they cannot be loaded, so callers can tell
// "unknown" apart from "no universities".
const summariesOrNull = cache(async () => {
    try {
        return await loadDestinationSummaries();
    } catch (error) {
        console.error("Destination summaries could not be loaded:", error);

        return null;
    }
});

function slugKey(slug) {
    return String(slug ?? "").trim().toLowerCase();
}

/**
 * Whether /universities-in-<slug> is indexable, from the summaries the
 * sitemap uses: the page is noindex when the country has no live
 * universities (tb_universities rows with its d_id and status 1), so
 * that is the test. Null when the summaries cannot be loaded: callers
 * then keep their previous behaviour rather than hiding every link.
 */
export async function universitiesPageIndexable(slug) {
    const lookup = await universitiesPageIndexableLookup();

    return lookup ? lookup(slug) : null;
}

/**
 * The same test for many countries at once: a function that answers it
 * for one slug, built from a single (cached) summaries load, or null
 * when the summaries cannot be loaded.
 */
export async function universitiesPageIndexableLookup() {
    const status = await destinationStatusLookup();

    return status ? (slug) => status(slug).universitiesIndexable : null;
}

/**
 * For many countries at once: a function giving { live, universitiesIndexable }
 * for one slug (live: /study-in-<slug> exists), or null when the summaries
 * cannot be loaded.
 */
export async function destinationStatusLookup() {
    const rows = await summariesOrNull();

    if (!rows) {
        return null;
    }

    return (slug) => {
        const key = slugKey(slug);
        const row = key ? rows.find((item) => matchesSlug(item, key)) : undefined;

        return {
            live: Boolean(row),
            universitiesIndexable: Boolean(row) && row.universities > 0,
        };
    };
}

const cachedLiveDestinations = unstable_cache(liveDestinations, ["live-destinations-v1"], {
    revalidate: REVALIDATE_SECONDS,
});

/** A live destination by its slug (as in /study-in-germany), without counts, or null when hidden or unknown. */
export const getLiveDestination = cache(async (slug) => {
    const key = String(slug ?? "").trim().toLowerCase();

    if (!key) {
        return null;
    }

    try {
        // Either the short slug ("uk") or the plain one ("united-kingdom").
        return (await cachedLiveDestinations()).find((row) => matchesSlug(row, key)) ?? null;
    } catch (error) {
        console.error("Live destinations could not be loaded:", error);

        return null;
    }
});
