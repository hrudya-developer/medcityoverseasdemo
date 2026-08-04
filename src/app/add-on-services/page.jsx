import AddOnServicesClient from "./AddOnServicesClient";

const SITE_URL =
    "https://medcityoverseas.com";

const PAGE_URL =
    `${SITE_URL}/add-on-services`;

const OG_IMAGE =
    `${SITE_URL}/og-images/add-on-services-og.webp`;

export const metadata = {
    title:
        "Study Abroad Add-On Services | Student Support | Medcity",

    description:
        "Explore Medcity Study Abroad add-on services including admissions assistance, visa guidance, education finance, accommodation, travel and complete student support.",

    keywords: [
        "study abroad add-on services",
        "student visa assistance",
        "study abroad accommodation",
        "education loan guidance",
        "overseas admission support",
        "pre departure support",
        "study abroad travel assistance",
        "Medcity Study Abroad services",
    ],

    alternates: {
        canonical: PAGE_URL,
    },

    openGraph: {
        title:
            "Study Abroad Add-On Services | Medcity",
        description:
            "Get professional support for admissions, visas, finance, accommodation, travel and every stage of your study abroad journey.",
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
                    "Medcity Study Abroad Add-On Services",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title:
            "Study Abroad Add-On Services | Medcity",
        description:
            "Explore complete student support services for your overseas education journey.",
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
        "Medcity Study Abroad Add-On Services",
    description:
        "Professional support services for admissions, visas, finance, accommodation, travel and overseas education.",
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
};

export default function AddOnServicesPage() {
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

            <AddOnServicesClient />
        </>
    );
}