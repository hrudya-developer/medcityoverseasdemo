/*
 * What the browser remembers about the event popup. Storage can be
 * blocked (private windows, strict settings), so every access is
 * wrapped and a failure simply means "nothing remembered".
 */

const SESSION_SHOWN_KEY = "mo-event-popup-shown";
const DISMISS_PREFIX = "mo-event-popup-dismissed:";
const REGISTERED_PREFIX = "mo-event-registered:";

export const DISMISS_FOR_MS = 3 * 24 * 60 * 60 * 1000;

function read(storage, key) {
    try {
        return window[storage].getItem(key);
    } catch {
        return null;
    }
}

function write(storage, key, value) {
    try {
        window[storage].setItem(key, value);
    } catch {
        // Not remembered; the popup may show again.
    }
}

export function popupShownThisSession() {
    return read("sessionStorage", SESSION_SHOWN_KEY) === "1";
}

export function markPopupShown() {
    write("sessionStorage", SESSION_SHOWN_KEY, "1");
}

export function popupDismissedRecently(slug) {
    const at = Number(read("localStorage", `${DISMISS_PREFIX}${slug}`));

    return Number.isFinite(at) && at > 0 && Date.now() - at < DISMISS_FOR_MS;
}

export function markPopupDismissed(slug) {
    write("localStorage", `${DISMISS_PREFIX}${slug}`, String(Date.now()));
}

export function isRegisteredFor(slug) {
    return read("localStorage", `${REGISTERED_PREFIX}${slug}`) === "1";
}

export function markRegisteredFor(slug) {
    write("localStorage", `${REGISTERED_PREFIX}${slug}`, "1");
}
