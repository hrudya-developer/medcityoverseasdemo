import AcademyCentersClient from "./AcademyCentersClient";
import { centers } from "./data/centersData";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/branches`;

const SEO_TITLE =
    "Medcity Study Abroad Branches Across Kerala | Find Your Nearest Branch";

const SEO_DESCRIPTION =
    "Explore Medcity Study Abroad branches across Kerala. Find your nearest branch for overseas education counselling, university admissions, visa guidance, language training and study abroad support.";

export const metadata = {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,

    keywords: [
        "Medcity Study Abroad branches",
        "Medcity branches Kerala",
        "study abroad branches Kerala",
        "study abroad consultants Kerala",
        "overseas education consultants Kerala",
        "overseas education branches Kerala",
        "study abroad counselling Kerala",
        "student visa guidance Kerala",
        "university admission support Kerala",
    ],

    alternates: {
        canonical: "/branches",
    },

    openGraph: {
        title: SEO_TITLE,
        description: SEO_DESCRIPTION,
        url: PAGE_URL,
        siteName: "Medcity Study Abroad",
        locale: "en_IN",
        type: "website",

        images: [
            {
                url: "/images/medcity-og-image.webp",
                width: 1200,
                height: 630,
                alt: "Medcity Study Abroad branches across Kerala",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: SEO_TITLE,
        description: SEO_DESCRIPTION,
        images: ["/images/medcity-og-image.webp"],
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

function getBranchName(center, index) {
    return (
        center.name ||
        center.title ||
        center.branch ||
        `Medcity Study Abroad Branch ${index + 1}`
    );
}

const branchesStructuredData = {
    "@context": "https://schema.org",

    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": `${PAGE_URL}#webpage`,
            url: PAGE_URL,
            name: SEO_TITLE,
            description: SEO_DESCRIPTION,
            inLanguage: "en-IN",

            isPartOf: {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: `${SITE_URL}/`,
                name: "Medcity Study Abroad",
            },

            about: {
                "@type": "EducationalOrganization",
                "@id": `${SITE_URL}/#organization`,
                name: "Medcity Study Abroad",
                url: `${SITE_URL}/`,
            },

            breadcrumb: {
                "@id": `${PAGE_URL}#breadcrumb`,
            },

            mainEntity: {
                "@id": `${PAGE_URL}#branches-list`,
            },
        },

        {
            "@type": "BreadcrumbList",
            "@id": `${PAGE_URL}#breadcrumb`,

            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: `${SITE_URL}/`,
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Study Abroad Branches",
                    item: PAGE_URL,
                },
            ],
        },

        {
            "@type": "ItemList",
            "@id": `${PAGE_URL}#branches-list`,
            name: "Medcity Study Abroad Branches",
            description:
                "List of Medcity Study Abroad branches across Kerala.",
            numberOfItems: centers.length,

            itemListElement: centers.map((center, index) => ({
                "@type": "ListItem",
                position: index + 1,

                item: {
                    "@type": "EducationalOrganization",
                    name: getBranchName(center, index),

                    parentOrganization: {
                        "@type": "EducationalOrganization",
                        "@id": `${SITE_URL}/#organization`,
                        name: "Medcity Study Abroad",
                    },

                    ...(center.address && {
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: center.address,
                            addressRegion: "Kerala",
                            addressCountry: "IN",
                        },
                    }),

                    ...(center.phones?.length && {
                        telephone: center.phones[0],
                    }),

                    ...(center.email && {
                        email: center.email,
                    }),

                    ...(center.mapLink && {
                        hasMap: center.mapLink,
                    }),
                },
            })),
        },
    ],
};

export default function BranchesPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        branchesStructuredData
                    ).replace(/</g, "\\u003c"),
                }}
            />

            <AcademyCentersClient />
        </>
    );
}