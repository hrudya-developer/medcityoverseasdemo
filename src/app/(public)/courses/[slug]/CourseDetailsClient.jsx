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
import CourseDetailsHero from "./components/CourseDetailsHero";
import CourseDetailsSkeleton from "./components/CourseDetailsSkeleton";
import CourseQuickFacts from "./components/CourseQuickFacts";
import EnglishRequirements from "./components/EnglishRequirements";

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
        setStorageChecked(false);

        if (!slug) {
            setStorageChecked(true);
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
                JSON.parse(raw);

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
    }, [slug]);

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

       If page was opened directly using only
       slug, server resolver returns the course.

       Once we know the exact ID, save it so
       future visits can use the faster path.
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

    const details =
        formatCourseDetails(
            selectedCourse
        );

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
                selectedCourse?.u_id ??
                selectedCourse?.university_id ??
                "",

            countryId:
                selectedCourse?.d_id ??
                selectedCourse?.country_id ??
                "",

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

            <CourseQuickFacts
                duration={
                    details.duration
                }
                level={
                    details.level
                }
                intakes={
                    details.intakes
                }
                intakesRaw={
                    details.intakesRaw
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