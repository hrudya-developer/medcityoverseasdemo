import Link from "next/link";

import { requireAdmin } from "@/lib/auth/admin";

import SignOutButton from "../components/SignOutButton";

export const dynamic = "force-dynamic";

const LINKS = [
    { href: "/admin/blogs", label: "Blog posts" },
    { href: "/admin/enquiries", label: "Enquiries" },
    { href: "/admin/applications", label: "Applications" },
];

export default async function AdminPanelLayout({ children }) {
    const admin = await requireAdmin();

    return (
        <>
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
                    <Link href="/admin/blogs" className="font-bold">
                        Medcity website admin
                    </Link>

                    <nav className="flex flex-wrap gap-4 text-sm font-semibold text-slate-600">
                        {LINKS.map((link) => (
                            <Link key={link.href} href={link.href} className="hover:text-blue-700">
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="ml-auto flex items-center gap-4">
                        <span className="hidden text-sm text-slate-500 sm:inline">{admin.email}</span>
                        <SignOutButton />
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        </>
    );
}
