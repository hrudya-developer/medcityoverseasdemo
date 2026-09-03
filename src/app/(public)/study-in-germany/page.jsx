import {
    getGermanProgramsList,
} from "@/lib/germanPrograms";

import GermanProgramsClient from "./GermanProgramsClient";
import WhyStudyGermany from "./components/WhyStudyGermany";
import StudyInGermanyHero from "./components/StudyInGermanyHero";
import StudyInGermanyFAQ from "./components/StudyInGermanyFAQ";

/* =========================================================
   SEO CONSTANTS
========================================================= */

const SITE_URL =
    "https://medcityoverseas.com";

const PAGE_PATH =
    "/study-in-germany";

const PAGE_URL =
    `${SITE_URL}${PAGE_PATH}`;

const SITE_NAME =
    "Medcity Overseas";

const PAGE_TITLE =
    "Study in Germany from Kerala | Ausbildung, Nursing & Courses";

const PAGE_DESCRIPTION =
    "Study in Germany from Kerala with Medcity Overseas. Explore university courses, Ausbildung programs, nursing pathways, eligibility, costs, admissions, student visas and application guidance.";

const OG_IMAGE =
    `${SITE_URL}/og-images/study-in-germany.webp`;

/* =========================================================
   METADATA
========================================================= */

export const metadata = {
    title: {
        absolute: PAGE_TITLE,
    },

    description:
        PAGE_DESCRIPTION,

    keywords: [
        "study in Germany from Kerala",
        "study in Germany",
        "Germany education consultants in Kerala",
        "Germany study abroad consultants Kerala",
        "study abroad Germany",
        "Ausbildung in Germany",
        "Ausbildung Germany for Indian students",
        "nursing Ausbildung Germany",
        "nursing in Germany",
        "study in Germany for Indian students",
        "Germany university admissions",
        "Germany student visa",
        "Germany courses for Indian students",
        "Medcity Overseas Germany",
    ],

    alternates: {
        canonical:
            PAGE_URL,
    },

    openGraph: {
        type: "website",
        locale: "en_IN",

        url:
            PAGE_URL,

        siteName:
            SITE_NAME,

        title:
            PAGE_TITLE,

        description:
            PAGE_DESCRIPTION,

        images: [
            {
                url:
                    OG_IMAGE,

                width: 1200,
                height: 630,

                alt:
                    "Study in Germany from Kerala with Medcity Overseas",
            },
        ],
    },

    twitter: {
        card:
            "summary_large_image",

        title:
            PAGE_TITLE,

        description:
            PAGE_DESCRIPTION,

        images: [
            OG_IMAGE,
        ],
    },

    robots: {
        index: true,
        follow: true,

        googleBot: {
            index: true,
            follow: true,

            "max-image-preview":
                "large",

            "max-snippet":
                -1,

            "max-video-preview":
                -1,
        },
    },
};

/* =========================================================
   CACHE
========================================================= */

export const revalidate =
    3600;

/* =========================================================
   STRUCTURED DATA
========================================================= */

const breadcrumbJsonLd = {
    "@context":
        "https://schema.org",

    "@type":
        "BreadcrumbList",

    "@id":
        `${PAGE_URL}#breadcrumb`,

    itemListElement: [
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
                "Study in Germany",

            item:
                PAGE_URL,
        },
    ],
};

const webPageJsonLd = {
    "@context":
        "https://schema.org",

    "@type":
        "WebPage",

    "@id":
        `${PAGE_URL}#webpage`,

    url:
        PAGE_URL,

    name:
        PAGE_TITLE,

    description:
        PAGE_DESCRIPTION,

    inLanguage:
        "en-IN",

    isPartOf: {
        "@id":
            `${SITE_URL}/#website`,
    },

    about: [
        {
            "@type":
                "Country",

            name:
                "Germany",
        },

        {
            "@type":
                "EducationalOrganization",

            "@id":
                `${SITE_URL}/#organization`,
        },
    ],

    publisher: {
        "@id":
            `${SITE_URL}/#organization`,
    },

    breadcrumb: {
        "@id":
            `${PAGE_URL}#breadcrumb`,
    },

    primaryImageOfPage: {
        "@type":
            "ImageObject",

        url:
            OG_IMAGE,

        width: 1200,
        height: 630,
    },
};

const serviceJsonLd = {
    "@context":
        "https://schema.org",

    "@type":
        "Service",

    "@id":
        `${PAGE_URL}#service`,

    name:
        "Study in Germany Guidance",

    serviceType:
        "Germany Study Abroad Counselling",

    description:
        PAGE_DESCRIPTION,

    url:
        PAGE_URL,

    provider: {
        "@id":
            `${SITE_URL}/#organization`,
    },

    areaServed: {
        "@type":
            "State",

        name:
            "Kerala",
    },

    audience: {
        "@type":
            "EducationalAudience",

        educationalRole:
            "student",
    },
};

/* =========================================================
   JSON-LD SERIALIZER
========================================================= */

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

/* =========================================================
   PAGE
========================================================= */

export default async function GermanProgramsPage() {
    const {
        programs,
        imagePath,
    } =
        await getGermanProgramsList(
            6
        );

    const validPrograms =
        Array.isArray(
            programs
        )
            ? programs
            : [];

    /* =====================================================
       DYNAMIC PROGRAM LIST SCHEMA
    ===================================================== */

    const programListJsonLd = {
        "@context":
            "https://schema.org",

        "@type":
            "ItemList",

        "@id":
            `${PAGE_URL}#programs`,

        name:
            "Study and Career Programs in Germany",

        description:
            "Germany study, Ausbildung and career pathways available through Medcity Overseas.",

        numberOfItems:
            validPrograms.length,

        itemListOrder:
            "https://schema.org/ItemListOrderUnordered",

        itemListElement:
            validPrograms.map(
                (
                    program,
                    index
                ) => {
                    const name =
                        program?.name ||
                        program?.program_name ||
                        program?.title ||
                        `Germany Program ${
                            index +
                            1
                        }`;

                    return {
                        "@type":
                            "ListItem",

                        position:
                            index +
                            1,

                        name,
                    };
                }
            ),
    };

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
                            webPageJsonLd
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

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        serializeJsonLd(
                            serviceJsonLd
                        ),
                }}
            />

            {validPrograms.length >
                0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html:
                            serializeJsonLd(
                                programListJsonLd
                            ),
                    }}
                />
            )}

            {/* =============================================
                PAGE
            ============================================= */}

            <main
                className="
                    min-h-screen
                    bg-slate-50
                "
            >
                <StudyInGermanyHero />

                <WhyStudyGermany />

                {/* =========================================
                    PROGRAMS
                ========================================= */}

                <section
                    aria-labelledby="german-programs-heading"
                    className="
                        mx-auto
                        max-w-7xl
                        px-4
                        py-12

                        sm:px-6

                        lg:px-8
                        lg:py-16
                    "
                >
                    <div
                        className="
                            mx-auto
                            max-w-3xl
                            text-center
                        "
                    >
                        <p
                            className="
                                text-sm
                                font-bold
                                uppercase
                                tracking-[0.18em]
                                text-primary
                            "
                        >
                            Explore Germany
                            Programs
                        </p>

                        <h2
                            id="german-programs-heading"
                            className="
                                mt-3
                                text-3xl
                                font-black
                                tracking-tight
                                text-darkPrimary

                                sm:text-4xl
                            "
                        >
                            Study, Ausbildung
                            and Career
                            Opportunities in
                            Germany
                        </h2>

                        <p
                            className="
                                mx-auto
                                mt-5
                                max-w-2xl
                                text-base
                                leading-8
                                text-slate-600

                                sm:text-lg
                            "
                        >
                            Explore university
                            study options,
                            Ausbildung programs,
                            nursing pathways and
                            career-focused
                            opportunities in
                            Germany. Compare
                            pathways based on
                            your qualifications,
                            interests and career
                            goals.
                        </p>
                    </div>

                    <div className="mt-10">
                        {validPrograms.length >
                        0 ? (
                            <GermanProgramsClient
                                programs={
                                    validPrograms
                                }
                                imagePath={
                                    imagePath
                                }
                            />
                        ) : (
                            <div
                                className="
                                    rounded-3xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-10
                                    text-center
                                    shadow-sm
                                "
                            >
                                <h3
                                    className="
                                        text-xl
                                        font-bold
                                        text-darkPrimary
                                    "
                                >
                                    Germany
                                    programs are
                                    currently
                                    unavailable
                                </h3>

                                <p
                                    className="
                                        mx-auto
                                        mt-2
                                        max-w-xl
                                        leading-7
                                        text-slate-600
                                    "
                                >
                                    Please check
                                    again later
                                    for available
                                    study,
                                    Ausbildung
                                    and career
                                    opportunities
                                    in Germany.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <StudyInGermanyFAQ />
            </main>
        </>
    );
}