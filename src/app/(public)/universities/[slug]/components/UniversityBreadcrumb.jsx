import Link from "next/link";

import {
    ChevronRight,
    Home,
    Landmark,
} from "lucide-react";

export default function UniversityBreadcrumb({
    universityName,
}) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="mb-8 flex justify-center lg:justify-start"
        >
            <ol className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white/80 backdrop-blur-xl sm:px-5">
                <li>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 font-semibold transition hover:text-logoYellow"
                    >
                        <Home
                            size={14}
                            aria-hidden="true"
                        />

                        Home
                    </Link>
                </li>

                <li
                    aria-hidden="true"
                    className="text-white/40"
                >
                    <ChevronRight size={14} />
                </li>

                <li>
                    <Link
                        href="/universities"
                        className="inline-flex items-center gap-1.5 font-semibold transition hover:text-logoYellow"
                    >
                        <Landmark
                            size={14}
                            aria-hidden="true"
                        />

                        Universities
                    </Link>
                </li>

                <li
                    aria-hidden="true"
                    className="text-white/40"
                >
                    <ChevronRight size={14} />
                </li>

                <li
                    aria-current="page"
                    title={universityName}
                    className="max-w-[220px] truncate rounded-full bg-white px-3 py-1 font-bold text-primary sm:max-w-[300px]"
                >
                    {universityName}
                </li>
            </ol>
        </nav>
    );
}