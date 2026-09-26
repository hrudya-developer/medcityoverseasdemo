"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
}) {
  if (
    totalPages <= 1
  ) {
    return null;
  }

  const pages =
    Array.from(
      {
        length:
          totalPages,
      },
      (_, index) =>
        index + 1
    );

  return (
    <div
      className="
        mt-12
        flex
        flex-wrap
        items-center
        justify-center
        gap-2
      "
    >
      {/* PREVIOUS */}

      <button
        type="button"
        onClick={
          onPrevious
        }
        disabled={
          currentPage === 1
        }
        className="
          inline-flex
          h-11
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          text-sm
          font-bold
          text-slate-700
          shadow-sm
          transition
          hover:border-primary
          hover:text-primary
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronLeft
          size={17}
        />

        Previous
      </button>

      {/* PAGE NUMBERS */}

      {pages.map(
        (page) => {
          const isActive =
            page ===
            currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() =>
                onPageChange(
                  page
                )
              }
              className={`
                grid
                h-11
                min-w-11
                place-items-center
                rounded-xl
                border
                px-3
                text-sm
                font-extrabold
                transition

                ${
                  isActive
                    ? "border-primary bg-primary text-white shadow-md"
                    : "border-slate-200 bg-white text-slate-700 hover:border-primary hover:text-primary"
                }
              `}
            >
              {page}
            </button>
          );
        }
      )}

      {/* NEXT */}

      <button
        type="button"
        onClick={
          onNext
        }
        disabled={
          currentPage ===
          totalPages
        }
        className="
          inline-flex
          h-11
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          text-sm
          font-bold
          text-slate-700
          shadow-sm
          transition
          hover:border-primary
          hover:text-primary
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Next

        <ChevronRight
          size={17}
        />
      </button>
    </div>
  );
}