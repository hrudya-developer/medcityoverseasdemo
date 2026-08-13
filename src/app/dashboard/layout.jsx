import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}) {
    const cookieStore = await cookies();

    const session =
        cookieStore.get("medcity_session")?.value;

    // No session cookie -> user cannot access dashboard
    if (!session) {
        redirect("/login");
    }

    return (
        <>
            {children}
        </>
    );
}