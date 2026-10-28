import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";

import { query, queryOne } from "@/lib/db";
import { now } from "@/lib/legacy/util";
import { isPlausiblePhone } from "@/lib/phone";

/*
 * Events and webinars (tables web_events and web_event_registrations,
 * db/013_events.sql).
 *
 * Times are stored as India time (the pool uses +05:30), e.g.
 * "2026-11-05 19:00:00". Until db/013 is run the tables do not exist:
 * every read then returns nothing, so the site works without them.
 *
 * Shape returned to pages and components (all plain values):
 *   { id, slug, url, title, subtitle, summary, description, startsAt,
 *     startsAtIso, endsAtIso, durationMinutes, mode, venue, poster,
 *     posterAlt, contactPhone, popupEnabled, registrationOpen, isPast }
 */

export const EVENT_TIME_ZONE = "Asia/Kolkata";

const SITE_URL = "https://medcityoverseas.com";

function missingTable(error) {
    return error?.code === "ER_NO_SUCH_TABLE";
}

/** "2026-11-05 19:00:00" (India time) as an ISO string with the +05:30 offset. */
function indiaIso(value) {
    const text = String(value ?? "").trim();

    if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(text)) {
        return null;
    }

    return `${text.slice(0, 10)}T${text.slice(11, 19).padEnd(8, ":00")}+05:30`;
}

export function toEvent(row) {
    if (!row) {
        return null;
    }

    const startsAtIso = indiaIso(row.starts_at);
    const durationMinutes = Number(row.duration_minutes) || 60;
    const endsMs = startsAtIso ? Date.parse(startsAtIso) + durationMinutes * 60000 : null;

    return {
        id: Number(row.id),
        slug: row.slug,
        url: `/events/${row.slug}`,
        title: row.title,
        subtitle: row.subtitle || "",
        summary: row.summary || "",
        description: row.description || "",
        startsAt: row.starts_at,
        startsAtIso,
        endsAtIso: endsMs ? new Date(endsMs).toISOString() : null,
        durationMinutes,
        mode: row.mode === "offline" ? "offline" : "online",
        venue: row.venue || "",
        poster: row.poster || "",
        posterAlt: row.poster_alt || row.title,
        contactPhone: row.contact_phone || "+91 90729 82555",
        popupEnabled: Number(row.popup_enabled) === 1,
        registrationOpen: Number(row.registration_open) === 1,
        isPast: endsMs ? endsMs < Date.now() : false,
    };
}

export function absoluteEventUrl(event) {
    return `${SITE_URL}${event.url}`;
}

/** Published events, upcoming first then past (newest first). */
export const getPublishedEvents = cache(async () => {
    try {
        const rows = await query("SELECT * FROM web_events WHERE status = 1 ORDER BY starts_at DESC LIMIT 100");
        const events = rows.map(toEvent);

        return [...events.filter((event) => !event.isPast).reverse(), ...events.filter((event) => event.isPast)];
    } catch (error) {
        if (missingTable(error)) {
            return [];
        }

        throw error;
    }
});

export const getEventBySlug = cache(async (slug) => {
    const clean = String(slug ?? "").trim().toLowerCase();

    if (!/^[a-z0-9-]{1,191}$/.test(clean)) {
        return null;
    }

    try {
        return toEvent(await queryOne("SELECT * FROM web_events WHERE slug = ? AND status = 1", [clean]));
    } catch (error) {
        if (missingTable(error)) {
            return null;
        }

        throw error;
    }
});

/*
 * The event the site-wide registration popup promotes: the next published
 * event with the popup on and registration open that has not ended yet.
 * Read on every public page, so it is cached for a minute, and a failure
 * just means no popup.
 */
const cachedPopupRow = unstable_cache(
    async () => {
        const row = await queryOne(
            `SELECT * FROM web_events
             WHERE status = 1 AND popup_enabled = 1 AND registration_open = 1
               AND DATE_ADD(starts_at, INTERVAL duration_minutes MINUTE) > ?
             ORDER BY starts_at ASC LIMIT 1`,
            [now()]
        );

        return row ?? null;
    },
    ["popup-event"],
    { revalidate: 60, tags: ["events"] }
);

export async function getPopupEvent() {
    try {
        const event = toEvent(await cachedPopupRow());

        return event && !event.isPast ? event : null;
    } catch (error) {
        if (!missingTable(error)) {
            console.error("Popup event could not be loaded:", error);
        }

        return null;
    }
}

/* =========================================================
   REGISTRATION
========================================================= */

export class EventRegistrationError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.status = status;
    }
}

function cleanText(value, max) {
    return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

/**
 * One stored form per phone number, so "+91 98765 43210", "9876543210"
 * and "09876543210" count as the same person: Indian numbers become
 * "+91" plus 10 digits, numbers with a country code become "+" plus
 * digits.
 */
export function normalisePhone(value) {
    const text = String(value ?? "").trim();
    let digits = text.replace(/\D/g, "");

    if (/^00/.test(digits)) {
        digits = digits.slice(2);
    } else if (/^0[6-9]\d{9}$/.test(digits)) {
        digits = digits.slice(1);
    }

    if (/^[6-9]\d{9}$/.test(digits) && !text.startsWith("+")) {
        return `+91${digits}`;
    }

    return digits ? `+${digits}` : "";
}

/**
 * Save a registration. Returns { event, alreadyRegistered }.
 * The same phone number registering twice for one event is not an
 * error: the existing registration is kept and the details refreshed.
 */
export async function registerForEvent(input, ip = "") {
    const event = await getEventBySlug(input?.event);

    if (!event) {
        throw new EventRegistrationError("This event could not be found.", 404);
    }

    if (!event.registrationOpen || event.isPast) {
        throw new EventRegistrationError("Registration for this event is closed.", 409);
    }

    const name = cleanText(input?.name, 191);
    const phone = cleanText(input?.phone, 32);
    const email = cleanText(input?.email, 191);
    const qualification = cleanText(input?.qualification, 100);
    const city = cleanText(input?.city, 100);
    const source = input?.source === "popup" ? "popup" : "page";

    if (name.length < 2) {
        throw new EventRegistrationError("Please enter your name.");
    }

    if (!isPlausiblePhone(phone)) {
        throw new EventRegistrationError("Please enter a valid mobile number.");
    }

    const storedPhone = normalisePhone(phone).slice(0, 32);

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new EventRegistrationError("Please enter a valid email address, or leave it empty.");
    }

    const result = await query(
        `INSERT INTO web_event_registrations
            (event_id, name, phone, email, qualification, city, source, ip, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name = VALUES(name), email = VALUES(email),
            qualification = VALUES(qualification), city = VALUES(city)`,
        [event.id, name, storedPhone, email || null, qualification || null, city || null, source, String(ip).slice(0, 64), now()]
    );

    // MySQL reports 1 affected row for a new insert and 2 (or 0) for an update.
    return { event, alreadyRegistered: Number(result?.affectedRows) !== 1 };
}
