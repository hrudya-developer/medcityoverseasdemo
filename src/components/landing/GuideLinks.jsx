
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

/*
 * A small row of links to the keyword guides (nursing, visas,
 * scholarships, without IELTS, after 12th), for existing templates.
 * links: [{ href, label }]
 */
export default function GuideLinks({
    title = "Helpful guides",
    links,
    className = "",
}) {
    const list = (links ?? []).filter(
        (link) => link?.href && link?.label
    );

    if (!list.length) {
        return null;
    }

    const cardStyles = [
        {
            bg: "bg-blue-50",
            text: "text-blue-600",
            border: "hover:border-blue-200",
            glow: "bg-blue-100/60",
        },
        {
            bg: "bg-orange-50",
            text: "text-orange-600",
            border: "hover:border-orange-200",
            glow: "bg-orange-100/60",
        },
        {
            bg: "bg-violet-50",
            text: "text-violet-600",
            border: "hover:border-violet-200",
            glow: "bg-violet-100/60",
        },
        {
            bg: "bg-emerald-50",
            text: "text-emerald-600",
            border: "hover:border-emerald-200",
            glow: "bg-emerald-100/60",
        },
        {
            bg: "bg-sky-50",
            text: "text-sky-600",
            border: "hover:border-sky-200",
            glow: "bg-sky-100/60",
        },
        {
            bg: "bg-rose-50",
            text: "text-rose-600",
            border: "hover:border-rose-200",
            glow: "bg-rose-100/60",
        },
    ];

    return (
        <nav
            aria-label={title}
            className={`relative mx-auto w-full max-w-7xl min-w-0 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16 ${className}`}
        >
            {/* Section heading */}
            <div className="mb-7 sm:mb-9">
                <div className="mb-5 h-1.5 w-14 rounded-full bg-primary sm:w-16" />

                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12">
                        <BookOpen
                            size={23}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="min-w-0">
                        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
                            Explore more
                        </p>

                        <h2 className="mt-1 break-words text-2xl font-black tracking-tight text-[#071D49] sm:text-3xl lg:text-[36px]">
                            {title}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Guide cards */}
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {list.map((link, index) => {
                    const style =
                        cardStyles[index % cardStyles.length];

                    return (
                        <li key={link.href} className="min-w-0">
                            <Link
                                href={link.href}
                                className={`group relative flex h-full min-h-[125px] min-w-0 flex-col justify-between overflow-hidden rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_6px_24px_rgba(15,23,42,0.045)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(15,23,42,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-6 ${style.border}`}
                            >
                                {/* Soft decorative glow */}
                                <div
                                    aria-hidden="true"
                                    className={`pointer-events-none absolute -bottom-14 -right-14 h-36 w-36 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-125 ${style.glow}`}
                                />

                                {/* Top row */}
                                <div className="relative flex items-start justify-between gap-3">
                                    {/* Number badge */}
                                    <div
                                        aria-hidden="true"
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black ${style.bg} ${style.text}`}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    {/* Arrow */}
                                    <div
                                        aria-hidden="true"
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-primary group-hover:text-white ${style.text}`}
                                    >
                                        <ArrowUpRight
                                            size={19}
                                            strokeWidth={2}
                                        />
                                    </div>
                                </div>

                                {/* Guide title */}
                                <div className="relative mt-5">
                                    <h3 className="break-words text-base font-extrabold leading-snug text-[#071D49] transition-colors duration-300 group-hover:text-primary sm:text-[17px]">
                                        {link.label}
                                    </h3>

                                    <div
                                        aria-hidden="true"
                                        className={`mt-4 h-1 w-10 rounded-full transition-all duration-300 group-hover:w-16 ${style.bg}`}
                                    />
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export const GUIDES = {
    nursingAusbildung: {
        href: "/study-in-germany/nursing-ausbildung",
        label: "Nursing Ausbildung in Germany",
    },
    mscNursingUk: {
        href: "/msc-nursing-in-uk",
        label: "MSc Nursing in the UK",
    },
    nursingGermany: {
        href: "/nursing-in-germany-for-indian-nurses",
        label: "Nursing in Germany for Indian nurses",
    },
    nurses: {
        href: "/study-abroad-for-nurses",
        label: "Study abroad for nurses",
    },
    withoutIelts: {
        href: "/study-abroad-without-ielts",
        label: "Study abroad without IELTS",
    },
    after12th: {
        href: "/study-abroad-after-12th",
        label: "Study abroad after 12th",
    },
    visa: {
        href: "/student-visa-guidance",
        label: "Student visa guidance",
    },
    scholarships: {
        href: "/scholarships-for-indian-students",
        label: "Scholarships for Indian students",
    },
};
