export default function Pattern({
    color,
}) {
    return (
        <>
            <div
                className="
                    pointer-events-none
                    absolute right-8 top-8
                    grid grid-cols-6
                    gap-2 opacity-50
                "
            >
                {Array.from({
                    length: 36,
                }).map((_, index) => (
                    <span
                        key={index}
                        className={`
                            size-1.5 rounded-full
                            ${color}
                        `}
                    />
                ))}
            </div>

            <div
                className="
                    pointer-events-none
                    absolute -bottom-20
                    -right-20 size-56
                    rounded-full
                    border border-primary/10
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute -bottom-12
                    -right-12 size-36
                    rounded-full
                    border border-primary/10
                "
            />
        </>
    );
}