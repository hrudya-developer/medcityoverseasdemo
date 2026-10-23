/*
 * The course finder's level and intake options, mapped to the values
 * stored in tb_courses. The panel offers "Undergraduate" and "January",
 * while the database holds values such as "Bachelors" and "Jan, Sep".
 * Shared by the SQL filter (getCoursesByFilters) and the route's JS
 * follow-up filter, so both keep the same rows. Pure functions only.
 */

// Each option and how a stored level (compared in lower case) means the
// same: it contains one of `terms`, or equals one of `exact` once
// trimmed, and contains none of `exclude`. A pre-master's course is a
// preparation course, not a master's degree. Only these options are
// accepted, so a crafted URL cannot add unbounded clauses or cache keys.
const PRE_MASTERS = ["pre-master", "pre master", "premaster"];

const LEVEL_RULES = {
    Undergraduate: { terms: ["undergrad", "bachelor"], exact: ["ug"], exclude: [] },
    Postgraduate: { terms: ["postgrad", "post graduate", "master"], exact: ["pg", "pgt"], exclude: PRE_MASTERS },
    Masters: { terms: ["master"], exact: [], exclude: PRE_MASTERS },
    PhD: { terms: ["phd", "ph.d", "doctorate"], exact: [], exclude: [] },
    Diploma: { terms: ["diploma"], exact: [], exclude: [] },
    Certificate: { terms: ["certificate"], exact: [], exclude: [] },
};

export const FILTER_LEVELS = Object.keys(LEVEL_RULES);

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

function rulesFor(levels) {
    return levels.map((level) => LEVEL_RULES[level]).filter(Boolean);
}

// MySQL's TRIM() removes spaces only, so the JS side does the same.
function trimSpaces(value) {
    return value.replace(/^ +| +$/g, "");
}

function containsPattern(term) {
    return `%${term.replace(/[\\%_]/g, (match) => `\\${match}`)}%`;
}

/** Whether a stored level matches any of these options (as levelSql). */
export function levelMatches(storedLevel, levels) {
    const level = String(storedLevel ?? "").toLowerCase();

    return rulesFor(levels).some(
        (rule) =>
            (rule.terms.some((term) => level.includes(term)) || rule.exact.includes(trimSpaces(level))) &&
            !rule.exclude.some((term) => level.includes(term))
    );
}

/**
 * The SQL condition on `column` for these options, the same test as
 * levelMatches: { clause, params }, or null when no option is known.
 * LIKE is case insensitive under the table's collation; the exact
 * values are compared with LOWER(TRIM()).
 */
export function levelSql(levels, column = "c.level") {
    const rules = rulesFor(levels);

    if (rules.length === 0) {
        return null;
    }

    const params = [];
    const options = rules.map((rule) => {
        const matches = rule.terms.map(() => `${column} LIKE ?`);

        params.push(...rule.terms.map(containsPattern));

        if (rule.exact.length > 0) {
            matches.push(`LOWER(TRIM(${column})) IN (${rule.exact.map(() => "?").join(", ")})`);
            params.push(...rule.exact);
        }

        const excludes = rule.exclude.map(() => `${column} NOT LIKE ?`);

        params.push(...rule.exclude.map(containsPattern));

        return `((${matches.join(" OR ")})${excludes.map((part) => ` AND ${part}`).join("")})`;
    });

    return { clause: `(${options.join(" OR ")})`, params };
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
