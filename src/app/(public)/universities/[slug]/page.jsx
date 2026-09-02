import {
    notFound,
    permanentRedirect,
} from "next/navigation";

import {
    createUniversityPublicSlug,
} from "@/lib/universitySlug";

import UniversityDetailsClient from "./components/UniversityDetailsClient";

import {
    cleanId,
    cleanText,
    extractCourses,
    getUniversityCountryId,
    getUniversityName,
    normalizeSlug,
} from "./lib/universityHelpers";

import {
    getUniversityMainCourses,
} from "./lib/universityApi";

import {
    resolveUniversity,
} from "./lib/universityResolver";

import {
    resolveDestination,
} from "./lib/universitySlugContext";

import {
    buildUniversityMetadata,
} from "./lib/universityMetadata";

export const revalidate = 3600;

export async function generateMetadata(
    props
) {
    return buildUniversityMetadata(
        props
    );
}

export default async function UniversityDetailsPage({
    params,
    searchParams,
}) {
    const {
        slug: rawSlug,
    } = await params;

    const slug =
        normalizeSlug(rawSlug);

    if (!slug) {
        notFound();
    }

    // -----------------------------------------
    // Resolve exact university
    // -----------------------------------------

    const resolved =
        await resolveUniversity(slug);

    // -----------------------------------------
    // Maybe this slug is a destination
    // -----------------------------------------

    if (!resolved) {
        const destination =
            await resolveDestination(
                slug
            );

        if (destination) {
            permanentRedirect(
                `/universities-in-${destination.slug}`
            );
        }

        notFound();
    }

    if (
        !resolved?.id ||
        !resolved?.details ||
        !resolved?.university
    ) {
        notFound();
    }

    // -----------------------------------------
    // University
    // -----------------------------------------

    const universityId =
        cleanId(resolved.id);

    const university =
        resolved.university;

    const detailsResult =
        resolved.details;

    const universityName =
        getUniversityName(
            university
        );

    const resolvedCountryName =
        cleanText(
            resolved.countryName ??
            university?.country ??
            university?.country_name ??
            resolved.courses?.[0]
                ?.country ??
            ""
        );

    // -----------------------------------------
    // Canonical public URL
    // -----------------------------------------

    const canonicalSlug =
        createUniversityPublicSlug(
            {
                ...university,
                name: universityName,
                country:
                    resolvedCountryName,
            },
            resolvedCountryName
        );

    if (
        canonicalSlug &&
        canonicalSlug !== slug
    ) {
        permanentRedirect(
            `/universities/${canonicalSlug}`
        );
    }

    // -----------------------------------------
    // Courses
    // -----------------------------------------

    const detailsCourses =
        extractCourses(
            detailsResult
        );

    const initialCourseCategoryId =
        cleanId(
            detailsCourses?.[0]?.c_id
        );

    const mainCourses =
        await getUniversityMainCourses(
            universityId
        );

    // -----------------------------------------
    // Client data
    // -----------------------------------------

    const initialData = {
        ...detailsResult,

        course:
            detailsCourses,

        courses:
            detailsCourses,

        mainCourses,

        initialCourseCategoryId,
    };

    // -----------------------------------------
    // Tab
    // -----------------------------------------

    const resolvedSearchParams =
        await searchParams;

    const initialTab =
        resolvedSearchParams
            ?.tab === "courses"
            ? "courses"
            : "about";

    // -----------------------------------------
    // Development debug
    // -----------------------------------------

    if (
        process.env.NODE_ENV ===
        "development"
    ) {
        console.log(
            "UNIVERSITY PAGE DATA",
            {
                universityId,

                universityName,

                countryId:
                    getUniversityCountryId(
                        university
                    ),

                country:
                    resolvedCountryName,

                detailsCourses:
                    detailsCourses.length,

                initialCourseCategoryId,

                mainCourses:
                    mainCourses.length,

                firstCourse:
                    detailsCourses[0] ??
                    null,
            }
        );
    }

    return (
        <UniversityDetailsClient
            id={universityId}
            initialData={
                initialData
            }
            initialTab={
                initialTab
            }
        />
    );
}