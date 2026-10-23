import {
    normalizeSlug,
} from "./universityHelpers";


import { findUniversityBySlug } from "@/lib/universityIndex";

import {
    resolveUniversityByExactId,
} from "./universityFallbackResolver";

/* =========================================================
   UNIVERSITY RESOLVER

   CANONICAL:

   /universities/coventry-university

   OLD URLS CAN STILL RESOLVE:

   /universities/coventry-university-uk

   Backend ID remains internal.
========================================================= */

export async function resolveUniversity(
    rawSlug
) {
    const slug =
        normalizeSlug(
            rawSlug
        );

    if (!slug) {
        return null;
    }

    // Direct lookup in the database-built list of university addresses.
    const match =
        await findUniversityBySlug(
            slug
        );

    if (!match) {
        return null;
    }

    // match.slug is the current address; for an old address the page
    // sees the difference and redirects to it.
    return resolveUniversityByExactId(
        match.id,
        match.slug
    );
}
