"use client";

import {
    useMemo,
    useState,
} from "react";

import FAQ from "@/components/home/FAQ/FAQ";

import AcademyCentersHeader from "./components/AcademyCentersHeader";
import BackgroundDecorations from "./components/BackgroundDecorations";
import BranchControls from "./components/BranchControls";
import BranchGrid from "./components/BranchGrid";

const INITIAL_VISIBLE = 6;
const LOAD_COUNT = 3;

export default function AcademyCentersClient({
    centers = [],
}) {
    const safeCenters = useMemo(
        () =>
            Array.isArray(centers)
                ? centers
                : [],
        [centers]
    );

    const [
        visibleCount,
        setVisibleCount,
    ] = useState(
        Math.min(
            INITIAL_VISIBLE,
            safeCenters.length
        )
    );

    const displayedCenters = useMemo(
        () =>
            safeCenters.slice(
                0,
                visibleCount
            ),
        [
            safeCenters,
            visibleCount,
        ]
    );

    const hasMore =
        visibleCount <
        safeCenters.length;

    const canHideRows =
        visibleCount >
        INITIAL_VISIBLE;

    const handleShowMore = () => {
        setVisibleCount(
            (currentCount) =>
                Math.min(
                    currentCount +
                    LOAD_COUNT,
                    safeCenters.length
                )
        );
    };

    const handleHidePrevious = () => {
        setVisibleCount(
            (currentCount) =>
                Math.max(
                    currentCount -
                    LOAD_COUNT,
                    Math.min(
                        INITIAL_VISIBLE,
                        safeCenters.length
                    )
                )
        );

        window.requestAnimationFrame(
            () => {
                document
                    .getElementById(
                        "medcity-study-abroad-branches"
                    )
                    ?.scrollIntoView({
                        behavior:
                            "smooth",
                        block: "start",
                    });
            }
        );
    };

    return (
        <>
            <section
                id="medcity-study-abroad-branches"
                aria-labelledby="branches-heading"
                className="relative isolate mx-auto mb-10 w-full overflow-hidden bg-gradient-to-b from-white via-[#fffafd] to-white"
            >
                <BackgroundDecorations />

                <div className="relative z-10 mx-auto w-full">
                    <AcademyCentersHeader
                        totalBranches={
                            safeCenters.length
                        }
                    />

                    <BranchGrid
                        centers={
                            displayedCenters
                        }
                        visibleCount={
                            visibleCount
                        }
                    />

                    <BranchControls
                        hasMore={hasMore}
                        canHideRows={
                            canHideRows
                        }
                        onShowMore={
                            handleShowMore
                        }
                        onHidePrevious={
                            handleHidePrevious
                        }
                    />

                    {!hasMore &&
                        safeCenters.length >
                        0 && (
                            <p
                                role="status"
                                aria-live="polite"
                                className="mt-5 text-center text-sm font-medium text-slate-500"
                            >
                                All{" "}
                                {
                                    safeCenters.length
                                }{" "}
                                Medcity
                                Overseas
                                branches are
                                displayed.
                            </p>
                        )}
                </div>
            </section>

            <FAQ />
        </>
    );
}