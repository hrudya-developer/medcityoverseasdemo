import { listApplications } from "@/lib/adminLists";

import ListControls from "../../components/ListControls";

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage({ searchParams }) {
    const { page, q } = await searchParams;
    const result = await listApplications({ page, q });

    return (
        <>
            <h1 className="text-2xl font-bold">Applications</h1>
            <p className="mt-1 text-sm text-slate-500">
                Courses students applied for through the website, newest first.
            </p>

            <ListControls
                basePath="/admin/applications"
                page={result.page}
                total={result.total}
                q={result.q}
                placeholder="Student, course or university"
            />

            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                        <tr>
                            <th className="px-4 py-3">Applied</th>
                            <th className="px-4 py-3">Student</th>
                            <th className="px-4 py-3">Course</th>
                            <th className="px-4 py-3">University</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Counsellor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.rows.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-6 text-slate-500">
                                    Nothing found.
                                </td>
                            </tr>
                        )}

                        {result.rows.map((row) => (
                            <tr key={row.id} className="border-t border-slate-100 align-top">
                                <td className="whitespace-nowrap px-4 py-3 text-slate-600">{row.created_at}</td>
                                <td className="px-4 py-3">
                                    <div className="font-semibold">{row.student_name || "Not recorded"}</div>
                                    <div className="text-slate-500">
                                        {[row.student_code, row.student_mobile].filter(Boolean).join(" ")}
                                    </div>
                                    <div className="text-slate-500">{row.student_email}</div>
                                </td>
                                <td className="px-4 py-3">{row.course || "Not recorded"}</td>
                                <td className="px-4 py-3">
                                    {row.university}
                                    {row.country && <div className="text-slate-500">{row.country}</div>}
                                </td>
                                <td className="px-4 py-3">{row.enquiry_status}</td>
                                <td className="px-4 py-3">{row.counsellor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
