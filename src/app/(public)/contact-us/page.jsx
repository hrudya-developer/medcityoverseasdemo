import FAQ from "@/components/home/FAQ/FAQ";
import OurBranches from "@/components/home/branches-section/OurBranches";
import CounsellingSection from "@/components/home/free-counselling/CounsellingSection";

import ContactHero from "./ContactHero";
import ContactInfo from "./ContactInfo";
import ContactFAQ from "./ContactFAQ";
import Link from "next/link";

import { contactFaqs } from "./contactFaqData";
import { offices } from "./data/offices";
import OfficialSources from "@/components/seo/OfficialSources";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";
import { STUDY_ABROAD_SOURCES } from "@/lib/officialSources";
import { applySeoOverrides, withPageSeoFaqs } from "@/lib/pageSeo";
import { faqPageNode, ORG_ID } from "@/lib/seoSchema";

// Update when this page's text or contact details are reviewed.
const TEMPLATE_UPDATED = "2026-10-24";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_PATH = "/contact-us";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE_PATH = "/og-images/contact.webp";
const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

const PAGE_TITLE = "Contact Study Abroad Consultants in Kerala";

const PAGE_DESCRIPTION =
    "Contact Medcity Overseas on +91 90729 82555, also on WhatsApp, for free study abroad counselling, admissions, scholarships and student visa guidance.";

const BUSINESS_PHONE = "+91-9072982555";
const BUSINESS_EMAIL = "medcitykochi@miak.in";

const SOCIAL_PROFILES = [
    "https://www.instagram.com/medcitystudyabroad",
    "https://www.facebook.com/share/1D8vQXJskS/",
    "https://in.linkedin.com/company/medcity-study-abroad",
    "https://youtube.com/@medcitystudyabroad",
];

const pageMetadata = {
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
            author: { "@id": ORG_ID },
            dateModified: TEMPLATE_UPDATED,

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

        // FAQs added in the SEO manager join it (withPageSeoFaqs).
        faqPageNode(PAGE_PATH, contactFaqs),
    ],
};

function serializeJsonLd(data) {
    return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function ContactUsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: serializeJsonLd(await withPageSeoFaqs(contactPageSchema)),
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

                <QuickAnswer updated={TEMPLATE_UPDATED} className="py-10">
                    {`Call or WhatsApp Medcity Overseas on +91 90729 82555, or email info@mioc.in, for free study abroad counselling. The head office is in ${offices[0].locality} and the corporate office in ${offices[1].locality}, and you can also visit any Medcity branch across Kerala and Mangalore. Book a session with the form below and a counsellor will get back to you.`}
                </QuickAnswer>

                <section
                    id="contact-form"
                    aria-label="Book a free study abroad counselling session"
                >
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

                <QuestionAnswer
                    className="py-12"
                    eyebrow="Before you call"
                    question="What should you have ready for your first counselling session?"
                    answer="Keep your mark sheets, passport and any English or German test results to hand, and think about the countries, courses and budget you have in mind. With these, a Medcity Overseas counsellor can check your eligibility, suggest suitable courses and universities and explain the application and student visa steps in one session."
                    points={[
                        "Mark sheets and certificates",
                        "Passport, if you have one",
                        "IELTS, OET, PTE or German test results",
                        "Your preferred countries, courses and budget",
                    ]}
                />

                <OfficialSources className="pb-12" links={STUDY_ABROAD_SOURCES} />

                <p className="mx-auto max-w-5xl px-4 pb-16 text-sm leading-7 text-slate-600 sm:px-6 lg:px-8">
                    Prefer to visit? See all{" "}
                    <Link href="/branches" className="font-bold text-primary hover:underline">
                        Medcity branches
                    </Link>
                    . You can also compare{" "}
                    <Link href="/destinations" className="font-bold text-primary hover:underline">
                        study destinations
                    </Link>{" "}
                    or search the{" "}
                    <Link href="/courses" className="font-bold text-primary hover:underline">
                        course finder
                    </Link>{" "}
                    before your session, or read{" "}
                    <Link href="/about-us" className="font-bold text-primary hover:underline">
                        about Medcity Overseas
                    </Link>
                    .
                </p>
            </div>
        </>
    );
}

// Search details edited in the admin apply on top of these.
export async function generateMetadata() {
  return applySeoOverrides(pageMetadata);
}
