"use client";

import {
    useEffect,
} from "react";

import {
    createPortal,
} from "react-dom";

import {
    ArrowRight,
    BookOpen,
    X,
} from "lucide-react";

import CourseResults from "./CourseResults";

export default function SearchResultsModal({
    open,
    onClose,
    courses,
    currentPage,
    setCurrentPage,
    nextOffset,
    isFetching,
    error,
    hasSearched,
    onLoadMore,
    onRetry,
    onViewAll,
    countryName,
    universityName,
    courseName,
}) {
    useEffect(() => {
        if (!open) return undefined;

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow =
            "hidden";

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            document.body.style.overflow =
                previousOverflow;

            window.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, [open, onClose]);

    if (
        !open ||
        typeof document === "undefined"
    ) {
        return null;
    }

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-results-modal-title"
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-5"
            onMouseDown={onClose}
        >
            <div
                className="relative flex max-h-[94vh] w-full max-w-[1450px] flex-col overflow-hidden rounded-[28px] bg-[#fffafb] shadow-[0_30px_100px_rgba(0,0,0,0.4)]"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                <header
                    className="relative shrink-0 overflow-hidden border-b border-slate-200 bg-white px-5 py-5 sm:px-8 sm:py-6"
                >
                    <div
                        aria-hidden="true"
                        className="absolute -right-20 -top-20 size-52 rounded-full bg-primary/10 blur-3xl"
                    />

                    <div
                        className="relative flex items-start justify-between gap-5"
                    >
                        <div
                            className="flex items-start gap-3"
                        >
                            <span
                                className="grid size-12 shrink-0 place-content-center rounded-2xl bg-primary/10 text-primary"
                            >
                                <BookOpen size={23} />
                            </span>

                            <div>
                                <p
                                    className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary"
                                >
                                    Search results
                                </p>

                                <h2
                                    id="course-results-modal-title"
                                    className="mt-1 text-xl font-black text-darkPrimary sm:text-2xl"
                                >
                                    {courseName ||
                                        "Matching Courses"}
                                </h2>

                                <p
                                    className="mt-2 text-xs font-medium text-slate-500 sm:text-sm"
                                >
                                    {universityName}

                                    {universityName &&
                                        countryName
                                        ? " • "
                                        : ""}

                                    {countryName}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            aria-label="Close search results"
                            onClick={onClose}
                            className="grid size-10 shrink-0 place-content-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-primary hover:text-white"
                        >
                            <X size={19} />
                        </button>
                    </div>
                </header>

                <div
                    className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8"
                >
                    <CourseResults
                        compact
                        courses={courses}
                        currentPage={currentPage}
                        setCurrentPage={
                            setCurrentPage
                        }
                        nextOffset={nextOffset}
                        isFetching={isFetching}
                        error={error}
                        hasSearched={hasSearched}
                        onLoadMore={onLoadMore}
                        onRetry={onRetry}
                    />
                </div>

                {courses.length > 0 && (
                    <footer
                        className="flex shrink-0 flex-col gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8"
                    >


                    </footer>
                )}
            </div>
        </div>,
        document.body
    );
}