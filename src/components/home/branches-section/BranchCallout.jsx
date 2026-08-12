import Link from "next/link";
import { Navigation } from "lucide-react";

const BranchCallout = () => {
    return (
        <aside
            aria-label="View complete branch information"
            className="relative mt-9 overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/5 via-white to-secondary/5 px-5 py-5 sm:flex sm:items-center sm:justify-between sm:gap-5"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-secondary/10 blur-2xl"
            />

            <div className="relative">
                <p
                    className="text-base font-extrabold text-darkPrimary"
                >
                    Need complete branch information?
                </p>

                <p
                    className="mt-1 text-sm leading-6 text-slate-600"
                >
                    View branch addresses,
                    contact details and available
                    services.
                </p>
            </div>

            <Link
                href="/branches"
                aria-label="View all Medcity branch details"
                className="relative mt-4 inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(4,102,175,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#045894] hover:shadow-[0_14px_30px_rgba(4,102,175,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 sm:mt-0 sm:w-auto"
            >
                View Branch Details

                <Navigation
                    aria-hidden="true"
                    className="h-4 w-4"
                />
            </Link>
        </aside>
    );
};

export default BranchCallout;