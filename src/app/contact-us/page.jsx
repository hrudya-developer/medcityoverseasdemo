import ContactForm from "./ContactForm";
import ContactHero from "./ContactHero";
import ContactInfo from "./ContactInfo";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/contact-us`;
const OG_IMAGE = `${SITE_URL}/images/contact-us-og.webp`;

const SEO_TITLE =
    "Contact Study Abroad Consultants in Kerala | Medcity";

const SEO_DESCRIPTION =
    "Contact Medcity Study Abroad, Kerala's trusted overseas education consultants. Get free counselling for admissions, courses and student visas.";
const BUSINESS_PHONE = "+91-9048059999";
const BUSINESS_EMAIL = "medcitykochi@miak.in";

const SOCIAL_PROFILES = [
    "https://www.instagram.com/medcitystudyabroad",
    "https://www.facebook.com/share/1D8vQXJskS/",
    "https://in.linkedin.com/company/medcity-study-abroad",
    "https://youtube.com/@medcitystudyabroad",
];

export const metadata = {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,

    keywords: [
        "contact study abroad consultants Kerala",
        "overseas education consultants Kerala",
        "study abroad counselling Kerala",
        "university admission assistance",
        "student visa guidance Kerala",
        "Medcity Study Abroad",
    ],

    alternates: {
        canonical: "/contact-us",
    },

    openGraph: {
        title: SEO_TITLE,
        description:
            "Speak with Medcity Study Abroad experts for personalised overseas education, university admission and visa guidance.",
        type: "website",
        url: PAGE_URL,
        siteName: "Medcity Study Abroad",
        locale: "en_IN",

        images: [
            {
                url: "/images/contact-us-og.webp",
                width: 1200,
                height: 630,
                alt: "Contact Medcity Study Abroad consultants",
                type: "image/webp",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: SEO_TITLE,
        description:
            "Get expert support with course selection, university applications and student visa guidance.",
        images: [
            {
                url: "/images/contact-us-og.webp",
                alt: "Contact Medcity Study Abroad consultants",
            },
        ],
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

const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${PAGE_URL}#contact-page`,
    url: PAGE_URL,
    name: "Contact Medcity Study Abroad",
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
        name: "Medcity International Overseas Corporation",
        alternateName: "Medcity Study Abroad",
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/logo.png`,
        image: OG_IMAGE,
        telephone: BUSINESS_PHONE,
        email: BUSINESS_EMAIL,

        address: {
            "@type": "PostalAddress",
            addressLocality: "Kochi",
            addressRegion: "Kerala",
            addressCountry: "IN",
        },

        sameAs: SOCIAL_PROFILES,

        contactPoint: [
            {
                "@type": "ContactPoint",
                contactType: "customer service",
                telephone: BUSINESS_PHONE,
                email: BUSINESS_EMAIL,
                areaServed: "IN",
                availableLanguage: ["English", "Malayalam"],
            },
        ],
    },

    breadcrumb: {
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
                name: "Contact Us",
                item: PAGE_URL,
            },
        ],
    },
};

export default function ContactUsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(contactPageSchema).replace(
                        /</g,
                        "\\u003c"
                    ),
                }}
            />

            <main id="main-content">
                <ContactHero />

                <section
                    id="contact-form"
                    aria-labelledby="contact-form-heading"
                >
                    <h2
                        id="contact-form-heading"
                        className="sr-only"
                    >
                        Contact our study abroad counsellors
                    </h2>

                    <ContactForm />
                </section>

                <section
                    id="our-branches"
                    aria-labelledby="branches-heading"
                >
                    <h2
                        id="branches-heading"
                        className="sr-only"
                    >
                        Find a Medcity Study Abroad branch near you
                    </h2>


                    <ContactInfo />
                </section>
            </main>
        </>
    );
}