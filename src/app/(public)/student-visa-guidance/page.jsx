import Link from "next/link";

import FaqList from "@/components/seo/FaqList";
import OfficialSources from "@/components/seo/OfficialSources";
import PageSchema from "@/components/seo/PageSchema";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";
import {
    ContactBand,
    GuideHero,
    GuideSection,
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
import { getLiveSlugs } from "@/lib/landingData";
import { ArrowRight, BookOpen } from "lucide-react";

/*
 * Student visa guidance for Kerala students, one section per country
 * we list. Every rule and amount is from the official page linked next
 * to it (government, embassy or university), checked on UPDATED. No
 * approval rates, success claims or visa guarantees.
 */

const PATH = "/student-visa-guidance";
const UPDATED = "2026-10-24";
const TITLE = "Student Visa Guidance from Kerala";
const DESCRIPTION =
    "Student visa guidance from Kerala for the UK, Ireland, Germany, Australia and Malta: official rules, the money to show, documents and how we prepare files.";
const GUIDE_SECTION_SURFACE =
    "!my-0 !max-w-6xl rounded-[1.75rem] border border-slate-200/70 bg-white/90 py-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] ring-1 ring-white/80 transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(15,23,42,0.09)] sm:py-8 lg:py-9";
const GUIDE_SECTION_WIDE_SURFACE =
    "!my-0 !max-w-7xl rounded-[1.75rem] border border-slate-200/70 bg-white/90 py-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] ring-1 ring-white/80 sm:py-8 lg:py-9";

const SRC = {
    ukFees: "https://www.gov.uk/student-visa/fees",
    ukMoney: "https://www.gov.uk/student-visa/money",
    ukEnglish: "https://www.gov.uk/student-visa/knowledge-of-english",
    ukFamily: "https://www.gov.uk/student-visa/family-members",
    ukCas: "https://www.gold.ac.uk/immigration/student-visa/eligibility/",
    ieFunds: "https://www.irishimmigration.ie/coming-to-study-in-ireland/information-on-student-finances/",
    ieEnglish: "https://www.irishimmigration.ie/coming-to-study-in-ireland/english-language-requirements-for-study-visas/",
    deStudy: "https://india.diplo.de/in-en/service/-/2552164",
    auHomeAffairs: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
    auTests: "https://www.studyaustralia.gov.au/en/plan-your-move/language-testing-organisations",
    mtUni: "https://www.um.edu.mt/int-eu/international/visa",
    mtIdentita: "https://identita.gov.mt/frequently-asked-questions/expatriates/non-eu-non-employment/study/",
};

const BREADCRUMBS = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Student visa guidance", path: PATH },
];

const SUMMARY = [
    { country: "United Kingdom", slug: "uk", visa: "Student visa", authority: "UK Visas and Immigration (GOV.UK)", href: SRC.ukMoney, money: "1,529 pounds a month in London or 1,171 pounds a month elsewhere, for up to 9 months" },
    { country: "Ireland", slug: "ireland", visa: "Study visa (degree programme)", authority: "Irish Immigration Service", href: SRC.ieFunds, money: "Immediate access to at least 10,000 euros for the first year, plus fees" },
    { country: "Germany", slug: "germany", visa: "National visa for university studies", authority: "German Missions in India", href: SRC.deStudy, money: "A blocked account of 11,904 euros for the first year, on the checklist dated 30 August 2024" },
    { country: "Australia", slug: "australia", visa: "Student visa (subclass 500)", authority: "Department of Home Affairs", href: SRC.auHomeAffairs, money: "Not recorded here: check the Home Affairs Student visa page" },
    { country: "Malta", slug: "malta", visa: "Long stay (D) visa, then an e-Residence Permit", authority: "Identità, with the university", href: SRC.mtUni, money: "At least 950 euros per month of stay, excluding tuition, for the permit (University of Malta)" },
];

const FAQS = [
    {
        question: "Do you guarantee a student visa?",
        answer:
            "No. Only the government of the country decides on a visa, and no consultant can guarantee one. Medcity Overseas helps you understand the official checklist, prepare complete and consistent documents and book your appointment. We do not publish approval rates.",
    },
    {
        question: "How early should I start my student visa?",
        answer:
            "Start as soon as you accept an offer, because some evidence takes weeks to build. The UK asks for funds held for 28 days in a row, Ireland asks for 6 months of bank statements, and Germany asks for a blocked account and an APS certificate. Plan several months before your course starts.",
    },
    {
        question: "What is proof of funds for a student visa?",
        answer:
            "It is evidence that you can pay for living costs (and sometimes fees) without working. GOV.UK sets 1,529 pounds a month in London or 1,171 pounds a month elsewhere, for up to 9 months. Ireland asks for immediate access to at least 10,000 euros for the first year. Germany usually uses a blocked account.",
    },
    {
        question: "Can my family come with me on a student visa?",
        answer:
            "It depends on the country and course. In the UK, students on taught postgraduate courses starting on or after 1 January 2024 generally cannot bring dependants; research degree students and government sponsored students can. Check the official rules for your country before you plan.",
    },
];

export async function generateMetadata() {
    return guideMetadata({
        path: PATH,
        title: TITLE,
        description: DESCRIPTION,
        imageAlt: "Student visa guidance from Kerala with Medcity Overseas",
    });
}

function CountryLink({ row, liveSlugs }) {
    return liveSlugs.has(row.slug) ? (
        <Link href={`/study-in-${row.slug}`} className="hover:text-primary hover:underline">
            {row.country}
        </Link>
    ) : (
        row.country
    );
}

export default async function StudentVisaGuidancePage() {
    const liveSlugs = await getLiveSlugs();

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
                about={{ "@type": "Thing", name: "Student visas for Indian students" }}
                faqs={FAQS}
            />

            <div
                className="
                    [&>section>div:nth-child(2)]:!mx-auto
                    [&>section>div:nth-child(2)]:!max-w-9xl
                    [&>section>div:nth-child(2)]:!w-full
                    [&>section>div:nth-child(2)]:!text-center
                    [&>section>div:nth-child(2)>nav>ol]:!justify-center
                    [&>section>div:nth-child(2)>h1]:!mx-auto
                    [&>section>div:nth-child(2)>p]:!mx-auto
                    [&>section>div:nth-child(2)>div]:!justify-center
                    flex w-full flex-col items-stretch
                "
            >
                <GuideHero
                    eyebrow="Visas"
                    title={TITLE}
                    breadcrumbs={BREADCRUMBS}
                    intro="Student visa guidance from Kerala, country by country. For each destination we list the visa's name, the authority that decides it, the money and documents it asks for, and how Medcity Overseas helps you prepare. Every rule links to the official page it comes from."
                />
            </div>

            <div className="relative isolate space-y-8 bg-gradient-to-b from-slate-50 via-white to-rose-50/30 py-10 sm:space-y-10 sm:py-14 lg:py-16">
                <QuickAnswer updated={UPDATED}>
                    A student visa needs an offer from a recognised institution, proof that you can pay your living costs, proof of English (or German) and a complete document set. The UK asks for living cost funds held for 28 days, Ireland at least 10,000 euros for the first year, and Germany a blocked account. Only the government decides; Medcity Overseas helps you prepare.
                </QuickAnswer>

                <QuestionAnswer
                    eyebrow="Before you start"
                    question="What does a student visa application usually need?"
                    answer="Most student visas ask for the same core evidence: an offer or enrolment confirmation from the institution, proof of funds for living costs and sometimes fees, proof of English or German, a valid passport and photos, and health insurance or a health check. The details, amounts and order differ by country, so follow the official checklist for yours."
                    className="!py-4 sm:!py-5 lg:!py-6"
                />

                <GuideSection className={GUIDE_SECTION_WIDE_SURFACE} title="Student visas at a glance" intro="Amounts are as published on the official page linked for each country, checked on 24 October 2026.">
                    <TableWrap minWidth={760}>
                        <thead className={`(${theadClass} bg-darkPrimary! text-white!)`}>
                            <tr className="text-white">
                                <th scope="col" className={th}>Country</th>
                                <th scope="col" className={th}>Visa</th>
                                <th scope="col" className={th}>Official source</th>
                                <th scope="col" className={th}>Money to show</th>
                            </tr>
                        </thead>
                        <tbody className={tbodyClass}>
                            {SUMMARY.map((row) => (
                                <tr key={row.country}>
                                    <th scope="row" className={`${th} font-bold text-slate-900`}>
                                        <CountryLink row={row} liveSlugs={liveSlugs} />
                                    </th>
                                    <td className={th}>{row.visa}</td>
                                    <td className={th}>
                                        <SourceLink href={row.href}>{row.authority}</SourceLink>
                                    </td>
                                    <td className={th}>{row.money}</td>
                                </tr>
                            ))}
                        </tbody>
                    </TableWrap>
                </GuideSection>

                


<GuideSection title="UK Student visa from Kerala" className="!mt-15 !max-w-7xl">
    <div className="mt-5 overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)] ring-1 ring-white/80 sm:mt-5">

        {/* Premium editorial header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-sky-50/80 px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">

            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_300px] md:items-center">

                <div className="relative z-10 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#c01f53]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#c01f53] ring-1 ring-[#c01f53]/10">
                            UK Study Guide
                        </span>
                        <span className="rounded-full bg-darkPrimary px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-white shadow-sm">
                            Student Visa Information
                        </span>
                    </div>

                    <h3 className="mt-5 max-w-2xl text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]">
                        Your journey to{" "}
                        <span className="text-[#c01f53]">study in the UK</span>{" "}
                        starts here.
                    </h3>

                    <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                        Understand the essential visa requirements, financial proof and documentation needed before beginning your UK student visa application from Kerala.
                    </p>

                </div>

                <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-rose-100/80 bg-white/90 p-4 shadow-[0_14px_40px_rgba(15,23,42,0.08)] ring-1 ring-white/80 backdrop-blur-sm md:mx-0 md:max-w-none lg:p-5">
                    <span className="absolute right-4 top-4 rounded-full bg-darkPrimary px-3 py-1.5 text-[10px] font-extrabold tracking-[0.12em] text-white shadow-sm sm:text-[11px]">
                        UNITED KINGDOM
                    </span>
                    <div className="mt-10 space-y-3">
                        <div className="flex items-center gap-3 rounded-xl bg-rose-50/80 p-3.5 ring-1 ring-rose-100/80">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-black text-[#c01f53] shadow-sm">
                                05
                            </span>
                            <span className="text-sm font-extrabold text-slate-800">
                                5 Key Requirements
                            </span>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3.5 ring-1 ring-slate-100">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#c01f53] shadow-sm">
                                <BookOpen size={17} aria-hidden="true" />
                            </span>
                            <span className="text-sm font-bold text-slate-700">
                                Updated visa guidance
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-[#c01f53]/5 blur-3xl" />
        </div>

        {/* Requirements section */}
        <div className="border-t border-slate-100 px-4 pb-5 pt-8 sm:px-7 sm:pb-7 sm:pt-10 lg:px-9 lg:pb-9 lg:pt-12">

            <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#c01f53]">
                        Before you apply
                    </p>
                    <h4 className="mt-2 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                        Visa requirements at a glance
                    </h4>
                </div>
                <p className="text-xs text-slate-500">
                    Important information for applicants
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

                {[
                    {
                        number: "01",
                        title: "Offer and CAS",
                        text: "Your university issues a Confirmation of Acceptance for Studies once it is satisfied you meet its requirements.",
                        icon: "🎓"
                    },
                    {
                        number: "02",
                        title: "English proficiency",
                        text: "Equal to CEFR B2 for degree level study, by test or by the university's own assessment.",
                        icon: "🗣️"
                    },
                    {
                        number: "03",
                        title: "Financial requirements",
                        text: "1,529 pounds a month in London or 1,171 pounds a month elsewhere, for up to 9 months, held for 28 days in a row ending within 31 days of applying.",
                        icon: "💷"
                    },
                    {
                        number: "04",
                        title: "Visa application fees",
                        text: "558 pounds from outside the UK, plus the healthcare surcharge.",
                        icon: "📋"
                    },
                    {
                        number: "05",
                        title: "Family and dependants",
                        text: "Taught postgraduate students generally cannot bring dependants.",
                        icon: "👨‍👩‍👧"
                    }
                ].map((item) => (
                    <div
                        key={item.number}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-rose-50/40 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c01f53]/30 hover:shadow-lg"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-50 to-white text-xl ring-1 ring-rose-100 transition-transform duration-300 group-hover:scale-110">
                                {item.icon}
                            </div>
                            <span className="text-2xl font-black tracking-tight text-slate-200 transition-colors group-hover:text-[#c01f53]/30">
                                {item.number}
                            </span>
                        </div>

                        <h5 className="mt-5 text-base font-extrabold text-slate-900">
                            {item.title}
                        </h5>

                        <p className="mt-2 text-sm leading-7 text-slate-600">
                            {item.text}
                        </p>

                        <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#c01f53] transition-all duration-300 group-hover:w-full" />
                    </div>
                ))}
            </div>

            {/* Official references */}
            <div className="mt-8 rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#c01f53] shadow-sm">
                        <BookOpen size={19} />
                    </div>
                    <div>
                        <h4 className="text-sm font-extrabold text-slate-900">
                            Official sources & further reading
                        </h4>
                        <p className="mt-1 text-xs text-slate-500">
                            Verify the latest requirements through official sources.
                        </p>
                    </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                    Sources: GOV.UK on{" "}
                    <SourceLink href={SRC.ukMoney}>money</SourceLink>,{" "}
                    <SourceLink href={SRC.ukFees}>fees</SourceLink>,{" "}
                    <SourceLink href={SRC.ukEnglish}>English</SourceLink> and{" "}
                    <SourceLink href={SRC.ukFamily}>family</SourceLink>, and{" "}
                    <SourceLink href={SRC.ukCas}>Goldsmiths on the CAS</SourceLink>.
                </p>

                <div className="mt-4 border-t border-slate-200 pt-4">
                    <TextLink href="/study-in-uk">
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-[#c01f53] transition-all hover:gap-3">
                            Explore our complete UK study guide
                            <ArrowRight size={16} />
                        </span>
                    </TextLink>
                </div>
            </div>
        </div>
    </div>
</GuideSection>




<GuideSection
    title="Ireland study visa from Kerala"
    className={`${GUIDE_SECTION_SURFACE} max-w-7xl! mx-auto!`}
>
    <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm mt-5">

        {/* Hero */}
        <div className="relative overflow-hidden bg-[#f5f7f4]">
            <div className="grid md:grid-cols-[1fr_240px] lg:grid-cols-[1fr_280px]">

                <div className="relative z-10 p-6 sm:p-9 lg:p-10">
                    <div className="flex items-center gap-3">
                        <span className="h-[3px] w-9 bg-[#c01f53]" />
                        <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#c01f53]">
                            Ireland student visa
                        </span>
                    </div>

                    <h3 className="mt-5 max-w-2xl text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-4xl">
                        Your pathway to
                        <span className="text-[#c01f53]"> Ireland.</span>
                    </h3>

                    <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                        Get familiar with the financial evidence and English language requirements before planning your education journey in Ireland.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                            <span className="text-xl">💶</span>
                            <div>
                                <p className="text-xs font-bold text-slate-900">Financial proof</p>
                                <p className="text-[11px] text-slate-500">Student funds</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                            <span className="text-xl">📑</span>
                            <div>
                                <p className="text-xs font-bold text-slate-900">Documentation</p>
                                <p className="text-[11px] text-slate-500">Visa essentials</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ireland visual panel */}
                <div className="relative hidden overflow-hidden bg-[#0c2553] md:flex md:items-center md:justify-center">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
                    <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/10" />
                    <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/5" />

                    <div className="relative flex flex-col items-center">
                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-2xl lg:h-40 lg:w-40">
                            <span className="text-7xl lg:text-8xl">🇮🇪</span>
                        </div>

                        <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-white/60">
                            Study destination
                        </p>

                        <p className="mt-2 text-2xl font-black text-white lg:text-3xl">
                            Ireland
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile country strip */}
            <div className="flex items-center gap-3 border-t border-slate-200 bg-white px-5 py-3 md:hidden">
                <span className="text-2xl">🇮🇪</span>
                <span className="text-sm font-bold text-slate-800">Ireland · Study destination</span>
            </div>
        </div>

        {/* Requirement content */}
        <div className="p-5 sm:p-8 lg:p-10">
            <div className="mb-6">
                <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#c01f53]">
                    Visa essentials
                </span>

                <h4 className="mt-2 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                    Important requirements
                </h4>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                    Make sure you understand these three key requirements before submitting your application.
                </p>
            </div>

            <PointList
                items={[
                    { title: "Funds", text: "immediate access to at least 10,000 euros for the first year of a degree course, and the same plus fees for each later year." },
                    { title: "Bank statements", text: "6 months of statements on headed paper, with large or irregular deposits explained. Credit cards are not accepted." },
                    { title: "English", text: "a test from the visa list, issued within 2 years of your start date." },
                ]}
            />

            {/* Source section */}
            <div className="mt-8 rounded-2xl bg-slate-50 p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#c01f53] shadow-sm">
                        <BookOpen size={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-extrabold text-slate-900">
                            Official references
                        </h4>

                        <p className="mt-2 text-sm leading-7 text-slate-600">
                            Sources: Irish Immigration Service on{" "}
                            <SourceLink href={SRC.ieFunds}>student finances</SourceLink> and{" "}
                            <SourceLink href={SRC.ieEnglish}>English</SourceLink>.
                        </p>

                        <div className="mt-4 border-t border-slate-200 pt-4">
                            <TextLink href="/study-in-ireland">
                                <span className="inline-flex items-center gap-2 text-sm font-bold text-[#c01f53] transition-all hover:gap-3">
                                    Explore our Ireland study guide
                                    <ArrowRight size={16} />
                                </span>
                            </TextLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</GuideSection>


                <GuideSection title="Germany student visa from Kerala" className={GUIDE_SECTION_SURFACE}>
                    <PointList
                        items={[
                            { title: "Admission", text: "proof of admission to the course or a preparatory college, stating the language of instruction." },
                            { title: "Funds", text: "a blocked account (11,904 euros for the first year on the checklist dated 30 August 2024), a scholarship, or a formal obligation letter from a sponsor in Germany. Check the current amount before you open the account." },
                            { title: "APS certificate", text: "from the Academic Evaluation Centre (APS) in India." },
                            { title: "Language", text: "at least B2 in the language of instruction unless the admission letter confirms it; exemption letters and medium of instruction certificates are not accepted." },
                            { title: "Fee and insurance", text: "a visa fee of 75 euros, paid in rupees, and travel health insurance until enrolment." },
                        ]}
                    />
                    <Prose>
                        <p>
                            Source: <SourceLink href={SRC.deStudy}>German Missions in India checklist</SourceLink>. For training rather than study, see{" "}
                            <TextLink href="/study-in-germany/nursing-ausbildung">nursing Ausbildung</TextLink> and our{" "}
                            <TextLink href="/study-in-germany">Germany programmes</TextLink>.
                        </p>
                    </Prose>
                </GuideSection>

                <GuideSection title="Australia student visa from Kerala" className={GUIDE_SECTION_SURFACE}>
                    <PointList
                        items={[
                            { title: "One visa", text: "the Student visa (subclass 500), usually applied for online through ImmiAccount." },
                            { title: "Confirmation of Enrolment", text: "a CoE from your education provider for each course." },
                            { title: "Health", text: "you may need health examinations; Home Affairs tells you which ones after you apply." },
                            { title: "English", text: "a test from the accepted list, taken at a secure test centre." },
                        ]}
                    />
                    <Prose>
                        <p>
                            Sources: <SourceLink href={SRC.auHomeAffairs}>Department of Home Affairs: Student visa</SourceLink> and{" "}
                            <SourceLink href={SRC.auTests}>Study Australia</SourceLink>. Read our <TextLink href="/study-in-australia">study in Australia guide</TextLink>.
                        </p>
                    </Prose>
                </GuideSection>

                <GuideSection title="Malta student visa from Kerala" className={GUIDE_SECTION_SURFACE}>
                    <PointList
                        items={[
                            { title: "Two stages", text: "a long stay (D) study visa first, then an e-Residence Permit through Identità after you arrive and enrol." },
                            { title: "Funds", text: "bank statements for the last 3 months with at least 950 euros per month of stay, excluding tuition fees; the University of Malta warns this is not enough for real living costs." },
                            { title: "Health", text: "an immunisation certificate and a health screening form." },
                            { title: "Course type", text: "the study permit is for full time higher education; part time courses do not qualify." },
                        ]}
                    />
                    <Prose>
                        <p>
                            Sources: <SourceLink href={SRC.mtUni}>University of Malta</SourceLink> and <SourceLink href={SRC.mtIdentita}>Identità</SourceLink>. Read our{" "}
                            <TextLink href="/study-in-malta">study in Malta guide</TextLink>.
                        </p>
                    </Prose>
                </GuideSection>

                <GuideSection title="Common reasons visa applications are delayed or refused" className={GUIDE_SECTION_SURFACE}>
                    <PointList
                        items={[
                            "Incomplete documents or a missed appointment: the German Missions in India say this may lead to rejection.",
                            "Funds not held long enough: the UK needs 28 days in a row, ending within 31 days of your application.",
                            "Unexplained deposits: Ireland asks you to explain large or irregular amounts in your statements.",
                        ]}
                    />
                </GuideSection>

                <GuideSection title="How Medcity Overseas helps with your student visa" className={GUIDE_SECTION_SURFACE}>
                    <PointList
                        items={[
                            "Going through the official checklist for your country with you, line by line.",
                            "Checking that your offer, funds, test results and documents tell one consistent story.",
                            "Help with forms, appointment booking and interview preparation where an interview is part of the process.",
                            "Pre-departure guidance once your visa is decided.",
                        ]}
                    />
                    <Prose>
                        <p>
                            We do not guarantee visas or publish approval rates, and we do not give advice on work or migration visas. Visit a <TextLink href="/branches">branch near you</TextLink> or{" "}
                            <TextLink href="/contact-us">contact us</TextLink> to book a counselling session.
                        </p>
                    </Prose>
                </GuideSection>

                <FaqList
                    path={PATH}
                    faqs={FAQS}
                    schema={false}
                    title="Student visa guidance: frequently asked questions"
                    className="!max-w-6xl border border-rose-100/80 !bg-gradient-to-br !from-white !via-rose-50/60 !to-sky-50/60 shadow-[0_24px_70px_rgba(15,23,42,0.07)] ring-1 ring-white/80"
                />

                <OfficialSources
                    links={[
                        { label: "GOV.UK: Student visa money", href: SRC.ukMoney, note: "Living cost funds for the UK Student visa." },
                        { label: "GOV.UK: Student visa fees", href: SRC.ukFees, note: "The visa fee and healthcare surcharge." },
                        { label: "Irish Immigration Service: student finances", href: SRC.ieFunds, note: "Funds and bank statements for Ireland." },
                        { label: "German Missions in India: study visa checklist", href: SRC.deStudy, note: "Documents, blocked account and APS for Germany." },
                        { label: "Department of Home Affairs: Student visa", href: SRC.auHomeAffairs, note: "The Australian Student visa (subclass 500)." },
                        { label: "University of Malta: visas", href: SRC.mtUni, note: "The study visa and e-Residence Permit for Malta." },
                    ]}
                    intro="Visa rules and amounts change. These are the official pages behind this guide, checked on 24 October 2026."
                    className="!my-0"
                />

                <RelatedLinks
                    links={[
                        { href: "/destinations", title: "All study destinations", text: "Country guides with universities and courses." },
                        { href: "/study-abroad-without-ielts", title: "Study abroad without IELTS", text: "What each country accepts instead of IELTS." },
                        { href: "/scholarships-for-indian-students", title: "Scholarships for Indian students", text: "University and government scholarships." },
                        { href: "/add-on-services", title: "Add-on services", text: "Extra help before you travel." },
                    ]}
                    className="!my-0 rounded-[2rem] border border-rose-100/80 bg-gradient-to-br from-white via-rose-50/70 to-sky-50/60 !px-5 !py-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ring-1 ring-white/80 sm:!px-8 sm:!py-10"
                />

                <ContactBand />
            </div>
        </div>
    );
}
