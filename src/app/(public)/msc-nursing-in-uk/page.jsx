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
import { getUkNursingMasters } from "@/lib/landingData";

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
    const { courses, error } = await getUkNursingMasters();
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
                "Student visa holders on degree level courses can usually work up to 20 hours a week in term time and full time in official holidays, as Goldsmiths explains. Your own visa conditions and your university's rules apply, and placement hours on the course are separate from paid work.",
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

            <GuideHero
                eyebrow="Study in the UK"
                title={TITLE}
                breadcrumbs={BREADCRUMBS}
                intro="An MSc Nursing in the UK suits registered nurses from Kerala who want a British master's degree, specialist study or a route into leadership and research. Here are the courses we can help you apply to, the entry rules as recorded, how the degree relates to NMC registration, and the Student visa rules that matter most."
            />

            <div className="space-y-14 py-12 sm:py-14">
                <QuickAnswer updated={UPDATED} showContact={false}>
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
                            <thead className={theadClass}>
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
                                Our UK nursing course list is being updated. Browse all{" "}
                                <TextLink href="/universities-in-uk">universities in the UK</TextLink> or talk to a counsellor for the current options.
                            </p>
                        </Prose>
                    )}
                    <Prose>
                        <p>
                            See more options on the <TextLink href="/courses?q=nursing">nursing course search</TextLink> and the{" "}
                            <TextLink href="/universities-in-uk">list of UK universities</TextLink>.
                        </p>
                    </Prose>
                </GuideSection>

                <GuideSection title="Entry requirements for MSc Nursing in the UK">
                    <Prose>
                        <p>
                            Each university sets its own entry requirements. These are the requirements and English scores recorded for the courses above; where a field is empty, ask us or check the course page.
                        </p>
                    </Prose>
                    {withEntry.length > 0 ? (
                        <PointList
                            items={withEntry.map((course) => ({
                                title: `${course.course}, ${course.university}`,
                                text: [
                                    course.entry ? `Entry: ${course.entry}` : "Entry: Not recorded",
                                    `IELTS: ${value(course.ielts)}`,
                                    `PTE: ${value(course.pte)}`,
                                ].join(". "),
                            }))}
                        />
                    ) : (
                        <PointList
                            items={courses.map((course) => ({
                                title: `${course.course}, ${course.university}`,
                                text: "Entry requirement and English scores: Not recorded. Check the course page or ask a counsellor.",
                            }))}
                        />
                    )}
                    <Prose>
                        <p>
                            For the visa, <SourceLink href={SRC.english}>GOV.UK</SourceLink> asks for English equal to CEFR level B2 for degree level study, and says a university can assess your English itself. Goldsmiths, for example,{" "}
                            <SourceLink href={SRC.cas}>lists B2 with an IELTS equivalent of 5.5 in each component</SourceLink> for its Masters courses; each university and course sets its own score.
                        </p>
                    </Prose>
                    <AcademyNote lead="Preparing for a test?" subjects="IELTS and OET" />
                </GuideSection>

                <GuideSection
                    title="Study route or the NMC work route?"
                    intro="Nurses from Kerala usually weigh two ways into UK nursing. They lead to different places, so decide what you want first."
                >
                    <TableWrap minWidth={620}>
                        <thead className={theadClass}>
                            <tr>
                                <th scope="col" className={th}>Question</th>
                                <th scope="col" className={th}>MSc Nursing (study route)</th>
                                <th scope="col" className={th}>NMC registration (work route)</th>
                            </tr>
                        </thead>
                        <tbody className={tbodyClass}>
                            <tr>
                                <th scope="row" className={`${th} font-bold text-slate-900`}>Main goal</th>
                                <td className={th}>A UK master&apos;s degree and specialist knowledge</td>
                                <td className={th}>Working as a registered nurse in the UK</td>
                            </tr>
                            <tr>
                                <th scope="row" className={`${th} font-bold text-slate-900`}>Who decides</th>
                                <td className={th}>The university (admission) and UK Visas and Immigration (visa)</td>
                                <td className={th}>The Nursing and Midwifery Council (registration)</td>
                            </tr>
                            <tr>
                                <th scope="row" className={`${th} font-bold text-slate-900`}>Key steps</th>
                                <td className={th}>Offer, CAS, funds, Student visa</td>
                                <td className={th}>Eligibility, English, Test of Competence, health and character, ID check</td>
                            </tr>
                            <tr>
                                <th scope="row" className={`${th} font-bold text-slate-900`}>Registration</th>
                                <td className={th}>Only from an NMC approved pre-registration course</td>
                                <td className={th}>The aim of the route</td>
                            </tr>
                        </tbody>
                    </TableWrap>
                    <Prose>
                        <p>
                            The <SourceLink href={SRC.nmc}>NMC</SourceLink> lists the steps for nurses trained outside the UK. Our{" "}
                            <TextLink href="/placement-assistance-nursing">UK nursing pathway</TextLink> page explains the MSc pathway we support, and{" "}
                            <TextLink href="/study-abroad-for-nurses">study abroad for nurses</TextLink> compares the UK with other countries.
                        </p>
                    </Prose>
                </GuideSection>

                <GuideSection title="UK Student visa steps for MSc Nursing" intro="The rules below are from GOV.UK, checked on 24 October 2026.">
                    <PointList
                        ordered
                        items={[
                            { title: "Get your offer and CAS", text: "the university issues a Confirmation of Acceptance for Studies once it is satisfied you meet its requirements." },
                            { title: "Show your English", text: "English equal to CEFR B2 for degree level study, assessed by a test or by the university." },
                            { title: "Hold the living cost funds", text: "1,529 pounds a month in London or 1,171 pounds a month outside London, for up to 9 months, held for 28 days in a row ending within 31 days of your application." },
                            { title: "Pay the fees", text: "the Student visa fee from outside the UK is 558 pounds, plus the healthcare surcharge, which depends on how long your visa lasts." },
                            { title: "Apply and plan your family", text: "students on taught postgraduate courses starting on or after 1 January 2024 generally cannot bring dependants." },
                        ]}
                    />
                    <Prose>
                        <p>
                            Read the full GOV.UK pages on <SourceLink href={SRC.money}>money</SourceLink>, <SourceLink href={SRC.fees}>fees</SourceLink> and{" "}
                            <SourceLink href={SRC.family}>dependants</SourceLink>, and our <TextLink href="/study-in-uk">study in UK guide</TextLink>.
                        </p>
                    </Prose>
                </GuideSection>

                <GuideSection title="How Medcity Overseas helps">
                    <PointList
                        items={[
                            "Checking your BSc or GNM marks, experience and goals against the courses we list.",
                            "Shortlisting MSc Nursing courses and preparing your statement, CV and references.",
                            "Pointing you to IELTS and OET classes at Medcity International Academy.",
                            "Help with the CAS stage, the funds evidence and the Student visa application.",
                            "Pre-departure guidance on housing, travel and your first weeks in the UK.",
                        ]}
                    />
                    <Prose>
                        <p>
                            We give guidance and application help; universities decide admissions and UK Visas and Immigration decides visas. Visit one of our{" "}
                            <TextLink href="/branches">branches</TextLink> to book a counselling session.
                        </p>
                    </Prose>
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
