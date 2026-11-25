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
    <div className="relative overflow-hidden rounded-3xl border mt-4 border-slate-200/70 bg-gradient-to-br from-white via-white to-rose-50/50 p-4 sm:p-6 lg:p-8">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-pink-100/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-rose-100/30 blur-3xl" />

        <div className="relative">

            {/* Intro */}
            <div className="mb-6 sm:mb-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-pink-50 px-3 py-1.5 text-xs font-bold tracking-wider text-pink-600 sm:text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                    ELIGIBILITY REQUIREMENTS
                </div>

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

            {/* Requirements */}
            <PointList
                items={[
                    {
                        title: "School education",
                        text: "a certificate equal to the German intermediate school certificate (mittlerer Schulabschluss), or ten years of general schooling, or a lower certificate together with a completed vocational training of at least two years.",
                    },
                    {
                        title: "Reliability",
                        text: "no conduct that shows you are unreliable for the profession.",
                    },
                    {
                        title: "Health",
                        text: "you must not be medically unfit to work as a nurse.",
                    },
                    {
                        title: "German",
                        text: "the German needed to practise the profession, built up during the training.",
                    },
                    {
                        title: "A training place",
                        text: "a signed training contract with a German hospital or care provider, plus the training plan, for the visa.",
                    },
                ]}
            />

            {/* Closing note */}
            <div className="mt-6 rounded-2xl border border-pink-100 bg-white/80 p-4 sm:mt-8 sm:p-5">
                <div className="flex items-start gap-3">
                    <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-pink-500 ring-4 ring-pink-100" />

                    <div className="min-w-0">
                        <h3 className="mb-2 text-sm font-bold text-slate-900 sm:text-base">
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
                    <Prose>
                        <p>
                            Yes, you are paid while you train. Section 19 of the{" "}
                            <SourceLink href={SRC.pflbg19}>Nursing Professions Act</SourceLink> says the training provider must pay a reasonable training allowance (Ausbildungsvergütung) for the whole training period, and trainees count as employees in training for social insurance.
                        </p>
                    </Prose>
                    <PointList
                        items={[
                            "The amount is set by the employer, often through a collective agreement, and is written in your training contract.",
                            "Meals or housing given by the employer can be counted against the pay only if the contract says so, and never above 75 percent of the gross allowance.",
                            "Extra hours beyond the agreed training time are allowed only as an exception and must be paid extra or given back as time off.",
                        ]}
                    />
                    <Prose>
                        <p>
                            We do not quote a standard amount here because it differs by employer and state. Ask for the gross monthly figure in writing and compare it with your rent and travel costs before you sign.
                        </p>
                    </Prose>
                </GuideSection>

                <GuideSection
                    title="Step by step: from Kerala to your first day of training"
                    intro="This is the usual order. The visa documents are from the German Missions in India checklist for vocational training."
                    className={GUIDE_SECTION_SURFACE}
                >
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
                    <Prose>
                        <p>
                            While you train, the{" "}
                            <SourceLink href={SRC.makeIt}>Make it in Germany</SourceLink> portal notes that a separate side job of up to 20 hours a week is allowed if it is independent of your training. Read our{" "}
                            <TextLink href="/student-visa-guidance">student visa guidance</TextLink> for how we prepare visa files.
                        </p>
                    </Prose>
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
                    <Prose>
                        <p>
                            Medcity Overseas guides your applications. We do not promise a training place or a visa: employers choose their trainees and the German Mission decides on the visa.
                        </p>
                    </Prose>
                    <PointList
                        items={[
                            "Pointing you to German classes, which are available at Medcity International Academy.",
                            "A document checklist and help with your CV and motivation letter in the German style.",
                            "Help applying to training places and preparing for interviews.",
                            "Explaining your training contract and the visa checklist line by line.",
                            "Pre-departure sessions on housing, registration and life on the wards.",
                        ]}
                    />
                    <Prose>
                        <p>
                            Compare all our <TextLink href="/study-in-germany">Germany programmes</TextLink>, including general{" "}
                            <TextLink href="/study-in-germany/ausbildung">Ausbildung</TextLink>, or visit one of our{" "}
                            <TextLink href="/branches">branches in Kerala</TextLink>.
                        </p>
                    </Prose>
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
