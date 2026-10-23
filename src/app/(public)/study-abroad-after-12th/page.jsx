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
import { getLiveDestinations, getUndergraduateByCountry } from "@/lib/landingData";

/*
 * Study abroad after Class 12 (plus two) for Kerala students and
 * parents: degree routes by country, German vocational routes, the
 * documents and timeline, and the undergraduate courses we list (from
 * the database). Rules come from DAAD, GOV.UK, a UK and an Irish
 * university, Study Australia and Make it in Germany, checked on
 * UPDATED. No cost figures.
 */

const PATH = "/study-abroad-after-12th";
const UPDATED = "2026-10-24";
const TITLE = "Study Abroad After 12th from Kerala";
const DESCRIPTION =
    "Study abroad after 12th from Kerala: degree routes in the UK, Ireland, Australia and Germany, Ausbildung and other routes, documents, timeline and tests.";

const SRC = {
    studienkolleg: "https://www.daad.de/en/studying-in-germany/requirements/studienkollegs/",
    ucas: "https://www.gla.ac.uk/undergraduate/how-to-apply-for-an-undergraduate-degree/ucas",
    ukEnglish: "https://www.gov.uk/student-visa/knowledge-of-english",
    galway: "https://universityofgalway.ie/undergrad-admissions/faqs",
    australia: "https://www.studyaustralia.gov.au/en/plan-your-move/language-testing-organisations",
    training: "https://www.make-it-in-germany.com/en/visa-residence/types/training",
    bfd: "https://www.bundesfreiwilligendienst.de/",
};

const BREADCRUMBS = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Study abroad after 12th", path: PATH },
];

const DEGREE_ROUTES = [
    {
        country: "United Kingdom",
        slug: "uk",
        route: "Apply for a bachelor's degree, usually through UCAS. Each university sets its own deadline and offer conditions.",
        english: "CEFR B2 for degree level, by test or the university's own assessment",
        source: SRC.ucas,
        label: "University of Glasgow on UCAS",
    },
    {
        country: "Ireland",
        slug: "ireland",
        route: "Non EU students apply directly to the university (for example through its international office), not through the CAO.",
        english: "A test from the Irish visa list, such as IELTS, PTE, TOEFL or Duolingo",
        source: SRC.galway,
        label: "University of Galway",
    },
    {
        country: "Australia",
        slug: "australia",
        route: "Apply to the university for a bachelor's degree or a foundation programme, then the Student visa.",
        english: "A test on the Study Australia list, taken at a secure test centre",
        source: SRC.australia,
        label: "Study Australia",
    },
    {
        country: "Germany",
        slug: "germany",
        route: "If your Class 12 certificate is not accepted for direct entry, attend a Studienkolleg (usually 2 semesters) and pass the assessment test (Feststellungsprüfung).",
        english: "German for German taught degrees; Studienkollegs teach German up to C1",
        source: SRC.studienkolleg,
        label: "DAAD",
    },
];

export async function generateMetadata() {
    return guideMetadata({
        path: PATH,
        title: TITLE,
        description: DESCRIPTION,
        imageAlt: "Study abroad after 12th from Kerala with Medcity Overseas",
    });
}

export default async function AfterTwelfthPage() {
    const [byCountry, destinations] = await Promise.all([getUndergraduateByCountry(), getLiveDestinations()]);
    const liveSlugs = new Set(destinations.map((item) => item.slug));
    const totalCourses = byCountry.reduce((sum, row) => sum + row.courses, 0);

    const faqs = [
        {
            question: "Which is the cheapest way to study abroad after 12th?",
            answer:
                "There is no single cheapest route, because cost depends on tuition, living costs in the city, the length of the course and what the visa asks you to show. Some routes cost less in fees: the DAAD says public Studienkollegs in Germany are generally free of charge, and Ausbildung trainees are paid by their employer. We compare real offers with you rather than quote averages.",
        },
        {
            question: "Can I study abroad after 12th without IELTS?",
            answer:
                "Sometimes. In the UK a university can assess your English itself for degree level study, Ireland and Australia accept other tests such as PTE, and German taught routes need German instead. Our study abroad without IELTS guide explains each country's rules.",
        },
        {
            question: "When should a Class 12 student start planning?",
            answer:
                "Ideally while you are in Class 11 or early in Class 12. Language tests, applications, offers, funds and the visa all take time, and some universities close applications many months before the course starts. Starting early also gives time for German if you choose Germany.",
        },
        {
            question: "Is Germany possible directly after Class 12?",
            answer:
                "Yes, through several routes. If your certificate is not accepted for direct university entry, you can attend a Studienkolleg and pass the assessment test, which the DAAD says opens studies throughout Germany. Vocational training (Ausbildung) is another route, with a training contract and German for the visa.",
        },
    ];

    return (
        <div className="bg-white">
            <PageSchema
                path={PATH}
                type="Article"
                name={`${TITLE} | Medcity Overseas`}
                description={DESCRIPTION}
                dateModified={UPDATED}
                image="/og-images/default.webp"
                breadcrumbs={BREADCRUMBS}
                about={{ "@type": "Thing", name: "Undergraduate study abroad for Indian students after Class 12" }}
                faqs={faqs}
            />

            <GuideHero
                eyebrow="After plus two"
                title={TITLE}
                breadcrumbs={BREADCRUMBS}
                intro="Study abroad after 12th opens two kinds of route for Kerala students: a bachelor's degree, or paid vocational training in Germany. This guide sets out how each country admits Class 12 students, which English or German you need, the documents to gather and when to start, written for students and parents together."
            />

            <div className="space-y-14 py-12 sm:py-14">
                <QuickAnswer updated={UPDATED}>
                    After Class 12 you can apply for a bachelor&apos;s degree in the UK, Ireland or Australia, or go to Germany through a Studienkolleg (usually 2 semesters, then an assessment test) or Ausbildung. You need English (or German for Germany), your marksheets, a passport and proof of funds for the visa. Start planning in Class 11 or early Class 12.
                </QuickAnswer>

                <QuestionAnswer
                    eyebrow="Choosing a route"
                    question="Which country is best to study after 12th for Indian students?"
                    answer="The best country depends on your marks, budget, subject and language. English speaking countries suit students who want a degree in English straight away. Germany suits students willing to learn German, through a Studienkolleg for university or Ausbildung for paid training. Compare entry rules, course length and living costs before you decide."
                />

                <GuideSection title="Degree routes by country" intro="How each country admits Class 12 students from India, from official and university sources checked on 24 October 2026.">
                    <TableWrap minWidth={760}>
                        <thead className={theadClass}>
                            <tr>
                                <th scope="col" className={th}>Country</th>
                                <th scope="col" className={th}>How to apply after Class 12</th>
                                <th scope="col" className={th}>Language</th>
                                <th scope="col" className={th}>Source</th>
                            </tr>
                        </thead>
                        <tbody className={tbodyClass}>
                            {DEGREE_ROUTES.map((row) => (
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
                                    <td className={th}>{row.route}</td>
                                    <td className={th}>{row.english}</td>
                                    <td className={th}>
                                        <SourceLink href={row.source}>{row.label}</SourceLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </TableWrap>
                    <Prose>
                        <p>
                            For Germany, read our pages on <TextLink href="/study-in-germany/studienkollegs">Studienkollegs</TextLink> and{" "}
                            <TextLink href="/study-in-germany/bachelor-s">bachelor&apos;s degrees in Germany</TextLink>.
                        </p>
                    </Prose>
                </GuideSection>

                <GuideSection title="Undergraduate courses we list" intro="Bachelor's, diploma and foundation courses from our course records, counted by country.">
                    {byCountry.length ? (
                        <TableWrap minWidth={520}>
                            <thead className={theadClass}>
                                <tr>
                                    <th scope="col" className={th}>Country</th>
                                    <th scope="col" className={th}>Courses</th>
                                    <th scope="col" className={th}>Universities</th>
                                    <th scope="col" className={th}>Levels recorded</th>
                                </tr>
                            </thead>
                            <tbody className={tbodyClass}>
                                {byCountry.map((row) => (
                                    <tr key={row.id}>
                                        <th scope="row" className={`${th} font-bold text-slate-900`}>
                                            {liveSlugs.has(row.slug) ? (
                                                <Link href={`/universities-in-${row.slug}`} className="hover:text-primary hover:underline">
                                                    {row.country}
                                                </Link>
                                            ) : (
                                                row.country
                                            )}
                                        </th>
                                        <td className={th}>{row.courses}</td>
                                        <td className={th}>{row.universities}</td>
                                        <td className={th}>{row.levels.join(", ") || "Not recorded"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </TableWrap>
                    ) : (
                        <Prose>
                            <p>Our undergraduate course list is being updated. Ask a counsellor for current options.</p>
                        </Prose>
                    )}
                    <Prose>
                        <p>
                            {totalCourses > 0 ? `That is ${totalCourses} undergraduate ${totalCourses === 1 ? "course" : "courses"} in total. ` : ""}
                            Search <TextLink href="/courses">all courses</TextLink> or see <TextLink href="/popular-courses">popular courses</TextLink>.
                        </p>
                    </Prose>
                </GuideSection>

                <GuideSection title="Vocational routes in Germany after Class 12">
                    <PointList
                        items={[
                            {
                                title: "Ausbildung",
                                text: "vocational training with a training contract and pay from the employer. The visa usually needs German at B1; a side job of up to 20 hours a week is allowed if it is independent of the training.",
                            },
                            {
                                title: "Nursing Ausbildung",
                                text: "3 years of paid nursing training leading to the German nursing title.",
                            },
                            {
                                title: "Voluntary service (FSJ or BFD)",
                                text: "voluntary service in Germany; the federal volunteer service site sets out who can take part and how.",
                            },
                            {
                                title: "Au Pair",
                                text: "living with a German host family and helping with childcare while you learn German.",
                            },
                        ]}
                    />
                    <Prose>
                        <p>
                            Read <TextLink href="/study-in-germany/ausbildung">Ausbildung in Germany</TextLink>,{" "}
                            <TextLink href="/study-in-germany/nursing-ausbildung">nursing Ausbildung</TextLink> and{" "}
                            <TextLink href="/study-in-germany/au-pair">Au Pair in Germany</TextLink>. Rules for the training visa are on{" "}
                            <SourceLink href={SRC.training}>Make it in Germany</SourceLink> and the volunteer service on{" "}
                            <SourceLink href={SRC.bfd}>bundesfreiwilligendienst.de</SourceLink>.
                        </p>
                    </Prose>
                </GuideSection>

                <GuideSection title="Documents and timeline for Class 12 students">
                    <PointList
                        ordered
                        items={[
                            { title: "Class 11 or early Class 12", text: "choose countries and courses with a counsellor, and start English or German classes." },
                            { title: "During Class 12", text: "take your English test (or reach the German level you need), get a passport and prepare a statement of purpose and references." },
                            { title: "Applications", text: "apply with your Class 10 marksheet, predicted or final Class 12 marks and your test results. Some offers are conditional on final marks." },
                            { title: "After results", text: "send final marksheets, accept your offer, arrange funds and apply for the visa." },
                            { title: "Before travel", text: "book housing, arrange health insurance where required and attend a pre-departure session." },
                        ]}
                    />
                    <Prose>
                        <p>
                            The visa steps differ by country; see <TextLink href="/student-visa-guidance">student visa guidance</TextLink>. If you are worried about IELTS, read{" "}
                            <TextLink href="/study-abroad-without-ielts">study abroad without IELTS</TextLink>.
                        </p>
                    </Prose>
                </GuideSection>

                <GuideSection title="English and German preparation">
                    <Prose>
                        <p>
                            For UK degree level study, <SourceLink href={SRC.ukEnglish}>GOV.UK</SourceLink> asks for English equal to CEFR B2. For Germany, German taught degrees and Ausbildung need German, and the{" "}
                            <SourceLink href={SRC.studienkolleg}>DAAD</SourceLink> notes that Studienkollegs teach German up to C1.
                        </p>
                    </Prose>
                    <AcademyNote>Medcity Academy runs IELTS, PTE and German classes from A1 to C2 across Kerala.</AcademyNote>
                </GuideSection>

                <FaqList path={PATH} faqs={faqs} schema={false} title="Study abroad after 12th: frequently asked questions" />

                <OfficialSources
                    links={[
                        ...DEGREE_ROUTES.map((row) => ({ label: `${row.label} (${row.country})`, href: row.source, note: "How students apply after school." })),
                        { label: "GOV.UK: knowledge of English", href: SRC.ukEnglish, note: "The English level for UK degree study." },
                        { label: "Make it in Germany: training visa", href: SRC.training, note: "The visa for vocational training." },
                    ]}
                    intro="Admission and visa rules change. These are the official pages behind this guide, checked on 24 October 2026."
                />

                <RelatedLinks
                    links={[
                        { href: "/destinations", title: "All study destinations", text: "Country guides with universities and courses." },
                        { href: "/study-abroad-for-nurses", title: "Study abroad for nurses", text: "Nursing degrees, training and registration abroad." },
                        { href: "/scholarships-for-indian-students", title: "Scholarships for Indian students", text: "University and government scholarships." },
                        { href: "/study-in-germany", title: "Study in Germany", text: "All our Germany programmes." },
                    ]}
                />

                <ContactBand />
            </div>
        </div>
    );
}
