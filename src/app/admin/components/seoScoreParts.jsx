/*
 * Small building blocks for showing SEO, AEO and GEO scores in the
 * admin. Any score may be null or undefined (not checked yet, or checked
 * before the pillar scores existed); both mean "no score".
 */

import { scoreTone } from "@/lib/seoCheckDefs";

/** A score as a number, or null when there is none. */
export function asScore(value) {
    if (value === null || value === undefined || value === "") {
        return null;
    }

    const number = Number(value);

    return Number.isFinite(number) ? number : null;
}

/** An object of scores (it may arrive as JSON text from the database). */
export function asScoreMap(value) {
    if (!value) {
        return {};
    }

    if (typeof value === "string") {
        try {
            const parsed = JSON.parse(value);

            return parsed && typeof parsed === "object" ? parsed : {};
        } catch {
            return {};
        }
    }

    return typeof value === "object" ? value : {};
}

/** Rounded average of the scores that exist, or null. */
export function averageOf(values) {
    const scores = values.map(asScore).filter((value) => value !== null);

    return scores.length ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length) : null;
}

/** "Timed out", "Error 404" or "" for a page's last load. */
export function loadProblem(status, timedOut) {
    if (timedOut) {
        return "Timed out";
    }

    return status && Number(status) !== 200 ? `Error ${status}` : "";
}

export function barTone(score) {
    if (score === null) return "bg-slate-200";
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-amber-400";
    return "bg-red-500";
}

export function textTone(score) {
    if (score === null) return "text-slate-400";
    if (score >= 80) return "text-green-700";
    if (score >= 50) return "text-amber-700";
    return "text-red-600";
}

/** A coloured pill with a score, or a grey placeholder. */
export function ScoreBadge({ score, empty = "-", title, className = "" }) {
    const value = asScore(score);

    return (
        <span
            title={title ?? (value === null ? "No score yet" : undefined)}
            className={`inline-block min-w-12 whitespace-nowrap rounded-full px-2 py-1 text-center text-xs font-bold ${scoreTone(value)} ${className}`}
        >
            {value === null ? empty : `${value}%`}
        </span>
    );
}

/** A labelled score bar, e.g. "Technical ▓▓▓░ 72%". */
export function ScoreBar({ label, score }) {
    const value = asScore(score);

    return (
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1">
            <span className="truncate text-xs text-slate-600" title={label}>
                {label}
            </span>
            <span className={`text-xs font-bold tabular-nums ${textTone(value)}`}>{value === null ? "-" : `${value}%`}</span>
            <div className="col-span-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full ${barTone(value)}`} style={{ width: `${value ?? 0}%` }} />
            </div>
        </div>
    );
}
