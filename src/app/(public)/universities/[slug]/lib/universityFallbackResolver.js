import {
    cache,
} from "react";

import {
    createSlug,
} from "@/lib/slug";

import {
    postOverseasForm,
} from "@/lib/overseasApi";

import {
    createUniversityPublicSlug,
} from "@/lib/universitySlug";

import {
    cleanId,
    cleanText,
    extractCourses,
    getUniversityCountryId,
    getUniversityFromResponse,
    getUniversityName,
    normalizeSlug,
} from "./universityHelpers";

import {
    getUniversityDetails,
} from "./universityApi";

import {
    getUniversitySlugContext,
} from "./universitySlugContext";

/* =========================================================
   SEARCH UNIVERSITIES

   Used only as fallback for:
   - refresh
   - Google
   - shared link
   - direct visit

   NOT the preferred navigation path.
========================================================= */

const searchUniversities =
    cache(
        async (
            rawNameSlug
        ) => {
            const nameSlug =
                normalizeSlug(
                    rawNameSlug
                );

            if (!nameSlug) {
                return [];
            }

            const keyword =
                nameSlug
                    .replace(
                        /-/g,
                        " "
                    )
                    .replace(
                        /\s+/g,
                        " "
                    )
                    .trim();

            if (!keyword) {
                return [];
            }

            try {
                const result =
                    await postOverseasForm(
                        "searchResults",
                        {
                            keytype:
                                "university",

                            keyword,

                            uid:
                                0,
                        },
                        {
                            next: {
                                revalidate:
                                    3600,
                            },
                        }
                    );

                const candidates = [
                    result?.university,
                    result?.universities,
                    result?.suggestion,
                    result?.suggestions,
                    result?.data,
                    result?.results,
                ];

                for (
                    const candidate of
                    candidates
                ) {
                    if (
                        Array.isArray(
                            candidate
                        )
                    ) {
                        return candidate.filter(
                            Boolean
                        );
                    }
                }

                return [];
            } catch (
                error
            ) {
                console.error(
                    "University search error:",
                    error?.message ??
                        error
                );

                return [];
            }
        }
    );

/* =========================================================
   CANDIDATE IDS
========================================================= */

function getCandidateIds(
    candidates
) {
    const ids =
        new Set();

    if (
        !Array.isArray(
            candidates
        )
    ) {
        return ids;
    }

    for (
        const candidate of
        candidates
    ) {
        const possibleIds = [
            candidate?.u_id,
            candidate?.university_id,
            candidate?.universityId,
            candidate?.id,
        ];

        for (
            const possibleId of
            possibleIds
        ) {
            const id =
                cleanId(
                    possibleId
                );

            if (id) {
                ids.add(
                    id
                );
            }
        }
    }

    return ids;
}

/* =========================================================
   EXACT INTERNAL ID RESOLVER

   This is the preferred resolver.

   Example:

   Public URL:
   /universities/griffith-college-australia

   Internally:
   universityId = 1548

   Request:
   getUniversityDetails(1548)
========================================================= */

export const resolveUniversityByExactId =
    cache(
        async (
            universityId,
            requestedSlug
        ) => {
            const id =
                cleanId(
                    universityId
                );

            const slug =
                normalizeSlug(
                    requestedSlug
                );

            if (
                !id ||
                !slug
            ) {
                return null;
            }

            const details =
                await getUniversityDetails(
                    id
                );

            if (!details) {
                return null;
            }

            const university =
                getUniversityFromResponse(
                    details
                );

            if (!university) {
                return null;
            }

            /* =================================================
               VERIFY RETURNED ID
            ================================================= */

            const returnedId =
                cleanId(
                    university?.id ??
                    university?.u_id ??
                    university
                        ?.university_id ??
                    id
                );

            if (
                returnedId &&
                returnedId !== id
            ) {
                console.error(
                    "University ID mismatch:",
                    {
                        requestedId:
                            id,

                        returnedId,
                    }
                );

                return null;
            }

            const universityName =
                getUniversityName(
                    university
                );

            if (!universityName) {
                return null;
            }

            const courses =
                extractCourses(
                    details
                );

            const countryName =
                cleanText(
                    university?.country ??
                    university
                        ?.country_name ??
                    courses?.[0]
                        ?.country ??
                    ""
                );

            const canonicalSlug =
                createUniversityPublicSlug(
                    {
                        ...university,

                        name:
                            universityName,

                        country:
                            countryName,
                    },
                    countryName
                );

            /* =================================================
               VERIFY URL BELONGS TO THIS EXACT ID
            ================================================= */

            if (
                canonicalSlug &&
                canonicalSlug !==
                    slug
            ) {
                if (
                    process.env.NODE_ENV ===
                    "development"
                ) {
                    console.warn(
                        "Stored university ID does not match requested slug:",
                        {
                            id,

                            requestedSlug:
                                slug,

                            canonicalSlug,
                        }
                    );
                }

                return null;
            }

            return {
                id,

                university,

                details,

                universityName,

                universitySlug:
                    canonicalSlug,

                countryId:
                    getUniversityCountryId(
                        university
                    ),

                countryName,

                courses,

                courseCount:
                    courses.length,
            };
        }
    );

/* =========================================================
   NAME + COUNTRY FALLBACK

   Used only when exact internal ID is unavailable.

   Example:

   /universities/griffith-college-australia

   Candidates:
   999  -> Ireland
   1548 -> Australia

   Ireland rejected.
   Australia accepted.

   IMPORTANT:
   Never sort by courseCount.
========================================================= */

export const resolveUniversityByNameAndCountry =
    cache(
        async (
            rawSlug
        ) => {
            const context =
                await getUniversitySlugContext(
                    rawSlug
                );

            if (!context) {
                return null;
            }

            const searchResults =
                await searchUniversities(
                    context.nameSlug
                );

            if (
                searchResults.length ===
                0
            ) {
                return null;
            }

            /* =================================================
               EXACT UNIVERSITY NAME
            ================================================= */

            const exactNameMatches =
                searchResults.filter(
                    (
                        item
                    ) => {
                        const name =
                            getUniversityName(
                                item
                            );

                        if (!name) {
                            return false;
                        }

                        return (
                            createSlug(
                                name
                            ) ===
                            context.nameSlug
                        );
                    }
                );

            const candidateSource =
                exactNameMatches.length >
                0
                    ? exactNameMatches
                    : searchResults.length ===
                        1
                      ? searchResults
                      : [];

            if (
                candidateSource.length ===
                0
            ) {
                return null;
            }

            const candidateIds =
                getCandidateIds(
                    candidateSource
                );

            if (
                candidateIds.size ===
                0
            ) {
                return null;
            }

            const verified =
                [];

            /* =================================================
               VERIFY EACH CANDIDATE USING DETAILS API
            ================================================= */

            for (
                const candidateId of
                candidateIds
            ) {
                const details =
                    await getUniversityDetails(
                        candidateId
                    );

                if (!details) {
                    continue;
                }

                const university =
                    getUniversityFromResponse(
                        details
                    );

                if (!university) {
                    continue;
                }

                const universityName =
                    getUniversityName(
                        university
                    );

                if (!universityName) {
                    continue;
                }

                /* =============================================
                   UNIVERSITY NAME MUST MATCH
                ============================================= */

                if (
                    createSlug(
                        universityName
                    ) !==
                    context.nameSlug
                ) {
                    continue;
                }

                const courses =
                    extractCourses(
                        details
                    );

                /* =============================================
                   COUNTRY

                   Some university records may not contain
                   country, so first course is also checked.
                ============================================= */

                const countryName =
                    cleanText(
                        university
                            ?.country ??
                        university
                            ?.country_name ??
                        courses?.[0]
                            ?.country ??
                        ""
                    );

                const countrySlug =
                    createSlug(
                        countryName
                    );

                /* =============================================
                   DUPLICATE NAME DISCRIMINATOR
                ============================================= */

                if (
                    context.countrySlug
                ) {
                    if (
                        !countrySlug ||
                        countrySlug !==
                            context
                                .countrySlug
                    ) {
                        continue;
                    }
                }

                const canonicalSlug =
                    createUniversityPublicSlug(
                        {
                            ...university,

                            name:
                                universityName,

                            country:
                                countryName,
                        },
                        countryName
                    );

                /* =============================================
                   FULL SLUG MUST MATCH
                ============================================= */

                if (
                    context.countrySlug &&
                    canonicalSlug !==
                        context.slug
                ) {
                    continue;
                }

                verified.push({
                    id:
                        cleanId(
                            university?.id ??
                            university?.u_id ??
                            candidateId
                        ),

                    university,

                    details,

                    universityName,

                    universitySlug:
                        canonicalSlug,

                    countryId:
                        getUniversityCountryId(
                            university
                        ),

                    countryName,

                    courses,

                    courseCount:
                        courses.length,
                });
            }

            /* =================================================
               COUNTRY-AWARE URL

               Name + country should identify the university.
            ================================================= */

            if (
                context.countrySlug
            ) {
                if (
                    verified.length ===
                    0
                ) {
                    return null;
                }

                if (
                    verified.length >
                        1 &&
                    process.env.NODE_ENV ===
                        "development"
                ) {
                    console.warn(
                        "Multiple universities match the same name and country:",
                        {
                            slug:
                                context.slug,

                            matches:
                                verified.map(
                                    (
                                        item
                                    ) => ({
                                        id:
                                            item.id,

                                        universityName:
                                            item
                                                .universityName,

                                        country:
                                            item
                                                .countryName,
                                    })
                                ),
                        }
                    );
                }

                return (
                    verified[0] ??
                    null
                );
            }

            /* =================================================
               LEGACY NAME-ONLY URL

               Safe only when one result exists.
            ================================================= */

            if (
                verified.length ===
                1
            ) {
                return verified[0];
            }

            if (
                verified.length >
                1
            ) {
                console.warn(
                    "Ambiguous name-only university URL:",
                    {
                        slug:
                            context.slug,

                        matches:
                            verified.map(
                                (
                                    item
                                ) => ({
                                    id:
                                        item.id,

                                    universityName:
                                        item
                                            .universityName,

                                    country:
                                        item
                                            .countryName,
                                })
                            ),
                    }
                );
            }

            return null;
        }
    );