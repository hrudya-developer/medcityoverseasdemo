import CanadaMigrationContent from "./components/CanadaMigrationContent";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_PATH = "/canada-migration";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH =
    "/og-images/canada-migration-og.webp";

const OG_IMAGE_URL =
    `${SITE_URL}${OG_IMAGE_PATH}`;

const PAGE_TITLE =
    "Canada Immigration Programs and PR Pathways";

const PAGE_DESCRIPTION =
    "Explore Canadian immigration pathways including Express Entry, Provincial Nominee Programs, family sponsorship, work permits and permanent residence options, with general guidance from Medcity Overseas.";

export const metadata = {
    /*
     * Your root layout title template adds:
     * | Medcity Overseas
     *
     * Final title:
     * Canada Immigration Programs and PR Pathways
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

        title:
            "Canada Immigration Programs and PR Pathways | Medcity Overseas",

        description:
            "Learn about Express Entry, Provincial Nominee Programs, family sponsorship, work permits and other Canadian immigration options.",

        images: [
            {
                url: OG_IMAGE_PATH,
                width: 1200,
                height: 630,
                alt:
                    "Canada immigration and permanent residence pathway information",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",

        title:
            "Canada Immigration and PR Pathways | Medcity Overseas",

        description:
            "Explore Express Entry, provincial nomination, family sponsorship, work permits and Canadian permanent residence pathways.",

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

const immigrationPrograms = [
    {
        name: "Express Entry",
        description:
            "Canada's online system for managing applications from skilled workers under eligible federal economic immigration programs.",
    },
    {
        name: "Provincial Nominee Program",
        description:
            "Permanent residence pathways for applicants nominated by participating Canadian provinces or territories.",
    },
    {
        name: "Family Sponsorship",
        description:
            "Immigration pathways through which eligible Canadian citizens and permanent residents may sponsor qualifying family members.",
    },
    {
        name: "Canadian Work Permits",
        description:
            "Temporary authorization pathways that may allow eligible foreign nationals to work in Canada.",
    },
    {
        name: "Permanent Residence Pathways",
        description:
            "Federal, provincial and family-based programs through which eligible applicants may seek Canadian permanent residence.",
    },
    {
        name: "Start-Up Visa Program",
        description:
            "A federal entrepreneur immigration program that is currently paused for new applications, while previously accepted applications continue to be processed.",
    },
];

const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": `${PAGE_URL}/#webpage`,

            url: PAGE_URL,

            name:
                "Canada Immigration Programs and PR Pathways",

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
                    name: "Canadian immigration",
                },
                {
                    "@type": "Thing",
                    name: "Canadian permanent residence",
                },
                {
                    "@type": "Thing",
                    name: "Express Entry",
                },
            ],

            publisher: {
                "@id": `${SITE_URL}/#organization`,
            },

            breadcrumb: {
                "@id": `${PAGE_URL}/#breadcrumb`,
            },

            mainEntity: {
                "@id": `${PAGE_URL}/#immigration-programs`,
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
                    name: "Canada Migration",
                    item: PAGE_URL,
                },
            ],
        },

        {
            "@type": "ItemList",
            "@id": `${PAGE_URL}/#immigration-programs`,

            name:
                "Canada Immigration Programs and Pathways",

            description:
                "Overview of Canadian immigration, work permit, family sponsorship and permanent residence pathways.",

            numberOfItems:
                immigrationPrograms.length,

            itemListOrder:
                "https://schema.org/ItemListOrderUnordered",

            itemListElement:
                immigrationPrograms.map(
                    (program, index) => ({
                        "@type": "ListItem",
                        position: index + 1,

                        item: {
                            "@type": "Thing",

                            "@id":
                                `${PAGE_URL}/#program-${index + 1}`,

                            name: program.name,
                            description:
                                program.description,
                            url: PAGE_URL,
                        },
                    })
                ),
        },
    ],
};

function serializeJsonLd(data) {
    return JSON.stringify(data).replace(
        /</g,
        "\\u003c"
    );
}

export default function CanadaMigrationPage() {
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

            <CanadaMigrationContent />
        </>
    );
}