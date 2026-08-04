import AustraliaMigrationContent from "./components/AustraliaMigrationContent";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/australia-migration`;

const OG_IMAGE =
    `${SITE_URL}/og-images/australia-migration-og.webp`;

export const metadata = {
    title:
        "Australia Migration, Skilled Visas & PR Pathways | Medcity",

    description:
        "Explore Australia migration pathways including Skilled Independent, Skilled Nominated, regional, employer-sponsored and permanent residence visa options.",

    keywords: [
        "Australia migration",
        "Australia PR",
        "Australia skilled migration",
        "Australia skilled visa",
        "Australia subclass 189",
        "Australia subclass 190",
        "Australia subclass 491",
        "Australia employer sponsored visa",
        "migrate to Australia from India",
        "Australia migration consultants Kerala",
        "Medcity Australia migration",
    ],

    alternates: {
        canonical: PAGE_URL,
    },

    openGraph: {
        title:
            "Australia Migration, Skilled Visas & PR Pathways | Medcity",

        description:
            "Learn about skilled, regional, nominated and employer-sponsored migration pathways for Australia.",

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
                    "Australia migration and permanent residence pathways",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",

        title:
            "Australia Migration and PR Pathways | Medcity",

        description:
            "Explore skilled migration, state nomination, regional visas and employer-sponsored pathways for Australia.",

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

const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",

    name:
        "Australia Migration and Permanent Residence Pathways",

    description:
        "Information about Australian skilled migration, state nomination, regional and employer-sponsored visa pathways.",

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
        telephone: "+91-8943280333",
    },

    about: {
        "@type": "Thing",
        name: "Australian skilled migration",
    },
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

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
            name: "Australia Migration",
            item: PAGE_URL,
        },
    ],
};

export default function AustraliaMigrationPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(pageSchema),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(
                            breadcrumbSchema
                        ),
                }}
            />

            <AustraliaMigrationContent />
        </>
    );
}