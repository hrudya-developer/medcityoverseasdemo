"use client";

import { useMemo, useState } from "react";

import AcademyCentersHeader from "./components/AcademyCentersHeader";
import BackgroundDecorations from "./components/BackgroundDecorations";
import BranchControls from "./components/BranchControls";
import BranchGrid from "./components/BranchGrid";
import { centers } from "./data/centersData";

const INITIAL_VISIBLE = 6;
const LOAD_COUNT = 3;

export default function AcademyCentersClient() {
    const [visibleCount, setVisibleCount] =
        useState(INITIAL_VISIBLE);

    const visibleCenters = useMemo(() => {
        return centers.slice(0, visibleCount);
    }, [visibleCount]);

    const hasMore = visibleCount < centers.length;

    const canHideRows =
        visibleCount > INITIAL_VISIBLE;

    const handleShowMore = () => {
        setVisibleCount((currentCount) =>
            Math.min(
                currentCount + LOAD_COUNT,
                centers.length
            )
        );
    };

    const handleHidePrevious = () => {
        setVisibleCount((currentCount) =>
            Math.max(
                currentCount - LOAD_COUNT,
                INITIAL_VISIBLE
            )
        );

        requestAnimationFrame(() => {
            document
                .getElementById(
                    "medcity-study-abroad-branches"
                )
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
        });
    };

    return (
        <main>
            <section
                id="medcity-study-abroad-branches"
                aria-labelledby="branches-heading"
                className="
          relative isolate
          mx-auto mb-10
          w-full overflow-hidden
          bg-gradient-to-b
          from-white via-[#fffafd] to-white
        "
            >
                <BackgroundDecorations />

                <div className="relative z-10 mx-auto w-full">
                    <AcademyCentersHeader
                        totalBranches={centers.length}
                    />

                    <BranchGrid centers={visibleCenters} />

                    <BranchControls
                        hasMore={hasMore}
                        canHideRows={canHideRows}
                        onShowMore={handleShowMore}
                        onHidePrevious={handleHidePrevious}
                    />

                    {!hasMore && (
                        <p
                            role="status"
                            aria-live="polite"
                            className="
                mt-5 text-center
                text-sm font-medium
                text-slate-500
              "
                        >
                            All {centers.length} Medcity Study
                            Abroad branches are displayed.
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}