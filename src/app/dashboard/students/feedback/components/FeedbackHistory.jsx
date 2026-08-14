import {
    ArrowRight,
    CalendarDays,
    Clock3,
    Loader2,
    MessageSquareText,
    RefreshCcw,
} from "lucide-react";


function formatCreatedAt(
    createdAt
) {
    if (!createdAt) {
        return {
            date:
                "Date unavailable",
            time:
                "",
        };
    }


    const parsedDate =
        new Date(
            String(
                createdAt
            ).replace(
                " ",
                "T"
            )
        );


    if (
        Number.isNaN(
            parsedDate.getTime()
        )
    ) {
        return {
            date:
                String(
                    createdAt
                ),
            time:
                "",
        };
    }


    return {
        date:
            parsedDate.toLocaleDateString(
                "en-IN",
                {
                    day:
                        "2-digit",

                    month:
                        "short",

                    year:
                        "numeric",
                }
            ),

        time:
            parsedDate.toLocaleTimeString(
                "en-IN",
                {
                    hour:
                        "2-digit",

                    minute:
                        "2-digit",

                    hour12:
                        true,
                }
            ),
    };
}


export default function FeedbackHistory({
    feedbacks = [],
    loading = false,
    error = "",
    showAll = false,
    onToggleShowAll,
    onRefresh,
}) {
    const safeFeedbacks =
        Array.isArray(
            feedbacks
        )
            ? feedbacks
            : [];


    const visibleFeedbacks =
        showAll
            ? safeFeedbacks
            : safeFeedbacks.slice(
                  0,
                  2
              );


    return (
        <div
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-gradient-to-br
                from-white
                via-slate-50
                to-blue-50/60
                p-4
                shadow-[0_20px_60px_rgba(15,23,42,0.08)]

                sm:p-6
                lg:p-8
            "
        >
            <div className="relative z-10">

                <div className="mb-6 flex items-start justify-between gap-4">

                    <div>
                        <span className="mb-2 inline-flex rounded-full bg-secondary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
                            Feedback History
                        </span>

                        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                            Earlier Feedbacks,
                            Suggestions &amp;
                            Issues
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Review your recently
                            submitted feedback
                            and reported issues.
                        </p>
                    </div>


                    <button
                        type="button"

                        onClick={
                            onRefresh
                        }

                        disabled={
                            loading
                        }

                        className="
                            inline-flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-slate-200
                            bg-white
                            text-slate-500
                        "
                    >
                        <RefreshCcw
                            size={15}
                            className={
                                loading
                                    ? "animate-spin"
                                    : ""
                            }
                        />
                    </button>

                </div>


                {loading ? (
                    <StatusBox>
                        <Loader2
                            size={30}
                            className="animate-spin text-primary"
                        />

                        <strong>
                            Loading feedback history
                        </strong>
                    </StatusBox>
                ) : error ? (
                    <StatusBox>
                        <MessageSquareText
                            size={28}
                            className="text-red-500"
                        />

                        <strong className="text-red-700">
                            Unable to load feedback
                        </strong>

                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    </StatusBox>
                ) : visibleFeedbacks.length ===
                  0 ? (
                    <StatusBox>
                        <MessageSquareText
                            size={28}
                            className="text-secondary"
                        />

                        <strong>
                            No feedback available
                        </strong>

                        <p className="text-sm text-slate-500">
                            Your submitted
                            feedback,
                            suggestions and
                            issues will
                            appear here.
                        </p>
                    </StatusBox>
                ) : (
                    <div className="space-y-4">

                        {visibleFeedbacks.map(
                            (
                                item,
                                index
                            ) => {
                                const {
                                    date,
                                    time,
                                } =
                                    formatCreatedAt(
                                        item.created_at
                                    );


                                return (
                                    <article
                                        key={
                                            item.id ??
                                            index
                                        }

                                        className="
                                            rounded-2xl
                                            border
                                            border-slate-200
                                            bg-white
                                            p-5
                                            shadow-sm
                                        "
                                    >
                                        <div className="flex items-start justify-between gap-4">

                                            <div className="min-w-0">
                                                <span className="inline-flex rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold uppercase text-primary">
                                                    {
                                                        item.type
                                                    }
                                                </span>


                                                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                                                    {
                                                        item.message
                                                    }
                                                </p>


                                                {item.reply && (
                                                    <div className="mt-4 rounded-xl border border-secondary/15 bg-secondary/5 p-3">
                                                        <p className="text-xs font-bold uppercase text-secondary">
                                                            Team reply
                                                        </p>

                                                        <p className="mt-1 text-sm leading-6 text-slate-700">
                                                            {
                                                                item.reply
                                                            }
                                                        </p>
                                                    </div>
                                                )}
                                            </div>


                                            <div className="hidden shrink-0 text-right text-xs text-slate-500 sm:block">
                                                <p className="flex items-center gap-1.5">
                                                    <CalendarDays
                                                        size={14}
                                                    />

                                                    {
                                                        date
                                                    }
                                                </p>

                                                {time && (
                                                    <p className="mt-2 flex items-center gap-1.5">
                                                        <Clock3
                                                            size={14}
                                                        />

                                                        {
                                                            time
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                        </div>
                                    </article>
                                );
                            }
                        )}

                    </div>
                )}


                {!loading &&
                    !error &&
                    safeFeedbacks.length >
                        2 && (
                        <button
                            type="button"

                            onClick={
                                onToggleShowAll
                            }

                            className="
                                mt-7
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-primary
                                bg-white
                                px-6
                                py-3
                                text-sm
                                font-semibold
                                text-primary
                            "
                        >
                            {showAll
                                ? "Show Less"
                                : `View All Feedback (${safeFeedbacks.length})`}

                            <ArrowRight
                                size={16}
                            />
                        </button>
                    )}

            </div>
        </div>
    );
}


function StatusBox({
    children,
}) {
    return (
        <div
            className="
                flex
                min-h-[190px]
                flex-col
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-dashed
                border-slate-200
                bg-white/70
                p-8
                text-center
            "
        >
            {children}
        </div>
    );
}