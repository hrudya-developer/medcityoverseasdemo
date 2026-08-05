"use client";

import {
    ChevronDown,
    ChevronUp,
} from "lucide-react";

export default function BlogControls({
    hasMore,
    canShowLess,
    onShowMore,
    onShowLess,
}) {
    if (
        !hasMore &&
        !canShowLess
    ) {
        return null;
    }

    return (
        <div className="mt-10 mb-15 flex flex-wrap items-center justify-center gap-3">
            {hasMore && (
                <button
                    type="button"
                    onClick={onShowMore}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-darkPrimary"
                >
                    View More

                    <ChevronDown className="size-4" />
                </button>
            )}

            {canShowLess && (
                <button
                    type="button"
                    onClick={onShowLess}
                    className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-white px-6 py-3 text-sm font-extrabold text-primary shadow-sm transition hover:bg-primary/5"
                >
                    Show Less

                    <ChevronUp className="size-4" />
                </button>
            )}
        </div>
    );
}