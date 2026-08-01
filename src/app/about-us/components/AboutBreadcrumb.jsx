import Link from "next/link";

import {
    ChevronRight,
    Home,
} from "lucide-react";

const AboutBreadcrumb = () => {
    return (
        <nav
            aria-label="Breadcrumb"
            className="
                mb-5 inline-flex
                max-w-full rounded-full
                bg-logoYellow px-3.5 py-2
                shadow-sm backdrop-blur-sm
            "
        >
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-800">
                <li>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 font-semibold transition-colors hover:text-primary"
                    >
                        <Home
                            aria-hidden="true"
                            className="h-3.5 w-3.5"
                        />

                        Home
                    </Link>
                </li>

                <li
                    aria-hidden="true"
                    className="text-slate-400"
                >
                    <ChevronRight className="h-3.5 w-3.5" />
                </li>

                <li
                    aria-current="page"
                    className="font-bold text-darkPrimary"
                >
                    About Us
                </li>
            </ol>
        </nav>
    );
};

export default AboutBreadcrumb;