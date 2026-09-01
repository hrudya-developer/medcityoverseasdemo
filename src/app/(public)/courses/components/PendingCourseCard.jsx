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
    Building2,
    GraduationCap,
    MapPin,
    X,
} from "lucide-react";

import {
    createPublicCourseHref,
} from "@/lib/courseSlug";

/* =========================================================
   HELPERS
========================================================= */

function getExactCourseId(
    pending,
    course
) {
    return String(
        course?.id ??
        pending?.courseId ??
        course?.uc_id ??
        course?.university_course_id ??
        ""
    ).trim();
}

function getCourseTitle(
    course
) {
    return (
        course?.course ??
        course?.course_name ??
        course?.name ??
        course?.title ??
        "Selected course"
    );
}

function getUniversityName(
    course
) {
    return (
        course?.university ??
        course?.university_name ??
        course?.u_name ??
        "University"
    );
}

function getLocation(
    course
) {
    return (
        course?.country ??
        course?.country_name ??
        course?.location ??
        ""
    );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function PendingCourseCard() {
    const router =
        useRouter();

    const [
        pending,
        setPending,
    ] = useState(null);

    /* =======================================================
       READ PENDING APPLICATION
    ======================================================= */

    useEffect(() => {
        try {
            const stored =
                sessionStorage.getItem(
                    "pendingApplyCourse"
                );

            if (!stored) {
                return;
            }

            const parsed =
                JSON.parse(stored);

            if (
                !parsed ||
                typeof parsed !==
                    "object"
            ) {
                return;
            }

            setPending(
                parsed
            );
        } catch (error) {
            console.error(
                "Unable to read pending course:",
                error
            );

            try {
                sessionStorage.removeItem(
                    "pendingApplyCourse"
                );

                sessionStorage.removeItem(
                    "loginRedirectType"
                );
            } catch {
                // Ignore cleanup error
            }
        }
    }, []);

    /* =======================================================
       CLEAR
    ======================================================= */

    const clearPendingCourse =
        () => {
            try {
                sessionStorage.removeItem(
                    "pendingApplyCourse"
                );

                sessionStorage.removeItem(
                    "loginRedirectType"
                );
            } catch (error) {
                console.warn(
                    "Unable to clear pending course:",
                    error
                );
            }

            setPending(null);
        };

    /* =======================================================
       DATA
    ======================================================= */

    const course =
        pending?.course ??
        {};

    const courseTitle =
        getCourseTitle(
            course
        );

    const universityName =
        getUniversityName(
            course
        );

    const location =
        getLocation(
            course
        );

    const exactCourseId =
        getExactCourseId(
            pending,
            course
        );

    const courseHref =
        useMemo(() => {
            if (
                pending?.courseSlug
            ) {
                return `/courses/${pending.courseSlug}`;
            }

            return (
                createPublicCourseHref(
                    course,
                    universityName
                ) || ""
            );
        }, [
            pending?.courseSlug,
            course,
            universityName,
        ]);

    /* =======================================================
       VIEW COURSE AGAIN
    ======================================================= */

    const handleViewCourse =
        () => {
            if (!courseHref) {
                return;
            }

            try {
                const slug =
                    pending?.courseSlug ||
                    courseHref.replace(
                        /^\/courses\//,
                        ""
                    );

                if (
                    slug &&
                    exactCourseId
                ) {
                    sessionStorage.setItem(
                        `public-course:${slug}`,
                        JSON.stringify({
                            id:
                                exactCourseId,

                            slug,

                            name:
                                courseTitle,

                            university:
                                universityName,

                            country:
                                location,

                            course,

                            createdAt:
                                Date.now(),
                        })
                    );
                }
            } catch (error) {
                console.warn(
                    "Unable to restore public course mapping:",
                    error
                );
            }

            router.push(
                courseHref
            );
        };

    if (!pending) {
        return null;
    }

    return (
        <section
            className="
                mb-8
                overflow-hidden
                rounded-2xl
                border
                border-primary/20
                bg-primary/[0.04]
                shadow-sm
            "
        >
            {/* HEADER */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-primary/10
                    px-5
                    py-4
                "
            >
                <div
                    className="
                        flex
                        items-center
                        gap-2
                        text-primary
                    "
                >
                    <GraduationCap
                        size={20}
                        aria-hidden="true"
                    />

                    <h2
                        className="
                            font-black
                        "
                    >
                        Your selected
                        course
                    </h2>
                </div>

                <button
                    type="button"
                    onClick={
                        clearPendingCourse
                    }
                    aria-label="Remove selected course"
                    className="
                        grid
                        size-9
                        place-content-center
                        rounded-full
                        text-slate-500
                        transition
                        hover:bg-white
                        hover:text-primary
                    "
                >
                    <X
                        size={18}
                        aria-hidden="true"
                    />
                </button>
            </div>

            {/* BODY */}

            <div
                className="
                    p-5
                "
            >
                <h3
                    className="
                        text-xl
                        font-black
                        text-slate-950
                    "
                >
                    {courseTitle}
                </h3>

                <div
                    className="
                        mt-4
                        flex
                        flex-wrap
                        gap-4
                        text-sm
                        text-slate-600
                    "
                >
                    <span
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <Building2
                            size={17}
                            className="
                                text-primary
                            "
                            aria-hidden="true"
                        />

                        {
                            universityName
                        }
                    </span>

                    {location && (
                        <span
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >
                            <MapPin
                                size={
                                    17
                                }
                                className="
                                    text-primary
                                "
                                aria-hidden="true"
                            />

                            {
                                location
                            }
                        </span>
                    )}
                </div>

                <button
                    type="button"
                    onClick={
                        handleViewCourse
                    }
                    disabled={
                        !courseHref
                    }
                    className="
                        mt-6
                        rounded-xl
                        bg-primary
                        px-5
                        py-3
                        text-sm
                        font-bold
                        text-white
                        transition

                        hover:bg-darkPrimary

                        disabled:cursor-not-allowed
                        disabled:bg-slate-300
                    "
                >
                    View course details
                </button>
            </div>
        </section>
    );
}