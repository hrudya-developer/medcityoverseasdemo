"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Loader2,
} from "lucide-react";

import {
    useLazySearchCoursesQuery,
} from "@/lib/services/searchApi";

import CoursePagination from "./components/CoursePagination";
import CourseResultsGrid from "./components/CourseResultsGrid";
import CourseResultsHeader from "./components/CourseResultsHeader";

import {
    EmptyState,
    ErrorState,
    LoadingState,
} from "./components/ResultsState";

import {
    COURSES_PER_PAGE,
    mergeUniqueCourses,
} from "./utils/courseHelpers";

export default function CourseSearchClient({
    initialCountryId = "",
    initialUniversityId = "",
    initialCourseId = "",
}) {
    const [courses, setCourses] = useState([]);
    const [nextOffset, setNextOffset] =
        useState(null);
    const [currentPage, setCurrentPage] =
        useState(1);
    const [hasSearched, setHasSearched] =
        useState(false);

    const [
        searchCourses,
        {
            isFetching,
            error,
            reset,
        },
    ] = useLazySearchCoursesQuery();

    const hasRequiredFilters = Boolean(
        initialCountryId &&
        initialUniversityId &&
        initialCourseId
    );

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

    const loadCourses = useCallback(
        async ({
            offset = "0",
            append = false,
        } = {}) => {
            if (!hasRequiredFilters) return [];

            try {
                const response =
                    await searchCourses({
                        countryId: initialCountryId,
                        universityId:
                            initialUniversityId,
                        courseId: initialCourseId,
                        offset,
                    }).unwrap();

                const newCourses = Array.isArray(
                    response?.courses
                )
                    ? response.courses
                    : [];

                setCourses((currentCourses) =>
                    append
                        ? mergeUniqueCourses(
                            currentCourses,
                            newCourses
                        )
                        : newCourses
                );

                setNextOffset(
                    response?.nextOffset
                        ? String(response.nextOffset)
                        : null
                );

                setHasSearched(true);

                return newCourses;
            } catch (requestError) {
                console.error(
                    "Course search failed:",
                    requestError
                );

                if (!append) {
                    setCourses([]);
                    setNextOffset(null);
                }

                setHasSearched(true);
                return [];
            }
        },
        [
            hasRequiredFilters,
            initialCountryId,
            initialUniversityId,
            initialCourseId,
            searchCourses,
        ]
    );

    useEffect(() => {
        reset();
        setCourses([]);
        setNextOffset(null);
        setCurrentPage(1);
        setHasSearched(false);

        if (hasRequiredFilters) {
            void loadCourses({
                offset: "0",
                append: false,
            });
        }
    }, [
        hasRequiredFilters,
        initialCountryId,
        initialUniversityId,
        initialCourseId,
        loadCourses,
        reset,
    ]);

    const changePage = (page) => {
        if (page < 1 || page > totalPages) return;

        setCurrentPage(page);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleNext = async () => {
        if (currentPage < totalPages) {
            changePage(currentPage + 1);
            return;
        }

        if (!nextOffset || isFetching) return;

        const previousTotalPages = totalPages;

        const newCourses = await loadCourses({
            offset: nextOffset,
            append: true,
        });

        if (newCourses.length) {
            setCurrentPage(
                previousTotalPages + 1
            );
        }
    };

    const handleRetry = () => {
        reset();
        setCurrentPage(1);

        void loadCourses({
            offset: "0",
            append: false,
        });
    };

    if (!hasRequiredFilters) {
        return null;
    }

    return (
        <main
            className="
        min-h-screen
        bg-gradient-to-b
        from-[#fff8fb]
        via-white
        to-[#f5f9ff]
      "
        >
            <CourseResultsHeader
                courseCount={courses.length}
                hasMore={Boolean(nextOffset)}
            />

            <section
                className="
          mx-auto max-w-7xl
          px-4 py-10
          sm:px-6 sm:py-12
          lg:px-8
        "
            >
                {isFetching &&
                    courses.length === 0 && (
                        <LoadingState />
                    )}

                {error &&
                    courses.length === 0 && (
                        <ErrorState
                            isFetching={isFetching}
                            onRetry={handleRetry}
                        />
                    )}

                {!isFetching &&
                    !error &&
                    hasSearched &&
                    courses.length === 0 && (
                        <EmptyState />
                    )}

                {courses.length > 0 && (
                    <>
                        <div
                            className="
                mb-7 flex flex-col gap-3
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
                        >
                            <p className="text-sm font-medium text-slate-600">
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
                                className="
                  w-fit rounded-full
                  bg-slate-100
                  px-4 py-2
                  text-xs font-bold
                  text-slate-600
                "
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
                        />

                        <CoursePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            hasNextApiPage={Boolean(
                                nextOffset
                            )}
                            isFetching={isFetching}
                            onPrevious={() =>
                                changePage(
                                    currentPage - 1
                                )
                            }
                            onNext={handleNext}
                            onPageChange={
                                changePage
                            }
                        />

                        {isFetching && (
                            <p
                                role="status"
                                className="
                  mt-6 flex
                  items-center
                  justify-center gap-2
                  text-sm font-semibold
                  text-slate-600
                "
                            >
                                <Loader2
                                    className="animate-spin"
                                    size={18}
                                />
                                Loading more courses...
                            </p>
                        )}
                    </>
                )}
            </section>
        </main>
    );
}