import Link from "next/link";

import {
    ArrowLeft,
    Loader2,
    RefreshCw,
    SearchX,
} from "lucide-react";

export function LoadingState() {
    return (
        <div
            role="status"
            className="
        grid min-h-[360px]
        place-content-center
        rounded-[28px]
        border border-slate-200
        bg-white text-center
        shadow-sm
      "
        >
            <span
                className="
          mx-auto grid size-16
          place-content-center
          rounded-2xl
          bg-primary/10 text-primary
        "
            >
                <Loader2
                    className="animate-spin"
                    size={30}
                />
            </span>

            <p className="mt-5 font-bold text-darkPrimary">
                Finding matching courses
            </p>

            <p className="mt-2 text-sm text-slate-500">
                Please wait while your results load.
            </p>
        </div>
    );
}

export function EmptyState() {
    return (
        <StateWrapper>
            <StateIcon>
                <SearchX size={30} />
            </StateIcon>

            <h2 className="mt-5 text-xl font-black text-darkPrimary">
                No matching courses found
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
                Try another destination,
                university, or main course.
            </p>

            <Link
                href="/"
                className="
          mt-6 inline-flex
          items-center gap-2
          rounded-xl
          bg-primary px-5 py-3
          text-sm font-bold text-white
          hover:bg-darkPrimary
        "
            >
                <ArrowLeft size={17} />
                Change search
            </Link>
        </StateWrapper>
    );
}

export function ErrorState({
    isFetching,
    onRetry,
}) {
    return (
        <StateWrapper>
            <StateIcon>
                <RefreshCw size={28} />
            </StateIcon>

            <h2 className="mt-5 text-xl font-black text-darkPrimary">
                Unable to load courses
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
                Something went wrong while retrieving
                your results.
            </p>

            <button
                type="button"
                disabled={isFetching}
                onClick={onRetry}
                className="
          mt-6 inline-flex
          items-center gap-2
          rounded-xl
          bg-primary px-5 py-3
          text-sm font-bold text-white
          disabled:opacity-60
        "
            >
                <RefreshCw
                    size={17}
                    className={
                        isFetching
                            ? "animate-spin"
                            : ""
                    }
                />
                Retry search
            </button>
        </StateWrapper>
    );
}

function StateWrapper({ children }) {
    return (
        <div
            className="
        mx-auto max-w-2xl
        rounded-[28px]
        border border-slate-200
        bg-white p-8
        text-center shadow-sm
        sm:p-12
      "
        >
            {children}
        </div>
    );
}

function StateIcon({ children }) {
    return (
        <span
            className="
        mx-auto grid size-16
        place-content-center
        rounded-2xl
        bg-primary/10
        text-primary
      "
        >
            {children}
        </span>
    );
}