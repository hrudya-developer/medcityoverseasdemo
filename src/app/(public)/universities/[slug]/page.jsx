import UniversityDetailsClient from "./components/UniversityDetailsClient";
import { notFound } from "next/navigation";
import { createSlug } from "@/lib/slug";
import { postOverseasForm } from "@/lib/overseasApi";

const SITE_URL = "https://medcityoverseas.com";

const API_BASE_URL =
    process.env.OVERSEAS_API_BASE_URL;

const API_KEY =
    process.env.OVERSEAS_API_KEY;

async function resolveUniversityId(slug) {
    if (/^\d+$/.test(slug)) {
        return slug;
    }

    const result = await postOverseasForm(
        "searchResults",
        {
            keytype: "university",
            keyword: slug.replace(/-/g, " "),
        },
        { cache: "no-store" }
    );

    const universities = Array.isArray(
        result?.university
    )
        ? result.university
        : Array.isArray(result?.suggestion)
            ? result.suggestion
            : [];

    const university = universities.find((item) => {
        const name =
            item?.name ||
            item?.university ||
            item?.u_name ||
            "";

        return createSlug(name) === slug;
    });

    return String(
        university?.id ||
        university?.u_id ||
        university?.university_id ||
        ""
    );
}

async function getUniversityDetails(
    universityId
) {
    if (!API_BASE_URL) {
        throw new Error(
            "OVERSEAS_API_BASE_URL is missing in .env.local"
        );
    }

    if (!API_KEY) {
        throw new Error(
            "OVERSEAS_API_KEY is missing in .env.local"
        );
    }

    const response = await fetch(
        `${API_BASE_URL}/getUniversityDetails`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify({
                api: API_KEY,
                uid: 0,
                id: universityId,
            }),

            next: {
                revalidate: 3600,
            },
        }
    );

    let result;

    try {
        result = await response.json();
    } catch {
        throw new Error(
            `University API returned an invalid response (${response.status}).`
        );
    }

    if (!response.ok) {
        throw new Error(
            result?.message ||
            `Failed to load university details (${response.status}).`
        );
    }

    return result;
}

const cleanText = (value = "") =>
    String(value)
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

const truncateText = (
    value,
    maxLength = 160
) => {
    const text = cleanText(value);

    if (text.length <= maxLength) {
        return text;
    }

    return `${text
        .slice(0, maxLength - 1)
        .trim()}…`;
};

const getUniversityFromResponse = (
    result
) =>
    result?.data?.university ||
    result?.data?.selectedUniversity ||
    result?.university ||
    result?.selectedUniversity ||
    {};

export async function generateMetadata({
    params,
}) {
    const { slug: universitySlug } = await params;
    const universityId = await resolveUniversityId(
        universitySlug
    );

    try {
        const result =
            await getUniversityDetails(
                universityId
            );

        const university =
            getUniversityFromResponse(
                result
            );

        const universityName =
            university?.name ||
            university?.university_name ||
            "University";

        const description = truncateText(
            university?.about ||
            university?.description ||
            `Explore courses, ranking, scholarships and admission information for ${universityName}.`
        );

        const canonicalUrl =
            `${SITE_URL}/universities/${universitySlug}`;

        const ogImage =
            university?.image ||
            university?.logo ||
            `${SITE_URL}/images/university-details-og.webp`;

        return {
            title:
                `${universityName} Courses, Ranking & Admissions | Medcity`,

            description,

            alternates: {
                canonical: canonicalUrl,
            },

            robots: {
                index: true,
                follow: true,

                googleBot: {
                    index: true,
                    follow: true,
                    "max-image-preview":
                        "large",
                    "max-snippet": -1,
                    "max-video-preview": -1,
                },
            },

            openGraph: {
                title:
                    `${universityName} Courses and Admissions`,
                description,
                url: canonicalUrl,
                siteName:
                    "Medcity Study Abroad",
                type: "website",
                locale: "en_IN",

                images: [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                        alt:
                            `${universityName} university`,
                    },
                ],
            },

            twitter: {
                card:
                    "summary_large_image",
                title:
                    `${universityName} Courses and Admissions`,
                description,

                images: [ogImage],
            },
        };
    } catch {
        return {
            title:
                "University Details | Medcity Study Abroad",

            description:
                "Explore university courses, admissions, scholarships and ranking information.",

            robots: {
                index: false,
                follow: false,
            },
        };
    }
}

export default async function UniversityDetailsPage({
    params,
}) {
    const { slug: universitySlug } = await params;
    const universityId = await resolveUniversityId(
        universitySlug
    );

    if (!universityId) {
        return notFound();
    }

    const initialData =
        await getUniversityDetails(
            universityId
        );

    return (
        <UniversityDetailsClient
            id={universityId}
            initialData={initialData}
        />
    );
}