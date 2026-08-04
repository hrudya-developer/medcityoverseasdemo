"use client";

import { useEffect } from "react";
import Link from "next/link";

import {
    BookOpenText,
    ChevronRight,
    Headset,
    MapPin,
    Rss,
    Sparkles,
    University,
    UserRound,
    X,
} from "lucide-react";

import ExploreMenu from "./ExploreMenu";
import WebsiteSwitchHorizontal from "./WebsiteSwitchHorizontal";

const menuItems = [
    {
        name: "About Us",
        description:
            "Learn more about Medcity Study Abroad",
        path: "/about-us",
        icon: Sparkles,
        iconBox:
            "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
    },
    {
        name: "Destinations",
        description:
            "Explore study destinations worldwide",
        path: "/destinations",
        icon: MapPin,
        iconBox:
            "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white",
    },
    {
        name: "Universities",
        description:
            "Find your ideal university",
        path: "/all-universities",
        icon: University,
        iconBox:
            "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
    },
    {
        name: "Courses",
        description:
            "Discover programs and courses",
        path: "/courses",
        icon: BookOpenText,
        iconBox:
            "bg-amber-100 text-amber-700 group-hover:bg-amber-400 group-hover:text-slate-900",
    },
];

const MobileMenu = ({
    open,
    closeMenu,
    openCounsellingPopup,
}) => {
    useEffect(() => {
        if (!open) {
            return undefined;
        }

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        };

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            document.body.style.overflow =
                previousOverflow;

            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, [open, closeMenu]);

    if (!open) {
        return null;
    }

    const handleCounselling = () => {
        closeMenu();
        openCounsellingPopup?.();
    };

    return (
        <div className="fixed inset-0 z-[9999] lg:hidden">
            {/* Overlay */}
            <button
                type="button"
                aria-label="Close navigation menu"
                onClick={closeMenu}
                className="
          absolute
          inset-0
          cursor-default
          bg-black/65
          backdrop-blur-[2px]
        "
            />

            {/* Mobile drawer */}
            <aside
                aria-label="Mobile navigation menu"
                className="
          absolute
          inset-y-0
          right-0
          flex
          h-[100dvh]
          w-[92vw]
          max-w-[380px]
          flex-col
          overflow-hidden
          bg-white
          shadow-[-20px_0_60px_rgba(15,23,42,0.28)]
          animate-[mobileMenuIn_.28s_ease-out]
          min-[420px]:w-[380px]
        "
            >
                {/* Header */}
                <header
                    className="
            relative
            isolate
            shrink-0
            overflow-hidden
            bg-gradient-to-br
            from-primary
            via-[#9b214b]
            to-darkPrimary
            px-4
            pb-4
            pt-[max(0.9rem,env(safe-area-inset-top))]
            text-white
          "
                >
                    <div
                        aria-hidden="true"
                        className="
              pointer-events-none
              absolute
              -right-12
              -top-14
              -z-10
              h-36
              w-36
              rounded-full
              border-[22px]
              border-white/[0.07]
            "
                    />

                    <div
                        aria-hidden="true"
                        className="
              pointer-events-none
              absolute
              -bottom-16
              left-8
              -z-10
              h-32
              w-32
              rounded-full
              bg-secondary/30
              blur-3xl
            "
                    />

                    <div
                        aria-hidden="true"
                        className="
              pointer-events-none
              absolute
              inset-0
              -z-10
              opacity-[0.08]
              [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)]
              [background-size:15px_15px]
            "
                    />

                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={closeMenu}
                        className="
              absolute
              right-3
              top-[max(0.75rem,env(safe-area-inset-top))]
              z-30
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/25
              bg-black/20
              text-white
              shadow-lg
              backdrop-blur-md
              transition
              hover:rotate-90
              hover:bg-white
              hover:text-primary
              active:scale-95
            "
                    >
                        <X
                            size={19}
                            strokeWidth={2.5}
                            aria-hidden="true"
                        />
                    </button>

                    <div className="flex items-start gap-3 pr-11">
                        <span
                            className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-white/20
                bg-white/15
                backdrop-blur-md
              "
                        >
                            <Sparkles
                                size={19}
                                aria-hidden="true"
                            />
                        </span>

                        <div className="min-w-0">
                            <h2
                                className="
                  truncate
                  text-base
                  font-extrabold
                  tracking-tight
                  min-[380px]:text-lg
                "
                            >
                                Explore Medcity
                            </h2>

                            <p
                                className="
                  mt-0.5
                  text-[11px]
                  leading-4
                  text-white/75
                  min-[380px]:text-xs
                "
                            >
                                Everything you need for your study
                                abroad journey.
                            </p>
                        </div>
                    </div>
                </header>

                {/* Scrollable navigation */}
                <div
                    className="
            min-h-0
            flex-1
            overflow-x-hidden
            overflow-y-auto
            overscroll-contain
            bg-gradient-to-b
            from-[#fffafb]
            via-white
            to-slate-50
            px-2.5
            py-2.5
            min-[380px]:px-3
            min-[380px]:py-3
          "
                >
                    <nav aria-label="Mobile navigation">
                        <ul className="space-y-2">
                            {menuItems.map(
                                ({
                                    name,
                                    description,
                                    path,
                                    icon: Icon,
                                    iconBox,
                                }) => (
                                    <li key={path}>
                                        <MobileMenuLink
                                            href={path}
                                            name={name}
                                            description={description}
                                            icon={Icon}
                                            iconBox={iconBox}
                                            onClick={closeMenu}
                                        />
                                    </li>
                                )
                            )}

                            <ExploreMenu
                                mobile
                                onNavigate={closeMenu}
                            />

                            <li>
                                <MobileMenuLink
                                    href="/blogs"
                                    name="Blogs"
                                    description="Read insights and student guides"
                                    icon={Rss}
                                    iconBox="
                    bg-secondary/10
                    text-secondary
                    group-hover:bg-secondary
                    group-hover:text-white
                  "
                                    onClick={closeMenu}
                                />
                            </li>

                            <li className="overflow-hidden pt-1">
                                <WebsiteSwitchHorizontal
                                    onNavigate={closeMenu}
                                />
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Bottom actions */}
                <footer
                    className="
            shrink-0
            bg-white
            px-2.5
            pb-[max(0.65rem,env(safe-area-inset-bottom))]
            pt-2.5
            shadow-[0_-10px_24px_rgba(15,23,42,0.07)]
            min-[380px]:px-3
          "
                >
                    <div
                        className="
              grid
              grid-cols-1
              gap-2
              min-[360px]:grid-cols-2
            "
                    >
                        <button
                            type="button"
                            onClick={handleCounselling}
                            className="
                group
                flex
                min-h-11
                min-w-0
                items-center
                justify-center
                gap-1.5
                rounded-xl
                bg-gradient-to-r
                from-primary
                to-darkPrimary
                px-2
                py-2
                text-center
                text-sm
                font-semibold
                leading-4
                text-white
                shadow-[0_10px_22px_rgba(192,31,83,0.22)]
                transition
                hover:cursor-pointer
                active:scale-[0.98]
                min-[400px]:text-sm
              "
                        >
                            <span
                                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-white/15
                "
                            >
                                <Headset
                                    size={15}
                                    aria-hidden="true"
                                />
                            </span>

                            <span className="min-w-0">
                                Free Counselling
                            </span>
                        </button>

                        <Link
                            href="/login-via-otp"
                            onClick={closeMenu}
                            className="
                group
                flex
                min-h-11
                min-w-0
                items-center
                justify-center
                gap-1.5
                rounded-xl
                bg-primary/[0.06]
                px-2
                py-2
                text-center
                text-sm
                font-semibold
                leading-4
                text-primary
                ring-1
                ring-inset
                ring-primary/20
                transition
                hover:cursor-pointer
                hover:bg-primary
                hover:text-white
                active:scale-[0.98]
                min-[400px]:text-sm
              "
                        >
                            <span
                                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-primary/10
                  group-hover:bg-white/15
                "
                            >
                                <UserRound
                                    size={15}
                                    aria-hidden="true"
                                />
                            </span>

                            <span className="min-w-0">
                                Student Login
                            </span>
                        </Link>
                    </div>
                </footer>
            </aside>
        </div>
    );
};

const MobileMenuLink = ({
    href,
    name,
    description,
    icon: Icon,
    iconBox,
    onClick,
}) => {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="
        group
        flex
        min-h-[62px]
        w-full
        min-w-0
        items-center
        justify-between
        gap-2
        overflow-hidden
        rounded-xl
        bg-white
        px-2.5
        py-2.5
        ring-1
        ring-inset
        ring-slate-100
        shadow-[0_5px_18px_rgba(15,23,42,0.045)]
        transition-all
        duration-300
        hover:ring-primary/15
        active:scale-[0.985]
        min-[380px]:min-h-[66px]
        min-[380px]:rounded-2xl
        min-[380px]:px-3
      "
        >
            <div
                className="
          flex
          min-w-0
          flex-1
          items-center
          gap-2.5
          min-[380px]:gap-3
        "
            >
                <span
                    className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            transition-all
            duration-300
            group-hover:-rotate-3
            group-hover:scale-105
            min-[380px]:h-11
            min-[380px]:w-11
            min-[380px]:rounded-2xl
            ${iconBox}
          `}
                >
                    <Icon
                        size={18}
                        strokeWidth={2.2}
                        aria-hidden="true"
                    />
                </span>

                <span className="min-w-0 flex-1">
                    <span
                        className="
              block
              truncate
              text-[13px]
              font-bold
              text-slate-800
              transition-colors
              group-hover:text-primary
              min-[380px]:text-sm
            "
                    >
                        {name}
                    </span>

                    <span
                        className="
              mt-0.5
              block
              line-clamp-1
              text-[10px]
              leading-4
              text-slate-500
              min-[380px]:text-[11px]
            "
                    >
                        {description}
                    </span>
                </span>
            </div>

            <span
                className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-slate-50
          text-slate-400
          transition-all
          group-hover:bg-primary
          group-hover:text-white
          min-[380px]:h-8
          min-[380px]:w-8
        "
            >
                <ChevronRight
                    size={15}
                    aria-hidden="true"
                />
            </span>
        </Link>
    );
};

export default MobileMenu;