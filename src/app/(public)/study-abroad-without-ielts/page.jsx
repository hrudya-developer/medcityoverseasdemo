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
import { getLiveDestinations, getWithoutIeltsOptions } from "@/lib/landingData";

/*
 * Study abroad without IELTS: what each country's visa rules accept
 * instead (GOV.UK, Irish Immigration Service, Study Australia, Goethe
 * Institut, checked on UPDATED) and the universities and courses our
 * records mark as accepting other evidence (tb_universities.without_ielts,
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
    germany: "https://www.goethe.de/ins/hon/en/spr/std/rfs.html",
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
        rule: "For English taught programmes, proof of German is generally not needed. Each university sets its own English proof.",
        caution: "German taught programmes generally need German at B2 or above.",
        source: SRC.germany,
        label: "Goethe-Institut",
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
    const [{ universities, courses }, destinations] = await Promise.all([getWithoutIeltsOptions(), getLiveDestinations()]);
    const liveSlugs = new Set(destinations.map((item) => item.slug));

    const faqs = [
        {
            question: "Can I get a UK Student visa without IELTS?",
            answer:
                "Yes, in some cases. GOV.UK says that for degree level study your university can assess your English itself, as long as it is equal to CEFR B2, and it may use a different test. Below degree level you need an approved Secure English Language Test unless you are exempt. Ask the university how it will assess you before you apply.",
        },
        {
            question: "Is PTE accepted instead of IELTS?",
            answer:
                "Often, yes. The Irish Immigration Service lists a PTE Academic score of 30 for degree courses, for visa purposes,, and Study Australia lists PTE Academic among the tests accepted for Australian student visas. Each university also sets its own score, so check the course page.",
        },
        {
            question: "What is an MOI letter?",
            answer:
                "A Medium of Instruction (MOI) letter is a letter from your college or university confirming that your course was taught in English. Some universities accept it as part of their own English assessment. It does not replace a test where the visa rules ask for one, so check both the university's and the visa's rules.",
        },
        {
            question: "Can I study in Germany without IELTS?",
            answer:
                "For German taught programmes you show German, generally at B2 or above, instead of English. For English taught programmes, the Goethe-Institut explains that each university sets its own language proof, so some accept other evidence. Check the admission rules of the exact programme.",
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
                image="/og-images/universities.webp"
                breadcrumbs={BREADCRUMBS}
                about={{ "@type": "Thing", name: "English language requirements for studying abroad" }}
                faqs={faqs}
            />

            <GuideHero
                eyebrow="English requirements"
                title={TITLE}
                breadcrumbs={BREADCRUMBS}
                intro="Study abroad without IELTS is possible, but it rarely means without any English proof. Most routes swap IELTS for another test, a university's own assessment or English medium study. Here is what the visa rules in the UK, Ireland, Australia and Germany accept, and the universities we list that record other options."
            />

            <div className="space-y-14 py-12 sm:py-14">
                <QuickAnswer updated={UPDATED}>
                    You can study abroad without IELTS in many cases, but you still prove your English. The UK lets universities assess degree level students themselves to CEFR B2. Ireland and Australia accept other tests such as PTE Academic, TOEFL iBT or Duolingo (Ireland). Germany&apos;s English taught programmes set their own proof. Always check the visa rules as well as the university&apos;s.
                </QuickAnswer>

                <QuestionAnswer
                    eyebrow="The short answer"
                    question="What does study abroad without IELTS really mean?"
                    answer="It means proving your English another way. That can be a different test such as PTE Academic, TOEFL iBT or Duolingo, an English assessment run by the university, or a waiver based on earlier study in English. The university decides admission, but the visa has its own English rules, and a university waiver does not always satisfy them."
                />

                <GuideSection
                    title="What each country accepts instead of IELTS"
                    intro="From each government's own page, checked on 24 October 2026."
                >
                    <TableWrap minWidth={760}>
                        <thead className={theadClass}>
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
                            <thead className={theadClass}>
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
                            <thead className={theadClass}>
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
                    ) : (
                        <Prose>
                            <p>
                                No course in our records lists another English option yet. Search <TextLink href="/courses">all courses</TextLink> and check the English requirements on each course page.
                            </p>
                        </Prose>
                    )}
                </GuideSection>

                <GuideSection title="Before you skip IELTS: a visa caution">
                    <PointList
                        items={[
                            { title: "Admission and visa are separate", text: "a university can waive IELTS for admission while the visa still needs a test, as in Ireland, where the visa table applies for visa purposes." },
                            { title: "Check the test format", text: "Australia does not accept at home or online versions of its listed tests." },
                            { title: "Check the date", text: "Ireland asks for a certificate issued within 2 years of your course start date." },
                            { title: "Keep proof of earlier study", text: "the UK exempts some students who hold a degree from one of the countries on its list, so check that list before you rely on it." },
                        ]}
                    />
                    <Prose>
                        <p>
                            Our <TextLink href="/student-visa-guidance">student visa guidance</TextLink> explains each country&apos;s visa, and the country guides for the{" "}
                            <TextLink href="/study-in-uk">UK</TextLink> and <TextLink href="/study-in-ireland">Ireland</TextLink> go further.
                        </p>
                    </Prose>
                    <AcademyNote>Need a test after all? Medcity Academy prepares students for IELTS, PTE and OET.</AcademyNote>
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
