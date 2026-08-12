const SKELETON_COUNT = 6;

export default function DestinationLoading() {
    return (
        <section
            aria-label="Loading destinations"
            className="bg-gradient-to-b from-[#f7fbff] via-white to-[#fff7fb] py-12 sm:py-16 lg:py-20"
        >
            <div
                role="status"
                aria-live="polite"
                className="mx-auto grid max-w-[1536px] grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8"
            >
                {Array.from({
                    length: SKELETON_COUNT,
                }).map((_, index) => (
                    <div
                        key={index}
                        className="mx-auto w-full max-w-[430px] animate-pulse overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-sm"
                    >
                        <div
                            className="h-[250px] bg-slate-200 sm:h-[270px] lg:h-[285px]"
                        />

                        <div className="space-y-4 px-5 py-7">
                            <div className="h-4 w-1/3 rounded bg-slate-100" />
                            <div className="h-6 w-2/3 rounded bg-slate-200" />
                            <div className="h-px w-full bg-slate-100" />
                            <div className="h-11 w-full rounded-xl bg-slate-100" />
                        </div>
                    </div>
                ))}

                <span className="sr-only">
                    Loading study destinations...
                </span>
            </div>
        </section>
    );
}