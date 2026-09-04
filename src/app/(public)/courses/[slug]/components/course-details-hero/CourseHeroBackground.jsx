import Image from "next/image";

import heroBg from "@/assets/university-course-details.webp";

export default function CourseHeroBackground() {
    return (
        <>
            {/* =====================================================
                BACKGROUND IMAGE
            ====================================================== */}

            <Image
                src={heroBg}
                alt=""
                fill
                priority
                sizes="100vw"
                className="
                    -z-30
                    scale-[1.02]
                    object-cover
                    object-center

                    lg:object-[58%_center]
                "
            />

            {/* =====================================================
                MAIN CINEMATIC OVERLAY

                Darker left for content readability.
                Right remains visible but more controlled.
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    absolute
                    inset-0
                    -z-20

                    bg-gradient-to-r
                    from-[#020617]/98
                    via-[#061525]/88
                    via-[52%]
                    to-[#061c2b]/52
                "
            />

            {/* =====================================================
                LEFT DEEP NAVY DEPTH
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    absolute
                    inset-y-0
                    left-0
                    -z-20

                    w-[68%]

                    bg-gradient-to-r
                    from-[#020617]/95
                    via-[#071827]/65
                    to-transparent
                "
            />

            {/* =====================================================
                CENTER TEAL / CYAN GLOW
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    left-[32%]
                    top-[5%]
                    -z-10

                    h-[460px]
                    w-[460px]
                    rounded-full

                    bg-[#06b6d4]/15
                    blur-[165px]
                "
            />

            {/* =====================================================
                LEFT DEEP BLUE GLOW
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    top-[16%]
                    -z-10

                    h-[450px]
                    w-[450px]
                    rounded-full

                    bg-[#2563eb]/16
                    blur-[170px]
                "
            />

            {/* =====================================================
                BOTTOM VIOLET GLOW
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    bottom-[-200px]
                    left-[48%]
                    -z-10

                    h-[450px]
                    w-[450px]
                    rounded-full

                    bg-[#7c3aed]/10
                    blur-[180px]
                "
            />

            {/* =====================================================
                RIGHT AQUA GLOW
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    top-[6%]
                    -z-10

                    h-[500px]
                    w-[440px]
                    rounded-full

                    bg-[#22d3ee]/10
                    blur-[175px]
                "
            />

            {/* =====================================================
                MAIN DOT PATTERN
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    -z-10

                    opacity-[0.22]

                    [background-image:radial-gradient(circle,rgba(255,255,255,0.9)_1.35px,transparent_1.45px)]
                    [background-size:28px_28px]

                    [mask-image:linear-gradient(to_right,transparent_1%,black_12%,black_84%,transparent_100%)]
                    [-webkit-mask-image:linear-gradient(to_right,transparent_1%,black_12%,black_84%,transparent_100%)]
                "
            />

            {/* =====================================================
                RIGHT CYAN DOT FIELD
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    right-[1%]
                    top-[5%]
                    -z-10

                    hidden
                    h-[430px]
                    w-[500px]

                    opacity-[0.32]

                    [background-image:radial-gradient(circle,rgba(103,232,249,0.95)_1.7px,transparent_1.8px)]
                    [background-size:25px_25px]

                    [mask-image:radial-gradient(ellipse_at_center,black_5%,black_30%,transparent_75%)]
                    [-webkit-mask-image:radial-gradient(ellipse_at_center,black_5%,black_30%,transparent_75%)]

                    md:block
                "
            />

            {/* =====================================================
                LEFT DECORATIVE DOT CLUSTER
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    bottom-[7%]
                    left-[4%]
                    -z-10

                    hidden
                    h-[150px]
                    w-[230px]

                    opacity-[0.25]

                    [background-image:radial-gradient(circle,rgba(147,197,253,0.95)_1.5px,transparent_1.6px)]
                    [background-size:21px_21px]

                    [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]
                    [-webkit-mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]

                    lg:block
                "
            />

            {/* =====================================================
                SUBTLE DIAGONAL LIGHT SWEEP
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    right-[19%]
                    top-[-24%]
                    -z-10

                    hidden
                    h-[680px]
                    w-[190px]

                    rotate-[24deg]

                    bg-gradient-to-b
                    from-white/[0.055]
                    via-[#67e8f9]/[0.025]
                    to-transparent

                    blur-[75px]

                    lg:block
                "
            />

            {/* =====================================================
                TOP CINEMATIC DEPTH
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    -z-10

                    h-[200px]

                    bg-gradient-to-b
                    from-[#020617]/78
                    via-[#020617]/28
                    to-transparent
                "
            />

            {/* =====================================================
                BOTTOM CINEMATIC DEPTH
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    -z-10

                    h-[330px]

                    bg-gradient-to-t
                    from-[#020617]/95
                    via-[#03131f]/55
                    to-transparent
                "
            />

            {/* =====================================================
                EDGE VIGNETTE
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    -z-10

                    [background:radial-gradient(ellipse_at_center,transparent_22%,rgba(2,6,23,0.12)_52%,rgba(2,6,23,0.62)_100%)]
                "
            />

            {/* =====================================================
                SUBTLE GLOBAL DARKENING

                Keeps the whole hero richer without hiding the image.
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    -z-10

                    bg-[#020617]/10
                "
            />

            {/* =====================================================
                MOBILE READABILITY
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    -z-10

                    bg-[#020617]/35

                    lg:hidden
                "
            />

            {/* =====================================================
                MOBILE CENTER GLOW
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-[20%]
                    -z-10

                    h-[300px]
                    w-[300px]
                    -translate-x-1/2
                    rounded-full

                    bg-[#06b6d4]/10
                    blur-[120px]

                    lg:hidden
                "
            />

            {/* =====================================================
                MOBILE DOT ACCENT
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-[8%]
                    -z-10

                    h-[300px]
                    w-[92%]
                    -translate-x-1/2

                    opacity-[0.24]

                    [background-image:radial-gradient(circle,rgba(103,232,249,0.95)_1.5px,transparent_1.6px)]
                    [background-size:26px_26px]

                    [mask-image:radial-gradient(ellipse_at_center,black_10%,black_35%,transparent_76%)]
                    [-webkit-mask-image:radial-gradient(ellipse_at_center,black_10%,black_35%,transparent_76%)]

                    md:hidden
                "
            />
        </>
    );
}