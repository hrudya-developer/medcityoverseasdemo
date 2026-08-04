import StudyAbroadBlogClient from "./StudyAbroadBlogClient";

const SITE_URL =
    "https://medcityoverseas.com";

const PAGE_URL =
    `${SITE_URL}/study-abroad-blog`;

const OG_IMAGE =
    `${SITE_URL}/og-images/study-abroad-blog-og.webp`;

export const metadata = {
    title:
        "Study Abroad Blogs, Visa Tips & Student Guides | Medcity",

    description:
        "Read expert study abroad blogs covering student visas, scholarships, university admissions, destinations, courses and international student experiences.",

    keywords: [
        "study abroad blogs",
        "student visa guidance",
        "study abroad scholarships",
        "international education blog",
        "overseas education tips",
        "study abroad destinations",
        "university admission guidance",
        "Medcity Study Abroad blog",
    ],

    alternates: {
        canonical: PAGE_URL,
    },

    openGraph: {
        title:
            "Study Abroad Blogs and Student Guides | Medcity",
        description:
            "Explore expert advice on visas, scholarships, admissions, destinations and international student life.",
        url: PAGE_URL,
        siteName: "Medcity Study Abroad",
        type: "website",
        locale: "en_IN",
        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt:
                    "Medcity Study Abroad Blogs",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title:
            "Study Abroad Blogs and Student Guides | Medcity",
        description:
            "Read expert advice on international education, visas, scholarships and admissions.",
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
    "@type": "Blog",
    name:
        "Medcity Study Abroad Blog",
    description:
        "Study abroad articles covering visas, scholarships, admissions, destinations and student experiences.",
    url: PAGE_URL,
    publisher: {
        "@type": "Organization",
        name: "Medcity Study Abroad",
        url: SITE_URL,
    },
};

export default function StudyAbroadBlogPage() {
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

            <StudyAbroadBlogClient />
        </>
    );
}