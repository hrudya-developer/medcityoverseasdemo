import { notFound } from "next/navigation";

import UniversitiesByCountry from "./UniversitiesByCountry";


const SITE_URL =
    "https://medcityoverseas.com";

const getSafeCountryId = (value) => {
    const parsedId = Number(value);

    if (
        !Number.isInteger(parsedId) ||
        parsedId <= 0
    ) {
        return null;
    }

    return parsedId;
};

export async function generateMetadata({
    params,
    searchParams,
}) {
    const resolvedParams =
        await params;

    const resolvedSearchParams =
        await searchParams;

    const countryId =
        getSafeCountryId(
            resolvedParams?.countryId
        );

    const countryName =
        String(
            resolvedSearchParams?.country ||
            "International"
        ).trim();

    const pageUrl = countryId
        ? `${SITE_URL}/all-universities/${countryId}`
        : `${SITE_URL}/all-universities`;

    const title =
        `Universities in ${countryName} | Medcity Study Abroad`;

    const description =
        `Explore universities in ${countryName}. Compare institutions, locations, courses and international study opportunities with Medcity Study Abroad.`;

    return {
        title,
        description,

        alternates: {
            canonical: pageUrl,
        },

        openGraph: {
            title,
            description,
            url: pageUrl,
            siteName:
                "Medcity Study Abroad",
            locale: "en_IN",
            type: "website",
        },

        twitter: {
            card:
                "summary_large_image",
            title,
            description,
        },

        robots: {
            index: Boolean(countryId),
            follow: true,
        },
    };
}

export default async function UniversitiesPage({
    params,
    searchParams,
}) {
    const resolvedParams =
        await params;

    const resolvedSearchParams =
        await searchParams;

    const countryId =
        getSafeCountryId(
            resolvedParams?.countryId
        );

    if (!countryId) {
        notFound();
    }

    const countryName =
        String(
            resolvedSearchParams?.country ||
            ""
        ).trim();

    const pageUrl =
        `${SITE_URL}/all-universities/${countryId}`;

    const structuredData = {
        "@context":
            "https://schema.org",

        "@graph": [
            {
                "@type":
                    "CollectionPage",

                "@id":
                    `${pageUrl}#webpage`,

                url: pageUrl,

                name: countryName
                    ? `Universities in ${countryName}`
                    : "International Universities",

                description: countryName
                    ? `Explore universities and study opportunities in ${countryName}.`
                    : "Explore international universities and study opportunities.",

                inLanguage: "en-IN",

                isPartOf: {
                    "@id":
                        `${SITE_URL}/#website`,
                },

                breadcrumb: {
                    "@id":
                        `${pageUrl}#breadcrumb`,
                },
            },

            {
                "@type":
                    "BreadcrumbList",

                "@id":
                    `${pageUrl}#breadcrumb`,

                itemListElement: [
                    {
                        "@type":
                            "ListItem",
                        position: 1,
                        name: "Home",
                        item:
                            `${SITE_URL}/`,
                    },
                    {
                        "@type":
                            "ListItem",
                        position: 2,
                        name:
                            "Universities",
                        item:
                            `${SITE_URL}/all-universities`,
                    },
                    {
                        "@type":
                            "ListItem",
                        position: 3,
                        name:
                            countryName ||
                            "Universities",
                        item: pageUrl,
                    },
                ],
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(
                            structuredData
                        ).replace(
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
                    initialCountryId={
                        countryId
                    }
                    initialCountryName={
                        countryName
                    }
                />
            </main>
        </>
    );
}