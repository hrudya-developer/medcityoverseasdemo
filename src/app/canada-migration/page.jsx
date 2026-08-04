import CanadaMigrationContent from "./components/CanadaMigrationContent";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/canada-migration`;
const OG_IMAGE = `${SITE_URL}/og-images/canada-migration-og.webp`;

export const metadata = {
    title:
        "Canada Immigration Programs & PR Pathways | Medcity",

    description:
        "Explore Canada immigration programs including Express Entry, Provincial Nominee Programs, Start-Up Visa, family sponsorship, work permits and permanent residence guidance.",

    keywords: [
        "Canada immigration programs",
        "Canada PR",
        "Canada Express Entry",
        "Canada Provincial Nominee Program",
        "Canada Start-Up Visa",
        "Canada family sponsorship",
        "Canada work permit",
        "migrate to Canada",
        "Canada immigration consultants Kerala",
        "Medcity Canada migration",
    ],

    alternates: {
        canonical: PAGE_URL,
    },

    openGraph: {
        title:
            "Canada Immigration Programs & PR Pathways | Medcity",
        description:
            "Understand Canadian permanent residence, Express Entry, PNP, work permits, family sponsorship and business immigration pathways.",
        url: PAGE_URL,
        siteName: "Medcity Study Abroad",
        locale: "en_IN",
        type: "website",
        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt:
                    "Canada immigration and permanent residence programs",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title:
            "Canada Immigration Programs & PR Pathways | Medcity",
        description:
            "Explore Express Entry, PNP, work permits, family sponsorship and other Canada immigration pathways.",
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

const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Canada Immigration Programs",
    description:
        "Information about Canadian immigration, permanent residence, work permits, family sponsorship and business immigration pathways.",
    url: PAGE_URL,
    isPartOf: {
        "@type": "WebSite",
        name: "Medcity Study Abroad",
        url: SITE_URL,
    },
    about: {
        "@type": "Thing",
        name: "Canadian immigration programs",
    },
    provider: {
        "@type": "Organization",
        name: "Medcity Study Abroad",
        url: SITE_URL,
        telephone: "+91-8943280333",
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
            name: "Canada Migration",
            item: PAGE_URL,
        },
    ],
};

export default function CanadaMigrationPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(
                            collectionSchema
                        ),
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

            <CanadaMigrationContent />
        </>
    );
}