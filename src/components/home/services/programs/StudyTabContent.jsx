"use client";

import { useState } from "react";
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

const INITIAL_COURSE_COUNT = 3;
const EXPANDED_COURSE_COUNT = 6;

export default function StudyTabContent() {
    const [showAll, setShowAll] =
        useState(false);

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

    const maximumVisibleCourses =
        Math.min(
            EXPANDED_COURSE_COUNT,
            popularCourses.length
        );

    const visibleCourses =
        popularCourses.slice(
            0,
            showAll
                ? maximumVisibleCourses
                : INITIAL_COURSE_COUNT
        );

    const hasSecondRow =
        popularCourses.length >
        INITIAL_COURSE_COUNT;

    const isInitialLoading =
        (isLoading || isFetching) &&
        popularCourses.length === 0;

    const handleToggleCourses = () => {
        setShowAll(
            (currentValue) =>
                !currentValue
        );
    };

    if (isInitialLoading) {
        return <CoursesLoading />;
    }

    if (isError) {
        return (
            <CoursesError
                message={
                    error?.data?.message ||
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
                    relative
                    z-10
                    mx-auto
                    max-w-6xl
                    px-4
                    sm:px-6
                "
            >
                <CoursesHeader />

                {visibleCourses.length > 0 ? (
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
                                ) => (
                                    <CourseCard
                                        key={
                                            course?.id ??
                                            `course-${index}`
                                        }
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
                                )
                            )}
                        </div>

                        <div
                            className="
        mt-10
        flex
        flex-col
        items-center
        justify-center
        gap-4
        sm:flex-row
    "
                        >
                            {hasSecondRow && (
                                <CoursesToggleButton
                                    expanded={showAll}
                                    onClick={handleToggleCourses}
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

function CoursesToggleButton({
    expanded,
    onClick,
}) {
    return (
        <div
            className="
                mt-10
                flex
                justify-center
            "
        >
            <button
                type="button"
                onClick={onClick}
                aria-expanded={expanded}
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
                "
            >
                {expanded
                    ? "Show Less"
                    : "Load More"}

                {expanded ? (
                    <ChevronUp
                        aria-hidden="true"
                        className="
                            h-4
                            w-4
                            transition-transform
                            duration-300
                            group-hover:-translate-y-0.5
                        "
                    />
                ) : (
                    <ChevronDown
                        aria-hidden="true"
                        className="
                            h-4
                            w-4
                            transition-transform
                            duration-300
                            group-hover:translate-y-0.5
                        "
                    />
                )}
            </button>
        </div>
    );
}

function ViewAllCourses() {
    return (
        <div className="mt-10 flex justify-center">
            <Link
                href="/course-search"
                aria-label="View all study abroad courses"
                className="
                    group
                    inline-flex
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
                View All Study Abroad Courses

                <ArrowRight
                    aria-hidden="true"
                    className="
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                    "
                />
            </Link>
        </div>
    );
}