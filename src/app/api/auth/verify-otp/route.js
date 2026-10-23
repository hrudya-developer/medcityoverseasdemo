import { NextResponse } from "next/server";

import {
    LoginCodeError,
    verifyLoginCode,
} from "@/lib/auth/loginCodes";
import {
    createSessionToken,
    SESSION_COOKIE_NAME,
    SESSION_MAX_AGE,
} from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(request) {
    try {
        const body = await request.json().catch(() => ({}));

        const student = await verifyLoginCode(body?.email, body?.otp);

        const response = NextResponse.json({
            status: true,
            stage: student.stage,
            user: {
                uid: student.uid,
                email: student.email,
                name: student.name,
            },
        });

        response.cookies.set({
            name: SESSION_COOKIE_NAME,
            value: createSessionToken({
                uid: student.uid,
                email: student.email,
                name: student.name,
            }),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: SESSION_MAX_AGE,
        });

        return response;
    } catch (error) {
        if (error instanceof LoginCodeError) {
            return NextResponse.json(
                { status: false, msg: error.message },
                { status: error.status }
            );
        }

        console.error("Verify code route error:", error);

        return NextResponse.json(
            { status: false, msg: "Unable to verify the code. Please try again." },
            { status: 500 }
        );
    }
}
