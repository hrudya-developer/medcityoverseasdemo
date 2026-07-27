import Link from "next/link";
import {
    Globe2,
    GraduationCap,
} from "lucide-react";

const WebsiteSwitch = () => {
    return (
        <nav
            aria-label="Medcity website selection"
            className="flex items-center gap-2"
        >
            {/* Study Abroad */}
            <Link
                href="/"
                aria-current="page"
                className="
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
          border-darkPrimary
          bg-darkPrimary
          px-4
          text-[13px]
          font-semibold
          text-white
          shadow-[0_7px_18px_rgba(99,26,51,0.28)]
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:shadow-[0_9px_22px_rgba(99,26,51,0.34)]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-darkPrimary/40
          focus-visible:ring-offset-2
        "
            >
                <span
                    aria-hidden="true"
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
            transition-transform
            duration-300
            group-hover:rotate-6
            group-hover:scale-105
          "
                >
                    <Globe2
                        size={17}
                        strokeWidth={2.3}
                    />
                </span>

                <span className="whitespace-nowrap">
                    Study Abroad
                </span>
            </Link>

            {/* Medcity Academy */}
            <a
                href="https://medcityacademy.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Medcity Academy website in a new tab"
                className="
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
          border-secondary
          bg-secondary
          px-4
          text-[13px]
          font-semibold
          text-white
          shadow-[0_5px_16px_rgba(4,102,175,0.22)]
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-[#03558f]
          hover:shadow-[0_9px_22px_rgba(4,102,175,0.30)]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-secondary/40
          focus-visible:ring-offset-2
        "
            >
                <span
                    aria-hidden="true"
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
            transition-transform
            duration-300
            group-hover:-rotate-6
            group-hover:scale-105
          "
                >
                    <GraduationCap
                        size={17}
                        strokeWidth={2.3}
                    />
                </span>

                <span className="whitespace-nowrap">
                    Academy
                </span>
            </a>
        </nav>
    );
};

export default WebsiteSwitch;