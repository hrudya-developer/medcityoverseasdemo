// components/header/MobileExploreMenu.jsx

"use client";

import {
    useState,
} from "react";

import Link from "next/link";

import {
    ChevronDown,
    ChevronRight,
} from "lucide-react";

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

export default function MobileExploreMenu({
    closeMenu,
}) {
    const [
        open,
        setOpen,
    ] = useState(false);

    return (
        <li>
            <button
                type="button"
                onClick={() =>
                    setOpen(
                        (current) =>
                            !current
                    )
                }
                aria-expanded={open}
                className="
                    flex
                    min-h-12
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    px-4
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:bg-white/10
                "
            >
                <span>
                    Explore
                </span>

                <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`
                        transition-transform
                        duration-300
                        ${
                            open
                                ? "rotate-180"
                                : ""
                        }
                    `}
                />
            </button>

            <div
                className={`
                    grid
                    transition-all
                    duration-300
                    ease-out

                    ${
                        open
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
                            bg-darkPrimary/30
                            p-2
                        "
                    >
                        {exploreItems.map(
                            (item) => (
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
                                    className="
                                        flex
                                        min-h-11
                                        items-center
                                        justify-between
                                        rounded-xl
                                        px-3
                                        py-2.5
                                        text-sm
                                        font-semibold
                                        text-white/90
                                        transition

                                        hover:bg-white
                                        hover:text-primary
                                    "
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
                                    />
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
        </li>
    );
}