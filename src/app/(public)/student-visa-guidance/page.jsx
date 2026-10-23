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

const SRC = {
    ukFees: "https://www.gov.uk/student-visa/fees",
    ukMoney: "https://www.gov.uk/student-visa/money",
    ukEnglish: "https://www.gov.uk/student-visa/knowledge-of-english",
    ukFamily: "https://www.gov.uk/student-visa/family-members",
    ukCas: "https://www.gold.ac.uk/immigration/student-visa/eligibility/",
    ieFunds: "https://www.irishimmigration.ie/coming-to-study-in-ireland/information-on-student-finances/",
    ieEnglish: "https://www.irishimmigration.ie/coming-to-study-in-ireland/english-language-requirements-for-study-visas/",
    deStudy: "https://india.diplo.de/in-en/service/-/2552164",
    auEmbassy: "https://russia.embassy.gov.au/mscw/visa_student.html",
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
    { country: "Australia", slug: "australia", visa: "Student visa (subclass 500)", authority: "Department of Home Affairs", href: SRC.auEmbassy, money: "Not recorded here: check the Home Affairs Student visa page" },
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

            <GuideHero
                eyebrow="Visas"
                title={TITLE}
                breadcrumbs={BREADCRUMBS}
                intro="Student visa guidance from Kerala, country by country. For each destination we list the visa's name, the authority that decides it, the money and documents it asks for, and how Medcity Overseas helps you prepare. Every rule links to the official page it comes from."
            />

            <div className="space-y-14 py-12 sm:py-14">
                <QuickAnswer updated={UPDATED} showContact={false}>
                    A student visa needs an offer from a recognised institution, proof that you can pay your living costs, proof of English (or German) and a complete document set. The UK asks for living cost funds held for 28 days, Ireland at least 10,000 euros for the first year, and Germany a blocked account. Only the government decides; Medcity Overseas helps you prepare.
                </QuickAnswer>

                <QuestionAnswer
                    eyebrow="Before you start"
                    question="What does a student visa application usually need?"
                    answer="Most student visas ask for the same core evidence: an offer or enrolment confirmation from the institution, proof of funds for living costs and sometimes fees, proof of English or German, a valid passport and photos, and health insurance or a health check. The details, amounts and order differ by country, so follow the official checklist for yours."
                />

                <GuideSection title="Student visas at a glance" intro="Amounts are as published on the official page linked for each country, checked on 24 October 2026.">
                    <TableWrap minWidth={760}>
                        <thead className={theadClass}>
                            <tr>
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

                <GuideSection title="UK Student visa from Kerala">
                    <PointList
                        items={[
                            { title: "Offer and CAS", text: "your university issues a Confirmation of Acceptance for Studies once it is satisfied you meet its requirements." },
                            { title: "English", text: "equal to CEFR B2 for degree level study, by test or by the university's own assessment." },
                            { title: "Funds", text: "1,529 pounds a month in London or 1,171 pounds a month elsewhere, for up to 9 months, held for 28 days in a row ending within 31 days of applying." },
                            { title: "Fees", text: "558 pounds from outside the UK, plus the healthcare surcharge." },
                            { title: "Family", text: "taught postgraduate students generally cannot bring dependants." },
                        ]}
                    />
                    <Prose>
                        <p>
                            Sources: GOV.UK on <SourceLink href={SRC.ukMoney}>money</SourceLink>, <SourceLink href={SRC.ukFees}>fees</SourceLink>,{" "}
                            <SourceLink href={SRC.ukEnglish}>English</SourceLink> and <SourceLink href={SRC.ukFamily}>family</SourceLink>, and{" "}
                            <SourceLink href={SRC.ukCas}>Goldsmiths on the CAS</SourceLink>. Read our <TextLink href="/study-in-uk">study in UK guide</TextLink>.
                        </p>
                    </Prose>
                </GuideSection>

                <GuideSection title="Ireland study visa from Kerala">
                    <PointList
                        items={[
                            { title: "Funds", text: "immediate access to at least 10,000 euros for the first year of a degree course, and the same plus fees for each later year." },
                            { title: "Bank statements", text: "6 months of statements on headed paper, with large or irregular deposits explained. Credit cards are not accepted." },
                            { title: "English", text: "a test from the visa list, issued within 2 years of your start date." },
                        ]}
                    />
                    <Prose>
                        <p>
                            Sources: Irish Immigration Service on <SourceLink href={SRC.ieFunds}>student finances</SourceLink> and{" "}
                            <SourceLink href={SRC.ieEnglish}>English</SourceLink>. Read our <TextLink href="/study-in-ireland">study in Ireland guide</TextLink>.
                        </p>
                    </Prose>
                </GuideSection>

                <GuideSection title="Germany student visa from Kerala">
                    <PointList
                        items={[
                            { title: "Admission", text: "proof of admission to the course or a preparatory college, stating the language of instruction." },
                            { title: "Funds", text: "a blocked account (11,904 euros for the first year on the checklist dated 30 August 2024), a scholarship, or a formal obligation letter from a sponsor in Germany." },
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

                <GuideSection title="Australia student visa from Kerala">
                    <PointList
                        items={[
                            { title: "One visa", text: "the Student visa (subclass 500), usually applied for online through ImmiAccount." },
                            { title: "Confirmation of Enrolment", text: "a CoE for each course; a letter of offer is not accepted instead." },
                            { title: "Health", text: "all student visa applicants need a medical examination." },
                            { title: "English", text: "a test from the accepted list, taken at a secure test centre." },
                        ]}
                    />
                    <Prose>
                        <p>
                            Sources: the <SourceLink href={SRC.auEmbassy}>Australian Embassy student visa page</SourceLink> and{" "}
                            <SourceLink href={SRC.auTests}>Study Australia</SourceLink>. Read our <TextLink href="/study-in-australia">study in Australia guide</TextLink>.
                        </p>
                    </Prose>
                </GuideSection>

                <GuideSection title="Malta student visa from Kerala">
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

                <GuideSection title="Common reasons visa applications are delayed or refused">
                    <PointList
                        items={[
                            "Incomplete documents or a missed appointment: the German Missions in India say this may lead to rejection.",
                            "Funds not held long enough: the UK needs 28 days in a row, ending within 31 days of your application.",
                            "Unexplained deposits: Ireland asks you to explain large or irregular amounts in your statements.",
                            "The wrong document: Australia does not accept a letter of offer in place of a Confirmation of Enrolment.",
                            "False or misleading information: the Australian Embassy warns this can lead to refusal and a 3 year entry ban.",
                        ]}
                    />
                </GuideSection>

                <GuideSection title="How Medcity Overseas helps with your student visa">
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

                <FaqList path={PATH} faqs={FAQS} schema={false} title="Student visa guidance: frequently asked questions" />

                <OfficialSources
                    links={[
                        { label: "GOV.UK: Student visa money", href: SRC.ukMoney, note: "Living cost funds for the UK Student visa." },
                        { label: "GOV.UK: Student visa fees", href: SRC.ukFees, note: "The visa fee and healthcare surcharge." },
                        { label: "Irish Immigration Service: student finances", href: SRC.ieFunds, note: "Funds and bank statements for Ireland." },
                        { label: "German Missions in India: study visa checklist", href: SRC.deStudy, note: "Documents, blocked account and APS for Germany." },
                        { label: "Australian Embassy: student visa", href: SRC.auEmbassy, note: "The subclass 500 visa, CoE and medical examination." },
                        { label: "University of Malta: visas", href: SRC.mtUni, note: "The study visa and e-Residence Permit for Malta." },
                    ]}
                    intro="Visa rules and amounts change. These are the official pages behind this guide, checked on 24 October 2026."
                />

                <RelatedLinks
                    links={[
                        { href: "/destinations", title: "All study destinations", text: "Country guides with universities and courses." },
                        { href: "/study-abroad-without-ielts", title: "Study abroad without IELTS", text: "What each country accepts instead of IELTS." },
                        { href: "/scholarships-for-indian-students", title: "Scholarships for Indian students", text: "University and government scholarships." },
                        { href: "/add-on-services", title: "Add-on services", text: "Extra help before you travel." },
                    ]}
                />

                <ContactBand />
            </div>
        </div>
    );
}
