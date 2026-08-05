import CommunityPostsClient from "./CommunityPostsClient";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_PATH = "/community-posts";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH =
    "/og-images/community-posts-og.webp";

const PAGE_TITLE =
    "Study Abroad Community Stories and Updates";

const PAGE_DESCRIPTION =
    "Explore student stories, study abroad opportunities, international education updates and community announcements from Medcity Overseas.";

export const metadata = {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,

    keywords: [
        "study abroad community",
        "international student stories",
        "study abroad opportunities",
        "overseas education updates",
        "student community posts",
        "Medcity Overseas community",
    ],

    alternates: {
        canonical: PAGE_PATH,
    },

    openGraph: {
        type: "website",
        locale: "en_IN",
        url: PAGE_PATH,
        siteName: "Medcity Overseas",
        title:
            "Study Abroad Community Stories and Updates | Medcity Overseas",
        description:
            "Read student stories, overseas education updates, study opportunities and announcements from the Medcity Overseas community.",
        images: [
            {
                url: OG_IMAGE_PATH,
                width: 1200,
                height: 630,
                alt:
                    "Study abroad community stories and updates from Medcity Overseas",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title:
            "Study Abroad Community Stories | Medcity Overseas",
        description:
            "Explore student experiences, international education updates and study abroad opportunities.",
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
    "@type": "CollectionPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    inLanguage: "en-IN",

    isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Medcity Overseas",
    },

    publisher: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Medcity Overseas",
        url: SITE_URL,
    },
};

function serializeJsonLd(data) {
    return JSON.stringify(data).replace(
        /</g,
        "\\u003c"
    );
}

export default function CommunityPostsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        serializeJsonLd(
                            structuredData
                        ),
                }}
            />

            <CommunityPostsClient />
        </>
    );
}