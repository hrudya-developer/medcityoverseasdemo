import {
    notFound,
} from "next/navigation";

import {
    createSlug,
} from "@/lib/slug";

import {
    postOverseasForm,
} from "@/lib/overseasApi";

import CountryUniversitiesHero from "./components/CountryUniversitiesHero";
import UniversitiesSection from "./components/UniversitiesSection";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
    "https://medcityoverseas.com";

const OG_IMAGE =
    `${SITE_URL}/og-images/universities.webp`;

export const revalidate =
    3600;

/* =========================================================
   HELPERS
========================================================= */

function cleanText(
    value = ""
) {
    return String(
        value ?? ""
    )
        .replace(
            /\s+/g,
            " "
        )
        .trim();
}

function serializeJsonLd(
    data
) {
    return JSON.stringify(
        data
    ).replace(
        /</g,
        "\\u003c"
    );
}

function getDestinationName(
    destination
) {
    return cleanText(
        destination?.country ||
        destination?.name ||
        destination?.destination ||
        destination?.country_name ||
        ""
    );
}

function getDestinationId(
    destination
) {
    return cleanText(
        destination?.d_id ||
        destination?.id ||
        destination?.destination_id ||
        ""
    );
}

function getUniversityName(
    university
) {
    return cleanText(
        university?.name ||
        university?.university ||
        university?.university_name ||
        university?.u_name ||
        "University"
    );
}

function getUniversityLocation(
    university,
    fallback = ""
) {
    return cleanText(
        university?.location ||
        university?.city ||
        university?.place ||
        university?.address ||
        fallback
    );
}

function getUniversityId(
    university,
    fallback = ""
) {
    return cleanText(
        university?.id ||
        university?.u_id ||
        university?.university_id ||
        fallback
    );
}

function getUniversityDescription(
    university,
    name,
    countryName
) {
    const description =
        cleanText(
            university?.description ||
            university?.about ||
            university?.short_description ||
            ""
        );

    if (description) {
        return description;
    }

    return `Explore ${name} in ${countryName}, including available courses, study opportunities and university information for international students.`;
}

/* =========================================================
   GET DESTINATION
========================================================= */

async function getDestination(
    countrySlug
) {
    try {
        const result =
            await postOverseasForm(
                "getDestinations",
                {
                    uid: 0,
                },
                {
                    next: {
                        revalidate:
                            3600,
                    },
                }
            );

        const destinations =
            Array.isArray(
                result?.destinations
            )
                ? result.destinations
                : Array.isArray(
                      result?.data
                  )
                  ? result.data
                  : [];

        return (
            destinations.find(
                (
                    destination
                ) => {
                    const name =
                        getDestinationName(
                            destination
                        );

                    return (
                        name &&
                        createSlug(
                            name
                        ) ===
                            countrySlug
                    );
                }
            ) || null
        );
    } catch (
        error
    ) {
        console.error(
            "Destination loading error:",
            error
        );

        return null;
    }
}

/* =========================================================
   GET UNIVERSITIES
========================================================= */

async function getUniversities(
    countryId
) {
    const params =
        new URLSearchParams({
            countryId:
                String(
                    countryId
                ),

            uid:
                "0",

            offset:
                "0",

            keyword:
                "alluniversities",
        });

    const appUrl =
        process.env
            .NEXT_PUBLIC_SITE_URL ||
        (process.env
            .NODE_ENV ===
        "development"
            ? "http://localhost:3000"
            : SITE_URL);

    try {
        const response =
            await fetch(
                `${appUrl}/api/search/universities?${params.toString()}`,
                {
                    next: {
                        revalidate:
                            3600,
                    },
                }
            );

        if (
            !response.ok
        ) {
            console.error(
                "University API status:",
                response.status
            );

            return {
                universities:
                    [],

                universityImagePath:
                    "",
            };
        }

        const result =
            await response.json();

        const universities =
            Array.isArray(
                result?.universities
            )
                ? result.universities
                : [];

        const universityImagePath =
            result
                ?.universities_image_path ||
            result
                ?.university_image_path ||
            result
                ?.universityImagePath ||
            result?.imagePath ||
            "";

        return {
            universities,
            universityImagePath,
        };
    } catch (
        error
    ) {
        console.error(
            "University list loading error:",
            error
        );

        return {
            universities:
                [],

            universityImagePath:
                "",
        };
    }
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
    params,
}) {
    const {
        country:
            countrySlug,
    } = await params;

    const destination =
        await getDestination(
            countrySlug
        );

    if (
        !destination
    ) {
        return {
            title: {
                absolute:
                    "Universities Abroad | Medcity Overseas",
            },

            description:
                "Explore international universities and study abroad opportunities with Medcity Overseas.",

            robots: {
                index:
                    false,

                follow:
                    false,
            },
        };
    }

    const countryName =
        getDestinationName(
            destination
        );

    const canonical =
        `${SITE_URL}/universities-in-${countrySlug}`;

    /* =====================================================
       TITLE

       Keep the primary keyword close to the beginning.
    ===================================================== */

    const title =
        `Universities in ${countryName} for Indian Students | Medcity Overseas`;

    const description =
        `Explore universities in ${countryName} for Indian students. Compare institutions, courses, admissions and study opportunities with guidance from Medcity Overseas.`;

    return {
        title: {
            absolute:
                title,
        },

        description,

        /* =====================================================
           KEYWORDS

           Not a major Google ranking factor, but useful as
           descriptive metadata for some search/indexing systems.
        ===================================================== */

        keywords: [
            `universities in ${countryName}`,
            `universities in ${countryName} for Indian students`,
            `study in ${countryName}`,
            `${countryName} universities`,
            `best universities in ${countryName}`,
            `international universities in ${countryName}`,
            `${countryName} university courses`,
            `${countryName} university admissions`,
            `study abroad in ${countryName}`,
            `Medcity Overseas ${countryName}`,
        ],

        alternates: {
            canonical,
        },

        openGraph: {
            type:
                "website",

            locale:
                "en_IN",

            url:
                canonical,

            siteName:
                "Medcity Overseas",

            title,

            description,

            images: [
                {
                    url:
                        OG_IMAGE,

                    width:
                        1200,

                    height:
                        630,

                    alt:
                        `Universities in ${countryName} for Indian students`,
                },
            ],
        },

        twitter: {
            card:
                "summary_large_image",

            title,

            description,

            images: [
                OG_IMAGE,
            ],
        },

        robots: {
            index:
                true,

            follow:
                true,

            googleBot: {
                index:
                    true,

                follow:
                    true,

                "max-image-preview":
                    "large",

                "max-snippet":
                    -1,

                "max-video-preview":
                    -1,
            },
        },
    };
}

/* =========================================================
   PAGE
========================================================= */

export default async function UniversitiesByCountryPage({
    params,
}) {
    const {
        country:
            countrySlug,
    } = await params;

    /* =====================================================
       DESTINATION
    ===================================================== */

    const destination =
        await getDestination(
            countrySlug
        );

    if (
        !destination
    ) {
        notFound();
    }

    const countryId =
        getDestinationId(
            destination
        );

    const countryName =
        getDestinationName(
            destination
        );

    if (
        !countryId
    ) {
        notFound();
    }

    /* =====================================================
       UNIVERSITIES
    ===================================================== */

    const {
        universities,
        universityImagePath,
    } =
        await getUniversities(
            countryId
        );

    /*
     * IMPORTANT:
     *
     * Preserve the complete API university object.
     * Fields such as:
     *
     * logo
     * image
     * d_id
     * rank
     *
     * may be required by the UI.
     */

    const universityItems =
        universities.map(
            (
                university,
                index
            ) => {
                const name =
                    getUniversityName(
                        university
                    );

                return {
                    ...university,

                    id:
                        getUniversityId(
                            university,
                            `${createSlug(
                                name
                            )}-${index}`
                        ),

                    name,

                    slug:
                        createSlug(
                            name
                        ),

                    location:
                        getUniversityLocation(
                            university,
                            countryName
                        ),
                };
            }
        );

    /* =====================================================
       SEO URLS
    ===================================================== */

    const pageUrl =
        `${SITE_URL}/universities-in-${countrySlug}`;

    /* =====================================================
       COLLECTION PAGE SCHEMA
    ===================================================== */

    const pageJsonLd = {
        "@context":
            "https://schema.org",

        "@type":
            "CollectionPage",

        "@id":
            `${pageUrl}#webpage`,

        url:
            pageUrl,

        name:
            `Universities in ${countryName} for Indian Students`,

        headline:
            `Universities in ${countryName} for Indian Students`,

        description:
            `Explore universities in ${countryName}, compare institutions and discover international study opportunities with Medcity Overseas.`,

        inLanguage:
            "en-IN",

        isPartOf: {
            "@id":
                `${SITE_URL}/#website`,
        },

        about: {
            "@type":
                "Country",

            name:
                countryName,
        },

        publisher: {
            "@id":
                `${SITE_URL}/#organization`,
        },

        breadcrumb: {
            "@id":
                `${pageUrl}#breadcrumb`,
        },

        mainEntity: {
            "@id":
                `${pageUrl}#universities-list`,
        },
    };

    /* =====================================================
       BREADCRUMB SCHEMA
    ===================================================== */

    const breadcrumbJsonLd = {
        "@context":
            "https://schema.org",

        "@type":
            "BreadcrumbList",

        "@id":
            `${pageUrl}#breadcrumb`,

        itemListElement: [
            {
                "@type":
                    "ListItem",

                position:
                    1,

                name:
                    "Home",

                item:
                    SITE_URL,
            },

            {
                "@type":
                    "ListItem",

                position:
                    2,

                name:
                    "Universities",

                item:
                    `${SITE_URL}/universities`,
            },

            {
                "@type":
                    "ListItem",

                position:
                    3,

                name:
                    `Universities in ${countryName}`,

                item:
                    pageUrl,
            },
        ],
    };

    /* =====================================================
       UNIVERSITY ITEM LIST SCHEMA
    ===================================================== */

    const universitiesJsonLd = {
        "@context":
            "https://schema.org",

        "@type":
            "ItemList",

        "@id":
            `${pageUrl}#universities-list`,

        name:
            `Universities in ${countryName}`,

        description:
            `Directory of universities in ${countryName} for students exploring international education opportunities.`,

        numberOfItems:
            universityItems.length,

        itemListOrder:
            "https://schema.org/ItemListOrderUnordered",

        itemListElement:
            universityItems.map(
                (
                    university,
                    index
                ) => {
                    const universityName =
                        getUniversityName(
                            university
                        );

                    const universitySlug =
                        university
                            ?.slug ||
                        createSlug(
                            universityName
                        );

                    const universityUrl =
                        `${SITE_URL}/university-details/${universitySlug}`;

                    const location =
                        getUniversityLocation(
                            university,
                            countryName
                        );

                    return {
                        "@type":
                            "ListItem",

                        position:
                            index +
                            1,

                        url:
                            universityUrl,

                        item: {
                            "@type":
                                "CollegeOrUniversity",

                            "@id":
                                `${universityUrl}#university`,

                            name:
                                universityName,

                            url:
                                universityUrl,

                            description:
                                getUniversityDescription(
                                    university,
                                    universityName,
                                    countryName
                                ),

                            address: {
                                "@type":
                                    "PostalAddress",

                                addressLocality:
                                    location,

                                addressCountry:
                                    countryName,
                            },
                        },
                    };
                }
            ),
    };

    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <>
            {/* =============================================
                STRUCTURED DATA
            ============================================= */}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        serializeJsonLd(
                            pageJsonLd
                        ),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        serializeJsonLd(
                            breadcrumbJsonLd
                        ),
                }}
            />

            {universityItems.length >
                0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html:
                            serializeJsonLd(
                                universitiesJsonLd
                            ),
                    }}
                />
            )}

            {/* =============================================
                EXISTING PAGE

                Functionality and UI remain unchanged.
            ============================================= */}

            <main
                className="
                    min-h-screen
                    overflow-hidden
                    bg-[#f7f9fd]
                "
            >
                <CountryUniversitiesHero
                    countryName={
                        countryName
                    }
                    universityCount={
                        universityItems.length
                    }
                />

                <UniversitiesSection
                    countryName={
                        countryName
                    }
                    universities={
                        universityItems
                    }
                    universityImagePath={
                        universityImagePath
                    }
                />
            </main>
        </>
    );
}