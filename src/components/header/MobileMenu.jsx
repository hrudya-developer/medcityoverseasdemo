"use client";

import {
    useEffect,
    useState,
} from "react";

import Link from "next/link";

import {
    usePathname,
} from "next/navigation";

import {
    ChevronDown,
    ChevronRight,
    Headset,
    UserRound,
} from "lucide-react";

import navItems from "./navItems";
import WebsiteSwitchHorizontal from "./WebsiteSwitchHorizontal";

const exploreItems = [
    {
        name: "German Programs",
        path: "/german-programs",
    },
    {
        name: "Community Posts",
        path: "/community-posts",
    },
    {
        name: "Add-on Services",
        path: "/add-on-services",
    },
    {
        name: "Branches",
        path: "/branches",
    },
];

export default function MobileMenu({
    open,
    closeMenu,
    openCounsellingPopup,
}) {
    const pathname =
        usePathname();

    const [
        exploreOpen,
        setExploreOpen,
    ] = useState(false);

    useEffect(() => {
        closeMenu();

        setExploreOpen(
            false
        );
    }, [
        pathname,
        closeMenu,
    ]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleEscape = (
            event
        ) => {
            if (
                event.key ===
                "Escape"
            ) {
                closeMenu();
            }
        };

        document.body.style.overflow =
            "hidden";

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            document.body.style.overflow =
                "";

            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, [
        open,
        closeMenu,
    ]);

    const isActive = (
        path
    ) => {
        if (
            path === "/"
        ) {
            return (
                pathname === "/"
            );
        }

        return (
            pathname ===
                path ||
            pathname.startsWith(
                `${path}/`
            )
        );
    };

    const isExploreActive =
        exploreItems.some(
            (item) =>
                isActive(
                    item.path
                )
        );

    if (!open) {
        return null;
    }

    return (
        <div
            className="
                fixed
                inset-0
                top-16
                z-40
                bg-black/70
                backdrop-blur-md
                lg:hidden
            "
            onClick={
                closeMenu
            }
        >
            <nav
                id="mobile-navigation"
                aria-label="Mobile navigation"
                className="
                    relative
                    isolate
                    max-h-[calc(100dvh-4rem)]
                    overflow-x-hidden
                    overflow-y-auto

                    border-t
                    border-white/10

                    bg-gradient-to-b
                    from-[#2a0715]
                    via-darkPrimary
                    to-[#14060c]

                    px-4
                    py-5

                    shadow-[0_30px_90px_rgba(0,0,0,0.55)]
                "
                onClick={(
                    event
                ) =>
                    event.stopPropagation()
                }
            >
                {/* BACKGROUND GLOW */}

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24
                        -z-10
                        h-72
                        w-72
                        rounded-full
                        bg-primary/25
                        blur-[90px]
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        -left-28
                        top-[32%]
                        -z-10
                        h-72
                        w-72
                        rounded-full
                        bg-secondary/15
                        blur-[100px]
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        -bottom-36
                        right-0
                        -z-10
                        h-80
                        w-80
                        rounded-full
                        bg-primary/15
                        blur-[100px]
                    "
                />

                {/* DOT PATTERN */}

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        -z-10
                        opacity-[0.055]
                        [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)]
                        [background-size:22px_22px]
                    "
                />

                {/* TOP SHINE */}

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        top-0
                        -z-10
                        h-40
                        bg-gradient-to-b
                        from-white/[0.05]
                        to-transparent
                    "
                />

                {/* =================================================
                    MAIN MENU
                ================================================= */}

                <ul className="space-y-2">
                    {navItems.map(
                        (
                            item
                        ) => {
                            const active =
                                isActive(
                                    item.path
                                );

                            return (
                                <li
                                    key={
                                        item.path
                                    }
                                >
                                    <Link
                                        href={
                                            item.path
                                        }
                                        onClick={
                                            closeMenu
                                        }
                                        aria-current={
                                            active
                                                ? "page"
                                                : undefined
                                        }
                                        className={`
                                            flex
                                            min-h-12
                                            items-center
                                            justify-between
                                            rounded-xl
                                            border
                                            px-4
                                            py-3
                                            font-semibold
                                            transition-all
                                            duration-300

                                            ${
                                                active
                                                    ? `
                                                        border-white/60
                                                        bg-white
                                                        text-darkPrimary
                                                        shadow-[0_10px_25px_rgba(0,0,0,0.22)]
                                                      `
                                                    : `
                                                        border-white/[0.06]
                                                        bg-white/[0.035]
                                                        text-white/90
                                                        hover:border-white/15
                                                        hover:bg-white/[0.08]
                                                        hover:text-white
                                                      `
                                            }
                                        `}
                                    >
                                        <span>
                                            {
                                                item.name
                                            }
                                        </span>

                                        <ChevronRight
                                            size={
                                                18
                                            }
                                            aria-hidden="true"
                                            className="
                                                shrink-0
                                                opacity-75
                                            "
                                        />
                                    </Link>
                                </li>
                            );
                        }
                    )}

                    {/* =================================================
                        EXPLORE
                    ================================================= */}

                    <li>
                        <button
                            type="button"
                            onClick={() =>
                                setExploreOpen(
                                    (
                                        current
                                    ) =>
                                        !current
                                )
                            }
                            aria-expanded={
                                exploreOpen
                            }
                            aria-controls="mobile-explore-menu"
                            className={`
                                flex
                                min-h-12
                                w-full
                                items-center
                                justify-between
                                rounded-xl
                                border
                                px-4
                                py-3
                                text-left
                                font-semibold
                                transition-all
                                duration-300

                                ${
                                    isExploreActive
                                        ? `
                                            border-white/60
                                            bg-white
                                            text-darkPrimary
                                            shadow-[0_10px_25px_rgba(0,0,0,0.22)]
                                          `
                                        : `
                                            border-white/[0.06]
                                            bg-white/[0.035]
                                            text-white/90
                                            hover:border-white/15
                                            hover:bg-white/[0.08]
                                            hover:text-white
                                          `
                                }
                            `}
                        >
                            <span>
                                Explore
                            </span>

                            <ChevronDown
                                size={
                                    18
                                }
                                aria-hidden="true"
                                className={`
                                    shrink-0
                                    transition-transform
                                    duration-300

                                    ${
                                        exploreOpen
                                            ? "rotate-180"
                                            : ""
                                    }
                                `}
                            />
                        </button>

                        <div
                            id="mobile-explore-menu"
                            className={`
                                grid
                                transition-all
                                duration-300
                                ease-out

                                ${
                                    exploreOpen
                                        ? "mt-2 grid-rows-[1fr] opacity-100"
                                        : "grid-rows-[0fr] opacity-0"
                                }
                            `}
                        >
                            <div className="overflow-hidden">
                                <div
                                    className="
                                        space-y-1
                                        rounded-2xl
                                        border
                                        border-white/10
                                        bg-black/20
                                        p-2
                                        shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
                                        backdrop-blur-xl
                                    "
                                >
                                    {exploreItems.map(
                                        (
                                            item
                                        ) => {
                                            const active =
                                                isActive(
                                                    item.path
                                                );

                                            return (
                                                <Link
                                                    key={
                                                        item.path
                                                    }
                                                    href={
                                                        item.path
                                                    }
                                                    onClick={
                                                        closeMenu
                                                    }
                                                    aria-current={
                                                        active
                                                            ? "page"
                                                            : undefined
                                                    }
                                                    className={`
                                                        flex
                                                        min-h-11
                                                        items-center
                                                        justify-between
                                                        rounded-xl
                                                        border
                                                        px-3
                                                        py-2.5
                                                        text-sm
                                                        font-semibold
                                                        transition-all
                                                        duration-300

                                                        ${
                                                            active
                                                                ? `
                                                                    border-white/50
                                                                    bg-white
                                                                    text-darkPrimary
                                                                  `
                                                                : `
                                                                    border-transparent
                                                                    text-white/80
                                                                    hover:border-white/10
                                                                    hover:bg-white/[0.07]
                                                                    hover:text-white
                                                                  `
                                                        }
                                                    `}
                                                >
                                                    <span>
                                                        {
                                                            item.name
                                                        }
                                                    </span>

                                                    <ChevronRight
                                                        size={
                                                            16
                                                        }
                                                        aria-hidden="true"
                                                        className="
                                                            shrink-0
                                                        "
                                                    />
                                                </Link>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>

                {/* =================================================
                    WEBSITE SWITCH
                    BELOW MENU LIST
                ================================================= */}

                <div
                    className="
                        relative
                        mt-5
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.055]
                        p-2
                        shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.22)]
                        backdrop-blur-xl
                    "
                >
                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            inset-x-8
                            top-0
                            h-px
                            bg-gradient-to-r
                            from-transparent
                            via-logoYellow/60
                            to-transparent
                        "
                    />

                    <WebsiteSwitchHorizontal
                        onNavigate={
                            closeMenu
                        }
                    />
                </div>

                {/* =================================================
                    ACTION BUTTONS
                ================================================= */}

                <div
                    className="
                        mt-5
                        space-y-3
                        border-t
                        border-white/10
                        pt-5
                    "
                >
                    <button
                        type="button"
                        onClick={() => {
                            closeMenu();

                            openCounsellingPopup?.();
                        }}
                        className="
                            flex
                            min-h-12
                            w-full
                            items-center
                            justify-center
                            gap-2

                            rounded-xl

                            bg-logoYellow

                            px-4

                            font-black
                            text-darkPrimary

                            shadow-[0_10px_26px_rgba(247,236,34,0.18)]

                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:bg-white
                            hover:shadow-[0_14px_32px_rgba(0,0,0,0.25)]

                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-white
                            focus-visible:ring-offset-2
                            focus-visible:ring-offset-darkPrimary
                        "
                    >
                        <Headset
                            size={
                                18
                            }
                            aria-hidden="true"
                        />

                        Get Free
                        Counselling
                    </button>

                    <Link
                        href="/login"
                        onClick={
                            closeMenu
                        }
                        className="
                            flex
                            min-h-12
                            w-full
                            items-center
                            justify-center
                            gap-2

                            rounded-xl

                            border
                            border-white/25

                            bg-white/[0.06]

                            px-4

                            font-bold
                            text-white

                            shadow-sm
                            backdrop-blur-md

                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:border-white/70
                            hover:bg-white
                            hover:text-darkPrimary

                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-white
                            focus-visible:ring-offset-2
                            focus-visible:ring-offset-darkPrimary
                        "
                    >
                        <UserRound
                            size={
                                18
                            }
                            aria-hidden="true"
                        />

                        Student Login
                    </Link>
                </div>
            </nav>
        </div>
    );
}