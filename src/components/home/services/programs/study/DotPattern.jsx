const DOT_COUNT = 12;

export default function DotPattern() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-5 right-5 grid grid-cols-4 gap-1.5"
        >
            {Array.from({
                length: DOT_COUNT,
            }).map((_, index) => (
                <span
                    key={index}
                    className="h-1.5 w-1.5 rounded-full bg-primary/15"
                />
            ))}
        </div>
    );
}