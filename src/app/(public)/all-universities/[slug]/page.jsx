import { notFound } from "next/navigation";

import { createSlug } from "@/lib/slug";
import { postOverseasForm } from "@/lib/overseasApi";

import UniversitiesByCountry from "./UniversitiesByCountry";

const SITE_URL = "https://medcityoverseas.com";

async function resolveCountry(slug) {
    const result = await postOverseasForm(
        "getDestinations",
        { uid: 0 },
        { next: { revalidate: 3600 } }
    );

    const destinations =
        Array.isArray(result?.destinations)
            ? result.destinations
            : Array.isArray(result?.data)
                ? result.data
                : [];

    const destination = destinations.find((item) => {
        const name =
            item?.country ||
            item?.name ||
            item?.destination ||
            "";

        return createSlug(name) === slug;
    });

    if (!destination) return null;

    return {
        id: Number(
            destination?.d_id ||
            destination?.id ||
            destination?.destination_id
        ),
        name:
            destination?.country ||
            destination?.name ||
            destination?.destination ||
            "International",
    };
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const country = await resolveCountry(slug);
    const countryName = country?.name || "International";
    const pageUrl = country
        ? `${SITE_URL}/all-universities/${slug}`
        : `${SITE_URL}/all-universities`;
    const title =
        `Universities in ${countryName} | Medcity Study Abroad`;
    const description =
        `Explore universities in ${countryName}. Compare institutions, locations, courses and international study opportunities with Medcity Study Abroad.`;

    return {
        title,
        description,
        alternates: { canonical: pageUrl },
        openGraph: {
            title,
            description,
            url: pageUrl,
            siteName: "Medcity Study Abroad",
            locale: "en_IN",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
        robots: {
            index: Boolean(country),
            follow: true,
        },
    };
}

export default async function UniversitiesPage({ params }) {
    const { slug } = await params;
    const country = await resolveCountry(slug);

    if (!country?.id) notFound();

    const pageUrl = `${SITE_URL}/all-universities/${slug}`;
    const countryName = country.name;
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Universities in ${countryName}`,
        description:
            `Explore universities and study opportunities in ${countryName}.`,
        inLanguage: "en-IN",
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData).replace(
                        /</g,
                        "\\u003c"
                    ),
                }}
            />
            <main
                id="main-content"
                className="min-h-screen bg-[#f8fafc]"
            >
                <UniversitiesByCountry
                    initialCountryId={country.id}
                    initialCountryName={countryName}
                />
            </main>
        </>
    );
}
