import { levelMatches, levelSql } from "@/lib/courseFilterTerms";
import { intakeList } from "@/lib/recordValue";

/*
 * The course guides at /course-guides/<subject>-in-<country>: one
 * config entry per guide, and the pure functions that decide which
 * tb_courses rows belong to a guide, whether a guide has enough courses
 * to be published, and what the page says about them. The database
 * reads are in lib/courseGuideData.js.
 *
 * Adding a guide means adding an entry to COURSE_GUIDES: the page, the
 * sitemap and the links from /popular-courses, the country guide and
 * the matching course pages all follow from it.
 *
 * Matching is on whole words of the course name and the recorded
 * level. guideCourseWhere() states the same rules in SQL as
 * courseMatchesGuide() does in JS, so the database can count the
 * matching courses and universities exactly; the page then reads only
 * the rows it needs.
 */

export const COURSE_GUIDES_PATH = "/course-guides";

/** A guide with fewer matching courses is thin: noindex and not in the sitemap. */
export const MIN_GUIDE_COURSES = 5;

/** The most course rows a guide's table shows. */
export const GUIDE_TABLE_LIMIT = 50;

/** The most matching rows read (without fees or full entry text) for one guide's summary. */
export const GUIDE_READ_LIMIT = 20000;

// Course names that mark a master's degree, for courses whose level is
// not recorded (or is only "Postgraduate").
const MASTER_NAMES = [
    "master",
    "masters",
    "master's",
    "msc",
    "m.sc",
    "ma",
    "m.a",
    "mba",
    "meng",
    "m.eng",
    "mres",
    "mphil",
    "mlitt",
    "llm",
    "ll.m",
    "ms",
    "mfa",
    "mph",
    "mpa",
    "mim",
];

// An MBA by any of its spellings ("M.B.A." is matched as "m b a").
const MBA_NAMES = [
    "mba",
    "m.b.a.",
    "master of business administration",
    "masters of business administration",
    "master's of business administration",
    "master in business administration",
    "masters in business administration",
    "master's in business administration",
];

// A pre-master's course prepares for a master's; it is not one.
const PRE_MASTERS = ["pre-master", "pre master", "premaster", "pre-masters", "pre masters", "premasters", "pre-mba", "pre mba"];

// Names that are not a master's degree even with "master" or "MSc" in
// them: preparation and pre-sessional courses, master classes, and the
// postgraduate certificates and diplomas below a master's.
const NOT_MASTERS = [
    ...PRE_MASTERS,
    "pre-sessional",
    "pre sessional",
    "presessional",
    "preparation",
    "preparatory",
    "master class",
    "master classes",
    "masterclass",
    "masterclasses",
    "graduate certificate",
    "postgraduate certificate",
    "pg certificate",
    "pgcert",
    "graduate diploma",
    "postgraduate diploma",
    "pg diploma",
    "pgdip",
    "higher diploma",
];

// Levels that rule a course out of a master's guide even when its name
// looks like a master's (an integrated MSci recorded as Bachelors, say).
const NOT_POSTGRADUATE = ["Undergraduate", "Diploma", "Certificate", "PhD"];

/*
 * Each country a guide can cover: how it is stored in tb_destinations,
 * its slug as in /study-in-<slug>, and the official visa pages (checked
 * on the date in CHECKED). The visa text repeats only what those pages
 * say.
 */
export const GUIDE_COUNTRIES = {
    uk: {
        name: "UK",
        fullName: "the UK",
        slug: "uk",
        slugs: ["uk", "united-kingdom"],
        dbNames: ["uk", "united kingdom", "great britain", "england"],
        visaName: "Student visa",
        visaSteps: [
            { title: "Get an offer", text: "GOV.UK says you need an offer of a place on a course from a licensed student sponsor; the university then issues your Confirmation of Acceptance for Studies (CAS)." },
            { title: "Show your English", text: "you must be able to speak, read, write and understand English at the level your course and the visa need." },
            { title: "Show your money", text: "you need enough money to support yourself and pay for your course; GOV.UK says the amount depends on your circumstances." },
            { title: "Check the rules before you apply", text: "read the current Student visa rules, fees and application steps on GOV.UK before you start." },
        ],
        sources: [
            { label: "GOV.UK: Student visa", href: "https://www.gov.uk/student-visa", note: "Who can apply, the money and English rules, and how to apply." },
        ],
    },
    ireland: {
        name: "Ireland",
        fullName: "Ireland",
        slug: "ireland",
        slugs: ["ireland"],
        dbNames: ["ireland", "republic of ireland"],
        visaName: "study visa",
        visaSteps: [
            { title: "Get your letter of enrolment", text: "the Irish Immigration Service asks for a letter of enrolment from your college and proof that you have paid your fees." },
            { title: "Choose the right visa", text: "students who need a visa apply for a Long Stay D visa for a stay of more than 90 days (a Short Stay C visa is for under 90 days)." },
            { title: "Use the online visa system", text: "the Irish Immigration Service publishes a guide to giving your details in its online visa application system." },
            { title: "Register after you arrive", text: "for a stay of more than 90 days you also register with immigration after arriving in Ireland." },
        ],
        sources: [
            { label: "Irish Immigration Service: coming to study in Ireland", href: "https://www.irishimmigration.ie/coming-to-study-in-ireland/", note: "What non-EEA students need before and after they arrive." },
            { label: "Irish Immigration Service: study visa options", href: "https://www.irishimmigration.ie/coming-to-study-in-ireland/what-are-my-study-visa-options/", note: "The Long Stay D and Short Stay C study visas." },
        ],
    },
    australia: {
        name: "Australia",
        fullName: "Australia",
        slug: "australia",
        slugs: ["australia"],
        dbNames: ["australia"],
        visaName: "Student visa (subclass 500)",
        visaSteps: [
            { title: "Get your Confirmation of Enrolment", text: "Study Australia says you will generally need to enrol in a course and receive a Confirmation of Enrolment (CoE) before you apply." },
            { title: "Arrange health cover", text: "arrange Overseas Student Health Cover (OSHC), unless an exemption applies." },
            { title: "Prepare your evidence", text: "the Department of Home Affairs uses your main course to decide the financial and English language evidence you need." },
            { title: "Check the visa requirements", text: "read the Department of Home Affairs page for the Student visa (subclass 500) before you apply." },
        ],
        sources: [
            { label: "Home Affairs: Student visa (subclass 500)", href: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500", note: "The Australian Government's Student visa requirements and application." },
            { label: "Study Australia: Student visa (subclass 500)", href: "https://studyaustralia.gov.au/en/plan-your-move/your-guide-to-visas/student-visa-subclass-500", note: "The Confirmation of Enrolment, OSHC and evidence you need." },
        ],
    },
};

/*
 * The guides. include: words one of which the course name must contain
 * (empty: any course); exclude: words it must not contain; levels: the
 * level options (lib/courseFilterTerms.js) the recorded level must
 * match (empty: any level); levelNames: words in the course name that
 * stand in for the level when the recorded level is empty or does not
 * match; notLevels: levels that rule a course out in every case.
 */
export const COURSE_GUIDES = [
    {
        slug: "mba-in-uk",
        subject: "MBA",
        subjectPhrase: "an MBA",
        country: "uk",
        keyword: "mba in uk for indian students",
        include: MBA_NAMES,
        exclude: NOT_MASTERS,
        levels: ["Postgraduate"],
        levelNames: MBA_NAMES,
        notLevels: NOT_POSTGRADUATE,
        search: "MBA",
        description:
            "MBA in UK for Indian students: MBA courses we can help you apply to, entry and English requirements as recorded, intakes and the Student visa steps.",
    },
    {
        slug: "masters-in-ireland",
        subject: "Masters",
        subjectPhrase: "a master's degree",
        country: "ireland",
        keyword: "masters in ireland for indian students",
        include: [],
        exclude: NOT_MASTERS,
        levels: ["Masters"],
        levelNames: MASTER_NAMES,
        notLevels: NOT_POSTGRADUATE,
        search: "",
        description:
            "Masters in Ireland for Indian students: master's courses we can help you apply to, entry and English requirements as recorded, intakes and the study visa.",
    },
    {
        slug: "msc-data-science-in-uk",
        subject: "MSc Data Science",
        subjectPhrase: "an MSc in Data Science",
        country: "uk",
        keyword: "msc data science uk for indian students",
        include: ["data science", "data sciences"],
        exclude: NOT_MASTERS,
        levels: ["Masters"],
        levelNames: MASTER_NAMES,
        notLevels: NOT_POSTGRADUATE,
        search: "data science",
        description:
            "MSc Data Science in UK for Indian students: data science master's courses we list, entry and English requirements as recorded, intakes and the visa.",
    },
    {
        slug: "nursing-in-australia",
        subject: "Nursing",
        subjectPhrase: "nursing",
        country: "australia",
        keyword: "nursing in australia for indian students",
        include: ["nursing"],
        exclude: ["nursing assistant", "assistant in nursing", "assistants in nursing", "pre-nursing", "pre nursing", "prenursing"],
        levels: [],
        levelNames: [],
        notLevels: ["Certificate"],
        search: "nursing",
        description:
            "Nursing in Australia for Indian students: nursing courses we can help you apply to, entry and English rules as recorded, intakes and the subclass 500 visa.",
    },
];

/* ---------------------------------------------------------------- */

function key(value) {
    return String(value ?? "").trim().toLowerCase();
}

/** "mba-in-uk" as { subject: "mba", country: "uk" }, or null when it is not <subject>-in-<country>. */
export function parseGuideSlug(slug) {
    const text = key(slug);
    const match = /^([a-z0-9]+(?:-[a-z0-9]+)*)-in-([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(text);

    return match ? { subject: match[1], country: match[2] } : null;
}

/** The guide for a slug, or null for an unknown one. */
export function findCourseGuide(slug) {
    const text = key(slug);

    if (!parseGuideSlug(text)) {
        return null;
    }

    return COURSE_GUIDES.find((guide) => guide.slug === text) ?? null;
}

export function guideCountry(guide) {
    return GUIDE_COUNTRIES[guide?.country] ?? null;
}

export function guidePath(guide) {
    return `${COURSE_GUIDES_PATH}/${guide.slug}`;
}

/** "MBA in UK for Indian Students", the H1. */
export function guideHeading(guide) {
    return `${guide.subject} in ${guideCountry(guide).name} for Indian Students`;
}

/** The short label used in links: "MBA in the UK". */
export function guideLinkLabel(guide) {
    return `${guide.subject} in ${guideCountry(guide).fullName}`;
}

export function passesGuideGate(total) {
    return Number(total) >= MIN_GUIDE_COURSES;
}

/** The guides for a country slug as in /study-in-<slug> ("uk" or "united-kingdom"). */
export function guidesForCountrySlug(slug) {
    const text = key(slug);

    return COURSE_GUIDES.filter((guide) => guideCountry(guide)?.slugs.includes(text));
}

/* ---------------------------------------------------------------- */

/*
 * Word matching that SQL can repeat exactly, so the database counts the
 * same courses the page lists. A name is lower cased, each of these
 * characters becomes a space, and a term matches when " term " occurs
 * in " name ". REGEXP is avoided so the SQL runs on every MySQL and
 * MariaDB version.
 */
export const WORD_SPLIT_CHARS = [
    "(", ")", "[", "]", "{", "}", ",", ".", "/", "\\", "-", ":", ";", "&", "+", "'", "’", "\"", "!", "?", "*", "|", "_", "#",
    "\t", "\n", "\r", " ",
];

const SPLIT_SET = new Set(WORD_SPLIT_CHARS);

function splitWords(text) {
    return [...String(text ?? "").toLowerCase()].map((char) => (SPLIT_SET.has(char) ? " " : char)).join("");
}

/** A term in the form it is searched for: "M.B.A." becomes "m b a". */
export function normaliseTerm(term) {
    return splitWords(term).trim();
}

/** Whether a name contains one of the terms as whole words. */
export function hasWord(text, terms) {
    const words = ` ${splitWords(text)} `;

    return terms.some((term) => words.includes(` ${normaliseTerm(term)} `));
}

/** Whether a country name as stored (tb_destinations.country) is the guide's country. */
export function countryMatchesGuide(countryName, guide) {
    return Boolean(guideCountry(guide)?.dbNames.includes(key(countryName).replace(/\s+/g, " ")));
}

/** Whether a course name and recorded level belong to the guide (the country is checked separately). */
export function courseMatchesGuide({ course, level }, guide) {
    const name = String(course ?? "");

    if (guide.include.length && !hasWord(name, guide.include)) {
        return false;
    }

    if (guide.exclude.length && hasWord(name, guide.exclude)) {
        return false;
    }

    // A ruled out level (a PG Certificate or PG Diploma in a master's
    // guide) never matches, whichever way the level is read.
    if (guide.notLevels.length && levelMatches(level, guide.notLevels)) {
        return false;
    }

    if (!guide.levels.length) {
        return true;
    }

    return levelMatches(level, guide.levels) || (guide.levelNames.length > 0 && hasWord(name, guide.levelNames));
}

/** The guide a course page belongs to ({ name, level, country } as on the page), or null. */
export function guideForCourse({ name, level, country }) {
    return COURSE_GUIDES.find((guide) => countryMatchesGuide(country, guide) && courseMatchesGuide({ course: name, level }, guide)) ?? null;
}

// One character as an SQL literal, by its UTF-8 bytes, so no quoting or
// backslash rules (NO_BACKSLASH_ESCAPES or not) can change it.
function sqlChar(char) {
    const hex = [...new TextEncoder().encode(char)].map((byte) => byte.toString(16).padStart(2, "0")).join("");

    return `CHAR(0x${hex} USING utf8mb4)`;
}

// " name " with the split characters turned into spaces, as splitWords().
const SQL_WORDS = `CONCAT(' ', ${WORD_SPLIT_CHARS.reduce(
    (expression, char) => `REPLACE(${expression}, ${sqlChar(char)}, ' ')`,
    "LOWER(COALESCE(c.course, ''))"
)}, ' ')`;

function likeWord(term) {
    return `% ${escapeLike(normaliseTerm(term))} %`;
}

function escapeLike(text) {
    return text.replace(/[\\%_]/g, (match) => `\\${match}`);
}

// The word test, behind the cheap quickSql() test it implies, so the
// REPLACE chain runs only on names that can match. Same result.
function wordsSql(terms) {
    const quick = quickSql(terms);

    return {
        clause: `(${quick.clause} AND (${terms.map(() => `${SQL_WORDS} LIKE ?`).join(" OR ")}))`,
        params: [...quick.params, ...terms.map(likeWord)],
    };
}

// A cheap test the word test implies: the raw name contains the longest
// word of one of the terms.
function quickSql(terms) {
    const words = terms.map((term) => normaliseTerm(term).split(" ").sort((a, b) => b.length - a.length)[0]);

    return { clause: `(${words.map(() => "c.course LIKE ?").join(" OR ")})`, params: words.map((word) => `%${escapeLike(word)}%`) };
}

/**
 * The SQL for a guide's courses, on tb_courses c and tb_destinations d:
 * { clause, params }, to add to a WHERE with AND. It is the same test as
 * countryMatchesGuide() and courseMatchesGuide(), so COUNT(*) and GROUP
 * BY on it give the page's totals. (LIKE is case insensitive under the
 * table's collation; it also ignores accents, so in rare cases SQL can
 * keep a name the JS test drops, never the other way round.)
 */
export function guideCourseWhere(guide) {
    const country = guideCountry(guide);
    const parts = [`LOWER(TRIM(d.country)) IN (${country.dbNames.map(() => "?").join(", ")})`];
    const params = [...country.dbNames];
    const add = (sql, prefix = "") => {
        parts.push(`${prefix}${sql.clause}`);
        params.push(...sql.params);
    };

    if (guide.include.length) {
        add(wordsSql(guide.include));
    }

    if (guide.exclude.length) {
        add(wordsSql(guide.exclude), "NOT ");
    }

    const notLevels = levelSql(guide.notLevels, "COALESCE(c.level, '')");

    if (notLevels) {
        add(notLevels, "NOT ");
    }

    if (guide.levels.length) {
        const level = levelSql(guide.levels, "COALESCE(c.level, '')");
        const names = guide.levelNames.length ? wordsSql(guide.levelNames) : null;

        add(
            names
                ? { clause: `(${level.clause} OR ${names.clause})`, params: [...level.params, ...names.params] }
                : level
        );
    }

    return { clause: parts.join(" AND "), params };
}

/* ---------------------------------------------------------------- */

function byText(a, b) {
    return String(a ?? "").localeCompare(String(b ?? ""), "en", { sensitivity: "base" });
}

/**
 * Up to `limit` rows for the table, spread across universities (one
 * course from each in turn) so one large university does not fill it,
 * then in university and course order.
 */
export function selectTableRows(courses, limit = GUIDE_TABLE_LIMIT) {
    const groups = new Map();

    for (const course of [...courses].sort((a, b) => byText(a.university, b.university) || byText(a.course, b.course))) {
        const list = groups.get(course.university) ?? [];

        list.push(course);
        groups.set(course.university, list);
    }

    const picked = [];
    const lists = [...groups.values()];

    for (let round = 0; picked.length < limit && lists.some((list) => list.length > round); round += 1) {
        for (const list of lists) {
            if (round < list.length && picked.length < limit) {
                picked.push(list[round]);
            }
        }
    }

    return picked.sort((a, b) => byText(a.university, b.university) || byText(a.course, b.course));
}

/** Recorded values of one field with how many courses hold each, most common first. */
export function valueCounts(courses, field) {
    const counts = new Map();

    for (const course of courses) {
        const value = course[field];

        if (value) {
            const entry = counts.get(value.toLowerCase()) ?? { value, count: 0 };

            entry.count += 1;
            counts.set(value.toLowerCase(), entry);
        }
    }

    return [...counts.values()].sort((a, b) => b.count - a.count || byText(a.value, b.value));
}

/** University rows ({ name, href, courses }) with the most courses first. */
export function sortUniversities(universities) {
    return [...universities].sort((a, b) => b.courses - a.courses || byText(a.name, b.name));
}

/** The universities with how many of the courses each offers, most first. */
export function universityCounts(courses) {
    const counts = new Map();

    for (const course of courses) {
        const entry = counts.get(course.university) ?? { name: course.university, href: course.universityHref, courses: 0 };

        entry.courses += 1;
        counts.set(course.university, entry);
    }

    return sortUniversities(counts.values());
}

/**
 * What a guide page shows about its matching courses. `courses` are the
 * matching rows as read for the summary (no fees, entry text cut short:
 * enough to tell whether one is recorded); `universities` and `total`
 * come from the database's own GROUP BY and so are exact even when
 * `truncated` says the rows were capped. The table rows and entry
 * examples are returned as ids, for a second small read of the full
 * records. Every value is a recorded one or a count of them.
 */
export function summariseGuideCourses(courses, { universities, total, truncated = false } = {}) {
    const entryIds = [];
    const seenEntries = new Set();

    for (const course of [...courses].sort((a, b) => byText(a.university, b.university) || byText(a.course, b.course))) {
        if (course.entry && !seenEntries.has(course.entry.toLowerCase()) && entryIds.length < 6) {
            seenEntries.add(course.entry.toLowerCase());
            entryIds.push(course.id);
        }
    }

    const count = (test) => courses.filter(test).length;

    return {
        total: total ?? courses.length,
        truncated,
        rowIds: selectTableRows(courses).map((course) => course.id),
        entryIds,
        universities: universities ? sortUniversities(universities) : universityCounts(courses),
        levels: valueCounts(courses, "level"),
        durations: valueCounts(courses, "duration"),
        ielts: valueCounts(courses, "ielts"),
        english: {
            ielts: count((course) => course.ielts),
            pte: count((course) => course.pte),
            toefl: count((course) => course.toefl),
            duolingo: count((course) => course.duolingo),
            lowerScore: count((course) => course.ieltsLess || course.pteLess || course.toeflLess),
        },
        withEntry: count((course) => course.entry),
        intakes: intakeList(courses.map((course) => course.intakes)),
    };
}

/* ---------------------------------------------------------------- */

function joinWords(items) {
    const list = (items ?? []).filter(Boolean);

    return list.length <= 1 ? list.join("") : `${list.slice(0, -1).join(", ")} and ${list.at(-1)}`;
}

function plural(count, one, many) {
    return `${count} ${count === 1 ? one : many}`;
}

/** "6.5 (12 courses) and 6.0 (8 courses)" from valueCounts() rows. */
export function countedValues(list, max = 3) {
    return joinWords(list.slice(0, max).map((item) => `${item.value} (${plural(item.count, "course", "courses")})`));
}

/** "The values recorded most often are 6.5 (3 courses) and 6.0 (2 courses)", or "The value recorded is ..." for one. */
export function mostOften(noun, list, max = 3) {
    return list.length === 1
        ? `The ${noun} recorded is ${countedValues(list, 1)}`
        : `The ${noun}s recorded most often are ${countedValues(list, max)}`;
}

/** "the UK Student visa", "an Irish study visa", "the Student visa (subclass 500)". */
export function visaPhrase(country) {
    if (country.slug === "uk") return "the UK Student visa";
    if (country.slug === "ireland") return "an Irish study visa";

    return `the Australian ${country.visaName}`;
}

// The total is the database's own count, so it is exact even when the
// rows read for the field counts were capped.
function courseCount(summary) {
    return plural(summary.total, "course", "courses");
}

// Field counts come from the rows read, which may be capped: then they
// are "at least" counts and never "all".
export function fieldCount(summary, count) {
    return `${summary.truncated ? "at least " : ""}${count}`;
}

/** The "In short" text, from the recorded values only. */
export function guideSummaryText(guide, summary) {
    const country = guideCountry(guide);
    const sentences = [];

    if (summary?.total) {
        sentences.push(
            `Medcity Overseas lists ${courseCount(summary)} for ${guide.subjectPhrase} in ${country.fullName}, at ${plural(summary.universities.length, "university", "universities")}.`
        );

        if (summary.intakes.length) {
            sentences.push(`The intakes recorded for them are ${joinWords(summary.intakes)}.`);
        }

        if (summary.ielts.length) {
            sentences.push(`${mostOften("IELTS requirement", summary.ielts, 2)}.`);
        }
    } else {
        sentences.push(`Medcity Overseas helps Indian students apply for ${guide.subjectPhrase} in ${country.fullName}.`);
    }

    sentences.push(`Once you hold an offer, you apply for ${visaPhrase(country)}.`);

    return sentences.join(" ");
}

/** 3 to 5 FAQs built from the summary; every name and value is a recorded one. */
export function guideFaqs(guide, summary) {
    const country = guideCountry(guide);
    const topic = `${guide.subject} in ${country.fullName}`;
    const names = summary.universities.slice(0, 5).map((item) => item.name);
    const more = summary.universities.length > names.length;
    const faqs = [
        {
            question: `Which universities offer ${topic}?`,
            answer: `Our course records list ${guide.subject} courses at ${plural(summary.universities.length, "university", "universities")} in ${country.fullName}${
                more ? ", including" : ":"
            } ${joinWords(names)}. The table on this page shows the courses, with each value as recorded.`,
        },
        {
            question: `What IELTS score do I need for ${topic}?`,
            answer: summary.ielts.length
                ? `${
                      summary.english.ielts === summary.total && !summary.truncated
                          ? `All ${courseCount(summary)} we list record`
                          : `Of the ${courseCount(summary)} we list, ${fieldCount(summary, summary.english.ielts)} ${summary.english.ielts === 1 ? "records" : "record"}`
                  } an IELTS requirement. ${mostOften("value", summary.ielts)}. Each university sets its own score, so check the course page for the exact requirement.`
                : "Our records do not hold an IELTS score for these courses. Each university sets its own English requirement, so check the course page or ask a counsellor.",
        },
    ];

    if (summary.intakes.length) {
        faqs.push({
            question: `When are the intakes for ${topic}?`,
            answer: `The courses we list record these intakes: ${joinWords(summary.intakes)}. Intakes can change each year, so check the course page and apply early.`,
        });
    }

    if (summary.durations.length) {
        faqs.push({
            question: `How long does ${guide.subjectPhrase} in ${country.fullName} take?`,
            answer: `${mostOften("duration", summary.durations)}. Each university sets the length of its course, and the course page shows it.`,
        });
    }

    faqs.push({
        question: `How do I apply for ${topic} from Kerala?`,
        answer: `Shortlist courses, check their entry and English requirements, and apply before the intake deadline. Once you hold an offer, you apply for ${visaPhrase(country)}. Medcity Overseas counsellors help with the applications and the visa file; universities decide admissions and the immigration authorities decide visas.`,
    });

    return faqs;
}
