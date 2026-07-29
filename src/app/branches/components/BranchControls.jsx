import {
    ChevronUp,
    RefreshCw,
} from "lucide-react";

export default function BranchControls({
    hasMore,
    canHideRows,
    onShowMore,
    onHidePrevious,
}) {
    if (!hasMore && !canHideRows) {
        return null;
    }

    return (
        <div
            className="
        mx-4 mt-9
        flex flex-col
        items-stretch justify-center
        gap-3
        sm:mx-6
        sm:flex-row sm:items-center
        lg:mx-0
      "
        >
            {hasMore && (
                <button
                    type="button"
                    onClick={onShowMore}
                    className="
            inline-flex min-h-12 items-center
            justify-center gap-2 rounded-xl
            bg-gradient-to-r
            from-primary to-darkPrimary
            px-6 py-3
            text-sm font-bold text-white
            shadow-[0_12px_28px_rgba(192,31,83,0.24)]
            transition duration-300
            hover:-translate-y-0.5
            hover:shadow-[0_16px_34px_rgba(192,31,83,0.32)]
            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-primary/25
          "
                >
                    <RefreshCw className="h-4 w-4" />
                    View More Centers
                </button>
            )}

            {canHideRows && (
                <button
                    type="button"
                    onClick={onHidePrevious}
                    className="
            inline-flex min-h-12 items-center
            justify-center gap-2 rounded-xl
            border border-primary
            bg-white
            px-6 py-3
            text-sm font-bold text-primary
            transition duration-300
            hover:-translate-y-0.5
            hover:bg-primary/5
            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-primary/15
          "
                >
                    <ChevronUp className="h-4 w-4" />
                    Show Less
                </button>
            )}
        </div>
    );
}