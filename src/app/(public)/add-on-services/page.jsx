import AddOnServicesClient from "./AddOnServicesClient";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_PATH = "/add-on-services";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_PATH = "/og-images/add-on-services-og.webp";
const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

const PAGE_TITLE = "Study Abroad Add-On Services";

const PAGE_DESCRIPTION =
    "Explore Medcity Overseas add-on services for university admissions, student visas, education finance, accommodation, travel, pre-departure preparation and complete study abroad support.";

export const metadata = {
    /*
     * Your root layout uses:
     * template: "%s | Medcity Overseas"
     *
     * Final title:
     * Study Abroad Add-On Services | Medcity Overseas
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
        title: `${PAGE_TITLE} | Medcity Overseas`,
        description:
            "Get expert support for university admissions, student visas, education finance, accommodation, travel and every stage of your study abroad journey.",
        images: [
            {
                url: OG_IMAGE_PATH,
                width: 1200,
                height: 630,
                alt: "Study abroad add-on services from Medcity Overseas",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: `${PAGE_TITLE} | Medcity Overseas`,
        description:
            "Explore admissions, visa, finance, accommodation, travel and pre-departure support for international students.",
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

const services = [
    {
        name: "University Admission Assistance",
        description:
            "Application guidance and admission support for international universities and colleges.",
    },
    {
        name: "Student Visa Assistance",
        description:
            "Guidance for student visa documentation, applications and interview preparation.",
    },
    {
        name: "Education Finance Guidance",
        description:
            "Support for understanding education loans and other study abroad funding options.",
    },
    {
        name: "Student Accommodation Assistance",
        description:
            "Guidance for finding suitable accommodation near the student's institution.",
    },
    {
        name: "Study Abroad Travel Assistance",
        description:
            "Support for travel planning and preparation before departure.",
    },
    {
        name: "Pre-Departure Support",
        description:
            "Practical preparation and guidance for students before beginning their overseas education.",
    },
];

const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${PAGE_URL}/#webpage`,
    url: PAGE_URL,
    name: `${PAGE_TITLE} | Medcity Overseas`,
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
    about: {
        "@id": `${SITE_URL}/#organization`,
    },
    breadcrumb: {
        "@id": `${PAGE_URL}/#breadcrumb`,
    },
    mainEntity: {
        "@id": `${PAGE_URL}/#service-list`,
    },
    inLanguage: "en-IN",
};

const serviceListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${PAGE_URL}/#service-list`,
    name: "Medcity Overseas Study Abroad Add-On Services",
    numberOfItems: services.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",

    itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
            "@type": "Service",
            "@id": `${PAGE_URL}/#service-${index + 1}`,
            name: service.name,
            description: service.description,
            url: PAGE_URL,
            provider: {
                "@id": `${SITE_URL}/#organization`,
            },
            areaServed: {
                "@type": "Country",
                name: "India",
            },
        },
    })),
};

const breadcrumbJsonLd = {
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
            name: "Add-On Services",
            item: PAGE_URL,
        },
    ],
};

function serializeJsonLd(data) {
    return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function AddOnServicesPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: serializeJsonLd(pageJsonLd),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: serializeJsonLd(serviceListJsonLd),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: serializeJsonLd(breadcrumbJsonLd),
                }}
            />

            <AddOnServicesClient />
        </>
    );
}