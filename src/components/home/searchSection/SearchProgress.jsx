export default function SearchProgress({
    countrySelected,
    universitySelected,
    courseSelected,
}) {
    return (
        <div className="mt-4 hidden flex-wrap items-center justify-center gap-3 border-t border-white/10 pt-4 text-xs font-semibold text-white/45 md:flex">
            <ProgressItem
                number="1"
                label="Choose destination"
                completed={countrySelected}
            />

            <ProgressLine completed={countrySelected} />

            <ProgressItem
                number="2"
                label="Select university"
                completed={universitySelected}
            />

            <ProgressLine completed={universitySelected} />

            <ProgressItem
                number="3"
                label="Pick your course"
                completed={courseSelected}
            />
        </div>
    );
}

function ProgressItem({
    number,
    label,
    completed,
}) {
    return (
        <div className="flex items-center gap-2 whitespace-nowrap">
            <span
                className={`grid size-7 place-content-center rounded-full text-[10px] font-black transition-all ${completed
                        ? "bg-primary text-white shadow-[0_6px_16px_rgba(192,31,83,0.32)]"
                        : "border border-white/15 bg-white/5 text-white/45"
                    }`}
            >
                {completed ? "✓" : number}
            </span>

            <span
                className={
                    completed
                        ? "text-white/80"
                        : "text-white/40"
                }
            >
                {label}
            </span>
        </div>
    );
}

function ProgressLine({
    completed,
}) {
    return (
        <span
            aria-hidden="true"
            className={`h-px w-8 transition-colors md:w-12 lg:w-20 ${completed
                    ? "bg-primary"
                    : "bg-white/10"
                }`}
        />
    );
}