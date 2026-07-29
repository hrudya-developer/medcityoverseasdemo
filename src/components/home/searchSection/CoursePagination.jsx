import {
    ChevronLeft,
    ChevronRight,
    Loader2,
} from "lucide-react";

export default function CoursePagination({
    currentPage,
    totalPages,
    hasNextApiPage,
    isFetching,
    onPrevious,
    onNext,
    onPageChange,
}) {
    if (totalPages <= 1 && !hasNextApiPage) {
        return null;
    }

    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );

    return (
        <nav
            aria-label="Course results pagination"
            className="
        mt-10 flex flex-wrap
        items-center justify-center gap-2
      "
        >
            <PaginationButton
                label="Previous page"
                disabled={
                    currentPage === 1 ||
                    isFetching
                }
                onClick={onPrevious}
            >
                <ChevronLeft size={19} />
            </PaginationButton>

            {pageNumbers.map((page) => {
                const active =
                    page === currentPage;

                return (
                    <button
                        key={page}
                        type="button"
                        aria-label={`Go to page ${page}`}
                        aria-current={
                            active ? "page" : undefined
                        }
                        onClick={() =>
                            onPageChange(page)
                        }
                        className={`
              grid size-11
              place-content-center
              rounded-xl
              text-sm font-black
              transition-all
              ${active
                                ? `
                    bg-primary
                    text-white
                    shadow-[0_10px_24px_rgba(192,31,83,0.25)]
                  `
                                : `
                    border border-slate-200
                    bg-white text-slate-700
                    shadow-sm
                    hover:border-primary/30
                    hover:text-primary
                  `
                            }
            `}
                    >
                        {page}
                    </button>
                );
            })}

            <PaginationButton
                label="Next page"
                disabled={
                    (currentPage === totalPages &&
                        !hasNextApiPage) ||
                    isFetching
                }
                onClick={onNext}
            >
                {isFetching ? (
                    <Loader2
                        className="animate-spin"
                        size={18}
                    />
                ) : (
                    <ChevronRight size={19} />
                )}
            </PaginationButton>
        </nav>
    );
}

function PaginationButton({
    children,
    label,
    disabled,
    onClick,
}) {
    return (
        <button
            type="button"
            aria-label={label}
            disabled={disabled}
            onClick={onClick}
            className="
        grid size-11
        place-content-center
        rounded-xl
        border border-slate-200
        bg-white
        text-slate-700
        shadow-sm
        transition
        hover:border-primary/30
        hover:text-primary
        disabled:cursor-not-allowed
        disabled:opacity-40
      "
        >
            {children}
        </button>
    );
}