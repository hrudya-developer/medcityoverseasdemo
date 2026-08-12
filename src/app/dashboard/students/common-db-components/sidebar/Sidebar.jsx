"use client";

import Image from "next/image";

import {
    LogOut,
    Sparkles,
    X,
} from "lucide-react";

import SidebarNavItem from "./SidebarNavItem";
import {
    isSidebarItemActive,
    sidebarItems,
} from "./sidebarData";

export default function Sidebar({
    open,
    onClose,
    pathname,
}) {
    return (
        <aside
            className={`
        fixed
        inset-y-0
        left-0
        z-50

        flex
        w-[292px]
        flex-col

        overflow-hidden
        text-white

        shadow-[18px_0_65px_rgba(2,6,23,0.24)]

        transition-all
        duration-300
        ease-out

        md:w-[88px]
        md:translate-x-0

        xl:w-[280px]

        ${open
                    ? "translate-x-0"
                    : "-translate-x-full"
                }
      `}
        >
            <SidebarBackground />

            <div className="relative z-10 flex h-full min-h-0 flex-col">
                <SidebarHeader onClose={onClose} />

                <WorkspaceLabel />

                {/* Navigation */}
                <nav
                    className="
            custom-scrollbar
            min-h-0
            flex-1
            overflow-y-auto
            overflow-x-visible

            px-3
            py-3

            md:px-2.5
            md:py-4

            xl:px-4
          "
                >
                    <div
                        className="
              space-y-1

              rounded-[24px]

              border
              border-white/[0.10]

              bg-white/[0.055]

              p-2

              shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_55px_rgba(0,0,0,0.30)]

              backdrop-blur-[22px]

              md:rounded-[22px]
              md:p-1.5

              xl:rounded-[26px]
              xl:p-2
            "
                    >
                        {sidebarItems.map((item) => (
                            <SidebarNavItem
                                key={item.label}
                                {...item}
                                active={isSidebarItemActive(
                                    pathname,
                                    item.href
                                )}
                                onNavigate={onClose}
                            />
                        ))}
                    </div>
                </nav>

                <SidebarLogout />
            </div>
        </aside>
    );
}

/* =========================================================
   BACKGROUND
   ========================================================= */

function SidebarBackground() {
    return (
        <>
            {/* Dark foundation */}
            <div
                className="
          absolute
          inset-0
          bg-[linear-gradient(155deg,#000000_0%,#111322_52%,#301226_83%,#081323_100%)]
        "
            />

            {/* Diagonal glass reflection */}
            <div
                className="
          pointer-events-none
          absolute
          -left-[45%]
          -top-[8%]
          h-[45%]
          w-[175%]
          rotate-[-34deg]
          bg-gradient-to-b
          from-white/[0.10]
          via-white/[0.025]
          to-transparent
          blur-sm
        "
            />

            {/* Grid pattern */}
            <div
                className="
          pointer-events-none
          absolute
          inset-0

          bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)]
          bg-[size:28px_28px]

          opacity-80
        "
            />

            {/* Texture/glow */}
            <div
                className="
          pointer-events-none
          absolute
          inset-0

          bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.06),transparent_25%),radial-gradient(circle_at_80%_80%,rgba(18,98,181,0.12),transparent_32%)]
        "
            />

            <div
                className="
          pointer-events-none
          absolute
          -left-24
          top-20
          h-72
          w-72
          rounded-full
          bg-[#c01f53]/20
          blur-[95px]
        "
            />

            <div
                className="
          pointer-events-none
          absolute
          -right-28
          bottom-12
          h-80
          w-80
          rounded-full
          bg-[#1565c0]/14
          blur-[110px]
        "
            />

            <div
                className="
          pointer-events-none
          absolute
          inset-y-0
          right-0
          w-px

          bg-gradient-to-b
          from-transparent
          via-white/[0.16]
          to-transparent
        "
            />
        </>
    );
}

/* =========================================================
   HEADER
   ========================================================= */

function SidebarHeader({ onClose }) {
    return (
        <div
            className="
        relative
        flex
        h-[88px]
        shrink-0
        items-center
        justify-between

        border-b
        border-white/[0.07]

        bg-white/[0.025]

        px-5

        backdrop-blur-xl

        md:justify-center
        md:px-3

        xl:justify-between
        xl:px-5
      "
        >
            {/* Full logo */}
            <div className="md:hidden xl:block">
                <Image
                    src="/logo.png"
                    alt="Medcity Study Abroad"
                    width={180}
                    height={60}
                    priority
                    className="h-auto w-[172px] object-contain"
                />
            </div>

            {/* Compact logo */}
            <div
                className="
          hidden

          md:grid
          md:h-12
          md:w-12
          md:place-items-center

          md:rounded-[17px]

          md:border
          md:border-white/[0.12]

          md:bg-white/[0.07]

          md:text-lg
          md:font-black
          md:text-white

          md:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_12px_30px_rgba(0,0,0,0.28)]

          md:backdrop-blur-xl

          xl:hidden
        "
            >
                M
            </div>

            {/* Mobile close */}
            <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="
          grid
          h-10
          w-10
          shrink-0
          place-items-center

          rounded-[14px]

          border
          border-white/[0.12]

          bg-white/[0.075]

          text-white/80

          shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_22px_rgba(0,0,0,0.20)]

          backdrop-blur-xl

          transition-all
          duration-200

          hover:rotate-90
          hover:bg-white/[0.14]
          hover:text-white

          active:scale-95

          md:hidden
        "
            >
                <X size={18} />
            </button>
        </div>
    );
}

/* =========================================================
   WORKSPACE
   ========================================================= */

function WorkspaceLabel() {
    return (
        <div
            className="
        px-5
        pb-2
        pt-5

        md:hidden

        xl:block
      "
        >
            <div className="flex items-center gap-2">
                <span
                    className="
            grid
            h-5
            w-5
            place-items-center
            rounded-md
            bg-[#c01f53]/15
          "
                >
                    <Sparkles
                        size={10}
                        className="text-[#ff94b6]"
                    />
                </span>

                <p
                    className="
            text-[9px]
            font-black
            uppercase
            tracking-[0.2em]
            text-white/42
          "
                >
                    Student workspace
                </p>
            </div>
        </div>
    );
}

/* =========================================================
   LOGOUT
   ========================================================= */

function SidebarLogout() {
    return (
        <div
            className="
        shrink-0

        border-t
        border-white/[0.07]

        bg-white/[0.015]

        p-3

        backdrop-blur-xl

        md:p-2.5

        xl:p-4
      "
        >
            <button
                type="button"
                aria-label="Logout"
                title="Logout"
                className="
          group

          flex
          w-full
          items-center

          rounded-[16px]

          border
          border-white/[0.08]

          bg-white/[0.045]

          text-white/62

          backdrop-blur-xl

          transition-all
          duration-200

          hover:border-red-300/15
          hover:bg-red-400/[0.08]
          hover:text-red-100

          md:justify-center
          md:p-2

          xl:justify-start
          xl:gap-3
          xl:px-3
          xl:py-2.5
        "
            >
                <span
                    className="
            grid
            h-10
            w-10
            shrink-0
            place-items-center

            rounded-[13px]

            border
            border-white/[0.05]

            bg-black/[0.08]

            group-hover:bg-red-400/10
          "
                >
                    <LogOut size={18} />
                </span>

                <span
                    className="
            text-[13px]
            font-semibold

            md:hidden

            xl:block
          "
                >
                    Logout
                </span>
            </button>
        </div>
    );
}