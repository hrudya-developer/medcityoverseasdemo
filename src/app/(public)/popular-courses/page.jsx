
import StudyTabContent from "@/components/home/services/programs/StudyTabContent";
import PopularCoursesFAQ from "./PopularCoursesFAQ";
import { applySeoOverrides } from "@/lib/pageSeo";
import Link from "next/link";
import { faqs } from "./popularCoursesFaqData";
import CourseAreasTable from "@/components/seo/CourseAreasTable";
import OfficialSources from "@/components/seo/OfficialSources";
import GuideLinks, { GUIDES } from "@/components/landing/GuideLinks";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";
import { getCourseAreaSummaries } from "@/lib/courseAreaSummary";
import { faqPageNode, jsonLdString, organizationNode, websiteNode } from "@/lib/seoSchema";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_PATH = "/popular-courses";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH = "/og-images/popular-courses-og.webp";
const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

const PAGE_TITLE = "Popular Study Abroad Courses and Programs";

const PAGE_DESCRIPTION =
    "Explore popular study abroad courses at international universities. Compare programs, destinations, durations and careers with guidance from Medcity Overseas.";

// Update when the content of this page is reviewed.
const PAGE_UPDATED = "2026-10-23";

const OFFICIAL_SOURCES = [
    {
        label: "DAAD international programmes",
        href: "https://www.daad.de/en/",
        note: "Search degree programmes in Germany, including English-taught ones.",
    },
    {
        label: "UCAS",
        href: "https://www.ucas.com/",
        note: "The UK's admissions service for undergraduate courses.",
    },
    {
        label: "Study Australia",
        href: "https://www.studyaustralia.gov.au/",
        note: "The Australian Government's course and institution search.",
    },
    {
        label: "UK Student visa (GOV.UK)",
        href: "https://www.gov.uk/student-visa",
        note: "Official rules for studying a course in the UK.",
    },
];

function listText(items) {
    return items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

const pageMetadata = {
    /*
     * Your root layout adds:
     * | Medcity Overseas
     */
    title: PAGE_TITLE,

    description: PAGE_DESCRIPTION,

    alternates: {
        canonical: PAGE_PATH,
    },

    openGraph: {
        type: "website",
        locale: "en_IN",
        url: PAGE_PATH,
        siteName: "Medcity Overseas",

        title: `${PAGE_TITLE} | Medcity Overseas`,

        description:
            "Browse popular international study programs across leading universities and study destinations.",

        images: [
            {
                url: OG_IMAGE_PATH,
                width: 1200,
                height: 630,
                alt: "Popular study abroad courses and international programs",
                type: "image/webp",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",

        title: `${PAGE_TITLE} | Medcity Overseas`,

        description:
            "Discover popular international university courses, study programs and career pathways.",

        images: [OG_IMAGE_PATH],
    },

    robots: {
        index: true,
        follow: true,

        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
};

const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
        organizationNode(),

        websiteNode(),

        {
            "@type": "CollectionPage",
            "@id": `${PAGE_URL}/#webpage`,

            url: PAGE_URL,
            name: PAGE_TITLE,
            description: PAGE_DESCRIPTION,

            image: {
                "@type": "ImageObject",
                url: OG_IMAGE_URL,
                width: 1200,
                height: 630,
            },

            inLanguage: "en-IN",

            isPartOf: {
                "@id": `${SITE_URL}/#website`,
            },

            about: [
                {
                    "@type": "Thing",
                    name: "Study abroad courses",
                },
                {
                    "@type": "Thing",
                    name: "International university programs",
                },
                {
                    "@type": "Thing",
                    name: "Overseas higher education",
                },
            ],

            publisher: {
                "@id": `${SITE_URL}/#organization`,
            },

            author: {
                "@id": `${SITE_URL}/#organization`,
            },

            dateModified: PAGE_UPDATED,

            breadcrumb: {
                "@id": `${PAGE_URL}/#breadcrumb`,
            },

            mainEntity: {
                "@id": `${PAGE_URL}/#popular-course-categories`,
            },
        },

        {
            "@type": "BreadcrumbList",
            "@id": `${PAGE_URL}/#breadcrumb`,

            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: SITE_URL,
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Popular Courses",
                    item: PAGE_URL,
                },
            ],
        },

        {
            "@type": "ItemList",
            "@id": `${PAGE_URL}/#popular-course-categories`,

            name: "Popular Study Abroad Course Categories",

            description:
                "Popular international study areas and course categories available through overseas universities.",

            itemListOrder:
                "https://schema.org/ItemListOrderUnordered",

            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    item: {
                        "@type": "Thing",
                        name: "Business and Management",
                    },
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    item: {
                        "@type": "Thing",
                        name: "Engineering and Technology",
                    },
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    item: {
                        "@type": "Thing",
                        name: "Computer Science and Information Technology",
                    },
                },
                {
                    "@type": "ListItem",
                    position: 4,
                    item: {
                        "@type": "Thing",
                        name: "Healthcare and Life Sciences",
                    },
                },
                {
                    "@type": "ListItem",
                    position: 5,
                    item: {
                        "@type": "Thing",
                        name: "Hospitality and Tourism",
                    },
                },
            ],
        },

        faqPageNode(PAGE_PATH, faqs),
    ],
};

const serializeJsonLd = jsonLdString;

export default async function PopularCoursesPage() {
    const areas = (await getCourseAreaSummaries()).filter((area) => area.courses > 0);
    const areaNames = areas.slice(0, 5).map((area) => area.name);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: serializeJsonLd(structuredData),
                }}
            />

            <div className="overflow-hidden bg-white">

                <section
                    aria-labelledby="popular-course-list-heading"
                    className="mt-10"
                >
                    <h1
                        id="popular-course-list-heading"
                        className="sr-only"
                    >
                        Popular Study Abroad Courses
                    </h1>

                    <QuickAnswer updated={PAGE_UPDATED} className="mb-10">
                        {areaNames.length
                            ? `Popular study abroad courses on Medcity Overseas include ${listText(areaNames)}. Compare courses at international universities by country, level, duration and intake, and talk to a Medcity Overseas counsellor before you apply.`
                            : "Popular study abroad courses include nursing, engineering, business, computer science and health sciences. Compare courses at international universities by country, level, duration and intake, and talk to a Medcity Overseas counsellor before you apply."}
                    </QuickAnswer>

                    <StudyTabContent />
                </section>

                <div className="space-y-14 py-12">
                    <QuestionAnswer
                        eyebrow="Choosing a course"
                        question="How do you choose a popular study abroad course?"
                        answer="Choose a study abroad course by matching it to your academic background, career plans and budget. Check the entry requirements, English or other language scores, course duration, intakes and tuition on each course page, then compare universities and countries. A Medcity Overseas counsellor can shortlist courses that fit your profile."
                        points={[
                            { title: "Background", text: "pick a subject that builds on what you have studied." },
                            { title: "Requirements", text: "check marks, test scores and documents on the course page." },
                            { title: "Duration and intake", text: "plan around when the course starts and how long it runs." },
                            { title: "Costs", text: "compare tuition and living costs with your budget." },
                        ]}
                    />

                    <CourseAreasTable />

                    <p className="mx-auto max-w-6xl px-4 text-sm leading-7 text-slate-600 sm:px-6 lg:px-8">
                        Search every course in the{" "}
                        <Link href="/courses" className="font-bold text-primary hover:underline">
                            course finder
                        </Link>
                        , compare{" "}
                        <Link href="/universities" className="font-bold text-primary hover:underline">
                            universities
                        </Link>
                        , explore{" "}
                        <Link href="/destinations" className="font-bold text-primary hover:underline">
                            study destinations
                        </Link>{" "}
                        or{" "}
                        <Link href="/contact-us" className="font-bold text-primary hover:underline">
                            book free counselling
                        </Link>
                        .
                    </p>
                </div>

                <section
                    id="popular-courses-faq"
                    aria-labelledby="popular-courses-faq-heading"
                    className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
                >
                    <h2
                        id="popular-courses-faq-heading"
                        className="sr-only"
                    >
                        Popular study abroad courses frequently asked questions
                    </h2>

                    <PopularCoursesFAQ />
                </section>

                <GuideLinks
                    className="pb-12"
                    title="Nursing and other guides"
                    links={[GUIDES.nurses, GUIDES.mscNursingUk, GUIDES.nursingAusbildung, GUIDES.after12th]}
                />

                <OfficialSources className="pb-16" links={OFFICIAL_SOURCES} />
            </div>
        </>
    );
}

// Search details edited in the admin apply on top of these.
export async function generateMetadata() {
  return applySeoOverrides(pageMetadata);
}
