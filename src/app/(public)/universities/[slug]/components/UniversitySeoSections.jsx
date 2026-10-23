import Link from "next/link";

import FaqList from "@/components/seo/FaqList";
import GuideLinks, { GUIDES } from "@/components/landing/GuideLinks";
import OfficialSources from "@/components/seo/OfficialSources";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";
import { officialSourcesFor } from "@/lib/officialSources";
import { joinList } from "@/lib/seoSchema";

/*
 * Server-rendered search and answer blocks for a university page, built
 * only from the university's own records (see lib/universityFacts.js).
 * Missing values show "Not recorded" rather than a guess.
 */

const NOT_RECORDED = "Not recorded";

// The date these blocks were last changed; a page shows this or the
// date of its newest record, whichever is later.
export const UNIVERSITY_TEMPLATE_UPDATED = "2026-10-23";

function place(facts, countryName) {
    return [facts?.location, countryName].filter(Boolean).join(", ");
}

function ieltsText(facts) {
    if (facts?.ieltsMin === null || facts?.ieltsMin === undefined) return "";

    return facts.ieltsMin === facts.ieltsMax ? `IELTS ${facts.ieltsMin}` : `IELTS ${facts.ieltsMin} to ${facts.ieltsMax}`;
}

/** The FAQs for a university, used both on the page and in its markup. */
export function universityFaqs(universityName, countryName, facts) {
    const faqs = [];
    const where = place(facts, countryName);

    if (where) {
        faqs.push({
            question: `Where is ${universityName} located?`,
            answer: `${universityName} is in ${where}. The map on this page shows its location.`,
        });
    }

    if (facts?.courses > 0) {
        faqs.push({
            question: `What courses can I study at ${universityName}?`,
            answer: `Medcity Overseas lists ${facts.courses} ${facts.courses === 1 ? "course" : "courses"} at ${universityName}${
                facts.areas.length ? `, in areas such as ${joinList(facts.areas)}` : ""
            }${facts.levels.length ? `, at ${joinList(facts.levels)} level` : ""}. Open the Courses tab to see each course's entry requirements, duration and intakes.`,
        });
    }

    if (facts?.intakes.length) {
        faqs.push({
            question: `When are the intakes at ${universityName}?`,
            answer: `The courses we list at ${universityName} start in ${joinList(facts.intakes)}. Intakes differ from course to course, so check the course page before you plan your application.`,
        });
    }

    if (ieltsText(facts)) {
        faqs.push({
            question: `What IELTS score does ${universityName} ask for?`,
            answer: `The courses we list at ${universityName} ask for an overall ${ieltsText(facts)}, depending on the course. Each course page shows its own English language requirement, and some courses may accept other tests.`,
        });
    }

    faqs.push({
        question: `How can Medcity Overseas help me apply to ${universityName}?`,
        answer: `Medcity Overseas counsellors help you choose a course at ${universityName}, check your eligibility, prepare your documents and application, and guide you through the offer, student visa and pre-departure steps. Call or WhatsApp +91 90729 82555 for free counselling.`,
    });

    return faqs;
}

export function UniversityInShort({ universityName, countryName, facts, updated }) {
    const where = place(facts, countryName);

    return (
        <QuickAnswer updated={updated} className="py-8">
            {`${universityName} is a university${where ? ` in ${where}` : ""}. ${
                facts?.courses > 0
                    ? `Medcity Overseas lists ${facts.courses} ${facts.courses === 1 ? "course" : "courses"} here${
                          facts.levels.length ? ` at ${joinList(facts.levels)} level` : ""
                      }. `
                    : ""
            }Our counsellors help Indian students compare its courses, check entry requirements and apply.`}
        </QuickAnswer>
    );
}

export function UniversityGuide({ universityName, countryName, countrySlug, facts, faqs, path }) {
    const rows = [
        ["Location", place(facts, countryName) || NOT_RECORDED],
        ["Courses listed on Medcity Overseas", facts?.courses > 0 ? String(facts.courses) : NOT_RECORDED],
        ["Study levels", facts?.levels.length ? joinList(facts.levels) : NOT_RECORDED],
        ["Common course durations", facts?.durations.length ? joinList(facts.durations) : NOT_RECORDED],
        ["Intakes", facts?.intakes.length ? joinList(facts.intakes) : NOT_RECORDED],
        ["English requirement in listed courses", ieltsText(facts) || NOT_RECORDED],
    ];

    const sources = [
        ...(facts?.website
            ? [
                  {
                      label: `${universityName} official website`,
                      href: facts.website,
                      note: "Check fees, entry requirements and deadlines with the university.",
                  },
              ]
            : []),
        ...officialSourcesFor(countrySlug),
    ];

    return (
        <div className="space-y-14 bg-white py-14 sm:py-16">
            <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">{universityName} at a glance</h2>

                <p className="mt-3 leading-7 text-slate-600">
                    From the courses Medcity Overseas lists at {universityName}. Each course page has its own requirements and fees.
                </p>

                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-sm">
                        <tbody className="divide-y divide-slate-100">
                            {rows.map(([label, value]) => (
                                <tr key={label}>
                                    <th scope="row" className="w-2/5 bg-slate-50 px-4 py-3 font-bold text-slate-700">
                                        {label}
                                    </th>
                                    <td className="px-4 py-3 text-slate-700">{value}</td>
                                </tr>
                            ))}
                            <tr>
                                <th scope="row" className="w-2/5 bg-slate-50 px-4 py-3 font-bold text-slate-700">
                                    Official website
                                </th>
                                <td className="px-4 py-3 text-slate-700">
                                    {facts?.website ? (
                                        <a href={facts.website} target="_blank" rel="noopener" className="font-bold text-primary hover:underline">
                                            Visit the official website
                                        </a>
                                    ) : (
                                        NOT_RECORDED
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <QuestionAnswer
                eyebrow="Applying"
                question={`How do you apply to ${universityName} from India?`}
                answer={`To apply to ${universityName} from India, choose a course on this page and check its entry requirements, English test scores and intake. Prepare your academic certificates, passport, test results and statement of purpose, then apply with Medcity Overseas, which guides you through the offer, student visa and pre-departure steps.`}
            />

            <p className="mx-auto max-w-5xl px-4 text-sm leading-7 text-slate-600 sm:px-6 lg:px-8">
                {countrySlug ? (
                    <>
                        Compare other{" "}
                        <Link href={`/universities-in-${countrySlug}`} className="font-bold text-primary hover:underline">
                            universities in {countryName}
                        </Link>
                        , read the{" "}
                        <Link href={`/study-in-${countrySlug}`} className="font-bold text-primary hover:underline">
                            study in {countryName} guide
                        </Link>
                        , search the{" "}
                    </>
                ) : (
                    "Search the "
                )}
                <Link href="/courses" className="font-bold text-primary hover:underline">
                    course finder
                </Link>{" "}
                or{" "}
                <Link href="/contact-us" className="font-bold text-primary hover:underline">
                    book free counselling
                </Link>
                .
            </p>

            <GuideLinks
                links={[
                    facts?.scholarship && GUIDES.scholarships,
                    facts?.withoutIelts && GUIDES.withoutIelts,
                    GUIDES.visa,
                ].filter(Boolean)}
            />

            <FaqList path={path} faqs={faqs} title={`${universityName}: frequently asked questions`} />

            <OfficialSources links={sources} />
        </div>
    );
}
