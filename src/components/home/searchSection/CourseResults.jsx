"use client";

import { useMemo } from "react";

import CourseResultsGrid from "./CourseResultsGrid";
import CoursePagination from "./CoursePagination";

import {
    EmptyState,
    ErrorState,
    LoadingState,
} from "./ResultsState";

import {
    COURSES_PER_PAGE,
} from "./utils/courseHelpers";

export default function CourseResults({
    courses = [],
    currentPage,
    setCurrentPage,
    nextOffset,
    isFetching,
    error,
    hasSearched,
    onLoadMore,
    onRetry,
    compact = false,
}) {
    const totalPages = Math.max(
        1,
        Math.ceil(
            courses.length / COURSES_PER_PAGE
        )
    );

    const visibleCourses = useMemo(() => {
        const start =
            (currentPage - 1) *
            COURSES_PER_PAGE;

        return courses.slice(
            start,
            start + COURSES_PER_PAGE
        );
    }, [courses, currentPage]);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) {
            return;
        }

        setCurrentPage(page);
    };

    const handleNext = async () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            return;
        }

        if (!nextOffset || isFetching) {
            return;
        }

        const previousTotalPages = totalPages;

        const newCourses = await onLoadMore({
            offset: nextOffset,
            append: true,
        });

        if (newCourses.length > 0) {
            setCurrentPage(
                previousTotalPages + 1
            );
        }
    };

    if (
        isFetching &&
        courses.length === 0
    ) {
        return <LoadingState />;
    }

    if (
        error &&
        courses.length === 0
    ) {
        return (
            <ErrorState
                isFetching={isFetching}
                onRetry={onRetry}
            />
        );
    }

    if (
        hasSearched &&
        !isFetching &&
        !error &&
        courses.length === 0
    ) {
        return <EmptyState />;
    }

    if (!courses.length) {
        return null;
    }

    return (
        <div>
            <div
                className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
                <p className="text-sm text-slate-600">
                    Showing{" "}
                    <strong className="text-primary">
                        {(currentPage - 1) *
                            COURSES_PER_PAGE +
                            1}
                        –
                        {Math.min(
                            currentPage *
                            COURSES_PER_PAGE,
                            courses.length
                        )}
                    </strong>{" "}
                    of{" "}
                    <strong className="text-darkPrimary">
                        {courses.length}
                    </strong>{" "}
                    loaded courses
                </p>

                <span
                    className="w-fit rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600"
                >
                    Page {currentPage} of{" "}
                    {totalPages}
                </span>
            </div>

            <CourseResultsGrid
                courses={visibleCourses}
                currentPage={currentPage}
                coursesPerPage={
                    COURSES_PER_PAGE
                }
                compact={compact}
            />

            <CoursePagination
                currentPage={currentPage}
                totalPages={totalPages}
                hasNextApiPage={Boolean(
                    nextOffset
                )}
                isFetching={isFetching}
                onPrevious={() =>
                    handlePageChange(
                        currentPage - 1
                    )
                }
                onNext={handleNext}
                onPageChange={
                    handlePageChange
                }
            />
        </div>
    );
}