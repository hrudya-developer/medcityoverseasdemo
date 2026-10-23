/*
 * Values from the course and university records that only stand in for
 * "nothing recorded": a dash, zeros, "N/A", "null", "none" or an empty
 * date. Pages leave these out instead of showing them as facts.
 */
const PLACEHOLDER = /^(?:-+|0+(?:\.0+)?|n\s*\/\s*a|na|null|none|undefined|0000-00-00(?:[ t]00:00:00)?)$/i;

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

const ALL_YEAR = /^(?:all\s*year(?:\s*round)?|year\s*round|rolling|any\s*time|throughout\s+the\s+year)$/i;

/** Whether an intake value means "any time of year". */
export function isAllYear(value) {
    return ALL_YEAR.test(recordedValue(value));
}

/** Intake values split into months and whether any of them means "all year". */
export function intakeParts(values) {
    const list = (Array.isArray(values) ? values : splitRecordList(values)).map(normaliseMonth).filter(Boolean);

    return {
        months: [...new Set(list.filter((value) => !isAllYear(value)))],
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
