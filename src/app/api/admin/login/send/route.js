import { NextResponse } from "next/server";

import { isAdminEmail } from "@/lib/auth/admin";
import { checkSameOrigin, clientIp, jsonError } from "@/lib/auth/adminApi";
import { issueCode, LoginCodeError, normaliseEmail } from "@/lib/auth/loginCodes";

export const runtime = "nodejs";

const SENT_MESSAGE = "If this email can sign in, a code is on its way.";

export async function POST(request) {
    if (!checkSameOrigin(request)) {
        return jsonError("Request blocked.", 403);
    }

    try {
        const body = await request.json().catch(() => ({}));
        const email = normaliseEmail(body?.email);

        // Same answer either way, so the form does not reveal who is an admin.
        if (!isAdminEmail(email)) {
            return NextResponse.json({ success: true, message: SENT_MESSAGE });
        }

        await issueCode(email, clientIp(request), "admin");

        return NextResponse.json({ success: true, message: SENT_MESSAGE });
    } catch (error) {
        if (error instanceof LoginCodeError) {
            return jsonError(error.message, error.status);
        }

        console.error("Admin code error:", error);

        return jsonError("Unable to send the code. Please try again.", 500);
    }
}
