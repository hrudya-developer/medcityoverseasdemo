import "server-only";

/*
 * Small helpers shared by the ported Laravel endpoints.
 */

// Uploaded images still live on the old server until they are moved.
// Changing LEGACY_PUBLIC_PATH moves every image URL at once.
const PUBLIC_PATH = (
    process.env.LEGACY_PUBLIC_PATH ||
    "https://overseas.technocitysolutions.com/public"
).replace(/\/+$/, "");

export function imagePath(relative) {
    return `${PUBLIC_PATH}/images/${relative}`;
}

/** Normalise an id coming from a form field or query string. */
export function toId(value) {
    return String(value ?? "").trim();
}

/** Non-negative integer offset, as the old API accepted. */
export function legacyOffset(value) {
    const number = Number.parseInt(value, 10);

    return Number.isFinite(number) && number > 0 ? number : 0;
}

/** Escape LIKE wildcards in user input, then wrap it. */
export function likePattern(value, mode = "contains") {
    const escaped = String(value ?? "").replace(/[\\%_]/g, (match) => `\\${match}`);

    if (mode === "prefix") {
        return `${escaped}%`;
    }

    return `%${escaped}%`;
}

/** Current date and time in India, formatted like Laravel's date(). */
function indiaParts(date = new Date()) {
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
    }).formatToParts(date);

    return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

/** "2026-10-23" in India time. */
export function today() {
    const p = indiaParts();

    return `${p.year}-${p.month}-${p.day}`;
}

/** "2026-10-23 16:12:00" in India time. */
export function now() {
    const p = indiaParts();

    return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`;
}

/** The status values the old API used for "success". */
export function isTruthyStatus(value) {
    return value === true || value === 1 || value === "1" || value === "true";
}
