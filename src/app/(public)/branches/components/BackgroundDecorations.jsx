export default function BackgroundDecorations() {
    return (
        <>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-32 -top-28 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-28 top-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:radial-gradient(#631A33_1px,transparent_1px)] [background-size:22px_22px]"
            />
        </>
    );
}