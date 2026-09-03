import Link from "next/link";

import {
    ArrowUpRight,
} from "lucide-react";

import cn from "@/lib/cn";

export default function ServiceCard({
    service,
    index,
}) {
    const {
        id,
        title,
        description,
        icon: Icon,
        theme,
    } = service;

    const normalizedTitle =
        String(title || "")
            .trim()
            .toLowerCase();

    const normalizedId =
        String(id || "")
            .trim()
            .toLowerCase();

    const isUniversityService =
        normalizedTitle.includes(
            "find universities"
        ) ||
        normalizedTitle.includes(
            "universities"
        ) ||
        normalizedId.includes(
            "universit"
        );

    const href =
        isUniversityService
            ? "/universities"
            : "/contact-us";

    /* =========================================================
       BRAND THEME
       1 → Secondary
       2 → Dark Primary
       3 → Logo Yellow
       4 → Primary
    ========================================================= */

    const actionThemes = [
        {
            background:
                "bg-secondary",

            iconText:
                "text-white",

            accentBackground:
                "bg-secondary",

            accentText:
                "text-secondary",

            border:
                "border-secondary/20",

            shadow:
                "shadow-[0_14px_32px_rgba(4,102,175,0.28)]",

            hoverShadow:
                "group-hover:shadow-[0_20px_42px_rgba(4,102,175,0.36)]",
        },

        {
            background:
                "bg-darkPrimary",

            iconText:
                "text-white",

            accentBackground:
                "bg-darkPrimary",

            accentText:
                "text-darkPrimary",

            border:
                "border-darkPrimary/20",

            shadow:
                "shadow-[0_14px_32px_rgba(99,26,51,0.28)]",

            hoverShadow:
                "group-hover:shadow-[0_20px_42px_rgba(99,26,51,0.36)]",
        },

        {
            background:
                "bg-logoYellow",

            iconText:
                "text-slate-950",

            accentBackground:
                "bg-logoYellow",

            /*
             * Keep small text darker for
             * accessibility/readability.
             */
            accentText:
                "text-[#9a8700]",

            border:
                "border-yellow-300/60",

            shadow:
                "shadow-[0_14px_32px_rgba(247,236,34,0.32)]",

            hoverShadow:
                "group-hover:shadow-[0_20px_42px_rgba(247,236,34,0.42)]",
        },

        {
            background:
                "bg-primary",

            iconText:
                "text-white",

            accentBackground:
                "bg-primary",

            accentText:
                "text-primary",

            border:
                "border-primary/20",

            shadow:
                "shadow-[0_14px_32px_rgba(192,31,83,0.28)]",

            hoverShadow:
                "group-hover:shadow-[0_20px_42px_rgba(192,31,83,0.36)]",
        },
    ];

    const actionTheme =
        actionThemes[
            index %
                actionThemes.length
        ];

    return (
        <article
            id={id}
            aria-labelledby={`${id}-title`}
            aria-describedby={`${id}-description`}
            data-aos="fade-up"
            data-aos-delay={index * 80}
            className={cn(`
                group
                relative
                isolate

                flex
                min-h-[390px]
                flex-col

                overflow-hidden

                rounded-[30px]

                border
                border-white/80

                bg-gradient-to-br
                ${theme.background}

                p-6

                shadow-[0_18px_50px_rgba(15,23,42,0.09)]

                transition-all
                duration-500
                ease-out

                hover:-translate-y-2

                hover:shadow-[0_32px_75px_rgba(15,23,42,0.15)]

                sm:p-7
            `)}
        >
            {/* =====================================================
                TOP GLOW
            ===================================================== */}

            <div
                aria-hidden="true"
                className={cn(`
                    pointer-events-none

                    absolute
                    -right-24
                    -top-24
                    -z-20

                    h-72
                    w-72

                    rounded-full

                    ${theme.circle}

                    opacity-[0.22]
                    blur-[90px]

                    transition-all
                    duration-700

                    group-hover:scale-125
                    group-hover:opacity-[0.34]
                `)}
            />

            {/* =====================================================
                BOTTOM GLOW
            ===================================================== */}

            <div
                aria-hidden="true"
                className={cn(`
                    pointer-events-none

                    absolute
                    -bottom-28
                    -left-28
                    -z-20

                    h-64
                    w-64

                    rounded-full

                    ${theme.circle}

                    opacity-[0.12]
                    blur-[95px]
                `)}
            />

            {/* =====================================================
                TOP LIGHT
            ===================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none

                    absolute
                    inset-x-0
                    top-0
                    -z-10

                    h-32

                    bg-gradient-to-b
                    from-white/35
                    to-transparent
                "
            />

            {/* =====================================================
                ICON
            ===================================================== */}

            <div
                className="
                    relative
                    z-10
                "
            >
                <div
                    className={cn(`
                        relative

                        flex
                        h-[68px]
                        w-[68px]
                        items-center
                        justify-center

                        overflow-hidden

                        rounded-[21px]

                        border

                        ${actionTheme.border}
                        ${actionTheme.background}
                        ${actionTheme.shadow}
                        ${actionTheme.hoverShadow}

                        transition-all
                        duration-500

                        group-hover:-translate-y-1
                        group-hover:scale-[1.06]
                    `)}
                >
                    {/* Inner glow */}

                    <div
                        aria-hidden="true"
                        className="
                            absolute
                            -right-5
                            -top-5

                            h-16
                            w-16

                            rounded-full

                            bg-white/20
                            blur-2xl
                        "
                    />

                    {/* Top highlight */}

                    <div
                        aria-hidden="true"
                        className="
                            absolute
                            inset-x-2
                            top-0

                            h-px

                            bg-gradient-to-r
                            from-transparent
                            via-white/70
                            to-transparent
                        "
                    />

                    <Icon
                        aria-hidden="true"
                        size={29}
                        strokeWidth={2.15}
                        className={cn(`
                            relative
                            z-10

                            ${actionTheme.iconText}

                            transition-transform
                            duration-500

                            group-hover:scale-105
                        `)}
                    />
                </div>
            </div>

            {/* =====================================================
                CONTENT
            ===================================================== */}

            <div
                className="
                    relative
                    z-10
                    mt-8
                "
            >
                {/* SERVICE LABEL */}

                <div
                    className="
                        mb-3

                        flex
                        items-center
                        gap-2
                    "
                >
                    {/* DOT */}

                    <span
                        aria-hidden="true"
                        className={cn(`
                            h-1.5
                            w-1.5

                            shrink-0

                            rounded-full

                            ${actionTheme.accentBackground}
                        `)}
                    />

                    <span
                        className="
                            text-[10px]
                            font-extrabold
                            uppercase
                            tracking-[0.18em]

                            text-slate-500
                        "
                    >
                        Study Abroad Service
                    </span>
                </div>

                {/* TITLE */}

                <h3
                    id={`${id}-title`}
                    className="
                        min-h-[60px]
                        max-w-[285px]
                        font-extrabold
                        leading-[1.17]
                        tracking-[-0.035em]

                        text-slate-950

                        sm:text-lg lg:text-xl
                    "
                >
                    {title}
                </h3>

                {/* TITLE LINE */}

                <div
                    aria-hidden="true"
                    className={cn(`
                        mt-4

                        h-[3px]
                        w-9

                        rounded-full

                        ${actionTheme.accentBackground}

                        transition-all
                        duration-500

                        group-hover:w-14
                    `)}
                />

                {/* DESCRIPTION */}

                <p
                    id={`${id}-description`}
                    className="
                        mt-4

                        min-h-[100px]
                        max-w-[305px]

                        text-[13px]
                        font-medium
                        leading-[1.8]

                        text-slate-600

                        sm:text-sm
                    "
                >
                    {description}
                </p>
            </div>

            {/* =====================================================
                FOOTER CTA
            ===================================================== */}

            <div
                className="
                    relative
                    z-10

                    mt-auto
                    pt-6
                "
            >
                <Link
                    href={href}
                    aria-label={`Learn more about ${title}`}
                    className="
                        relative

                        flex
                        items-center
                        justify-between

                        overflow-hidden

                        rounded-[20px]

                        border
                        border-white/80

                        bg-white/50

                        px-4
                        py-3.5

                        shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_10px_25px_rgba(15,23,42,0.055)]

                        backdrop-blur-xl

                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:bg-white/75

                        hover:shadow-[0_14px_34px_rgba(15,23,42,0.09)]
                    "
                >
                    {/* CTA GLOW */}

                    <div
                        aria-hidden="true"
                        className={cn(`
                            absolute
                            -left-8
                            top-1/2

                            h-20
                            w-24

                            -translate-y-1/2

                            rounded-full

                            ${actionTheme.accentBackground}

                            opacity-[0.08]
                            blur-2xl
                        `)}
                    />

                    {/* CTA TEXT */}

                    <div
                        className="
                            relative
                            z-10
                        "
                    >
                        <span
                            className={cn(`
                                block

                                text-[9px]
                                font-extrabold
                                uppercase
                                tracking-[0.16em]

                                ${actionTheme.accentText}

                                opacity-70
                            `)}
                        >
                            Explore
                        </span>

                        <span
                            className={cn(`
                                mt-0.5
                                block

                                text-[13px]
                                font-black

                                ${actionTheme.accentText}

                                transition-all
                                duration-300

                                group-hover:tracking-[0.01em]
                            `)}
                        >
                            {isUniversityService
                                ? "Find Universities"
                                : "Learn More"}
                        </span>
                    </div>

                    {/* CTA RIGHT */}

                    <div
                        className="
                            relative
                            z-10

                            ml-auto

                            flex
                            items-center
                            gap-3
                        "
                    >
                        {/* DIVIDER */}

                        <span
                            aria-hidden="true"
                            className="
                                h-8
                                w-px

                                bg-slate-900/10
                            "
                        />

                        {/* ARROW */}

                        <span
                            className={cn(`
                                relative

                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center

                                overflow-hidden

                                rounded-full

                                ${actionTheme.background}
                                ${actionTheme.iconText}
                                ${actionTheme.shadow}

                                transition-all
                                duration-300

                                group-hover:rotate-45
                                group-hover:scale-110
                            `)}
                        >
                            {/* Arrow glow */}

                            <div
                                aria-hidden="true"
                                className="
                                    absolute
                                    -right-3
                                    -top-3

                                    h-8
                                    w-8

                                    rounded-full

                                    bg-white/20
                                    blur-lg
                                "
                            />

                            <ArrowUpRight
                                size={17}
                                strokeWidth={2.35}
                                className="
                                    relative
                                    z-10
                                "
                            />
                        </span>
                    </div>
                </Link>
            </div>

            {/* =====================================================
                BOTTOM ACCENT
            ===================================================== */}

            <div
                aria-hidden="true"
                className={cn(`
                    absolute
                    bottom-0
                    left-7

                    h-[3px]
                    w-12

                    rounded-full

                    ${actionTheme.accentBackground}

                    transition-all
                    duration-500

                    group-hover:w-24
                `)}
            />
        </article>
    );
}