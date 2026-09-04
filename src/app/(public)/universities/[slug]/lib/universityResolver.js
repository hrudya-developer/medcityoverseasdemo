import {
    normalizeSlug,
} from "./universityHelpers";

import {
    getStoredUniversityId,
} from "./universityStoredMapping";

import {
    resolveUniversityByExactId,
    resolveUniversityByNameAndCountry,
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

    /* =====================================================
       FAST PATH - STORED INTERNAL ID
    ===================================================== */

    const storedId =
        await getStoredUniversityId(
            slug
        );

    if (storedId) {
        const exact =
            await resolveUniversityByExactId(
                storedId,
                slug
            );

        if (exact) {
            return exact;
        }
    }

    /* =====================================================
       SERVER RESOLUTION

       Works for:
       - refresh
       - direct URL
       - Google
       - incognito
       - old country-aware links
    ===================================================== */

    const resolved =
        await resolveUniversityByNameAndCountry(
            slug
        );

    if (
        !resolved?.id ||
        !resolved?.university ||
        !resolved?.details
    ) {
        return null;
    }

    return resolved;
}