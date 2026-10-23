"use client";

import { CHECK_BY_ID, CHECKS, PILLARS, resultOf, scoreResults } from "@/lib/seoCheckDefs";

import { asScore, loadProblem, ScoreBadge, ScoreBar } from "./seoScoreParts";

const RESULT_TEXT = { pass: "Passed", warn: "Could be better", fail: "Needs fixing" };

function ResultIcon({ result }) {
    const tone = {
        pass: "bg-green-100 text-green-700",
        warn: "bg-amber-100 text-amber-700",
        fail: "bg-red-100 text-red-600",
    }[result];

    return (
        <span className={`mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${tone}`}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" className="h-2.5 w-2.5">
                {result === "pass" && <path d="M3.5 8.5l3 3 6-7" />}
                {result === "warn" && <path d="M8 3.5v5.5M8 12.5v.01" />}
                {result === "fail" && <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />}
            </svg>
            <span className="sr-only">{RESULT_TEXT[result]}</span>
        </span>
    );
}

function CheckItem({ check, result }) {
    const outcome = resultOf(result.ok);

    return (
        <li className="flex gap-2 text-xs">
            <ResultIcon result={outcome} />
            <span className="min-w-0">
                <span className={outcome === "pass" ? "text-slate-600" : "font-semibold text-slate-800"}>{result.label || check.name}</span>
                {outcome !== "pass" && <span className="block text-slate-500">{check.hint}</span>}
            </span>
        </li>
    );
}

function PillarCard({ pillar, scores, results, emptyLabel }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-bold">{pillar.name}</p>
                    <p className="text-xs text-slate-500">{pillar.description}</p>
                </div>
                <ScoreBadge score={scores.pillars[pillar.key]} empty={emptyLabel} className="text-sm" />
            </div>

            <div className="mt-4 space-y-4">
                {pillar.aspects.map((aspect) => {
                    const checks = CHECKS.filter((check) => check.aspect === aspect.key && results.has(check.id));

                    return (
                        <div key={aspect.key} className="space-y-2">
                            <ScoreBar label={aspect.name} score={scores.aspects[aspect.key]} />
                            {checks.length > 0 && (
                                <ul className="space-y-1.5 pl-0.5">
                                    {checks.map((check) => (
                                        <CheckItem key={check.id} check={check} result={results.get(check.id)} />
                                    ))}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/** Pillar and aspect scores: the server's breakdown, else worked out from the checks. */
function scoresFor(audit, checks) {
    const computed = scoreResults(checks, Number(audit?.status) || 200);
    const given = audit?.breakdown;
    const pick = (fromServer, fromChecks) => asScore(fromServer) ?? asScore(fromChecks);

    return {
        overall: pick(given?.overall, computed.overall),
        pillars: Object.fromEntries(PILLARS.map((pillar) => [pillar.key, pick(given?.pillars?.[pillar.key], computed.pillars[pillar.key])])),
        aspects: Object.fromEntries(
            Object.keys(computed.aspects).map((key) => [key, pick(given?.aspects?.[key], computed.aspects[key])])
        ),
    };
}

/**
 * The page's latest check: one card each for SEO, AEO and GEO with their
 * main aspects and every check under them.
 */
export default function SeoAuditPanel({ audit, checking, error, onCheck }) {
    const checks = Array.isArray(audit?.checks) ? audit.checks : [];
    const results = new Map(checks.filter((check) => CHECK_BY_ID[check?.id]).map((check) => [check.id, check]));
    const scores = scoresFor(audit, checks);
    const problem = audit ? loadProblem(audit.status, audit.timedOut) : "";
    const emptyLabel = audit ? "Check again" : "Not checked";
    const needsNewCheck = Boolean(audit) && scores.overall === null;

    return (
        <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center gap-3">
                <div className="mr-auto">
                    <p className="text-sm font-semibold">Page scores</p>
                    <p className="text-xs text-slate-500">
                        {audit?.checkedAt ? `Last checked ${audit.checkedAt}` : "This page has not been checked yet."}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Overall</span>
                    <ScoreBadge score={scores.overall} empty={emptyLabel} className="text-sm" />
                </div>
                <button
                    type="button"
                    disabled={checking}
                    onClick={onCheck}
                    className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                    {checking ? "Checking the live page..." : "Check this page now"}
                </button>
            </div>

            {problem && (
                <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                    {audit.timedOut
                        ? "The page took too long to load (Timed out), so every score is 1%. Check again in a few minutes."
                        : `The page did not load (${problem}), so every score is 1%.`}
                </p>
            )}

            {needsNewCheck && (
                <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
                    This page was checked before SEO, AEO and GEO were scored separately. Check it again to see the new scores.
                </p>
            )}

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
                {PILLARS.map((pillar) => (
                    <PillarCard key={pillar.key} pillar={pillar} scores={scores} results={results} emptyLabel={emptyLabel} />
                ))}
            </div>
        </section>
    );
}
