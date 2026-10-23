import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
    SESSION_COOKIE_NAME,
    verifySessionToken,
} from "@/lib/auth/session";

export default async function DashboardLayout({
    children,
}) {
    const cookieStore = await cookies();

    const session = verifySessionToken(
        cookieStore.get(SESSION_COOKIE_NAME)?.value
    );

    // Missing, forged or expired session: send to login before
    // rendering anything, instead of flashing the dashboard.
    if (!session?.uid) {
        redirect("/login");
    }

    return (
        <>
            {children}
        </>
    );
}
