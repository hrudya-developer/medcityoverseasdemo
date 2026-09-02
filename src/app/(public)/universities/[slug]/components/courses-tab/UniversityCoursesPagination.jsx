"use client";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

function createPages(
    currentPage,
    totalPages
) {
    if (
        totalPages <= 5
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
                index + 1
        );
    }

    /*
     * Beginning.
     */

    if (
        currentPage <= 3
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

    /*
     * End.
     */

    if (
        currentPage >=
        totalPages - 2
    ) {
        return [
            1,
            "...",
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
    }

    /*
     * Middle.
     */

    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
    ];
}

export default function UniversityCoursesPagination({
    currentPage,
    totalPages,
    onPageChange,
}) {
    if (
        totalPages <= 1
    ) {
        return null;
    }

    const pages =
        createPages(
            currentPage,
            totalPages
        );

    return (
        <nav
            aria-label="Course pagination"
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
            {/* Previous */}

            <button
                type="button"
                disabled={
                    currentPage ===
                    1
                }
                onClick={() =>
                    onPageChange(
                        currentPage -
                            1
                    )
                }
                aria-label="Previous course page"
                className="
                    inline-flex
                    size-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    text-slate-600
                    transition

                    hover:border-primary
                    hover:text-primary

                    disabled:pointer-events-none
                    disabled:opacity-40
                "
            >
                <ChevronLeft className="size-5" />
            </button>

            {/* Pages */}

            {pages.map(
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
                                className="grid size-11 place-items-center text-sm font-bold text-slate-400"
                            >
                                …
                            </span>
                        );
                    }

                    const active =
                        page ===
                        currentPage;

                    return (
                        <button
                            key={
                                page
                            }
                            type="button"
                            aria-current={
                                active
                                    ? "page"
                                    : undefined
                            }
                            onClick={() =>
                                onPageChange(
                                    page
                                )
                            }
                            className={`
                                grid
                                size-11
                                place-items-center
                                rounded-xl
                                border
                                text-sm
                                font-black
                                transition

                                ${
                                    active
                                        ? "border-primary bg-primary text-white shadow-lg shadow-primary/15"
                                        : "border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary"
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

            {/* Next */}

            <button
                type="button"
                disabled={
                    currentPage ===
                    totalPages
                }
                onClick={() =>
                    onPageChange(
                        currentPage +
                            1
                    )
                }
                aria-label="Next course page"
                className="
                    inline-flex
                    size-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    text-slate-600
                    transition

                    hover:border-primary
                    hover:text-primary

                    disabled:pointer-events-none
                    disabled:opacity-40
                "
            >
                <ChevronRight className="size-5" />
            </button>
        </nav>
    );
}