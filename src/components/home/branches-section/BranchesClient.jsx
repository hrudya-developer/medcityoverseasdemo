"use client";

import { useMemo, useState } from "react";

import BranchControls from "./BranchControls";
import BranchGrid from "./BranchGrid";

import {
    branches,
    INITIAL_VISIBLE,
    LOAD_MORE_COUNT,
} from "./branchesData";

const BranchesClient = () => {
    const [visibleCount, setVisibleCount] =
        useState(INITIAL_VISIBLE);

    const visibleBranches = useMemo(
        () => branches.slice(0, visibleCount),
        [visibleCount]
    );

    const hasMore =
        visibleCount < branches.length;

    const hasExpanded =
        visibleCount > INITIAL_VISIBLE;

    const handleViewMore = () => {
        setVisibleCount((currentCount) =>
            Math.min(
                currentCount + LOAD_MORE_COUNT,
                branches.length
            )
        );
    };

    const handleHideLocations = () => {
        setVisibleCount((currentCount) =>
            Math.max(
                INITIAL_VISIBLE,
                currentCount - LOAD_MORE_COUNT
            )
        );
    };

    return (
        <>
            <BranchGrid
                branches={visibleBranches}
            />

            <BranchControls
                hasMore={hasMore}
                hasExpanded={hasExpanded}
                onViewMore={handleViewMore}
                onHide={handleHideLocations}
            />
        </>
    );
};

export default BranchesClient;