const UniversitiesLoading = ({
    count = 6,
}) => {
    return (
        <div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
            aria-label="Loading universities"
            aria-live="polite"
        >
            {Array.from({
                length: count,
            }).map((_, index) => (
                <div
                    key={index}
                    aria-hidden="true"
                    className="overflow-hidden rounded-[24px] border border-slate-200 bg-white"
                >
                    <div className="h-[205px] animate-pulse bg-slate-200" />

                    <div className="space-y-3 p-5">
                        <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200" />

                        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />

                        <div className="h-px w-full bg-slate-100" />

                        <div className="h-4 w-1/3 animate-pulse rounded bg-slate-100" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UniversitiesLoading;