"use client";

import { useRouter } from "next/navigation";

export default function SignOutButton() {
    const router = useRouter();

    async function signOut() {
        await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);

        router.replace("/admin/login");
        router.refresh();
    }

    return (
        <button type="button" onClick={signOut} className="text-sm text-slate-500 hover:text-slate-900">
            Sign out
        </button>
    );
}
