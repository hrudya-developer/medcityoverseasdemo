import { NextResponse } from "next/server";

import {
    ADMIN_COOKIE_NAME,
    adminCookieOptions,
    createAdminToken,
    isAdminEmail,
} from "@/lib/auth/admin";
import { checkSameOrigin, jsonError } from "@/lib/auth/adminApi";
import { consumeCode, LoginCodeError } from "@/lib/auth/loginCodes";

export const runtime = "nodejs";

export async function POST(request) {
    if (!checkSameOrigin(request)) {
        return jsonError("Request blocked.", 403);
    }

    try {
        const body = await request.json().catch(() => ({}));
        const email = await consumeCode(body?.email, body?.code, "admin");

        if (!isAdminEmail(email)) {
            return jsonError("This email cannot sign in.", 403);
        }

        const response = NextResponse.json({ success: true });

        response.cookies.set(ADMIN_COOKIE_NAME, createAdminToken(email), adminCookieOptions);

        return response;
    } catch (error) {
        if (error instanceof LoginCodeError) {
            return jsonError(error.message, error.status);
        }

        console.error("Admin verify error:", error);

        return jsonError("Unable to sign in. Please try again.", 500);
    }
}
