import Link from "next/link";
import {
    ArrowUpRight,
    BookOpen,
    Building2,
    Compass,
    GraduationCap,
    MessageCircle,
    Search,
    Stethoscope,
} from "lucide-react";

import OfficialSources from "@/components/seo/OfficialSources";
import QuickAnswer from "@/components/seo/QuickAnswer";
import { officialSourcesFor } from "@/lib/officialSources";
import { intakeSentence } from "@/lib/recordValue";
import { joinList } from "@/lib/seoSchema";

/*
 * Server-rendered blocks for a course page, built only from the course
 * record: the "In short" box under the hero, and links to the
 * university, country and official sources at the end.
 */

// The date these blocks were last changed; a page shows this or the
// date its course record was added, whichever is later.
export const COURSE_TEMPLATE_UPDATED = "2026-10-23";

/** "MSc Nursing is a Masters course at X in Newcastle, UK. It lasts 1 year. Intakes are in Sep." */
export function courseSummary(facts) {
    const where = [facts.location, facts.country].filter(Boolean).join(", ");
    const sentences = [
        `${facts.name} is ${facts.level ? `${/^[aeiou]/i.test(facts.level) ? "an" : "a"} ${facts.level} course` : "a course"} at ${facts.university}${where ? ` in ${where}` : ""}.`,
    ];

    if (facts.duration) {
        sentences.push(`It lasts ${facts.duration}.`);
    }

    const intakes = intakeSentence(facts.intakes, joinList);

    if (intakes) {
        sentences.push(intakes);
    }

    sentences.push("Medcity Overseas helps Indian students check the entry requirements, prepare the application and apply for the student visa.");

    return sentences.join(" ");
}

export function CourseInShort({ facts, updated }) {
    return (
        <QuickAnswer updated={updated} className="py-10">
            {courseSummary(facts)}
        </QuickAnswer>
    );
}

// countryLive: the country is a live destination (hidden ones 404), so
// /study-in-<country> exists. universitiesIndexable: /universities-in-<country>
// lists at least one university; it is noindex otherwise and not linked.
// courseGuide: { href, label } of the course guide this course belongs
// to, when that guide passes its quality gate, or null.
export function CourseLinks({ facts, universityPath, countrySlug, countryLive = false, universitiesIndexable = false, courseGuide = null }) {
    // Nursing courses link to the nursing guides: UK masters courses to
    // the MSc Nursing list, the rest to the nursing hub.
    const name = String(facts.name ?? "");
    const nursingGuide = /nursing/i.test(name)
        ? countrySlug === "uk" && /\b(msc|ma|mres|masters?|postgraduate|pg)\b/i.test(name)
            ? { href: "/msc-nursing-in-uk", label: "More MSc Nursing courses in the UK" }
            : { href: "/study-abroad-for-nurses", label: "Study abroad for nurses" }
        : null;

    const links = [
        ...(universityPath
            ? [{
                  href: universityPath,
                  title: `All courses at ${facts.university}`,
                  description: `Explore courses listed at ${facts.university}.`,
                  icon: Building2,
              }]
            : []),
        ...(countrySlug && universitiesIndexable
            ? [{
                  href: `/universities-in-${countrySlug}`,
                  title: `Universities in ${facts.country}`,
                  description: `Compare universities and find more study options in ${facts.country}.`,
                  icon: GraduationCap,
              }]
            : []),
        ...(countrySlug && countryLive
            ? [{
                  href: `/study-in-${countrySlug}`,
                  title: `Study in ${facts.country} guide`,
                  description: `Explore study information and guidance for ${facts.country}.`,
                  icon: Compass,
              }]
            : []),
        {
            href: "/courses",
            title: "Search all courses",
            description: "Browse courses by subject, destination and level.",
            icon: Search,
        },
        ...(courseGuide
            ? [{
                  href: courseGuide.href,
                  title: `${courseGuide.label} for Indian students`,
                  description: "Explore related courses and guidance for your study plans.",
                  icon: BookOpen,
              }]
            : []),
        ...(nursingGuide
            ? [{
                  href: nursingGuide.href,
                  title: nursingGuide.label,
                  description: "Compare nursing study routes and guidance for Indian students.",
                  icon: Stethoscope,
              }]
            : []),
        {
            href: "/contact-us",
            title: "Book a counselling session",
            description: "Talk with our team about courses and your next steps.",
            icon: MessageCircle,
        },
    ];

    return (
        <div className="space-y-14 bg-gradient-to-b from-slate-50 via-white to-rose-50/40 py-16 sm:py-20">
            <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
                    <span className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary shadow-sm">
                        <BookOpen size={15} aria-hidden="true" />
                        Explore more
                    </span>
                    <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                        More about <span className="text-primary">{facts.university}</span>
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                        Find related courses, destination information and support for your next step.
                    </p>
                    <div aria-hidden="true" className="mx-auto mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-orange-300" />
                </header>

                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {links.map(({ href, title, description, icon: Icon }, index) => (
                        <li key={`${href}-${index}`} className="h-full">
                            <Link
                                href={href}
                                className="group flex h-full min-h-44 flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:p-6"
                            >
                                <span className="flex items-start justify-between gap-4">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                        <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                                    </span>
                                    <ArrowUpRight
                                        size={19}
                                        aria-hidden="true"
                                        className="mt-1 shrink-0 text-slate-400 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                                    />
                                </span>
                                <span className="mt-5 text-base font-bold leading-6 text-slate-900 transition-colors group-hover:text-primary">
                                    {title}
                                </span>
                                <span className="mt-2 text-sm leading-6 text-slate-600">
                                    {description}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <OfficialSources links={officialSourcesFor(countrySlug)} />
        </div>
    );
}
