import Link from "next/link";

import {
    ArrowRight,
    Globe2,
    MessageCircle,
    PlaneTakeoff,
    Sparkles,
    Trophy,
} from "lucide-react";

export default function VisaAchieversHeader() {
    return (
        <div
            className="
                mb-8
                grid
                gap-4
                lg:grid-cols-[1.08fr_0.92fr]
            "
        >
            {/* =====================================================
                LEFT CARD
            ===================================================== */}
            <div
                className="
                    group
                    relative
                    isolate
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-secondary/10
                    bg-gradient-to-br
                    from-[#e9f5ff]
                    via-[#f5faff]
                    to-white
                    px-6
                    py-7
                    shadow-[0_18px_45px_rgba(4,102,175,0.10)]
                    sm:px-8
                    lg:px-9
                "
            >
                {/* =================================================
                    BACKGROUND DECORATION
                ================================================= */}

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        -left-24
                        -top-28
                        -z-20
                        h-64
                        w-64
                        rounded-full
                        bg-secondary/15
                        blur-[90px]
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        -bottom-28
                        right-8
                        -z-20
                        h-64
                        w-64
                        rounded-full
                        bg-primary/10
                        blur-[90px]
                    "
                />

                {/* Wave lines */}
                <svg
                    aria-hidden="true"
                    viewBox="0 0 700 170"
                    preserveAspectRatio="none"
                    className="
                        pointer-events-none
                        absolute
                        -left-10
                        -top-5
                        -z-10
                        h-[140px]
                        w-[110%]
                    "
                >
                    <path
                        d="
                            M-20 100
                            C120 10 230 150 360 75
                            C480 5 590 100 740 20
                        "
                        fill="none"
                        stroke="rgba(4,102,175,0.12)"
                        strokeWidth="2"
                    />

                    <path
                        d="
                            M-20 115
                            C120 25 230 165 360 90
                            C480 20 590 115 740 35
                        "
                        fill="none"
                        stroke="rgba(192,31,83,0.08)"
                        strokeWidth="2"
                    />

                    <path
                        d="
                            M-20 130
                            C120 40 230 180 360 105
                            C480 35 590 130 740 50
                        "
                        fill="none"
                        stroke="rgba(4,102,175,0.06)"
                        strokeWidth="1.5"
                    />
                </svg>

                {/* Dots */}
                <div
                    aria-hidden="true"
                    className="
                        absolute
                        right-7
                        top-7
                        grid
                        grid-cols-6
                        gap-2
                        opacity-20
                    "
                >
                    {Array.from({
                        length: 24,
                    }).map((_, index) => (
                        <span
                            key={index}
                            className="
                                h-[3px]
                                w-[3px]
                                rounded-full
                                bg-secondary
                            "
                        />
                    ))}
                </div>

                {/* Ghost text */}
                <span
                    aria-hidden="true"
                    className="
                        absolute
                        -bottom-3
                        right-5
                        select-none
                        text-[80px]
                        font-black
                        leading-none
                        tracking-[-0.07em]
                        text-secondary/[0.035]
                    "
                >
                    VISA
                </span>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="relative z-10">
                    {/* Badge */}
                    <div
                        className="
                            mb-4
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-secondary/15
                            bg-white/80
                            px-3.5
                            py-2
                            shadow-sm
                            backdrop-blur-md
                        "
                    >
                        <span
                            className="
                                flex
                                h-6
                                w-6
                                items-center
                                justify-center
                                rounded-full
                                bg-secondary/10
                            "
                        >
                            <PlaneTakeoff
                                size={13}
                                className="text-secondary"
                                aria-hidden="true"
                            />
                        </span>

                        <span
                            className="
                                text-[10px]
                                font-extrabold
                                uppercase
                                tracking-[0.16em]
                                text-secondary
                            "
                        >
                            Student Visa Approvals
                        </span>
                    </div>

                    {/* Heading */}
                    <h2
                        id="visa-achievers-heading"
                        className="
                            max-w-[650px]
                            text-[27px]
                            font-black
                            leading-[1.08]
                            tracking-[-0.035em]
                            text-darkPrimary
                            sm:text-[33px]
                            lg:text-[37px]
                            xl:text-[40px]
                        "
                    >
                        Students Moving Closer
                        <br className="hidden sm:block" />{" "}
                        to Their{" "}
                        <span
                            className="
                                bg-gradient-to-r
                                from-primary
                                via-[#df547f]
                                to-secondary
                                bg-clip-text
                                text-transparent
                            "
                        >
                            Study Abroad Goals
                        </span>
                    </h2>

                    <p
                        className="
                            mt-4
                            max-w-[510px]
                            text-[13px]
                            font-medium
                            leading-6
                            text-slate-600
                            sm:text-sm
                        "
                    >
                        Every student visa approval marks
                        another important step towards an
                        international education journey.
                    </p>

                    {/* =================================================
                        STATS
                    ================================================= */}

                    <div
                        className="
                            mt-5
                            flex
                            flex-wrap
                            gap-3
                        "
                    >
                        {/* Stat 1 */}
                        <div
                            className="
                                min-w-[135px]
                                rounded-2xl
                                border
                                border-primary/10
                                bg-white/75
                                px-4
                                py-2.5
                                shadow-[0_8px_22px_rgba(192,31,83,0.05)]
                                backdrop-blur-sm
                            "
                        >
                            <p
                                className="
                                    text-[9px]
                                    font-extrabold
                                    uppercase
                                    tracking-[0.14em]
                                    text-slate-400
                                "
                            >
                                Milestone
                            </p>

                            <div
                                className="
                                    mt-1
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <span
                                    className="
                                        h-2
                                        w-2
                                        rounded-full
                                        bg-primary
                                    "
                                />

                                <p
                                    className="
                                        text-sm
                                        font-black
                                        text-slate-800
                                    "
                                >
                                    Visa Granted
                                </p>
                            </div>
                        </div>

                        {/* Stat 2 */}
                        <div
                            className="
                                min-w-[135px]
                                rounded-2xl
                                border
                                border-secondary/10
                                bg-white/75
                                px-4
                                py-2.5
                                shadow-[0_8px_22px_rgba(4,102,175,0.05)]
                                backdrop-blur-sm
                            "
                        >
                            <p
                                className="
                                    text-[9px]
                                    font-extrabold
                                    uppercase
                                    tracking-[0.14em]
                                    text-slate-400
                                "
                            >
                                Next Step
                            </p>

                            <div
                                className="
                                    mt-1
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <span
                                    className="
                                        h-2
                                        w-2
                                        rounded-full
                                        bg-secondary
                                    "
                                />

                                <p
                                    className="
                                        text-sm
                                        font-black
                                        text-slate-800
                                    "
                                >
                                    Study Abroad
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
                RIGHT CARD
            ===================================================== */}
            <div
                className="
                    relative
                    isolate
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-[#efd99e]/70
                    bg-gradient-to-br
                    from-[#fffdf5]
                    via-[#fff7df]
                    to-[#ffedbd]
                    px-6
                    py-7
                    shadow-[0_18px_45px_rgba(143,103,32,0.10)]
                    sm:px-8
                    lg:px-9
                "
            >
                {/* =================================================
                    BACKGROUND DECORATION
                ================================================= */}

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        -bottom-28
                        -left-20
                        -z-10
                        h-64
                        w-64
                        rounded-full
                        bg-[#f7c652]/18
                        blur-[80px]
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        -right-20
                        -top-24
                        -z-10
                        h-60
                        w-60
                        rounded-full
                        bg-white/80
                        blur-[70px]
                    "
                />

                {/* dots */}
                <div
                    aria-hidden="true"
                    className="
                        absolute
                        right-7
                        top-7
                        grid
                        grid-cols-5
                        gap-2
                        opacity-15
                    "
                >
                    {Array.from({
                        length: 20,
                    }).map((_, index) => (
                        <span
                            key={index}
                            className="
                                h-[3px]
                                w-[3px]
                                rounded-full
                                bg-[#b78322]
                            "
                        />
                    ))}
                </div>

                {/* Rings */}
                <div
                    aria-hidden="true"
                    className="
                        absolute
                        -bottom-24
                        -right-16
                        h-56
                        w-56
                        rounded-full
                        border
                        border-[#d8a63c]/10
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        -bottom-12
                        -right-2
                        h-36
                        w-36
                        rounded-full
                        border
                        border-[#d8a63c]/10
                    "
                />

                {/* =================================================
                    TROPHY — TOP RIGHT
                ================================================= */}

                <div
                    className="
                        absolute
                        right-7
                        top-7
                        z-20
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-[16px]
                        border
                        border-[#efcf77]
                        bg-gradient-to-br
                        from-[#ffe47d]
                        to-[#ffc43d]
                        text-[#805600]
                        shadow-[0_10px_25px_rgba(188,132,18,0.18)]
                        transition-transform
                        duration-300
                        hover:rotate-3
                        hover:scale-105
                        sm:h-14
                        sm:w-14
                    "
                >
                    <Trophy
                        size={23}
                        strokeWidth={2}
                    />

                    <span
                        className="
                            absolute
                            -right-1
                            -top-1
                            h-3
                            w-3
                            rounded-full
                            border-2
                            border-[#fff8e7]
                            bg-primary
                        "
                    />
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div
                    className="
                        relative
                        z-10
                        pr-10
                        sm:pr-14
                    "
                >
                    {/* Label */}
                    <div
                        className="
                            mb-3
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <span
                            className="
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-full
                                bg-primary/10
                            "
                        >
                            <Sparkles
                                size={13}
                                className="text-primary"
                            />
                        </span>

                        <span
                            className="
                                text-[10px]
                                font-extrabold
                                uppercase
                                tracking-[0.15em]
                                text-[#8a5662]
                            "
                        >
                            Recent Visa Milestones
                        </span>
                    </div>

                    {/* Heading */}
                    <h3
                        className="
                            max-w-[450px]
                            text-xl
                            font-black
                            leading-[1.25]
                            tracking-[-0.02em]
                            text-[#422b31]
                            sm:text-[23px]
                        "
                    >
                        Guidance That Supports
                        Every Visa Step
                    </h3>

                    <p
                        className="
                            mt-3
                            max-w-[490px]
                            text-[13px]
                            font-medium
                            leading-6
                            text-[#725f61]
                            sm:text-sm
                        "
                    >
                        From choosing a destination to
                        admissions, documentation and visa
                        applications, our team supports
                        students throughout their study
                        abroad journey.
                    </p>

                    {/* =================================================
                        CTA BUTTONS
                    ================================================= */}

                    <div
                        className="
                            mt-6
                            flex
                            flex-wrap
                            items-center
                            gap-3
                        "
                    >
                        {/* Find Destination */}
                        <Link
                            href="/destinations"
                            className="
                                group/button
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-primary
                                px-3
                                py-3
                                text-xs
                                font-semibold
                                text-white
                                shadow-[0_10px_24px_rgba(4,102,175,0.20)]
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:bg-[#03568f]
                                hover:shadow-[0_14px_30px_rgba(4,102,175,0.28)]
                            "
                        >
                            <Globe2
                                size={15}
                                strokeWidth={2.2}
                            />

                            Find Destination

                            <ArrowRight
                                size={14}
                                className="
                                    transition-transform
                                    duration-300
                                    group-hover/button:translate-x-1
                                "
                            />
                        </Link>

                        {/* Contact */}
                        <Link
                            href="/contact-us"
                            className="
                                group/button
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                border
                                border-primary/20
                                bg-white/70
                                px-3
                                py-3
                                text-xs
                                font-semibold
                                text-primary
                                shadow-sm
                                backdrop-blur-md
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:border-primary
                                hover:bg-primary
                                hover:text-white
                                hover:shadow-[0_12px_26px_rgba(192,31,83,0.18)]
                            "
                        >
                            <MessageCircle
                                size={15}
                                strokeWidth={2.2}
                            />

                            Contact Us
                        </Link>
                    </div>

                    {/* Bottom micro text */}
                    <div
                        className="
                            mt-5
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <span
                            className="
                                h-px
                                w-8
                                bg-[#d1aa52]
                            "
                        />

                        <PlaneTakeoff
                            size={13}
                            className="text-[#b47b18]"
                        />

                        <span
                            className="
                                text-[9px]
                                font-extrabold
                                uppercase
                                tracking-[0.13em]
                                text-[#967331]
                            "
                        >
                            Start Your Journey
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}