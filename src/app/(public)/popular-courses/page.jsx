import FAQ from "@/components/home/FAQ/FAQ";
import StudyTabContent from "@/components/home/services/programs/StudyTabContent";
import PopularCoursesFAQ from "./PopularCoursesFAQ";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_PATH = "/popular-courses";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH = "/og-images/popular-courses-og.webp";
const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

const PAGE_TITLE = "Popular Study Abroad Courses and Programs";

const PAGE_DESCRIPTION =
    "Explore popular study abroad courses offered by international universities. Compare programs, study destinations and career opportunities with guidance from Medcity Overseas.";

export const metadata = {
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
    ],
};

function serializeJsonLd(data) {
    return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function PopularCoursesPage() {
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
                        Browse popular international course categories
                    </h1>

                    <StudyTabContent />
                </section>

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
            </div>
        </>
    );
}