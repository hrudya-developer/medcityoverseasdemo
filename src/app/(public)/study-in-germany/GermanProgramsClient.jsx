"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import GermanProgramCard from "./components/GermanProgramCard";



const CARDS_PER_LOAD = 3;

export default function GermanProgramsClient({
  programs = [],
  imagePath = "",
}) {
  const [visibleCount, setVisibleCount] =
    useState(CARDS_PER_LOAD);

  if (!Array.isArray(programs) || programs.length === 0) {
    return null;
  }

  const visiblePrograms = programs.slice(
    0,
    visibleCount
  );

  const hasMore =
    visibleCount < programs.length;

  const canShowLess =
    visibleCount > CARDS_PER_LOAD;

  const handleViewMore = () => {
    setVisibleCount((currentCount) =>
      Math.min(
        currentCount + CARDS_PER_LOAD,
        programs.length
      )
    );
  };

  const handleShowLess = () => {
    setVisibleCount((currentCount) =>
      Math.max(
        CARDS_PER_LOAD,
        currentCount - CARDS_PER_LOAD
      )
    );
  };

  return (
    <div>
      {/* Cards */}
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3 scroll-mt-24" id="german-programs-cards">
        {visiblePrograms.map(
          (item, index) => (
            <GermanProgramCard
              key={
                item?.id ??
                item?.program_id ??
                item?.programId ??
                `${item?.name}-${index}`
              }
              item={item}
              imagePath={imagePath}
              priority={index < 3}
            />
          )
        )}
      </div>

      {/* Controls */}
      {(hasMore || canShowLess) && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {canShowLess && (
            <button
              type="button"
              onClick={handleShowLess}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-primary bg-white px-7 py-3 text-sm font-bold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <ChevronUp
                aria-hidden="true"
                size={18}
              />

              Show Less
            </button>
          )}

          {hasMore && (
            <button
              type="button"
              onClick={handleViewMore}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(192,31,83,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(192,31,83,0.30)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              View More

              <ChevronDown
                aria-hidden="true"
                size={18}
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
}