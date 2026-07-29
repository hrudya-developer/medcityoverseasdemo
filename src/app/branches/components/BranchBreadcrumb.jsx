import Link from "next/link";

import {
    ChevronRight,
    Home,
} from "lucide-react";

export default function BranchBreadcrumb() {
    return (
        <nav
            aria-label="Breadcrumb"
            className="
        mb-5 inline-flex
        rounded-full
        border border-logoYellow/60
        bg-logoYellow
        px-3 py-2
        shadow-[0_8px_22px_rgba(247,236,34,0.22)]
      "
        >
            <ol
                className="
          flex flex-wrap items-center
          justify-center gap-1.5
          text-xs font-semibold
          text-slate-800
          sm:gap-2 sm:text-sm
        "
            >
                <li>
                    <Link
                        href="/"
                        className="
              group inline-flex items-center gap-1.5
              rounded-full px-2 py-1
              transition-colors duration-200
              hover:bg-white/60
              hover:text-darkPrimary
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-darkPrimary/30
            "
                    >
                        <Home
                            className="
                h-3.5 w-3.5
                text-darkPrimary
                transition-transform duration-200
                group-hover:-translate-y-0.5
                sm:h-4 sm:w-4
              "
                            strokeWidth={2.4}
                        />

                        Home
                    </Link>
                </li>

                <li
                    aria-hidden="true"
                    className="
            flex h-5 w-5
            items-center justify-center
            rounded-full
            bg-white/55
          "
                >
                    <ChevronRight
                        className="
              h-3.5 w-3.5
              text-darkPrimary/70
            "
                        strokeWidth={2.5}
                    />
                </li>

                <li
                    aria-current="page"
                    className="
            rounded-full
            px-3 py-1
            text-slate-800
          "
                >
                    Medcity Branches
                </li>
            </ol>
        </nav>
    );
}