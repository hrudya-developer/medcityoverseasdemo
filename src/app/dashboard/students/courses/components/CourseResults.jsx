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

import CourseCard from "./CourseCard";

export default function CourseResults({
  courses = [],
  loading,
  error,
  keyword,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const resultsRef = useRef(null);

  /* =========================================================
     RESPONSIVE PAGE SIZE
     < lg  = 2 cards
     lg+   = 4 cards
     ========================================================= */
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 1024px)"
    );

    const updateItemsPerPage = (event) => {
      setItemsPerPage(event.matches ? 4 : 2);
    };

    // Initial value
    setItemsPerPage(mediaQuery.matches ? 4 : 2);

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

  /* =========================================================
     RESET PAGE WHEN RESULT SET CHANGES
     ========================================================= */
  useEffect(() => {
    setCurrentPage(1);
  }, [courses, keyword]);

  /* =========================================================
     PAGINATION VALUES
     ========================================================= */
  const totalCourses = courses.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalCourses / itemsPerPage)
  );

  /* Prevent invalid page after resizing */
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedCourses = useMemo(() => {
    const startIndex =
      (currentPage - 1) * itemsPerPage;

    const endIndex = startIndex + itemsPerPage;

    return courses.slice(startIndex, endIndex);
  }, [courses, currentPage, itemsPerPage]);

  const startResult =
    totalCourses === 0
      ? 0
      : (currentPage - 1) * itemsPerPage + 1;

  const endResult = Math.min(
    currentPage * itemsPerPage,
    totalCourses
  );

  /* =========================================================
     PAGE CHANGE
     ========================================================= */
  const goToPage = (page) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    setCurrentPage(page);

    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  /* =========================================================
     PAGE NUMBERS
     ========================================================= */
  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }, [currentPage, totalPages]);

  return (
    <main
      ref={resultsRef}
      className="min-w-0 scroll-mt-24"
    >
      {/* =====================================================
          HEADER
          ===================================================== */}
      <div className="mb-5 flex items-end justify-between gap-3">
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

        {!loading && totalCourses > 0 && (
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
              {totalCourses}
            </span>{" "}
            found
          </div>
        )}
      </div>

      {/* =====================================================
          LOADING
          ===================================================== */}
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

            sm:rounded-[28px]
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
            Searching courses...
          </p>
        </div>
      ) : error ? (
        /* ===================================================
           ERROR
           =================================================== */
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

            sm:rounded-[28px]
          "
        >
          Unable to search courses.
        </div>
      ) : totalCourses > 0 ? (
        <>
          {/* =================================================
              COURSE CARDS
              ================================================= */}
          <div
            className="
              grid
              grid-cols-1 md:grid-cols-2 lg:grid-cols-2
              gap-4

              xl:grid-cols-2
              xl:gap-5
            "
          >
            {paginatedCourses.map(
              (course, index) => (
                <CourseCard
                  key={
                    course?.id ||
                    course?.course_id ||
                    course?.uc_id ||
                    `${(currentPage - 1) *
                    itemsPerPage +
                    index
                    }`
                  }
                  course={course}
                />
              )
            )}
          </div>

          {/* =================================================
              PAGINATION
              ================================================= */}
          {totalPages > 1 && (
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
              {/* Pagination information */}
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
                      {startResult}
                    </span>
                    {" – "}
                    <span className="text-[#c01f53]">
                      {endResult}
                    </span>{" "}
                    of {totalCourses} courses
                  </p>

                  <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                    Page {currentPage} of {totalPages}
                  </p>
                </div>

                {/* Controls */}
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
                      goToPage(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className="
                      grid
                      h-9
                      w-9
                      shrink-0
                      place-items-center
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-slate-600
                      transition-all
                      duration-200

                      hover:border-[#c01f53]/30
                      hover:bg-[#c01f53]/5
                      hover:text-[#c01f53]

                      disabled:cursor-not-allowed
                      disabled:opacity-35
                      disabled:hover:border-slate-200
                      disabled:hover:bg-white
                      disabled:hover:text-slate-600
                    "
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {pageNumbers.map(
                      (page, index) => {
                        if (page === "...") {
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
                          currentPage === page;

                        return (
                          <button
                            key={page}
                            type="button"
                            onClick={() =>
                              goToPage(page)
                            }
                            aria-current={
                              active
                                ? "page"
                                : undefined
                            }
                            className={`
                              h-9
                              min-w-9
                              rounded-xl
                              px-2
                              text-xs
                              font-extrabold
                              transition-all
                              duration-200

                              ${active
                                ? `
                                    bg-[#c01f53]
                                    text-white
                                    shadow-md
                                    shadow-[#c01f53]/20
                                  `
                                : `
                                    border
                                    border-slate-200
                                    bg-white
                                    text-slate-600

                                    hover:border-[#c01f53]/30
                                    hover:bg-[#c01f53]/5
                                    hover:text-[#c01f53]
                                  `
                              }
                            `}
                          >
                            {page}
                          </button>
                        );
                      }
                    )}
                  </div>

                  {/* Next */}
                  <button
                    type="button"
                    onClick={() =>
                      goToPage(currentPage + 1)
                    }
                    disabled={
                      currentPage === totalPages
                    }
                    aria-label="Next page"
                    className="
                      grid
                      h-9
                      w-9
                      shrink-0
                      place-items-center
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-slate-600
                      transition-all
                      duration-200

                      hover:border-[#c01f53]/30
                      hover:bg-[#c01f53]/5
                      hover:text-[#c01f53]

                      disabled:cursor-not-allowed
                      disabled:opacity-35
                      disabled:hover:border-slate-200
                      disabled:hover:bg-white
                      disabled:hover:text-slate-600
                    "
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Progress */}
              <div className="h-1 w-full bg-slate-100">
                <div
                  className="
                    h-full
                    bg-[#c01f53]
                    transition-all
                    duration-300
                  "
                  style={{
                    width: `${(currentPage / totalPages) * 100
                      }%`,
                  }}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        /* ===================================================
           EMPTY STATE
           =================================================== */
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

            sm:rounded-[28px]
            sm:p-14
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
            <BookOpen size={25} />
          </div>

          <h3 className="mt-5 text-lg font-black text-slate-900 sm:text-xl">
            No courses found
          </h3>

          <p
            className="
              mx-auto
              mt-2
              max-w-sm
              text-sm
              leading-6
              text-slate-500
            "
          >
            Try changing your filters or search
            keyword to discover more courses.
          </p>
        </div>
      )}
    </main>
  );
}