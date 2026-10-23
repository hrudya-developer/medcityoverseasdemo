"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import RichTextEditor from "./RichTextEditor";
import {
    countWords,
    META_DESCRIPTION_RANGE,
    META_TITLE_RANGE,
    runSeoChecks,
    scoreChecks,
    slugify,
    SUMMARY_WORD_RANGE,
} from "./seoChecks";
import { uploadImage } from "./uploadImage";

const SITE = "medcityoverseas.com";

const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-normal outline-none focus:border-blue-600";

const cardClass = "space-y-3 rounded-xl border border-slate-200 bg-white p-4";

function imageUrl(image, oldImageBase) {
    if (!image) {
        return "";
    }

    if (image.startsWith("/media/") || /^https?:\/\//i.test(image)) {
        return image;
    }

    // Older posts: a file name on the old server.
    return `${oldImageBase}${image}`;
}

function Counter({ value, range }) {
    const [min, max] = range;
    const tone = value === 0 ? "text-slate-400" : value < min || value > max ? "text-amber-600" : "text-green-700";

    return (
        <span className={`text-xs font-semibold ${tone}`}>
            {value} / {min}–{max}
        </span>
    );
}

function CheckIcon({ ok }) {
    if (ok === true) {
        return <span className="mt-0.5 h-3 w-3 shrink-0 rounded-full bg-green-500" aria-label="Done" />;
    }

    if (ok === "warn") {
        return <span className="mt-0.5 h-3 w-3 shrink-0 rounded-full bg-amber-400" aria-label="Could be better" />;
    }

    return <span className="mt-0.5 h-3 w-3 shrink-0 rounded-full border-2 border-slate-300" aria-label="To do" />;
}

function SeoScore({ form }) {
    // The checks read the post with the browser's HTML parser, so they
    // only run once the page is in the browser.
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    const checks = useMemo(() => (ready ? runSeoChecks(form) : []), [form, ready]);

    if (!ready) {
        return <div className={`${cardClass} h-40 animate-pulse`} />;
    }

    const score = scoreChecks(checks);
    const groups = [...new Set(checks.map((check) => check.group))];
    const tone = score >= 80 ? "bg-green-600" : score >= 50 ? "bg-amber-500" : "bg-red-500";

    return (
        <div className={cardClass}>
            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">SEO, AI answers and search</p>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold text-white ${tone}`}>{score}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full ${tone}`} style={{ width: `${score}%` }} />
            </div>

            {groups.map((group) => (
                <div key={group}>
                    <p className="mb-1 mt-3 text-xs font-bold uppercase tracking-wide text-slate-500">{group}</p>
                    <ul className="space-y-1.5">
                        {checks
                            .filter((check) => check.group === group)
                            .map((check) => (
                                <li key={check.id} className="flex gap-2 text-xs text-slate-700" title={check.tip || ""}>
                                    <CheckIcon ok={check.ok} />
                                    <span>
                                        {check.label}
                                        {check.tip && check.ok !== true && (
                                            <span className="block text-slate-400">{check.tip}</span>
                                        )}
                                    </span>
                                </li>
                            ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

function GooglePreview({ form }) {
    const title = (form.meta_title || form.title || "Post title").trim();
    const description =
        (form.meta_description || form.summary || "Add a meta description: it is what Google shows under the title.").trim();

    return (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Google preview</p>
            <p className="mt-1 truncate text-xs text-slate-600">
                {SITE} › blog-details › {form.slug || "post-address"}
            </p>
            <p className="mt-0.5 line-clamp-2 text-[17px] leading-snug text-[#1a0dab]">
                {title.length > 60 ? `${title.slice(0, 58)}…` : title} | Medcity Overseas
            </p>
            <p className="mt-0.5 line-clamp-3 text-xs leading-relaxed text-slate-600">
                {description.length > 160 ? `${description.slice(0, 157)}…` : description}
            </p>
        </div>
    );
}

export default function BlogForm({ id, initial, oldImageBase }) {
    const router = useRouter();
    const coverInput = useRef(null);
    const galleryInput = useRef(null);

    const isEdit = Boolean(id);

    const [form, setForm] = useState({
        title: initial?.title || "",
        slug: initial?.slug || "",
        blog: initial?.blog || "",
        date: initial?.date || "",
        duration: initial?.duration || "",
        status: initial?.status || "1",
        image: initial?.image || "",
        alt_text1: initial?.alt_text1 || "",
        link: initial?.link || "",
        meta_title: initial?.meta_title || "",
        meta_description: initial?.meta_description || "",
        focus_keyword: initial?.focus_keyword || "",
        summary: initial?.summary || "",
        faqs: initial?.faqs || [],
        gallery: initial?.gallery || [],
        author_name: initial?.author_name || "",
        reviewer_name: initial?.reviewer_name || "",
    });

    // New posts: the address follows the title until it is edited by hand.
    const [slugTouched, setSlugTouched] = useState(isEdit);
    const [editSlug, setEditSlug] = useState(!isEdit);

    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [error, setError] = useState("");

    const originalSlug = initial?.slug || "";

    function update(field, value) {
        setForm((current) => {
            const next = { ...current, [field]: value };

            if (field === "title" && !slugTouched) {
                next.slug = slugify(value);
            }

            return next;
        });
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

    async function chooseCover(event) {
        const file = event.target.files?.[0];

        event.target.value = "";

        if (!file) {
            return;
        }

        setUploading("cover");
        setError("");

        try {
            const image = await uploadImage(file);

            update("image", image.url);
        } catch (uploadError) {
            setError(uploadError.message);
        } finally {
            setUploading("");
        }
    }

    async function addGalleryPhotos(event) {
        const files = [...(event.target.files || [])];

        event.target.value = "";

        if (!files.length) {
            return;
        }

        setUploading("gallery");
        setError("");

        try {
            for (const file of files) {
                const image = await uploadImage(file);

                setForm((current) => ({
                    ...current,
                    gallery: [...current.gallery, { src: image.url, alt: "" }],
                }));
            }
        } catch (uploadError) {
            setError(uploadError.message);
        } finally {
            setUploading("");
        }
    }

    async function save(event) {
        event.preventDefault();
        setSaving(true);
        setError("");

        try {
            const response = await fetch(isEdit ? `/api/admin/blogs/${id}` : "/api/admin/blogs", {
                method: isEdit ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Could not save the post. Please try again.");
            }

            router.push("/admin/blogs?saved=1");
            router.refresh();
        } catch (saveError) {
            setError(saveError.message);
            setSaving(false);
        }
    }

    async function remove() {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        }

        setSaving(true);
        setError("");

        try {
            const response = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
            const result = await response.json().catch(() => ({}));

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Could not delete the post.");
            }

            router.push("/admin/blogs?deleted=1");
            router.refresh();
        } catch (deleteError) {
            setError(deleteError.message);
            setSaving(false);
            setConfirmDelete(false);
        }
    }

    const cover = imageUrl(form.image, oldImageBase);
    const summaryWords = countWords(form.summary);

    return (
        <form onSubmit={save} className="mt-6 grid gap-6 xl:grid-cols-[1fr_340px]">
            <div className="min-w-0 space-y-6">
                {/* TITLE + ADDRESS */}
                <div className={cardClass}>
                    <label className="block text-sm font-semibold">
                        <span className="flex items-center justify-between">
                            Title <Counter value={form.title.trim().length} range={[30, 70]} />
                        </span>
                        <input
                            required
                            maxLength={250}
                            value={form.title}
                            onChange={(event) => update("title", event.target.value)}
                            placeholder="e.g. Australia Student Visa Rules 2026: What Indian Students Need to Know"
                            className={`${inputClass} text-lg`}
                        />
                    </label>

                    <div className="text-sm font-semibold">
                        Web address
                        {editSlug ? (
                            <div className="mt-1 flex items-center rounded-lg border border-slate-300 bg-white focus-within:border-blue-600">
                                <span className="hidden whitespace-nowrap pl-3 text-xs font-normal text-slate-400 sm:inline">
                                    {SITE}/blog-details/
                                </span>
                                <input
                                    value={form.slug}
                                    maxLength={191}
                                    onChange={(event) => {
                                        setSlugTouched(true);
                                        setForm((current) => ({ ...current, slug: slugify(event.target.value) }));
                                    }}
                                    className="w-full rounded-lg px-2 py-2 font-normal outline-none"
                                />
                            </div>
                        ) : (
                            <div className="mt-1 flex flex-wrap items-center gap-3 font-normal">
                                <a
                                    href={`/blog-details/${form.slug}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="break-all text-sm text-blue-700 underline"
                                >
                                    {SITE}/blog-details/{form.slug}
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setEditSlug(true)}
                                    className="text-xs font-semibold text-slate-500 underline"
                                >
                                    Change
                                </button>
                            </div>
                        )}
                        {isEdit && form.slug !== originalSlug && (
                            <p className="mt-1 text-xs font-normal text-amber-700">
                                The old address will keep working and send visitors to the new one.
                            </p>
                        )}
                        <p className="mt-1 text-xs font-normal text-slate-400">
                            Short and keyword-rich, e.g. australia-student-visa-rules-2026. Editing the title later does
                            not change it.
                        </p>
                    </div>
                </div>

                {/* QUICK ANSWER */}
                <div className={cardClass}>
                    <label className="block text-sm font-semibold">
                        <span className="flex items-center justify-between">
                            Quick answer <Counter value={summaryWords} range={SUMMARY_WORD_RANGE} />
                        </span>
                        <span className="block text-xs font-normal text-slate-500">
                            Shown in a highlighted box at the top of the post. Answer the title&apos;s question in 2 or 3
                            sentences, with the key facts. Google and AI assistants quote answers like this.
                        </span>
                        <textarea
                            rows={4}
                            maxLength={1200}
                            value={form.summary}
                            onChange={(event) => update("summary", event.target.value)}
                            placeholder="From 2 October 2026, most Student visa applicants can no longer include partners or children, and most temporary visa holders must apply from outside Australia. PhD students and some scholarship holders are exempt."
                            className={inputClass}
                        />
                    </label>
                </div>

                {/* BODY */}
                <div className="text-sm font-semibold">
                    Post
                    <span className="mb-1 block text-xs font-normal text-slate-500">
                        Use H2 for main sections and H3 inside them. Questions make good headings. Add tables for
                        comparisons, and link to official sources and to other Medcity pages.
                    </span>
                    <RichTextEditor value={form.blog} onChange={(html) => update("blog", html)} />
                </div>

                {/* GALLERY */}
                <div className={cardClass}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <p className="text-sm font-semibold">Photo gallery (optional)</p>
                            <p className="text-xs text-slate-500">
                                Extra photos shown after the post. Each needs a short description.
                            </p>
                        </div>
                        <button
                            type="button"
                            disabled={Boolean(uploading)}
                            onClick={() => galleryInput.current?.click()}
                            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold disabled:opacity-60"
                        >
                            {uploading === "gallery" ? "Uploading..." : "Add photos"}
                        </button>
                        <input
                            ref={galleryInput}
                            type="file"
                            multiple
                            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                            className="hidden"
                            onChange={addGalleryPhotos}
                        />
                    </div>

                    {form.gallery.length > 0 && (
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {form.gallery.map((photo, index) => (
                                <div key={`${photo.src}-${index}`} className="rounded-lg border border-slate-200 p-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={imageUrl(photo.src, oldImageBase)}
                                        alt=""
                                        className="aspect-[4/3] w-full rounded-md object-cover"
                                    />
                                    <input
                                        value={photo.alt}
                                        maxLength={200}
                                        placeholder="Describe this photo"
                                        onChange={(event) => updateItem("gallery", index, "alt", event.target.value)}
                                        className={`${inputClass} text-sm ${photo.alt.trim() ? "" : "border-amber-400"}`}
                                    />
                                    <div className="mt-2 flex gap-1 text-xs">
                                        <button type="button" onClick={() => moveItem("gallery", index, -1)} className="rounded px-2 py-1 hover:bg-slate-100">
                                            ← Move
                                        </button>
                                        <button type="button" onClick={() => moveItem("gallery", index, 1)} className="rounded px-2 py-1 hover:bg-slate-100">
                                            Move →
                                        </button>
                                        <button type="button" onClick={() => removeItem("gallery", index)} className="ml-auto rounded px-2 py-1 text-red-600 hover:bg-red-50">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* FAQS */}
                <div className={cardClass}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <p className="text-sm font-semibold">FAQs</p>
                            <p className="text-xs text-slate-500">
                                Questions students actually ask, answered in 1 to 3 sentences. Shown at the end of the
                                post and marked up for Google and AI tools.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setForm((current) => ({ ...current, faqs: [...current.faqs, { question: "", answer: "" }] }))}
                            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold"
                        >
                            Add FAQ
                        </button>
                    </div>

                    {form.faqs.map((faq, index) => (
                        <div key={index} className="rounded-lg border border-slate-200 p-3">
                            <input
                                value={faq.question}
                                maxLength={300}
                                placeholder="Question, e.g. Can I bring my spouse on an Australian student visa in 2026?"
                                onChange={(event) => updateItem("faqs", index, "question", event.target.value)}
                                className={`${inputClass} font-semibold`}
                            />
                            <textarea
                                rows={3}
                                value={faq.answer}
                                maxLength={1500}
                                placeholder="Answer"
                                onChange={(event) => updateItem("faqs", index, "answer", event.target.value)}
                                className={`${inputClass} text-sm`}
                            />
                            <div className="mt-2 flex gap-1 text-xs">
                                <button type="button" onClick={() => moveItem("faqs", index, -1)} className="rounded px-2 py-1 hover:bg-slate-100">
                                    ↑ Up
                                </button>
                                <button type="button" onClick={() => moveItem("faqs", index, 1)} className="rounded px-2 py-1 hover:bg-slate-100">
                                    ↓ Down
                                </button>
                                <button type="button" onClick={() => removeItem("faqs", index)} className="ml-auto rounded px-2 py-1 text-red-600 hover:bg-red-50">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SIDEBAR */}
            <aside className="space-y-5">
                <div className={cardClass}>
                    <label className="block text-sm font-semibold">
                        Status
                        <select value={form.status} onChange={(event) => update("status", event.target.value)} className={inputClass}>
                            <option value="1">Published</option>
                            <option value="0">Draft (hidden from the website)</option>
                        </select>
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                        <label className="block text-sm font-semibold">
                            Date
                            <input type="date" value={form.date} onChange={(event) => update("date", event.target.value)} className={inputClass} />
                        </label>
                        <label className="block text-sm font-semibold">
                            Reading time
                            <input
                                value={form.duration}
                                maxLength={40}
                                placeholder="Auto"
                                onChange={(event) => update("duration", event.target.value)}
                                className={inputClass}
                            />
                        </label>
                    </div>

                    {initial?.updated_at && (
                        <p className="text-xs text-slate-500">Last updated {initial.updated_at}</p>
                    )}

                    <div className="flex flex-wrap gap-2 pt-1">
                        <button
                            type="submit"
                            disabled={saving || Boolean(uploading)}
                            className="rounded-lg bg-blue-700 px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                        <Link href="/admin/blogs" className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-100">
                            Cancel
                        </Link>
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}
                </div>

                <SeoScore form={form} />

                <div className={cardClass}>
                    <p className="text-sm font-semibold">Google listing</p>

                    <label className="block text-sm font-semibold">
                        Focus keyword
                        <input
                            value={form.focus_keyword}
                            maxLength={191}
                            placeholder="e.g. australia student visa 2026"
                            onChange={(event) => update("focus_keyword", event.target.value)}
                            className={inputClass}
                        />
                    </label>

                    <label className="block text-sm font-semibold">
                        <span className="flex items-center justify-between">
                            Meta title <Counter value={form.meta_title.trim().length} range={META_TITLE_RANGE} />
                        </span>
                        <input
                            value={form.meta_title}
                            maxLength={255}
                            placeholder="Leave empty to use the post title"
                            onChange={(event) => update("meta_title", event.target.value)}
                            className={inputClass}
                        />
                    </label>

                    <label className="block text-sm font-semibold">
                        <span className="flex items-center justify-between">
                            Meta description / excerpt
                            <Counter value={form.meta_description.trim().length} range={META_DESCRIPTION_RANGE} />
                        </span>
                        <textarea
                            rows={4}
                            value={form.meta_description}
                            maxLength={400}
                            placeholder="One or two sentences that make people click. Also shown on the blog list."
                            onChange={(event) => update("meta_description", event.target.value)}
                            className={inputClass}
                        />
                    </label>

                    <GooglePreview form={form} />
                </div>

                <div className={cardClass}>
                    <p className="text-sm font-semibold">
                        Cover image <span className="text-red-600">*</span>
                    </p>
                    <p className="-mt-2 text-xs text-slate-500">
                        Required. Used as the featured image and when the post is shared. Best size 1200 × 630.
                    </p>

                    {cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cover} alt="" className="aspect-[1200/630] w-full rounded-lg object-cover" />
                    ) : (
                        <div className="flex aspect-[1200/630] w-full items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 text-xs text-slate-500">
                            No cover image yet
                        </div>
                    )}

                    <button
                        type="button"
                        disabled={Boolean(uploading)}
                        onClick={() => coverInput.current?.click()}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold disabled:opacity-60"
                    >
                        {uploading === "cover" ? "Uploading..." : form.image ? "Replace" : "Upload cover"}
                    </button>

                    <input
                        ref={coverInput}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                        className="hidden"
                        onChange={chooseCover}
                    />

                    <label className="block text-sm font-semibold">
                        Cover description <span className="text-red-600">*</span>
                        <input
                            value={form.alt_text1}
                            maxLength={250}
                            placeholder="What the picture shows"
                            onChange={(event) => update("alt_text1", event.target.value)}
                            className={inputClass}
                        />
                    </label>
                </div>

                <div className={cardClass}>
                    <p className="text-sm font-semibold">Author</p>
                    <label className="block text-sm font-semibold">
                        Written by
                        <input
                            value={form.author_name}
                            maxLength={191}
                            placeholder="Name and role, e.g. Senior Study Abroad Counsellor"
                            onChange={(event) => update("author_name", event.target.value)}
                            className={inputClass}
                        />
                    </label>
                    <label className="block text-sm font-semibold">
                        Reviewed by (optional)
                        <input
                            value={form.reviewer_name}
                            maxLength={191}
                            placeholder="e.g. Visa team lead"
                            onChange={(event) => update("reviewer_name", event.target.value)}
                            className={inputClass}
                        />
                    </label>
                </div>

                <div className={cardClass}>
                    <label className="block text-sm font-semibold">
                        Button link (optional)
                        <input
                            type="url"
                            value={form.link}
                            placeholder="https://"
                            onChange={(event) => update("link", event.target.value)}
                            className={inputClass}
                        />
                    </label>
                    <p className="text-xs text-slate-500">Shown as a button at the end of the post.</p>
                </div>

                {isEdit && (
                    <button
                        type="button"
                        disabled={saving}
                        onClick={remove}
                        onBlur={() => setConfirmDelete(false)}
                        className={`w-full rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-60 ${
                            confirmDelete ? "bg-red-600 text-white" : "text-red-600 hover:bg-red-50"
                        }`}
                    >
                        {confirmDelete ? "Click again to delete for good" : "Delete post"}
                    </button>
                )}
            </aside>
        </form>
    );
}
