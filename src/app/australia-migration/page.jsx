import AustraliaMigrationContent from "./components/AustraliaMigrationContent";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_PATH = "/australia-migration";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH =
    "/og-images/australia-migration-og.webp";

const OG_IMAGE_URL =
    `${SITE_URL}${OG_IMAGE_PATH}`;

const PAGE_TITLE =
    "Australia Migration, Skilled Visas and PR Pathways | Medcity Overseas";

const PAGE_DESCRIPTION =
    "Explore Australian skilled migration options, including subclass 189, 190 and 491 visas, regional pathways and employer-sponsored visa options, with guidance from Medcity Overseas.";

export const metadata = {
    /*
     * Use an absolute title because your root layout already has:
     *
     * template: "%s | Medcity Overseas"
     *
     * This prevents the brand name from appearing twice.
     */
    title: {
        absolute: PAGE_TITLE,
    },

    description: PAGE_DESCRIPTION,

    alternates: {
        canonical: PAGE_PATH,
    },

    openGraph: {
        type: "website",
        locale: "en_IN",
        url: PAGE_PATH,
        siteName: "Medcity Overseas",

        title: PAGE_TITLE,

        description:
            "Learn about points-tested, state-nominated, regional and employer-sponsored migration pathways for Australia.",

        images: [
            {
                url: OG_IMAGE_PATH,
                width: 1200,
                height: 630,
                alt:
                    "Australia skilled migration and permanent residence pathway guidance",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",

        title:
            "Australia Migration and PR Pathways | Medcity Overseas",

        description:
            "Explore Australian skilled migration, state nomination, regional and employer-sponsored visa pathways.",

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

const migrationPathways = [
    {
        name: "Skilled Independent Visa – Subclass 189",
        description:
            "A points-tested skilled visa pathway that generally does not require state, territory or employer nomination.",
    },
    {
        name: "Skilled Nominated Visa – Subclass 190",
        description:
            "A points-tested skilled visa pathway requiring nomination by an Australian state or territory government.",
    },
    {
        name: "Skilled Work Regional Visa – Subclass 491",
        description:
            "A provisional skilled visa pathway involving state or territory nomination or eligible family sponsorship for regional Australia.",
    },
    {
        name: "Employer-Sponsored Visa Pathways",
        description:
            "Visa pathways for eligible skilled workers who are nominated or sponsored by an approved Australian employer.",
    },
    {
        name: "Regional Permanent Residence Pathways",
        description:
            "Potential permanent residence pathways for eligible regional visa holders who satisfy the applicable requirements.",
    },
];

const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
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

    isPartOf: {
        "@id": `${SITE_URL}/#website`,
    },

    about: [
        {
            "@type": "Thing",
            name: "Australian skilled migration",
        },
        {
            "@type": "Thing",
            name: "Australia permanent residence pathways",
        },
        {
            "@type": "Thing",
            name: "Australian skilled visas",
        },
    ],

    publisher: {
        "@id": `${SITE_URL}/#organization`,
    },

    breadcrumb: {
        "@id": `${PAGE_URL}/#breadcrumb`,
    },

    mainEntity: {
        "@id": `${PAGE_URL}/#migration-pathways`,
    },

    inLanguage: "en-IN",
};

const migrationPathwaysSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${PAGE_URL}/#migration-pathways`,

    name: "Australia Skilled Migration Pathways",
    numberOfItems: migrationPathways.length,
    itemListOrder:
        "https://schema.org/ItemListOrderUnordered",

    itemListElement: migrationPathways.map(
        (pathway, index) => ({
            "@type": "ListItem",
            position: index + 1,

            item: {
                "@type": "Thing",
                "@id":
                    `${PAGE_URL}/#migration-pathway-${index + 1}`,

                name: pathway.name,
                description: pathway.description,
                url: PAGE_URL,
            },
        })
    ),
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
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
            name: "Australia Migration",
            item: PAGE_URL,
        },
    ],
};

function serializeJsonLd(data) {
    return JSON.stringify(data).replace(
        /</g,
        "\\u003c"
    );
}

export default function AustraliaMigrationPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        serializeJsonLd(pageSchema),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        serializeJsonLd(
                            migrationPathwaysSchema
                        ),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        serializeJsonLd(
                            breadcrumbSchema
                        ),
                }}
            />

            <AustraliaMigrationContent />
        </>
    );
}