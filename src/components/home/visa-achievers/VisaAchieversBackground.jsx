export default function VisaAchieversBackground() {
    return (
        <>
            <div
                aria-hidden="true"
                className="
                    absolute
                    inset-0
                    -z-30
                    bg-gray-50
                "
            />

            <div
                aria-hidden="true"
                className="
                    absolute
                    -left-40
                    top-[-120px]
                    -z-20
                    h-[480px]
                    w-[480px]
                    rounded-full
                    bg-[#ff3f7f]/20
                    blur-[140px]
                "
            />

            <div
                aria-hidden="true"
                className="
                    absolute
                    -right-36
                    bottom-[-160px]
                    -z-20
                    h-[520px]
                    w-[520px]
                    rounded-full
                    bg-[#6c63ff]/20
                    blur-[150px]
                "
            />

            <div
                aria-hidden="true"
                className="
                    absolute
                    inset-0
                    -z-10
                    opacity-[0.07]
                "
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.75) 1px, transparent 1px)",
                    backgroundSize:
                        "28px 28px",
                }}
            />

            <div
                aria-hidden="true"
                className="
                    absolute
                    left-[8%]
                    top-[36%]
                    -z-10
                    h-px
                    w-[84%]
                    bg-gradient-to-r
                    from-transparent
                    via-white/15
                    to-transparent
                "
            />
        </>
    );
}