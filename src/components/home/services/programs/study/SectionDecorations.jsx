export default function SectionDecorations() {
    return (
        <>
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-28
                    top-20
                    h-72
                    w-72
                    rounded-full
                    bg-primary/5
                    blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-28
                    bottom-16
                    h-80
                    w-80
                    rounded-full
                    bg-secondary/5
                    blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.025]
                    [background-image:radial-gradient(circle_at_center,#0f172a_1px,transparent_1px)]
                    [background-size:22px_22px]
                "
            />
        </>
    );
}