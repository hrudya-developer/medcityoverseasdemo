"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { PILLARS } from "@/lib/seoCheckDefs";

import { asScore, asScoreMap, averageOf, loadProblem, ScoreBadge, ScoreBar, textTone } from "./seoScoreParts";

const SCORE_KEYS = [
    { key: "overall", name: "Overall" },
    ...PILLARS.map((pillar) => ({ key: pillar.key, name: pillar.name })),
];

const LIST_LIMIT = 500;

const controlClass = "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm";

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

/** One score of a row: "overall", "seo", "aeo" or "geo". */
function scoreOf(row, key) {
    return asScore(key === "overall" ? row.score : row.pillars?.[key]);
}

function SummaryCard({ label, caption, score, children }) {
    return (
        <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
            <p className={`mt-1 text-3xl font-black ${textTone(score)}`}>{score === null ? "-" : `${score}%`}</p>
            <p className="text-xs text-slate-500">{caption}</p>
            <div className="mt-3 flex-1 space-y-2 border-t border-slate-100 pt-3">{children}</div>
        </div>
    );
}

function Summary({ rows }) {
    const checked = rows.filter((row) => scoreOf(row, "overall") !== null);

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard label="Overall average" caption="SEO, AEO and GEO together" score={averageOf(rows.map((row) => row.score))}>
                <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs text-slate-600">Pages checked</span>
                    <span className="text-sm font-bold">
                        {checked.length} <span className="font-semibold text-slate-400">/ {rows.length}</span>
                    </span>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs text-slate-600">Below 50%</span>
                    <span className="text-sm font-bold text-red-600">{checked.filter((row) => scoreOf(row, "overall") < 50).length}</span>
                </div>
            </SummaryCard>

            {PILLARS.map((pillar) => (
                <SummaryCard
                    key={pillar.key}
                    label={`${pillar.name} average`}
                    caption={pillar.description}
                    score={averageOf(rows.map((row) => row.pillars?.[pillar.key]))}
                >
                    {pillar.aspects.map((aspect) => (
                        <ScoreBar
                            key={aspect.key}
                            label={aspect.name}
                            score={averageOf(rows.map((row) => asScoreMap(row.aspects)[aspect.key]))}
                        />
                    ))}
                </SummaryCard>
            ))}
        </div>
    );
}

function SortHeader({ scoreKey, name, sort, onSort }) {
    const active = sort.key === scoreKey;

    return (
        <th className="px-2 py-3 text-center" aria-sort={active ? (sort.lowestFirst ? "ascending" : "descending") : "none"}>
            <button
                type="button"
                onClick={() => onSort(scoreKey)}
                className={`inline-flex items-center gap-1 rounded px-1 font-semibold hover:text-blue-700 ${active ? "text-slate-900" : ""}`}
                title={`Sort by ${name}`}
            >
                {name}
                <span className={`text-[10px] ${active ? "" : "invisible"}`}>{sort.lowestFirst ? "▲" : "▼"}</span>
            </button>
        </th>
    );
}

function Chevron({ open }) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={`h-4 w-4 transition-transform ${open ? "rotate-90" : ""}`}>
            <path fillRule="evenodd" d="M7.2 4.2a.75.75 0 0 1 1.06 0l5.25 5.27a.75.75 0 0 1 0 1.06L8.26 15.8a.75.75 0 1 1-1.06-1.06L11.92 10 7.2 5.27a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
    );
}

function editHref(path) {
    return path.startsWith("/blog-details/") ? "/admin/blogs" : `/admin/seo/edit?path=${encodeURIComponent(path)}`;
}

function AspectDetails({ row }) {
    const aspects = asScoreMap(row.aspects);
    const hasAny = Object.values(aspects).some((value) => asScore(value) !== null);

    if (!hasAny) {
        return (
            <p className="text-xs text-slate-500">
                {row.checkedAt
                    ? "This page was checked before SEO, AEO and GEO were scored separately. Check it again to see the details."
                    : "This page has not been checked yet."}
            </p>
        );
    }

    return (
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-3">
            {PILLARS.map((pillar) => (
                <div key={pillar.key} className="space-y-2">
                    <p className="flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                        {pillar.name}
                        <ScoreBadge score={row.pillars?.[pillar.key]} />
                    </p>
                    {pillar.aspects.map((aspect) => (
                        <ScoreBar key={aspect.key} label={aspect.name} score={aspects[aspect.key]} />
                    ))}
                </div>
            ))}
        </div>
    );
}

function PageRow({ row, open, onToggle, columns }) {
    const problem = loadProblem(row.status, row.timedOut);
    const overall = scoreOf(row, "overall");
    const detailsId = `seo-row-${row.path}`;

    return (
        <>
            <tr className={`border-t border-slate-100 align-top ${open ? "bg-slate-50" : ""}`}>
                <td className="py-3 pl-3 pr-1">
                    <button
                        type="button"
                        onClick={onToggle}
                        aria-expanded={open}
                        aria-controls={open ? detailsId : undefined}
                        aria-label={`${open ? "Hide" : "Show"} main aspects for ${row.path}`}
                        className="rounded p-1 text-slate-500 hover:bg-slate-200 hover:text-slate-900"
                    >
                        <Chevron open={open} />
                    </button>
                </td>
                <td className="px-2 py-3 text-center">
                    <ScoreBadge score={overall} empty={row.checkedAt ? "Check again" : "Not checked"} />
                    {problem && <span className="mt-1 block whitespace-nowrap text-xs font-semibold text-red-600">{problem}</span>}
                </td>
                {PILLARS.map((pillar) => (
                    <td key={pillar.key} className="px-2 py-3 text-center">
                        <ScoreBadge score={row.pillars?.[pillar.key]} title={`${pillar.name}: ${pillar.description}`} />
                    </td>
                ))}
                <td className="px-3 py-3">
                    <p className="line-clamp-2 font-semibold text-slate-900">{row.title || row.path}</p>
                    <p className="break-all text-xs text-slate-500">{row.path}</p>
                </td>
                <td className="px-3 py-3 text-slate-600">
                    <span className="whitespace-nowrap">{row.type}</span>
                    {row.edited && (
                        <span className="mt-1 block w-fit rounded bg-blue-50 px-1.5 py-0.5 text-[11px] font-semibold text-blue-700">Edited</span>
                    )}
                </td>
                <td className="px-3 py-3 text-xs text-slate-500">{row.checkedAt || "Never"}</td>
                <td className="whitespace-nowrap px-3 py-3 text-right">
                    <Link href={editHref(row.path)} className="font-semibold text-blue-700">
                        {row.path.startsWith("/blog-details/") ? "Blog editor" : "Edit"}
                    </Link>
                </td>
            </tr>
            {open && (
                <tr id={detailsId} className="bg-slate-50">
                    <td />
                    <td colSpan={columns - 1} className="px-3 pb-4 pt-1">
                        <AspectDetails row={row} />
                    </td>
                </tr>
            )}
        </>
    );
}

export default function SeoPagesTable({ rows: initialRows }) {
    const router = useRouter();
    const stopRef = useRef(false);

    const [rows, setRows] = useState(initialRows);
    const [type, setType] = useState("All");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState({ key: "overall", lowestFirst: true });
    const [below, setBelow] = useState("");
    const [expanded, setExpanded] = useState(() => new Set());
    const [running, setRunning] = useState(null);
    const [newPath, setNewPath] = useState("");

    const types = useMemo(() => ["All", ...new Set(initialRows.map((row) => row.type))], [initialRows]);

    const visible = useMemo(() => {
        const term = search.trim().toLowerCase();
        const direction = sort.lowestFirst ? 1 : -1;

        // Pages without a score count as lowest: first when lowest is first, last otherwise.
        const sortValue = (row) => scoreOf(row, sort.key) ?? -1;

        return rows
            .filter((row) => type === "All" || row.type === type)
            .filter((row) => !term || row.path.includes(term) || row.title.toLowerCase().includes(term))
            .filter((row) => {
                if (!below) return true;

                const score = scoreOf(row, below);

                return score !== null && score < 80;
            })
            .sort((a, b) => (sortValue(a) - sortValue(b)) * direction || a.path.localeCompare(b.path));
    }, [rows, type, search, sort, below]);

    function sortBy(key) {
        setSort((current) => (current.key === key ? { key, lowestFirst: !current.lowestFirst } : { key, lowestFirst: true }));
    }

    function toggle(path) {
        setExpanded((current) => {
            const next = new Set(current);

            if (next.has(path)) {
                next.delete(path);
            } else {
                next.add(path);
            }

            return next;
        });
    }

    async function runChecks(paths) {
        stopRef.current = false;
        setRunning({ done: 0, total: paths.length, failed: 0 });

        let failuresInARow = 0;

        for (let index = 0; index < paths.length; index += 1) {
            if (stopRef.current) {
                break;
            }

            // If the site cannot be reached, stop rather than fail 1,750 times.
            if (failuresInARow >= 5) {
                setRunning((current) => ({ ...current, stoppedEarly: true }));
                break;
            }

            try {
                const result = await checkPage(paths[index]);

                failuresInARow = 0;

                setRows((current) =>
                    current.map((row) =>
                        row.path === result.path
                            ? {
                                  ...row,
                                  score: result.score ?? null,
                                  pillars: result.pillars ?? null,
                                  aspects: result.aspects ?? null,
                                  title: result.title || row.title,
                                  status: result.status,
                                  timedOut: Boolean(result.timedOut),
                                  checkedAt: "just now",
                              }
                            : row
                    )
                );
            } catch (error) {
                failuresInARow += 1;
                setRunning((current) => ({ ...current, failed: current.failed + 1, lastError: error.message }));
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

    // Chevron, 4 scores, page, type, checked, edit.
    const columns = 9;
    const busy = running && !running.finished;

    return (
        <div className="mt-6 space-y-5">
            <Summary rows={rows} />

            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3">
                <select aria-label="Page type" value={type} onChange={(event) => setType(event.target.value)} className={controlClass}>
                    {types.map((item) => (
                        <option key={item}>{item}</option>
                    ))}
                </select>
                <select
                    aria-label="Sort by"
                    value={sort.key}
                    onChange={(event) => setSort((current) => ({ ...current, key: event.target.value }))}
                    className={controlClass}
                >
                    {SCORE_KEYS.map((item) => (
                        <option key={item.key} value={item.key}>
                            Sort by {item.name}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={() => setSort((current) => ({ ...current, lowestFirst: !current.lowestFirst }))}
                    className={`${controlClass} font-semibold`}
                >
                    {sort.lowestFirst ? "Lowest first" : "Highest first"}
                </button>
                <select aria-label="Show only pages below 80" value={below} onChange={(event) => setBelow(event.target.value)} className={controlClass}>
                    <option value="">All scores</option>
                    {SCORE_KEYS.map((item) => (
                        <option key={item.key} value={item.key}>
                            {item.name} below 80
                        </option>
                    ))}
                </select>
                <input
                    type="search"
                    value={search}
                    placeholder="Search address or title"
                    onChange={(event) => setSearch(event.target.value)}
                    className={`${controlClass} min-w-40 flex-1`}
                />
                {busy ? (
                    <button type="button" onClick={() => (stopRef.current = true)} className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white">
                        Stop ({running.done}/{running.total})
                    </button>
                ) : (
                    <button
                        type="button"
                        disabled={!visible.length}
                        onClick={() => runChecks(visible.map((row) => row.path))}
                        className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                    >
                        Check {visible.length} shown
                    </button>
                )}
            </div>

            {running && (
                <p className="text-sm text-slate-600">
                    {running.finished ? "Finished" : "Checking"} {running.done} of {running.total}
                    {running.failed ? `, ${running.failed} could not be checked` : ""}. One page at a time, so the site stays fast.
                    {running.stoppedEarly && <span className="block text-red-600">Stopped after 5 failures in a row.</span>}
                    {running.lastError && <span className="block text-red-600">Last problem: {running.lastError}</span>}
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
                <table className="w-full min-w-[860px] text-left text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                        <tr>
                            <th className="w-10 py-3 pl-3 pr-1">
                                <span className="sr-only">Details</span>
                            </th>
                            {SCORE_KEYS.map((item) => (
                                <SortHeader key={item.key} scoreKey={item.key} name={item.name} sort={sort} onSort={sortBy} />
                            ))}
                            <th className="px-3 py-3">Page</th>
                            <th className="px-3 py-3">Type</th>
                            <th className="px-3 py-3">Checked</th>
                            <th className="px-3 py-3" />
                        </tr>
                    </thead>
                    <tbody>
                        {visible.slice(0, LIST_LIMIT).map((row) => (
                            <PageRow key={row.path} row={row} open={expanded.has(row.path)} onToggle={() => toggle(row.path)} columns={columns} />
                        ))}
                    </tbody>
                </table>
                {!visible.length && <p className="px-4 py-6 text-center text-sm text-slate-500">No pages match these filters.</p>}
                {visible.length > LIST_LIMIT && (
                    <p className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
                        Showing the first {LIST_LIMIT} of {visible.length}. Use the type filter or search to narrow the list.
                    </p>
                )}
            </div>
        </div>
    );
}
