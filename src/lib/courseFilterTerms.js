/*
 * The course finder's level and intake options, mapped to the values
 * stored in tb_courses. The panel offers "Undergraduate" and "January",
 * while the database holds values such as "Bachelors" and "Jan, Sep".
 * Shared by the SQL filter (getCoursesByFilters) and the route's JS
 * follow-up filter, so both keep the same rows. Pure functions only.
 */

// Each option and the lower case substrings of a stored level that mean
// the same. Only these options are accepted, so a crafted URL cannot add
// unbounded LIKE clauses or cache keys.
const LEVEL_TERMS = {
    Undergraduate: ["bachelor", "undergraduate"],
    Postgraduate: ["master", "postgraduate", "post graduate"],
    Masters: ["master"],
    PhD: ["phd", "ph.d", "doctorate"],
    Diploma: ["diploma"],
    Certificate: ["certificate"],
};

export const FILTER_LEVELS = Object.keys(LEVEL_TERMS);

/**
 * The known level options in a comma separated list, in canonical
 * spelling, without duplicates and sorted. Unknown values are dropped.
 */
export function normaliseLevels(value) {
    return String(value ?? "")
        .split(",")
        .map((level) =>
            FILTER_LEVELS.find((known) => known.toLowerCase() === level.trim().toLowerCase())
        )
        .filter((level, index, list) => level && list.indexOf(level) === index)
        .sort();
}

/** The stored level substrings that any of these options match. */
export function levelTerms(levels) {
    const terms = levels.flatMap((level) => LEVEL_TERMS[level] ?? []);

    return terms.filter((term, index) => terms.indexOf(term) === index);
}

/** Whether a stored level matches any of these options. */
export function levelMatches(storedLevel, levels) {
    const level = String(storedLevel ?? "").toLowerCase();

    return levelTerms(levels).some((term) => level.includes(term));
}

const MONTH_NAMES = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
];

/**
 * An intake as the 3 letter month prefix the database stores ("January"
 * and "Jan" give "jan"; "September" and "Sept" give "sep", which also
 * matches a stored "Sept"). A value that is not a month is returned
 * trimmed and lower case, and isMonthIntake reports false for it.
 */
export function normaliseIntake(value) {
    const intake = String(value ?? "").trim().toLowerCase();
    const month = intake.length >= 3 && MONTH_NAMES.find((name) => name.startsWith(intake));

    return month ? month.slice(0, 3) : intake;
}

/** Whether a normalised intake is one of the 12 month prefixes. */
export function isMonthIntake(intake) {
    return MONTH_NAMES.some((name) => name.slice(0, 3) === intake);
}

/** Whether a stored intakes value includes this intake (any form). */
export function intakeMatches(storedIntakes, intake) {
    const term = normaliseIntake(intake);

    return !term || String(storedIntakes ?? "").toLowerCase().includes(term);
}
