"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function scoreTone(score) {
    if (score === null || score === undefined) return "bg-slate-100 text-slate-500";
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 50) return "bg-amber-100 text-amber-800";
    return "bg-red-100 text-red-700";
}

async function checkPage(path) {
    const response = await fetch("/api/admin/seo/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Check failed");
    }

    return result;
}

export default function SeoPagesTable({ rows: initialRows }) {
    const router = useRouter();
    const stopRef = useRef(false);

    const [rows, setRows] = useState(initialRows);
    const [type, setType] = useState("All");
    const [search, setSearch] = useState("");
    const [running, setRunning] = useState(null);
    const [newPath, setNewPath] = useState("");

    const types = useMemo(() => ["All", ...new Set(initialRows.map((row) => row.type))], [initialRows]);

    const visible = useMemo(() => {
        const term = search.trim().toLowerCase();

        return rows
            .filter((row) => (type === "All" || row.type === type) && (!term || row.path.includes(term) || row.title.toLowerCase().includes(term)))
            .sort((a, b) => (a.score ?? -1) - (b.score ?? -1) || a.path.localeCompare(b.path));
    }, [rows, type, search]);

    const checked = rows.filter((row) => row.score !== null);
    const average = checked.length ? Math.round(checked.reduce((sum, row) => sum + row.score, 0) / checked.length) : null;

    async function runChecks(paths) {
        stopRef.current = false;
        setRunning({ done: 0, total: paths.length, failed: 0 });

        for (let index = 0; index < paths.length; index += 1) {
            if (stopRef.current) {
                break;
            }

            try {
                const result = await checkPage(paths[index]);

                setRows((current) =>
                    current.map((row) =>
                        row.path === result.path
                            ? { ...row, score: result.score, title: result.title, status: result.status, checkedAt: "just now" }
                            : row
                    )
                );
            } catch {
                setRunning((current) => ({ ...current, failed: current.failed + 1 }));
            }

            setRunning((current) => ({ ...current, done: index + 1 }));
        }

        setRunning((current) => ({ ...current, finished: true }));
        router.refresh();
    }

    function openPath(event) {
        event.preventDefault();

        const path = newPath.trim();

        if (path) {
            router.push(`/admin/seo/edit?path=${encodeURIComponent(path.replace(/^https?:\/\/[^/]+/i, ""))}`);
        }
    }

    return (
        <div className="mt-6 space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Average score</p>
                    <p className="mt-1 text-3xl font-black">{average === null ? "–" : `${average}%`}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pages checked</p>
                    <p className="mt-1 text-3xl font-black">
                        {checked.length} <span className="text-base font-semibold text-slate-400">/ {rows.length}</span>
                    </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Below 50%</p>
                    <p className="mt-1 text-3xl font-black text-red-600">{checked.filter((row) => row.score < 50).length}</p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3">
                <select value={type} onChange={(event) => setType(event.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                    {types.map((item) => (
                        <option key={item}>{item}</option>
                    ))}
                </select>
                <input
                    type="search"
                    value={search}
                    placeholder="Search address or title"
                    onChange={(event) => setSearch(event.target.value)}
                    className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                {running && !running.finished ? (
                    <button type="button" onClick={() => (stopRef.current = true)} className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white">
                        Stop ({running.done}/{running.total})
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => runChecks(visible.map((row) => row.path))}
                        className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white"
                    >
                        Check {visible.length} shown
                    </button>
                )}
            </div>

            {running && (
                <p className="text-sm text-slate-600">
                    {running.finished ? "Finished" : "Checking"} {running.done} of {running.total}
                    {running.failed ? `, ${running.failed} could not be checked` : ""}. One page at a time, so the site stays fast.
                </p>
            )}

            <form onSubmit={openPath} className="flex flex-wrap gap-2">
                <input
                    value={newPath}
                    placeholder="Any page address, e.g. /courses/msc-nursing-northumbria-university"
                    onChange={(event) => setNewPath(event.target.value)}
                    className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                />
                <button type="submit" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">
                    Open page
                </button>
            </form>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                        <tr>
                            <th className="px-4 py-3">Score</th>
                            <th className="px-4 py-3">Page</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Checked</th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody>
                        {visible.slice(0, 500).map((row) => (
                            <tr key={row.path} className="border-t border-slate-100 align-top">
                                <td className="px-4 py-3">
                                    <span className={`inline-block min-w-14 rounded-full px-2.5 py-1 text-center text-xs font-bold ${scoreTone(row.score)}`}>
                                        {row.score === null ? "Not checked" : `${row.score}%`}
                                    </span>
                                    {row.status && row.status !== 200 && (
                                        <span className="mt-1 block text-xs font-semibold text-red-600">Error {row.status}</span>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <p className="font-semibold text-slate-900">{row.title || row.path}</p>
                                    <p className="break-all text-xs text-slate-500">{row.path}</p>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                                    {row.type}
                                    {row.edited && <span className="ml-2 rounded bg-blue-50 px-1.5 py-0.5 text-[11px] font-semibold text-blue-700">Edited</span>}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">{row.checkedAt || "–"}</td>
                                <td className="whitespace-nowrap px-4 py-3 text-right">
                                    <Link
                                        href={
                                            row.path.startsWith("/blog-details/")
                                                ? "/admin/blogs"
                                                : `/admin/seo/edit?path=${encodeURIComponent(row.path)}`
                                        }
                                        className="font-semibold text-blue-700"
                                    >
                                        {row.path.startsWith("/blog-details/") ? "Blog editor" : "Edit"}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {visible.length > 500 && (
                    <p className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
                        Showing the first 500 of {visible.length}. Use the type filter or search to narrow the list.
                    </p>
                )}
            </div>
        </div>
    );
}
