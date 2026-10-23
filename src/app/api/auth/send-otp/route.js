import { NextResponse } from "next/server";

import {
    LoginCodeError,
    requestLoginCode,
} from "@/lib/auth/loginCodes";

export const runtime = "nodejs";

function clientIp(request) {
    const forwarded = request.headers.get("x-forwarded-for") || "";

    return (
        forwarded.split(",")[0].trim() ||
        request.headers.get("x-real-ip") ||
        ""
    );
}

export async function POST(request) {
    try {
        const body = await request.json().catch(() => ({}));

        const result = await requestLoginCode(body?.email, clientIp(request));

        // The code itself is only ever sent by email.
        return NextResponse.json({ status: true, msg: result.msg, uid: null });
    } catch (error) {
        if (error instanceof LoginCodeError) {
            return NextResponse.json(
                { status: false, msg: error.message },
                { status: error.status }
            );
        }

        console.error("Send code route error:", error);

        return NextResponse.json(
            { status: false, msg: "Unable to send the code. Please try again." },
            { status: 500 }
        );
    }
}
