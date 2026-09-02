import {
    createUniversityPublicSlug,
} from "@/lib/universitySlug";

import {
    cleanText,
    getUniversityName,
    normalizeSlug,
    truncateText,
} from "./universityHelpers";

import {
    resolveUniversity,
} from "./universityResolver";

const SITE_URL =
    "https://medcityoverseas.com";

const DEFAULT_OG_IMAGE =
    `${SITE_URL}/og-images/universities.webp`;

export async function buildUniversityMetadata({
    params,
}) {
    const {
        slug: rawSlug,
    } = await params;

    const slug =
        normalizeSlug(rawSlug);

    if (!slug) {
        return {
            title: {
                absolute:
                    "Universities | Medcity Overseas",
            },
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const resolved =
        await resolveUniversity(slug);

    if (!resolved?.university) {
        return {
            title: {
                absolute:
                    "University Details | Medcity Overseas",
            },
            robots: {
                index: false,
                follow: true,
            },
        };
    }

    const university =
        resolved.university;

    const universityName =
        getUniversityName(university);

    const countryName =
        cleanText(
            resolved.countryName ??
            university?.country ??
            university?.country_name ??
            resolved.courses?.[0]
                ?.country ??
            ""
        );

    const canonicalSlug =
        createUniversityPublicSlug(
            {
                ...university,
                name: universityName,
                country: countryName,
            },
            countryName
        );

    const canonicalUrl =
        `${SITE_URL}/universities/${canonicalSlug}`;

    const description =
        truncateText(
            university?.about ??
            university?.description ??
            `Explore ${universityName} courses, admission requirements, scholarships and international study opportunities.`
        );

    const title =
        `${universityName} Courses, Admissions & Ranking | Medcity Overseas`;

    return {
        title: {
            absolute: title,
        },

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
            type: "website",
            locale: "en_IN",
            url: canonicalUrl,
            siteName:
                "Medcity Overseas",
            title,
            description,

            images: [
                {
                    url:
                        DEFAULT_OG_IMAGE,
                    width: 1200,
                    height: 630,
                    alt:
                        `${universityName} courses and admissions`,
                },
            ],
        },

        twitter: {
            card:
                "summary_large_image",
            title,
            description,
            images: [
                DEFAULT_OG_IMAGE,
            ],
        },
    };
}