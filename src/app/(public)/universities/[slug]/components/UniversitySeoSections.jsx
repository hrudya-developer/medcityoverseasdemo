import Link from "next/link";

import FaqList from "@/components/seo/FaqList";
import GuideLinks, { GUIDES } from "@/components/landing/GuideLinks";
import OfficialSources from "@/components/seo/OfficialSources";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";
import { officialSourcesFor } from "@/lib/officialSources";
import { intakeParts } from "@/lib/recordValue";
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

    return facts.ieltsMin === facts.ieltsMax
        ? `IELTS ${facts.ieltsMin}`
        : `IELTS ${facts.ieltsMin} to ${facts.ieltsMax}`;
}

/** The FAQs for a university, used both on the page and in its markup. */
export function universityFaqs(universityName, countryName, facts) {
    const faqs = [];
    const where = place(facts, countryName);

    if (where) {
        faqs.push({
            question: `Where is ${universityName} located?`,
            answer: `${universityName} is in ${where}.`,
        });
    }

    if (facts?.courses > 0) {
        faqs.push({
            question: `What courses can I study at ${universityName}?`,
            answer: `Medcity Overseas lists ${facts.courses} ${
                facts.courses === 1 ? "course" : "courses"
            } at ${universityName}${
                facts.areas.length
                    ? `, in areas such as ${joinList(facts.areas)}`
                    : ""
            }${
                facts.levels.length
                    ? `, at ${joinList(facts.levels)} level`
                    : ""
            }. Open the Courses tab to see each course's entry requirements, duration and intakes.`,
        });
    }

    const { months, allYear } = intakeParts(facts?.intakes ?? []);

    if (months.length || allYear) {
        const when = months.length
            ? `start in ${joinList(months)}${
                  allYear ? ", and some take students all year round" : ""
              }`
            : "take students all year round";

        faqs.push({
            question: `When are the intakes at ${universityName}?`,
            answer: `The courses we list at ${universityName} ${when}. Intakes differ from course to course, so check the course page before you plan your application.`,
        });
    }

    if (ieltsText(facts)) {
        faqs.push({
            question: `What IELTS score does ${universityName} ask for?`,
            answer: `The courses we list at ${universityName} ask for an overall ${ieltsText(
                facts
            )}, depending on the course. Each course page shows its own English language requirement, and some courses may accept other tests.`,
        });
    }

    faqs.push({
        question: `How can Medcity Overseas help me apply to ${universityName}?`,
        answer: `Medcity Overseas counsellors help you choose a course at ${universityName}, check your eligibility, prepare your documents and application, and guide you through the offer, student visa and pre-departure steps. Call or WhatsApp +91 90729 82555 to talk to a counsellor.`,
    });

    return faqs;
}

export function UniversityInShort({
    universityName,
    countryName,
    facts,
    updated,
}) {
    const where = place(facts, countryName);

    return (
        <QuickAnswer updated={updated} className="py-8">
            {`${universityName}${where ? `, in ${where},` : ""} is listed on Medcity Overseas. ${
                facts?.courses > 0
                    ? `We list ${facts.courses} ${
                          facts.courses === 1 ? "course" : "courses"
                      } there${
                          facts.levels.length
                              ? ` at ${joinList(facts.levels)} level`
                              : ""
                      }. `
                    : ""
            }Our counsellors help Indian students compare its courses, check entry requirements and apply.`}
        </QuickAnswer>
    );
}

// Simple inline SVG icons (no additional package needed)
function UniversityInfoIcon({ type }) {
    const common = {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
    };

    const icons = {
        location: (
            <>
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
            </>
        ),
        courses: (
            <>
                <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v18H6.5A2.5 2.5 0 0 1 4 18.5Z" />
                <path d="M4 5.5v13M8 7h8M8 11h8M8 15h6" />
            </>
        ),
        levels: (
            <>
                <path d="M4 20V11h4v9Zm6 0V7h4v13Zm6 0V3h4v17Z" />
            </>
        ),
        duration: (
            <>
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M16 3v4M8 3v4M3 10h18M8 14h2M14 14h2M8 17h2" />
            </>
        ),
        intakes: (
            <>
                <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 16.9 6.6 19.8l1-6.1L3.2 9.4l6.1-.9Z" />
            </>
        ),
        english: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M5 6.5h14M5 17.5h14" />
            </>
        ),
        website: (
            <>
                <rect x="3" y="4" width="18" height="13" rx="2" />
                <path d="M8 21h8M12 17v4M6 8h12" />
            </>
        ),
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            {...common}
            className="h-6 w-6"
        >
            {icons[type]}
        </svg>
    );
}

// countryLive: /study-in-<country> exists. universitiesIndexable:
// /universities-in-<country> lists universities (it is noindex otherwise).

export function UniversityGuide({
    universityName,
    countryName,
    countrySlug,
    countryLive = false,
    universitiesIndexable = false,
    facts,
    faqs,
    path,
}) {
    const rows = [
        {
            label: "Location",
            value: place(facts, countryName) || NOT_RECORDED,
            icon: "location",
        },
        {
            label: "Courses listed on Medcity Overseas",
            value: facts ? String(facts.courses ?? 0) : NOT_RECORDED,
            icon: "courses",
        },
        {
            label: "Study levels",
            value: facts?.levels.length
                ? joinList(facts.levels)
                : NOT_RECORDED,
            icon: "levels",
        },
        {
            label: "Common course durations",
            value: facts?.durations.length
                ? joinList(facts.durations)
                : NOT_RECORDED,
            icon: "duration",
        },
        {
            label: "Intakes",
            value: facts?.intakes.length
                ? joinList(facts.intakes)
                : NOT_RECORDED,
            icon: "intakes",
        },
        {
            label: "English requirement in listed courses",
            value: ieltsText(facts) || NOT_RECORDED,
            icon: "english",
        },
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
        <div className="space-y-14 bg-white py-10 sm:py-14 lg:py-16">
            {/* University overview */}
            <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="mb-8 sm:mb-10">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-xs font-semibold tracking-wide text-secondary sm:text-sm">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="h-4 w-4"
                            >
                                <path d="M12 3 2 8l10 5 10-5-10-5Z" />
                                <path d="M6 10v5c0 2 3 4 6 4s6-2 6-4v-5" />
                                <path d="M22 8v6" />
                            </svg>
                        </span>
                        University overview
                    </div>

                    <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                        {universityName}{" "}
                        <span className="text-secondary">at a glance</span>
                    </h2>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                        From the courses Medcity Overseas lists at{" "}
                        {universityName}. Each course page has its own
                        requirements and fees.
                    </p>

                    <div className="mt-5 h-1 w-16 rounded-full bg-secondary" />
                </div>

                {/* Information cards */}
                <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/80 via-white to-sky-50/70 p-3 shadow-sm sm:p-5 lg:p-7">

                    {/* Decorative background shapes */}
                    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-100/50 blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-sky-100/60 blur-2xl" />

                    <div className="relative grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">

                        {rows.map((item) => (
                            <div
                                key={item.label}
                                className="group flex min-w-0 items-center gap-3 rounded-2xl border border-blue-100/80 bg-white/90 p-4 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md sm:gap-4 sm:p-5"
                            >
                                {/* Icon */}
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-secondary transition-colors group-hover:bg-blue-100 sm:h-14 sm:w-14 sm:rounded-2xl">
                                    <UniversityInfoIcon type={item.icon} />
                                </div>

                                {/* Content */}
                                <div className="grid min-w-0 flex-1 grid-cols-1 gap-1 sm:grid-cols-2 sm:items-center sm:gap-3">
                                    <p className="text-sm font-semibold leading-5 text-slate-700 sm:text-base">
                                        {item.label}
                                    </p>

                                    <div className="min-w-0 sm:border-l sm:border-blue-100 sm:pl-4">
                                        <p className="break-words text-sm font-medium leading-6 text-secondary sm:text-base">
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Official website */}
                        <div className="group flex min-w-0 items-center gap-3 rounded-2xl border border-blue-100/80 bg-white/90 p-4 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md sm:gap-4 sm:p-5">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-secondary transition-colors group-hover:bg-blue-100 sm:h-14 sm:w-14 sm:rounded-2xl">
                                <UniversityInfoIcon type="website" />
                            </div>

                            <div className="grid min-w-0 flex-1 grid-cols-1 gap-1 sm:grid-cols-2 sm:items-center sm:gap-3">
                                <p className="text-sm font-semibold leading-5 text-slate-700 sm:text-base">
                                    Official website
                                </p>

                                <div className="min-w-0 sm:border-l sm:border-blue-100 sm:pl-4">
                                    {facts?.website ? (
                                        <a
                                            href={facts.website}
                                            target="_blank"
                                            rel="noopener"
                                            className="inline-flex items-center gap-2 break-words text-sm font-semibold text-secondary transition-colors hover:text-blue-800 hover:underline sm:text-base"
                                        >
                                            Visit the official website
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className="h-4 w-4 shrink-0"
                                            >
                                                <path d="M7 17 17 7M7 7h10v10" />
                                            </svg>
                                        </a>
                                    ) : (
                                        <p className="text-sm font-medium text-secondary sm:text-base">
                                            {NOT_RECORDED}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application question */}
            <QuestionAnswer
                eyebrow="Applying" className="mb-0"
                question={`How do you apply to ${universityName} from India?`}
                answer={`To apply to ${universityName} from India, choose a course on this page and check its entry requirements, English test scores and intake. Prepare your academic certificates, passport, test results and statement of purpose, then apply with Medcity Overseas, which guides you through the offer, student visa and pre-departure steps.`}
            />

            {/* Links */}
            <p className="mx-auto max-w-6xl px-4 text-sm leading-7 text-slate-800 sm:px-6 lg:px-8 py-4 bg-blue-50 rounded-full text-center font-black">
                {countrySlug && universitiesIndexable && (
                    <>
                        Compare other{" "}
                        <Link
                            href={`/universities-in-${countrySlug}`}
                            className="font-bold text-secondary hover:underline"
                        >
                            universities in {countryName}
                        </Link>
                        {countryLive ? ", read the " : ", search the "}
                    </>
                )}

                {countrySlug && countryLive && (
                    <>
                        {universitiesIndexable ? "" : "Read the "}
                        <Link
                            href={`/study-in-${countrySlug}`}
                            className="font-bold text-secondary hover:underline"
                        >
                            study in {countryName} guide
                        </Link>
                        , search the{" "}
                    </>
                )}

                {!(countrySlug && (universitiesIndexable || countryLive)) &&
                    "Search the "}

                <Link
                    href="/courses"
                    className="font-bold text-secondary hover:underline"
                >
                    course finder
                </Link>{" "}
                or{" "}
                <Link
                    href="/contact-us"
                    className="font-bold text-secondary hover:underline"
                >
                    book a counselling session
                </Link>
                .
            </p>

            {/* Guides */}
            <GuideLinks
                links={[
                    facts?.scholarship && GUIDES.scholarships,
                    facts?.withoutIelts && GUIDES.withoutIelts,
                    GUIDES.visa,
                ].filter(Boolean)}
            />

            {/* FAQs */}
            <FaqList
                path={path}
                faqs={faqs}
                title={`${universityName}: frequently asked questions`}
            />

            {/* Official sources */}
            <OfficialSources links={sources} />
        </div>
    );
}