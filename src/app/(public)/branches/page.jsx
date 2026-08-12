import AcademyCentersClient from "./AcademyCentersClient";
import { centers } from "./data/centersData";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_PATH = "/branches";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH =
    "/og-images/medcity-branches-kerala.webp";

const OG_IMAGE_URL =
    `${SITE_URL}${OG_IMAGE_PATH}`;

const PAGE_TITLE =
    "Study Abroad Branches Across Kerala";

const PAGE_DESCRIPTION =
    "Find Medcity Overseas branches across Kerala for study abroad counselling, overseas university admissions, student visa guidance, German language training and international education support.";

export const metadata = {
    /*
     * Your root layout adds:
     * | Medcity Overseas
     *
     * Final title:
     * Study Abroad Branches Across Kerala | Medcity Overseas
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
            "Medcity Overseas Branches Across Kerala",

        description:
            "Find your nearest Medcity Overseas branch for overseas education counselling, university applications, visa assistance and language training.",

        images: [
            {
                url: OG_IMAGE_PATH,
                width: 1200,
                height: 630,
                alt:
                    "Medcity Overseas study abroad branches across Kerala",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",

        title:
            "Medcity Overseas Branches Across Kerala",

        description:
            "Find a nearby study abroad counselling center for admissions, student visas and overseas education support.",

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

function slugify(value = "") {
    return String(value)
        .toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function getBranchName(center, index) {
    return (
        center?.name ||
        center?.title ||
        center?.branch ||
        `Medcity Overseas Branch ${index + 1}`
    );
}

function getBranchSlug(center, index) {
    return (
        center?.slug ||
        slugify(getBranchName(center, index)) ||
        `branch-${index + 1}`
    );
}

function getBranchUrl(center, index) {
    /*
     * Best option:
     * Create individual URLs such as:
     * /branches/kochi
     * /branches/kannur
     *
     * Until those pages exist, link to the branch anchor.
     */
    if (center?.slug) {
        return `${PAGE_URL}/${center.slug}`;
    }

    return `${PAGE_URL}#${getBranchSlug(center, index)}`;
}

function getTelephoneNumbers(center) {
    if (Array.isArray(center?.phones)) {
        return center.phones.filter(Boolean);
    }

    if (center?.phone) {
        return [center.phone];
    }

    return [];
}

function createPostalAddress(center) {
    if (!center?.address) {
        return undefined;
    }

    return {
        "@type": "PostalAddress",
        streetAddress: center.address,

        ...(center?.city && {
            addressLocality: center.city,
        }),

        addressRegion:
            center?.state || "Kerala",

        ...(center?.postalCode && {
            postalCode: String(
                center.postalCode
            ),
        }),

        addressCountry: "IN",
    };
}

const branchItems = centers.map(
    (center, index) => {
        const name =
            getBranchName(center, index);

        const slug =
            getBranchSlug(center, index);

        const branchUrl =
            getBranchUrl(center, index);

        const telephoneNumbers =
            getTelephoneNumbers(center);

        const address =
            createPostalAddress(center);

        return {
            "@type": "ListItem",
            position: index + 1,

            item: {
                /*
                 * EducationalOrganization describes the
                 * service category.
                 *
                 * LocalBusiness indicates a specific
                 * physical business location.
                 */
                "@type": [
                    "EducationalOrganization",
                    "LocalBusiness",
                ],

                "@id": `${PAGE_URL}#${slug}`,

                name,

                url: branchUrl,

                parentOrganization: {
                    "@id":
                        `${SITE_URL}/#organization`,
                },

                ...(address && {
                    address,
                }),

                ...(telephoneNumbers.length > 0 && {
                    telephone:
                        telephoneNumbers,
                }),

                ...(center?.email && {
                    email: center.email,
                }),

                ...(center?.mapLink && {
                    hasMap: center.mapLink,
                }),

                ...(center?.latitude &&
                    center?.longitude && {
                    geo: {
                        "@type": "GeoCoordinates",
                        latitude:
                            center.latitude,
                        longitude:
                            center.longitude,
                    },
                }),

                ...(center?.openingHours?.length && {
                    openingHours:
                        center.openingHours,
                }),

                ...(center?.image && {
                    image: center.image,
                }),

                areaServed: {
                    "@type":
                        "AdministrativeArea",
                    name:
                        center?.city ||
                        center?.district ||
                        "Kerala",
                },
            },
        };
    }
);

const branchesStructuredData = {
    "@context": "https://schema.org",

    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": `${PAGE_URL}#webpage`,

            url: PAGE_URL,
            name:
                "Medcity Overseas Branches Across Kerala",
            description: PAGE_DESCRIPTION,
            image: OG_IMAGE_URL,
            inLanguage: "en-IN",

            isPartOf: {
                "@id":
                    `${SITE_URL}/#website`,
            },

            about: {
                "@id":
                    `${SITE_URL}/#organization`,
            },

            publisher: {
                "@id":
                    `${SITE_URL}/#organization`,
            },

            breadcrumb: {
                "@id":
                    `${PAGE_URL}#breadcrumb`,
            },

            mainEntity: {
                "@id":
                    `${PAGE_URL}#branches-list`,
            },
        },

        {
            "@type": "BreadcrumbList",
            "@id":
                `${PAGE_URL}#breadcrumb`,

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
                    name: "Branches",
                    item: PAGE_URL,
                },
            ],
        },

        {
            "@type": "ItemList",
            "@id":
                `${PAGE_URL}#branches-list`,

            name:
                "Medcity Overseas Branches Across Kerala",

            description:
                "Directory of Medcity Overseas study abroad counselling branches across Kerala.",

            numberOfItems:
                branchItems.length,

            itemListOrder:
                "https://schema.org/ItemListOrderUnordered",

            itemListElement:
                branchItems,
        },
    ],
};

function serializeJsonLd(data) {
    return JSON.stringify(data).replace(
        /</g,
        "\\u003c"
    );
}

export default function BranchesPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        serializeJsonLd(
                            branchesStructuredData
                        ),
                }}
            />

            <AcademyCentersClient
                centers={centers}
            />
        </>
    );
}