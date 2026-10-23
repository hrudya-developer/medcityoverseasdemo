import { NextResponse } from "next/server";

import { guardAdminApi, jsonError } from "@/lib/auth/adminApi";
import { PageSeoError, savePageSeo } from "@/lib/pageSeo";

export const runtime = "nodejs";

export async function POST(request) {
    const { admin, response } = await guardAdminApi(request);

    if (!admin) {
        return response;
    }

    try {
        const body = await request.json().catch(() => ({}));
        const result = await savePageSeo(body, admin.email);

        return NextResponse.json({ success: true, ...result });
    } catch (error) {
        if (error instanceof PageSeoError) {
            return jsonError(error.message, error.status);
        }

        console.error("SEO save error:", error);

        return jsonError("Could not save. Please try again.", 500);
    }
}
