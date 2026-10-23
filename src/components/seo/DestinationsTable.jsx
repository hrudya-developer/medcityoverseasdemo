import Link from "next/link";

import { getDestinationSummaries } from "@/lib/destinationSummary";

const NOT_RECORDED = "Not recorded";

/*
 * "Destinations at a glance": every live destination with its capital,
 * language, currency and the number of universities and courses we
 * list, all read from the database. Shows nothing if there are none.
 */
export default async function DestinationsTable({ title = "Study destinations at a glance", intro, className = "" }) {
    const rows = await getDestinationSummaries();

    if (!rows.length) {
        return null;
    }

    return (
        <section className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">{title}</h2>

            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                {intro ??
                    "The universities and courses counted here are the ones currently listed on Medcity Overseas, so the numbers grow as we add more."}
            </p>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full min-w-[640px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500">
                        <tr>
                            <th scope="col" className="px-4 py-3">Country</th>
                            <th scope="col" className="px-4 py-3">Capital</th>
                            <th scope="col" className="px-4 py-3">Language</th>
                            <th scope="col" className="px-4 py-3">Currency</th>
                            <th scope="col" className="px-4 py-3 text-right">Universities</th>
                            <th scope="col" className="px-4 py-3 text-right">Courses</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                        {rows.map((row) => (
                            <tr key={row.id}>
                                <th scope="row" className="px-4 py-3 font-bold text-slate-900">
                                    <Link href={`/study-in-${row.slug}`} className="hover:text-primary hover:underline">
                                        Study in {row.country}
                                    </Link>
                                </th>
                                <td className="px-4 py-3">{row.capital ?? NOT_RECORDED}</td>
                                <td className="px-4 py-3">{row.language ?? NOT_RECORDED}</td>
                                <td className="px-4 py-3">{row.currency ?? NOT_RECORDED}</td>
                                <td className="px-4 py-3 text-right">
                                    {row.universities > 0 ? (
                                        <Link href={`/universities-in-${row.slug}`} className="font-bold text-primary hover:underline">
                                            {row.universities.toLocaleString("en-IN")}
                                        </Link>
                                    ) : (
                                        0
                                    )}
                                </td>
                                <td className="px-4 py-3 text-right">{row.courses.toLocaleString("en-IN")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
