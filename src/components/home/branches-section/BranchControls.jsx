import {
    ChevronDown,
    ChevronUp,
} from "lucide-react";

const BranchControls = ({
    hasMore,
    hasExpanded,
    onViewMore,
    onHide,
}) => {
    if (!hasMore && !hasExpanded) {
        return null;
    }

    return (
        <div
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
            {hasMore && (
                <button
                    type="button"
                    onClick={onViewMore}
                    aria-label="Show more Medcity branch locations"
                    className="group inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(192,31,83,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_17px_36px_rgba(192,31,83,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto"
                >
                    View More Locations

                    <ChevronDown
                        aria-hidden="true"
                        className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1"
                    />
                </button>
            )}

            {hasExpanded && (
                <button
                    type="button"
                    onClick={onHide}
                    aria-label="Show fewer Medcity branch locations"
                    className="group inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl border border-primary/35 bg-white px-7 py-3 text-sm font-bold text-primary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto"
                >
                    Hide Locations

                    <ChevronUp
                        aria-hidden="true"
                        className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1"
                    />
                </button>
            )}
        </div>
    );
};

export default BranchControls;