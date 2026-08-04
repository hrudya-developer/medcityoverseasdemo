import CommunityPostsClient from "./CommunityPostsClient";

const SITE_URL =
    "https://medcityoverseas.com";

const PAGE_URL =
    `${SITE_URL}/community-posts`;

const OG_IMAGE =
    `${SITE_URL}/og-images/community-posts-og.webp`;

export const metadata = {
    title:
        "Study Abroad Community Posts & Student Updates | Medcity",

    description:
        "Explore study abroad community posts, student stories, international education updates, opportunities and announcements from Medcity Study Abroad.",

    keywords: [
        "study abroad community",
        "student study abroad stories",
        "international education updates",
        "study abroad opportunities",
        "overseas education news",
        "student community posts",
        "Medcity Study Abroad",
    ],

    alternates: {
        canonical: PAGE_URL,
    },

    openGraph: {
        title:
            "Study Abroad Community Posts | Medcity",
        description:
            "Read student stories, international education updates, opportunities and announcements from the Medcity global community.",
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
                    "Medcity Study Abroad Community Posts",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title:
            "Study Abroad Community Posts | Medcity",
        description:
            "Explore student stories, updates and international study opportunities.",
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

    name:
        "Study Abroad Community Posts",

    description:
        "Student stories, study abroad updates, opportunities and announcements from Medcity Study Abroad.",

    url: PAGE_URL,

    isPartOf: {
        "@type": "WebSite",
        name: "Medcity Study Abroad",
        url: SITE_URL,
    },

    publisher: {
        "@type": "Organization",
        name: "Medcity Study Abroad",
        url: SITE_URL,
    },
};

export default function CommunityPostsPage() {
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

            <CommunityPostsClient />
        </>
    );
}