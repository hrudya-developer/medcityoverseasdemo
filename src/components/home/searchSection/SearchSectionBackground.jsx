export default function SearchSectionBackground() {
    return (
        <div
            aria-hidden="true"
            className="
                pointer-events-none
                absolute inset-0
            "
        >
            <div
                className="
                    absolute -left-24 -top-24
                    size-72 rounded-full
                    bg-primary/25 blur-[100px]
                "
            />

            <div
                className="
                    absolute -bottom-32 right-0
                    size-96 rounded-full
                    bg-secondary/20 blur-[120px]
                "
            />

            <div
                className="
                    absolute inset-0
                    opacity-[0.035]
                    [background-image:radial-gradient(#ffffff_1px,transparent_1px)]
                    [background-size:22px_22px]
                "
            />

            <div
                className="
                    absolute inset-x-0 top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-white/30
                    to-transparent
                "
            />
        </div>
    );
}