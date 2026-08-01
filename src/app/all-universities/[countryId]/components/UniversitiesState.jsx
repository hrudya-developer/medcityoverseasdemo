"use client";

import {
    Building2,
    RefreshCw,
    SearchX,
} from "lucide-react";

const UniversitiesState = ({
    type = "empty",
    title,
    description,
    onRetry,
}) => {
    const isError =
        type === "error";

    const Icon = isError
        ? RefreshCw
        : SearchX;

    return (
        <div
            role={isError ? "alert" : "status"}
            className="
                flex min-h-[320px]
                flex-col items-center
                justify-center
                rounded-[24px]
                border border-dashed
                border-slate-300
                bg-white px-6
                text-center
            "
        >
            <span
                className={`
                    flex h-14 w-14
                    items-center justify-center
                    rounded-2xl
                    ${isError
                        ? "bg-red-50 text-red-500"
                        : "bg-primary/10 text-primary"
                    }
                `}
            >
                {type === "empty" ? (
                    <Building2
                        aria-hidden="true"
                        className="h-6 w-6"
                    />
                ) : (
                    <Icon
                        aria-hidden="true"
                        className="h-6 w-6"
                    />
                )}
            </span>

            <h2 className="mt-4 text-xl font-black text-slate-950">
                {title}
            </h2>

            {description && (
                <p className="mt-2 max-w-md text-sm leading-7 text-slate-500">
                    {description}
                </p>
            )}

            {isError && onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="
                        mt-6 inline-flex
                        items-center gap-2
                        rounded-xl
                        bg-primary
                        px-5 py-3
                        text-sm font-bold
                        text-white
                        transition
                        hover:bg-darkPrimary
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-primary
                        focus-visible:ring-offset-2
                    "
                >
                    <RefreshCw
                        aria-hidden="true"
                        className="h-4 w-4"
                    />

                    Try Again
                </button>
            )}
        </div>
    );
};

export default UniversitiesState;