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
   MAIN RESOLVER

   1. Exact internal backend ID
   2. Name + country SEO fallback

   Backend ID never appears in public URL.
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
       EXACT INTERNAL ID
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
            if (
                process.env.NODE_ENV ===
                "development"
            ) {
                console.log(
                    "UNIVERSITY RESOLVED",
                    {
                        slug,

                        source:
                            "exact-internal-id",

                        selectedId:
                            exact.id,

                        universityName:
                            exact
                                .universityName,

                        country:
                            exact
                                .countryName,

                        courseCount:
                            exact
                                .courseCount,
                    }
                );
            }

            return exact;
        }
    }

    /* =====================================================
       SEO FALLBACK
    ===================================================== */

    const fallback =
        await resolveUniversityByNameAndCountry(
            slug
        );

    if (
        fallback &&
        process.env.NODE_ENV ===
            "development"
    ) {
        console.log(
            "UNIVERSITY RESOLVED",
            {
                slug,

                source:
                    "name-country-fallback",

                selectedId:
                    fallback.id,

                universityName:
                    fallback
                        .universityName,

                country:
                    fallback
                        .countryName,

                courseCount:
                    fallback
                        .courseCount,
            }
        );
    }

    return fallback;
}