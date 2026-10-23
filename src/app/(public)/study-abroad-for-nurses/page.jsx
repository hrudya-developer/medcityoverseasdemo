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
    nmbi: "https://www.nmbi.ie/Registration/Qualified-outside-the-EU/Application-Process/Outcomes-of-Assessment/Compensation-Measures/Glossary",
    germany: "https://www.make-it-in-germany.com/en/working-in-germany/professions-in-demand/nursing",
    nmba: "https://www.nursingmidwiferyboard.gov.au/Accreditation/IQNM/Self-check-and-Portfolio",
    ncnz: "https://www.nursingcouncil.org.nz/NCNZ/nursing-section/Register_as_a_nurse.aspx",
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
        steps: "Prepare documents, application assessment, then any compensation measure such as a supervised adaptation and assessment placement",
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
        steps: "Self-check, assignment to a stream, a portfolio with documents, and orientation part 1 before registration",
        language: "English, at the level the NMBA sets",
    },
    {
        country: "New Zealand",
        guide: null,
        regulator: "Nursing Council of New Zealand",
        href: REG.ncnz,
        steps: "Show you are fit for registration, hold the prescribed qualification and are competent, through the internationally qualified nurse pathway",
        language: "English, well enough to protect public safety",
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
                "Often, within the visa rules. UK Student visa holders on degree courses can usually work up to 20 hours a week in term time. In Germany, nursing Ausbildung trainees are paid a training allowance, and a permit for recognition measures allows side work of up to 20 hours a week.",
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

            <GuideHero
                eyebrow="Nursing abroad"
                title={TITLE}
                breadcrumbs={BREADCRUMBS}
                intro="Study abroad for nurses from Kerala can mean a degree, a paid training, or registration as a nurse in another country. This guide compares six countries, names the regulator that decides in each, and links the nursing courses and guides that fit where you are now."
            />

            <div className="space-y-14 py-12 sm:py-14">
                <QuickAnswer updated={UPDATED} showContact={false}>
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
                        <thead className={theadClass}>
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
                            <thead className={theadClass}>
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

                <GuideSection title="Work routes for qualified nurses">
                    <PointList
                        items={[
                            {
                                title: "UK",
                                text: "nurses trained outside the UK apply to the NMC and pass the Test of Competence.",
                            },
                            {
                                title: "Germany",
                                text: "your GNM or BSc is recognised by a state office, with German at B2 and, if needed, a knowledge test or adaptation course.",
                            },
                            {
                                title: "Ireland, Australia, New Zealand and Malta",
                                text: "apply to the regulator in the table above and follow its steps for internationally qualified nurses.",
                            },
                        ]}
                    />
                    <Prose>
                        <p>
                            This is a summary of each regulator&apos;s published steps, not migration advice: follow the regulator&apos;s own guidance for registration and work visas. Medcity Overseas guides applications to study routes, such as the MSc on our{" "}
                            <TextLink href="/placement-assistance-nursing">UK nursing pathway</TextLink>, and does not offer jobs or placements. See also{" "}
                            <TextLink href="/nursing-in-germany-for-indian-nurses">nursing in Germany for Indian nurses</TextLink>.
                        </p>
                    </Prose>
                </GuideSection>

                <GuideSection title="English and German tests for nurses">
                    <Prose>
                        <p>
                            English speaking regulators each set their own test scores, so check the regulator&apos;s page for the country you choose. Malta&apos;s{" "}
                            <SourceLink href={REG.malta}>Council for Nurses and Midwives</SourceLink> is one example: IELTS Academic with an average of at least 6, or OET with grade B in speaking and C+ in writing, reading and listening. For Germany you need German, normally at B2 for recognition. On a UK Student visa you can usually{" "}
                            <SourceLink href={REG.ukWork}>work up to 20 hours a week</SourceLink> in term time.
                        </p>
                    </Prose>
                    <AcademyNote subjects="IELTS, OET and German" />
                </GuideSection>

                <FaqList path={PATH} faqs={faqs} schema={false} title="Study abroad for nurses: frequently asked questions" />

                <OfficialSources
                    links={ROUTES.map((route) => ({ label: `${route.regulator} (${route.country})`, href: route.href, note: "The regulator's page for nurses trained abroad." }))}
                    intro="Registration rules change. These are the regulators' pages behind this guide, checked on 24 October 2026."
                />

                <RelatedLinks
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
