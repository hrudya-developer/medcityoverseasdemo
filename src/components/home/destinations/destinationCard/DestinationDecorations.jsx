export default function DestinationDecorations() {
    return (
        <>
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -bottom-14
                    -left-14
                    h-36
                    w-36
                    rounded-full
                    bg-primary/[0.06]
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    bottom-5
                    right-5
                    h-20
                    w-20
                    opacity-[0.07]
                    [background-image:radial-gradient(#631A33_1px,transparent_1px)]
                    [background-size:9px_9px]
                "
            />
        </>
    );
}