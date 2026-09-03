export default function ServicesBackground() {
    return (
        <div
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                inset-0
                overflow-hidden
            "
        >
            {/* Main gradient background */}
            <div
                className="
                    absolute
                    inset-0

                    bg-[linear-gradient(
                        135deg,
                        #fff7fa_0%,
                        #fffafb_24%,
                        #f8faff_52%,
                        #f3f9ff_76%,
                        #f8fbff_100%
                    )]
                "
            />

            {/* Top soft pink glow */}
            <div
                className="
                    absolute
                    -top-[220px]
                    left-[8%]

                    h-[500px]
                    w-[600px]

                    rounded-full
                    bg-primary/[0.11]

                    blur-[140px]
                "
            />

            {/* Top-right blue glow */}
            <div
                className="
                    absolute
                    -right-[200px]
                    -top-[120px]

                    h-[550px]
                    w-[550px]

                    rounded-full
                    bg-secondary/[0.10]

                    blur-[150px]
                "
            />

            {/* Left middle pink glow */}
            <div
                className="
                    absolute
                    -left-[220px]
                    top-[35%]

                    h-[520px]
                    w-[520px]

                    rounded-full
                    bg-primary/[0.08]

                    blur-[150px]
                "
            />

            {/* Right middle blue glow */}
            <div
                className="
                    absolute
                    -right-[240px]
                    top-[42%]

                    h-[560px]
                    w-[560px]

                    rounded-full
                    bg-secondary/[0.08]

                    blur-[160px]
                "
            />

            {/* Center blended glow */}
            <div
                className="
                    absolute
                    left-1/2
                    top-[30%]

                    h-[400px]
                    w-[700px]

                    -translate-x-1/2

                    rounded-full

                    bg-gradient-to-r
                    from-primary/[0.04]
                    via-white/40
                    to-secondary/[0.05]

                    blur-[120px]
                "
            />

            {/* Bottom brand gradient */}
            <div
                className="
                    absolute
                    inset-x-0
                    bottom-0

                    h-[320px]

                    bg-gradient-to-r
                    from-primary/[0.055]
                    via-transparent
                    to-secondary/[0.065]
                "
            />

            {/* Bottom fade for smooth next-section transition */}
            <div
                className="
                    absolute
                    inset-x-0
                    bottom-0

                    h-32

                    bg-gradient-to-t
                    from-white/80
                    to-transparent
                "
            />
        </div>
    );
}