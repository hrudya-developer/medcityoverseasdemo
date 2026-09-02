"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import UniversityCourseCard from "./UniversityCourseCard";
import UniversityCoursesEmpty from "./UniversityCoursesEmpty";
import UniversityCoursesLoading from "./UniversityCoursesLoading";
import UniversityCoursesPagination from "./UniversityCoursesPagination";

import {
    getCourseUniqueId,
} from "./universityCoursesHelpers";

const COURSES_PER_PAGE =
    6;

export default function UniversityCoursesGrid({
    courses = [],
    universityName,
    loading = false,
    error = "",
    categoryId = "",
}) {
    const [
        currentPage,
        setCurrentPage,
    ] = useState(
        1
    );

    /* =========================================================
       RESET PAGE ON CATEGORY CHANGE
    ========================================================= */

    useEffect(
        () => {
            setCurrentPage(
                1
            );
        },
        [
            categoryId,
        ]
    );

    /* =========================================================
       TOTAL PAGES
    ========================================================= */

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                courses.length /
                    COURSES_PER_PAGE
            )
        );

    /* =========================================================
       KEEP PAGE VALID
    ========================================================= */

    useEffect(
        () => {
            if (
                currentPage >
                totalPages
            ) {
                setCurrentPage(
                    totalPages
                );
            }
        },
        [
            currentPage,
            totalPages,
        ]
    );

    /* =========================================================
       VISIBLE COURSES
    ========================================================= */

    const visibleCourses =
        useMemo(
            () => {
                const start =
                    (
                        currentPage -
                        1
                    ) *
                    COURSES_PER_PAGE;

                return courses.slice(
                    start,
                    start +
                        COURSES_PER_PAGE
                );
            },
            [
                courses,
                currentPage,
            ]
        );

    /* =========================================================
       PAGE CHANGE
    ========================================================= */

    function handlePageChange(
        page
    ) {
        if (
            page < 1 ||
            page >
                totalPages ||
            page ===
                currentPage
        ) {
            return;
        }

        setCurrentPage(
            page
        );

        if (
            typeof window !==
            "undefined"
        ) {
            window.requestAnimationFrame(
                () => {
                    document
                        .getElementById(
                            "university-course-list"
                        )
                        ?.scrollIntoView({
                            behavior:
                                "smooth",

                            block:
                                "start",
                        });
                }
            );
        }
    }

    /* =========================================================
       ERROR
    ========================================================= */

    if (
        error &&
        courses.length ===
            0
    ) {
        return (
            <div
                className="
                    rounded-[24px]
                    border
                    border-red-100
                    bg-white
                    p-8
                    text-center
                    shadow-sm
                "
            >
                <p className="text-sm font-bold text-red-600">
                    {
                        error
                    }
                </p>
            </div>
        );
    }

    /* =========================================================
       LOADING
    ========================================================= */

    if (
        loading &&
        courses.length ===
            0
    ) {
        return (
            <UniversityCoursesLoading />
        );
    }

    /* =========================================================
       EMPTY
    ========================================================= */

    if (
        !loading &&
        courses.length ===
            0
    ) {
        return (
            <UniversityCoursesEmpty />
        );
    }

    /* =========================================================
       RESULTS
    ========================================================= */

    const firstVisible =
        (
            currentPage -
            1
        ) *
            COURSES_PER_PAGE +
        1;

    const lastVisible =
        Math.min(
            currentPage *
                COURSES_PER_PAGE,
            courses.length
        );

    return (
        <div className="min-w-0">
            {/* =============================================
                TOP INFO
            ============================================= */}

            <div
                className="
                    mb-4
                    flex
                    flex-col
                    gap-2

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >
                <p className="text-xs font-semibold text-slate-500 sm:text-sm">
                    Showing{" "}
                    <strong className="text-darkPrimary">
                        {
                            firstVisible
                        }
                    </strong>
                    {" – "}
                    <strong className="text-darkPrimary">
                        {
                            lastVisible
                        }
                    </strong>{" "}
                    of{" "}
                    <strong className="text-darkPrimary">
                        {
                            courses.length
                        }
                    </strong>{" "}
                    courses
                </p>

                {totalPages >
                    1 && (
                    <span
                        className="
                            w-fit
                            rounded-full
                            bg-secondary/10
                            px-3
                            py-1.5
                            text-[10px]
                            font-black
                            text-secondary

                            sm:text-xs
                        "
                    >
                        Page{" "}
                        {
                            currentPage
                        }{" "}
                        of{" "}
                        {
                            totalPages
                        }
                    </span>
                )}
            </div>

            {/* =============================================
                UPDATE STATE
            ============================================= */}

            {loading && (
                <UniversityCoursesLoading
                    compact
                />
            )}

            {/* =============================================
                COURSE GRID

                < sm       = 1 card
                >= sm      = 2 cards
            ============================================= */}

            <div
                className="
                    grid
                    min-w-0
                    grid-cols-1
                    items-stretch
                    gap-4

                    sm:grid-cols-2
                    sm:gap-4

                    lg:gap-5
                "
            >
                {visibleCourses.map(
                    (
                        course,
                        index
                    ) => {
                        const key =
                            getCourseUniqueId(
                                course,
                                `${categoryId}-${currentPage}-${index}`
                            );

                        return (
                            <div
                                key={
                                    key
                                }
                                className="min-w-0"
                            >
                                <UniversityCourseCard
                                    course={
                                        course
                                    }
                                    universityName={
                                        universityName
                                    }
                                />
                            </div>
                        );
                    }
                )}
            </div>

            {/* =============================================
                PAGINATION
            ============================================= */}

            <UniversityCoursesPagination
                currentPage={
                    currentPage
                }
                totalPages={
                    totalPages
                }
                onPageChange={
                    handlePageChange
                }
            />
        </div>
    );
}