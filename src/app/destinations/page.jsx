import DestinationsSection from "@/components/home/destinations/DestinationsSection";
import FAQ from "@/components/home/FAQ/FAQ";
import DestinationHero from "./components/DestinationHero";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/destinations`;
const OG_IMAGE = `${SITE_URL}/images/destinations-og.webp`;

const SEO_TITLE =
    "Study Abroad Destinations | Germany, Canada, UK & More | Medcity Study Abroad";

const SEO_DESCRIPTION =
    "Explore top study abroad destinations including Germany, Canada, Australia, the United Kingdom, Ireland, New Zealand and more. Compare universities, courses and start your overseas education journey with Medcity Study Abroad.";

export const metadata = {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,

    keywords: [
        "study abroad destinations",
        "study in Germany",
        "study in Canada",
        "study in UK",
        "study in Australia",
        "study in Ireland",
        "study in New Zealand",
        "overseas education",
        "international universities",
        "Medcity Study Abroad",
    ],

    alternates: {
        canonical: PAGE_URL,
    },

    openGraph: {
        title: SEO_TITLE,
        description: SEO_DESCRIPTION,
        url: PAGE_URL,
        siteName: "Medcity Study Abroad",
        type: "website",
        locale: "en_IN",
        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt: "Study Abroad Destinations",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: SEO_TITLE,
        description: SEO_DESCRIPTION,
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

const destinationsSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": `${PAGE_URL}#page`,
            url: PAGE_URL,
            name: SEO_TITLE,
            description: SEO_DESCRIPTION,
            inLanguage: "en-IN",
            isPartOf: {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
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
                    item: SITE_URL,
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Destinations",
                    item: PAGE_URL,
                },
            ],
        },
    ],
};

export default function DestinationsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        destinationsSchema
                    ).replace(/</g, "\\u003c"),
                }}
            />

            <main id="main-content">


                <DestinationsSection />
                <FAQ />

            </main>
        </>
    );
}