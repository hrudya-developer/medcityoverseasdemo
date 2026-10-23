import { NextResponse } from "next/server";

import { guardAdminApi, jsonError } from "@/lib/auth/adminApi";
import { auditPage } from "@/lib/seoAudit";

export const runtime = "nodejs";

export async function POST(request) {
    const { admin, response } = await guardAdminApi(request);

    if (!admin) {
        return response;
    }

    try {
        const body = await request.json().catch(() => ({}));
        const result = await auditPage(body?.path, request.nextUrl.origin);

        return NextResponse.json({ success: true, ...result });
    } catch (error) {
        console.error("SEO audit error:", error);

        return jsonError(error?.message || "Could not check this page.", 500);
    }
}
