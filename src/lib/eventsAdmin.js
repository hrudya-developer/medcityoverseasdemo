import "server-only";

import { sanitizeBlogHtml } from "@/lib/blogHtml";
import { query, queryOne } from "@/lib/db";
import { now } from "@/lib/legacy/util";
import { isPlausiblePhone } from "@/lib/phone";

/*
 * Events admin: reads and writes web_events and web_event_registrations
 * (db/013_events.sql). The public side lives in src/lib/events.js.
 *
 * Until db/013 is run the tables do not exist. Every function here then
 * throws the database error; pages check it with eventsTablesMissing()
 * and show what to do instead of an error page.
 */

export class EventAdminError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.status = status;
    }
}

export function eventsTablesMissing(error) {
    return error?.code === "ER_NO_SUCH_TABLE";
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11-05 19:00:00" as "5 Nov 2026, 7:00 PM". */
export function formatEventTime(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/.exec(String(value ?? ""));

    if (!match) {
        return String(value ?? "");
    }

    const [, year, month, day, hour, minute] = match;
    const hours = Number(hour);
    const clock = `${hours % 12 || 12}:${minute} ${hours < 12 ? "AM" : "PM"}`;

    return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}, ${clock}`;
}

function toId(value) {
    const text = String(value ?? "");

    return /^\d{1,10}$/.test(text) ? Number(text) : null;
}

function hasEnded(row) {
    const start = Date.parse(`${String(row.starts_at).slice(0, 10)}T${String(row.starts_at).slice(11, 19)}+05:30`);

    return Number.isNaN(start) ? false : start + (Number(row.duration_minutes) || 0) * 60000 < Date.now();
}

/* =========================================================
   READ
========================================================= */

export async function listEventsAdmin() {
    const rows = await query(
        `SELECT e.id, e.slug, e.title, e.starts_at, e.duration_minutes, e.status, e.popup_enabled,
                e.registration_open, COUNT(r.id) AS registrations
         FROM web_events e
         LEFT JOIN web_event_registrations r ON r.event_id = e.id
         GROUP BY e.id
         ORDER BY e.starts_at DESC, e.id DESC`
    );

    return rows.map((row) => ({
        id: Number(row.id),
        slug: row.slug,
        title: row.title,
        startsAt: row.starts_at,
        when: formatEventTime(row.starts_at),
        published: Number(row.status) === 1,
        popupEnabled: Number(row.popup_enabled) === 1,
        registrationOpen: Number(row.registration_open) === 1,
        ended: hasEnded(row),
        registrations: Number(row.registrations) || 0,
    }));
}

/** One event in the shape the admin form uses, or null. */
export async function getEventAdmin(id) {
    const eventId = toId(id);

    if (!eventId) {
        return null;
    }

    const row = await queryOne("SELECT * FROM web_events WHERE id = ?", [eventId]);

    if (!row) {
        return null;
    }

    return {
        id: Number(row.id),
        title: row.title || "",
        slug: row.slug || "",
        subtitle: row.subtitle || "",
        summary: row.summary || "",
        description: row.description || "",
        // datetime-local wants "YYYY-MM-DDTHH:MM".
        startsAt: String(row.starts_at ?? "").slice(0, 16).replace(" ", "T"),
        durationMinutes: Number(row.duration_minutes) || 60,
        mode: row.mode === "offline" ? "offline" : "online",
        venue: row.venue || "",
        poster: row.poster || "",
        posterAlt: row.poster_alt || "",
        contactPhone: row.contact_phone || "",
        popupEnabled: Number(row.popup_enabled) === 1,
        registrationOpen: Number(row.registration_open) === 1,
        published: Number(row.status) === 1,
        updatedAt: row.updated_at || "",
    };
}

/* =========================================================
   SAVE AND DELETE
========================================================= */

function cleanText(value, max) {
    return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function cleanMultiline(value, max) {
    return String(value ?? "")
        .replace(/\r\n?/g, "\n")
        .replace(/[ \t]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim()
        .slice(0, max);
}

function slugify(value) {
    return String(value ?? "")
        .toLowerCase()
        .trim()
        .replace(/&/g, " and ")
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 191)
        .replace(/-+$/, "");
}

/** "2026-11-05T19:00" (datetime-local, India time) as "2026-11-05 19:00:00". */
function cleanStart(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::\d{2})?$/.exec(String(value ?? "").trim());

    if (!match) {
        throw new EventAdminError("Please choose the start date and time.");
    }

    const [, year, month, day, hour, minute] = match;
    const check = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute)));

    if (
        check.getUTCFullYear() !== Number(year) ||
        check.getUTCMonth() !== Number(month) - 1 ||
        check.getUTCDate() !== Number(day) ||
        Number(hour) > 23 ||
        Number(minute) > 59 ||
        Number(year) < 2000 ||
        Number(year) > 2100
    ) {
        throw new EventAdminError("The start date and time is not a real date.");
    }

    return `${year}-${month}-${day} ${hour}:${minute}:00`;
}

function cleanPoster(value) {
    const text = String(value ?? "").trim();

    if (!text) {
        return "";
    }

    // Uploaded through the admin (/media/12), a file on this site
    // (/events/poster.webp) or a full https address.
    const sitePath = /^\/(?!\/)[^\s"'<>\\]*$/.test(text) && !text.includes("..");
    const httpsUrl = /^https:\/\/[^\s"'<>\\]+$/i.test(text);

    if (text.length > 500 || (!sitePath && !httpsUrl)) {
        throw new EventAdminError(
            "The poster must be an uploaded image, a path on this site starting with /, or an https:// address."
        );
    }

    return text;
}

function flag(value) {
    return value === true || value === 1 || value === "1" || value === "true" || value === "on" ? 1 : 0;
}

function validate(input) {
    const title = cleanText(input?.title, 255);

    if (title.length < 3) {
        throw new EventAdminError("Please enter a title of at least 3 characters.");
    }

    const slug = slugify(cleanText(input?.slug, 191) || title);

    if (!slug) {
        throw new EventAdminError("Please enter a web address using letters, numbers and hyphens.");
    }

    const durationMinutes = Number.parseInt(input?.durationMinutes, 10);

    if (!Number.isInteger(durationMinutes) || durationMinutes < 5 || durationMinutes > 1440) {
        throw new EventAdminError("The duration must be between 5 and 1440 minutes.");
    }

    const mode = input?.mode === "offline" ? "offline" : "online";
    const venue = cleanText(input?.venue, 255);

    if (mode === "offline" && !venue) {
        throw new EventAdminError("Please enter the venue for an offline event.");
    }

    const poster = cleanPoster(input?.poster);
    const posterAlt = cleanText(input?.posterAlt, 255);

    if (poster && !posterAlt) {
        throw new EventAdminError("Please describe the poster (what it shows), for people who cannot see it.");
    }

    const contactPhone = cleanText(input?.contactPhone, 32);

    if (contactPhone && !isPlausiblePhone(contactPhone)) {
        throw new EventAdminError("The contact phone number does not look right.");
    }

    return {
        title,
        slug,
        subtitle: cleanText(input?.subtitle, 255),
        summary: cleanMultiline(input?.summary, 2000),
        description: sanitizeBlogHtml(String(input?.description ?? "").slice(0, 500000)).trim(),
        startsAt: cleanStart(input?.startsAt),
        durationMinutes,
        mode,
        venue,
        poster,
        posterAlt: poster ? posterAlt : "",
        contactPhone,
        popupEnabled: flag(input?.popupEnabled),
        registrationOpen: flag(input?.registrationOpen),
        published: flag(input?.published),
    };
}

/**
 * Create (no input.id) or update an event. Returns { id, slug, oldSlug }.
 * adminEmail is only used in the server log: web_events has no column
 * for who saved it.
 */
export async function saveEvent(input, adminEmail = "") {
    const id = input?.id === undefined || input?.id === null || input?.id === "" ? null : toId(input.id);

    if (input?.id && !id) {
        throw new EventAdminError("This event could not be found.", 404);
    }

    const existing = id ? await queryOne("SELECT id, slug FROM web_events WHERE id = ?", [id]) : null;

    if (id && !existing) {
        throw new EventAdminError("This event could not be found. It may have been deleted.", 404);
    }

    const values = validate(input);
    const taken = await queryOne("SELECT id FROM web_events WHERE slug = ? AND id <> ? LIMIT 1", [values.slug, id ?? 0]);

    if (taken) {
        throw new EventAdminError(`Another event already uses the web address "${values.slug}". Please choose another.`, 409);
    }

    const columns = [
        values.slug,
        values.title,
        values.subtitle || null,
        values.summary || null,
        values.description || null,
        values.startsAt,
        values.durationMinutes,
        values.mode,
        values.venue || null,
        values.poster || null,
        values.posterAlt || null,
        values.contactPhone || null,
        values.popupEnabled,
        values.registrationOpen,
        values.published,
    ];

    const stamp = now();
    let savedId = id;

    try {
        if (id) {
            await query(
                `UPDATE web_events SET slug = ?, title = ?, subtitle = ?, summary = ?, description = ?,
                    starts_at = ?, duration_minutes = ?, mode = ?, venue = ?, poster = ?, poster_alt = ?,
                    contact_phone = ?, popup_enabled = ?, registration_open = ?, status = ?, updated_at = ?
                 WHERE id = ?`,
                [...columns, stamp, id]
            );
        } else {
            const result = await query(
                `INSERT INTO web_events (slug, title, subtitle, summary, description, starts_at,
                    duration_minutes, mode, venue, poster, poster_alt, contact_phone, popup_enabled,
                    registration_open, status, created_at, updated_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [...columns, stamp, stamp]
            );

            savedId = Number(result.insertId);
        }
    } catch (error) {
        if (error?.code === "ER_DUP_ENTRY") {
            throw new EventAdminError(`Another event already uses the web address "${values.slug}". Please choose another.`, 409);
        }

        throw error;
    }

    console.info(`Event ${savedId} (${values.slug}) saved by ${adminEmail || "an admin"}.`);

    return { id: savedId, slug: values.slug, oldSlug: existing?.slug ?? null };
}

/** Delete an event and its registrations. Returns { slug }. */
export async function deleteEvent(id) {
    const eventId = toId(id);
    const existing = eventId ? await queryOne("SELECT id, slug FROM web_events WHERE id = ?", [eventId]) : null;

    if (!existing) {
        throw new EventAdminError("This event could not be found. It may have been deleted already.", 404);
    }

    await query("DELETE FROM web_event_registrations WHERE event_id = ?", [eventId]);
    await query("DELETE FROM web_events WHERE id = ?", [eventId]);

    return { slug: existing.slug };
}

/* =========================================================
   REGISTRATIONS
========================================================= */

export async function listRegistrations(eventId) {
    const id = toId(eventId);

    if (!id) {
        return [];
    }

    const rows = await query(
        `SELECT id, name, phone, email, qualification, city, source, created_at
         FROM web_event_registrations
         WHERE event_id = ?
         ORDER BY created_at DESC, id DESC`,
        [id]
    );

    return rows.map((row) => ({
        id: Number(row.id),
        name: row.name || "",
        phone: row.phone || "",
        email: row.email || "",
        qualification: row.qualification || "",
        city: row.city || "",
        source: row.source || "",
        createdAt: row.created_at || "",
        when: formatEventTime(row.created_at),
    }));
}

/*
 * One CSV cell. A cell starting with = + - @ (or a tab or carriage
 * return) could run as a formula in Excel or Google Sheets, so it gets a
 * leading single quote. Phone numbers like "+91 ..." get one too, which
 * also keeps the spreadsheet from treating them as numbers.
 */
export function csvCell(value) {
    let text = String(value ?? "");

    if (/^[=+\-@\t\r]/.test(text)) {
        text = `'${text}`;
    }

    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** { filename, csv } for an event's registrations, or null when there is no such event. */
export async function registrationsCsv(eventId) {
    const id = toId(eventId);
    const event = id ? await queryOne("SELECT id, slug FROM web_events WHERE id = ?", [id]) : null;

    if (!event) {
        return null;
    }

    const rows = await listRegistrations(id);
    const header = ["Name", "Phone", "Email", "Qualification", "City", "Source", "Registered (India time)"];
    const lines = [header, ...rows.map((row) => [row.name, row.phone, row.email, row.qualification, row.city, row.source, row.createdAt])];

    return {
        filename: `${event.slug}-registrations.csv`,
        // The byte order mark makes Excel read the file as UTF-8.
        csv: `﻿${lines.map((line) => line.map(csvCell).join(",")).join("\r\n")}\r\n`,
    };
}
