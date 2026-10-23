"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import RichTextEditor from "./RichTextEditor";
import { uploadImage } from "./uploadImage";

const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-normal outline-none focus:border-blue-600";

function coverUrl(image, oldImageBase) {
    if (!image) {
        return "";
    }

    if (image.startsWith("/media/") || /^https?:\/\//i.test(image)) {
        return image;
    }

    // Older posts: a file name on the old server.
    return `${oldImageBase}${image}`;
}

export default function BlogForm({ id, initial, oldImageBase }) {
    const router = useRouter();
    const coverInput = useRef(null);

    const [form, setForm] = useState({
        title: initial?.title || "",
        blog: initial?.blog || "",
        date: initial?.date || "",
        duration: initial?.duration || "",
        status: initial?.status || "1",
        image: initial?.image || "",
        alt_text1: initial?.alt_text1 || "",
        link: initial?.link || "",
    });

    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [error, setError] = useState("");

    const isEdit = Boolean(id);
    const titleChanged = isEdit && form.title.trim() !== (initial?.title || "").trim();

    function update(field, value) {
        setForm((current) => ({ ...current, [field]: value }));
    }

    async function chooseCover(event) {
        const file = event.target.files?.[0];

        event.target.value = "";

        if (!file) {
            return;
        }

        setUploading(true);
        setError("");

        try {
            const image = await uploadImage(file);

            update("image", image.url);
        } catch (uploadError) {
            setError(uploadError.message);
        } finally {
            setUploading(false);
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

    const preview = coverUrl(form.image, oldImageBase);

    return (
        <form onSubmit={save} className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
            <div className="min-w-0 space-y-5">
                <label className="block text-sm font-semibold">
                    Title
                    <input
                        required
                        maxLength={250}
                        value={form.title}
                        onChange={(event) => update("title", event.target.value)}
                        className={`${inputClass} text-lg`}
                    />
                </label>

                {titleChanged && (
                    <p className="-mt-3 text-xs text-amber-700">
                        The title sets the page address, so changing it changes the post's link. Links shared
                        before will stop working.
                    </p>
                )}

                <div className="text-sm font-semibold">
                    Post
                    <div className="mt-1">
                        <RichTextEditor value={form.blog} onChange={(html) => update("blog", html)} />
                    </div>
                </div>
            </div>

            <aside className="space-y-5">
                <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
                    <label className="block text-sm font-semibold">
                        Status
                        <select
                            value={form.status}
                            onChange={(event) => update("status", event.target.value)}
                            className={inputClass}
                        >
                            <option value="1">Published</option>
                            <option value="0">Draft (hidden from the website)</option>
                        </select>
                    </label>

                    <label className="block text-sm font-semibold">
                        Date
                        <input
                            type="date"
                            value={form.date}
                            onChange={(event) => update("date", event.target.value)}
                            className={inputClass}
                        />
                    </label>

                    <label className="block text-sm font-semibold">
                        Reading time
                        <input
                            value={form.duration}
                            maxLength={40}
                            placeholder="Worked out when you save"
                            onChange={(event) => update("duration", event.target.value)}
                            className={inputClass}
                        />
                    </label>

                    <div className="flex flex-wrap gap-2 pt-2">
                        <button
                            type="submit"
                            disabled={saving || uploading}
                            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                        <Link href="/admin/blogs" className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-100">
                            Cancel
                        </Link>
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}
                </div>

                <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold">Cover image</p>

                    {preview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={preview} alt="" className="aspect-video w-full rounded-lg object-cover" />
                    ) : (
                        <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-500">
                            No cover image
                        </div>
                    )}

                    <div className="flex gap-2">
                        <button
                            type="button"
                            disabled={uploading}
                            onClick={() => coverInput.current?.click()}
                            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold disabled:opacity-60"
                        >
                            {uploading ? "Uploading..." : form.image ? "Replace" : "Upload"}
                        </button>
                        {form.image && (
                            <button
                                type="button"
                                onClick={() => update("image", "")}
                                className="rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100"
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    <input
                        ref={coverInput}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                        className="hidden"
                        onChange={chooseCover}
                    />

                    <label className="block text-sm font-semibold">
                        Image description
                        <input
                            value={form.alt_text1}
                            maxLength={250}
                            placeholder="What the picture shows"
                            onChange={(event) => update("alt_text1", event.target.value)}
                            className={inputClass}
                        />
                    </label>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
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
                    <p className="mt-1 text-xs text-slate-500">Shown as a button at the end of the post.</p>
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
