export default function ServicesBackground() {
    return (
        <div
            aria-hidden="true"
            className="
                pointer-events-none
                absolute inset-0
                overflow-hidden
            "
        >
            <div
                className="
                    absolute inset-0
                    opacity-[0.38]
                    [background-image:radial-gradient(circle,rgba(99,26,51,0.13)_1px,transparent_1px)]
                    [background-size:25px_25px]
                    [mask-image:linear-gradient(to_bottom,black,transparent_90%)]
                "
            />

            <div
                className="
                    absolute inset-0
                    opacity-[0.14]
                    [background-image:repeating-linear-gradient(135deg,rgba(192,31,83,0.1)_0,rgba(192,31,83,0.1)_1px,transparent_1px,transparent_28px)]
                "
            />

            <div
                className="
                    absolute -left-32 top-20
                    size-96 rounded-full
                    bg-primary/10
                    blur-[110px]
                "
            />

            <div
                className="
                    absolute -right-32 bottom-0
                    size-[430px] rounded-full
                    bg-secondary/10
                    blur-[120px]
                "
            />

            <div
                className="
                    absolute left-1/2 top-10
                    h-px w-[70%]
                    -translate-x-1/2
                    bg-gradient-to-r
                    from-transparent
                    via-primary/20
                    to-transparent
                "
            />
        </div>
    );
}