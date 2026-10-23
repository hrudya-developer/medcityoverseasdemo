import "server-only";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
    SESSION_COOKIE_NAME,
    verifySessionToken,
} from "@/lib/auth/session";

/**
 * Read the logged-in student's uid from the signed session cookie.
 *
 * Dashboard routes must use this instead of a uid sent by the
 * browser, otherwise anyone could read or change another
 * student's data by posting a different uid.
 *
 * Returns the uid as a string, or null when there is no valid session.
 */
export async function getSessionUid() {
    const cookieStore = await cookies();

    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    const session = verifySessionToken(token);

    return session?.uid ? String(session.uid) : null;
}

/**
 * Standard 401 response for routes that need a logged-in student.
 */
export function unauthorizedResponse() {
    return NextResponse.json(
        {
            status: false,
            msg: "Please login again.",
        },
        {
            status: 401,
        }
    );
}
