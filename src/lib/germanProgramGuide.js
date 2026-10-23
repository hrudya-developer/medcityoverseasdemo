import { createSlug } from "@/lib/slug";

/*
 * Search and answer content for the German programme pages
 * (/study-in-germany/[slug]): title, description, the "In short" box,
 * a question with a direct answer, FAQs and official sources. The
 * programme's own details (benefits, eligibility, roadmap) come from
 * the database; this adds general, checkable facts only. No fees,
 * salaries or other figures here: those belong in the database.
 *
 * Update GUIDE_UPDATED whenever this text is reviewed.
 */
export const GUIDE_UPDATED = "2026-10-23";

const SOURCES = {
    makeIt: {
        label: "Make it in Germany",
        href: "https://www.make-it-in-germany.com/en/",
        note: "The German Federal Government's portal for skilled workers, trainees and students.",
    },
    daad: {
        label: "DAAD (German Academic Exchange Service)",
        href: "https://www.daad.de/en/",
        note: "Admission rules, scholarships and the admission database for international students.",
    },
    studyIn: {
        label: "Study in Germany",
        href: "https://www.study-in-germany.de/en/",
        note: "The DAAD's official guide to studying in Germany.",
    },
    anabin: {
        label: "anabin database",
        href: "https://anabin.kmk.org/",
        note: "How German authorities assess foreign school certificates and degrees.",
    },
    uniAssist: {
        label: "uni-assist",
        href: "https://www.uni-assist.de/en/",
        note: "The application service many German universities use for international applicants.",
    },
    mission: {
        label: "German Missions in India",
        href: "https://india.diplo.de/",
        note: "Visa types, document checklists and appointments for applicants in India.",
    },
    agency: {
        label: "Federal Employment Agency",
        href: "https://www.arbeitsagentur.de/en",
        note: "Germany's public employment service, with information on training and work.",
    },
    recognition: {
        label: "Recognition in Germany",
        href: "https://www.anerkennung-in-deutschland.de/en/",
        note: "The official portal for having a foreign professional qualification recognised.",
    },
    bfd: {
        label: "Bundesfreiwilligendienst",
        href: "https://www.bundesfreiwilligendienst.de/",
        note: "The official website of Germany's federal volunteer service.",
    },
    ministry: {
        label: "Federal Ministry for Family Affairs (BMFSFJ)",
        href: "https://www.bmfsfj.de/",
        note: "The ministry responsible for Germany's youth voluntary services, including FSJ.",
    },
    research: {
        label: "Research in Germany",
        href: "https://www.research-in-germany.org/en/",
        note: "The official portal for doctoral and research opportunities in Germany.",
    },
};

function helpFaq(name) {
    return {
        question: `How does Medcity Overseas help with ${name}?`,
        answer: `Medcity Overseas guides students from Kerala through every step of ${name}: a free counselling session to check eligibility, German language training, preparing and translating documents, applications and the German visa. Call or WhatsApp +91 90729 82555 to book a session.`,
    };
}

const GUIDES = {
    ausbildung: {
        phrase: "an Ausbildung",
        name: "Ausbildung",
        title: "Ausbildung in Germany: Vocational Training",
        description:
            "Ausbildung in Germany explained: paid vocational training at a school and a company, who can apply, German language needs and how Medcity Overseas helps.",
        summary:
            "Ausbildung is Germany's dual vocational training system. Trainees learn at a vocational school (Berufsschule) and work at a company at the same time, and receive a monthly training allowance. Medcity Overseas helps students from Kerala with German language training, applications and the visa.",
        question: "What is Ausbildung in Germany?",
        answer:
            "Ausbildung is a state-recognised vocational training programme in Germany that combines classes at a vocational school with practical work at a company. Most programmes last 2 to 3.5 years, trainees receive a monthly training allowance, and graduates earn a German qualification employers recognise. Fields include nursing, hospitality, trades and technical jobs.",
        faqs: [
            {
                question: "Is Ausbildung in Germany paid?",
                answer:
                    "Yes. In a company-based Ausbildung the employer pays trainees a monthly training allowance (Ausbildungsvergütung). The amount depends on the occupation, the region and the year of training. Some school-based programmes work differently, so check the terms of each training offer.",
            },
            {
                question: "Do I need to know German for Ausbildung?",
                answer:
                    "Yes. Classes at the vocational school and work at the company are in German, so a good command of German is needed. Training companies and the visa office ask for a recognised German language certificate.",
            },
            {
                question: "Can I work in Germany after completing Ausbildung?",
                answer:
                    "Yes. After an Ausbildung you hold a recognised German vocational qualification, and you can apply for a residence permit to work in Germany as a skilled worker in a job that matches your training.",
            },
        ],
        sources: ["makeIt", "agency", "mission"],
    },
    "au-pair": {
        phrase: "an au pair stay",
        name: "Au Pair",
        title: "Au Pair in Germany: Eligibility and Visa",
        description:
            "Au pair in Germany explained: living with a host family, childcare duties, pocket money, who can apply and how Medcity Overseas helps with German and the visa.",
        summary:
            "An au pair in Germany lives with a host family, helps with childcare and light housework, and receives free board, lodging and pocket money in return. It is a cultural exchange that helps young people improve their German. Medcity Overseas helps with German training, documents and the visa.",
        question: "What is an au pair in Germany?",
        answer:
            "An au pair is a young person who lives with a German host family for up to 12 months, helps with childcare and light household tasks, and receives free accommodation, meals and monthly pocket money. It is a cultural exchange, so au pairs also attend a German language course and get to know everyday life in Germany.",
        faqs: [
            {
                question: "Who can become an au pair in Germany?",
                answer:
                    "Applicants from outside the EU generally need to be between 18 and 26 years old when they apply, have basic German language skills and hold an au pair agreement with a host family. Check the current visa rules with the German Missions in India before applying.",
            },
            {
                question: "Do au pairs in Germany get paid?",
                answer:
                    "Au pairs are not employees, but the host family provides free board and lodging and pays monthly pocket money. The host family also arranges health, accident and liability insurance. The details are set out in the au pair agreement.",
            },
            {
                question: "How long can an au pair stay in Germany?",
                answer:
                    "An au pair stay in Germany lasts up to 12 months. Many au pairs then move on to a voluntary service, vocational training (Ausbildung) or study, each of which needs its own visa.",
            },
        ],
        sources: ["makeIt", "mission", "agency"],
    },
    fsj: {
        phrase: "an FSJ",
        name: "FSJ",
        title: "FSJ in Germany: Voluntary Social Year",
        description:
            "FSJ (Freiwilliges Soziales Jahr) in Germany explained: a voluntary social year in care, health and social work, who can apply and how Medcity Overseas helps.",
        summary:
            "FSJ, the Freiwilliges Soziales Jahr, is a voluntary social year in Germany for young people. Volunteers work in hospitals, care homes, kindergartens and social projects, and receive pocket money and seminars. Medcity Overseas helps with German training, placements, documents and the visa.",
        question: "What is FSJ in Germany?",
        answer:
            "FSJ (Freiwilliges Soziales Jahr) is a voluntary social year in Germany for young people under 27. Volunteers work in places such as hospitals, care homes, kindergartens and social projects, usually for 12 months, and receive pocket money and educational seminars. It is a common way to gain German experience before Ausbildung or study.",
        faqs: [
            {
                question: "How long does FSJ last?",
                answer:
                    "An FSJ normally lasts 12 months. Depending on the placement it can run from 6 to 18 months, and in exceptional cases it can be extended to 24 months.",
            },
            {
                question: "Do FSJ volunteers get paid?",
                answer:
                    "FSJ is a voluntary service, not a job, but volunteers receive monthly pocket money and are covered by social insurance. Many placements also provide or support meals and accommodation. The amounts depend on the organisation.",
            },
            {
                question: "What is the difference between FSJ and BFD?",
                answer:
                    "Both are voluntary services in Germany with similar placements. FSJ is for young people under 27, while the Bundesfreiwilligendienst (BFD) is open to people of any age once they have finished compulsory schooling.",
            },
        ],
        sources: ["ministry", "makeIt", "mission"],
    },
    bfd: {
        phrase: "a BFD placement",
        name: "BFD",
        title: "BFD in Germany: Federal Volunteer Service",
        description:
            "BFD (Bundesfreiwilligendienst) in Germany explained: the federal volunteer service, who can join, what volunteers receive and how Medcity Overseas helps.",
        summary:
            "BFD, the Bundesfreiwilligendienst, is Germany's federal volunteer service. Volunteers work in social, environmental, cultural or sports organisations and receive pocket money, social insurance and seminars. Medcity Overseas helps with German training, placements, documents and the visa.",
        question: "What is BFD in Germany?",
        answer:
            "BFD, or Bundesfreiwilligendienst, is Germany's federal volunteer service. Volunteers of any age who have finished compulsory schooling work in social, environmental, cultural or sports organisations, usually for 12 months. They receive monthly pocket money, social insurance cover and seminars, and gain German work experience and language practice.",
        faqs: [
            {
                question: "How long does BFD last?",
                answer:
                    "The Bundesfreiwilligendienst usually lasts 12 months. It can generally run from 6 to 18 months, and in exceptional cases up to 24 months.",
            },
            {
                question: "Is there an age limit for BFD?",
                answer:
                    "No. Unlike FSJ, which is for people under 27, the BFD has no upper age limit. You must have finished compulsory schooling, and volunteers from outside the EU need the right visa.",
            },
            {
                question: "What do BFD volunteers receive?",
                answer:
                    "Volunteers receive monthly pocket money, social insurance and educational seminars. Some placements also provide meals, accommodation or support towards them. The details are agreed with the placement organisation.",
            },
        ],
        sources: ["bfd", "makeIt", "mission"],
    },
    "bachelor-s": {
        phrase: "a bachelor's",
        name: "Bachelor's",
        title: "Bachelor's in Germany for Indian Students",
        description:
            "Study a bachelor's degree in Germany: entry rules for Indian students, Studienkolleg, German language needs, tuition at public universities and how to apply.",
        summary:
            "A bachelor's degree in Germany is an undergraduate degree from a German university or university of applied sciences. Indian students usually need a recognised entrance qualification and German language skills. Medcity Overseas helps with eligibility checks, German training, applications and the visa.",
        question: "How can Indian students study a bachelor's in Germany?",
        answer:
            "To study a bachelor's degree in Germany, you need a school-leaving certificate that German universities accept as a university entrance qualification. Indian students with a Class 12 certificate often need to complete a Studienkolleg or some university study in India first. Most bachelor's programmes take 3 to 4 years and are taught in German, so language skills matter.",
        faqs: [
            {
                question: "Are bachelor's degrees in Germany free?",
                answer:
                    "Most public universities in Germany charge no tuition fees for bachelor's programmes, although students pay a semester contribution for administration and services. Some states, such as Baden-Württemberg, charge tuition fees to students from outside the EU, and private universities set their own fees.",
            },
            {
                question: "Do I need German for a bachelor's in Germany?",
                answer:
                    "For most bachelor's programmes, yes, because teaching is in German and universities ask for proof such as TestDaF or DSH. A smaller number of bachelor's programmes are taught in English and ask for English test scores instead.",
            },
            {
                question: "What is a Studienkolleg?",
                answer:
                    "A Studienkolleg is a preparatory course for international students whose school certificate does not give direct entry to a German university. It ends with an assessment test (Feststellungsprüfung), and passing it lets you apply for bachelor's programmes in related subjects.",
            },
        ],
        sources: ["daad", "studyIn", "anabin", "uniAssist"],
    },
    "master-s": {
        phrase: "a master's",
        name: "Master's",
        title: "Master's in Germany for Indian Students",
        description:
            "Study a master's degree in Germany: entry requirements, English and German taught programmes, tuition at public universities, part-time work and next steps.",
        summary:
            "A master's degree in Germany is a postgraduate degree for students who already hold a recognised bachelor's degree. Many programmes are taught in English. Medcity Overseas helps Indian students choose programmes, prepare applications, learn German and apply for the student visa.",
        question: "What do you need to study a master's in Germany?",
        answer:
            "To study a master's in Germany, usually a 1 to 2 year degree, you need a recognised bachelor's degree in a related subject, proof of English or German language skills depending on the programme, and the documents each university asks for. Many master's programmes are taught in English, and many public universities charge no tuition fees for them.",
        faqs: [
            {
                question: "Can I work while studying a master's in Germany?",
                answer:
                    "Yes. Students from outside the EU may work part-time alongside their studies within limits set by German residence law, and student assistant jobs at universities are common. Check the current rules with the German Missions in India or your university.",
            },
            {
                question: "Can I stay in Germany after a master's degree?",
                answer:
                    "Yes. After graduating, international students can apply for a residence permit to look for a job in Germany that matches their qualification, and then for a work permit or EU Blue Card once they have an offer.",
            },
            {
                question: "Do I need German for a master's in Germany?",
                answer:
                    "Not always. Many master's programmes are taught in English and ask for IELTS or TOEFL scores. German-taught programmes ask for TestDaF, DSH or a similar certificate, and German helps with part-time jobs and daily life.",
            },
        ],
        sources: ["daad", "studyIn", "uniAssist", "mission"],
    },
    studienkollegs: {
        phrase: "a Studienkolleg",
        name: "Studienkolleg",
        title: "Studienkolleg in Germany: Courses and Entry",
        description:
            "Studienkolleg in Germany explained: the university preparation course, who needs it, course types, the Feststellungsprüfung and how Medcity Overseas helps.",
        summary:
            "A Studienkolleg is a university preparation course in Germany for international students whose school certificate does not give direct university entry. It is taught in German and ends with the Feststellungsprüfung. Medcity Overseas helps with German training, applications and the visa.",
        question: "What is a Studienkolleg in Germany?",
        answer:
            "A Studienkolleg is a preparatory course in Germany for international students whose school-leaving certificate does not give direct entry to a German university. It usually lasts 2 semesters, is taught in German and ends with the Feststellungsprüfung assessment test. Passing it lets you apply for bachelor's programmes in the matching subject area.",
        faqs: [
            {
                question: "Who needs a Studienkolleg?",
                answer:
                    "Students whose school certificate is not recognised as equal to the German Abitur, which includes many students who finished Class 12 in India. You can check how your certificate is assessed in the DAAD admission database or the anabin database.",
            },
            {
                question: "Do I need German for a Studienkolleg?",
                answer:
                    "Yes. Teaching is in German, and Studienkollegs hold an entrance test that includes German. Most expect an intermediate level of German before you apply.",
            },
            {
                question: "What courses does a Studienkolleg offer?",
                answer:
                    "Courses are grouped by the subjects you plan to study, for example the T course for technical and engineering subjects, the M course for medicine and biology, and the W course for economics and social sciences.",
            },
        ],
        sources: ["daad", "studyIn", "anabin", "uniAssist"],
    },
    weiterbildung: {
        phrase: "a Weiterbildung",
        name: "Weiterbildung",
        title: "Weiterbildung in Germany: Further Training",
        description:
            "Weiterbildung in Germany explained: further training for people with a qualification, recognition of foreign qualifications and how Medcity Overseas can help.",
        summary:
            "Weiterbildung means further or continuing training in Germany for people who already have a qualification or work experience. It can add a specialisation or help close gaps during recognition of a foreign qualification. Medcity Overseas helps with German training, documents and the visa.",
        question: "What is Weiterbildung in Germany?",
        answer:
            "Weiterbildung is further or continuing education in Germany for people who already hold a qualification or work experience. It can update skills, add a specialisation or help close gaps when a foreign qualification is being recognised. Courses range from short programmes to longer training that leads to a recognised certificate.",
        faqs: [
            {
                question: "Who is Weiterbildung for?",
                answer:
                    "Weiterbildung is for people who have already finished school, training or a degree and want to build on it. International professionals often use it alongside the recognition process for their foreign qualification.",
            },
            {
                question: "How is a foreign qualification recognised in Germany?",
                answer:
                    "Recognition (Anerkennung) is handled by the authority responsible for your profession. The official Recognition in Germany portal explains which authority applies and which documents are needed. If gaps are found, an adaptation course or an exam can help close them.",
            },
            {
                question: "Do I need German for Weiterbildung?",
                answer:
                    "Most further training in Germany is taught in German, and many regulated professions also require proof of German for recognition. Medcity Overseas offers German language training to help you prepare.",
            },
        ],
        sources: ["recognition", "makeIt", "agency"],
    },
    "duales-studium": {
        phrase: "a Duales Studium",
        name: "Duales Studium",
        title: "Duales Studium in Germany: Dual Study",
        description:
            "Duales Studium in Germany explained: a degree combined with paid work at a partner company, entry requirements, German language needs and how Medcity helps.",
        summary:
            "Duales Studium is a dual study programme in Germany that combines a degree with paid work at a partner company. Students graduate with a degree and work experience. Medcity Overseas helps with German training, applications and the visa.",
        question: "What is Duales Studium in Germany?",
        answer:
            "Duales Studium is a dual study programme in Germany that combines a bachelor's degree at a university or university of applied sciences with practical phases at a partner company. Students switch between study and work, usually earn a monthly salary from the company and graduate with both a degree and work experience.",
        faqs: [
            {
                question: "Is Duales Studium paid?",
                answer:
                    "In most cases, yes. The partner company pays a monthly salary during the programme, and some companies also cover tuition fees at private universities. The amount depends on the company and the field.",
            },
            {
                question: "What do I need to apply for Duales Studium?",
                answer:
                    "You need a university entrance qualification recognised in Germany, good German language skills and a contract with a partner company. Companies usually select dual students through their own application process.",
            },
        ],
        sources: ["studyIn", "daad", "makeIt"],
    },
    phd: {
        phrase: "a PhD",
        name: "PhD",
        title: "PhD in Germany for Indian Students",
        description:
            "Doing a PhD in Germany: individual and structured doctorates, entry requirements, funding through positions and scholarships, language needs and next steps.",
        summary:
            "A PhD in Germany is a doctorate done either under a professor's supervision or in a structured doctoral programme. You usually need a master's degree. Medcity Overseas helps Indian students plan applications, documents and the visa.",
        question: "How does a PhD in Germany work?",
        answer:
            "A PhD in Germany is usually done either as an individual doctorate, researching under a professor's supervision, or in a structured doctoral programme with other doctoral students. You normally need a master's degree or equivalent. Many doctoral candidates are funded through university jobs, research projects or scholarships such as those from the DAAD.",
        faqs: [
            {
                question: "Do I need German for a PhD in Germany?",
                answer:
                    "Not always. Many doctoral programmes and research groups work in English, especially in science and engineering. German helps in daily life and is needed in some fields.",
            },
            {
                question: "Do PhD students in Germany pay tuition fees?",
                answer:
                    "Public universities generally charge no tuition fees for doctoral studies, although a semester contribution may apply if you enrol as a student.",
            },
        ],
        sources: ["research", "daad", "studyIn"],
    },
};

const ALIASES = {
    bachelors: "bachelor-s",
    "bachelor-s-degree": "bachelor-s",
    masters: "master-s",
    "master-s-degree": "master-s",
    studienkolleg: "studienkollegs",
    duales: "duales-studium",
    "au-pairs": "au-pair",
    "freiwilliges-soziales-jahr": "fsj",
    bundesfreiwilligendienst: "bfd",
};

function words(text) {
    return String(text ?? "").trim().split(/\s+/).filter(Boolean).length;
}

/**
 * The guide for a programme name, or a general guide built from the
 * programme's own text when there is no written guide for it.
 */
export function germanProgramGuide(programName, programWhy = "") {
    const slug = createSlug(programName);
    const guide = GUIDES[slug] ?? GUIDES[ALIASES[slug]];
    const name = guide?.name ?? (String(programName || "").trim() || "This programme");
    const phrase = guide?.phrase ?? name;

    const start = {
        question: `How do you start ${phrase} in Germany with Medcity Overseas?`,
        answer: `Start with a free counselling session, where a Medcity Overseas counsellor checks your profile against the ${name} requirements. You then build your German, prepare and translate your documents, send your applications and finally apply for the right German visa. The steps below show the usual order, and your counsellor adapts them to you.`,
        steps: [
            { title: "Free counselling", text: "check your eligibility and confirm the programme suits your goals." },
            { title: "German language training", text: "reach the level your programme and the visa office ask for." },
            { title: "Documents and applications", text: "prepare, translate and submit what each application needs." },
            { title: "Visa and departure", text: "apply for the right German visa and prepare for your move." },
        ],
    };

    if (guide) {
        return {
            ...guide,
            start,
            faqs: [...guide.faqs, helpFaq(guide.name)],
            sources: guide.sources.map((key) => SOURCES[key]),
        };
    }

    const why = String(programWhy ?? "").replace(/\s+/g, " ").trim();
    const fallbackAnswer = `${name} is one of the Germany programmes Medcity Overseas guides students through. This page sets out its benefits, eligibility, steps and details. Speak to a Medcity Overseas counsellor for advice on your profile, the German language level you need and the documents to prepare before you apply.`;

    return {
        name,
        title: `${name} in Germany for Indian Students`,
        description: `${name} in Germany: benefits, eligibility, steps and programme details for Indian students, with free counselling and visa guidance from Medcity Overseas.`,
        summary: `${name} is a Germany programme that Medcity Overseas guides students from Kerala through, from the first counselling session to German language training, applications and the visa.`,
        question: `What is ${name} in Germany?`,
        answer: words(why) >= 40 && words(why) <= 60 ? why : fallbackAnswer,
        start,
        faqs: [helpFaq(name)],
        sources: [SOURCES.makeIt, SOURCES.daad, SOURCES.mission],
    };
}
