import Link from "next/link";

import { ArrowRight } from "lucide-react";

/*
 * A small row of links to the keyword guides (nursing, visas,
 * scholarships, without IELTS, after 12th), for existing templates.
 * links: [{ href, label }]
 */
export default function GuideLinks({ title = "Helpful guides", links, className = "" }) {
    const list = (links ?? []).filter((link) => link?.href && link?.label);

    if (!list.length) {
        return null;
    }

    return (
        <nav aria-label={title} className={`mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 ${className}`}>
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-slate-500">{title}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
                {list.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-primary/40 hover:text-primary"
                        >
                            {link.label}
                            <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export const GUIDES = {
    nursingAusbildung: { href: "/study-in-germany/nursing-ausbildung", label: "Nursing Ausbildung in Germany" },
    mscNursingUk: { href: "/msc-nursing-in-uk", label: "MSc Nursing in the UK" },
    nursingGermany: { href: "/nursing-in-germany-for-indian-nurses", label: "Nursing in Germany for Indian nurses" },
    nurses: { href: "/study-abroad-for-nurses", label: "Study abroad for nurses" },
    withoutIelts: { href: "/study-abroad-without-ielts", label: "Study abroad without IELTS" },
    after12th: { href: "/study-abroad-after-12th", label: "Study abroad after 12th" },
    visa: { href: "/student-visa-guidance", label: "Student visa guidance" },
    scholarships: { href: "/scholarships-for-indian-students", label: "Scholarships for Indian students" },
};
