import { redirect } from "next/navigation";

import { getSessionUid } from "@/lib/auth/sessionUid";

/**
 * Server-side guard: returns the logged-in student's uid,
 * or redirects to /login when there is no valid session.
 */
export async function requireAuth() {
    const uid = await getSessionUid();

    if (!uid) {
        redirect("/login");
    }

    return uid;
}
