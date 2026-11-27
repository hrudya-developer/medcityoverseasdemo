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
import { universitiesPageIndexable } from "@/lib/destinationSummary";
import { guideMetadata } from "@/lib/guideMeta";
import { getUkNursingMasters } from "@/lib/landingData";
import { AlertCircle, Award, ArrowUpRight, BadgeCheck, BookOpen, Building2, CalendarDays, CheckCircle2, CreditCard, FileCheck, GraduationCap, Info, Languages, ListChecks, MapPin, Plane, ShieldCheck, Stethoscope, Target, Users, Wallet } from "lucide-react";

/*
 * MSc Nursing in the UK for Indian nurses. The course table is read
 * from tb_courses and tb_universities (masters level nursing courses at
 * UK universities) and shows each value as recorded. Visa and
 * registration rules come from GOV.UK, the NMC and a UK university,
 * checked on UPDATED.
 */

const PATH = "/msc-nursing-in-uk";
const UPDATED = "2026-10-24";
const TITLE = "MSc Nursing in the UK for Indian Nurses";
const DESCRIPTION =
    "MSc Nursing in the UK for Indian nurses: courses we can help with, entry requirements as recorded, the NMC route, and Student visa money and work rules.";

const SRC = {
    nmc: "https://www.nmc.org.uk/registration/joining-the-register/register-nurse-midwife/trained-outside-uk/",
    nmcJoin: "https://www.nmc.org.uk/Registration/Joining-the-register/",
    fees: "https://www.gov.uk/student-visa/fees",
    money: "https://www.gov.uk/student-visa/money",
    english: "https://www.gov.uk/student-visa/knowledge-of-english",
    family: "https://www.gov.uk/student-visa/family-members",
    work: "https://www.gold.ac.uk/immigration/during/working-while-studying/",
    cas: "https://www.gold.ac.uk/immigration/student-visa/eligibility/",
};

const BREADCRUMBS = [
    { name: "Home", path: "/" },
    { name: "Study in UK", path: "/study-in-uk" },
    { name: "MSc Nursing in the UK", path: PATH },
];

const SOURCES = [
    { label: "NMC: trained outside the UK", href: SRC.nmc, note: "How nurses trained abroad join the UK register." },
    { label: "GOV.UK: Student visa fees", href: SRC.fees, note: "The visa fee from outside the UK and the healthcare surcharge." },
    { label: "GOV.UK: money you need", href: SRC.money, note: "Living cost funds for London and outside London." },
    { label: "GOV.UK: knowledge of English", href: SRC.english, note: "The English level for degree level study." },
    { label: "GOV.UK: partner and children", href: SRC.family, note: "Who can bring dependants on a Student visa." },
    { label: "Goldsmiths: working while studying", href: SRC.work, note: "Work hour limits for Student visa holders." },
];

function value(text) {
    return text ?? NOT_RECORDED;
}

export async function generateMetadata() {
    return guideMetadata({
        path: PATH,
        title: TITLE,
        description: DESCRIPTION,
        imageAlt: "MSc Nursing in the UK with Medcity Overseas",
    });
}

export default async function MscNursingUkPage() {
    const [{ courses, error }, ukUniversitiesIndexable] = await Promise.all([
        getUkNursingMasters(),
        universitiesPageIndexable("uk"),
    ]);
    // /universities-in-uk is noindex while it lists no universities, so it
    // is not linked when it is known to list none. Unknown (null, the
    // summaries could not be loaded) keeps the link.
    const linkUkUniversities = ukUniversitiesIndexable !== false;
    const universities = [...new Set(courses.map((course) => course.university))];
    const withEntry = courses.filter((course) => course.entry || course.ielts || course.pte);
    const intakes = [...new Set(courses.flatMap((course) => String(course.intakes ?? "").split(/[,/]/).map((item) => item.trim()).filter(Boolean)))];

    const faqs = [
        {
            question: "Does an MSc Nursing in the UK lead to NMC registration?",
            answer:
                "Only if the course is a pre-registration programme approved by the NMC and you complete it. Other MSc Nursing courses are for advanced study and do not give UK registration by themselves. If you are already a nurse in India and mainly want to work in the UK, the NMC route for nurses trained outside the UK may suit you better.",
        },
        {
            question: "Which English test do I need for MSc Nursing in the UK?",
            answer:
                "For a degree level Student visa, GOV.UK asks for English equal to CEFR level B2, and your university can assess your English itself and may accept a different test. The score for each course is set by the university; see the table on this page and the course page. NMC registration has its own English requirement.",
        },
        {
            question: "Can I work while studying MSc Nursing in the UK?",
            answer:
                "Student visa holders on degree level courses can usually work up to 20 hours a week in term time and full time in official holidays, as Goldsmiths explains. For postgraduate students the summer is usually still term time. Your own visa conditions and your university's rules apply, and placement hours on the course are separate from paid work.",
        },
        {
            question: "When are the intakes for MSc Nursing in the UK?",
            answer: intakes.length
                ? `The courses we list record these intakes: ${intakes.join(", ")}. Intakes can change each year, so check the course page and apply early, because the university needs time to issue your offer and CAS before the visa.`
                : "Intakes are set by each university and are shown on each course page. Apply early, because the university needs time to issue your offer and CAS before the visa.",
        },
        {
            question: "Can my family come with me on a UK Student visa?",
            answer:
                "In most cases, no. GOV.UK says that for postgraduate courses starting on or after 1 January 2024, only students on a PhD, another doctorate or a research based higher degree, or government sponsored students, can bring a partner or children. A taught MSc Nursing does not usually qualify.",
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
                image="/og-images/default.webp"
                breadcrumbs={BREADCRUMBS}
                entities={
                    courses.length
                        ? [
                              {
                                  "@type": "ItemList",
                                  "@id": `https://medcityoverseas.com${PATH}#courses`,
                                  name: "MSc Nursing courses in the UK listed by Medcity Overseas",
                                  numberOfItems: courses.length,
                                  itemListElement: courses.slice(0, 30).map((course, index) => ({
                                      "@type": "ListItem",
                                      position: index + 1,
                                      url: `https://medcityoverseas.com${course.href}`,
                                      name: `${course.course}, ${course.university}`,
                                  })),
                              },
                          ]
                        : []
                }
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
                    eyebrow="Study in the UK"
                    title={TITLE}
                    breadcrumbs={BREADCRUMBS}
                    intro="An MSc Nursing in the UK suits registered nurses from Kerala who want a British master's degree, specialist study or a route into leadership and research. Here are the courses we can help you apply to, the entry rules as recorded, how the degree relates to NMC registration, and the Student visa rules that matter most."
                />
            </div>

            <div className="space-y-8 py-12 sm:py-14">
                <QuickAnswer updated={UPDATED}>
                    {`MSc Nursing in the UK is a postgraduate degree for nurses. ${
                        courses.length
                            ? `We currently list ${courses.length} MSc Nursing ${courses.length === 1 ? "course" : "courses"} at ${universities.length} UK ${universities.length === 1 ? "university" : "universities"}.`
                            : error ? "Our course list could not be loaded just now." : "Our course list is being updated."
                    } A taught MSc does not by itself make you a UK registered nurse; that needs an NMC approved pre-registration course or the NMC route for nurses trained abroad. The Student visa asks for English at CEFR B2 and proof of living cost funds.`}
                </QuickAnswer>

                <QuestionAnswer
                    eyebrow="Registration"
                    question="Does an MSc Nursing in the UK make you a registered nurse?"
                    answer="Not always. A pre-registration MSc approved by the NMC can lead to registration when you complete it, while other MSc Nursing courses are for advanced study and do not give registration by themselves. Nurses trained in India who want UK registration follow the NMC route: eligibility, English, the Test of Competence, and health and character checks."
                />

                <GuideSection
                    title="MSc Nursing courses in the UK we can help you apply to"
                    intro="Read from our course records. Each value is shown exactly as recorded; an empty field shows Not recorded. Fees are the figures stored on the course record, not yearly totals, so open the course page to see their basis."
                >
                    {courses.length ? (
                        <TableWrap minWidth={760}>
                            <thead className={`${theadClass} bg-darkPrimary! text-white!`}>
                                <tr>
                                    <th scope="col" className={th}>Course</th>
                                    <th scope="col" className={th}>University</th>
                                    <th scope="col" className={th}>Duration</th>
                                    <th scope="col" className={th}>Intakes</th>
                                    <th scope="col" className={th}>IELTS</th>
                                    <th scope="col" className={th}>Tuition fee as recorded</th>
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
                                            {course.level && <span className="mt-1 block text-xs font-semibold text-slate-500">{course.level}</span>}
                                        </th>
                                        <td className={th}>
                                            <Link href={course.universityHref} className="font-semibold text-primary hover:underline">
                                                {course.university}
                                            </Link>
                                            {course.location && <span className="mt-1 block text-xs text-slate-500">{course.location}</span>}
                                        </td>
                                        <td className={th}>{value(course.duration)}</td>
                                        <td className={th}>{value(course.intakes)}</td>
                                        <td className={th}>{value(course.ielts)}</td>
                                        <td className={th}>{value(course.fee)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </TableWrap>
                    ) : error ? (
                        <LoadError />
                    ) : (
                        <Prose>
                            <p>
                                Our UK nursing course list is being updated.{" "}
                                {linkUkUniversities ? (
                                    <>
                                        Browse all <TextLink href="/universities-in-uk">universities in the UK</TextLink> or talk to a counsellor for the current options.
                                    </>
                                ) : (
                                    "Talk to a counsellor for the current options."
                                )}
                            </p>
                        </Prose>
                    )}
                    <Prose>
                        <p className="text-sm text-slate-600 text-center">
                            See more options on the <TextLink href="/courses?q=nursing">nursing course search</TextLink>
                            {linkUkUniversities ? (
                                <>
                                    {" "}and the <TextLink href="/universities-in-uk">list of UK universities</TextLink>
                                </>
                            ) : null}
                            .
                        </p>
                    </Prose>
                </GuideSection>

              <GuideSection title="Entry requirements for MSc Nursing in the UK" className="mt-20!">
    <div className="space-y-7">

        {/* Introduction */}
        <div className="relative overflow-hidden rounded-2xl mt-3 border border-rose-100 bg-gradient-to-r from-rose-50 via-white to-orange-50 p-5 sm:p-6">
            <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm ring-1 ring-rose-100">
                    <GraduationCap size={23} />
                </div>

                <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                        University admission requirements
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                        Each university sets its own entry requirements. These are the requirements and English scores recorded for the courses above; where a field is empty, ask us or check the course page.
                    </p>
                </div>
            </div>
        </div>

        {/* Course cards grid */}
        {withEntry.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {withEntry.map((course, index) => (
                    <div
                        key={`${course.course}-${course.university}-${index}`}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                    >
                        {/* Top accent */}
                        <div className="h-1.5 bg-gradient-to-r from-primary via-rose-400 to-orange-300" />

                        <div className="p-5 sm:p-6">

                            {/* Course heading */}
                            <div className="mb-5 flex items-start gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-primary">
                                    <GraduationCap size={22} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                                        MSc Nursing Course {index + 1}
                                    </span>

                                    <h4 className="mt-1 text-base font-bold leading-6 text-slate-900 sm:text-lg">
                                        {course.course}
                                    </h4>

                                    <p className="mt-1 text-sm font-medium text-slate-500">
                                        {course.university}
                                    </p>
                                </div>
                            </div>

                            {/* Entry requirement */}
                            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                                        <BookOpen size={15} />
                                    </div>

                                    <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                                        Academic entry requirements
                                    </span>
                                </div>

                                {course.entry?.includes("•") ? (
                                    <ul className="list-disc space-y-1 pl-5 text-sm leading-7 text-slate-700">
                                        {course.entry
                                            .split("•")
                                            .map((requirement) => requirement.trim())
                                            .filter(Boolean)
                                            .map((requirement, requirementIndex) => (
                                                <li key={requirementIndex}>{requirement}</li>
                                            ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm leading-7 text-slate-700">
                                        {course.entry || "Not recorded"}
                                    </p>
                                )}
                            </div>

                            {/* English scores */}
                            <div className="mt-4">
                                <div className="mb-3 flex items-center gap-2">
                                    <Languages size={17} className="text-primary" />
                                    <h5 className="text-sm font-bold text-slate-800">
                                        English language scores
                                    </h5>
                                </div>

                                <div className="grid grid-cols-2 gap-3">

                                    {/* IELTS */}
                                    <div className="rounded-xl border border-rose-100 bg-rose-50/70 p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[10px] font-black text-primary shadow-sm">
                                                I
                                            </span>
                                            <span className="text-xs font-bold text-rose-800">
                                                IELTS
                                            </span>
                                        </div>

                                        <p className="mt-3 break-words text-lg font-extrabold leading-6 text-slate-900">
                                            {value(course.ielts)}
                                        </p>
                                    </div>

                                    {/* PTE */}
                                    <div className="rounded-xl border border-violet-100 bg-violet-50/70 p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[10px] font-black text-violet-700 shadow-sm">
                                                P
                                            </span>
                                            <span className="text-xs font-bold text-violet-800">
                                                PTE
                                            </span>
                                        </div>

                                        <p className="mt-3 break-words text-lg font-extrabold leading-6 text-slate-900">
                                            {value(course.pte)}
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* Bottom note */}
                            <div className="mt-5 flex items-start gap-2 border-t border-slate-100 pt-4">
                                <Info size={15} className="mt-0.5 shrink-0 text-slate-400" />
                                <p className="text-xs leading-5 text-slate-500">
                                    Verify the latest requirements directly with the university before applying.
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {courses.map((course, index) => (
                    <div
                        key={`${course.course}-${course.university}-${index}`}
                        className="overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm"
                    >
                        <div className="h-1.5 bg-gradient-to-r from-amber-400 to-orange-300" />

                        <div className="p-5 sm:p-6">
                            <div className="flex items-start gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                                    <GraduationCap size={22} />
                                </div>

                                <div className="min-w-0">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                                        MSc Nursing Course {index + 1}
                                    </span>

                                    <h4 className="mt-1 font-bold leading-6 text-slate-900">
                                        {course.course}
                                    </h4>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {course.university}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50/70 p-4">
                                <div className="flex items-center gap-2 text-amber-800">
                                    <AlertCircle size={17} />
                                    <span className="text-sm font-bold">
                                        Requirements not recorded
                                    </span>
                                </div>

                                <p className="mt-2 text-sm leading-7 text-slate-600">
                                    Entry requirement and English scores: Not recorded. Check the course page or ask a counsellor.
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* UK visa English guidance */}
        <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-5 sm:p-7">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-indigo-200/30 blur-3xl" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                    <ShieldCheck size={24} />
                </div>

                <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-700">
                        Important visa information
                    </span>

                    <h3 className="mt-1 text-lg font-bold text-slate-900">
                        University admission vs visa requirements
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                        For the visa, <SourceLink href={SRC.english}>GOV.UK</SourceLink> asks for English equal to CEFR level B2 for degree level study, and says a university can assess your English itself. Goldsmiths, for example,{" "}
                        <SourceLink href={SRC.cas}>
                            lists B2 with an IELTS equivalent of 5.5 in each component
                        </SourceLink>{" "}
                        for its Masters courses; each university and course sets its own score.
                    </p>
                </div>
            </div>
        </div>

    </div>

    <AcademyNote lead="Preparing for a test?" subjects="IELTS and OET" />
</GuideSection>

               <GuideSection
    title="Study route or the NMC work route?"
    intro="Nurses from Kerala usually weigh two ways into UK nursing. They lead to different places, so decide what you want first."
>
    <div className="space-y-7">

        {/* Comparison cards */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

            {/* Study route */}
            <div className="group relative overflow-hidden rounded-3xl border border-rose-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                {/* Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-darkPrimary via-darkPrimary to-darkPrimary p-5 text-white sm:p-7">
                    <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full border-[25px] border-white/10" />
                    <div className="pointer-events-none absolute -bottom-16 -right-5 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

                    <div className="relative">
                        <div className="flex items-center justify-between gap-3">
                            <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]">
                                Route 01
                            </span>

                            <GraduationCap size={30} className="text-white/80" />
                        </div>

                        <h3 className="mt-5 text-xl font-extrabold tracking-tight sm:text-2xl">
                            MSc Nursing
                        </h3>

                        <p className="mt-1 text-sm font-medium text-rose-100">
                            The study route
                        </p>

                        <p className="mt-4 max-w-sm text-sm leading-6 text-white/85">
                            Pursue a UK master&apos;s degree and develop specialist nursing knowledge.
                        </p>
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-0 p-5 sm:p-7">

                    {/* Main goal */}
                    <div className="flex gap-4 border-b border-slate-100 pb-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-primary">
                            <Target size={19} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Main goal
                            </p>
                            <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">
                                A UK master&apos;s degree and specialist knowledge
                            </p>
                        </div>
                    </div>

                    {/* Who decides */}
                    <div className="flex gap-4 border-b border-slate-100 py-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                            <Building2 size={19} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Who decides
                            </p>
                            <p className="mt-1 text-sm leading-6 text-slate-700">
                                The university (admission) and UK Visas and Immigration (visa)
                            </p>
                        </div>
                    </div>

                    {/* Key steps */}
                    <div className="border-b border-slate-100 py-5">
                        <div className="mb-3 flex items-center gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <ListChecks size={19} />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Key steps
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {["Offer", "CAS", "Funds", "Student visa"].map((step, index) => (
                                <span
                                    key={step}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-rose-100 bg-rose-50/70 px-3 py-2 text-xs font-semibold text-rose-800"
                                >
                                    <span className="text-rose-400">{index + 1}.</span>
                                    {step}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Registration */}
                    <div className="pt-5">
                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <Award size={19} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Registration
                                </p>
                                <p className="mt-1 text-sm leading-6 text-slate-700">
                                    Only from an NMC approved pre-registration course
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* NMC work route */}
            <div className="group relative overflow-hidden rounded-3xl border border-blue-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                {/* Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary to-secondary p-5 text-white sm:p-7">
                    <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full border-[25px] border-white/10" />
                    <div className="pointer-events-none absolute -bottom-16 -right-5 h-36 w-36 rounded-full bg-blue-400/10 blur-2xl" />

                    <div className="relative">
                        <div className="flex items-center justify-between gap-3">
                            <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]">
                                Route 02
                            </span>

                            <Stethoscope size={30} className="text-blue-200" />
                        </div>

                        <h3 className="mt-5 text-xl font-extrabold tracking-tight sm:text-2xl">
                            NMC Registration
                        </h3>

                        <p className="mt-1 text-sm font-medium text-blue-200">
                            The work route
                        </p>

                        <p className="mt-4 max-w-sm text-sm leading-6 text-white/85">
                            Follow the professional registration pathway to work as a registered nurse in the UK.
                        </p>
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-0 p-5 sm:p-7">

                    {/* Main goal */}
                    <div className="flex gap-4 border-b border-slate-100 pb-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                            <Target size={19} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Main goal
                            </p>
                            <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">
                                Working as a registered nurse in the UK
                            </p>
                        </div>
                    </div>

                    {/* Who decides */}
                    <div className="flex gap-4 border-b border-slate-100 py-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                            <ShieldCheck size={19} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Who decides
                            </p>
                            <p className="mt-1 text-sm leading-6 text-slate-700">
                                The Nursing and Midwifery Council (registration)
                            </p>
                        </div>
                    </div>

                    {/* Key steps */}
                    <div className="border-b border-slate-100 py-5">
                        <div className="mb-3 flex items-center gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                                <ListChecks size={19} />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Key steps
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {[
                                "Eligibility",
                                "English",
                                "Test of Competence",
                                "Health & character",
                                "ID check",
                            ].map((step, index) => (
                                <span
                                    key={step}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50/70 px-3 py-2 text-xs font-semibold text-blue-800"
                                >
                                    <span className="text-blue-400">{index + 1}.</span>
                                    {step}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Registration */}
                    <div className="pt-5">
                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <BadgeCheck size={19} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Registration
                                </p>
                                <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">
                                    The aim of the route
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        {/* Important distinction */}
        <div className="relative overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50 via-white to-orange-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <Info size={20} />
                </div>

                <div>
                    <h4 className="font-bold text-slate-900">
                        Important distinction
                    </h4>
                    <p className="mt-1 text-sm leading-7 text-slate-600">
                        Completing an MSc Nursing degree does not automatically grant NMC registration. The study and professional registration routes have different requirements.
                    </p>
                </div>
            </div>
        </div>

        {/* Related official and internal guides */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <BookOpen size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900">
                        Explore the UK nursing pathways
                    </h4>
                    <p className="text-xs text-slate-500">
                        Official information and related Medcity guides
                    </p>
                </div>
            </div>

            <Prose>
                <p>
                    The <SourceLink href={SRC.nmc}>NMC</SourceLink> lists the steps for nurses trained outside the UK. Our{" "}
                    <TextLink href="/placement-assistance-nursing">
                        UK nursing pathway
                    </TextLink>{" "}
                    page explains the MSc pathway we support, and{" "}
                    <TextLink href="/study-abroad-for-nurses">
                        study abroad for nurses
                    </TextLink>{" "}
                    compares the UK with other countries.
                </p>
            </Prose>
        </div>

    </div>
</GuideSection>
                <GuideSection
    title="UK Student visa steps for MSc Nursing"
    intro="The rules below are from GOV.UK, checked on 24 October 2026."
>
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-rose-50/40 p-4 shadow-sm sm:p-6 lg:p-8">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-blue-100/40 blur-3xl" />

        <div className="relative">

            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                        <Plane size={23} />
                    </div>

                    <div>
                        <h3 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                            Your visa application journey
                        </h3>
                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                            Five important steps before travelling to the UK
                        </p>
                    </div>
                </div>

                <span className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                    5 Application steps
                </span>
            </div>

            {/* Timeline */}
            <div className="relative space-y-4 sm:space-y-5">

                {/* Timeline connector */}
                <div className="absolute bottom-10 left-[19px] top-10 hidden w-px bg-gradient-to-b from-primary/50 via-blue-300 to-emerald-300 sm:block" />

                {/* STEP 1 */}
                <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-[40px_minmax(0,1fr)] sm:gap-4">

                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-primary ring-4 ring-white">
                        <GraduationCap size={20} />
                    </div>

                    <div className="group overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex flex-col gap-3 p-4 sm:p-5 md:flex-row md:items-start md:justify-between">
                            <div className="min-w-0 flex-1">
                                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                                    Step 01 · Admission
                                </span>

                                <h4 className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                                    Get your offer and CAS
                                </h4>

                                <p className="mt-2 text-sm leading-7 text-slate-600">
                                    the university issues a Confirmation of Acceptance for Studies once it is satisfied you meet its requirements.
                                </p>
                            </div>

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-primary md:mt-2">
                                <FileCheck size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* STEP 2 */}
                <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-[40px_minmax(0,1fr)] sm:gap-4">

                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 ring-4 ring-white">
                        <Languages size={20} />
                    </div>

                    <div className="group overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex flex-col gap-3 p-4 sm:p-5 md:flex-row md:items-start md:justify-between">
                            <div className="min-w-0 flex-1">
                                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700">
                                    Step 02 · English proficiency
                                </span>

                                <h4 className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                                    Show your English
                                </h4>

                                <p className="mt-2 text-sm leading-7 text-slate-600">
                                    English equal to CEFR B2 for degree level study, assessed by a test or by the university.
                                </p>

                                <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                                        CEFR level
                                    </span>
                                    <span className="text-xl font-black text-blue-900">
                                        B2
                                    </span>
                                </div>
                            </div>

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 md:mt-2">
                                <BookOpen size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* STEP 3 */}
                <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-[40px_minmax(0,1fr)] sm:gap-4">

                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 ring-4 ring-white">
                        <Wallet size={20} />
                    </div>

                    <div className="group overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">

                        <div className="p-4 sm:p-5">
                            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-700">
                                Step 03 · Financial preparation
                            </span>

                            <h4 className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                                Hold the living cost funds
                            </h4>

                            <p className="mt-2 text-sm leading-7 text-slate-600">
                                1,529 pounds a month in London or 1,171 pounds a month outside London, for up to 9 months, held for 28 days in a row ending within 31 days of your application.
                            </p>

                            {/* Financial highlights */}
                            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

                                <div className="rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50/60 p-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={15} className="text-amber-700" />
                                        <span className="text-xs font-bold text-amber-800">
                                            Inside London
                                        </span>
                                    </div>

                                    <p className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                                        £1,529
                                    </p>

                                    <span className="text-xs text-slate-500">
                                        Per month
                                    </span>
                                </div>

                                <div className="rounded-xl border border-teal-100 bg-gradient-to-br from-teal-50 to-emerald-50/60 p-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={15} className="text-teal-700" />
                                        <span className="text-xs font-bold text-teal-800">
                                            Outside London
                                        </span>
                                    </div>

                                    <p className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                                        £1,171
                                    </p>

                                    <span className="text-xs text-slate-500">
                                        Per month
                                    </span>
                                </div>

                            </div>

                            {/* 28 day rule */}
                            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-amber-200/70 bg-amber-50/70 p-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-amber-700 shadow-sm">
                                    <CalendarDays size={19} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-bold text-amber-900">
                                        28-day financial rule
                                    </p>
                                    <p className="text-xs leading-5 text-amber-800/80">
                                        Funds must be held for 28 consecutive days and the end date must fall within 31 days of your application.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* STEP 4 */}
                <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-[40px_minmax(0,1fr)] sm:gap-4">

                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 ring-4 ring-white">
                        <CreditCard size={20} />
                    </div>

                    <div className="group overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                        <div className="p-4 sm:p-5">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="min-w-0 flex-1">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-700">
                                        Step 04 · Payment
                                    </span>

                                    <h4 className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                                        Pay the fees
                                    </h4>
                                </div>

                                <div className="rounded-xl border border-violet-100 bg-violet-50 px-4 py-3 sm:text-right">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
                                        Visa application fee
                                    </p>
                                    <p className="mt-1 text-2xl font-black text-violet-900">
                                        £558
                                    </p>
                                </div>
                            </div>

                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                the Student visa fee from outside the UK is 558 pounds, plus the healthcare surcharge, which depends on how long your visa lasts.
                            </p>

                            <div className="mt-4 flex items-start gap-2 rounded-xl bg-violet-50/70 p-3">
                                <Info size={16} className="mt-0.5 shrink-0 text-violet-700" />
                                <p className="text-xs leading-5 text-violet-800">
                                    The healthcare surcharge is an additional cost and varies according to visa duration.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* STEP 5 */}
                <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-[40px_minmax(0,1fr)] sm:gap-4">

                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 ring-4 ring-white">
                        <Users size={20} />
                    </div>

                    <div className="group overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                        <div className="p-4 sm:p-5">
                            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                                Step 05 · Final planning
                            </span>

                            <h4 className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                                Apply and plan your family
                            </h4>

                            <p className="mt-2 text-sm leading-7 text-slate-600">
                                students on taught postgraduate courses starting on or after 1 January 2024 generally cannot bring dependants.
                            </p>

                            <div className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3">
                                <Users size={19} className="mt-0.5 shrink-0 text-emerald-700" />
                                <p className="text-xs leading-6 text-emerald-900">
                                    Check dependant eligibility before making family travel arrangements.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Completion footer */}
            <div className="mt-7 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <CheckCircle2 size={21} />
                </div>

                <div>
                    <p className="text-sm font-bold text-slate-900">
                        Understand every step before applying
                    </p>
                    <p className="mt-0.5 text-xs leading-5 text-slate-500">
                        Review the official requirements and prepare your documents carefully.
                    </p>
                </div>
            </div>

        </div>
    </div>

    {/* Related official resources */}
    <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <BookOpen size={21} />
            </div>

            <div className="min-w-0 flex-1">
                <h4 className="text-base font-bold text-slate-900">
                    Official visa resources
                </h4>

                <Prose>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                        Read the full GOV.UK pages on{" "}
                        <SourceLink href={SRC.money}>money</SourceLink>,{" "}
                        <SourceLink href={SRC.fees}>fees</SourceLink> and{" "}
                        <SourceLink href={SRC.family}>dependants</SourceLink>, and our{" "}
                        <TextLink href="/study-in-uk">study in UK guide</TextLink>.
                    </p>
                </Prose>
            </div>
        </div>
    </div>

</GuideSection>

<GuideSection title="How Medcity Overseas helps" className="mt-15!">
    <div className="space-y-7 mt-5!">

        {/* Intro */}
        <div className="relative overflow-hidden rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-white p-5 sm:p-7">
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-rose-100/60 blur-2xl" />

            <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#c01f53] text-white shadow-lg shadow-rose-200 sm:h-14 sm:w-14">
                    <ShieldCheck size={26} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c01f53]">
                        Your journey, our guidance
                    </p>
                    <h3 className="mt-1 text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                        Support at every stage of your UK nursing journey
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                        From choosing the right course to preparing for your move, we help you navigate each step with confidence.
                    </p>
                </div>
            </div>
        </div>

        {/* Support cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {[
                {
                    number: "01",
                    title: "Profile Assessment",
                    text: "Checking your BSc or GNM marks, experience and goals against the courses we list.",
                    icon: GraduationCap,
                    color: "rose",
                },
                {
                    number: "02",
                    title: "Course Shortlisting",
                    text: "Shortlisting MSc Nursing courses and preparing your statement, CV and references.",
                    icon: BookOpen,
                    color: "violet",
                },
                {
                    number: "03",
                    title: "English Test Preparation",
                    text: "Pointing you to IELTS and OET classes at Medcity International Academy.",
                    icon: Languages,
                    color: "amber",
                },
                {
                    number: "04",
                    title: "Application & Visa Guidance",
                    text: "Help with the CAS stage, the funds evidence and the Student visa application.",
                    icon: FileCheck,
                    color: "blue",
                },
                {
                    number: "05",
                    title: "Pre-departure Support",
                    text: "Pre-departure guidance on housing, travel and your first weeks in the UK.",
                    icon: Plane,
                    color: "emerald",
                },
            ].map((item) => {
                const Icon = item.icon;

                const styles = {
                    rose: {
                        icon: "bg-rose-100 text-rose-600",
                        number: "text-rose-500",
                        border: "hover:border-rose-200",
                    },
                    violet: {
                        icon: "bg-violet-100 text-violet-600",
                        number: "text-violet-500",
                        border: "hover:border-violet-200",
                    },
                    amber: {
                        icon: "bg-amber-100 text-amber-600",
                        number: "text-amber-600",
                        border: "hover:border-amber-200",
                    },
                    blue: {
                        icon: "bg-sky-100 text-sky-600",
                        number: "text-sky-600",
                        border: "hover:border-sky-200",
                    },
                    emerald: {
                        icon: "bg-emerald-100 text-emerald-600",
                        number: "text-emerald-600",
                        border: "hover:border-emerald-200",
                    },
                };

                const style = styles[item.color];

                return (
                    <div
                        key={item.number}
                        className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 sm:p-6 ${style.border}`}
                    >
                        <div className="flex items-center justify-between">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.icon}`}>
                                <Icon size={23} strokeWidth={1.8} />
                            </div>

                            <span className={`text-sm font-extrabold tracking-widest ${style.number}`}>
                                {item.number}
                            </span>
                        </div>

                        <h3 className="mt-5 text-base font-bold text-slate-900 sm:text-lg">
                            {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-slate-600">
                            {item.text}
                        </p>

                        <div className="mt-5 h-1 w-10 rounded-full bg-slate-200 transition-all duration-300 group-hover:w-16 group-hover:bg-[#c01f53]" />
                    </div>
                );
            })}
        </div>

        {/* Important clarification */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6">
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#c01f53] shadow-sm ring-1 ring-slate-200">
                    <ShieldCheck size={20} />
                </div>

                <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                        Clear guidance. Transparent responsibilities.
                    </h3>

                    <Prose>
                        <p>
                            We give guidance and application help; universities decide admissions and UK Visas and Immigration decides visas. Visit one of our{" "}
                            <TextLink href="/branches">branches</TextLink> to book a counselling session.
                        </p>
                    </Prose>
                </div>
            </div>
        </div>

    </div>
</GuideSection>

                <FaqList path={PATH} faqs={faqs} schema={false} title="MSc Nursing in the UK: frequently asked questions" />

                <OfficialSources links={SOURCES} intro="Rules, fees and requirements change. These are the official pages behind this guide, checked on 24 October 2026." />

                <RelatedLinks
                    links={[
                        { href: "/study-abroad-for-nurses", title: "Study abroad for nurses", text: "Compare nursing routes in six countries." },
                        { href: "/placement-assistance-nursing", title: "UK nursing pathway", text: "The MSc pathway we support in the UK." },
                        { href: "/study-in-uk", title: "Study in the UK", text: "Our full country guide for the United Kingdom." },
                        { href: "/student-visa-guidance", title: "Student visa guidance", text: "How we prepare visa files for each country." },
                    ]}
                />

                <ContactBand />
            </div>
        </div>
    );
}
