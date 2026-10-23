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
 * The recognition (Anerkennung) route for nurses qualified in India
 * (GNM, BSc). Guidance and training only: Medcity does not offer job
 * placement. Every rule links the German law or official page it comes
 * from, checked on UPDATED.
 */

const PATH = "/nursing-in-germany-for-indian-nurses";
const UPDATED = "2026-10-24";
const TITLE = "Nursing in Germany for Indian Nurses";
const DESCRIPTION =
    "Nursing in Germany for Indian nurses from Kerala: how recognition works, the B2 German level, the knowledge test or adaptation course, and the visa routes.";
const OG_IMAGE = "/og-images/study-in-germany.webp";

const SRC = {
    makeIt: "https://www.make-it-in-germany.com/en/working-in-germany/professions-in-demand/nursing",
    bremen: "https://www.service.bremen.de/dienstleistungen/applying-for-recognition-as-a-nurse-with-a-professional-qualification-from-a-third-country-197553",
    recognition: "https://www.anerkennung-in-deutschland.de/en/",
    aufenthg16d: "https://www.gesetze-im-internet.de/aufenthg_2004/__16d.html",
    pflbg1: "https://www.gesetze-im-internet.de/pflbg/__1.html",
    pflbg2: "https://www.gesetze-im-internet.de/pflbg/__2.html",
    bamf: "https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/NachzugZuDrittstaatlern/nachzug-zu-drittstaatlern-node.html",
    mission: "https://india.diplo.de/",
};

const BREADCRUMBS = [
    { name: "Home", path: "/" },
    { name: "Study abroad for nurses", path: "/study-abroad-for-nurses" },
    { name: "Nursing in Germany", path: PATH },
];

const FAQS = [
    {
        question: "How long does nursing recognition in Germany take?",
        answer:
            "There is no fixed time. The Bremen recognition office says processing time varies from case to case and it tells you if documents are missing. If a knowledge test or adaptation course is needed, add that time: an adaptation course lasts at most three years, and a residence permit for it is first given for up to 24 months.",
    },
    {
        question: "Do I need B2 German to work as a nurse in Germany?",
        answer:
            "For recognition, yes: Make it in Germany and the Bremen recognition office both name level B2. For the recognition partnership visa, Make it in Germany names A2 at entry, with B2 still needed for recognition later. You will also need good German every day on the ward.",
    },
    {
        question: "Can my family join me in Germany?",
        answer:
            "Family reunion depends on your residence permit. The BAMF's general rules ask for a valid residence title, adequate accommodation and a secure livelihood, and a spouse usually needs simple everyday German. Some skilled worker permits have easier rules, so check your own permit with the German Mission before planning.",
    },
    {
        question: "Is nursing recognition in Germany free?",
        answer:
            "Advice from the Service Center for Professional Recognition is free, according to Make it in Germany. The recognition procedure itself has a fee that depends on the time and effort needed, as the Bremen office explains, and translations, certified copies and a knowledge test or adaptation course can cost extra.",
    },
    {
        question: "Does Medcity Overseas find nursing jobs in Germany?",
        answer:
            "No. We do not offer job placement or promise a job, a recognition result or a visa. We help with German training at Medcity Academy, explain the recognition steps, help you prepare documents and applications, and guide you through the visa checklist. Employers, German authorities and the German Mission make the decisions.",
    },
];

const SOURCES = [
    { label: "Make it in Germany: nursing", href: SRC.makeIt, note: "Recognition routes, the German level and visa options for nurses." },
    { label: "Recognition as a nurse (Bremen)", href: SRC.bremen, note: "A state recognition office's requirements, documents and measures for non EU nurses." },
    { label: "Recognition in Germany", href: SRC.recognition, note: "The federal portal for having a foreign qualification recognised." },
    { label: "Residence Act, section 16d", href: SRC.aufenthg16d, note: "Residence permits for recognition measures and recognition partnerships." },
    { label: "Nursing Professions Act, section 1", href: SRC.pflbg1, note: "Using the nursing title needs official permission." },
    { label: "BAMF: family members joining", href: SRC.bamf, note: "General conditions for spouses and children." },
];

export async function generateMetadata() {
    return guideMetadata({
        path: PATH,
        title: TITLE,
        description: DESCRIPTION,
        image: OG_IMAGE,
        imageAlt: "Nursing in Germany for Indian nurses with Medcity Overseas",
    });
}

export default function NursingInGermanyPage() {
    return (
        <div className="bg-white">
            <PageSchema
                path={PATH}
                type="Article"
                name={`${TITLE} | Medcity Overseas`}
                description={DESCRIPTION}
                dateModified={UPDATED}
                image={OG_IMAGE}
                breadcrumbs={BREADCRUMBS}
                about={{ "@type": "Occupation", name: "Nurse (Pflegefachfrau or Pflegefachmann)", occupationLocation: { "@type": "Country", name: "Germany" } }}
                faqs={FAQS}
            />

            <GuideHero
                eyebrow="Germany for qualified nurses"
                title={TITLE}
                breadcrumbs={BREADCRUMBS}
                intro="Nursing in Germany for Indian nurses starts with recognition (Anerkennung) of your GNM or BSc qualification. You need German at B2, a decision from the state recognition office, and in many cases a knowledge test or an adaptation course before you can work under the German nursing title."
            />

            <div className="space-y-14 py-12 sm:py-14">
                <QuickAnswer updated={UPDATED}>
                    Nurses qualified in India can work in Germany once their qualification is recognised and they hold permission to use the nursing title. Recognition normally needs German at B2. If your training differs from the German one, you close the gap with a knowledge test or an adaptation course of up to three years. Medcity Overseas helps with German training, documents and the visa checklist, not job placement.
                </QuickAnswer>

                <QuestionAnswer
                    eyebrow="Recognition"
                    question="How does recognition of an Indian nursing qualification work?"
                    answer="You apply to the recognition office of the German state where you will work, even from India. It compares your GNM or BSc training with German nursing training. If they match, you are recognised. If there are significant differences, you choose a knowledge test or an adaptation course. Make it in Germany also describes skipping the comparison and going straight to the adaptation route."
                />

                <GuideSection title="Recognition in plain steps" intro="The order below follows Make it in Germany and the Bremen recognition office.">
                    <PointList
                        ordered
                        items={[
                            { title: "Get free advice", text: "the Service Center for Professional Recognition (ZSBA) advises on which route suits you, free of charge." },
                            { title: "Learn German", text: "recognition normally needs level B2, and the certificate is asked for during the procedure." },
                            { title: "Collect documents", text: "passport, CV, proof of your nursing qualification and training, proof of work experience, and later a police clearance, a medical certificate and the language certificate. The office tells you whether copies, certified copies or originals are needed." },
                            { title: "Apply for recognition", text: "to the state recognition office. You can apply before you move to Germany." },
                            { title: "Close any gap", text: "if differences are found, take a knowledge test (oral and practical parts) or an adaptation course of up to three years." },
                            { title: "Receive permission", text: "the title Pflegefachfrau or Pflegefachmann needs official permission under section 1 of the Nursing Professions Act." },
                        ]}
                    />
                    <Prose>
                        <p>
                            Make it in Germany explains a choice at step 4: a full equivalence assessment using your training records, or waiving it and going straight to a compensation measure. Waiving is faster and cheaper, but your extra training and experience are not counted, so the test or adaptation period may be longer. Read it on{" "}
                            <SourceLink href={SRC.makeIt}>Make it in Germany</SourceLink> and the{" "}
                            <SourceLink href={SRC.bremen}>Bremen recognition page</SourceLink>.
                        </p>
                    </Prose>
                </GuideSection>

                <GuideSection title="What German level do Indian nurses need?">
                    <Prose>
                        <p>
                            Both <SourceLink href={SRC.makeIt}>Make it in Germany</SourceLink> and the{" "}
                            <SourceLink href={SRC.bremen}>Bremen recognition office</SourceLink> name level B2 of the Common European Framework for recognition. Section 2 of the{" "}
                            <SourceLink href={SRC.pflbg2}>Nursing Professions Act</SourceLink> also requires the German needed to practise the profession. For the recognition partnership visa, Make it in Germany names level A2 at entry; you still reach B2 for recognition later.
                        </p>
                    </Prose>
                    <AcademyNote>Medcity Academy teaches German from A1 to C2, with trainers qualified at C2 and exam preparation.</AcademyNote>
                </GuideSection>

                <GuideSection
                    title="Knowledge test or adaptation course?"
                    intro="If the recognition office finds significant differences, you choose how to show the missing knowledge. The Bremen office lets you choose either measure."
                >
                    <TableWrap minWidth={600}>
                        <thead className={theadClass}>
                            <tr>
                                <th scope="col" className={th}>Measure</th>
                                <th scope="col" className={th}>What it is</th>
                                <th scope="col" className={th}>Length</th>
                            </tr>
                        </thead>
                        <tbody className={tbodyClass}>
                            <tr>
                                <th scope="row" className={`${th} font-bold text-slate-900`}>Knowledge test (Kenntnisprüfung)</th>
                                <td className={th}>An exam on the areas where differences were found, with an oral and a practical part</td>
                                <td className={th}>Not recorded: ask the recognition office for exam dates</td>
                            </tr>
                            <tr>
                                <th scope="row" className={`${th} font-bold text-slate-900`}>Adaptation course (Anpassungslehrgang)</th>
                                <td className={th}>A course that closes the differences found in your training</td>
                                <td className={th}>At most 3 years</td>
                            </tr>
                        </tbody>
                    </TableWrap>
                </GuideSection>

                <GuideSection title="Visa routes for nurses" intro="From Make it in Germany and section 16d of the Residence Act. The EU Blue Card does not apply to nursing.">
                    <TableWrap minWidth={640}>
                        <thead className={theadClass}>
                            <tr>
                                <th scope="col" className={th}>Route</th>
                                <th scope="col" className={th}>When it fits</th>
                                <th scope="col" className={th}>Key conditions</th>
                            </tr>
                        </thead>
                        <tbody className={tbodyClass}>
                            <tr>
                                <th scope="row" className={`${th} font-bold text-slate-900`}>Visa for recognition measures</th>
                                <td className={th}>Your qualification is only partly recognised and you will take an adaptation course or prepare for the test in Germany</td>
                                <td className={th}>First issued for up to 24 months, extendable by up to 12 months at a time to a maximum of 3 years; side work up to 20 hours a week</td>
                            </tr>
                            <tr>
                                <th scope="row" className={`${th} font-bold text-slate-900`}>Recognition partnership</th>
                                <td className={th}>You have a job offer and complete recognition after arrival while working</td>
                                <td className={th}>A German employment contract, a written partnership with the employer, a recognised Indian qualification of at least 2 years&apos; training or a degree, and A2 German</td>
                            </tr>
                            <tr>
                                <th scope="row" className={`${th} font-bold text-slate-900`}>Opportunity card</th>
                                <td className={th}>You want to enter and look for work under its conditions</td>
                                <td className={th}>See the conditions on Make it in Germany</td>
                            </tr>
                        </tbody>
                    </TableWrap>
                    <Prose>
                        <p>
                            The legal text is in <SourceLink href={SRC.aufenthg16d}>section 16d of the Residence Act</SourceLink>; appointments and checklists are on the{" "}
                            <SourceLink href={SRC.mission}>German Missions in India</SourceLink> site. Our <TextLink href="/student-visa-guidance">visa guidance page</TextLink> explains how we help with visa files.
                        </p>
                    </Prose>
                </GuideSection>

                <GuideSection title="How Medcity helps, and what we do not do">
                    <PointList
                        items={[
                            "German training from A1 to B2 and beyond at Medcity Academy.",
                            "Explaining the recognition steps and the choice between the test and the adaptation course.",
                            "A document checklist and help preparing your recognition and visa applications.",
                            "Pre-departure guidance for you and your family.",
                        ]}
                    />
                    <Prose>
                        <p>
                            We do not offer job placement and we never promise a job, a recognition result or a visa. Not qualified yet? Look at{" "}
                            <TextLink href="/study-in-germany/nursing-ausbildung">nursing Ausbildung in Germany</TextLink>, which starts after Class 12. You can also compare all{" "}
                            <TextLink href="/study-in-germany">Germany programmes</TextLink> or the{" "}
                            <TextLink href="/study-in-germany/weiterbildung">Weiterbildung route</TextLink>.
                        </p>
                    </Prose>
                </GuideSection>

                <FaqList path={PATH} faqs={FAQS} schema={false} title="Nursing in Germany: frequently asked questions" />

                <OfficialSources links={SOURCES} intro="Rules and fees change. These are the official pages behind this guide, checked on 24 October 2026." />

                <RelatedLinks
                    links={[
                        { href: "/study-abroad-for-nurses", title: "Study abroad for nurses", text: "Compare the UK, Ireland, Germany, Australia, New Zealand and Malta." },
                        { href: "/study-in-germany/nursing-ausbildung", title: "Nursing Ausbildung in Germany", text: "Paid nursing training for students after Class 12." },
                        { href: "/msc-nursing-in-uk", title: "MSc Nursing in the UK", text: "Courses and the Student visa for nurses." },
                        { href: "/placement-assistance-nursing", title: "UK nursing pathway", text: "The MSc pathway we support in the UK." },
                    ]}
                />

                <ContactBand />
            </div>
        </div>
    );
}
