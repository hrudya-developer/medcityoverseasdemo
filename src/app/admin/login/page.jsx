import { redirect } from "next/navigation";

import { getAdmin } from "@/lib/auth/admin";

import AdminLoginForm from "../components/AdminLoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
    if (await getAdmin()) {
        redirect("/admin/blogs");
    }

    return (
        <main className="flex min-h-screen items-center justify-center px-4 py-12">
            <AdminLoginForm />
        </main>
    );
}
