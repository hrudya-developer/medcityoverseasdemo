const SKELETON_COUNT = 6;

export default function CoursesLoading() {
    return (
        <section
            aria-label="Loading popular courses"
            className="py-10 sm:py-12"
        >
            <div
                role="status"
                aria-live="polite"
                className="mx-auto grid max-w-6xl grid-cols-1 gap-7 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:gap-8"
            >
                {Array.from({
                    length: SKELETON_COUNT,
                }).map((_, index) => (
                    <CourseSkeleton
                        key={index}
                    />
                ))}

                <span className="sr-only">
                    Loading popular courses...
                </span>
            </div>
        </section>
    );
}

function CourseSkeleton() {
    return (
        <div
            className="mx-auto w-full max-w-[390px] animate-pulse overflow-hidden rounded-[26px] border border-slate-100 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.07)]"
        >
            <div className="h-[230px] bg-slate-200" />

            <div
                className="min-h-[160px] bg-gradient-to-br from-white via-[#fff8fb] to-[#eef7ff] px-6 pb-7 pt-12"
            >
                <div
                    className="mx-auto h-5 w-3/4 rounded bg-slate-200"
                />

                <div
                    className="mx-auto mt-4 h-4 w-1/2 rounded bg-slate-100"
                />

                <div
                    className="mx-auto mt-5 h-1 w-16 rounded-full bg-slate-200"
                />
            </div>
        </div>
    );
}