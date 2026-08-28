import FAQ from "@/components/home/FAQ/FAQ";
import OurBranches from "@/components/home/branches-section/OurBranches";
import CounsellingSection from "@/components/home/free-counselling/CounsellingSection";

import ContactHero from "./ContactHero";
import ContactInfo from "./ContactInfo";
import ContactFAQ from "./ContactFAQ";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_PATH = "/contact-us";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH = "/images/contact-us-og.webp";
const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

const PAGE_TITLE = "Contact Study Abroad Consultants in Kerala";

const PAGE_DESCRIPTION =
    "Contact Medcity Overseas for study abroad counselling, overseas university admissions, course selection, scholarship guidance, student visa assistance and language training across Kerala.";

const BUSINESS_PHONE = "+91-9048059999";
const BUSINESS_EMAIL = "medcitykochi@miak.in";

const SOCIAL_PROFILES = [
    "https://www.instagram.com/medcitystudyabroad",
    "https://www.facebook.com/share/1D8vQXJskS/",
    "https://in.linkedin.com/company/medcity-study-abroad",
    "https://youtube.com/@medcitystudyabroad",
];

export const metadata = {
    /*
     * Your root layout title template appends:
     * | Medcity Overseas
     *
     * Final title:
     * Contact Study Abroad Consultants in Kerala | Medcity Overseas
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
            "Speak with Medcity Overseas counsellors for personalised guidance on courses, international universities, admissions, scholarships and student visas.",
        images: [
            {
                url: OG_IMAGE_PATH,
                width: 1200,
                height: 630,
                alt: "Contact Medcity Overseas study abroad consultants in Kerala",
                type: "image/webp",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: `${PAGE_TITLE} | Medcity Overseas`,
        description:
            "Get expert support with course selection, overseas university applications, scholarships and student visa guidance.",
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

const contactPageSchema = {
    "@context": "https://schema.org",

    "@graph": [
        {
            "@type": "ContactPage",
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
            inLanguage: "en-IN",

            isPartOf: {
                "@id": `${SITE_URL}/#website`,
            },

            about: {
                "@id": `${SITE_URL}/#organization`,
            },

            publisher: {
                "@id": `${SITE_URL}/#organization`,
            },

            breadcrumb: {
                "@id": `${PAGE_URL}/#breadcrumb`,
            },

            mainEntity: {
                "@id": `${PAGE_URL}/#contact-options`,
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
                    name: "Contact Us",
                    item: PAGE_URL,
                },
            ],
        },

        {
            "@type": "ItemList",
            "@id": `${PAGE_URL}/#contact-options`,
            name: "Medcity Overseas Contact Options",
            numberOfItems: 2,
            itemListOrder: "https://schema.org/ItemListOrderUnordered",

            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,

                    item: {
                        "@type": "ContactPoint",
                        "@id": `${PAGE_URL}/#phone-contact`,
                        contactType: "study abroad counselling",
                        telephone: BUSINESS_PHONE,
                        areaServed: {
                            "@type": "Country",
                            name: "India",
                        },
                        availableLanguage: ["English", "Malayalam"],
                    },
                },
                {
                    "@type": "ListItem",
                    position: 2,

                    item: {
                        "@type": "ContactPoint",
                        "@id": `${PAGE_URL}/#email-contact`,
                        contactType: "customer support",
                        email: BUSINESS_EMAIL,
                        areaServed: {
                            "@type": "Country",
                            name: "India",
                        },
                        availableLanguage: ["English", "Malayalam"],
                    },
                },
            ],
        },
    ],
};

function serializeJsonLd(data) {
    return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ContactUsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: serializeJsonLd(contactPageSchema),
                }}
            />

            {/*
       * RootLayout already provides:
       *
       * <main id="main-content">{children}</main>
       *
       * Do not create another main element here.
       */}
            <div className="overflow-hidden bg-white">
                <ContactHero />

                <section aria-label="Book a free study abroad counselling session">
                    <CounsellingSection />
                </section>

                <section
                    id="contact-information"
                    aria-labelledby="contact-information-heading"
                >
                    <h2
                        id="contact-information-heading"
                        className="sr-only"
                    >
                        Contact Medcity Overseas
                    </h2>

                    <ContactInfo />
                </section>

                <section
                    id="our-branches"
                    aria-labelledby="contact-branches-heading"
                >
                    <h2
                        id="contact-branches-heading"
                        className="sr-only"
                    >
                        Find a Medcity Overseas branch near you
                    </h2>

                    <OurBranches />
                </section>

                <section
                    id="contact-faq"
                    aria-labelledby="contact-faq-heading"
                >
                    <h2
                        id="contact-faq-heading"
                        className="sr-only"
                    >
                        Contact and counselling frequently asked questions
                    </h2>

                    <ContactFAQ />
                </section>
            </div>
        </>
    );
}