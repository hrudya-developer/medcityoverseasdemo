import {
    notFound,
    permanentRedirect,
} from "next/navigation";

import {
    createUniversityPublicSlug,
} from "@/lib/universitySlug";

import UniversityDetailsClient from "./components/UniversityDetailsClient";

import {
    cleanId,
    cleanText,
    extractCourses,
    getUniversityCountryId,
    getUniversityName,
    normalizeCountrySlug,
    normalizeSlug,
} from "./lib/universityHelpers";

import {
    getUniversityMainCourses,
} from "./lib/universityApi";

import {
    resolveUniversity,
} from "./lib/universityResolver";

import {
    resolveDestination,
} from "./lib/universitySlugContext";

import {
    buildUniversityMetadata,
} from "./lib/universityMetadata";

/* =========================================================
   CONFIG
========================================================= */

const SITE_URL =
    "https://medcityoverseas.com";

export const revalidate = 3600;

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata(
    props
) {
    return buildUniversityMetadata(
        props
    );
}

/* =========================================================
   HELPERS
========================================================= */

function getCourseName(
    course
) {
    return cleanText(
        course?.course_name ||
        course?.course ||
        course?.name ||
        course?.title ||
        course?.main_course ||
        ""
    );
}

function getUniversityDescription(
    university,
    detailsResult
) {
    return cleanText(
        university?.description ||
        university?.about ||
        university?.overview ||
        university
            ?.university_description ||
        detailsResult?.description ||
        detailsResult?.about ||
        detailsResult?.overview ||
        detailsResult
            ?.info?.description ||
        detailsResult
            ?.info?.about ||
        ""
    );
}

function getUniversityWebsite(
    university,
    detailsResult
) {
    return cleanText(
        university?.website ||
        university?.website_url ||
        university?.url ||
        detailsResult?.website ||
        detailsResult
            ?.info?.website ||
        ""
    );
}

function getUniversityLogo(
    university,
    detailsResult
) {
    return cleanText(
        university?.logo ||
        university
            ?.university_logo ||
        university?.image ||
        detailsResult?.logo ||
        detailsResult
            ?.university_logo ||
        detailsResult
            ?.info?.logo ||
        ""
    );
}

function makeAbsoluteUrl(
    value
) {
    const cleanValue =
        cleanText(
            value
        );

    if (!cleanValue) {
        return "";
    }

    if (
        cleanValue.startsWith(
            "http://"
        ) ||
        cleanValue.startsWith(
            "https://"
        )
    ) {
        return cleanValue;
    }

    if (
        cleanValue.startsWith(
            "/"
        )
    ) {
        return `${SITE_URL}${cleanValue}`;
    }

    return "";
}

function stringifyJsonLd(
    data
) {
    return JSON.stringify(
        data
    ).replace(
        /</g,
        "\\u003c"
    );
}

function JsonLd({
    data,
}) {
    if (!data) {
        return null;
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html:
                    stringifyJsonLd(
                        data
                    ),
            }}
        />
    );
}

/* =========================================================
   PAGE
========================================================= */

export default async function UniversityDetailsPage({
    params,
    searchParams,
}) {
    const {
        slug: rawSlug,
    } = await params;

    const slug =
        normalizeSlug(
            rawSlug
        );

    if (!slug) {
        notFound();
    }

    /* =====================================================
       DESTINATION PROTECTION

       Example:

       /universities/canada

       →

       /universities-in-canada
    ===================================================== */

    const destination =
        await resolveDestination(
            slug
        );

    if (destination) {
        permanentRedirect(
            `/universities-in-${destination.slug}`
        );
    }

    /* =====================================================
       RESOLVE UNIVERSITY
    ===================================================== */

    const resolved =
        await resolveUniversity(
            slug
        );

    if (!resolved) {
        notFound();
    }

    if (
        !resolved?.id ||
        !resolved?.details ||
        !resolved?.university
    ) {
        notFound();
    }

    /* =====================================================
       INTERNAL UNIVERSITY ID
    ===================================================== */

    const universityId =
        cleanId(
            resolved.id
        );

    if (!universityId) {
        notFound();
    }

    const university =
        resolved.university;

    const detailsResult =
        resolved.details;

    /* =====================================================
       UNIVERSITY NAME
    ===================================================== */

    const universityName =
        cleanText(
            getUniversityName(
                university
            )
        );

    if (!universityName) {
        notFound();
    }

    /* =====================================================
       COURSES
    ===================================================== */

    const detailsCourses =
        extractCourses(
            detailsResult
        );

    /* =====================================================
       COUNTRY

       Country remains internal/SEO metadata.
       It is NOT part of the canonical university URL.
    ===================================================== */

    const resolvedCountryName =
        cleanText(
            resolved
                ?.countryName ??
            university
                ?.country ??
            university
                ?.country_name ??
            university
                ?.destination ??
            university
                ?.destination_name ??
            detailsCourses?.[0]
                ?.country ??
            detailsCourses?.[0]
                ?.country_name ??
            ""
        );

    /* =====================================================
       CANONICAL UNIVERSITY SLUG

       ONE PUBLIC FORMAT:

       Coventry University

       →

       /universities/coventry-university

       No country.
       No backend ID.
    ===================================================== */

    const canonicalSlug =
        createUniversityPublicSlug(
            {
                ...university,

                name:
                    universityName,
            }
        );

    if (!canonicalSlug) {
        notFound();
    }

    /* =====================================================
       PERMANENTLY CONSOLIDATE OLD URLS

       Example:

       /universities/coventry-university-uk

       →

       /universities/coventry-university
    ===================================================== */

    if (
        canonicalSlug !==
        slug
    ) {
        permanentRedirect(
            `/universities/${canonicalSlug}`
        );
    }

    /* =====================================================
       CANONICAL URL

       Declare ONCE only.
    ===================================================== */

    const canonicalUrl =
        `${SITE_URL}/universities/${canonicalSlug}`;

    /* =====================================================
       MAIN COURSE CATEGORY
    ===================================================== */

    const initialCourseCategoryId =
        cleanId(
            detailsCourses?.[0]
                ?.c_id ??
            detailsCourses?.[0]
                ?.main_course_id ??
            detailsCourses?.[0]
                ?.maincourse_id ??
            ""
        );

    /* =====================================================
       MAIN COURSES

       Exact backend university ID is used internally.
    ===================================================== */

    const mainCourses =
        await getUniversityMainCourses(
            universityId
        );

    /* =====================================================
       CLIENT DATA
    ===================================================== */

    const initialData = {
        ...detailsResult,

        course:
            detailsCourses,

        courses:
            detailsCourses,

        mainCourses:
            Array.isArray(
                mainCourses
            )
                ? mainCourses
                : [],

        initialCourseCategoryId,
    };

    /* =====================================================
       INITIAL TAB
    ===================================================== */

    const resolvedSearchParams =
        await searchParams;

    const initialTab =
        resolvedSearchParams
            ?.tab ===
        "courses"
            ? "courses"
            : "about";

    /* =====================================================
       SEO DATA
    ===================================================== */

    const universityDescription =
        getUniversityDescription(
            university,
            detailsResult
        );

    const universityWebsite =
        getUniversityWebsite(
            university,
            detailsResult
        );

    const universityLogo =
        makeAbsoluteUrl(
            getUniversityLogo(
                university,
                detailsResult
            )
        );

    const countrySlug =
        normalizeCountrySlug(
            resolvedCountryName
        );

    const countryUniversitiesUrl =
        countrySlug
            ? `${SITE_URL}/universities-in-${countrySlug}`
            : "";

    /* =====================================================
       BREADCRUMBS
    ===================================================== */

    const breadcrumbItems = [
        {
            "@type":
                "ListItem",

            position: 1,

            name:
                "Home",

            item:
                SITE_URL,
        },
        {
            "@type":
                "ListItem",

            position: 2,

            name:
                "Universities",

            item:
                `${SITE_URL}/universities`,
        },
    ];

    if (
        resolvedCountryName &&
        countryUniversitiesUrl
    ) {
        breadcrumbItems.push(
            {
                "@type":
                    "ListItem",

                position:
                    breadcrumbItems
                        .length + 1,

                name:
                    `Universities in ${resolvedCountryName}`,

                item:
                    countryUniversitiesUrl,
            }
        );
    }

    breadcrumbItems.push(
        {
            "@type":
                "ListItem",

            position:
                breadcrumbItems.length +
                1,

            name:
                universityName,

            item:
                canonicalUrl,
        }
    );

    const breadcrumbJsonLd = {
        "@context":
            "https://schema.org",

        "@type":
            "BreadcrumbList",

        "@id":
            `${canonicalUrl}#breadcrumb`,

        itemListElement:
            breadcrumbItems,
    };

    /* =====================================================
       UNIVERSITY SCHEMA
    ===================================================== */

    const universityJsonLd = {
        "@context":
            "https://schema.org",

        "@type":
            "CollegeOrUniversity",

        "@id":
            `${canonicalUrl}#university`,

        name:
            universityName,

        url:
            canonicalUrl,

        ...(universityDescription && {
            description:
                universityDescription,
        }),

        ...(universityLogo && {
            logo:
                universityLogo,

            image:
                universityLogo,
        }),

        ...(resolvedCountryName && {
            address: {
                "@type":
                    "PostalAddress",

                addressCountry:
                    resolvedCountryName,
            },
        }),

        ...(universityWebsite && {
            sameAs: [
                universityWebsite,
            ],
        }),
    };

    /* =====================================================
       WEBPAGE SCHEMA
    ===================================================== */

    const webPageJsonLd = {
        "@context":
            "https://schema.org",

        "@type":
            "WebPage",

        "@id":
            `${canonicalUrl}#webpage`,

        url:
            canonicalUrl,

        name:
            resolvedCountryName
                ? `${universityName} - Courses, Admissions & Study in ${resolvedCountryName}`
                : `${universityName} - Courses & Admissions`,

        description:
            universityDescription ||
            (
                resolvedCountryName
                    ? `Explore ${universityName} in ${resolvedCountryName}. Find courses, admission information and study abroad guidance for international students with Medcity Overseas.`
                    : `Explore ${universityName}, available courses, admission information and study abroad guidance with Medcity Overseas.`
            ),

        isPartOf: {
            "@id":
                `${SITE_URL}/#website`,
        },

        about: {
            "@id":
                `${canonicalUrl}#university`,
        },

        breadcrumb: {
            "@id":
                `${canonicalUrl}#breadcrumb`,
        },

        inLanguage:
            "en-IN",
    };

    /* =====================================================
       COURSE SCHEMA
    ===================================================== */

    const validSchemaCourses =
        detailsCourses
            .map(
                (
                    course
                ) => ({
                    name:
                        getCourseName(
                            course
                        ),
                })
            )
            .filter(
                (
                    course
                ) =>
                    Boolean(
                        course.name
                    )
            )
            .slice(
                0,
                50
            );

    const coursesJsonLd =
        validSchemaCourses.length > 0
            ? {
                  "@context":
                      "https://schema.org",

                  "@type":
                      "ItemList",

                  "@id":
                      `${canonicalUrl}#courses`,

                  name:
                      `Courses at ${universityName}`,

                  numberOfItems:
                      validSchemaCourses.length,

                  itemListElement:
                      validSchemaCourses.map(
                          (
                              course,
                              index
                          ) => ({
                              "@type":
                                  "ListItem",

                              position:
                                  index + 1,

                              item: {
                                  "@type":
                                      "Course",

                                  name:
                                      course.name,

                                  provider: {
                                      "@type":
                                          "CollegeOrUniversity",

                                      "@id":
                                          `${canonicalUrl}#university`,

                                      name:
                                          universityName,
                                  },
                              },
                          })
                      ),
              }
            : null;

    /* =====================================================
       DEVELOPMENT DEBUG
    ===================================================== */

    if (
        process.env.NODE_ENV ===
        "development"
    ) {
        console.log(
            "UNIVERSITY PAGE DATA",
            {
                requestedSlug:
                    slug,

                canonicalSlug,

                canonicalUrl,

                universityId,

                universityName,

                countryId:
                    getUniversityCountryId(
                        university
                    ),

                country:
                    resolvedCountryName,

                countrySlug,

                detailsCourses:
                    detailsCourses.length,

                initialCourseCategoryId,

                mainCourses:
                    Array.isArray(
                        mainCourses
                    )
                        ? mainCourses.length
                        : 0,
            }
        );
    }

    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <>
            <JsonLd
                data={
                    breadcrumbJsonLd
                }
            />

            <JsonLd
                data={
                    universityJsonLd
                }
            />

            <JsonLd
                data={
                    webPageJsonLd
                }
            />

            <JsonLd
                data={
                    coursesJsonLd
                }
            />

            <UniversityDetailsClient
                id={
                    universityId
                }
                initialData={
                    initialData
                }
                initialTab={
                    initialTab
                }
            />
        </>
    );
}