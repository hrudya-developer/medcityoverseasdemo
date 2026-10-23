import { listEnquiries } from "@/lib/adminLists";

import ListControls from "../../components/ListControls";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage({ searchParams }) {
    const { page, q } = await searchParams;
    const result = await listEnquiries({ page, q });

    return (
        <>
            <h1 className="text-2xl font-bold">Enquiries</h1>
            <p className="mt-1 text-sm text-slate-500">
                Contact, counselling and placement forms sent from the website, newest first.
            </p>

            <ListControls
                basePath="/admin/enquiries"
                page={result.page}
                total={result.total}
                q={result.q}
                placeholder="Name, email or phone"
            />

            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                        <tr>
                            <th className="px-4 py-3">Received</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Contact</th>
                            <th className="px-4 py-3">Destination</th>
                            <th className="px-4 py-3">Level / qualification</th>
                            <th className="px-4 py-3">Branch / city</th>
                            <th className="px-4 py-3">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.rows.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-4 py-6 text-slate-500">
                                    Nothing found.
                                </td>
                            </tr>
                        )}

                        {result.rows.map((row) => (
                            <tr key={row.id} className="border-t border-slate-100 align-top">
                                <td className="whitespace-nowrap px-4 py-3 text-slate-600">{row.date}</td>
                                <td className="px-4 py-3 font-semibold">
                                    {[row.firstname, row.lastname].filter(Boolean).join(" ")}
                                </td>
                                <td className="px-4 py-3">
                                    <div>{row.mobile}</div>
                                    <div className="text-slate-500">{row.email}</div>
                                </td>
                                <td className="px-4 py-3">{row.destination}</td>
                                <td className="px-4 py-3">{row.studylevel}</td>
                                <td className="px-4 py-3">{row.nearestidp}</td>
                                <td className="px-4 py-3">{row.modeofcounselling}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
