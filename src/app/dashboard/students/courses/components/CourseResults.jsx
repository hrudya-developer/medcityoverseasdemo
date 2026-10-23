"use client";

import {
    BookOpen,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import Swal from "sweetalert2";

import CourseCard from "./CourseCard";

import {
    addCourseToWishlist,
    getWishlistedCourses,
    removeCourseFromWishlist,
} from "../services/wishlistActions";


/* =========================================================
   COURSE ID
   ========================================================= */

/*
 * IMPORTANT:
 *
 * For your course-search API,
 * the main course record is `id`.
 *
 * Use the same priority everywhere:
 *
 * id
 * course_id
 * uc_id
 * c_id
 */

function getCourseId(course) {
    return (
        course?.id ??
        course?.course_id ??
        course?.uc_id ??
        course?.c_id ??
        null
    );
}


/* =========================================================
   WISHLIST COURSE ID
   ========================================================= */

function extractWishlistCourseId(item) {
    return (
        item?.id ??
        item?.course_id ??
        item?.uc_id ??
        item?.c_id ??
        item?.course?.id ??
        item?.course?.course_id ??
        item?.course?.uc_id ??
        item?.course?.c_id ??
        null
    );
}


/* =========================================================
   COMPONENT
   ========================================================= */

export default function CourseResults({
    courses = [],
    loading = false,
    error = "",
    keyword = "",
}) {
    const [
        currentPage,
        setCurrentPage,
    ] = useState(1);

    const [
        itemsPerPage,
        setItemsPerPage,
    ] = useState(2);

    const [
        wishlistedIds,
        setWishlistedIds,
    ] = useState(
        () => new Set()
    );

    const [
        wishlistLoadingId,
        setWishlistLoadingId,
    ] = useState(null);

    const [
        wishlistLoaded,
        setWishlistLoaded,
    ] = useState(false);

    const resultsRef =
        useRef(null);


    /* =====================================================
       RESPONSIVE PAGINATION
       ===================================================== */

    useEffect(() => {
        const mediaQuery =
            window.matchMedia(
                "(min-width: 1024px)"
            );


        function updateItemsPerPage(
            event
        ) {
            setItemsPerPage(
                event.matches
                    ? 4
                    : 2
            );
        }


        setItemsPerPage(
            mediaQuery.matches
                ? 4
                : 2
        );


        mediaQuery.addEventListener(
            "change",
            updateItemsPerPage
        );


        return () => {
            mediaQuery.removeEventListener(
                "change",
                updateItemsPerPage
            );
        };
    }, []);


    /* =====================================================
       LOAD WISHLIST
       ===================================================== */

    useEffect(() => {
        let cancelled =
            false;


        async function loadWishlist() {
            try {
                const data =
                    await getWishlistedCourses();


                if (cancelled) {
                    return;
                }


                console.log(
                    "COURSE RESULTS WISHLIST:",
                    data
                );


                const ids =
                    new Set(
                        (
                            Array.isArray(data)
                                ? data
                                : []
                        )
                            .map(
                                extractWishlistCourseId
                            )
                            .filter(
                                (id) =>
                                    id !==
                                        null &&
                                    id !==
                                        undefined &&
                                    String(
                                        id
                                    ).trim() !==
                                        ""
                            )
                            .map(
                                String
                            )
                    );


                console.log(
                    "COURSE RESULTS WISHLIST IDS:",
                    Array.from(
                        ids
                    )
                );


                setWishlistedIds(
                    ids
                );

            } catch (error) {
                /*
                 * Wishlist failure should
                 * never stop the course
                 * search results.
                 */

                console.error(
                    "Wishlist load failed:",
                    error
                );

            } finally {
                if (
                    !cancelled
                ) {
                    setWishlistLoaded(
                        true
                    );
                }
            }
        }


        loadWishlist();


        return () => {
            cancelled =
                true;
        };
    }, []);


    /* =====================================================
       RESET PAGINATION
       ===================================================== */

    useEffect(() => {
        setCurrentPage(
            1
        );
    }, [
        courses,
        keyword,
    ]);


    /* =====================================================
       TOTALS
       ===================================================== */

    const safeCourses =
        Array.isArray(
            courses
        )
            ? courses
            : [];


    const totalCourses =
        safeCourses.length;


    const totalPages =
        Math.max(
            1,

            Math.ceil(
                totalCourses /
                    itemsPerPage
            )
        );


    /* =====================================================
       KEEP CURRENT PAGE VALID
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
       CURRENT PAGE COURSES
       ===================================================== */

    const paginatedCourses =
        useMemo(
            () => {
                const startIndex =
                    (currentPage -
                        1) *
                    itemsPerPage;


                const endIndex =
                    startIndex +
                    itemsPerPage;


                return safeCourses.slice(
                    startIndex,
                    endIndex
                );
            },
            [
                safeCourses,
                currentPage,
                itemsPerPage,
            ]
        );


    const startResult =
        totalCourses ===
        0
            ? 0
            : (currentPage -
                  1) *
                  itemsPerPage +
              1;


    const endResult =
        Math.min(
            currentPage *
                itemsPerPage,

            totalCourses
        );


    /* =====================================================
       WISHLIST
       ===================================================== */

    async function handleWishlist({
        courseId,
    }) {
        if (
            courseId === null ||
            courseId ===
                undefined ||
            String(
                courseId
            ).trim() === ""
        ) {
            await Swal.fire({
                icon:
                    "error",

                title:
                    "Unable to Update Wishlist",

                text:
                    "Course ID is missing.",

                confirmButtonColor:
                    "#c01f53",
            });

            return;
        }


        const key =
            String(
                courseId
            );


        /*
         * Prevent double click while
         * add/remove request is active.
         */

        if (
            wishlistLoadingId ===
            key
        ) {
            return;
        }


        const alreadyWishlisted =
            wishlistedIds.has(
                key
            );


        try {
            setWishlistLoadingId(
                key
            );


            /* =============================================
               REMOVE
               ============================================= */

            if (
                alreadyWishlisted
            ) {
                const confirmation =
                    await Swal.fire({
                        icon:
                            "warning",

                        title:
                            "Remove from Wishlist?",

                        text:
                            "This course will be removed from your saved courses.",

                        showCancelButton:
                            true,

                        confirmButtonText:
                            "Remove",

                        cancelButtonText:
                            "Cancel",

                        confirmButtonColor:
                            "#c01f53",

                        cancelButtonColor:
                            "#64748b",
                    });


                if (
                    !confirmation
                        .isConfirmed
                ) {
                    return;
                }


                const result =
                    await removeCourseFromWishlist(
                        courseId
                    );


                console.log(
                    "COURSE RESULTS REMOVE WISHLIST:",
                    result
                );


                /*
                 * Immediately change
                 * filled heart -> empty heart.
                 */

                setWishlistedIds(
                    (previous) => {
                        const next =
                            new Set(
                                previous
                            );

                        next.delete(
                            key
                        );

                        return next;
                    }
                );


                /*
                 * Tell StudentShell / Sidebar
                 * to refresh wishlist count.
                 */

                window.dispatchEvent(
                    new CustomEvent(
                        "studentWishlistUpdated",
                        {
                            detail: {
                                action:
                                    "removed",

                                courseId:
                                    key,
                            },
                        }
                    )
                );


                await Swal.fire({
                    icon:
                        "success",

                    title:
                        "Removed",

                    text:
                        result?.msg ||
                        result?.message ||
                        "Course removed from your wishlist.",

                    confirmButtonColor:
                        "#c01f53",
                });


                return;
            }


            /* =============================================
               ADD
               ============================================= */

            const result =
                await addCourseToWishlist(
                    courseId
                );


            console.log(
                "COURSE RESULTS ADD WISHLIST:",
                result
            );


            /*
             * Immediately change
             * empty heart -> filled heart.
             */

            setWishlistedIds(
                (previous) => {
                    const next =
                        new Set(
                            previous
                        );

                    next.add(
                        key
                    );

                    return next;
                }
            );


            /*
             * Tell StudentShell / Sidebar
             * to refresh wishlist count.
             */

            window.dispatchEvent(
                new CustomEvent(
                    "studentWishlistUpdated",
                    {
                        detail: {
                            action:
                                "added",

                            courseId:
                                key,
                        },
                    }
                )
            );


            await Swal.fire({
                icon:
                    "success",

                title:
                    "Added to Wishlist",

                text:
                    result?.msg ||
                    result?.message ||
                    "Course added to your wishlist.",

                confirmButtonColor:
                    "#c01f53",
            });

        } catch (error) {
            console.error(
                "Wishlist update failed:",
                error
            );


            await Swal.fire({
                icon:
                    "error",

                title:
                    alreadyWishlisted
                        ? "Remove Failed"
                        : "Wishlist Failed",

                text:
                    error instanceof
                    Error
                        ? error.message
                        : alreadyWishlisted
                        ? "Unable to remove this course from your wishlist."
                        : "Unable to add this course to your wishlist.",

                confirmButtonColor:
                    "#c01f53",
            });

        } finally {
            setWishlistLoadingId(
                null
            );
        }
    }


    /* =====================================================
       PAGE CHANGE
       ===================================================== */

    function goToPage(
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


        requestAnimationFrame(
            () => {
                resultsRef.current
                    ?.scrollIntoView({
                        behavior:
                            "smooth",

                        block:
                            "start",
                    });
            }
        );
    }


    /* =====================================================
       PAGE NUMBERS
       ===================================================== */

    const pageNumbers =
        useMemo(
            () => {
                if (
                    totalPages <=
                    5
                ) {
                    return Array.from(
                        {
                            length:
                                totalPages,
                        },

                        (
                            _,
                            index
                        ) =>
                            index +
                            1
                    );
                }


                if (
                    currentPage <=
                    3
                ) {
                    return [
                        1,
                        2,
                        3,
                        4,
                        "...",
                        totalPages,
                    ];
                }


                if (
                    currentPage >=
                    totalPages -
                        2
                ) {
                    return [
                        1,
                        "...",
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
            },
            [
                currentPage,
                totalPages,
            ]
        );


    /* =====================================================
       UI
       ===================================================== */

    return (
        <main
            ref={
                resultsRef
            }
            className="
                min-w-0
                scroll-mt-24
            "
        >
            {/* =============================================
                HEADER
                ============================================= */}

            <div
                className="
                    mb-5
                    flex
                    items-end
                    justify-between
                    gap-3
                "
            >
                <div className="min-w-0">
                    <p
                        className="
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.14em]
                            text-[#c01f53]

                            sm:text-xs
                        "
                    >
                        Search Results
                    </p>


                    <h2
                        className="
                            mt-1
                            truncate
                            text-xl
                            font-black
                            text-slate-950

                            sm:text-2xl
                        "
                    >
                        {keyword
                            ? `Results for "${keyword}"`
                            : "Available Courses"}
                    </h2>
                </div>


                {!loading &&
                    totalCourses >
                        0 && (
                        <div
                            className="
                                shrink-0
                                rounded-full
                                border
                                border-slate-200
                                bg-white
                                px-3
                                py-1.5
                                text-[10px]
                                font-extrabold
                                text-slate-500
                                shadow-sm

                                sm:px-4
                                sm:py-2
                                sm:text-xs
                            "
                        >
                            <span className="text-[#c01f53]">
                                {
                                    totalCourses
                                }
                            </span>{" "}
                            found
                        </div>
                    )}
            </div>


            {/* =============================================
                LOADING
                ============================================= */}

            {loading ? (
                <div
                    className="
                        rounded-[24px]
                        border
                        border-slate-100
                        bg-white

                        px-5
                        py-14

                        text-center
                        shadow-sm
                    "
                >
                    <div
                        className="
                            mx-auto
                            h-9
                            w-9
                            animate-spin
                            rounded-full

                            border-4
                            border-slate-200
                            border-t-[#c01f53]
                        "
                    />


                    <p className="mt-4 text-sm font-bold text-slate-500">
                        Searching
                        courses...
                    </p>
                </div>

            ) : error ? (
                /* =========================================
                   ERROR
                   ========================================= */

                <div
                    className="
                        rounded-[24px]
                        border
                        border-red-100
                        bg-red-50

                        px-5
                        py-14

                        text-center
                        text-sm
                        font-bold
                        text-red-500
                    "
                >
                    {error ||
                        "Unable to search courses."}
                </div>

            ) : totalCourses >
              0 ? (
                <>
                    {/* =====================================
                        COURSE CARDS
                        ===================================== */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-4

                            md:grid-cols-2

                            xl:gap-5
                        "
                    >
                        {paginatedCourses.map(
                            (
                                course,
                                index
                            ) => {
                                const courseId =
                                    getCourseId(
                                        course
                                    );


                                const wishlistKey =
                                    courseId ===
                                        null ||
                                    courseId ===
                                        undefined
                                        ? ""
                                        : String(
                                              courseId
                                          );


                                const wishlisted =
                                    wishlistKey
                                        ? wishlistedIds.has(
                                              wishlistKey
                                          )
                                        : false;


                                return (
                                    <CourseCard
                                        key={
                                            courseId ??
                                            `${
                                                (currentPage -
                                                    1) *
                                                    itemsPerPage +
                                                index
                                            }`
                                        }

                                        course={
                                            course
                                        }

                                        wishlisted={
                                            wishlisted
                                        }

                                        wishlistLoading={
                                            wishlistLoadingId ===
                                            wishlistKey
                                        }

                                        wishlistReady={
                                            wishlistLoaded
                                        }

                                        onWishlist={
                                            handleWishlist
                                        }
                                    />
                                );
                            }
                        )}
                    </div>


                    {/* =====================================
                        PAGINATION
                        ===================================== */}

                    {totalPages >
                        1 && (
                        <div
                            className="
                                mt-7
                                overflow-hidden
                                rounded-[22px]
                                border
                                border-slate-200/80
                                bg-white
                                shadow-sm

                                sm:rounded-[24px]
                            "
                        >
                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-3

                                    px-4
                                    py-3.5

                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                    sm:px-5
                                "
                            >
                                <div>
                                    <p className="text-xs font-bold text-slate-700">
                                        Showing{" "}

                                        <span className="text-[#c01f53]">
                                            {
                                                startResult
                                            }
                                        </span>

                                        {" – "}

                                        <span className="text-[#c01f53]">
                                            {
                                                endResult
                                            }
                                        </span>

                                        {" "}of{" "}

                                        {
                                            totalCourses
                                        }{" "}
                                        courses
                                    </p>


                                    <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                                        Page{" "}
                                        {
                                            currentPage
                                        }{" "}
                                        of{" "}
                                        {
                                            totalPages
                                        }
                                    </p>
                                </div>


                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-1.5

                                        sm:justify-end
                                    "
                                >
                                    {/* Previous */}

                                    <button
                                        type="button"

                                        onClick={() =>
                                            goToPage(
                                                currentPage -
                                                    1
                                            )
                                        }

                                        disabled={
                                            currentPage ===
                                            1
                                        }

                                        aria-label="Previous page"

                                        className="
                                            grid
                                            h-9
                                            w-9
                                            place-items-center

                                            rounded-xl

                                            border
                                            border-slate-200

                                            bg-white
                                            text-slate-600

                                            transition

                                            hover:border-[#c01f53]/30
                                            hover:text-[#c01f53]

                                            disabled:cursor-not-allowed
                                            disabled:opacity-35
                                        "
                                    >
                                        <ChevronLeft
                                            size={
                                                16
                                            }
                                        />
                                    </button>


                                    {/* Numbers */}

                                    <div className="flex items-center gap-1">
                                        {pageNumbers.map(
                                            (
                                                page,
                                                index
                                            ) => {
                                                if (
                                                    page ===
                                                    "..."
                                                ) {
                                                    return (
                                                        <span
                                                            key={`ellipsis-${index}`}
                                                            className="
                                                                flex
                                                                h-9
                                                                min-w-6
                                                                items-center
                                                                justify-center

                                                                text-xs
                                                                font-bold
                                                                text-slate-400
                                                            "
                                                        >
                                                            ···
                                                        </span>
                                                    );
                                                }


                                                const active =
                                                    currentPage ===
                                                    page;


                                                return (
                                                    <button
                                                        key={
                                                            page
                                                        }

                                                        type="button"

                                                        onClick={() =>
                                                            goToPage(
                                                                page
                                                            )
                                                        }

                                                        className={`
                                                            h-9
                                                            min-w-9

                                                            rounded-xl

                                                            px-2

                                                            text-xs
                                                            font-extrabold

                                                            transition

                                                            ${
                                                                active
                                                                    ? `
                                                                        bg-[#c01f53]
                                                                        text-white
                                                                        shadow-[0_6px_16px_rgba(192,31,83,0.22)]
                                                                    `
                                                                    : `
                                                                        border
                                                                        border-slate-200
                                                                        bg-white
                                                                        text-slate-600

                                                                        hover:border-[#c01f53]/30
                                                                        hover:text-[#c01f53]
                                                                    `
                                                            }
                                                        `}
                                                    >
                                                        {
                                                            page
                                                        }
                                                    </button>
                                                );
                                            }
                                        )}
                                    </div>


                                    {/* Next */}

                                    <button
                                        type="button"

                                        onClick={() =>
                                            goToPage(
                                                currentPage +
                                                    1
                                            )
                                        }

                                        disabled={
                                            currentPage ===
                                            totalPages
                                        }

                                        aria-label="Next page"

                                        className="
                                            grid
                                            h-9
                                            w-9
                                            place-items-center

                                            rounded-xl

                                            border
                                            border-slate-200

                                            bg-white
                                            text-slate-600

                                            transition

                                            hover:border-[#c01f53]/30
                                            hover:text-[#c01f53]

                                            disabled:cursor-not-allowed
                                            disabled:opacity-35
                                        "
                                    >
                                        <ChevronRight
                                            size={
                                                16
                                            }
                                        />
                                    </button>
                                </div>
                            </div>


                            {/* Pagination progress */}

                            <div className="h-1 w-full bg-slate-100">
                                <div
                                    className="
                                        h-full
                                        bg-[#c01f53]
                                        transition-all
                                        duration-300
                                    "
                                    style={{
                                        width:
                                            `${
                                                (currentPage /
                                                    totalPages) *
                                                100
                                            }%`,
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </>

            ) : (
                /* =========================================
                   EMPTY
                   ========================================= */

                <div
                    className="
                        rounded-[24px]
                        border
                        border-dashed
                        border-slate-300
                        bg-white

                        px-5
                        py-12

                        text-center
                    "
                >
                    <div
                        className="
                            mx-auto
                            grid
                            h-14
                            w-14
                            place-items-center
                            rounded-2xl
                            bg-[#c01f53]/10
                            text-[#c01f53]
                        "
                    >
                        <BookOpen
                            size={
                                25
                            }
                        />
                    </div>


                    <h3 className="mt-5 text-lg font-black text-slate-900">
                        No courses found
                    </h3>


                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                        Try changing
                        your filters or
                        search keyword
                        to discover more
                        courses.
                    </p>
                </div>
            )}
        </main>
    );
}