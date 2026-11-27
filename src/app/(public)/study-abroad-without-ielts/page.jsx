import Link from "next/link";

import FaqList from "@/components/seo/FaqList";
import OfficialSources from "@/components/seo/OfficialSources";
import PageSchema from "@/components/seo/PageSchema";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";
import {
    AcademyNote,
    ContactBand,
    GuideHero,
    GuideSection,
    LoadError,
    NOT_RECORDED,
    PointList,
    Prose,
    RelatedLinks,
    SourceLink,
    TableWrap,
    TextLink,
    tbodyClass,
    th,
    theadClass,
} from "@/components/landing/Guide";
import { guideMetadata } from "@/lib/guideMeta";
import { getLiveSlugs, getWithoutIeltsOptions } from "@/lib/landingData";

/*
 * Study abroad without IELTS: what each country's visa rules accept
 * instead (GOV.UK, Irish Immigration Service, Study Australia and the
 * DAAD, checked on UPDATED) and the universities and courses our records
 * mark as accepting other evidence (tb_universities.without_ielts,
 * tb_courses.ieltsless, pteless, toeflless, duolingo).
 */

const PATH = "/study-abroad-without-ielts";
const UPDATED = "2026-10-24";
const TITLE = "Study Abroad Without IELTS";
const DESCRIPTION =
    "Study abroad without IELTS from Kerala: what the UK, Ireland, Australia and Germany accept instead, universities we list that waive it, and visa cautions.";

const SRC = {
    ukEnglish: "https://www.gov.uk/student-visa/knowledge-of-english",
    ireland: "https://www.irishimmigration.ie/coming-to-study-in-ireland/english-language-requirements-for-study-visas/",
    australia: "https://www.studyaustralia.gov.au/en/plan-your-move/language-testing-organisations",
    germany: "https://www.daad.de/en/studying-in-germany/living-in-germany/german-language/",
};

const BREADCRUMBS = [
    { name: "Home", path: "/" },
    { name: "Universities", path: "/universities" },
    { name: "Study abroad without IELTS", path: PATH },
];

const COUNTRY_RULES = [
    {
        country: "United Kingdom",
        slug: "uk",
        rule: "For degree level study the visa needs English equal to CEFR B2. Your university can assess your English itself and may use a test other than IELTS.",
        caution: "Below degree level, an approved Secure English Language Test (SELT) is needed unless you are exempt.",
        source: SRC.ukEnglish,
        label: "GOV.UK",
    },
    {
        country: "Ireland",
        slug: "ireland",
        rule: "For degree courses the visa accepts several tests, for example a Duolingo score of 75, a PTE Academic score of 30, a TOEFL iBT score of 61 or an IELTS Academic score of 5.0, issued within 2 years of your start date.",
        caution: "These are visa minimums; your college may ask for more. No general test exemption is listed for degree applicants.",
        source: SRC.ireland,
        label: "Irish Immigration Service",
    },
    {
        country: "Australia",
        slug: "australia",
        rule: "Accepted tests include PTE Academic, TOEFL iBT for Australia, OET, LanguageCert Academic, Cambridge C1 Advanced, CELPIP General and the Michigan English Test, as well as IELTS.",
        caution: "Tests must be taken at a secure test centre; at home and online versions are not accepted.",
        source: SRC.australia,
        label: "Study Australia",
    },
    {
        country: "Germany",
        slug: "germany",
        rule: "For English taught international programmes you can usually enrol without German, but you need proof of other language skills, usually English. Check which proof the programme accepts.",
        caution: "German taught programmes need proof of German, usually a test passed before admission.",
        source: SRC.germany,
        label: "DAAD",
    },
];

function scoreList(course) {
    return [
        course.ieltsLess && `IELTS (lower score accepted): ${course.ieltsLess}`,
        course.pteLess && `PTE (lower score accepted): ${course.pteLess}`,
        course.toeflLess && `TOEFL (lower score accepted): ${course.toeflLess}`,
        course.duolingo && `Duolingo: ${course.duolingo}`,
    ].filter(Boolean);
}

export async function generateMetadata() {
    return guideMetadata({
        path: PATH,
        title: TITLE,
        description: DESCRIPTION,
        image: "/og-images/universities.webp",
        imageAlt: "Study abroad without IELTS with Medcity Overseas",
    });
}

export default async function WithoutIeltsPage() {
    const [{ universities, courses, error }, liveSlugs] = await Promise.all([getWithoutIeltsOptions(), getLiveSlugs()]);

    const faqs = [
        {
            question: "Can I get a UK Student visa without IELTS?",
            answer:
                "Yes, in some cases. GOV.UK says that for degree level study your university can assess your English itself, as long as it is equal to CEFR B2, and it may use a different test. Below degree level you need an approved Secure English Language Test unless you are exempt. Ask the university how it will assess you before you apply.",
        },
        {
            question: "Is PTE accepted instead of IELTS?",
            answer:
                "Often, yes. The Irish Immigration Service lists a PTE Academic score of 30 for degree courses, for visa purposes, and Study Australia lists PTE Academic among the tests accepted for Australian student visas. Each university also sets its own score, so check the course page.",
        },
        {
            question: "What is an MOI letter?",
            answer:
                "A Medium of Instruction (MOI) letter is a letter from your college or university confirming that your course was taught in English. Some universities accept it as part of their own English assessment. It does not replace a test where the visa rules ask for one, so check both the university's and the visa's rules.",
        },
        {
            question: "Can I study in Germany without IELTS?",
            answer:
                "For German taught programmes you show German, usually through a test passed before admission, instead of English. For English taught international programmes, the DAAD says you can usually enrol without German but need proof of other language skills, usually English. Check the admission rules of the exact programme.",
        },
    ];

    return (
        <div className="bg-white">
            <PageSchema
                path={PATH}
                type="Article"
                headline={TITLE}
                name={`${TITLE} | Medcity Overseas`}
                description={DESCRIPTION}
                dateModified={UPDATED}
                image="/og-images/universities.webp"
                breadcrumbs={BREADCRUMBS}
                about={{ "@type": "Thing", name: "English language requirements for studying abroad" }}
                faqs={faqs}
            />

            <div
                className="
                    text-center
                    [&>section>div:nth-child(2)]:!flex
                    [&>section>div:nth-child(2)]:!flex-col
                    [&>section>div:nth-child(2)]:!items-center

                    [&>section>div>nav]:mx-auto
                    [&>section>div>nav]:w-fit
                    [&>section>div>nav]:max-w-full
                    [&>section>div>nav>ol]:justify-center

                    [&>section>div>h1]:mx-auto
                    [&>section>div>h1+p]:mx-auto

                    [&>section>div>div:last-child]:items-center
                    [&>section>div>div:last-child]:justify-center
                "
            >
                <GuideHero
                    eyebrow="English requirements"
                    title={TITLE}
                    breadcrumbs={BREADCRUMBS}
                    intro="Study abroad without IELTS is possible, but it rarely means without any English proof. Most routes swap IELTS for another test, a university's own assessment or English medium study. Here is what the visa rules in the UK, Ireland, Australia and Germany accept, and the universities we list that record other options."
                />
            </div>

            <div className="space-y-14 py-12 sm:py-14">
                <QuickAnswer updated={UPDATED}>
                    You can study abroad without IELTS in many cases, but you still prove your English. The UK lets universities assess degree level students themselves to CEFR B2. Ireland and Australia accept other tests such as PTE Academic, TOEFL iBT or Duolingo (Ireland). Germany&apos;s English taught programmes usually ask for English, not German. Always check the visa rules as well as the university&apos;s.
                </QuickAnswer>

                <QuestionAnswer
                    eyebrow="The short answer"
                    question="What does study abroad without IELTS really mean?"
                    answer="It means proving your English another way. That can be a different test such as PTE Academic, TOEFL iBT or Duolingo, an English assessment run by the university, or a waiver based on earlier study in English. The university decides admission, but the visa has its own English rules, and a university waiver does not always satisfy them."
                />

                <GuideSection
                    title="What each country accepts instead of IELTS"
                    intro="From official and institutional pages, checked on 24 October 2026."
                >
                    <TableWrap minWidth={760}>
                        <thead className={`{theadClass} bg-darkPrimary text-white`}>
                            <tr>
                                <th scope="col" className={th}>Country</th>
                                <th scope="col" className={th}>What the rules say</th>
                                <th scope="col" className={th}>Watch out for</th>
                                <th scope="col" className={th}>Source</th>
                            </tr>
                        </thead>
                        <tbody className={tbodyClass}>
                            {COUNTRY_RULES.map((row) => (
                                <tr key={row.country}>
                                    <th scope="row" className={`${th} font-bold text-slate-900`}>
                                        {liveSlugs.has(row.slug) ? (
                                            <Link href={`/study-in-${row.slug}`} className="hover:text-primary hover:underline">
                                                {row.country}
                                            </Link>
                                        ) : (
                                            row.country
                                        )}
                                    </th>
                                    <td className={th}>{row.rule}</td>
                                    <td className={th}>{row.caution}</td>
                                    <td className={th}>
                                        <SourceLink href={row.source}>{row.label}</SourceLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </TableWrap>
                </GuideSection>

                <GuideSection
                    title="Universities we list that accept students without IELTS"
                    intro="From our university records: these are marked as accepting students without IELTS. What they accept instead differs, so open each university page and confirm with us."
                >
                    {universities.length ? (
                        <TableWrap minWidth={560}>
                            <thead className={`{theadClass} bg-darkPrimary text-white`}>
                                <tr>
                                    <th scope="col" className={th}>University</th>
                                    <th scope="col" className={th}>Location</th>
                                    <th scope="col" className={th}>Country</th>
                                    <th scope="col" className={th}>Courses listed</th>
                                </tr>
                            </thead>
                            <tbody className={tbodyClass}>
                                {universities.map((university) => (
                                    <tr key={university.id}>
                                        <th scope="row" className={`${th} font-bold text-slate-900`}>
                                            <Link href={university.href} className="text-primary hover:underline">
                                                {university.name}
                                            </Link>
                                        </th>
                                        <td className={th}>{university.location ?? NOT_RECORDED}</td>
                                        <td className={th}>{university.country ?? NOT_RECORDED}</td>
                                        <td className={th}>{university.courses || NOT_RECORDED}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </TableWrap>
                    ) : error ? (
                        <LoadError />
                    ) : (
                        <Prose>
                            <p>
                                None of the universities we list is marked this way in our records yet. Browse all <TextLink href="/universities">universities</TextLink> and ask a counsellor, who can check each university&apos;s current English policy for you.
                            </p>
                        </Prose>
                    )}
                </GuideSection>

                <GuideSection
                    title="Courses that record other English options"
                    intro="Courses whose records list a lower accepted IELTS, PTE or TOEFL score, or a Duolingo score. Read each course page for the conditions that come with these options."
                >
                    {courses.length ? (
                        <TableWrap minWidth={640}>
                            <thead className={`{theadClass} bg-darkPrimary text-white`}>
                                <tr>
                                    <th scope="col" className={th}>Course</th>
                                    <th scope="col" className={th}>University</th>
                                    <th scope="col" className={th}>Country</th>
                                    <th scope="col" className={th}>Recorded English options</th>
                                </tr>
                            </thead>
                            <tbody className={tbodyClass}>
                                {courses.map((course) => (
                                    <tr key={course.id}>
                                        <th scope="row" className={`${th} font-bold text-slate-900`}>
                                            {course.href ? (
                                                <Link href={course.href} className="hover:text-primary hover:underline">
                                                    {course.course}
                                                </Link>
                                            ) : (
                                                course.course
                                            )}
                                        </th>
                                        <td className={th}>
                                            <Link href={course.universityHref} className="text-primary hover:underline">
                                                {course.university}
                                            </Link>
                                        </td>
                                        <td className={th}>{course.country ?? NOT_RECORDED}</td>
                                        <td className={th}>{scoreList(course).join("; ") || NOT_RECORDED}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </TableWrap>
                    ) : error ? (
                        <LoadError />
                    ) : (
                        <Prose>
                            <p>
                                No course in our records lists another English option yet. Search <TextLink href="/courses">all courses</TextLink> and check the English requirements on each course page.
                            </p>
                        </Prose>
                    )}
                </GuideSection>

              <GuideSection title="Before you skip IELTS: a visa caution">
    <div className="relative overflow-hidden rounded-3xl mt-5 border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-rose-50/50 p-5 shadow-sm sm:p-7 lg:p-8">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-amber-100/30 blur-3xl" />

        <div className="relative">

            {/* Intro */}
            <div className="mb-7 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 sm:h-14 sm:w-14">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                        <path d="M10.3 3.9 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3l-7.5-13.1a2 2 0 0 0-3.4 0Z" />
                    </svg>
                </div>

                <div className="min-w-0">
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                        Important visa precautions
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                        Before relying on an IELTS waiver, verify these four important details.
                    </p>
                </div>
            </div>

            {/* Warning cards grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Card 1 */}
                <div className="group relative overflow-hidden rounded-2xl border border-rose-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-md sm:p-6">
                    <div className="absolute right-4 top-4 text-5xl font-black text-rose-100/80 transition-colors duration-300 group-hover:text-rose-100">
                        01
                    </div>

                    <div className="relative">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M4 4h16v16H4z" />
                                <path d="M8 8h8" />
                                <path d="M8 12h5" />
                                <path d="m14 17 2 2 4-4" />
                            </svg>
                        </div>

                        <h4 className="text-base font-bold text-slate-900 sm:text-lg">
                            Admission and visa are separate
                        </h4>

                        <p className="mt-3 text-sm leading-7 text-slate-600">
                            a university can waive IELTS for admission while the visa still needs a test, as in Ireland, where the visa table applies for visa purposes.
                        </p>
                    </div>

                    <div className="mt-5 h-1 w-10 rounded-full bg-rose-300 transition-all duration-300 group-hover:w-16" />
                </div>

                {/* Card 2 */}
                <div className="group relative overflow-hidden rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-md sm:p-6">
                    <div className="absolute right-4 top-4 text-5xl font-black text-amber-100/80 transition-colors duration-300 group-hover:text-amber-100">
                        02
                    </div>

                    <div className="relative">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <rect x="3" y="4" width="18" height="16" rx="2" />
                                <path d="M8 4v4" />
                                <path d="M16 4v4" />
                                <path d="M3 10h18" />
                                <path d="m9 14 2 2 4-4" />
                            </svg>
                        </div>

                        <h4 className="text-base font-bold text-slate-900 sm:text-lg">
                            Check the test format
                        </h4>

                        <p className="mt-3 text-sm leading-7 text-slate-600">
                            Australia does not accept at home or online versions of its listed tests.
                        </p>
                    </div>

                    <div className="mt-5 h-1 w-10 rounded-full bg-amber-300 transition-all duration-300 group-hover:w-16" />
                </div>

                {/* Card 3 */}
                <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:p-6">
                    <div className="absolute right-4 top-4 text-5xl font-black text-blue-100/80 transition-colors duration-300 group-hover:text-blue-100">
                        03
                    </div>

                    <div className="relative">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                        </div>

                        <h4 className="text-base font-bold text-slate-900 sm:text-lg">
                            Check the certificate date
                        </h4>

                        <p className="mt-3 text-sm leading-7 text-slate-600">
                            Ireland asks for a certificate issued within 2 years of your course start date.
                        </p>
                    </div>

                    <div className="mt-5 h-1 w-10 rounded-full bg-blue-300 transition-all duration-300 group-hover:w-16" />
                </div>

                {/* Card 4 */}
                <div className="group relative overflow-hidden rounded-2xl border border-violet-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-md sm:p-6">
                    <div className="absolute right-4 top-4 text-5xl font-black text-violet-100/80 transition-colors duration-300 group-hover:text-violet-100">
                        04
                    </div>

                    <div className="relative">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <path d="M14 2v6h6" />
                                <path d="M8 13h8" />
                                <path d="M8 17h6" />
                            </svg>
                        </div>

                        <h4 className="text-base font-bold text-slate-900 sm:text-lg">
                            Keep proof of earlier study
                        </h4>

                        <p className="mt-3 text-sm leading-7 text-slate-600">
                            the UK exempts some students who hold a degree from one of the countries on its list, so check that list before you rely on it.
                        </p>
                    </div>

                    <div className="mt-5 h-1 w-10 rounded-full bg-violet-300 transition-all duration-300 group-hover:w-16" />
                </div>

            </div>

            {/* Related guides */}
            <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/90 p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            <path d="M8 7h8" />
                            <path d="M8 11h8" />
                        </svg>
                    </div>

                    <div className="min-w-0 flex-1">
                        <h4 className="text-base font-bold text-slate-900">
                            Explore visa guidance
                        </h4>

                        <Prose>
                            <p className="text-sm leading-7 text-slate-600">
                                Our{" "}
                                <TextLink href="/student-visa-guidance">
                                    student visa guidance
                                </TextLink>{" "}
                                explains each country&apos;s visa, and the country guides for the{" "}
                                <TextLink href="/study-in-uk">
                                    UK
                                </TextLink>{" "}
                                and{" "}
                                <TextLink href="/study-in-ireland">
                                    Ireland
                                </TextLink>{" "}
                                go further.
                            </p>
                        </Prose>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <AcademyNote lead="Need a test after all?" subjects="IELTS, PTE and OET" />
</GuideSection>

                <FaqList path={PATH} faqs={faqs} schema={false} title="Study abroad without IELTS: frequently asked questions" />

                <OfficialSources
                    links={COUNTRY_RULES.map((row) => ({ label: `${row.label} (${row.country})`, href: row.source, note: "Official English language rules." }))}
                    intro="English rules change. These are the official pages behind this guide, checked on 24 October 2026."
                />

                <RelatedLinks
                    links={[
                        { href: "/universities", title: "All universities", text: "Browse every university we list." },
                        { href: "/study-abroad-after-12th", title: "Study abroad after 12th", text: "Degree and vocational routes for Class 12 students." },
                        { href: "/scholarships-for-indian-students", title: "Scholarships for Indian students", text: "University and government scholarships." },
                        { href: "/destinations", title: "All study destinations", text: "Country guides with universities and courses." },
                    ]}
                />

                <ContactBand />
            </div>
        </div>
    );
}
