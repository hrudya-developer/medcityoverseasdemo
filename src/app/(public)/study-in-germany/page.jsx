import {
    getGermanProgramsList,
} from "@/lib/germanPrograms";

import GermanProgramsClient from "./GermanProgramsClient";
import WhyStudyGermany from "./components/WhyStudyGermany";
import StudyInGermanyHero from "./components/StudyInGermanyHero";
import StudyInGermanyFAQ from "./components/StudyInGermanyFAQ";
import { applySeoOverrides, withPageSeoFaqs } from "@/lib/pageSeo";
import Link from "next/link";
import { faqs } from "./components/studyInGermanyFaqData";
import OfficialSources from "@/components/seo/OfficialSources";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";
import { getCountryFacts } from "@/lib/countryFacts";
import { getLiveDestination } from "@/lib/destinationSummary";
import { OFFICIAL_SOURCES } from "@/lib/officialSources";
import { createSlug } from "@/lib/slug";
import { faqPageNode, joinList, latestDate, organizationNode, websiteNode } from "@/lib/seoSchema";

// The date this page's text was last changed; the page shows this or
// its newest German university or course record, whichever is later.
const PAGE_UPDATED = "2026-10-23";

const GERMANY_SOURCES = [
    ...OFFICIAL_SOURCES.germany,
    {
        label: "DAAD (German Academic Exchange Service)",
        href: "https://www.daad.de/en/",
        note: "Admission rules, scholarships and the admission database for international students.",
    },
    {
        label: "uni-assist",
        href: "https://www.uni-assist.de/en/",
        note: "The application service many German universities use for international applicants.",
    },
];

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
    "Study in Germany from Kerala: Ausbildung | Medcity Overseas";

const PAGE_DESCRIPTION =
    "Study in Germany from Kerala with Medcity Overseas: university courses, Ausbildung, nursing pathways, eligibility, admissions and student visa guidance.";

const OG_IMAGE =
    `${SITE_URL}/og-images/study-in-germany.webp`;

/* =========================================================
   METADATA
========================================================= */

const pageMetadata = {
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

// Read straight from the database on each request (same server, a few
// milliseconds). Prerendering at build time cannot reach the database on
// Hostinger's build machines and would publish an empty page.
export const dynamic = "force-dynamic";

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
            6,
            {
                // At runtime a failed refresh throws, so Next keeps
                // serving the last good page instead of an empty one.
                throwOnError:
                    process.env.NEXT_PHASE !==
                    "phase-production-build",
            }
        );

    const validPrograms =
        Array.isArray(
            programs
        )
            ? programs
            : [];

    const germany =
        await getLiveDestination("germany");

    const facts =
        germany
            ? await getCountryFacts(germany.id)
            : null;

    const dateModified =
        latestDate(
            facts?.latest,
            PAGE_UPDATED
        );

    const programLinks =
        validPrograms
            .map((program) => {
                const name = String(program?.name || program?.title || "").trim();
                const slug = createSlug(name);

                return name && slug ? { name, href: `/study-in-germany/${slug}` } : null;
            })
            .filter(Boolean);

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
                            await withPageSeoFaqs({
                                "@context": "https://schema.org",
                                "@graph": [
                                    organizationNode(),
                                    websiteNode(),
                                    faqPageNode(PAGE_PATH, faqs),
                                ],
                            })
                        ),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        serializeJsonLd({
                            ...webPageJsonLd,
                            author: {
                                "@id": `${SITE_URL}/#organization`,
                            },
                            dateModified,
                        }),
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

            <div
                className="
                    min-h-screen
                    bg-slate-50
                "
            >
                <StudyInGermanyHero />

                <div className="space-y-12 bg-white py-12">
                    <QuickAnswer updated={dateModified}>
                        {`Germany offers university degrees, paid vocational training (Ausbildung) and voluntary services for students from India${
                            programLinks.length ? `. Medcity Overseas guides students through ${joinList(programLinks.slice(0, 5).map((program) => program.name))}` : ""
                        }${
                            facts?.universities > 0
                                ? `, and lists ${facts.universities} ${facts.universities === 1 ? "university" : "universities"} in Germany${facts.courses > 0 ? ` with ${facts.courses.toLocaleString("en-IN")} courses` : ""}`
                                : ""
                        }. Most pathways need German language skills, and our counsellors in Kerala help you choose and apply.`}
                    </QuickAnswer>

                    <QuestionAnswer
                        eyebrow="Choosing a pathway"
                        question="Which Germany programme is right for you?"
                        answer="The right Germany programme depends on your education and goals. University study suits students who want a bachelor's or master's degree, Ausbildung suits those who want paid vocational training, and voluntary services such as FSJ or BFD give work experience in Germany. Most pathways need German language skills."
                        points={programLinks.map((program) => (
                            <Link key={program.href} href={program.href} className="font-bold text-slate-900 hover:text-primary hover:underline">
                                {program.name} in Germany
                            </Link>
                        ))}
                    />

                    <p className="mx-auto max-w-5xl px-4 text-sm leading-7 text-slate-600 sm:px-6 lg:px-8">
                        Browse{" "}
                        <Link href="/universities-in-germany" className="font-bold text-primary hover:underline">
                            universities in Germany
                        </Link>
                        , search the{" "}
                        <Link href="/courses" className="font-bold text-primary hover:underline">
                            course finder
                        </Link>{" "}
                        or{" "}
                        <Link href="/contact-us" className="font-bold text-primary hover:underline">
                            book free counselling
                        </Link>
                        .
                    </p>
                </div>

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

                <OfficialSources
                    className="py-14"
                    title="Official sources for studying in Germany"
                    links={GERMANY_SOURCES}
                />
            </div>
        </>
    );
}

// Search details edited in the admin apply on top of these.
export async function generateMetadata() {
  return applySeoOverrides(pageMetadata);
}
