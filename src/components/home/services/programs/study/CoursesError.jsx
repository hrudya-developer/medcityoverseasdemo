import {
    AlertCircle,
} from "lucide-react";

export default function CoursesError({
    message,
    onRetry,
}) {
    return (
        <div
            role="alert"
            className="mx-auto my-10 max-w-2xl rounded-3xl border border-red-200 bg-red-50 px-6 py-9 text-center shadow-sm"
        >
            <AlertCircle
                aria-hidden="true"
                className="mx-auto mb-3 h-9 w-9 text-red-600"
            />

            <p
                className="text-sm font-semibold text-red-700 sm:text-base"
            >
                {message}
            </p>

            <button
                type="button"
                onClick={onRetry}
                className="mt-5 cursor-pointer rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
            >
                Try Again
            </button>
        </div>
    );
}