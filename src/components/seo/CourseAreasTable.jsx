import Link from "next/link";

import { getCourseAreaSummaries } from "@/lib/courseAreaSummary";

const NOT_RECORDED = "Not recorded";

/*
 * Course areas with the number of courses, universities and countries
 * we list for each and the most common duration, from the database.
 */
export default async function CourseAreasTable({ title = "Course areas at a glance", className = "" }) {
    const rows = (await getCourseAreaSummaries()).filter((row) => row.courses > 0);

    if (!rows.length) {
        return null;
    }

    const count = (value) => (value > 0 ? value.toLocaleString("en-IN") : NOT_RECORDED);

    return (
        <section className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">{title}</h2>

            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                Counted from the courses currently listed on Medcity Overseas. Durations are the most common one among the listed courses in each area; check each course page for its own.
            </p>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full min-w-[600px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">
                        <tr>
                            <th scope="col" className="px-4 py-3">Course area</th>
                            <th scope="col" className="px-4 py-3 text-right">Courses</th>
                            <th scope="col" className="px-4 py-3 text-right">Universities</th>
                            <th scope="col" className="px-4 py-3 text-right">Countries</th>
                            <th scope="col" className="px-4 py-3">Most common duration</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                        {rows.map((row) => (
                            <tr key={row.id}>
                                <th scope="row" className="px-4 py-3 font-bold text-slate-900">
                                    <Link href={`/courses?q=${encodeURIComponent(row.name)}`} className="hover:text-primary hover:underline">
                                        {row.name}
                                    </Link>
                                </th>
                                <td className="px-4 py-3 text-right">{count(row.courses)}</td>
                                <td className="px-4 py-3 text-right">{count(row.universities)}</td>
                                <td className="px-4 py-3 text-right">{count(row.countries)}</td>
                                <td className="px-4 py-3">{row.duration ?? NOT_RECORDED}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
