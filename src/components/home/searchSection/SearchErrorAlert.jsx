export default function SearchErrorAlert() {
    return (
        <div
            role="alert"
            className="mx-auto mb-5 flex max-w-4xl items-start gap-3 rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-100 backdrop-blur-md"
        >
            <span
                aria-hidden="true"
                className="mt-1 size-2 shrink-0 rounded-full bg-red-400"
            />

            <span>
                Some search options could not
                be loaded. Please refresh and
                try again.
            </span>
        </div>
    );
}