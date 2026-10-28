import { NextResponse } from "next/server";

import { guardAdminApi, jsonError } from "@/lib/auth/adminApi";
import { deleteEvent, EventAdminError, eventsTablesMissing, saveEvent } from "@/lib/eventsAdmin";

import { refreshEventPages } from "../revalidate";

export const runtime = "nodejs";

function handleError(error, fallback) {
    if (error instanceof EventAdminError) {
        return jsonError(error.message, error.status);
    }

    if (eventsTablesMissing(error)) {
        return jsonError("Run db/013_events.sql in phpMyAdmin first.", 503);
    }

    console.error(fallback, error);

    return jsonError(fallback, 500);
}

export async function PUT(request, { params }) {
    const { admin, response } = await guardAdminApi(request);

    if (!admin) {
        return response;
    }

    try {
        const { id } = await params;
        const body = await request.json().catch(() => ({}));
        const result = await saveEvent({ ...body, id: id || "invalid" }, admin.email);

        refreshEventPages(result.slug, result.oldSlug);

        return NextResponse.json({ success: true, id: result.id, slug: result.slug });
    } catch (error) {
        return handleError(error, "Could not save the event. Please try again.");
    }
}

export async function DELETE(request, { params }) {
    const { admin, response } = await guardAdminApi(request);

    if (!admin) {
        return response;
    }

    try {
        const { id } = await params;
        const result = await deleteEvent(id);

        refreshEventPages(result.slug);

        return NextResponse.json({ success: true });
    } catch (error) {
        return handleError(error, "Could not delete the event. Please try again.");
    }
}
