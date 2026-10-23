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
import { getLiveSlugs, getScholarshipUniversities } from "@/lib/landingData";

/*
 * Scholarships for Indian students. The university list is read from
 * tb_universities (scholarship and applicationfeewaiver flags) with no
 * amounts. Government and external scholarships are described only
 * from their official pages (Chevening, British Council GREAT, HEA
 * Ireland, DAAD), checked on UPDATED, with the year each figure is for.
 */

const PATH = "/scholarships-for-indian-students";
const UPDATED = "2026-10-24";
const TITLE = "Scholarships for Indian Students Abroad";
const DESCRIPTION =
    "Scholarships for Indian students abroad: university awards we list, Chevening, GREAT, Government of Ireland and DAAD scholarships, who can apply and when.";

const SRC = {
    chevening: "https://www.chevening.org/scholarships/who-can-apply/eligibility/",
    great: "https://study-uk.britishcouncil.org/scholarships/great-scholarships/india",
    goiies: "https://hea.ie/assets/uploads/2025/12/2026-GOI-IES-FAQs.pdf",
    daad: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
};

const BREADCRUMBS = [
    { name: "Home", path: "/" },
    { name: "Universities", path: "/universities" },
    { name: "Scholarships for Indian students", path: PATH },
];

const SCHEMES = [
    {
        name: "Chevening Scholarships",
        country: "United Kingdom",
        type: "UK government",
        who: "Citizens of Chevening eligible countries (check the list on its site) with an undergraduate degree and at least 2 years (2,800 hours) of work experience after it, who apply to three UK courses and commit to return home for at least 2 years.",
        href: SRC.chevening,
        source: "Chevening",
    },
    {
        name: "GREAT Scholarships (India)",
        country: "United Kingdom",
        type: "British Council and UK universities",
        who: "Indian students on one year taught postgraduate courses at participating universities; 10,000 pounds towards tuition for 2026 to 2027. Apply through each university, and check whether a new round has opened.",
        href: SRC.great,
        source: "British Council",
    },
    {
        name: "Government of Ireland International Education Scholarship",
        country: "Ireland",
        type: "Irish government (HEA)",
        who: "Students from outside the EU, EEA, Switzerland and the UK with an offer for a master's, a level 9 diploma or a research programme of at least one year; the 2026 call gave a 10,000 euro stipend and a full fee waiver for one year.",
        href: SRC.goiies,
        source: "Higher Education Authority",
    },
    {
        name: "DAAD scholarship database",
        country: "Germany",
        type: "DAAD, foundations and other funders",
        who: "International students search one database of offers from the DAAD, political foundations and business linked institutions.",
        href: SRC.daad,
        source: "DAAD",
    },
];

const FAQS = [
    {
        question: "Do I need very high marks for a scholarship abroad?",
        answer:
            "Strong marks help, but each scholarship sets its own rules. Chevening, for example, also asks for at least 2 years of work experience after your degree, and the Irish government scholarship needs an offer first. University awards often look at marks, your statement and the course. Read each scheme's official criteria.",
    },
    {
        question: "Can Indian students get a full scholarship?",
        answer:
            "Some schemes cover a lot, but few cover everything. The Government of Ireland International Education Scholarship 2026 call gave a full fee waiver for one year plus a 10,000 euro stipend. GREAT Scholarships for India gave 10,000 pounds towards tuition for 2026 to 2027. Plan your budget assuming you pay the rest.",
    },
    {
        question: "When should I apply for scholarships?",
        answer:
            "Early, and usually after or alongside your course application. The Irish government scholarship asks for a conditional or final offer when you apply, and its 2026 call closed on 12 March 2026. Chevening asks you to apply to three UK courses. GREAT deadlines vary by university, so check each one.",
    },
    {
        question: "Does Medcity Overseas give scholarships?",
        answer:
            "No. Scholarships are given by universities, governments and foundations. Medcity Overseas helps you find schemes you may be eligible for, check the official criteria and prepare your course and scholarship applications. We never promise that you will receive one.",
    },
];

export async function generateMetadata() {
    return guideMetadata({
        path: PATH,
        title: TITLE,
        description: DESCRIPTION,
        image: "/og-images/universities.webp",
        imageAlt: "Scholarships for Indian students abroad with Medcity Overseas",
    });
}

export default async function ScholarshipsPage() {
    const [{ universities, error }, liveSlugs] = await Promise.all([getScholarshipUniversities(), getLiveSlugs()]);
    const withScholarship = universities.filter((row) => row.scholarship === "Yes").length;

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
                about={{ "@type": "Thing", name: "Scholarships for Indian students studying abroad" }}
                faqs={FAQS}
            />

            <GuideHero
                eyebrow="Funding your studies"
                title={TITLE}
                breadcrumbs={BREADCRUMBS}
                intro="Scholarships for Indian students abroad come from three places: the universities themselves, governments such as the UK and Ireland, and external funders listed by bodies like the DAAD. This guide lists the universities we work with that record a scholarship, and the main government schemes, with their official rules."
            />

            <div className="space-y-14 py-12 sm:py-14">
                <QuickAnswer updated={UPDATED}>
                    Indian students can apply for university scholarships, government scholarships such as Chevening (UK), GREAT (UK) and the Government of Ireland International Education Scholarship, and external awards found through the DAAD database for Germany. Most need an offer or a course application first, and few cover every cost. Medcity Overseas helps you find schemes and apply; it does not award them.
                </QuickAnswer>

                <QuestionAnswer
                    eyebrow="Getting started"
                    question="Can Indian students get scholarships to study abroad?"
                    answer="Yes. Many universities offer their own scholarships to international students, and governments run schemes open to Indian applicants, such as Chevening and GREAT in the UK and the Government of Ireland scholarship. Each has its own criteria, deadline and value, so apply for your course early and check each scheme's official page before you rely on it."
                />

                <GuideSection title="Types of scholarship, with official links" intro="From each scheme's official page, checked on 24 October 2026. Values are for the year stated and can change.">
                    <TableWrap minWidth={760}>
                        <thead className={theadClass}>
                            <tr>
                                <th scope="col" className={th}>Scholarship</th>
                                <th scope="col" className={th}>Country</th>
                                <th scope="col" className={th}>Offered by</th>
                                <th scope="col" className={th}>Who can apply</th>
                            </tr>
                        </thead>
                        <tbody className={tbodyClass}>
                            {SCHEMES.map((row) => (
                                <tr key={row.name}>
                                    <th scope="row" className={`${th} font-bold text-slate-900`}>
                                        <SourceLink href={row.href}>{row.name}</SourceLink>
                                    </th>
                                    <td className={th}>{row.country}</td>
                                    <td className={th}>{row.type}</td>
                                    <td className={th}>{row.who}</td>
                                </tr>
                            ))}
                        </tbody>
                    </TableWrap>
                </GuideSection>

                <GuideSection
                    title="Universities we list that offer scholarships"
                    intro="From our university records: universities marked as offering a scholarship or an application fee waiver. We do not show amounts; the university sets them each year, so check the university page and ask us."
                >
                    {universities.length ? (
                        <TableWrap minWidth={640}>
                            <thead className={theadClass}>
                                <tr>
                                    <th scope="col" className={th}>University</th>
                                    <th scope="col" className={th}>Country</th>
                                    <th scope="col" className={th}>Scholarship</th>
                                    <th scope="col" className={th}>Application fee waiver</th>
                                    <th scope="col" className={th}>Courses listed</th>
                                </tr>
                            </thead>
                            <tbody className={tbodyClass}>
                                {universities.map((row) => (
                                    <tr key={row.id}>
                                        <th scope="row" className={`${th} font-bold text-slate-900`}>
                                            <Link href={row.href} className="text-primary hover:underline">
                                                {row.name}
                                            </Link>
                                            {row.location && <span className="mt-1 block text-xs font-normal text-slate-500">{row.location}</span>}
                                        </th>
                                        <td className={th}>
                                            {row.countrySlug && liveSlugs.has(row.countrySlug) ? (
                                                <Link href={`/study-in-${row.countrySlug}`} className="hover:text-primary hover:underline">
                                                    {row.country}
                                                </Link>
                                            ) : (
                                                row.country ?? NOT_RECORDED
                                            )}
                                        </td>
                                        <td className={th}>{row.scholarship ?? NOT_RECORDED}</td>
                                        <td className={th}>{row.feeWaiver ?? NOT_RECORDED}</td>
                                        <td className={th}>{row.courses || NOT_RECORDED}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </TableWrap>
                    ) : error ? (
                        <LoadError />
                    ) : (
                        <Prose>
                            <p>
                                None of the universities we list is marked with a scholarship in our records yet. Browse all{" "}
                                <TextLink href="/universities">universities</TextLink>; a counsellor can check each university&apos;s current awards for you.
                            </p>
                        </Prose>
                    )}
                    {withScholarship > 0 && (
                        <Prose>
                            <p>{`${withScholarship} ${withScholarship === 1 ? "university is" : "universities are"} marked as offering a scholarship.`}</p>
                        </Prose>
                    )}
                </GuideSection>

                <GuideSection title="How to apply for a scholarship, and when">
                    <PointList
                        ordered
                        items={[
                            { title: "Shortlist courses first", text: "most schemes need a course application or an offer. The Irish government scholarship asks for a conditional or final offer when you apply." },
                            { title: "Check eligibility on the official page", text: "for example, Chevening asks for 2,800 hours of work experience after your degree and a commitment to return home for 2 years." },
                            { title: "Note each deadline", text: "the Irish government scholarship 2026 call closed on 12 March 2026; GREAT deadlines vary by university." },
                            { title: "Prepare your documents", text: "marksheets, a strong statement, references and your English test results." },
                            { title: "Apply to more than one", text: "apply for the university's own awards as well as government schemes where you are eligible." },
                        ]}
                    />
                    <Prose>
                        <p>
                            Read the official pages for <SourceLink href={SRC.chevening}>Chevening</SourceLink>, <SourceLink href={SRC.great}>GREAT Scholarships India</SourceLink>,{" "}
                            <SourceLink href={SRC.goiies}>the Government of Ireland scholarship</SourceLink> and the <SourceLink href={SRC.daad}>DAAD database</SourceLink>. Our country guides for the{" "}
                            <TextLink href="/study-in-uk">UK</TextLink>, <TextLink href="/study-in-ireland">Ireland</TextLink> and <TextLink href="/study-in-germany">Germany</TextLink> cover fees and living costs, and{" "}
                            <TextLink href="/add-on-services">our add-on services</TextLink> cover help beyond the application.
                        </p>
                    </Prose>
                </GuideSection>

                <FaqList path={PATH} faqs={FAQS} schema={false} title="Scholarships for Indian students: frequently asked questions" />

                <OfficialSources
                    links={SCHEMES.map((row) => ({ label: `${row.source}: ${row.name}`, href: row.href, note: `${row.country}. ${row.type}.` }))}
                    intro="Scholarship rules, values and deadlines change every year. These are the official pages behind this guide, checked on 24 October 2026."
                />

                <RelatedLinks
                    links={[
                        { href: "/universities", title: "All universities", text: "Browse every university we list." },
                        { href: "/student-visa-guidance", title: "Student visa guidance", text: "The money and documents each visa asks for." },
                        { href: "/study-abroad-without-ielts", title: "Study abroad without IELTS", text: "What each country accepts instead of IELTS." },
                        { href: "/msc-nursing-in-uk", title: "MSc Nursing in the UK", text: "Courses and the Student visa for nurses." },
                    ]}
                />

                <ContactBand />
            </div>
        </div>
    );
}
