"use client";

import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    BookOpen,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import UniversityCourseCard from "./courses-tab/UniversityCourseCard";
import UniversityMainCourseTabs from "./courses-tab/UniversityMainCourseTabs";

const COURSES_PER_PAGE = 6;

/* =========================================================
   COURSE CATEGORY HELPERS
========================================================= */

const getCourseCategoryId = (course) =>
    String(
        course?.c_id ??
            course?.main_course_id ??
            course?.maincourse_id ??
            course?.category_id ??
            "other"
    );

const getCourseCategoryName = (
    course,
    categoryId
) =>
    course?.name ||
    course?.main_course ||
    course?.maincourse ||
    course?.main_course_name ||
    course?.maincourse_name ||
    course?.category_name ||
    course?.course_category ||
    `Course Category ${categoryId}`;

/* =========================================================
   PAGE
========================================================= */

export default function UniversityCourses({
    universityId,
    universityName,
    countryId,
    courses = [],
}) {
    const courseListRef =
        useRef(null);

    /* =====================================================
       SAFE COURSES
    ===================================================== */

    const safeCourses =
        useMemo(() => {
            return Array.isArray(
                courses
            )
                ? courses.filter(
                      Boolean
                  )
                : [];
        }, [courses]);

    /* =====================================================
       GROUP COURSES BY MAIN COURSE
    ===================================================== */

    const groupedCourses =
        useMemo(() => {
            return safeCourses.reduce(
                (
                    groups,
                    course
                ) => {
                    const categoryId =
                        getCourseCategoryId(
                            course
                        );

                    const categoryName =
                        getCourseCategoryName(
                            course,
                            categoryId
                        );

                    if (
                        !groups[
                            categoryId
                        ]
                    ) {
                        groups[
                            categoryId
                        ] = {
                            id: categoryId,
                            name:
                                categoryName,
                            courses: [],
                        };
                    }

                    const currentName =
                        groups[
                            categoryId
                        ].name;

                    const fallbackName =
                        `Course Category ${categoryId}`;

                    const isFallbackName =
                        currentName ===
                        fallbackName;

                    const hasRealCategoryName =
                        categoryName &&
                        categoryName !==
                            fallbackName;

                    if (
                        isFallbackName &&
                        hasRealCategoryName
                    ) {
                        groups[
                            categoryId
                        ].name =
                            categoryName;
                    }

                    groups[
                        categoryId
                    ].courses.push(
                        course
                    );

                    return groups;
                },
                {}
            );
        }, [safeCourses]);

    /* =====================================================
       MAIN COURSE TABS
    ===================================================== */

    const mainCourses =
        useMemo(() => {
            return Object.values(
                groupedCourses
            );
        }, [groupedCourses]);

    const [
        selectedMainCourseId,
        setSelectedMainCourseId,
    ] = useState("");

    const [
        currentPage,
        setCurrentPage,
    ] = useState(1);

    const previousMainCoursesLengthRef =
        useRef(
            mainCourses.length
        );

    /* =====================================================
       KEEP SELECTED TAB VALID
    ===================================================== */

    useEffect(() => {
        if (
            mainCourses.length ===
            0
        ) {
            if (
                previousMainCoursesLengthRef.current !==
                0
            ) {
                previousMainCoursesLengthRef.current =
                    0;

                setSelectedMainCourseId(
                    ""
                );

                setCurrentPage(1);
            }

            return;
        }

        previousMainCoursesLengthRef.current =
            mainCourses.length;

        const selectedStillExists =
            mainCourses.some(
                (
                    mainCourse
                ) =>
                    String(
                        mainCourse.id
                    ) ===
                    String(
                        selectedMainCourseId
                    )
            );

        if (
            !selectedStillExists
        ) {
            setSelectedMainCourseId(
                String(
                    mainCourses[0]
                        .id
                )
            );

            setCurrentPage(1);
        }
    }, [
        mainCourses,
        selectedMainCourseId,
    ]);

    /* =====================================================
       SELECTED CATEGORY
    ===================================================== */

    const selectedMainCourse =
        useMemo(() => {
            return (
                mainCourses.find(
                    (
                        mainCourse
                    ) =>
                        String(
                            mainCourse.id
                        ) ===
                        String(
                            selectedMainCourseId
                        )
                ) || null
            );
        }, [
            mainCourses,
            selectedMainCourseId,
        ]);

    const selectedCourses =
        useMemo(() => {
            return (
                groupedCourses[
                    String(
                        selectedMainCourseId
                    )
                ]?.courses || []
            );
        }, [
            groupedCourses,
            selectedMainCourseId,
        ]);

    /* =====================================================
       PAGINATION
    ===================================================== */

    const totalCourses =
        selectedCourses.length;

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                totalCourses /
                    COURSES_PER_PAGE
            )
        );

    const startIndex =
        (currentPage - 1) *
        COURSES_PER_PAGE;

    const endIndex =
        Math.min(
            startIndex +
                COURSES_PER_PAGE,
            totalCourses
        );

    const visibleCourses =
        useMemo(() => {
            return selectedCourses.slice(
                startIndex,
                endIndex
            );
        }, [
            selectedCourses,
            startIndex,
            endIndex,
        ]);

    /* =====================================================
       SAFETY: PAGE STILL VALID
    ===================================================== */

    useEffect(() => {
        if (
            currentPage >
            totalPages
        ) {
            setCurrentPage(
                totalPages
            );
        }
    }, [
        currentPage,
        totalPages,
    ]);

    /* =====================================================
       TAB CHANGE
    ===================================================== */

    const handleTabChange = (
        mainCourseId
    ) => {
        setSelectedMainCourseId(
            String(
                mainCourseId
            )
        );

        setCurrentPage(1);

        requestAnimationFrame(
            () => {
                courseListRef.current?.scrollIntoView(
                    {
                        behavior:
                            "smooth",
                        block:
                            "start",
                    }
                );
            }
        );
    };

    /* =====================================================
       PAGE CHANGE
    ===================================================== */

    const handlePageChange = (
        page
    ) => {
        if (
            page < 1 ||
            page > totalPages ||
            page === currentPage
        ) {
            return;
        }

        setCurrentPage(page);

        requestAnimationFrame(
            () => {
                courseListRef.current?.scrollIntoView(
                    {
                        behavior:
                            "smooth",
                        block:
                            "start",
                    }
                );
            }
        );
    };

    /* =====================================================
       PAGE NUMBERS
    ===================================================== */

    const paginationItems =
        useMemo(() => {
            if (
                totalPages <= 7
            ) {
                return Array.from(
                    {
                        length:
                            totalPages,
                    },
                    (
                        _,
                        index
                    ) => index + 1
                );
            }

            if (
                currentPage <=
                4
            ) {
                return [
                    1,
                    2,
                    3,
                    4,
                    5,
                    "...",
                    totalPages,
                ];
            }

            if (
                currentPage >=
                totalPages - 3
            ) {
                return [
                    1,
                    "...",
                    totalPages -
                        4,
                    totalPages -
                        3,
                    totalPages -
                        2,
                    totalPages -
                        1,
                    totalPages,
                ];
            }

            return [
                1,
                "...",
                currentPage -
                    1,
                currentPage,
                currentPage +
                    1,
                "...",
                totalPages,
            ];
        }, [
            currentPage,
            totalPages,
        ]);

    /* =====================================================
       UI
    ===================================================== */

    return (
        <section
            id="courses-panel"
            role="tabpanel"
            aria-labelledby="courses-tab"
            className="
                mx-auto
                max-w-7xl
                px-4
                py-10
                sm:px-8
                lg:px-10
            "
        >
            {/* =================================================
                HEADER
            ================================================= */}

            <header className="mb-7">
                <p
                    className="
                        text-sm
                        font-black
                        uppercase
                        tracking-[0.14em]
                        text-secondary
                    "
                >
                    Available Courses
                </p>

                <h2
                    className="
                        mt-3
                        text-2xl
                        font-bold
                        text-[#081c47]
                        sm:text-3xl
                        md:text-4xl
                    "
                >
                    Courses at{" "}
                    <span className="text-primary">
                        {universityName ||
                            "University"}
                    </span>
                </h2>

                <p
                    className="
                        mt-3
                        max-w-2xl
                        text-sm
                        leading-7
                        text-slate-600
                        sm:text-base
                    "
                >
                    Select a main course
                    category to view its
                    corresponding courses.
                </p>
            </header>

            {mainCourses.length >
            0 ? (
                <>
                    {/* =================================================
                        MAIN COURSE TABS
                        KEEP HORIZONTAL SCROLL
                    ================================================= */}

                    <UniversityMainCourseTabs
                        courses={
                            mainCourses
                        }
                        selectedMainCourseId={
                            selectedMainCourseId
                        }
                        onSelectMainCourse={
                            handleTabChange
                        }
                    />

                    {/* =================================================
                        SELECTED CATEGORY HEADER
                    ================================================= */}

                    <div
                        ref={
                            courseListRef
                        }
                        className="
                            scroll-mt-28
                        "
                    >
                        {selectedCourses.length >
                        0 ? (
                            <>
                                <div
                                    className="
                                        mb-6
                                        flex
                                        flex-col
                                        gap-4
                                        sm:flex-row
                                        sm:items-end
                                        sm:justify-between
                                    "
                                >
                                    <div>
                                        <p
                                            className="
                                                text-xs
                                                font-black
                                                uppercase
                                                tracking-[0.16em]
                                                text-secondary
                                            "
                                        >
                                            Selected
                                            Category
                                        </p>

                                        <h3
                                            className="
                                                mt-1
                                                text-xl
                                                font-black
                                                text-darkPrimary
                                                sm:text-2xl
                                            "
                                        >
                                            {selectedMainCourse?.name ||
                                                "Courses"}
                                        </h3>
                                    </div>

                                    <div
                                        className="
                                            w-fit
                                            rounded-2xl
                                            border
                                            border-slate-200
                                            bg-white
                                            px-4
                                            py-3
                                            shadow-sm
                                        "
                                    >
                                        <p
                                            className="
                                                text-xs
                                                font-semibold
                                                text-slate-500
                                            "
                                        >
                                            Showing{" "}
                                            <span
                                                className="
                                                    font-black
                                                    text-darkPrimary
                                                "
                                            >
                                                {startIndex +
                                                    1}
                                            </span>
                                            {" - "}
                                            <span
                                                className="
                                                    font-black
                                                    text-darkPrimary
                                                "
                                            >
                                                {
                                                    endIndex
                                                }
                                            </span>
                                            {" of "}
                                            <span
                                                className="
                                                    font-black
                                                    text-primary
                                                "
                                            >
                                                {
                                                    totalCourses
                                                }
                                            </span>{" "}
                                            courses
                                        </p>
                                    </div>
                                </div>

                                {/* =================================================
                                    COURSE CARDS
                                ================================================= */}

                                <div
                                    id="university-course-list"
                                    className="
                                        grid
                                        gap-5
                                        md:grid-cols-2
                                    "
                                >
                                    {visibleCourses.map(
                                        (
                                            course,
                                            index
                                        ) => (
                                            <UniversityCourseCard
                                                key={
                                                    course?.id ||
                                                    course?.course_id ||
                                                    course?.uc_id ||
                                                    `${selectedMainCourseId}-${startIndex + index}`
                                                }
                                                course={
                                                    course
                                                }
                                                universityId={
                                                    universityId
                                                }
                                                universityName={
                                                    universityName
                                                }
                                                countryId={
                                                    countryId
                                                }
                                            />
                                        )
                                    )}
                                </div>

                                {/* =================================================
                                    PAGINATION
                                ================================================= */}

                                {totalPages >
                                    1 && (
                                    <nav
                                        aria-label="Course pagination"
                                        className="
                                            mt-10
                                            flex
                                            flex-col
                                            items-center
                                            justify-between
                                            gap-4
                                            rounded-[24px]
                                            border
                                            border-slate-200
                                            bg-white
                                            px-4
                                            py-4
                                            shadow-[0_12px_35px_rgba(15,23,42,0.06)]
                                            sm:flex-row
                                        "
                                    >
                                        {/* PREVIOUS */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handlePageChange(
                                                    currentPage -
                                                        1
                                                )
                                            }
                                            disabled={
                                                currentPage ===
                                                1
                                            }
                                            className="
                                                inline-flex
                                                h-11
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-xl
                                                border
                                                border-slate-200
                                                bg-white
                                                px-4
                                                text-sm
                                                font-black
                                                text-slate-600
                                                transition
                                                hover:border-primary/30
                                                hover:text-primary
                                                disabled:cursor-not-allowed
                                                disabled:opacity-40
                                            "
                                        >
                                            <ChevronLeft
                                                size={
                                                    17
                                                }
                                            />

                                            Previous
                                        </button>

                                        {/* NUMBERS */}

                                        <div
                                            className="
                                                flex
                                                flex-wrap
                                                items-center
                                                justify-center
                                                gap-2
                                            "
                                        >
                                            {paginationItems.map(
                                                (
                                                    item,
                                                    index
                                                ) => {
                                                    if (
                                                        item ===
                                                        "..."
                                                    ) {
                                                        return (
                                                            <span
                                                                key={`ellipsis-${index}`}
                                                                className="
                                                                    grid
                                                                    size-10
                                                                    place-items-center
                                                                    text-sm
                                                                    font-black
                                                                    text-slate-400
                                                                "
                                                            >
                                                                ...
                                                            </span>
                                                        );
                                                    }

                                                    const isActive =
                                                        item ===
                                                        currentPage;

                                                    return (
                                                        <button
                                                            key={
                                                                item
                                                            }
                                                            type="button"
                                                            onClick={() =>
                                                                handlePageChange(
                                                                    item
                                                                )
                                                            }
                                                            aria-current={
                                                                isActive
                                                                    ? "page"
                                                                    : undefined
                                                            }
                                                            className={`
                                                                grid
                                                                size-10
                                                                place-items-center
                                                                rounded-xl
                                                                text-sm
                                                                font-black
                                                                transition-all
                                                                duration-200

                                                                ${
                                                                    isActive
                                                                        ? `
                                                                            bg-gradient-to-br
                                                                            from-primary
                                                                            to-darkPrimary
                                                                            text-white
                                                                            shadow-lg
                                                                            shadow-primary/20
                                                                        `
                                                                        : `
                                                                            border
                                                                            border-slate-200
                                                                            bg-white
                                                                            text-slate-600
                                                                            hover:border-primary/30
                                                                            hover:bg-primary/[0.04]
                                                                            hover:text-primary
                                                                        `
                                                                }
                                                            `}
                                                        >
                                                            {
                                                                item
                                                            }
                                                        </button>
                                                    );
                                                }
                                            )}
                                        </div>

                                        {/* NEXT */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handlePageChange(
                                                    currentPage +
                                                        1
                                                )
                                            }
                                            disabled={
                                                currentPage ===
                                                totalPages
                                            }
                                            className="
                                                inline-flex
                                                h-11
                                                items-center
                                                justify-center
                                                gap-2
                                                rounded-xl
                                                bg-gradient-to-r
                                                from-darkPrimary
                                                to-primary
                                                px-5
                                                text-sm
                                                font-black
                                                text-white
                                                shadow-lg
                                                shadow-primary/20
                                                transition
                                                hover:-translate-y-0.5
                                                hover:shadow-xl
                                                disabled:cursor-not-allowed
                                                disabled:opacity-40
                                                disabled:hover:translate-y-0
                                            "
                                        >
                                            Next

                                            <ChevronRight
                                                size={
                                                    17
                                                }
                                            />
                                        </button>
                                    </nav>
                                )}
                            </>
                        ) : (
                            <EmptyCourses
                                title="No courses found"
                                message="No courses are available under this category."
                            />
                        )}
                    </div>
                </>
            ) : (
                <EmptyCourses
                    title="No courses available"
                    message="This university currently has no course information."
                />
            )}
        </section>
    );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyCourses({
    title,
    message,
}) {
    return (
        <div
            className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-10
                text-center
                shadow-lg
                shadow-slate-900/5
            "
        >
            <div
                className="
                    mx-auto
                    grid
                    size-16
                    place-items-center
                    rounded-full
                    bg-primary/10
                    text-primary
                "
            >
                <BookOpen
                    className="size-8"
                    aria-hidden="true"
                />
            </div>

            <h3
                className="
                    mt-5
                    text-xl
                    font-black
                    text-darkPrimary
                "
            >
                {title}
            </h3>

            <p
                className="
                    mx-auto
                    mt-2
                    max-w-lg
                    text-slate-500
                "
            >
                {message}
            </p>
        </div>
    );
}