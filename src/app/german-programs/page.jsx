import GermanProgramsClient from "./GermanProgramsClient";

const SITE_URL =
    "https://medcityoverseas.com";

const PAGE_URL =
    `${SITE_URL}/german-programs`;

const OG_IMAGE =
    `${SITE_URL}/og-images/german-programs-og.webp`;

export const metadata = {
    title:
        "German Programs for International Students | Medcity",

    description:
        "Explore German study, Ausbildung and career programs for international students. Discover education, training and employment pathways in Germany with Medcity Study Abroad.",

    keywords: [
        "German programs for international students",
        "study in Germany",
        "Ausbildung programs Germany",
        "German career programs",
        "vocational training Germany",
        "Germany education consultants",
        "work and study in Germany",
        "Medcity German programs",
    ],

    alternates: {
        canonical: PAGE_URL,
    },

    openGraph: {
        title:
            "German Study and Ausbildung Programs | Medcity",
        description:
            "Explore study, Ausbildung and career pathways in Germany for international students.",
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
                    "German study and Ausbildung programs",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title:
            "German Programs for International Students | Medcity",
        description:
            "Discover German study, vocational training and career pathways.",
        images: [OG_IMAGE],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview":
                "large",
            "max-snippet": -1,
            "max-video-preview":
                -1,
        },
    },
};

const structuredData = {
    "@context":
        "https://schema.org",

    "@type":
        "CollectionPage",

    name:
        "German Programs for International Students",

    description:
        "German study, Ausbildung, vocational training and career pathways for international students.",

    url:
        PAGE_URL,

    isPartOf: {
        "@type": "WebSite",
        name:
            "Medcity Study Abroad",
        url:
            SITE_URL,
    },

    provider: {
        "@type": "Organization",
        name:
            "Medcity Study Abroad",
        url:
            SITE_URL,
    },
};

export default function GermanProgramsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(
                            structuredData
                        ),
                }}
            />

            <GermanProgramsClient />
        </>
    );
}