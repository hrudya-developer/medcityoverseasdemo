import { NextResponse } from "next/server";

import { guardAdminApi, jsonError } from "@/lib/auth/adminApi";
import { EventAdminError, eventsTablesMissing, saveEvent } from "@/lib/eventsAdmin";

import { refreshEventPages } from "./revalidate";

export const runtime = "nodejs";

export async function POST(request) {
    const { admin, response } = await guardAdminApi(request);

    if (!admin) {
        return response;
    }

    try {
        const body = await request.json().catch(() => ({}));
        const result = await saveEvent({ ...body, id: null }, admin.email);

        refreshEventPages(result.slug);

        return NextResponse.json({ success: true, id: result.id, slug: result.slug });
    } catch (error) {
        if (error instanceof EventAdminError) {
            return jsonError(error.message, error.status);
        }

        if (eventsTablesMissing(error)) {
            return jsonError("Run db/013_events.sql in phpMyAdmin first.", 503);
        }

        console.error("Create event error:", error);

        return jsonError("Could not save the event. Please try again.", 500);
    }
}
