import { NextResponse } from "next/server";

import { guardAdminApi, jsonError } from "@/lib/auth/adminApi";
import { AuditInputError, auditPage, AuditUnavailableError } from "@/lib/seoAudit";

export const runtime = "nodejs";

export async function POST(request) {
    const { admin, response } = await guardAdminApi(request);

    if (!admin) {
        return response;
    }

    try {
        const body = await request.json().catch(() => ({}));
        const result = await auditPage(body?.path, request.nextUrl.origin);

        return NextResponse.json({
            success: true,
            path: result.path,
            status: result.status,
            ms: result.ms,
            timedOut: result.timedOut,
            type: result.type,
            title: result.title,
            score: result.score,
            pillars: result.pillars,
            aspects: result.aspects,
            checks: result.checks,
        });
    } catch (error) {
        if (error instanceof AuditInputError) {
            return jsonError(error.message, 400);
        }

        if (error instanceof AuditUnavailableError) {
            return jsonError(error.message, 503);
        }

        console.error("SEO audit error:", error);

        return jsonError("Could not check this page.", 500);
    }
}
