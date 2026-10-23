import Link from "next/link";

import { ArrowRight, BookOpen, Building2, ChevronRight, GraduationCap, MapPin } from "lucide-react";

/*
 * Key facts and FAQs for a country's university list, counted from our
 * own database. Gives the page real text for search engines and AI
 * answers, and a quick overview for students.
 */

function Stat({ icon: Icon, value, label }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <Icon size={20} className="text-primary" aria-hidden="true" />
            <p className="mt-3 text-2xl font-black text-slate-900">{value}</p>
            <p className="text-sm text-slate-500">{label}</p>
        </div>
    );
}

export default function CountryFacts({ countryName, countrySlug, facts, faqs }) {
    if (!facts || facts.universities === 0) {
        return null;
    }

    const topCity = facts.cities[0];

    return (
        <section className="bg-slate-50 py-14 sm:py-16" aria-labelledby="country-facts-heading">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 id="country-facts-heading" className="text-2xl font-black text-secondary sm:text-3xl">
                    Studying in {countryName}: key facts
                </h2>
                <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                    Medcity Overseas lists {facts.universities} {facts.universities === 1 ? "university" : "universities"} in {countryName}
                    {facts.courses > 0 ? ` offering ${facts.courses.toLocaleString("en-IN")} courses` : ""}
                    {facts.levels.length > 0
                        ? `, mainly at ${facts.levels.slice(0, 3).map((level) => level.name).join(", ")} level`
                        : ""}
                    .{topCity ? ` The most universities on our list are in ${topCity.name}.` : ""} Our counsellors in
                    Kerala help you shortlist, apply and prepare your student visa.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Stat icon={Building2} value={facts.universities} label="Universities listed" />
                    <Stat icon={BookOpen} value={facts.courses.toLocaleString("en-IN")} label="Courses listed" />
                    <Stat icon={MapPin} value={facts.cities.length} label={facts.cities.length === 6 ? "Top student cities shown" : "Student cities"} />
                    <Stat icon={GraduationCap} value={facts.levels.length} label="Study levels" />
                </div>

                {facts.durations?.length > 0 && (
                    <div className="mt-8">
                        <h3 className="font-bold text-slate-900">Most common course durations</h3>
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {facts.durations.map((duration) => (
                                <li key={duration.name} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700">
                                    {duration.name} <span className="text-slate-400">({duration.count} {duration.count === 1 ? "course" : "courses"})</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {facts.cities.length > 0 && (
                    <div className="mt-8">
                        <h3 className="font-bold text-slate-900">Cities with the most universities</h3>
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {facts.cities.map((city) => (
                                <li key={city.name} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700">
                                    {city.name} <span className="text-slate-400">({city.count})</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                        href={`/study-in-${countrySlug}`}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-darkPrimary"
                    >
                        Study in {countryName} guide <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                    <Link
                        href="/contact-us"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 hover:border-primary hover:text-primary"
                    >
                        Talk to a counsellor
                    </Link>
                </div>

                {faqs.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-black text-secondary sm:text-3xl">
                            Universities in {countryName}: questions students ask
                        </h2>
                        <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
                            {faqs.map((faq, index) => (
                                <details key={faq.question} open={index === 0} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex cursor-pointer items-start justify-between gap-4">
                                        <h3 className="font-bold leading-snug text-slate-900">{faq.question}</h3>
                                        <ChevronRight
                                            size={20}
                                            aria-hidden="true"
                                            className="mt-0.5 shrink-0 text-primary transition-transform group-open:rotate-90"
                                        />
                                    </summary>
                                    <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
