import Link from "next/link";

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

    return (
        <div className="space-y-12 bg-white py-14">
            <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">More about {facts.university}</h2>

                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {universityPath && (
                        <li>
                            <Link
                                href={universityPath}
                                className="block rounded-2xl border border-slate-200 p-4 font-bold text-slate-900 transition hover:border-primary/30 hover:text-primary"
                            >
                                All courses at {facts.university}
                            </Link>
                        </li>
                    )}
                    {countrySlug && universitiesIndexable && (
                        <li>
                            <Link
                                href={`/universities-in-${countrySlug}`}
                                className="block rounded-2xl border border-slate-200 p-4 font-bold text-slate-900 transition hover:border-primary/30 hover:text-primary"
                            >
                                Universities in {facts.country}
                            </Link>
                        </li>
                    )}
                    {countrySlug && countryLive && (
                        <li>
                            <Link
                                href={`/study-in-${countrySlug}`}
                                className="block rounded-2xl border border-slate-200 p-4 font-bold text-slate-900 transition hover:border-primary/30 hover:text-primary"
                            >
                                Study in {facts.country} guide
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link
                            href="/courses"
                            className="block rounded-2xl border border-slate-200 p-4 font-bold text-slate-900 transition hover:border-primary/30 hover:text-primary"
                        >
                            Search all courses
                        </Link>
                    </li>
                    {courseGuide && (
                        <li>
                            <Link
                                href={courseGuide.href}
                                className="block rounded-2xl border border-slate-200 p-4 font-bold text-slate-900 transition hover:border-primary/30 hover:text-primary"
                            >
                                {courseGuide.label} for Indian students
                            </Link>
                        </li>
                    )}
                    {nursingGuide && (
                        <li>
                            <Link
                                href={nursingGuide.href}
                                className="block rounded-2xl border border-slate-200 p-4 font-bold text-slate-900 transition hover:border-primary/30 hover:text-primary"
                            >
                                {nursingGuide.label}
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link
                            href="/contact-us"
                            className="block rounded-2xl border border-slate-200 p-4 font-bold text-slate-900 transition hover:border-primary/30 hover:text-primary"
                        >
                            Book a counselling session
                        </Link>
                    </li>
                </ul>
            </section>

            <OfficialSources links={officialSourcesFor(countrySlug)} />
        </div>
    );
}
