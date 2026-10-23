/*
 * Values from the course and university records that only stand in for
 * "nothing recorded": dashes, zeros, "N/A", "NA", "nil", "TBA", "null",
 * "none", "not available", "not applicable" or an empty date. Pages
 * leave these out instead of showing them as facts.
 */
const PLACEHOLDER =
    /^(?:[-\u2013\u2014]+|0+(?:\.0+)?|n\s*\/\s*a|n\.?\s?a\.?|nil|tba|null|none|undefined|not\s+(?:available|applicable)|0000-00-00(?:[ t]00:00:00)?)$/i;

export function isPlaceholder(value) {
    const text = String(value ?? "").replace(/\s+/g, " ").trim();

    return !text || PLACEHOLDER.test(text);
}

/** The value as clean text, or "" when it is a placeholder. */
export function recordedValue(value) {
    const text = String(value ?? "").replace(/\s+/g, " ").trim();

    return isPlaceholder(text) ? "" : text;
}

const MONTHS = [
    ["Jan", /^jan(?:uary)?\.?$/i],
    ["Feb", /^feb(?:ruary)?\.?$/i],
    ["Mar", /^mar(?:ch)?\.?$/i],
    ["Apr", /^apr(?:il)?\.?$/i],
    ["May", /^may\.?$/i],
    ["Jun", /^june?\.?$/i],
    ["Jul", /^july?\.?$/i],
    ["Aug", /^aug(?:ust)?\.?$/i],
    ["Sep", /^sep(?:t|tember)?\.?$/i],
    ["Oct", /^oct(?:ober)?\.?$/i],
    ["Nov", /^nov(?:ember)?\.?$/i],
    ["Dec", /^dec(?:ember)?\.?$/i],
];

/** "September 2027", "Sept" and "sep" all become "Sep 2027" / "Sep"; other text is kept. */
export function normaliseMonth(value) {
    const text = recordedValue(value);
    const [first, ...rest] = text.split(" ");
    const month = MONTHS.find(([, pattern]) => pattern.test(first ?? ""));

    return month ? [month[0], ...rest].join(" ") : text;
}

/** Position of a month for sorting (99 for anything else). */
export function monthOrder(value) {
    const index = MONTHS.findIndex(([name]) => normaliseMonth(value).startsWith(name));

    return index === -1 ? 99 : index;
}

/**
 * A list field such as "Jan, May / Sep and N/A" as separate values.
 * Placeholders are dropped before splitting, so "N/A" is never split
 * into "N" and "A".
 */
export function splitRecordList(value) {
    const text = recordedValue(value);

    if (!text) {
        return [];
    }

    return text
        .replace(/(^|[\s,;&/(])n\s*\/\s*a(?=$|[\s,;&/)])/gi, "$1")
        .split(/[,/;&]|\band\b/i)
        .map(recordedValue)
        .filter(Boolean);
}

const ALL_YEAR = /^(?:all\s*year(?:\s*round)?|year\s*round|rolling(?:\s+intakes?)?|any\s*time|throughout\s+the\s+year)$/i;

/** Whether an intake value means "any time of year". */
export function isAllYear(value) {
    return ALL_YEAR.test(recordedValue(value));
}

/**
 * Intakes as a clean list: placeholders dropped, month names normalised,
 * one entry per month ("Sep" wins over "Sep 2027"), months in calendar
 * order, then any other values, then "all year" values.
 */
export function intakeList(values) {
    const list = (Array.isArray(values) ? values.flatMap(splitRecordList) : splitRecordList(values)).map(normaliseMonth).filter(Boolean);
    const byMonth = new Map();
    const others = [];

    for (const value of list) {
        const order = monthOrder(value);

        if (order === 99 || isAllYear(value)) {
            if (!others.some((item) => item.toLowerCase() === value.toLowerCase())) {
                others.push(value);
            }
        } else if (!byMonth.has(order) || value.length < byMonth.get(order).length) {
            byMonth.set(order, value);
        }
    }

    const months = [...byMonth.entries()].sort((a, b) => a[0] - b[0]).map(([, value]) => value);

    return [...months, ...others.filter((value) => !isAllYear(value)), ...others.filter(isAllYear)];
}

/** Intake values split into months (and other dates) and whether any of them means "all year". */
export function intakeParts(values) {
    const list = intakeList(values);

    return {
        months: list.filter((value) => !isAllYear(value)),
        allYear: list.some(isAllYear),
    };
}

/**
 * "Intakes are in Jan and Sep.", "Intakes run all year round." or
 * "Intakes are in Jan and Sep, and all year round." ("" when none).
 * joinList joins the months ("Jan, May and Sep").
 */
export function intakeSentence(values, joinList) {
    const { months, allYear } = intakeParts(values);

    if (!months.length) {
        return allYear ? "Intakes run all year round." : "";
    }

    return `Intakes are in ${joinList(months)}${allYear ? ", and all year round" : ""}.`;
}
