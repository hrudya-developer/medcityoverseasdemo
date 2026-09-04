import {
    cache,
} from "react";

import {
    createUniversityPublicSlug,
} from "@/lib/universitySlug";

import {
    postOverseasForm,
} from "@/lib/overseasApi";

import {
    cleanId,
    cleanText,
    extractCourses,
    getUniversityCountryId,
    getUniversityFromResponse,
    getUniversityName,
    normalizeCountrySlug,
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

   Search only discovers possible internal IDs.
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

                            uid: 0,
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
                    result?.result,

                    result?.data
                        ?.university,

                    result?.data
                        ?.universities,

                    result?.result
                        ?.university,

                    result?.result
                        ?.universities,
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
            candidate?.uid,
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
   COUNTRY
========================================================= */

function getResolvedCountryName(
    university,
    courses
) {
    return cleanText(
        university?.country ??
        university?.country_name ??
        university?.destination ??
        university?.destination_name ??
        university?.location_country ??
        courses?.[0]?.country ??
        courses?.[0]?.country_name ??
        courses?.[0]?.destination ??
        ""
    );
}

/* =========================================================
   EXACT ID RESOLVER

   Used only when cookie gives us an exact backend ID.

   Canonical slug is NAME ONLY.
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

            const returnedId =
                cleanId(
                    university?.id ??
                    university?.u_id ??
                    university
                        ?.university_id ??
                    university
                        ?.universityId ??
                    id
                );

            if (
                returnedId &&
                returnedId !== id
            ) {
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
                getResolvedCountryName(
                    university,
                    courses
                );

            const canonicalSlug =
                createUniversityPublicSlug(
                    {
                        ...university,

                        name:
                            universityName,
                    }
                );

            if (!canonicalSlug) {
                return null;
            }

            /*
             * Cookie fast path is strict.
             *
             * New cookies are saved using name-only slug.
             */

            if (
                canonicalSlug !==
                slug
            ) {
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
   SLUG RESOLVER

   Supports:

   /universities/coventry-university

   and old:

   /universities/coventry-university-uk

   Final canonical URL is always:

   /universities/coventry-university
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

            if (
                !context ||
                !context.nameSlug
            ) {
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

            const candidateIds =
                getCandidateIds(
                    searchResults
                );

            if (
                candidateIds.size ===
                0
            ) {
                return null;
            }

            const verified =
                [];

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

                const realNameSlug =
                    normalizeSlug(
                        universityName
                    );

                /*
                 * Exact university name match.
                 */

                if (
                    realNameSlug !==
                    context.nameSlug
                ) {
                    continue;
                }

                const courses =
                    extractCourses(
                        details
                    );

                const countryName =
                    getResolvedCountryName(
                        university,
                        courses
                    );

                const realCountrySlug =
                    normalizeCountrySlug(
                        countryName
                    );

                const requestedCountrySlug =
                    normalizeCountrySlug(
                        context.countrySlug
                    );

                /*
                 * OLD COUNTRY-AWARE URL:
                 *
                 * /coventry-university-uk
                 *
                 * If country exists in the old URL,
                 * verify it matches the university.
                 */

                if (
                    requestedCountrySlug &&
                    (
                        !realCountrySlug ||
                        realCountrySlug !==
                            requestedCountrySlug
                    )
                ) {
                    continue;
                }

                /*
                 * Canonical URL is ALWAYS
                 * university name only.
                 */

                const canonicalSlug =
                    createUniversityPublicSlug(
                        {
                            ...university,

                            name:
                                universityName,
                        }
                    );

                if (!canonicalSlug) {
                    continue;
                }

                const resolvedId =
                    cleanId(
                        university?.id ??
                        university?.u_id ??
                        university
                            ?.university_id ??
                        university
                            ?.universityId ??
                        candidateId
                    );

                if (!resolvedId) {
                    continue;
                }

                verified.push(
                    {
                        id:
                            resolvedId,

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
                    }
                );
            }

            if (
                verified.length ===
                0
            ) {
                return null;
            }

            /* =================================================
               OLD COUNTRY-AWARE URL

               Country was already verified above.
            ================================================= */

            if (
                context.countrySlug
            ) {
                return (
                    verified[0] ??
                    null
                );
            }

            /* =================================================
               NORMAL CANONICAL NAME-ONLY URL

               Prefer record with country metadata.
            ================================================= */

            const withCountry =
                verified.find(
                    (
                        item
                    ) =>
                        Boolean(
                            normalizeCountrySlug(
                                item
                                    ?.countryName
                            )
                        )
                );

            const selected =
                withCountry ??
                verified[0];

            if (
                !selected
            ) {
                return null;
            }

            if (
                process.env.NODE_ENV ===
                "development"
            ) {
                console.log(
                    "UNIVERSITY SLUG RESOLVED",
                    {
                        requestedSlug:
                            context.slug,

                        selectedId:
                            selected.id,

                        universityName:
                            selected
                                .universityName,

                        country:
                            selected
                                .countryName,

                        canonicalSlug:
                            selected
                                .universitySlug,

                        matches:
                            verified.length,
                    }
                );
            }

            return selected;
        }
    );