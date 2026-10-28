import { guardAdminApi, jsonError } from "@/lib/auth/adminApi";
import { eventsTablesMissing, registrationsCsv } from "@/lib/eventsAdmin";

export const runtime = "nodejs";

/* GET: the event's registrations as a CSV download. */
export async function GET(request, { params }) {
    const { admin, response } = await guardAdminApi(request);

    if (!admin) {
        return response;
    }

    try {
        const { id } = await params;
        const result = await registrationsCsv(id);

        if (!result) {
            return jsonError("This event could not be found.", 404);
        }

        return new Response(result.csv, {
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": `attachment; filename="${result.filename}"`,
                "Cache-Control": "no-store",
                "X-Content-Type-Options": "nosniff",
            },
        });
    } catch (error) {
        if (eventsTablesMissing(error)) {
            return jsonError("Run db/013_events.sql in phpMyAdmin first.", 503);
        }

        console.error("Registrations CSV error:", error);

        return jsonError("Could not build the CSV. Please try again.", 500);
    }
}
