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
import { getLiveSlugs, getNursingCourses, groupByCountry } from "@/lib/landingData";

/*
 * Hub for nurses and nursing students from Kerala: the regulator and
 * the main steps in six countries (from each regulator's own site,
 * checked on UPDATED), the nursing courses we list (from the database)
 * and links to the UK and Germany guides. No salary figures.
 */

const PATH = "/study-abroad-for-nurses";
const UPDATED = "2026-10-24";
const TITLE = "Study Abroad for Nurses from Kerala";
const DESCRIPTION =
    "Study abroad for nurses from Kerala: compare nursing routes in the UK, Ireland, Germany, Australia, New Zealand and Malta, with each regulator and course.";

const BREADCRUMBS = [
    { name: "Home", path: "/" },
    { name: "Study abroad for nurses", path: PATH },
];

const REG = {
    nmc: "https://www.nmc.org.uk/registration/joining-the-register/register-nurse-midwife/trained-outside-uk/",
    nmbi: "https://www.nmbi.ie/Registration/Qualified-outside-the-EU",
    germany: "https://www.make-it-in-germany.com/en/working-in-germany/professions-in-demand/nursing",
    nmba: "https://nursingmidwiferyboard.gov.au/Registration-and-Endorsement/International/Completing-the-Self-check.aspx",
    ncnz: "https://nursingcouncil.org.nz/IQN/",
    malta: "https://nursesandmidwivescouncil.gov.mt/en/?p=6107",
    ukWork: "https://www.gold.ac.uk/immigration/during/working-while-studying/",
};

const ROUTES = [
    {
        country: "United Kingdom",
        guide: "/study-in-uk",
        regulator: "Nursing and Midwifery Council (NMC)",
        href: REG.nmc,
        steps: "Eligibility evaluation, English evidence, the Test of Competence, health and character checks and an ID check",
        language: "English, at the level the NMC sets",
    },
    {
        country: "Ireland",
        guide: "/study-in-ireland",
        regulator: "Nursing and Midwifery Board of Ireland (NMBI)",
        href: REG.nmbi,
        steps: "Prepare your application, recognition of your qualification (with an adaptation period or aptitude test if needed), then registration",
        language: "English, at the level the NMBI sets",
    },
    {
        country: "Germany",
        guide: "/nursing-in-germany-for-indian-nurses",
        regulator: "The recognition office of each German state",
        href: REG.germany,
        steps: "Recognition of your qualification, then a knowledge test or an adaptation course of up to 3 years if differences are found",
        language: "German, normally B2",
    },
    {
        country: "Australia",
        guide: "/study-in-australia",
        regulator: "Nursing and Midwifery Board of Australia (NMBA) with Ahpra",
        href: REG.nmba,
        steps: "A Self-check places you in stream A, B or C, each with its own assessment stages; see Ahpra's current process",
        language: "English, at the level the NMBA sets",
    },
    {
        country: "New Zealand",
        guide: null,
        regulator: "Nursing Council of New Zealand",
        href: REG.ncnz,
        steps: "Verify your documents with TruMerit, apply to the Council, complete two cultural safety courses and a criminal history check, and for some nurses a competence assessment (theory exam and OSCE)",
        language: "English, shown as part of document verification",
    },
    {
        country: "Malta",
        guide: "/study-in-malta",
        regulator: "Council for Nurses and Midwives",
        href: REG.malta,
        steps: "Temporary registration for 24 months, a Primary Source Verification certificate (from 1 January 2025) and a non EU bridging course",
        language: "IELTS Academic average of 6, or OET grade B in speaking and C+ in the other skills",
    },
];

export async function generateMetadata() {
    return guideMetadata({
        path: PATH,
        title: TITLE,
        description: DESCRIPTION,
        imageAlt: "Study abroad for nurses from Kerala with Medcity Overseas",
    });
}

export default async function StudyAbroadForNursesPage() {
    const [{ courses, error }, liveSlugs] = await Promise.all([getNursingCourses(), getLiveSlugs()]);
    const groups = groupByCountry(courses);
    const guideHref = (route) => {
        if (!route.guide) return null;
        const match = route.guide.match(/^\/study-in-(.+)$/);

        return match && !liveSlugs.has(match[1]) ? null : route.guide;
    };

    const faqs = [
        {
            question: "Which country is easiest for Indian nurses?",
            answer:
                "No country is simply the easiest. The UK, Ireland, Australia and New Zealand work in English and each has its own registration steps. Germany needs German at B2 but offers recognition and paid training routes. Malta asks for IELTS Academic with an average of 6 or OET, plus a bridging course. The right choice depends on your qualification, language and family plans.",
        },
        {
            question: "Do nurses need IELTS or OET to go abroad?",
            answer:
                "For English speaking countries, yes, you show English through a test the regulator accepts, and each regulator sets its own scores. Malta's council, for example, accepts IELTS Academic with an average of at least 6, or OET with grade B in speaking and C+ in writing, reading and listening. Germany asks for German instead, normally at B2.",
        },
        {
            question: "Can nurses study and work at the same time abroad?",
            answer:
                "Often, within the visa rules. UK Student visa holders on degree courses can usually work up to 20 hours a week in term time. In Germany, nursing Ausbildung trainees are paid a training allowance by their employer.",
        },
        {
            question: "Can I become a nurse abroad straight after Class 12?",
            answer:
                "Yes, through training or a degree. Nursing Ausbildung in Germany starts after ten years of schooling or more, with German and a training contract. Bachelor's nursing degrees abroad are another route; see the nursing courses we list on this page.",
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
                about={{ "@type": "Thing", name: "Nursing careers and study abroad for Indian nurses" }}
                faqs={faqs}
            />

            <div
                className="
                    relative
                    isolate
                    overflow-hidden
                    bg-gradient-to-br
                    from-[#1b103c]
                    via-[#172554]
                    to-[#075985]

                    [&>section]:relative
                    [&>section]:z-10
                    [&>section]:!bg-transparent
                    [&>section>div:first-child]:!hidden
                    [&>section>div:nth-child(2)]:!flex
                    [&>section>div:nth-child(2)]:!flex-col
                    [&>section>div:nth-child(2)]:!items-center
                    [&>section>div:nth-child(2)]:!max-w-6xl
                    [&>section>div:nth-child(2)]:!pb-20
                    [&>section>div:nth-child(2)]:!pt-12

                    [&>section>div>nav]:mx-auto
                    [&>section>div>nav]:w-fit
                    [&>section>div>nav]:max-w-full
                    [&>section>div>nav]:rounded-full
                    [&>section>div>nav]:border
                    [&>section>div>nav]:border-white/15
                    [&>section>div>nav]:bg-white/[0.06]
                    [&>section>div>nav]:px-4
                    [&>section>div>nav]:py-2
                    [&>section>div>nav]:backdrop-blur-md
                    [&>section>div>nav>ol]:justify-center
                    [&>section>div>nav>ol]:gap-x-2
                    [&>section>div>nav>ol]:gap-y-1

                    text-center
                    [&>section>div>nav+p]:mx-auto
                    [&>section>div>nav+p]:w-fit
                    [&>section>div>nav+p]:max-w-full
                    [&>section>div>nav+p]:rounded-full
                    [&>section>div>nav+p]:border
                    [&>section>div>nav+p]:border-amber-200/25
                    [&>section>div>nav+p]:bg-white/[0.06]
                    [&>section>div>nav+p]:px-4
                    [&>section>div>nav+p]:py-2
                    [&>section>div>nav+p]:backdrop-blur-md

                    [&>section>div>h1]:mx-auto
                    [&>section>div>h1]:text-balance
                    [&>section>div>h1]:lg:text-6xl
                    [&>section>div>h1+p]:mx-auto
                    [&>section>div>h1+p]:text-pretty

                    [&>section>div>div:last-child]:items-center
                    [&>section>div>div:last-child]:justify-center
                "
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0"
                >
                    <span className="absolute -left-32 -top-36 size-[28rem] rounded-full bg-primary/20 blur-3xl" />
                    <span className="absolute -bottom-48 -right-32 size-[32rem] rounded-full bg-cyan-300/15 blur-3xl" />
                    <span className="absolute inset-0 opacity-[0.045] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]" />
                </div>

                <GuideHero
                    eyebrow="Nursing abroad"
                    title={TITLE}
                    breadcrumbs={BREADCRUMBS}
                    intro="Study abroad for nurses from Kerala can mean a degree, a paid training, or registration as a nurse in another country. This guide compares six countries, names the regulator that decides in each, and links the nursing courses and guides that fit where you are now."
                />
            </div>

            <div className="space-y-14 py-12 sm:py-14">
                <QuickAnswer updated={UPDATED}>
                    Nurses from Kerala have three kinds of route abroad: study (an MSc or a nursing degree), training (nursing Ausbildung in Germany) and registration (joining the nursing register in the UK, Ireland, Germany, Australia, New Zealand or Malta). Each country&apos;s regulator sets its own steps and language level. Medcity Overseas guides applications to study routes such as the UK pre-registration MSc and nursing Ausbildung.
                </QuickAnswer>

                <QuestionAnswer
                    eyebrow="Choosing a country"
                    question="Which country should a nurse from Kerala choose?"
                    answer="Start with your language and your goal. If you want to work in English, compare the UK, Ireland, Australia, New Zealand and Malta registration steps. If you can learn German to B2, Germany offers recognition for qualified nurses and paid Ausbildung after Class 12. If you want a postgraduate degree first, look at MSc Nursing in the UK."
                />

                <GuideSection
                    title="Compare nursing routes in six countries"
                    intro="Each row comes from the regulator's own website, checked on 24 October 2026. We do not show salaries or success rates."
                >
                    <TableWrap minWidth={820}>
                        <thead className={`{theadClass} bg-darkPrimary! text-white!`}>
                            <tr>
                                <th scope="col" className={th}>Country</th>
                                <th scope="col" className={th}>Regulator</th>
                                <th scope="col" className={th}>Main steps for nurses trained in India</th>
                                <th scope="col" className={th}>Language</th>
                            </tr>
                        </thead>
                        <tbody className={tbodyClass}>
                            {ROUTES.map((route) => {
                                const href = guideHref(route);

                                return (
                                    <tr key={route.country}>
                                        <th scope="row" className={`${th} font-bold text-slate-900`}>
                                            {href ? (
                                                <Link href={href} className="hover:text-primary hover:underline">
                                                    {route.country}
                                                </Link>
                                            ) : (
                                                route.country
                                            )}
                                        </th>
                                        <td className={th}>
                                            <SourceLink href={route.href}>{route.regulator}</SourceLink>
                                        </td>
                                        <td className={th}>{route.steps}</td>
                                        <td className={th}>{route.language}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </TableWrap>
                </GuideSection>

                <GuideSection title="Study routes for nurses" intro="Nursing courses we currently list, read from our course records and grouped by country.">
                    {groups.length ? (
                        <TableWrap minWidth={560}>
                            <thead className={`${theadClass} bg-darkPrimary! text-white!`}>
                                <tr>
                                    <th scope="col" className={th}>Country</th>
                                    <th scope="col" className={th}>Courses listed</th>
                                    <th scope="col" className={th}>Examples</th>
                                </tr>
                            </thead>
                            <tbody className={tbodyClass}>
                                {groups.map((group) => (
                                    <tr key={group.country}>
                                        <th scope="row" className={`${th} font-bold text-slate-900`}>
                                            {group.slug && liveSlugs.has(group.slug) ? (
                                                <Link href={`/study-in-${group.slug}`} className="hover:text-primary hover:underline">
                                                    {group.country}
                                                </Link>
                                            ) : (
                                                group.country
                                            )}
                                        </th>
                                        <td className={th}>{group.courses.length}</td>
                                        <td className={th}>
                                            <ul className="space-y-1">
                                                {group.courses.slice(0, 4).map((course) => (
                                                    <li key={course.id}>
                                                        <Link href={course.href || course.universityHref} className="font-semibold text-primary hover:underline">
                                                            {course.course}
                                                        </Link>
                                                        <span className="text-slate-500">{`, ${course.university}`}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </TableWrap>
                    ) : error ? (
                        <LoadError />
                    ) : (
                        <Prose>
                            <p>Our nursing course list is being updated. Talk to a counsellor for the current options.</p>
                        </Prose>
                    )}
                    <Prose>
                        <p>
                            Registered nurses looking at a master&apos;s degree should read{" "}
                            <TextLink href="/msc-nursing-in-uk">MSc Nursing in the UK</TextLink>. Students after Class 12 can also consider{" "}
                            <TextLink href="/study-in-germany/nursing-ausbildung">nursing Ausbildung in Germany</TextLink>, or search all{" "}
                            <TextLink href="/courses?q=nursing">nursing courses</TextLink>.
                        </p>
                    </Prose>
                </GuideSection>

             <GuideSection title="Registration with each regulator">
    <Prose>
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-blue-50/60 p-5 shadow-sm sm:p-7 lg:p-8">

            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">

                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/10 bg-white text-primary shadow-sm sm:h-14 sm:w-14">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
                        <path d="m9 12 2 2 4-4" />
                    </svg>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <p className="text-base leading-8 text-slate-700 sm:text-[17px] sm:leading-8">
                        Registering as a nurse in another country is decided by that country&apos;s regulator, listed in the table above; follow its own published steps. Medcity Overseas guides applications to study routes, such as the MSc on our{" "}
                        <TextLink href="/placement-assistance-nursing">
                            UK nursing pathway
                        </TextLink>
                        , and does not offer jobs or placements. See also{" "}
                        <TextLink href="/nursing-in-germany-for-indian-nurses">
                            nursing in Germany for Indian nurses
                        </TextLink>.
                    </p>

                    {/* Bottom accent */}
                    <div className="mt-5 flex items-center gap-2">
                        <span className="h-1 w-8 rounded-full bg-primary" />
                        <span className="h-1 w-2 rounded-full bg-primary/30" />
                        <span className="h-1 w-2 rounded-full bg-primary/15" />
                    </div>
                </div>
            </div>
        </div>
    </Prose>
</GuideSection>

                <GuideSection title="English and German tests for nurses">
    <Prose>
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-rose-50/60 p-5 shadow-sm sm:p-7 lg:p-8">

            {/* Decorative elements */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-slate-200/30 blur-3xl" />

            <div className="relative">

                {/* Intro */}
                <div className="mb-7 flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/20 sm:h-14 sm:w-14">
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
                            <path d="m5 8 6 4 6-4" />
                            <path d="M3 4h18v16H3z" />
                            <path d="M7 16h4" />
                            <path d="M14 16h3" />
                        </svg>
                    </div>

                    <div className="min-w-0">
                        <h3 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                            Language proficiency requirements
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-500">
                            Language standards differ depending on the nursing regulator and destination.
                        </p>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

                    {/* English tests */}
                    <div className="group relative overflow-hidden rounded-2xl border border-rose-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg sm:p-6">

                        <div className="mb-5 flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-primary">
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
                                    <path d="M12 2a10 10 0 1 0 10 10" />
                                    <path d="M12 6v6l4 2" />
                                    <path d="M16 2h6v6" />
                                    <path d="m22 2-7 7" />
                                </svg>
                            </div>

                            <span className="rounded-full bg-rose-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                                English
                            </span>
                        </div>

                        <h4 className="text-base font-bold text-slate-900">
                            English language tests
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            English-speaking regulators set their own test-score requirements. Always verify the criteria for your chosen destination.
                        </p>

                        <div className="mt-4 space-y-3">

                            <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                    IELTS Academic
                                </p>
                                <p className="mt-1 text-2xl font-black text-slate-900">
                                    6 <span className="text-sm font-medium text-slate-500">average</span>
                                </p>
                            </div>

                            <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                    OET
                                </p>
                                <p className="mt-2 text-sm font-semibold text-slate-800">
                                    B <span className="font-normal text-slate-500">in Speaking</span>
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                    C+ <span className="font-normal text-slate-500">in Writing, Reading & Listening</span>
                                </p>
                            </div>

                        </div>

                        <div className="mt-5 border-t border-slate-100 pt-4">
                            <p className="text-xs leading-5 text-slate-500">
                                Example requirements from Malta&apos;s{" "}
                                <SourceLink href={REG.malta}>
                                    Council for Nurses and Midwives
                                </SourceLink>.
                            </p>
                        </div>
                    </div>

                    {/* German */}
                    <div className="group relative overflow-hidden rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg sm:p-6">

                        <div className="mb-5 flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
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
                                    <path d="M4 5h16" />
                                    <path d="M4 19h16" />
                                    <path d="M8 5v14" />
                                    <path d="M16 5v14" />
                                    <path d="m10 9 2 6 2-6" />
                                </svg>
                            </div>

                            <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                                Germany
                            </span>
                        </div>

                        <h4 className="text-base font-bold text-slate-900">
                            German language proficiency
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            German language proficiency is required for nursing recognition in Germany.
                        </p>

                        <div className="mt-5 flex min-h-[155px] flex-col items-center justify-center rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50/50 p-5 text-center">

                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                                Typical recognition level
                            </span>

                            <span className="mt-3 text-5xl font-black tracking-tight text-amber-800">
                                B2
                            </span>

                            <span className="mt-2 text-sm font-medium text-amber-800/80">
                                German language
                            </span>
                        </div>

                        <div className="mt-5 border-t border-slate-100 pt-4">
                            <p className="text-xs leading-5 text-slate-500">
                                The required level and assessment may depend on the recognition process.
                            </p>
                        </div>
                    </div>

                    {/* UK work */}
                    <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-6 md:col-span-2 xl:col-span-1">

                        <div className="mb-5 flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
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

                            <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                                UK
                            </span>
                        </div>

                        <h4 className="text-base font-bold text-slate-900">
                            Student visa work allowance
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            Eligible students can usually work part-time during term time, subject to visa conditions.
                        </p>

                        <div className="mt-5 flex min-h-[155px] flex-col items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50/50 p-5 text-center">

                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                                Term-time allowance
                            </span>

                            <span className="mt-3 text-5xl font-black tracking-tight text-blue-900">
                                20
                            </span>

                            <span className="mt-1 text-sm font-semibold text-blue-800">
                                hours per week
                            </span>
                        </div>

                        <div className="mt-5 border-t border-slate-100 pt-4">
                            <p className="text-xs leading-5 text-slate-500">
                                Read the{" "}
                                <SourceLink href={REG.ukWork}>
                                    UK Student visa work rules
                                </SourceLink>{" "}
                                for the applicable restrictions.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom note */}
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white/80 p-4 sm:p-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="19"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                        </svg>
                    </div>

                    <p className="text-sm leading-6 text-slate-600">
                        Requirements can change. Always refer to the official regulator and visa guidance before applying.
                    </p>
                </div>
            </div>
        </div>
    </Prose>

    <AcademyNote subjects="IELTS, OET and German" />
</GuideSection>

                <FaqList path={PATH} faqs={faqs} schema={false} title="Study abroad for nurses: " />

                <OfficialSources
                    links={ROUTES.map((route) => ({ label: `${route.regulator} (${route.country})`, href: route.href, note: "The regulator's page for nurses trained abroad." }))}
                    intro="Registration rules change. These are the regulators' pages behind this guide, checked on 24 October 2026."
                />

                <RelatedLinks className="mt-10!"
                    links={[
                        { href: "/study-in-germany/nursing-ausbildung", title: "Nursing Ausbildung in Germany", text: "Paid nursing training after Class 12." },
                        { href: "/msc-nursing-in-uk", title: "MSc Nursing in the UK", text: "UK courses, entry rules and the Student visa." },
                        { href: "/nursing-in-germany-for-indian-nurses", title: "Nursing in Germany for Indian nurses", text: "Recognition for GNM and BSc nurses." },
                        { href: "/destinations", title: "All study destinations", text: "Country guides with universities and courses." },
                    ]}
                />

                <ContactBand />
            </div>
        </div>
    );
}
