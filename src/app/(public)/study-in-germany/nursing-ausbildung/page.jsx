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

/*
 * Nursing Ausbildung in Germany, for Kerala students after Class 12.
 * Every rule here is taken from the German law or official page linked
 * next to it (checked on UPDATED). No allowance amounts: they depend
 * on the employer and the contract.
 */

const PATH = "/study-in-germany/nursing-ausbildung";
const UPDATED = "2026-10-24";
const TITLE = "Nursing Ausbildung in Germany from Kerala";
const DESCRIPTION =
    "Nursing Ausbildung in Germany for Kerala students: who can apply, the German level the visa asks for, the paid training contract and each step to your visa.";
const OG_IMAGE = "/og-images/study-in-germany.webp";
const GUIDE_SECTION_SURFACE =
    "!my-5 !max-w-6xl rounded-[1.75rem] border border-slate-200/70 bg-white/90 py-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] ring-1 ring-white/80 transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(15,23,42,0.09)] sm:py-8 lg:py-9";

const SRC = {
    pflbg1: "https://www.gesetze-im-internet.de/pflbg/__1.html",
    pflbg2: "https://www.gesetze-im-internet.de/pflbg/__2.html",
    pflbg6: "https://www.gesetze-im-internet.de/pflbg/__6.html",
    pflbg11: "https://www.gesetze-im-internet.de/pflbg/__11.html",
    pflbg19: "https://www.gesetze-im-internet.de/pflbg/__19.html",
    aufenthg16a: "https://www.gesetze-im-internet.de/aufenthg_2004/__16a.html",
    aufenthg2: "https://www.gesetze-im-internet.de/aufenthg_2004/__2.html",
    mission: "https://india.diplo.de/in-en/service/-/2554108",
    makeIt: "https://www.make-it-in-germany.com/en/visa-residence/types/training",
    bamf: "https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/NachzugZuDrittstaatlern/nachzug-zu-drittstaatlern-node.html",
};

const BREADCRUMBS = [
    { name: "Home", path: "/" },
    { name: "Study in Germany", path: "/study-in-germany" },
    { name: "Nursing Ausbildung", path: PATH },
];

const FAQS = [
    {
        question: "Is nursing Ausbildung in Germany paid?",
        answer:
            "Yes. Section 19 of the Nursing Professions Act (PflBG) says the training provider must pay a reasonable training allowance for the whole training period. The amount is set by your employer and written in your training contract, so check the contract before you sign. Benefits in kind can be counted against it only up to 75 percent of the gross allowance.",
    },
    {
        question: "What German level do I need for nursing Ausbildung?",
        answer:
            "For the vocational training visa, the German Missions in India checklist asks for a German certificate of at least B1, or a confirmation from the school or employer that your German was checked and is sufficient, or proof of a preparatory language course. Your employer or nursing school can ask for a higher level, and you will need good German on the wards and for the final exam.",
    },
    {
        question: "Can I apply for nursing Ausbildung after Class 12?",
        answer:
            "Yes. The law asks for a school certificate equal to the German intermediate school certificate, or ten years of general schooling. A Class 12 pass from Kerala is above ten years of schooling, and the nursing school or the authority checks your certificate. You do not need a nursing degree first.",
    },
    {
        question: "How long does nursing Ausbildung take?",
        answer:
            "The training itself lasts three years full time, or up to five years part time, under section 6 of the Nursing Professions Act. Before that, plan time in Kerala for learning German to at least B1, preparing documents, finding a training place and getting the visa.",
    },
    {
        question: "Can I bring my family during nursing Ausbildung?",
        answer:
            "It depends on your residence permit, housing and income. The BAMF's general rules ask for a valid residence title, adequate accommodation and a secure livelihood for the family, and a spouse usually needs simple everyday German. A training allowance may not cover a family, so check your case with the German Mission before you plan.",
    },
];

const SOURCES = [
    { label: "Nursing Professions Act, section 6 (duration)", href: SRC.pflbg6, note: "Three years full time, up to five years part time; practical training is the larger share." },
    { label: "Nursing Professions Act, section 11 (entry)", href: SRC.pflbg11, note: "The school education needed to start nursing training." },
    { label: "Nursing Professions Act, section 19 (allowance)", href: SRC.pflbg19, note: "The training provider must pay a reasonable allowance." },
    { label: "Residence Act, section 16a", href: SRC.aufenthg16a, note: "The residence permit for vocational training, German skills and side work." },
    { label: "German Missions in India: vocational training visa", href: SRC.mission, note: "The document checklist for applicants in India." },
    { label: "Make it in Germany: visa for vocational training", href: SRC.makeIt, note: "The German government's summary of the training visa." },
    { label: "BAMF: family members joining", href: SRC.bamf, note: "General conditions for spouses and children of non EU residents." },
];

export async function generateMetadata() {
    return guideMetadata({
        path: PATH,
        title: TITLE,
        description: DESCRIPTION,
        image: OG_IMAGE,
        imageAlt: "Nursing Ausbildung in Germany with Medcity Overseas",
    });
}

export default function NursingAusbildungPage() {
    return (
        <div className="bg-white">
            <PageSchema
                path={PATH}
                type="Article"
                headline={TITLE}
                name={`${TITLE} | Medcity Overseas`}
                description={DESCRIPTION}
                dateModified={UPDATED}
                image={OG_IMAGE}
                breadcrumbs={BREADCRUMBS}
                about={{ "@id": `https://medcityoverseas.com${PATH}#program` }}
                entities={[
                    {
                        "@type": "EducationalOccupationalProgram",
                        "@id": `https://medcityoverseas.com${PATH}#program`,
                        name: "Nursing Ausbildung (Pflegefachfrau or Pflegefachmann) in Germany",
                        timeToComplete: "P3Y",
                        educationalCredentialAwarded: "Pflegefachfrau or Pflegefachmann (state examination)",
                        url: `https://medcityoverseas.com${PATH}`,
                    },
                ]}
                faqs={FAQS}
            />
<div className="[&>section>div:nth-child(2)]:!mx-auto [&>section>div:nth-child(2)]:!max-w-9xl [&>section>div:nth-child(2)]:!w-full [&>section>div:nth-child(2)]:!text-center [&>section>div:nth-child(2)>nav>ol]:!justify-center [&>section>div:nth-child(2)>h1]:!mx-auto [&>section>div:nth-child(2)>p]:!mx-auto [&>section>div:nth-child(2)>div]:!justify-center w-full text-center flex flex-col items-stretch justify-center">
            <GuideHero
                eyebrow="Study in Germany"
                title={TITLE}
                breadcrumbs={BREADCRUMBS}
                intro="Nursing Ausbildung in Germany is a three year, state regulated training that leads to the Pflegefachfrau or Pflegefachmann qualification. You learn at a nursing school and work on hospital or care wards under a training contract, and your employer pays you a training allowance."
            /></div>

            <div className="relative isolate space-y-6 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-rose-50/30 py-10 sm:space-y-8 sm:py-14 lg:py-16">
                <QuickAnswer updated={UPDATED}>
                    Nursing Ausbildung in Germany takes three years full time (up to five part time) under the Nursing Professions Act. You need at least ten years of schooling, a training contract with a German employer and, for the visa, usually German at B1. The employer must pay a reasonable training allowance. Medcity Overseas guides Kerala students through documents, applications and the visa file, and German classes are available at Medcity International Academy.
                </QuickAnswer>

                <QuestionAnswer
                    eyebrow="Overview"
                    question="What is nursing Ausbildung in Germany?"
                    answer="Nursing Ausbildung is Germany's generalist nursing training. It lasts three years full time, mixes classes at a nursing school with practical placements, and ends with a state examination. If you pass, you may use the protected title Pflegefachfrau or Pflegefachmann. Practical training makes up the larger share, and your training provider pays you throughout."
                    className="!py-4 sm:!py-5 lg:!py-6"
                />

              

<GuideSection title="Who can apply for nursing Ausbildung?" className={GUIDE_SECTION_SURFACE}>
    <div className="relative mt-4 overflow-hidden rounded-3xl border border-rose-100/80 bg-gradient-to-br from-white via-white to-rose-50/60 p-4 shadow-sm sm:p-6 lg:p-8">

        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pink-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-rose-100/40 blur-3xl" />

        <div className="relative">

            {/* Intro */}
            <div className="mb-7 sm:mb-9">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-200/80 bg-rose-50 px-3.5 py-2 text-[11px] font-extrabold tracking-[0.15em] text-[#c01f53] sm:text-xs">
                    <span className="h-2 w-2 rounded-full bg-[#c01f53] shadow-[0_0_0_4px_rgba(192,31,83,0.10)]" />
                    ELIGIBILITY REQUIREMENTS
                </div>

                <div className="max-w-4xl">
                    <Prose>
                        <p>
                            Section 11 of the{" "}
                            <SourceLink href={SRC.pflbg11}>
                                Nursing Professions Act (PflBG)
                            </SourceLink>{" "}
                            sets the school education needed. Section 2 of the same act,
                            which section 11 applies, adds reliability, health and German
                            language. In plain terms:
                        </p>
                    </Prose>
                </div>
            </div>

            {/* Requirements Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">

                {/* School Education */}
                <div className="group relative overflow-hidden rounded-2xl border border-rose-100 bg-white/90 p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-[0_12px_30px_rgba(192,31,83,0.08)] sm:p-6">

                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-[#c01f53] transition-colors duration-300 group-hover:bg-[#c01f53] group-hover:text-white">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 14l9-5-9-5-9 5 9 5zm0 0v7m-7-9v5c0 1.5 3.1 3 7 3s7-1.5 7-3v-5" />
                            </svg>
                        </div>
                        <span className="text-xs font-black tracking-widest text-rose-200">01</span>
                    </div>

                    <h3 className="mb-3 text-lg font-extrabold text-slate-900 sm:text-xl">
                        School education
                    </h3>
                    <p className="text-sm leading-7 text-slate-600 sm:text-[15px]">
                        a certificate equal to the German intermediate school certificate (mittlerer Schulabschluss), or ten years of general schooling, or a lower certificate together with a completed vocational training of at least two years.
                    </p>

                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#c01f53] transition-all duration-300 group-hover:w-full" />
                </div>

                {/* Reliability */}
                <div className="group relative overflow-hidden rounded-2xl border border-rose-100 bg-white/90 p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-[0_12px_30px_rgba(192,31,83,0.08)] sm:p-6">

                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-[#c01f53] transition-colors duration-300 group-hover:bg-[#c01f53] group-hover:text-white">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5-2a9 9 0 11-16 0 9 9 0 0116 0z" />
                            </svg>
                        </div>
                        <span className="text-xs font-black tracking-widest text-rose-200">02</span>
                    </div>

                    <h3 className="mb-3 text-lg font-extrabold text-slate-900 sm:text-xl">
                        Reliability
                    </h3>
                    <p className="text-sm leading-7 text-slate-600 sm:text-[15px]">
                        no conduct that shows you are unreliable for the profession.
                    </p>

                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#c01f53] transition-all duration-300 group-hover:w-full" />
                </div>

                {/* Health */}
                <div className="group relative overflow-hidden rounded-2xl border border-rose-100 bg-white/90 p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-[0_12px_30px_rgba(192,31,83,0.08)] sm:p-6">

                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-[#c01f53] transition-colors duration-300 group-hover:bg-[#c01f53] group-hover:text-white">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 21s-8-4.5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 10c0 6.5-8 11-8 11z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 12h2l1-2 2 4 1-2h2" />
                            </svg>
                        </div>
                        <span className="text-xs font-black tracking-widest text-rose-200">03</span>
                    </div>

                    <h3 className="mb-3 text-lg font-extrabold text-slate-900 sm:text-xl">
                        Health
                    </h3>
                    <p className="text-sm leading-7 text-slate-600 sm:text-[15px]">
                        you must not be medically unfit to work as a nurse.
                    </p>

                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#c01f53] transition-all duration-300 group-hover:w-full" />
                </div>

                {/* German Language */}
                <div className="group relative overflow-hidden rounded-2xl border border-rose-100 bg-white/90 p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-[0_12px_30px_rgba(192,31,83,0.08)] sm:p-6">

                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-[#c01f53] transition-colors duration-300 group-hover:bg-[#c01f53] group-hover:text-white">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 5h16M4 5v14m0-14l7 7m0-7L4 12m9-5h7m-7 4h7m-7 4h7m-7 4h7" />
                            </svg>
                        </div>
                        <span className="text-xs font-black tracking-widest text-rose-200">04</span>
                    </div>

                    <h3 className="mb-3 text-lg font-extrabold text-slate-900 sm:text-xl">
                        German language
                    </h3>
                    <p className="text-sm leading-7 text-slate-600 sm:text-[15px]">
                        the German needed to practise the profession, built up during the training.
                    </p>

                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#c01f53] transition-all duration-300 group-hover:w-full" />
                </div>

                {/* Training Place - Full Width */}
                <div className="group relative overflow-hidden rounded-2xl border border-rose-200/80 bg-gradient-to-br from-rose-50/80 via-white to-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all duration-300 hover:border-rose-300 hover:shadow-[0_12px_30px_rgba(192,31,83,0.08)] sm:col-span-2 sm:p-6">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">

                        <div className="flex shrink-0 items-center justify-between sm:w-16 sm:flex-col sm:items-center">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#c01f53] text-white shadow-lg shadow-rose-200/70">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 21h18M5 21V7l8-4v18m6 0V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01M15 14v.01M15 17v.01" />
                                </svg>
                            </div>
                            <span className="text-xs font-black tracking-widest text-rose-300 sm:mt-3">05</span>
                        </div>

                        <div className="min-w-0">
                            <h3 className="mb-2 text-lg font-extrabold text-slate-900 sm:text-xl">
                                A training place
                            </h3>
                            <p className="text-sm leading-7 text-slate-600 sm:text-[15px]">
                                a signed training contract with a German hospital or care provider, plus the training plan, for the visa.
                            </p>
                        </div>

                        <div className="hidden shrink-0 text-rose-200 sm:ml-auto sm:block">
                            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 21h18M5 21V7l8-4v18m6 0V11l-6-4" />
                            </svg>
                        </div>
                    </div>
                </div>

            </div>

            {/* Closing Note */}
            <div className="relative mt-6 overflow-hidden rounded-2xl border border-rose-200/80 bg-white p-5 shadow-sm sm:mt-8 sm:p-6">

                <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#c01f53] to-rose-200" />

                <div className="flex items-start gap-4 pl-1">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-[#c01f53]">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 16h-1v-4h-1m1-4h.01M22 12a10 10 0 11-20 0 10 10 0 0120 0z" />
                        </svg>
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="mb-3 text-base font-extrabold text-slate-900 sm:text-lg">
                            What this means for Indian students
                        </h3>

                        <div className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                            <Prose>
                                <p>
                                    A Class 10 or Class 12 certificate from Kerala is
                                    checked against these rules by the nursing school
                                    or the responsible German office. A Class 12 pass
                                    is more than ten years of schooling, and you do
                                    not need a nursing degree first.
                                </p>
                            </Prose>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</GuideSection>



              
<GuideSection title="What German level do you need, and how do you get there?" className={GUIDE_SECTION_SURFACE}>
    <div className="space-y-7">

        {/* Introduction */}
        <Prose>
            <p>
                For a vocational training visa, section 16a of the{" "}
                <SourceLink href={SRC.aufenthg16a}>Residence Act</SourceLink>{" "}
                asks for sufficient German (ausreichende Sprachkenntnisse),
                which section 2 of the{" "}
                <SourceLink href={SRC.aufenthg2}>same act</SourceLink>{" "}
                defines as level B1. The checklist of the{" "}
                <SourceLink href={SRC.mission}>German Missions in India</SourceLink>{" "}
                accepts one of three things:
            </p>
        </Prose>

        {/* B1 highlight */}
        <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.07] via-white to-rose-50/70 p-5 sm:p-7">
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/[0.06] blur-2xl" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-2xl font-black text-white shadow-lg shadow-primary/20">
                    B1
                </div>

                <div>
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                        Visa language requirement
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                        German language proficiency
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                        You need to demonstrate sufficient German language
                        skills for your vocational training visa.
                    </p>
                </div>
            </div>
        </div>

        {/* Accepted proof options */}
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                    Accepted proof options
                </h3>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    3 accepted options
                </span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                <PointList
                    items={[
                        "a German language certificate of at least B1,",
                        "a confirmation from the school or employer that your German was checked and is sufficient, or",
                        "proof that you will attend a preparatory German course.",
                    ]}
                />
            </div>
        </div>

        {/* Important information */}
        <div className="relative overflow-hidden rounded-2xl border border-amber-200/80 bg-amber-50/70 p-5 sm:p-6">
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                    </svg>
                </div>

                <div>
                    <h3 className="font-bold text-slate-900">
                        Important to remember
                    </h3>
                    <div className="mt-2 text-sm leading-7 text-slate-700">
                        <Prose>
                            <p>
                                Your employer or nursing school may ask for more than the visa minimum, and classes, placements and the final exam are in German, so plan to keep learning after B1.
                            </p>
                        </Prose>
                    </div>
                </div>
            </div>
        </div>

        {/* Academy note */}
        <AcademyNote subjects="German" />

    </div>
</GuideSection>


               
<GuideSection title="Is the training allowance paid every month?" className={GUIDE_SECTION_SURFACE}>

    <div className="relative mt-4 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_12px_45px_rgba(15,23,42,0.045)]">

        {/* Top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-[#c01f53] via-rose-400 to-amber-300" />

        <div className="p-5 sm:p-7 lg:p-9">

            {/* Introduction */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-[#c01f53] ring-1 ring-rose-100">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                        <rect x="3" y="6" width="18" height="13" rx="2" />
                        <path d="M3 10h18M7 15h3" strokeLinecap="round" />
                        <path d="M16 3v3M8 3v3" strokeLinecap="round" />
                    </svg>
                </div>

                <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#c01f53]">
                            Nursing Ausbildung
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span className="text-xs font-medium text-slate-400">
                            Financial information
                        </span>
                    </div>

                    <h3 className="mb-3 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                        Yes, you receive an allowance during training.
                    </h3>

                    <div className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                        <Prose>
                            <p>
                                Section 19 of the{" "}
                                <SourceLink href={SRC.pflbg19}>
                                    Nursing Professions Act
                                </SourceLink>{" "}
                                says the training provider must pay a reasonable training allowance (Ausbildungsvergütung) for the whole training period, and trainees count as employees in training for social insurance.
                            </p>
                        </Prose>
                    </div>
                </div>

            </div>

            {/* Divider */}
            <div className="my-7 h-px bg-slate-100 sm:my-8" />

            {/* Details heading */}
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <span className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#c01f53]">
                        Understanding your pay
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                        Three important things to know
                    </h3>
                </div>

                <span className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">
                    03 Key details
                </span>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

                {/* Allowance */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:bg-white hover:shadow-[0_12px_30px_rgba(192,31,83,0.07)] sm:p-6">

                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#c01f53] shadow-sm ring-1 ring-slate-100 transition-colors group-hover:bg-[#c01f53] group-hover:text-white">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 7v5l3 2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <span className="text-xs font-bold tracking-widest text-slate-300">01</span>
                    </div>

                    <h4 className="mb-2 text-base font-extrabold text-slate-900">
                        Allowance amount
                    </h4>

                    <p className="text-sm leading-7 text-slate-600">
                        The amount is set by the employer, often through a collective agreement, and is written in your training contract.
                    </p>

                    <div className="mt-5 h-1 w-9 rounded-full bg-rose-200 transition-all duration-300 group-hover:w-16 group-hover:bg-[#c01f53]" />
                </div>

                {/* Meals and Housing */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:bg-white hover:shadow-[0_12px_30px_rgba(192,31,83,0.07)] sm:p-6">

                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#c01f53] shadow-sm ring-1 ring-slate-100 transition-colors group-hover:bg-[#c01f53] group-hover:text-white">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="text-xs font-bold tracking-widest text-slate-300">02</span>
                    </div>

                    <h4 className="mb-2 text-base font-extrabold text-slate-900">
                        Meals & housing
                    </h4>

                    <p className="text-sm leading-7 text-slate-600">
                        Meals or housing given by the employer can be counted against the pay only if the contract says so, and never above 75 percent of the gross allowance.
                    </p>

                    <div className="mt-5 h-1 w-9 rounded-full bg-rose-200 transition-all duration-300 group-hover:w-16 group-hover:bg-[#c01f53]" />
                </div>

                {/* Extra Hours */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:bg-white hover:shadow-[0_12px_30px_rgba(192,31,83,0.07)] sm:p-6 md:col-span-2 lg:col-span-1">

                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#c01f53] shadow-sm ring-1 ring-slate-100 transition-colors group-hover:bg-[#c01f53] group-hover:text-white">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 7v5l3 2M8 3l-2 2m10-2 2 2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <span className="text-xs font-bold tracking-widest text-slate-300">03</span>
                    </div>

                    <h4 className="mb-2 text-base font-extrabold text-slate-900">
                        Extra working hours
                    </h4>

                    <p className="text-sm leading-7 text-slate-600">
                        Extra hours beyond the agreed training time are allowed only as an exception and must be paid extra or given back as time off.
                    </p>

                    <div className="mt-5 h-1 w-9 rounded-full bg-rose-200 transition-all duration-300 group-hover:w-16 group-hover:bg-[#c01f53]" />
                </div>

            </div>

            {/* Practical advice */}
            <div className="mt-7 overflow-hidden rounded-2xl border border-amber-200/70 bg-[#fffbf2] sm:mt-8">

                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-5 sm:p-6">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M12 3a7 7 0 00-4 12.75c.6.4 1 1.1 1 1.75h6c0-.65.4-1.35 1-1.75A7 7 0 0012 3z" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 21h6m-5-3h4" strokeLinecap="round" />
                        </svg>
                    </div>

                    <div className="min-w-0">
                        <span className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.14em] text-amber-700">
                            Practical advice
                        </span>

                        <h4 className="mb-2 text-base font-extrabold text-slate-900 sm:text-lg">
                            Before signing your training contract
                        </h4>

                        <p className="text-sm leading-7 text-slate-600 sm:text-base">
                            We do not quote a standard amount here because it differs by employer and state. Ask for the gross monthly figure in writing and compare it with your rent and travel costs before you sign.
                        </p>
                    </div>

                </div>
            </div>

        </div>
    </div>

</GuideSection>


            
<GuideSection
    title="Step by step: from Kerala to your first day of training"
    intro="This is the usual order. The visa documents are from the German Missions in India checklist for vocational training."
    className={GUIDE_SECTION_SURFACE}
>
    <div className="relative mt-5 overflow-hidden rounded-3xl border border-rose-100/80 bg-gradient-to-br from-white via-white to-rose-50/40 p-4 shadow-sm sm:p-6 lg:p-8">

        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-rose-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-pink-100/40 blur-3xl" />

        <div className="relative">

            {/* Journey introduction */}
            <div className="mb-8 flex flex-col gap-5 rounded-2xl border border-rose-100 bg-white/90 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">

                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-[#c01f53]">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 19.5l6-6 4 4 9-9" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 8h6v6" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h5M3 8h3" />
                        </svg>
                    </div>

                    <div className="min-w-0">
                        <span className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#c01f53]">
                            Your journey to Germany
                        </span>

                        <h3 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                            7 steps to begin your nursing career
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                            From your first German lesson to your first day of training.
                        </p>
                    </div>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-4 py-2">
                    <span className="h-2 w-2 rounded-full bg-[#c01f53]" />
                    <span className="text-xs font-bold text-[#c01f53]">
                        7 KEY MILESTONES
                    </span>
                </div>

            </div>

            {/* Timeline heading */}
            <div className="mb-6 flex items-center gap-3">
                <div className="h-5 w-1 rounded-full bg-[#c01f53]" />
                <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                    Your application journey
                </h3>
            </div>

            {/* Ordered timeline */}
            <div className="
                relative rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-sm
                sm:p-5 lg:p-6
                [&_ol]:relative
                [&_ol]:ml-2
                [&_ol]:space-y-4
                [&_ol]:border-l-2
                [&_ol]:border-rose-100
                [&_ol]:pl-5
                sm:[&_ol]:ml-3
                sm:[&_ol]:space-y-5
                sm:[&_ol]:pl-7
                [&_li]:relative
                [&_li]:rounded-xl
                [&_li]:border
                [&_li]:border-slate-100
                [&_li]:bg-slate-50/70
                [&_li]:p-4
                [&_li]:transition-all
                [&_li]:duration-300
                hover:[&_li]:border-rose-200
                hover:[&_li]:bg-white
                hover:[&_li]:shadow-md
                sm:[&_li]:p-5
                [&_li]:marker:text-[#c01f53]
                [&_li]:marker:font-extrabold
            ">

                <PointList
                    ordered
                    items={[
                        { title: "Learn German", text: "reach at least B1 with a certificate. Start early: language is the longest step." },
                        { title: "Prepare documents", text: "a passport issued in the last 10 years with at least 12 months validity, school certificates, a CV with your full education history and a motivation letter." },
                        { title: "Apply for a training place", text: "apply to hospitals, care homes and nursing schools, attend interviews and receive an offer." },
                        { title: "Sign the contract", text: "the training contract is signed by you and the employer, and comes with a training plan (Ausbildungsplan)." },
                        { title: "Close any money gap", text: "if the monthly pay is below the limit in the checklist (927 euros for in company training with a vocational school, 903 euros for training fully at a school), cover the gap with a blocked account or a sponsor's formal obligation letter." },
                        { title: "Apply for the visa", text: "book an appointment with two copies of each document, health insurance from the employer from your start date and travel health insurance until then. Federal Employment Agency pre-approval is not required but can shorten processing." },
                        { title: "Travel and start", text: "register your address, open a bank account and begin at the nursing school and on the wards." },
                    ]}
                />

            </div>

            {/* Final destination */}
            <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#a91848] via-[#c01f53] to-[#d13b70] p-5 text-white shadow-lg shadow-rose-200/40 sm:mt-8 sm:p-6">

                <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full border border-white/10" />
                <div className="pointer-events-none absolute -right-4 -top-8 h-32 w-32 rounded-full border border-white/10" />

                <div className="relative flex items-center gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/15">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.5 7-12a7 7 0 10-14 0c0 6.5 7 12 7 12z" />
                            <circle cx="12" cy="9" r="2.5" />
                        </svg>
                    </div>

                    <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/70">
                            Your destination
                        </span>
                        <h3 className="mt-1 text-lg font-extrabold sm:text-xl">
                            Your first day in Germany
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-white/80">
                            A new chapter begins at your nursing school and training workplace.
                        </p>
                    </div>

                </div>
            </div>

            {/* Additional guidance */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:mt-8 sm:p-6">

                <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-[#c01f53]">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <circle cx="12" cy="12" r="9" />
                            <path strokeLinecap="round" d="M12 11v5m0-8h.01" />
                        </svg>
                    </div>

                    <div className="min-w-0">
                        <span className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#c01f53]">
                            Additional information
                        </span>

                        <h3 className="mb-3 text-base font-extrabold text-slate-900 sm:text-lg">
                            Can you work alongside your training?
                        </h3>

                        <div className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                            <Prose>
                                <p>
                                    While you train, the{" "}
                                    <SourceLink href={SRC.makeIt}>Make it in Germany</SourceLink> portal notes that a separate side job of up to 20 hours a week is allowed if it is independent of your training. Read our{" "}
                                    <TextLink href="/student-visa-guidance">student visa guidance</TextLink> for how we prepare visa files.
                                </p>
                            </Prose>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </div>
</GuideSection>


                <GuideSection
                    title="Nursing Ausbildung or a nursing degree in India first?"
                    intro="Both routes can lead to nursing in Germany. Which one suits you depends on where you are now."
                    className={GUIDE_SECTION_SURFACE}
                >
                    <TableWrap minWidth={640}>
                        <thead className={theadClass}>
                            <tr>
                                <th scope="col" className={th}>Route</th>
                                <th scope="col" className={th}>Who it suits</th>
                                <th scope="col" className={th}>What you need</th>
                                <th scope="col" className={th}>Result</th>
                            </tr>
                        </thead>
                        <tbody className={tbodyClass}>
                            <tr>
                                <th scope="row" className={`${th} font-bold text-slate-900`}>Nursing Ausbildung</th>
                                <td className={th}>Students after Class 12 without a nursing qualification</td>
                                <td className={th}>Ten years of schooling or more, German for the visa (B1), a training contract</td>
                                <td className={th}>German qualification after three years and the state exam</td>
                            </tr>
                            <tr>
                                <th scope="row" className={`${th} font-bold text-slate-900`}>Recognition (Anerkennung)</th>
                                <td className={th}>GNM or BSc nurses already qualified in India</td>
                                <td className={th}>Your nursing qualification, German normally at B2, then a knowledge test or adaptation course</td>
                                <td className={th}>Permission to work under the German nursing title</td>
                            </tr>
                        </tbody>
                    </TableWrap>
                    <Prose>
                        <p>
                            If you are already a nurse, read{" "}
                            <TextLink href="/nursing-in-germany-for-indian-nurses">nursing in Germany for Indian nurses</TextLink>. To compare Germany with the UK, Ireland or Australia, see{" "}
                            <TextLink href="/study-abroad-for-nurses">study abroad for nurses</TextLink>.
                        </p>
                    </Prose>
                </GuideSection>

             
<GuideSection title="How Medcity Overseas helps" className={GUIDE_SECTION_SURFACE}>

    <div className="relative mt-4 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_12px_45px_rgba(15,23,42,0.045)]">

        {/* Top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-secondary/75 via-secondary to-secondary" />

        {/* Main content */}
        <div className="relative p-5 sm:p-7 lg:p-9">

            {/* Soft background decoration */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-rose-50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-pink-50 blur-3xl" />

            <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">

                {/* Left Introduction */}
                <div className="flex flex-col">

                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c01f53] text-white shadow-lg shadow-rose-200/60">
                        <svg
                            className="h-7 w-7"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 8v6m3-3h-6" />
                        </svg>
                    </div>

                    <span className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#c01f53]">
                        Your trusted application partner
                    </span>

                    <h3 className="max-w-md text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-[34px]">
                        Your Germany journey, <span className="text-[#c01f53]">guided at every step.</span>
                    </h3>

                    <div className="mt-5 max-w-lg text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                        <Prose>
                            <p>
                                Medcity Overseas guides your applications. We do not promise a training place or a visa: employers choose their trainees and the German Mission decides on the visa.
                            </p>
                        </Prose>
                    </div>

                    {/* Trust note */}
                    <div className="mt-7 rounded-2xl border border-rose-100 bg-rose-50/60 p-4 sm:p-5">

                        <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#c01f53] shadow-sm">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
                                </svg>
                            </div>

                            <div>
                                <h4 className="text-sm font-extrabold text-slate-900">
                                    Honest, guided support
                                </h4>
                                <p className="mt-1 text-xs leading-6 text-slate-600 sm:text-sm">
                                    Practical guidance throughout your application, with clear expectations at every stage.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Right Services */}
                <div className="min-w-0">

                    <div className="mb-5 flex items-center justify-between gap-3">
                        <div>
                            <span className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#c01f53]">
                                How we support you
                            </span>
                            <h3 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                                Our support services
                            </h3>
                        </div>

                        <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-[#c01f53] sm:flex">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16M4 12h16M4 19h16" />
                            </svg>
                        </div>
                    </div>

                    <div className="
                        rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3
                        sm:p-4
                        [&_ul]:space-y-2
                        [&_ol]:space-y-2
                        [&_li]:relative
                        [&_li]:rounded-xl
                        [&_li]:border
                        [&_li]:border-transparent
                        [&_li]:bg-white
                        [&_li]:px-4
                        [&_li]:py-3.5
                        [&_li]:text-sm
                        [&_li]:leading-7
                        [&_li]:text-slate-600
                        [&_li]:shadow-[0_2px_8px_rgba(15,23,42,0.025)]
                        [&_li]:transition-all
                        [&_li]:duration-300
                        hover:[&_li]:border-rose-100
                        hover:[&_li]:shadow-sm
                        sm:[&_li]:px-5
                        sm:[&_li]:py-4
                    ">

                        <PointList
                            items={[
                                "Pointing you to German classes, which are available at Medcity International Academy.",
                                "A document checklist and help with your CV and motivation letter in the German style.",
                                "Help applying to training places and preparing for interviews.",
                                "Explaining your training contract and the visa checklist line by line.",
                                "Pre-departure sessions on housing, registration and life on the wards.",
                            ]}
                        />

                    </div>

                </div>

            </div>

            {/* Bottom navigation panel */}
            <div className="relative mt-8 overflow-hidden rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50/80 via-white to-white p-5 sm:mt-10 sm:p-6">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#c01f53] shadow-sm ring-1 ring-rose-100">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z" />
                            </svg>
                        </div>

                        <div className="min-w-0">
                            <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                                Explore more with Medcity
                            </h3>
                            <p className="mt-1 text-xs leading-6 text-slate-500 sm:text-sm">
                                Discover programmes and find a branch near you.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-bold">

                        <TextLink href="/study-in-germany">
                            Germany programmes
                        </TextLink>

                        <TextLink href="/study-in-germany/ausbildung">
                            Ausbildung
                        </TextLink>

                        <TextLink href="/branches">
                            Kerala branches
                        </TextLink>

                    </div>

                </div>

            </div>

        </div>
    </div>

</GuideSection>


                <FaqList path={PATH} faqs={FAQS} schema={false} title="Nursing Ausbildung: frequently asked questions" />

                <OfficialSources
                    links={SOURCES}
                    intro={`Rules and amounts change. These are the official pages behind this guide, checked on 24 October 2026.`}
                    className="!my-0"
                />

               
<RelatedLinks
    className="!mt-[60px] text-center rounded-[2rem] border border-rose-100/80 !px-5 !py-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ring-1 ring-white/80 sm:!px-8 sm:!py-10"
    title="Related guides"
    links={[
        {
            href: "/nursing-in-germany-for-indian-nurses",
            title: "Nursing in Germany for Indian nurses",
            text: "The recognition route for GNM and BSc nurses.",
        },
        {
            href: "/study-abroad-for-nurses",
            title: "Study abroad for nurses",
            text: "Compare the UK, Ireland, Germany, Australia, New Zealand and Malta.",
        },
        {
            href: "/placement-assistance-nursing",
            title: "UK nursing pathway",
            text: "Our MSc nursing pathway in the United Kingdom.",
        },
        {
            href: "/study-abroad-after-12th",
            title: "Study abroad after 12th",
            text: "Degree and vocational routes for Class 12 students.",
        },
    ]}
/>


                <ContactBand />
            </div>
        </div>
    );
}
