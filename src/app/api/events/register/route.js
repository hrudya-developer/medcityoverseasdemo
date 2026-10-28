import { after, NextResponse } from "next/server";

import { checkSameOrigin, clientIp } from "@/lib/auth/adminApi";
import { EVENT_TIME_ZONE, EventRegistrationError, registerForEvent } from "@/lib/events";
import { postOverseasForm } from "@/lib/overseasApi";

export const runtime = "nodejs";

/*
 * Event registration from the event page and the site-wide popup.
 *
 * Body (JSON): { event: <slug>, name, phone, email, qualification, city,
 * source: "page" | "popup", website: "" }. "website" is a hidden field
 * people never see: when a bot fills it in, the answer is a success and
 * nothing is saved.
 *
 * Answer: { success, message, alreadyRegistered? }. A 400, 404 or 409
 * carries a message the form can show as it is.
 */

const MAX_BODY_BYTES = 8 * 1024;

const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function reply(success, message, status = 200, extra = {}) {
    return NextResponse.json({ success, message, ...extra }, { status });
}

/* Per-IP request count, kept in memory for this server process only. */
function rateLimited(ip) {
    // Without a client address (no proxy header) every visitor would
    // share one count, so nobody is limited rather than everybody.
    if (!ip) {
        return false;
    }

    const store = (globalThis.__medcityEventRateLimit ??= new Map());
    const current = Date.now();
    const key = ip;
    const recent = (store.get(key) ?? []).filter((time) => current - time < RATE_WINDOW_MS);

    if (recent.length >= RATE_LIMIT) {
        store.set(key, recent);
        return true;
    }

    recent.push(current);
    store.set(key, recent);

    // Drop addresses that have gone quiet, so the map does not grow forever.
    if (store.size > 5000) {
        for (const [address, times] of store) {
            if (!times.some((time) => current - time < RATE_WINDOW_MS)) {
                store.delete(address);
            }
        }
    }

    return false;
}

async function readJson(request) {
    const declared = Number(request.headers.get("content-length") ?? 0);

    if (declared > MAX_BODY_BYTES) {
        return { tooLarge: true };
    }

    const text = await request.text();

    if (Buffer.byteLength(text, "utf8") > MAX_BODY_BYTES) {
        return { tooLarge: true };
    }

    try {
        const body = JSON.parse(text);

        return { body: body && typeof body === "object" && !Array.isArray(body) ? body : null };
    } catch {
        return { body: null };
    }
}

/** "5 Nov 2026, 7:00 PM IST" */
function eventDateText(event) {
    if (!event?.startsAtIso) {
        return String(event?.startsAt ?? "");
    }

    const text = new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: EVENT_TIME_ZONE,
    }).format(new Date(event.startsAtIso));

    return `${text.replace(/\s?(am|pm)$/i, (match) => match.toUpperCase())} IST`;
}

/* The same tidying registerForEvent applies before it saves. */
function clean(value, max) {
    return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function splitName(name) {
    const parts = clean(name, 191).split(" ").filter(Boolean);

    return { firstname: parts[0] ?? "", lastname: parts.slice(1).join(" ") };
}

/*
 * Copy the lead into the website enquiries (tb_enquiry) through the same
 * postEnquiries call as /api/counselling, with the same field names, so
 * counsellors see it with the other enquiries. The event note goes in
 * modeofcounselling, which the enquiry list shows as "Type".
 */
function crmPayload(event, input, ip) {
    return {
        ...splitName(input.name),
        email: clean(input.email, 191),
        mobile: clean(input.phone, 32),
        destination: "",
        nearestidp: clean(input.city, 100),
        studylevel: clean(input.qualification, 100),
        modeofcounselling: `Event registration: ${event.title} (${eventDateText(event)})`,
        starttime: "",
        fund: "",
        ip: String(ip ?? "").slice(0, 64),
    };
}

async function forwardToCrm(event, input, ip) {
    try {
        const result = await postOverseasForm("postEnquiries", crmPayload(event, input, ip));

        if (result?.status === false && result?.response !== "Existing Data") {
            console.error("Event registration CRM forward was refused:", result);
        }
    } catch (error) {
        console.error(
            "Event registration CRM forward failed:",
            error?.cause?.message || error?.message || error
        );
    }
}

export async function POST(request) {
    if (!checkSameOrigin(request)) {
        return reply(false, "Request blocked.", 403);
    }

    const ip = clientIp(request);

    if (rateLimited(ip)) {
        return reply(false, "Too many attempts. Please wait a few minutes and try again.", 429);
    }

    const { body, tooLarge } = await readJson(request);

    if (tooLarge) {
        return reply(false, "The form is too large. Please shorten your answers.", 413);
    }

    if (!body) {
        return reply(false, "Please fill in the form and try again.", 400);
    }

    // Honeypot: a person never sees this field.
    if (String(body.website ?? "").trim() !== "") {
        return reply(true, "You are registered. We will send the details to your phone.", 200, {
            alreadyRegistered: false,
        });
    }

    try {
        const { event, alreadyRegistered } = await registerForEvent(body, ip);

        // A repeat registration was forwarded the first time.
        if (!alreadyRegistered) {
            after(() => forwardToCrm(event, body, ip));
        }

        return reply(
            true,
            alreadyRegistered
                ? "You are already registered for this event. We have updated your details."
                : "You are registered. We will send the details to your phone.",
            200,
            { alreadyRegistered }
        );
    } catch (error) {
        if (error instanceof EventRegistrationError) {
            return reply(false, error.message, error.status);
        }

        console.error("Event registration error:", error);

        return reply(false, "Unable to register right now. Please try again.", 500);
    }
}
