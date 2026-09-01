import Link from "next/link";

import {
  ArrowRight,
  Building2,
} from "lucide-react";

export default function UniversitiesEmptyState({
  countryName,
}) {
  return (
    <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px]"
      />

      <div className="relative">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Building2 size={28} />
        </span>

        <h2 className="mt-6 text-2xl font-black text-darkPrimary">
          No universities found
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">
          University information for{" "}
          {countryName} is currently
          unavailable. Explore our other
          international study destinations.
        </p>

        <Link
          href="/universities"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-darkPrimary"
        >
          Explore Destinations

          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}