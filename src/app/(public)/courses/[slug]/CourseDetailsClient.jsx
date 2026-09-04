"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    useRouter,
} from "next/navigation";

import {
    useGetPublicCourseDetailsQuery,
} from "@/lib/services/searchApi";

import CourseBenefits from "./components/CourseBenefits";
import CourseDetailsError from "./components/CourseDetailsError";
import CourseDetailsFAQ from "./components/CourseDetailsFAQ";
import CourseDetailsGrid from "./components/CourseDetailsGrid";
import CourseDetailsSkeleton from "./components/CourseDetailsSkeleton";
import EnglishRequirements from "./components/EnglishRequirements";

import CourseDetailsHero from "./components/course-details-hero/CourseDetailsHero";

import {
    formatCourseDetails,
} from "./utils/courseDetailsHelpers";

/* =========================================================
   COURSE DETAILS ID

   getCoursedetails expects the actual course "id".

   id   = course details ID
   u_id = university ID
   d_id = destination ID
   c_id = main course / study area ID
========================================================= */

function getCourseId(course) {
    const value =
        course?.id ??
        course?.uc_id ??
        course?.university_course_id ??
        course?.universityCourseId ??
        course?.selected_course_id ??
        course?.selectedCourseId ??
        course?.details_id ??
        course?.course_details_id ??
        "";

    return String(
        value
    ).trim();
}

/* =========================================================
   FIRST NON-EMPTY VALUE
========================================================= */

function firstValue(
    ...values
) {
    for (
        const value of values
    ) {
        if (
            value !== undefined &&
            value !== null &&
            String(
                value
            ).trim() !== ""
        ) {
            return value;
        }
    }

    return "";
}

/* =========================================================
   UNIVERSITY ID
========================================================= */

function getUniversityId(
    course
) {
    return String(
        firstValue(
            course?.u_id,
            course?.university_id,
            course?.universityId,
            course?.university?.id,
            course?.university?.u_id,
            course?.university
                ?.university_id,
            ""
        )
    ).trim();
}

/* =========================================================
   COUNTRY ID
========================================================= */

function getCountryId(
    course
) {
    return String(
        firstValue(
            course?.d_id,
            course?.country_id,
            course?.destination_id,
            course?.destinationId,
            course?.university?.d_id,
            course?.university
                ?.country_id,
            ""
        )
    ).trim();
}

/* =========================================================
   UNIVERSITY LOGO

   Supports the different shapes returned by
   course/university API responses.
========================================================= */

function getUniversityLogo(
    course
) {
    return firstValue(
        /*
         * Normalized fields
         */
        course?.universityLogoUrl,
        course?.university_logo_url,
        course?.universityLogo,
        course?.university_logo,

        /*
         * Common university logo fields
         */
        course?.u_logo,
        course?.logo,
        course?.logo_image,
        course?.logoImage,

        /*
         * University image aliases
         */
        course?.university_image,
        course?.universityImage,
        course?.image,
        course?.image_name,
        course?.imageName,

        /*
         * Nested university object
         */
        course?.university?.logo,
        course?.university
            ?.university_logo,
        course?.university
            ?.universityLogo,
        course?.university?.u_logo,
        course?.university
            ?.logo_image,
        course?.university
            ?.logoImage,
        course?.university?.image,
        course?.university
            ?.image_name,
        course?.university
            ?.imageName,

        /*
         * Nested info object
         */
        course?.info?.logo,
        course?.info
            ?.university_logo,
        course?.info
            ?.universityLogo,
        course?.info?.u_logo,
        course?.info?.image,

        /*
         * Nested data object
         */
        course?.data?.logo,
        course?.data
            ?.university_logo,
        course?.data
            ?.universityLogo,
        course?.data?.u_logo,
        course?.data?.image,

        ""
    );
}

/* =========================================================
   UNIVERSITY IMAGE BASE PATH

   Used when API returns:
   logo = "abc.png"
   image_path = "https://domain.com/path"
========================================================= */

function getUniversityImagePath(
    course
) {
    return firstValue(
        /*
         * Normalized fields
         */
        course?.universitiesImagePath,
        course
            ?.universities_image_path,

        course?.universityImagePath,
        course
            ?.university_image_path,

        course?.universityLogoPath,
        course
            ?.university_logo_path,

        /*
         * Generic API image path
         */
        course?.image_path,
        course?.imagePath,

        /*
         * Nested university object
         */
        course?.university
            ?.image_path,
        course?.university
            ?.imagePath,

        course?.university
            ?.logo_path,
        course?.university
            ?.logoPath,

        course?.university
            ?.university_image_path,

        /*
         * Nested info object
         */
        course?.info
            ?.universities_image_path,
        course?.info
            ?.university_image_path,
        course?.info?.image_path,
        course?.info?.imagePath,

        /*
         * Nested data object
         */
        course?.data
            ?.universities_image_path,
        course?.data
            ?.university_image_path,
        course?.data?.image_path,
        course?.data?.imagePath,

        ""
    );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function CourseDetailsClient({
    slug,
}) {
    const router =
        useRouter();

    const [
        storedCourseId,
        setStoredCourseId,
    ] = useState("");

    const [
        storageChecked,
        setStorageChecked,
    ] = useState(false);

    /* =======================================================
       READ SLUG -> COURSE ID MAPPING

       This mapping is an optimization.

       If mapping exists:
       slug + exact ID

       If mapping doesn't exist:
       slug-only API resolution still works.
    ======================================================= */

    useEffect(() => {
        setStoredCourseId("");
        setStorageChecked(
            false
        );

        if (!slug) {
            setStorageChecked(
                true
            );

            return;
        }

        try {
            const storageKey =
                `public-course:${slug}`;

            const raw =
                sessionStorage.getItem(
                    storageKey
                );

            if (!raw) {
                return;
            }

            const parsed =
                JSON.parse(
                    raw
                );

            /*
             * Reject stale mapping belonging
             * to another slug.
             */
            if (
                parsed?.slug &&
                String(
                    parsed.slug
                ).trim() !==
                    String(
                        slug
                    ).trim()
            ) {
                sessionStorage.removeItem(
                    storageKey
                );

                return;
            }

            const mappedId =
                parsed?.id
                    ? String(
                          parsed.id
                      ).trim()
                    : "";

            const storedObjectId =
                getCourseId(
                    parsed?.course
                );

            const finalId =
                mappedId ||
                storedObjectId;

            if (finalId) {
                setStoredCourseId(
                    finalId
                );
            }
        } catch (error) {
            console.error(
                "Unable to read stored course mapping:",
                error
            );

            try {
                sessionStorage.removeItem(
                    `public-course:${slug}`
                );
            } catch {
                // Ignore cleanup error
            }
        } finally {
            /*
             * Do not block slug-only lookup.
             */
            setStorageChecked(
                true
            );
        }
    }, [
        slug,
    ]);

    /* =======================================================
       FETCH PUBLIC COURSE

       Card click:
       slug + exact ID

       Direct URL / refresh / Google:
       slug only
    ======================================================= */

    const {
        data:
            selectedCourse,

        isLoading,
        isFetching,
        isError,
        error,
        refetch,
    } =
        useGetPublicCourseDetailsQuery(
            {
                slug:
                    slug || "",

                courseId:
                    storedCourseId ||
                    "",

                uid:
                    "0",
            },
            {
                skip:
                    !slug ||
                    !storageChecked,
            }
        );

    /* =======================================================
       ACTUAL COURSE ID
    ======================================================= */

    const actualCourseId =
        useMemo(() => {
            return (
                getCourseId(
                    selectedCourse
                ) ||
                storedCourseId ||
                ""
            );
        }, [
            selectedCourse,
            storedCourseId,
        ]);

    /* =======================================================
       SAVE RESOLVED COURSE MAPPING
    ======================================================= */

    useEffect(() => {
        if (
            !slug ||
            !selectedCourse ||
            !actualCourseId
        ) {
            return;
        }

        try {
            sessionStorage.setItem(
                `public-course:${slug}`,
                JSON.stringify({
                    id:
                        actualCourseId,

                    slug,

                    course:
                        selectedCourse,

                    createdAt:
                        Date.now(),
                })
            );
        } catch (error) {
            console.warn(
                "Unable to save resolved course mapping:",
                error
            );
        }
    }, [
        slug,
        selectedCourse,
        actualCourseId,
    ]);

    /* =======================================================
       LOADING
    ======================================================= */

    if (
        !storageChecked ||
        isLoading ||
        isFetching
    ) {
        return (
            <CourseDetailsSkeleton />
        );
    }

    /* =======================================================
       ERROR
    ======================================================= */

    if (
        isError ||
        !selectedCourse
    ) {
        const errorMessage =
            error?.data
                ?.message ||
            error?.data
                ?.error ||
            error?.message ||
            (error?.status ===
            404
                ? "Course not found for this URL."
                : "Course details could not be loaded.");

        return (
            <CourseDetailsError
                message={
                    errorMessage
                }
                onRetry={() => {
                    refetch();
                }}
                onBack={() => {
                    router.push(
                        "/courses"
                    );
                }}
            />
        );
    }

    /* =======================================================
       FORMAT DETAILS
    ======================================================= */

    const formattedDetails =
        formatCourseDetails(
            selectedCourse
        );

    /*
     * Preserve logo fields that may not be
     * returned by formatCourseDetails().
     */
    const universityLogo =
        firstValue(
            formattedDetails
                ?.universityLogoUrl,

            formattedDetails
                ?.universityLogo,

            formattedDetails?.logo,

            getUniversityLogo(
                selectedCourse
            )
        );

    const universityImagePath =
        firstValue(
            formattedDetails
                ?.universitiesImagePath,

            formattedDetails
                ?.universityImagePath,

            getUniversityImagePath(
                selectedCourse
            )
        );

    const details = {
        ...formattedDetails,

        /*
         * Give CourseDetailsHero every supported
         * logo property.
         */
        universityLogo:
            universityLogo,

        universityLogoUrl:
            universityLogo,

        logo:
            universityLogo,

        /*
         * Give CourseDetailsHero every supported
         * image-base-path property.
         */
        universityImagePath:
            universityImagePath,

        universitiesImagePath:
            universityImagePath,
    };

    /* =======================================================
       DEVELOPMENT LOGO DEBUG

       Remove this after verifying the logo.
    ======================================================= */

    if (
        process.env.NODE_ENV ===
        "development"
    ) {
        console.log(
            "COURSE UNIVERSITY LOGO DEBUG",
            {
                universityId:
                    getUniversityId(
                        selectedCourse
                    ),

                universityName:
                    details
                        ?.universityName,

                rawLogo:
                    getUniversityLogo(
                        selectedCourse
                    ),

                rawImagePath:
                    getUniversityImagePath(
                        selectedCourse
                    ),

                finalLogo:
                    details
                        ?.universityLogo,

                finalImagePath:
                    details
                        ?.universityImagePath,
            }
        );
    }

    /* =======================================================
       APPLY COURSE

       KEEP THIS SESSION STORAGE.

       This data is required after:
       Apply Now -> Login -> OTP -> Dashboard
    ======================================================= */

    const handleApply = () => {
        const pendingData = {
            course:
                selectedCourse,

            courseId:
                actualCourseId,

            courseSlug:
                slug,

            universityId:
                getUniversityId(
                    selectedCourse
                ),

            countryId:
                getCountryId(
                    selectedCourse
                ),

            createdAt:
                Date.now(),
        };

        try {
            /*
             * Selected application course
             */
            sessionStorage.setItem(
                "pendingApplyCourse",
                JSON.stringify(
                    pendingData
                )
            );

            /*
             * Login knows why the user
             * was redirected.
             */
            sessionStorage.setItem(
                "loginRedirectType",
                "applyCourse"
            );

            /*
             * Also preserve slug -> ID mapping.
             */
            if (
                slug &&
                actualCourseId
            ) {
                sessionStorage.setItem(
                    `public-course:${slug}`,
                    JSON.stringify({
                        id:
                            actualCourseId,

                        slug,

                        course:
                            selectedCourse,

                        createdAt:
                            Date.now(),
                    })
                );
            }
        } catch (error) {
            console.error(
                "Unable to save pending course application:",
                error
            );
        }

        router.push(
            "/login?intent=applyCourse"
        );
    };

    /* =======================================================
       UI
    ======================================================= */

    return (
        <div
            className="
                min-h-screen
                bg-white
                text-slate-900
            "
        >
            <CourseDetailsHero
                details={
                    details
                }
                onApply={
                    handleApply
                }
            />

            <CourseDetailsGrid
                details={
                    details
                }
            />

            <EnglishRequirements
                course={
                    selectedCourse
                }
            />

            <CourseBenefits
                country={
                    details.country
                }
                intakes={
                    details.intakes
                }
                universityName={
                    details.universityName
                }
            />

            <CourseDetailsFAQ
                course={
                    selectedCourse
                }
                courseSlug={
                    slug
                }
            />
        </div>
    );
}