import CoursePageClient from "./CoursePageClient";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/courses`;
const OG_IMAGE = `${SITE_URL}/images/courses/course-search-og.webp`;

export const metadata = {
    title:
        "Search Study Abroad Courses and Universities | Medcity",

    description:
        "Search study abroad courses by destination, university and study area. Explore international programs and find the right course with Medcity Study Abroad.",

    keywords: [
        "study abroad courses",
        "course search abroad",
        "international university courses",
        "study abroad programs",
        "overseas education courses",
        "Medcity Study Abroad",
    ],

    alternates: {
        canonical: PAGE_URL,
    },

    openGraph: {
        title:
            "Search Study Abroad Courses and Universities | Medcity",
        description:
            "Explore international universities and find study abroad courses based on your preferred destination and study area.",
        url: PAGE_URL,
        siteName: "Medcity Study Abroad",
        type: "website",
        locale: "en_IN",
        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt: "Search study abroad courses with Medcity",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title:
            "Search Study Abroad Courses and Universities | Medcity",
        description:
            "Find international courses by destination, university and study area.",
        images: [OG_IMAGE],
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
    "@type": "CollectionPage",
    name: "Study Abroad Course Search",
    description:
        "Search international study programs by destination, university and main course.",
    url: PAGE_URL,
    isPartOf: {
        "@type": "WebSite",
        name: "Medcity Study Abroad",
        url: SITE_URL,
    },
};

export default function CoursesPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />

            <CoursePageClient />
        </>
    );
}