"use client";

import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import Link from "next/link";

import {
    ArrowRight,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

import {
    useGetPopularCoursesQuery,
} from "@/lib/services/searchApi";

import CourseCard from "./study/CourseCard";
import CoursesError from "./study/CoursesError";
import CoursesHeader from "./study/CoursesHeader";
import CoursesLoading from "./study/CoursesLoading";
import EmptyCourses from "./study/EmptyCourses";
import SectionDecorations from "./study/SectionDecorations";

const COURSES_PER_ROW = 3;
const INITIAL_VISIBLE_COUNT = 3;
const ANIMATION_DURATION = 350;

export default function StudyTabContent() {
    const [
        visibleCount,
        setVisibleCount,
    ] = useState(
        INITIAL_VISIBLE_COUNT
    );

    const [
        exitingCourseIds,
        setExitingCourseIds,
    ] = useState([]);

    const [
        enteringCourseIds,
        setEnteringCourseIds,
    ] = useState([]);

    const timeoutRef = useRef(null);

    const {
        data,
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
    } = useGetPopularCoursesQuery(0);

    const popularCourses =
        data?.courses ?? [];

    const courseImagePath =
        data?.imagePath ?? "";

    const isInitialLoading =
        (isLoading || isFetching) &&
        popularCourses.length === 0;

    const getCourseKey = (
        course,
        index
    ) =>
        String(
            course?.id ??
            course?.course_id ??
            course?.c_id ??
            `course-${index}`
        );

    const visibleCourses = useMemo(
        () =>
            popularCourses.slice(
                0,
                visibleCount
            ),
        [
            popularCourses,
            visibleCount,
        ]
    );

    const hasMoreCourses =
        visibleCount <
        popularCourses.length;

    const canShowLess =
        visibleCount >
        INITIAL_VISIBLE_COUNT;

    useEffect(() => {
        if (
            popularCourses.length === 0
        ) {
            setVisibleCount(
                INITIAL_VISIBLE_COUNT
            );

            return;
        }

        setVisibleCount(
            (currentCount) =>
                Math.min(
                    Math.max(
                        INITIAL_VISIBLE_COUNT,
                        currentCount
                    ),
                    popularCourses.length
                )
        );
    }, [popularCourses.length]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(
                    timeoutRef.current
                );
            }
        };
    }, []);

    const handleLoadMore = () => {
        if (
            !hasMoreCourses ||
            exitingCourseIds.length > 0
        ) {
            return;
        }

        const nextVisibleCount =
            Math.min(
                visibleCount +
                COURSES_PER_ROW,
                popularCourses.length
            );

        const newCourseIds =
            popularCourses
                .slice(
                    visibleCount,
                    nextVisibleCount
                )
                .map(
                    (
                        course,
                        index
                    ) =>
                        getCourseKey(
                            course,
                            visibleCount +
                            index
                        )
                );

        setVisibleCount(
            nextVisibleCount
        );

        setEnteringCourseIds(
            newCourseIds
        );

        requestAnimationFrame(() => {
            requestAnimationFrame(
                () => {
                    setEnteringCourseIds(
                        []
                    );
                }
            );
        });
    };

    const handleShowLess = () => {
        if (
            !canShowLess ||
            exitingCourseIds.length > 0
        ) {
            return;
        }

        const nextVisibleCount =
            Math.max(
                INITIAL_VISIBLE_COUNT,
                visibleCount -
                COURSES_PER_ROW
            );

        const removedCourseIds =
            popularCourses
                .slice(
                    nextVisibleCount,
                    visibleCount
                )
                .map(
                    (
                        course,
                        index
                    ) =>
                        getCourseKey(
                            course,
                            nextVisibleCount +
                            index
                        )
                );

        setExitingCourseIds(
            removedCourseIds
        );

        timeoutRef.current =
            setTimeout(() => {
                setVisibleCount(
                    nextVisibleCount
                );

                setExitingCourseIds(
                    []
                );
            }, ANIMATION_DURATION);
    };

    if (isInitialLoading) {
        return <CoursesLoading />;
    }

    if (isError) {
        return (
            <CoursesError
                message={
                    error?.data
                        ?.message ||
                    error?.error ||
                    "Unable to load popular courses."
                }
                onRetry={refetch}
            />
        );
    }

    return (
        <section
            aria-labelledby="popular-courses-heading"
            className="
                relative
                overflow-hidden
                py-10
                sm:py-12
            "
        >
            <SectionDecorations />

            <div
                className="
                    relative z-10
                    mx-auto
                    max-w-6xl
                    px-4
                    sm:px-6
                "
            >
                <CoursesHeader />

                {visibleCourses.length >
                    0 ? (
                    <>
                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-7
                                sm:grid-cols-2
                                lg:grid-cols-3
                                lg:gap-8
                            "
                        >
                            {visibleCourses.map(
                                (
                                    course,
                                    index
                                ) => {
                                    const courseKey =
                                        getCourseKey(
                                            course,
                                            index
                                        );

                                    const isExiting =
                                        exitingCourseIds.includes(
                                            courseKey
                                        );

                                    const isEntering =
                                        enteringCourseIds.includes(
                                            courseKey
                                        );

                                    return (
                                        <div
                                            key={
                                                courseKey
                                            }
                                            className={`
                                                transform-gpu
                                                transition-all
                                                duration-[350ms]
                                                ease-out
                                                ${isExiting
                                                    ? `
                                                            pointer-events-none
                                                            translate-y-5
                                                            scale-[0.97]
                                                            opacity-0
                                                        `
                                                    : isEntering
                                                        ? `
                                                                translate-y-5
                                                                scale-[0.97]
                                                                opacity-0
                                                            `
                                                        : `
                                                                translate-y-0
                                                                scale-100
                                                                opacity-100
                                                            `
                                                }
                                            `}
                                            style={{
                                                transitionDelay:
                                                    isExiting
                                                        ? `${index *
                                                        35
                                                        }ms`
                                                        : `${(
                                                            index %
                                                            COURSES_PER_ROW
                                                        ) *
                                                        70
                                                        }ms`,
                                            }}
                                        >
                                            <CourseCard
                                                course={
                                                    course
                                                }
                                                index={
                                                    index
                                                }
                                                imagePath={
                                                    courseImagePath
                                                }
                                            />
                                        </div>
                                    );
                                }
                            )}
                        </div>

                        <div
                            className="
                                mt-10 flex
                                flex-col
                                items-center
                                justify-center
                                gap-4
                                sm:flex-row
                                sm:flex-wrap
                            "
                        >
                            {hasMoreCourses && (
                                <CoursesActionButton
                                    type="more"
                                    disabled={
                                        exitingCourseIds.length >
                                        0
                                    }
                                    onClick={
                                        handleLoadMore
                                    }
                                />
                            )}

                            {canShowLess && (
                                <CoursesActionButton
                                    type="less"
                                    disabled={
                                        exitingCourseIds.length >
                                        0
                                    }
                                    onClick={
                                        handleShowLess
                                    }
                                />
                            )}

                            <ViewAllCourses />
                        </div>
                    </>
                ) : (
                    <EmptyCourses />
                )}
            </div>
        </section>
    );
}

function CoursesActionButton({
    type,
    disabled,
    onClick,
}) {
    const isShowLess =
        type === "less";

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            aria-label={
                isShowLess
                    ? "Hide the last row of courses"
                    : "Show the next row of courses"
            }
            className="
                group
                inline-flex
                min-h-[48px]
                items-center
                justify-center
                gap-2.5
                rounded-2xl
                border
                border-primary/25
                bg-white
                px-6
                py-3
                text-sm
                font-extrabold
                text-primary
                shadow-[0_10px_28px_rgba(15,23,42,0.08)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary
                hover:bg-primary
                hover:text-white
                hover:shadow-[0_16px_35px_rgba(192,31,83,0.20)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
                disabled:cursor-not-allowed
                disabled:opacity-50
                disabled:hover:translate-y-0
            "
        >
            {isShowLess
                ? "Show Less"
                : "Load More"}

            {isShowLess ? (
                <ChevronUp
                    aria-hidden="true"
                    className="
                        h-4 w-4
                        transition-transform
                        duration-300
                        group-hover:-translate-y-0.5
                    "
                />
            ) : (
                <ChevronDown
                    aria-hidden="true"
                    className="
                        h-4 w-4
                        transition-transform
                        duration-300
                        group-hover:translate-y-0.5
                    "
                />
            )}
        </button>
    );
}

function ViewAllCourses() {
    return (
        <Link
            href="/courses"
            aria-label="find a course"
            className="
                group
                inline-flex
                min-h-[48px]
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-gradient-to-r
                from-primary
                to-darkPrimary
                px-6
                py-3.5
                text-sm
                font-bold
                text-white
                shadow-[0_14px_35px_rgba(192,31,83,0.28)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_20px_45px_rgba(192,31,83,0.38)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
            "
        >
            Find a Course

            <ArrowRight
                aria-hidden="true"
                className="
                    h-4 w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                "
            />
        </Link>
    );
}