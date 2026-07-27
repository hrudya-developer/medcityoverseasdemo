"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";
import {
    usePathname,
    useRouter,
} from "next/navigation";
import {
    Globe2,
    GraduationCap,
    LoaderCircle,
} from "lucide-react";

const WebsiteSwitch = () => {
    const router = useRouter();
    const pathname = usePathname();

    const timerRef = useRef(null);

    const [activeTab, setActiveTab] =
        useState("study");

    const [isSwitching, setIsSwitching] =
        useState(false);

    useEffect(() => {
        if (pathname === "/") {
            setActiveTab("study");
        }
    }, [pathname]);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                window.clearTimeout(
                    timerRef.current
                );
            }
        };
    }, []);

    const clearTimer = () => {
        if (timerRef.current) {
            window.clearTimeout(
                timerRef.current
            );

            timerRef.current = null;
        }
    };

    const handleStudyAbroad = () => {
        if (isSwitching) {
            return;
        }

        clearTimer();

        setActiveTab("study");
        setIsSwitching(true);

        timerRef.current =
            window.setTimeout(() => {
                router.push("/");
                setIsSwitching(false);
            }, 250);
    };

    const handleAcademy = () => {
        if (isSwitching) {
            return;
        }

        clearTimer();

        setActiveTab("academy");
        setIsSwitching(true);

        window.open(
            "https://medcityacademy.com/",
            "_blank",
            "noopener,noreferrer"
        );

        timerRef.current =
            window.setTimeout(() => {
                setActiveTab("study");
                setIsSwitching(false);
            }, 650);
    };

    const isStudyActive =
        activeTab === "study";

    const isAcademyActive =
        activeTab === "academy";

    return (
        <div
            className="
        flex
        items-center
        gap-2
      "
        >
            {/* Study Abroad */}
            <button
                type="button"
                onClick={handleStudyAbroad}
                disabled={isSwitching}
                aria-pressed={isStudyActive}
                className={`
          group
          relative
          flex
          h-[47px]
          items-center
          justify-center
          gap-2.5
          overflow-hidden
          rounded-xl
          border
          px-4
          text-[13px]
          font-semibold
          transition-all
          duration-300
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-darkPrimary/40
          focus-visible:ring-offset-2
          disabled:cursor-default
          ${isStudyActive
                        ? `
                  border-darkPrimary
                  bg-darkPrimary
                  text-white
                  shadow-[0_7px_18px_rgba(99,26,51,0.28)]
                `
                        : `
                  border-darkPrimary/15
                  bg-white
                  text-darkPrimary
                  shadow-[0_5px_16px_rgba(15,23,42,0.09)]
                  hover:-translate-y-0.5
                  hover:border-darkPrimary/30
                  hover:bg-darkPrimary
                  hover:text-white
                  hover:shadow-[0_9px_22px_rgba(99,26,51,0.22)]
                `
                    }
        `}
            >
                <span
                    className={`
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            transition-all
            duration-300
            ${isStudyActive
                            ? `
                    bg-white/15
                    text-white
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.30)]
                  `
                            : `
                    bg-darkPrimary/10
                    text-darkPrimary
                    group-hover:rotate-6
                    group-hover:scale-105
                    group-hover:bg-white/15
                    group-hover:text-white
                  `
                        }
          `}
                >
                    {isSwitching &&
                        isStudyActive ? (
                        <LoaderCircle
                            size={17}
                            className="animate-spin"
                            aria-hidden="true"
                        />
                    ) : (
                        <Globe2
                            size={17}
                            strokeWidth={2.3}
                            aria-hidden="true"
                        />
                    )}
                </span>

                <span className="whitespace-nowrap">
                    Study Abroad
                </span>
            </button>

            {/* Academy */}
            <button
                type="button"
                onClick={handleAcademy}
                disabled={isSwitching}
                aria-pressed={isAcademyActive}
                className={`
          group
          relative
          flex
          h-[47px]
          items-center
          justify-center
          gap-2.5
          overflow-hidden
          rounded-xl
          border
          px-4
          text-[13px]
          font-semibold
          transition-all
          duration-300
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-secondary/40
          focus-visible:ring-offset-2
          disabled:cursor-default
          ${isAcademyActive
                        ? `
                  border-secondary
                  bg-secondary
                  text-white
                  shadow-[0_7px_18px_rgba(4,102,175,0.28)]
                `
                        : `
                  border-secondary
                  bg-secondary
                  text-white
                  shadow-[0_5px_16px_rgba(4,102,175,0.22)]
                  hover:-translate-y-0.5
                  hover:bg-[#03558f]
                  hover:shadow-[0_9px_22px_rgba(4,102,175,0.30)]
                `
                    }
        `}
            >
                <span
                    className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-white/15
            text-white
            shadow-[inset_0_1px_0_rgba(255,255,255,0.30)]
            transition-all
            duration-300
            group-hover:-rotate-6
            group-hover:scale-105
          "
                >
                    {isSwitching &&
                        isAcademyActive ? (
                        <LoaderCircle
                            size={17}
                            className="animate-spin"
                            aria-hidden="true"
                        />
                    ) : (
                        <GraduationCap
                            size={17}
                            strokeWidth={2.3}
                            aria-hidden="true"
                        />
                    )}
                </span>

                <span className="whitespace-nowrap">
                    Academy
                </span>
            </button>
        </div>
    );
};

export default WebsiteSwitch;