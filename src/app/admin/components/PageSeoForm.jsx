"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { countWords, META_DESCRIPTION_RANGE, META_TITLE_RANGE, SUMMARY_WORD_RANGE } from "./seoChecks";
import { uploadImage } from "./uploadImage";

const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-normal outline-none focus:border-blue-600";

const cardClass = "space-y-3 rounded-xl border border-slate-200 bg-white p-4";

function Counter({ value, range }) {
    const [min, max] = range;
    const tone = value === 0 ? "text-slate-400" : value < min || value > max ? "text-amber-600" : "text-green-700";

    return <span className={`text-xs font-semibold ${tone}`}>{value} / {min}–{max}</span>;
}

function Dot({ ok }) {
    if (ok === true) return <span className="mt-0.5 h-3 w-3 shrink-0 rounded-full bg-green-500" />;
    if (ok === "warn") return <span className="mt-0.5 h-3 w-3 shrink-0 rounded-full bg-amber-400" />;

    return <span className="mt-0.5 h-3 w-3 shrink-0 rounded-full border-2 border-slate-300 bg-red-100" />;
}

function ScoreCard({ audit, onCheck, checking }) {
    const tone = !audit ? "bg-slate-400" : audit.score >= 80 ? "bg-green-600" : audit.score >= 50 ? "bg-amber-500" : "bg-red-500";
    const groups = audit ? [...new Set(audit.checks.map((check) => check.group))] : [];

    return (
        <div className={cardClass}>
            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Page score</p>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold text-white ${tone}`}>
                    {audit ? `${audit.score}%` : "Not checked"}
                </span>
            </div>

            {audit && (
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full ${tone}`} style={{ width: `${audit.score}%` }} />
                </div>
            )}

            <button
                type="button"
                disabled={checking}
                onClick={onCheck}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold disabled:opacity-60"
            >
                {checking ? "Checking the live page..." : "Check score now"}
            </button>

            {audit &&
                groups.map((group) => (
                    <div key={group}>
                        <p className="mb-1 mt-3 text-xs font-bold uppercase tracking-wide text-slate-500">{group}</p>
                        <ul className="space-y-1.5">
                            {audit.checks
                                .filter((check) => check.group === group)
                                .map((check) => (
                                    <li key={check.label} className="flex gap-2 text-xs text-slate-700">
                                        <Dot ok={check.ok} />
                                        <span>{check.label}</span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}

            {audit?.checkedAt && <p className="text-xs text-slate-400">Last checked {audit.checkedAt}</p>}
        </div>
    );
}

export default function PageSeoForm({ path, initial, audit: initialAudit, updated }) {
    const router = useRouter();
    const ogInput = useRef(null);
    const galleryInput = useRef(null);

    const [form, setForm] = useState(initial);
    const [audit, setAudit] = useState(initialAudit);
    const [saving, setSaving] = useState(false);
    const [checking, setChecking] = useState(false);
    const [uploading, setUploading] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    function update(field, value) {
        setForm((current) => ({ ...current, [field]: value }));
    }

    function updateItem(field, index, key, value) {
        setForm((current) => ({
            ...current,
            [field]: current[field].map((item, position) => (position === index ? { ...item, [key]: value } : item)),
        }));
    }

    function removeItem(field, index) {
        setForm((current) => ({ ...current, [field]: current[field].filter((_, position) => position !== index) }));
    }

    function moveItem(field, index, direction) {
        setForm((current) => {
            const list = [...current[field]];
            const target = index + direction;

            if (target < 0 || target >= list.length) {
                return current;
            }

            [list[index], list[target]] = [list[target], list[index]];

            return { ...current, [field]: list };
        });
    }

    async function check() {
        setChecking(true);
        setError("");

        try {
            const response = await fetch("/api/admin/seo/audit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path }),
            });
            const result = await response.json().catch(() => ({}));

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Could not check the page.");
            }

            setAudit({ score: result.score, checks: result.checks, checkedAt: "just now", title: result.title });
        } catch (checkError) {
            setError(checkError.message);
        } finally {
            setChecking(false);
        }
    }

    async function save(event) {
        event.preventDefault();
        setSaving(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch("/api/admin/seo/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, path }),
            });
            const result = await response.json().catch(() => ({}));

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Could not save.");
            }

            setMessage("Saved. Checking the live page...");
            router.refresh();
            await check();
            setMessage("Saved and re-checked.");
        } catch (saveError) {
            setError(saveError.message);
        } finally {
            setSaving(false);
        }
    }

    async function uploadOg(event) {
        const file = event.target.files?.[0];

        event.target.value = "";

        if (!file) return;

        setUploading("og");

        try {
            update("og_image", (await uploadImage(file)).url);
        } catch (uploadError) {
            setError(uploadError.message);
        } finally {
            setUploading("");
        }
    }

    async function addPhotos(event) {
        const files = [...(event.target.files || [])];

        event.target.value = "";

        if (!files.length) return;

        setUploading("gallery");

        try {
            for (const file of files) {
                const image = await uploadImage(file);

                setForm((current) => ({ ...current, gallery: [...current.gallery, { src: image.url, alt: "" }] }));
            }
        } catch (uploadError) {
            setError(uploadError.message);
        } finally {
            setUploading("");
        }
    }

    const summaryWords = countWords(form.summary);
    const previewTitle = form.meta_title || audit?.title?.replace(/\s*\|\s*Medcity Overseas$/, "") || "Page title";

    return (
        <form onSubmit={save} className="mt-6 grid gap-6 xl:grid-cols-[1fr_340px]">
            <div className="min-w-0 space-y-6">
                <div className={cardClass}>
                    <p className="text-sm font-semibold">Google listing</p>
                    <p className="-mt-2 text-xs text-slate-500">Leave a field empty to keep what the page already uses.</p>

                    <label className="block text-sm font-semibold">
                        Focus keyword
                        <input value={form.focus_keyword} maxLength={191} placeholder="e.g. study in uk from kerala" onChange={(event) => update("focus_keyword", event.target.value)} className={inputClass} />
                    </label>

                    <label className="block text-sm font-semibold">
                        <span className="flex items-center justify-between">
                            Meta title <Counter value={form.meta_title.trim().length} range={META_TITLE_RANGE} />
                        </span>
                        <input value={form.meta_title} maxLength={255} onChange={(event) => update("meta_title", event.target.value)} className={inputClass} />
                        <span className="text-xs font-normal text-slate-400">&quot;| Medcity Overseas&quot; is added after it, so keep this to 47 characters or fewer.</span>
                    </label>

                    <label className="block text-sm font-semibold">
                        <span className="flex items-center justify-between">
                            Meta description <Counter value={form.meta_description.trim().length} range={META_DESCRIPTION_RANGE} />
                        </span>
                        <textarea rows={3} value={form.meta_description} maxLength={400} onChange={(event) => update("meta_description", event.target.value)} className={inputClass} />
                    </label>

                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Google preview</p>
                        <p className="mt-1 truncate text-xs text-slate-600">medcityoverseas.com{path === "/" ? "" : path.replaceAll("/", " › ")}</p>
                        <p className="mt-0.5 line-clamp-2 text-[17px] leading-snug text-[#1a0dab]">{previewTitle} | Medcity Overseas</p>
                        <p className="mt-0.5 line-clamp-3 text-xs text-slate-600">{form.meta_description || "Uses the page's own description until you write one here."}</p>
                    </div>
                </div>

                <div className={cardClass}>
                    <label className="block text-sm font-semibold">
                        <span className="flex items-center justify-between">
                            Quick answer <Counter value={summaryWords} range={SUMMARY_WORD_RANGE} />
                        </span>
                        <span className="block text-xs font-normal text-slate-500">
                            Shown as an &quot;In short&quot; box near the end of the page. Two or three sentences answering what a student searching
                            for this page wants to know. AI tools quote answers like this.
                        </span>
                        <textarea rows={4} maxLength={1200} value={form.summary} onChange={(event) => update("summary", event.target.value)} className={inputClass} />
                    </label>
                </div>

                <div className={cardClass}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <p className="text-sm font-semibold">FAQs</p>
                            <p className="text-xs text-slate-500">Shown at the end of the page and marked up for Google and AI tools.</p>
                        </div>
                        <button type="button" onClick={() => update("faqs", [...form.faqs, { question: "", answer: "" }])} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold">
                            Add FAQ
                        </button>
                    </div>

                    {form.faqs.map((faq, index) => (
                        <div key={index} className="rounded-lg border border-slate-200 p-3">
                            <input value={faq.question} maxLength={300} placeholder="Question" onChange={(event) => updateItem("faqs", index, "question", event.target.value)} className={`${inputClass} font-semibold`} />
                            <textarea rows={3} value={faq.answer} maxLength={1500} placeholder="Answer" onChange={(event) => updateItem("faqs", index, "answer", event.target.value)} className={`${inputClass} text-sm`} />
                            <div className="mt-2 flex gap-1 text-xs">
                                <button type="button" onClick={() => moveItem("faqs", index, -1)} className="rounded px-2 py-1 hover:bg-slate-100">↑ Up</button>
                                <button type="button" onClick={() => moveItem("faqs", index, 1)} className="rounded px-2 py-1 hover:bg-slate-100">↓ Down</button>
                                <button type="button" onClick={() => removeItem("faqs", index)} className="ml-auto rounded px-2 py-1 text-red-600 hover:bg-red-50">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={cardClass}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <p className="text-sm font-semibold">Photos</p>
                            <p className="text-xs text-slate-500">A photo section shown near the end of the page. Each photo needs a short description.</p>
                        </div>
                        <button type="button" disabled={Boolean(uploading)} onClick={() => galleryInput.current?.click()} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold disabled:opacity-60">
                            {uploading === "gallery" ? "Uploading..." : "Add photos"}
                        </button>
                        <input ref={galleryInput} type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif,image/gif" className="hidden" onChange={addPhotos} />
                    </div>

                    {form.gallery.length > 0 && (
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {form.gallery.map((photo, index) => (
                                <div key={`${photo.src}-${index}`} className="rounded-lg border border-slate-200 p-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={photo.src} alt="" className="aspect-[4/3] w-full rounded-md object-cover" />
                                    <input value={photo.alt} maxLength={200} placeholder="Describe this photo" onChange={(event) => updateItem("gallery", index, "alt", event.target.value)} className={`${inputClass} text-sm ${photo.alt.trim() ? "" : "border-amber-400"}`} />
                                    <div className="mt-2 flex gap-1 text-xs">
                                        <button type="button" onClick={() => moveItem("gallery", index, -1)} className="rounded px-2 py-1 hover:bg-slate-100">← Move</button>
                                        <button type="button" onClick={() => moveItem("gallery", index, 1)} className="rounded px-2 py-1 hover:bg-slate-100">Move →</button>
                                        <button type="button" onClick={() => removeItem("gallery", index)} className="ml-auto rounded px-2 py-1 text-red-600 hover:bg-red-50">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <aside className="space-y-5">
                <div className={cardClass}>
                    <button type="submit" disabled={saving || Boolean(uploading)} className="w-full rounded-lg bg-blue-700 px-5 py-2 text-sm font-semibold text-white disabled:opacity-60">
                        {saving ? "Saving..." : "Save"}
                    </button>
                    {message && <p className="text-sm text-green-700">{message}</p>}
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    {updated && <p className="text-xs text-slate-400">Last saved {updated}</p>}
                </div>

                <ScoreCard audit={audit} onCheck={check} checking={checking} />

                <div className={cardClass}>
                    <p className="text-sm font-semibold">Share image</p>
                    <p className="-mt-2 text-xs text-slate-500">Shown when the page is shared on WhatsApp, Facebook or LinkedIn. Best size 1200 × 630.</p>
                    {form.og_image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={form.og_image} alt="" className="aspect-[1200/630] w-full rounded-lg object-cover" />
                    ) : (
                        <div className="flex aspect-[1200/630] items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 text-xs text-slate-500">
                            Uses the page&apos;s own image
                        </div>
                    )}
                    <div className="flex gap-2">
                        <button type="button" disabled={Boolean(uploading)} onClick={() => ogInput.current?.click()} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold disabled:opacity-60">
                            {uploading === "og" ? "Uploading..." : form.og_image ? "Replace" : "Upload"}
                        </button>
                        {form.og_image && (
                            <button type="button" onClick={() => update("og_image", "")} className="rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100">
                                Remove
                            </button>
                        )}
                    </div>
                    <input ref={ogInput} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" className="hidden" onChange={uploadOg} />
                    <label className="block text-sm font-semibold">
                        Image description
                        <input value={form.og_image_alt} maxLength={250} placeholder="What the picture shows" onChange={(event) => update("og_image_alt", event.target.value)} className={inputClass} />
                    </label>
                </div>
            </aside>
        </form>
    );
}
