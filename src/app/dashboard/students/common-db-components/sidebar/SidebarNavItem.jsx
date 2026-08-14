"use client";

import Link from "next/link";
import {
    ChevronRight,
} from "lucide-react";


export default function SidebarNavItem({
    icon: Icon,
    label,
    href,
    active,
    onNavigate,
    count = null,
}) {
    const hasCount =
        count !== null &&
        count !== undefined;

    return (
        <div className="group/nav relative">
            <Link
                href={href}
                aria-label={
                    hasCount
                        ? `${label} (${count})`
                        : label
                }
                onClick={(event) => {
                    if (href === "#") {
                        event.preventDefault();
                    }

                    onNavigate?.();
                }}
                className={`
                    group
                    relative
                    flex
                    min-h-[52px]
                    items-center
                    overflow-hidden
                    rounded-[16px]
                    border
                    transition-all
                    duration-200

                    md:justify-center
                    md:px-0
                    md:py-2

                    xl:justify-start
                    xl:gap-3
                    xl:px-3
                    xl:py-2.5

                    ${
                        active
                            ? `
                                border-[#ff82ab]/25
                                bg-gradient-to-r
                                from-[#d52a63]/80
                                via-[#a91d4a]/72
                                to-[#741a39]/70
                                text-white
                                shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_10px_28px_rgba(192,31,83,0.30)]
                                backdrop-blur-xl
                            `
                            : `
                                border-transparent
                                text-white/65

                                hover:border-white/[0.08]
                                hover:bg-white/[0.075]
                                hover:text-white
                            `
                    }
                `}
            >
                {/* Active edge */}
                {active && (
                    <span
                        className="
                            absolute
                            bottom-2
                            left-0
                            top-2
                            w-[3px]
                            rounded-r-full
                            bg-gradient-to-b
                            from-[#ffe563]
                            via-[#ffc144]
                            to-[#ff9b42]
                            shadow-[0_0_14px_rgba(255,198,66,0.78)]

                            md:hidden
                            xl:block
                        "
                    />
                )}

                {/* Icon */}
                <span
                    className={`
                        relative
                        grid
                        h-10
                        w-10
                        shrink-0
                        place-items-center
                        rounded-[13px]
                        border
                        backdrop-blur-xl
                        transition-all
                        duration-200

                        ${
                            active
                                ? `
                                    border-white/[0.15]
                                    bg-white/[0.13]
                                    text-white
                                    shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_8px_20px_rgba(0,0,0,0.19)]
                                `
                                : `
                                    border-white/[0.05]
                                    bg-black/[0.10]
                                    text-white/70

                                    group-hover:border-white/[0.10]
                                    group-hover:bg-white/[0.085]
                                    group-hover:text-white
                                `
                        }
                    `}
                >
                    <Icon
                        size={18}
                        strokeWidth={
                            active
                                ? 2.35
                                : 2
                        }
                    />

                    {/* Active dot for icon-only sidebar */}
                    {active && (
                        <span
                            className="
                                absolute
                                -right-1
                                -top-1
                                hidden
                                h-2.5
                                w-2.5
                                rounded-full
                                border-2
                                border-[#4d1029]
                                bg-[#ffd958]
                                shadow-[0_0_9px_rgba(255,217,88,0.85)]

                                md:block
                                xl:hidden
                            "
                        />
                    )}

                    {/* Compact count badge */}
                    {hasCount &&
                        Number(count) > 0 && (
                        <span
                            className="
                                absolute
                                -bottom-1
                                -right-1

                                hidden

                                min-w-[18px]
                                items-center
                                justify-center

                                rounded-full
                                border
                                border-[#32101f]

                                bg-[#c01f53]

                                px-1
                                py-0.5

                                text-[8px]
                                font-black
                                leading-none
                                text-white

                                shadow-[0_4px_12px_rgba(192,31,83,0.38)]

                                md:inline-flex
                                xl:hidden
                            "
                        >
                            {count}
                        </span>
                    )}
                </span>

                {/* Label */}
                <span
                    className="
                        min-w-0
                        flex-1
                        truncate
                        text-[13px]
                        font-semibold
                        tracking-[-0.01em]

                        md:hidden
                        xl:flex
                        xl:items-center
                        xl:gap-1.5
                    "
                >
                    <span className="truncate">
                        {label}
                    </span>

                    {hasCount && (
                        <span
                            className={`
                                shrink-0
                                text-[12px]
                                font-bold

                                ${
                                    active
                                        ? "text-white/90"
                                        : "text-white/55"
                                }
                            `}
                        >
                            ({count})
                        </span>
                    )}
                </span>

                {/* Arrow */}
                <ChevronRight
                    size={14}
                    className={`
                        shrink-0
                        transition-all
                        duration-200

                        md:hidden
                        xl:block

                        ${
                            active
                                ? "text-white/65"
                                : `
                                    -translate-x-1
                                    text-white/20
                                    opacity-0

                                    group-hover:translate-x-0
                                    group-hover:opacity-100
                                `
                        }
                    `}
                />
            </Link>

            {/* Compact sidebar tooltip */}
            <div
                className="
                    pointer-events-none
                    absolute
                    left-[calc(100%+13px)]
                    top-1/2
                    z-[100]

                    hidden
                    -translate-y-1/2
                    translate-x-1

                    whitespace-nowrap
                    rounded-[11px]
                    border
                    border-white/[0.10]
                    bg-[#10121c]/95
                    px-3
                    py-2

                    text-[11px]
                    font-bold
                    text-white

                    opacity-0

                    shadow-[0_12px_32px_rgba(0,0,0,0.35)]
                    backdrop-blur-xl

                    transition-all
                    duration-150

                    group-hover/nav:translate-x-0
                    group-hover/nav:opacity-100

                    md:block
                    xl:hidden
                "
            >
                <span>
                    {label}
                </span>

                {hasCount && (
                    <span className="ml-1 text-white/65">
                        ({count})
                    </span>
                )}

                <span
                    className="
                        absolute
                        right-full
                        top-1/2
                        -translate-y-1/2

                        border-[6px]
                        border-transparent
                        border-r-[#10121c]
                    "
                />
            </div>
        </div>
    );
}