import FAQ from "@/components/home/FAQ/FAQ";
import StudyTabContent from "@/components/home/services/programs/StudyTabContent";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/popular-courses`;
const OG_IMAGE = `${SITE_URL}/og-images/popular-courses-og.webp`;

export const metadata = {
    title:
        "Popular Study Abroad Courses | Top International Programs | Medcity",

    description:
        "Explore the most popular study abroad courses offered by leading international universities. Compare programs, discover career opportunities and choose the right course with Medcity Study Abroad.",

    keywords: [
        "popular study abroad courses",
        "international courses",
        "top study abroad programs",
        "study abroad degrees",
        "overseas education courses",
        "Germany courses",
        "UK courses",
        "Canada courses",
        "Australia courses",
        "Medcity Study Abroad",
    ],

    alternates: {
        canonical: PAGE_URL,
    },

    openGraph: {
        title:
            "Popular Study Abroad Courses | Medcity Study Abroad",
        description:
            "Browse the most in-demand international study programs across top universities worldwide.",

        url: PAGE_URL,
        siteName: "Medcity Study Abroad",
        type: "website",
        locale: "en_IN",

        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt: "Popular Study Abroad Courses",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title:
            "Popular Study Abroad Courses | Medcity",

        description:
            "Discover the most popular international study programs and universities.",

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
    name: "Popular Study Abroad Courses",
    description:
        "Browse the most popular international study programs offered by universities around the world.",

    url: PAGE_URL,

    isPartOf: {
        "@type": "WebSite",
        name: "Medcity Study Abroad",
        url: SITE_URL,
    },

    provider: {
        "@type": "Organization",
        name: "Medcity Study Abroad",
        url: SITE_URL,
    },
};

export default function PopularCoursesPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        structuredData
                    ),
                }}
            />

            <StudyTabContent />
            <FAQ />
        </>
    );
}