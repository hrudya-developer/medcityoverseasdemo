"use client";

import Link from "next/link";

import {
    Headset,
    UserRound,
} from "lucide-react";

export default function NavbarActions({
    openCounsellingPopup,
}) {
    return (
        <div className="ml-auto hidden items-center gap-3 lg:flex">
            <button
                type="button"
                onClick={
                    openCounsellingPopup
                }
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-darkPrimary shadow-[0_8px_22px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-logoYellow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
                <Headset
                    size={18}
                    aria-hidden="true"
                />

                <span>
                    Get Free Counselling
                </span>
            </button>

            <Link
                href="/login"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/70 bg-white/5 px-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
                <UserRound
                    size={18}
                    aria-hidden="true"
                />

                <span>
                    Student Login
                </span>
            </Link>
        </div>
    );
}