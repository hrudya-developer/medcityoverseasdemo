
import Link from "next/link";
import { ArrowUpRight, GraduationCap, BookOpen } from "lucide-react";

import { getDestinationSummaries } from "@/lib/destinationSummary";

const NOT_RECORDED = "Not recorded";

/*
 * Destinations at a glance:
 * All destination information is loaded from the database.
 * Displays nothing when there are no destinations.
 */

export default async function DestinationsTable({
    title = "Study destinations at a glance",
    intro,
    className = "",
}) {
    const rows = await getDestinationSummaries();

    if (!rows.length) {
        return null;
    }

    return (
        <section
            className={`relative mx-auto w-full max-w-7xl min-w-0 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16 ${className}`}
        >
            {/* Section heading */}
            <div className="mb-8 sm:mb-10">
                <div className="mb-5 h-1.5 w-16 rounded-full bg-primary" />

                <h2 className="text-[26px] font-black leading-tight tracking-tight text-[#071D49] sm:text-3xl lg:text-[38px]">
                    {title}
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                    {intro ??
                        "The universities and courses counted here are the ones currently listed on Medcity Overseas, so the numbers grow as we add more."}
                </p>
            </div>

            {/* Desktop / tablet table */}
            <div className="hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.06)] md:block">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] border-collapse text-left">
                        <thead>
                            <tr className="bg-[#071D49] text-white">
                                <th
                                    scope="col"
                                    className="px-6 py-5 text-xs font-bold uppercase tracking-wider"
                                >
                                    Country
                                </th>

                                <th scope="col" className="px-5 py-5 text-xs font-bold uppercase tracking-wider">
                                    Capital
                                </th>

                                <th scope="col" className="px-5 py-5 text-xs font-bold uppercase tracking-wider">
                                    Language
                                </th>

                                <th scope="col" className="px-5 py-5 text-xs font-bold uppercase tracking-wider">
                                    Currency
                                </th>

                                <th scope="col" className="px-5 py-5 text-right text-xs font-bold uppercase tracking-wider">
                                    Universities
                                </th>

                                <th scope="col" className="px-6 py-5 text-right text-xs font-bold uppercase tracking-wider">
                                    Courses
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {rows.map((row, index) => (
                                <tr
                                    key={row.id}
                                    className={`group transition-colors duration-200 hover:bg-blue-50/50 ${
                                        index % 2 === 0
                                            ? "bg-white"
                                            : "bg-slate-50/40"
                                    }`}
                                >
                                    {/* Country */}
                                    <th scope="row" className="px-6 py-5">
                                        <Link
                                            href={`/study-in-${row.slug}`}
                                            className="inline-flex items-center gap-2 font-bold text-[#071D49] transition-colors hover:text-primary"
                                        >
                                            <span className="break-words">
                                                Study in {row.country}
                                            </span>

                                            <ArrowUpRight
                                                size={16}
                                                aria-hidden="true"
                                                className="shrink-0 text-slate-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                                            />
                                        </Link>
                                    </th>

                                    {/* Capital */}
                                    <td className="px-5 py-5 text-sm text-slate-600">
                                        {row.capital ?? NOT_RECORDED}
                                    </td>

                                    {/* Language */}
                                    <td className="px-5 py-5 text-sm text-slate-600">
                                        {row.language ?? NOT_RECORDED}
                                    </td>

                                    {/* Currency */}
                                    <td className="px-5 py-5 text-sm text-slate-600">
                                        {row.currency ?? NOT_RECORDED}
                                    </td>

                                    {/* Universities */}
                                    <td className="px-5 py-5 text-right">
                                        {row.universities > 0 ? (
                                            <Link
                                                href={`/universities-in-${row.slug}`}
                                                className="inline-flex min-w-12 items-center justify-center rounded-xl bg-pink-50 px-3 py-2 text-sm font-extrabold text-primary transition-all hover:bg-primary hover:text-white"
                                            >
                                                {row.universities.toLocaleString("en-IN")}
                                            </Link>
                                        ) : (
                                            <span className="inline-flex min-w-12 items-center justify-center rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-500">
                                                0
                                            </span>
                                        )}
                                    </td>

                                    {/* Courses */}
                                    <td className="px-6 py-5 text-right">
                                        <span className="inline-flex min-w-12 items-center justify-center rounded-xl bg-blue-50 px-3 py-2 text-sm font-bold text-[#071D49]">
                                            {row.courses.toLocaleString("en-IN")}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile destination cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {rows.map((row) => (
                    <article
                        key={row.id}
                        className="min-w-0 overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.05)]"
                    >
                        {/* Country heading */}
                        <div className="flex min-w-0 items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                                <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.15em] text-primary">
                                    Study Destination
                                </span>

                                <h3 className="break-words text-lg font-extrabold leading-snug text-[#071D49]">
                                    <Link
                                        href={`/study-in-${row.slug}`}
                                        className="inline-flex items-center gap-1.5 hover:text-primary"
                                    >
                                        Study in {row.country}
                                        <ArrowUpRight
                                            size={17}
                                            aria-hidden="true"
                                            className="shrink-0 text-primary"
                                        />
                                    </Link>
                                </h3>
                            </div>

                            <div
                                aria-hidden="true"
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#071D49]"
                            >
                                <GraduationCap size={22} strokeWidth={1.8} />
                            </div>
                        </div>

                        {/* Destination details */}
                        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 rounded-2xl bg-slate-50 p-4">
                            <div className="min-w-0">
                                <dt className="text-xs font-medium text-slate-500">
                                    Capital
                                </dt>
                                <dd className="mt-1 break-words text-sm font-bold text-slate-800">
                                    {row.capital ?? NOT_RECORDED}
                                </dd>
                            </div>

                            <div className="min-w-0">
                                <dt className="text-xs font-medium text-slate-500">
                                    Language
                                </dt>
                                <dd className="mt-1 break-words text-sm font-bold text-slate-800">
                                    {row.language ?? NOT_RECORDED}
                                </dd>
                            </div>

                            <div className="min-w-0">
                                <dt className="text-xs font-medium text-slate-500">
                                    Currency
                                </dt>
                                <dd className="mt-1 break-words text-sm font-bold text-slate-800">
                                    {row.currency ?? NOT_RECORDED}
                                </dd>
                            </div>
                        </dl>

                        {/* Statistics */}
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="min-w-0 rounded-2xl border border-pink-100 bg-pink-50/60 p-3">
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                                    <GraduationCap
                                        size={15}
                                        aria-hidden="true"
                                        className="text-primary"
                                    />
                                    Universities
                                </div>

                                <div className="mt-2">
                                    {row.universities > 0 ? (
                                        <Link
                                            href={`/universities-in-${row.slug}`}
                                            className="inline-flex items-center gap-1 text-xl font-black text-primary hover:underline"
                                        >
                                            {row.universities.toLocaleString("en-IN")}
                                            <ArrowUpRight size={15} aria-hidden="true" />
                                        </Link>
                                    ) : (
                                        <span className="text-xl font-black text-slate-500">
                                            0
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="min-w-0 rounded-2xl border border-blue-100 bg-blue-50/70 p-3">
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                                    <BookOpen
                                        size={15}
                                        aria-hidden="true"
                                        className="text-blue-600"
                                    />
                                    Courses
                                </div>

                                <p className="mt-2 text-xl font-black text-[#071D49]">
                                    {row.courses.toLocaleString("en-IN")}
                                </p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
