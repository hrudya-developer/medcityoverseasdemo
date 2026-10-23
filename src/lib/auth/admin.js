import "server-only";

import crypto from "crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { normaliseEmail } from "@/lib/auth/loginCodes";

/*
 * Website admin sign-in (blog editor, enquiry lists).
 *
 * Who may sign in is set by the ADMIN_EMAILS environment variable in
 * hPanel: a comma-separated list of email addresses. Removing an address
 * there locks that person out on their next request, even mid-session.
 *
 * The session is a signed cookie, separate from the student cookie and
 * signed under its own prefix so a student token can never pass as an
 * admin one.
 */

export const ADMIN_COOKIE_NAME = "medcity_admin";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

const TOKEN_PREFIX = "admin-v1";

function getSecret() {
    const secret = process.env.AUTH_SESSION_SECRET;

    if (!secret) {
        throw new Error("AUTH_SESSION_SECRET is missing.");
    }

    return secret;
}

function sign(value) {
    return crypto
        .createHmac("sha256", getSecret())
        .update(`${TOKEN_PREFIX}.${value}`)
        .digest("base64url");
}

export function adminEmails() {
    return String(process.env.ADMIN_EMAILS ?? "")
        .split(",")
        .map(normaliseEmail)
        .filter(Boolean);
}

export function isAdminEmail(email) {
    const value = normaliseEmail(email);

    return Boolean(value) && adminEmails().includes(value);
}

export function createAdminToken(email) {
    const payload = Buffer.from(
        JSON.stringify({
            role: "admin",
            email: normaliseEmail(email),
            createdAt: Date.now(),
        })
    ).toString("base64url");

    return `${payload}.${sign(payload)}`;
}

export function verifyAdminToken(token) {
    try {
        const [payload, signature] = String(token ?? "").split(".");

        if (!payload || !signature) {
            return null;
        }

        const expected = Buffer.from(sign(payload));
        const provided = Buffer.from(signature);

        if (expected.length !== provided.length || !crypto.timingSafeEqual(expected, provided)) {
            return null;
        }

        const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
        const createdAt = Number(data?.createdAt);

        if (
            data?.role !== "admin" ||
            !createdAt ||
            Date.now() - createdAt > ADMIN_SESSION_MAX_AGE * 1000 ||
            !isAdminEmail(data.email)
        ) {
            return null;
        }

        return { email: data.email };
    } catch {
        return null;
    }
}

export const adminCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
};

/** The signed-in admin, or null. */
export async function getAdmin() {
    const cookieStore = await cookies();

    return verifyAdminToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}

/** For admin pages: the admin, or a redirect to the admin sign-in. */
export async function requireAdmin() {
    const admin = await getAdmin();

    if (!admin) {
        redirect("/admin/login");
    }

    return admin;
}
