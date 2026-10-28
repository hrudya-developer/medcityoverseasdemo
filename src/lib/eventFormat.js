/*
 * Display helpers for events, safe on the server and in the browser.
 * Every time is shown in India time (Asia/Kolkata), whatever the
 * visitor's own time zone, so the server and the browser agree.
 */

const TIME_ZONE = "Asia/Kolkata";
const IST_OFFSET_MINUTES = 330;

function partsOf(iso, options) {
    const date = new Date(iso);

    if (!iso || Number.isNaN(date.getTime())) {
        return null;
    }

    return Object.fromEntries(
        new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, ...options })
            .formatToParts(date)
            .map((part) => [part.type, part.value])
    );
}

/** "Thursday, 5 November 2026" */
export function eventDateLabel(iso) {
    const parts = partsOf(iso, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

    return parts ? `${parts.weekday}, ${parts.day} ${parts.month} ${parts.year}` : "";
}

/** "7:00 PM IST" */
export function eventTimeLabel(iso) {
    const parts = partsOf(iso, { hour: "numeric", minute: "2-digit", hour12: true });

    return parts ? `${parts.hour}:${parts.minute} ${String(parts.dayPeriod).toUpperCase()} IST` : "";
}

/** "Thursday, 5 November 2026, 7:00 PM IST" */
export function eventDateTimeLabel(iso) {
    const date = eventDateLabel(iso);

    return date ? `${date}, ${eventTimeLabel(iso)}` : "";
}

/** "5 Nov 2026" for compact cards. */
export function eventShortDateLabel(iso) {
    const parts = partsOf(iso, { day: "numeric", month: "short", year: "numeric" });

    return parts ? `${parts.day} ${parts.month} ${parts.year}` : "";
}

/** "60 minutes", "1 hour 30 minutes", "2 hours" */
export function eventDurationLabel(minutes) {
    const total = Math.max(0, Math.round(Number(minutes) || 0));

    if (total < 90 && total % 60 !== 0) {
        return `${total} minutes`;
    }

    const hours = Math.floor(total / 60);
    const rest = total % 60;
    const hourText = `${hours} ${hours === 1 ? "hour" : "hours"}`;

    return rest ? `${hourText} ${rest} minutes` : hourText;
}

/** An instant as an ISO string in India time: "2026-11-05T20:00:00+05:30". */
export function indiaIsoFromMs(ms) {
    if (!Number.isFinite(ms)) {
        return "";
    }

    return `${new Date(ms + IST_OFFSET_MINUTES * 60000).toISOString().slice(0, 19)}+05:30`;
}

/** The event's end as an India time ISO string. */
export function eventEndIso(event) {
    const start = Date.parse(event?.startsAtIso ?? "");

    return Number.isFinite(start) ? indiaIsoFromMs(start + (Number(event.durationMinutes) || 60) * 60000) : "";
}

/** "+91 90729 82555" as a tel: link target, "+919072982555". */
export function telHref(phone) {
    const digits = String(phone ?? "").replace(/[^\d+]/g, "");

    return `tel:${digits}`;
}
