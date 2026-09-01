"use client";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import cn from "@/lib/cn";

export default function UniversityCoursesPagination({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
}) {
    if (totalPages <= 1) {
        return null;
    }

    const getVisiblePages = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (
                let page = 1;
                page <= totalPages;
                page++
            ) {
                pages.push(page);
            }

            return pages;
        }

        if (currentPage <= 4) {
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
                totalPages - 4,
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
    };

    const visiblePages =
        getVisiblePages();

    const goToPage = (page) => {
        if (
            page < 1 ||
            page > totalPages ||
            page === currentPage
        ) {
            return;
        }

        onPageChange?.(page);
    };

    return (
        <nav
            aria-label="Course pagination"
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
            {/* PREVIOUS */}

            <button
                type="button"
                onClick={() =>
                    goToPage(
                        currentPage - 1
                    )
                }
                disabled={
                    currentPage === 1
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
                    shadow-sm
                    transition

                    hover:border-primary/30
                    hover:text-primary

                    disabled:cursor-not-allowed
                    disabled:opacity-40
                    disabled:hover:border-slate-200
                    disabled:hover:text-slate-600
                "
            >
                <ChevronLeft
                    size={17}
                    aria-hidden="true"
                />

                Previous
            </button>

            {/* PAGE NUMBERS */}

            <div
                className="
                    flex
                    flex-wrap
                    items-center
                    justify-center
                    gap-2
                "
            >
                {visiblePages.map(
                    (
                        page,
                        index
                    ) => {
                        if (
                            page === "..."
                        ) {
                            return (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="
                                        grid
                                        size-10
                                        place-items-center
                                        text-sm
                                        font-bold
                                        text-slate-400
                                    "
                                >
                                    ...
                                </span>
                            );
                        }

                        const isActive =
                            page ===
                            currentPage;

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
                                aria-current={
                                    isActive
                                        ? "page"
                                        : undefined
                                }
                                className={cn(`
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
                                `)}
                            >
                                {page}
                            </button>
                        );
                    }
                )}
            </div>

            {/* NEXT */}

            <button
                type="button"
                onClick={() =>
                    goToPage(
                        currentPage + 1
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
                    size={17}
                    aria-hidden="true"
                />
            </button>
        </nav>
    );
}