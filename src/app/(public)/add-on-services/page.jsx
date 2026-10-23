import Link from "next/link";

import AddOnServicesClient from "./AddOnServicesClient";
import { addOnFaqs } from "./addOnServicesFaqData";
import OfficialSources from "@/components/seo/OfficialSources";
import PageSchema from "@/components/seo/PageSchema";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";
import { callLegacy } from "@/lib/legacy";
import { STUDY_ABROAD_SOURCES } from "@/lib/officialSources";
import { applySeoOverrides, withPageSeoFaqs } from "@/lib/pageSeo";
import { faqPageNode, joinList, jsonLdString, ORG_ID } from "@/lib/seoSchema";

// Read from the database on each request, like the services API.
export const dynamic = "force-dynamic";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_PATH = "/add-on-services";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE_PATH = "/og-images/add-on-services-og.webp";
const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

const PAGE_TITLE = "Study Abroad Add-On Services";

const PAGE_DESCRIPTION =
    "Add-on services from Medcity Overseas for students going abroad: SOP help, education loan guidance, visa interview preparation, travel card, SIM and flights.";

// Update when this page's text is reviewed.
const TEMPLATE_UPDATED = "2026-10-24";

const pageMetadata = {
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

function clean(value) {
    return String(value ?? "").replace(/\s+/g, " ").trim();
}

async function loadServices() {
    try {
        const result = await callLegacy("getServices", {});

        return {
            services: Array.isArray(result?.services) ? result.services : [],
            imageBaseUrl: result?.services_image_path ?? "",
        };
    } catch (error) {
        // The page still loads; the list then loads in the browser.
        console.error("Add-on services could not be loaded:", error);

        return null;
    }
}

export default async function AddOnServicesPage() {
    const initial = await loadServices();
    const services = (initial?.services ?? [])
        .map((service) => ({
            name: clean(service?.name || service?.service_name || service?.title),
            description: clean(service?.description),
        }))
        .filter((service) => service.name);

    const serviceList = {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#service-list`,
        name: "Medcity Overseas study abroad add-on services",
        numberOfItems: services.length,
        itemListElement: services.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "Service",
                name: service.name,
                ...(service.description ? { description: service.description } : {}),
                provider: { "@id": ORG_ID },
                areaServed: { "@type": "Country", name: "India" },
            },
        })),
    };

    const faqSchema = await withPageSeoFaqs({
        "@context": "https://schema.org",
        ...faqPageNode(PAGE_PATH, addOnFaqs),
    });

    const named = services.slice(0, 6).map((service) => service.name);

    return (
        <>
            <PageSchema
                path={PAGE_PATH}
                type="CollectionPage"
                name={`${PAGE_TITLE} | Medcity Overseas`}
                description={PAGE_DESCRIPTION}
                dateModified={TEMPLATE_UPDATED}
                image={OG_IMAGE_URL}
                about={{ "@id": ORG_ID }}
                {...(services.length ? { mainEntity: { "@id": `${PAGE_URL}#service-list` } } : {})}
                entities={services.length ? [serviceList] : []}
                breadcrumbs={[
                    { name: "Home", path: "/" },
                    { name: "Add-On Services", path: PAGE_PATH },
                ]}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLdString(faqSchema) }}
            />

            <AddOnServicesClient
                initial={initial}
                intro={
                    <QuickAnswer updated={TEMPLATE_UPDATED} className="py-10">
                        {named.length
                            ? `Medcity Overseas offers ${services.length} study abroad add-on ${services.length === 1 ? "service" : "services"} on top of counselling and admissions, including ${joinList(named)}. Choose the ones you need when you plan your move abroad.`
                            : "Medcity Overseas offers study abroad add-on services on top of counselling and admissions, such as SOP help, education loan guidance, visa interview preparation and travel support."}
                    </QuickAnswer>
                }
                beforeFaq={
                    <QuestionAnswer
                        className="py-14"
                        eyebrow="Add-on services"
                        question="What are study abroad add-on services?"
                        answer="Add-on services are extra help around your university application. Medcity Overseas can help you write your statement of purpose, understand education loans, prepare for a visa interview and sort out travel essentials such as a travel card, an international SIM and flight tickets. You choose only the services you need."
                        points={[
                            { title: "Before you apply", text: "counselling, course advice and SOP preparation." },
                            { title: "Paying for it", text: "guidance on education loans and documents." },
                            { title: "Your visa", text: "visa interview preparation." },
                            { title: "Before you fly", text: "travel card, international SIM and flight tickets." },
                        ]}
                    />
                }
                afterFaq={
                    <>
                        <OfficialSources
                            className="pb-12"
                            links={[
                                {
                                    label: "Passport Seva (Ministry of External Affairs)",
                                    href: "https://www.passportindia.gov.in/",
                                    note: "Apply for or renew the Indian passport you need for your visa.",
                                },
                                ...STUDY_ABROAD_SOURCES,
                            ]}
                        />

                        <p className="mx-auto max-w-5xl px-4 pb-16 text-sm leading-7 text-slate-600 sm:px-6 lg:px-8">
                            Still choosing where to study? Compare{" "}
                            <Link href="/destinations" className="font-bold text-primary hover:underline">
                                study destinations
                            </Link>
                            , search the{" "}
                            <Link href="/courses" className="font-bold text-primary hover:underline">
                                course finder
                            </Link>{" "}
                            or{" "}
                            <Link href="/contact-us" className="font-bold text-primary hover:underline">
                                contact Medcity Overseas
                            </Link>{" "}
                            to book a service.
                        </p>
                    </>
                }
            />
        </>
    );
}

// Search details edited in the admin apply on top of these.
export async function generateMetadata() {
  return applySeoOverrides(pageMetadata);
}
