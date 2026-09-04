import {
    BarChart3,
    CalendarDays,
    Clock,
} from "lucide-react";

/* =========================================================
   FACT CONFIG
========================================================= */

const facts = [
    {
        key: "duration",
        title: "Duration",
        icon: Clock,

        accent:
            "bg-primary",

        glow:
            "bg-primary/30",

        card:
            "from-primary/25 via-primary/10 to-white/[0.04]",

        iconBox:
            "border-primary/35 bg-primary/20 text-[#ff9cbd]",

        label:
            "text-[#ff9cbd]",

        number:
            "text-primary/70",
    },
    {
        key: "level",
        title: "Level",
        icon: BarChart3,

        accent:
            "bg-secondary",

        glow:
            "bg-secondary/30",

        card:
            "from-secondary/25 via-secondary/10 to-white/[0.04]",

        iconBox:
            "border-secondary/40 bg-secondary/20 text-[#78caff]",

        label:
            "text-[#78caff]",

        number:
            "text-secondary/80",
    },
    {
        key: "intakes",
        title: "Intakes",
        icon: CalendarDays,

        accent:
            "bg-logoYellow",

        glow:
            "bg-logoYellow/20",

        card:
            "from-logoYellow/15 via-logoYellow/[0.06] to-white/[0.04]",

        iconBox:
            "border-logoYellow/35 bg-logoYellow/10 text-logoYellow",

        label:
            "text-logoYellow",

        number:
            "text-logoYellow/60",
    },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function CourseQuickFactsPanel({
    duration,
    level,
    intakes,
    intakesRaw,
}) {
    const values = {
        duration,
        level,
        intakes,
    };

    return (
        <aside
            className="
                relative
                w-full
                max-w-[470px]

                lg:h-full
            "
        >
            {/* =============================================
                OUTER MULTI-COLOR GLOW
            ============================================= */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -inset-7
                    rounded-[42px]

                    bg-gradient-to-br
                    from-primary/20
                    via-secondary/15
                    to-logoYellow/10

                    opacity-70
                    blur-[85px]
                "
            />

            {/* =============================================
                MAIN GLASS PANEL
            ============================================= */}

            <div
                className="
                    relative
                    overflow-hidden

                    rounded-[28px]

                    border
                    border-white/15

                    bg-gradient-to-br
                    from-[#11152d]/80
                    via-[#07182b]/75
                    to-[#061a2c]/80

                    p-5

                    shadow-[0_30px_90px_rgba(0,0,0,0.32)]

                    backdrop-blur-[24px]
                    backdrop-saturate-150

                    sm:p-6

                    lg:flex
                    lg:h-full
                    lg:flex-col
                "
            >
                {/* =========================================
                    TOP GLASS HIGHLIGHT
                ========================================= */}

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        inset-x-10
                        top-0
                        h-px

                        bg-gradient-to-r
                        from-transparent
                        via-white/60
                        to-transparent
                    "
                />

                {/* =========================================
                    BACKGROUND DECORATION
                ========================================= */}

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24

                        size-56
                        rounded-full

                        bg-secondary/20
                        blur-[75px]
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        -bottom-28
                        -left-20

                        size-56
                        rounded-full

                        bg-primary/15
                        blur-[85px]
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        -bottom-32
                        -right-20

                        size-48
                        rounded-full

                        bg-logoYellow/[0.07]
                        blur-[80px]
                    "
                />

                {/* =========================================
                    HEADER
                ========================================= */}

                <div
                    className="
                        relative
                        z-10

                        mb-5

                        flex
                        items-end
                        justify-between
                        gap-4
                    "
                >
                    <div>
                        <div
                            className="
                                mb-2
                                flex
                                items-center
                                gap-2
                            "
                        >
                            <span
                                className="
                                    h-[3px]
                                    w-7
                                    rounded-full

                                    bg-gradient-to-r
                                    from-logoYellow
                                    to-logoYellow/40
                                "
                            />

                            <span
                                className="
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[0.22em]
                                    text-logoYellow
                                "
                            >
                                Course Overview
                            </span>
                        </div>

                        <h2
                            className="
                                text-xl
                                font-bold
                                tracking-[-0.03em]
                                text-white
                            "
                        >
                            Quick Facts
                        </h2>
                    </div>

                    <span
                        className="
                            hidden

                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.15em]
                            text-white/35

                            sm:block
                        "
                    >
                        At a glance
                    </span>
                </div>

                {/* =========================================
                    FACT CARDS
                ========================================= */}

                <div
                    className="
                        relative
                        z-10

                        grid
                        gap-3

                        lg:flex-1
                        lg:content-center
                    "
                >
                    {facts.map(
                        (
                            fact,
                            index
                        ) => {
                            const Icon =
                                fact.icon;

                            const value =
                                values[
                                    fact.key
                                ] ||
                                "Not Available";

                            return (
                                <article
                                    key={
                                        fact.key
                                    }
                                    className={`
                                        group
                                        relative
                                        min-w-0
                                        overflow-hidden

                                        rounded-[20px]

                                        border
                                        border-white/15

                                        bg-gradient-to-r
                                        ${fact.card}

                                        px-4
                                        py-4

                                        shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]

                                        backdrop-blur-xl

                                        transition-all
                                        duration-300

                                        hover:-translate-y-[2px]
                                        hover:border-white/30
                                        hover:shadow-[0_18px_45px_rgba(0,0,0,0.22)]

                                        sm:px-5
                                    `}
                                >
                                    {/* LEFT ACCENT */}

                                    <span
                                        aria-hidden="true"
                                        className={`
                                            absolute
                                            bottom-3
                                            left-0
                                            top-3

                                            w-[3px]

                                            rounded-r-full

                                            ${fact.accent}
                                        `}
                                    />

                                    {/* COLOR GLOW */}

                                    <span
                                        aria-hidden="true"
                                        className={`
                                            pointer-events-none
                                            absolute
                                            -right-8
                                            -top-10

                                            size-28
                                            rounded-full

                                            opacity-70
                                            blur-[45px]

                                            transition-transform
                                            duration-500

                                            group-hover:scale-125

                                            ${fact.glow}
                                        `}
                                    />

                                    {/* TOP SHINE */}

                                    <span
                                        aria-hidden="true"
                                        className="
                                            pointer-events-none
                                            absolute
                                            inset-x-8
                                            top-0

                                            h-px

                                            bg-gradient-to-r
                                            from-transparent
                                            via-white/35
                                            to-transparent
                                        "
                                    />

                                    {/* CONTENT */}

                                    <div
                                        className="
                                            relative
                                            z-10

                                            flex
                                            min-h-[58px]
                                            items-center
                                            gap-4
                                        "
                                    >
                                        {/* ICON */}

                                        <div
                                            className={`
                                                relative

                                                grid
                                                size-12
                                                shrink-0
                                                place-items-center

                                                overflow-hidden

                                                rounded-[15px]

                                                border

                                                shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]

                                                transition-all
                                                duration-300

                                                group-hover:scale-105

                                                ${fact.iconBox}
                                            `}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="
                                                    absolute
                                                    inset-x-2
                                                    top-0

                                                    h-px
                                                    bg-white/45
                                                "
                                            />

                                            <Icon
                                                size={
                                                    19
                                                }
                                                strokeWidth={
                                                    2
                                                }
                                                aria-hidden="true"
                                                className="
                                                    relative
                                                    z-10
                                                "
                                            />
                                        </div>

                                        {/* TEXT */}

                                        <div
                                            className="
                                                min-w-0
                                                flex-1
                                            "
                                        >
                                            <p
                                                className={`
                                                    text-[8px]
                                                    font-bold
                                                    uppercase
                                                    tracking-[0.2em]

                                                    ${fact.label}
                                                `}
                                            >
                                                {
                                                    fact.title
                                                }
                                            </p>

                                            <p
                                                className="
                                                    mt-1

                                                    break-words

                                                    text-[13px]
                                                    font-bold
                                                    leading-[1.3]
                                                    text-white

                                                    sm:text-[14px]
                                                "
                                            >
                                                {
                                                    value
                                                }
                                            </p>

                                            {fact.key ===
                                                "intakes" &&
                                                intakesRaw &&
                                                intakesRaw !==
                                                    intakes && (
                                                    <p
                                                        title={
                                                            intakesRaw
                                                        }
                                                        className="
                                                            mt-1

                                                            line-clamp-1

                                                            text-[9px]
                                                            font-bold
                                                            text-logoYellow/80
                                                        "
                                                    >
                                                        {
                                                            intakesRaw
                                                        }
                                                    </p>
                                                )}
                                        </div>

                                        {/* NUMBER */}

                                        <div
                                            className="
                                                flex
                                                shrink-0
                                                items-center
                                                gap-3
                                            "
                                        >
                                            <span
                                                className="
                                                    h-8
                                                    w-px
                                                    bg-white/10
                                                "
                                            />

                                            <span
                                                className={`
                                                    text-[10px]
                                                    font-bold
                                                    tracking-[0.15em]

                                                    ${fact.number}
                                                `}
                                            >
                                                0
                                                {index +
                                                    1}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            );
                        }
                    )}
                </div>

                {/* =========================================
                    FOOTER
                ========================================= */}

                <div
                    className="
                        relative
                        z-10

                        mt-5

                        flex
                        items-center
                        justify-between
                        gap-4

                        border-t
                        border-white/10

                        pt-4
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <span
                            className="
                                size-1.5
                                shrink-0

                                rounded-full

                                bg-logoYellow

                                shadow-[0_0_12px_rgba(247,236,34,0.8)]
                            "
                        />

                        <p
                            className="
                                text-[9px]
                                font-semibold
                                text-white/45
                            "
                        >
                            Course information
                            at a glance
                        </p>
                    </div>

                    <div
                        aria-hidden="true"
                        className="
                            flex
                            shrink-0
                            gap-1.5
                        "
                    >
                        <span
                            className="
                                size-1.5
                                rounded-full
                                bg-primary
                            "
                        />

                        <span
                            className="
                                size-1.5
                                rounded-full
                                bg-secondary
                            "
                        />

                        <span
                            className="
                                size-1.5
                                rounded-full
                                bg-logoYellow
                            "
                        />
                    </div>
                </div>
            </div>
        </aside>
    );
}