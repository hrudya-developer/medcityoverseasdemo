import "server-only";

import { NextResponse } from "next/server";

import { getAdmin } from "@/lib/auth/admin";

export function clientIp(request) {
    const forwarded = request.headers.get("x-forwarded-for") || "";

    return forwarded.split(",")[0].trim() || request.headers.get("x-real-ip") || "";
}

/**
 * Changes must come from the website's own pages: a form on another site
 * cannot post here with the admin's cookie.
 */
function isSameOrigin(request) {
    const origin = request.headers.get("origin");

    if (!origin) {
        return request.method === "GET" || request.method === "HEAD";
    }

    try {
        const host = request.headers.get("x-forwarded-host") || request.headers.get("host");

        return new URL(origin).host === host;
    } catch {
        return false;
    }
}

export function jsonError(message, status) {
    return NextResponse.json({ success: false, message }, { status });
}

/**
 * For admin API routes. Returns { admin } when allowed, otherwise
 * { response } holding the error to send back.
 */
export async function guardAdminApi(request) {
    if (!isSameOrigin(request)) {
        return { response: jsonError("Request blocked.", 403) };
    }

    const admin = await getAdmin();

    if (!admin) {
        return { response: jsonError("Please sign in again.", 401) };
    }

    return { admin };
}

export function checkSameOrigin(request) {
    return isSameOrigin(request);
}
