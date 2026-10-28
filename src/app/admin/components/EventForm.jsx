"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import RichTextEditor from "./RichTextEditor";
import { slugify } from "./seoChecks";
import { uploadImage } from "./uploadImage";

const SITE = "medcityoverseas.com";

const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-normal outline-none focus:border-blue-600";

const cardClass = "space-y-3 rounded-xl border border-slate-200 bg-white p-4";

function previewable(poster) {
    return /^\/(?!\/)\S*$/.test(poster) || /^https:\/\/\S+$/i.test(poster);
}

/* Checks in the browser before saving. The server checks the same again. */
function problems(form) {
    if (form.title.trim().length < 3) {
        return "Please enter a title of at least 3 characters.";
    }

    if (!form.slug) {
        return "Please enter a web address using letters, numbers and hyphens.";
    }

    if (!form.startsAt) {
        return "Please choose the start date and time.";
    }

    const minutes = Number(form.durationMinutes);

    if (!Number.isInteger(minutes) || minutes < 5 || minutes > 1440) {
        return "The duration must be between 5 and 1440 minutes.";
    }

    if (form.mode === "offline" && !form.venue.trim()) {
        return "Please enter the venue for an offline event.";
    }

    if (form.poster.trim() && !previewable(form.poster.trim())) {
        return "The poster must be an uploaded image, a path on this site starting with /, or an https:// address.";
    }

    if (form.poster.trim() && !form.posterAlt.trim()) {
        return "Please describe the poster (what it shows), for people who cannot see it.";
    }

    return "";
}

function Toggle({ checked, onChange, label, help }) {
    return (
        <label className="flex items-start gap-3 text-sm">
            <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-blue-700"
            />
            <span>
                <span className="block font-semibold">{label}</span>
                {help && <span className="block text-xs text-slate-500">{help}</span>}
            </span>
        </label>
    );
}

export default function EventForm({ id, initial }) {
    const router = useRouter();
    const posterInput = useRef(null);

    const isEdit = Boolean(id);

    const [form, setForm] = useState({
        title: initial?.title || "",
        slug: initial?.slug || "",
        subtitle: initial?.subtitle || "",
        summary: initial?.summary || "",
        description: initial?.description || "",
        startsAt: initial?.startsAt || "",
        durationMinutes: String(initial?.durationMinutes ?? 60),
        mode: initial?.mode === "offline" ? "offline" : "online",
        venue: initial?.venue || "",
        poster: initial?.poster || "",
        posterAlt: initial?.posterAlt || "",
        contactPhone: initial?.contactPhone || "",
        popupEnabled: Boolean(initial?.popupEnabled),
        registrationOpen: initial?.registrationOpen !== false,
        published: Boolean(initial?.published),
    });

    // New events: the address follows the title until it is edited by hand.
    const [slugTouched, setSlugTouched] = useState(isEdit);

    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [error, setError] = useState("");

    const originalSlug = initial?.slug || "";

    function update(field, value) {
        setForm((current) => {
            const next = { ...current, [field]: value };

            if (field === "title" && !slugTouched) {
                next.slug = slugify(value).slice(0, 191);
            }

            return next;
        });
    }

    async function choosePoster(event) {
        const file = event.target.files?.[0];

        event.target.value = "";

        if (!file) {
            return;
        }

        setUploading(true);
        setError("");

        try {
            const image = await uploadImage(file);

            update("poster", image.url);
        } catch (uploadError) {
            setError(uploadError.message);
        } finally {
            setUploading(false);
        }
    }

    async function save(event) {
        event.preventDefault();

        const problem = problems(form);

        if (problem) {
            setError(problem);
            return;
        }

        setSaving(true);
        setError("");

        try {
            const response = await fetch(isEdit ? `/api/admin/events/${id}` : "/api/admin/events", {
                method: isEdit ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, durationMinutes: Number(form.durationMinutes) }),
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Could not save the event. Please try again.");
            }

            router.push("/admin/events?saved=1");
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
            const response = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
            const result = await response.json().catch(() => ({}));

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Could not delete the event.");
            }

            router.push("/admin/events?deleted=1");
            router.refresh();
        } catch (deleteError) {
            setError(deleteError.message);
            setSaving(false);
            setConfirmDelete(false);
        }
    }

    const poster = form.poster.trim();

    return (
        <form onSubmit={save} noValidate className="mt-6 grid gap-6 xl:grid-cols-[1fr_340px]">
            <div className="min-w-0 space-y-6">
                {/* TITLE + ADDRESS */}
                <div className={cardClass}>
                    <label className="block text-sm font-semibold">
                        Title <span className="text-red-600">*</span>
                        <input
                            required
                            maxLength={255}
                            value={form.title}
                            onChange={(event) => update("title", event.target.value)}
                            placeholder="e.g. UK Nursing Jobs 2027: Free Live Webinar"
                            className={`${inputClass} text-lg`}
                        />
                    </label>

                    <label className="block text-sm font-semibold">
                        Web address <span className="text-red-600">*</span>
                        <span className="mt-1 flex items-center rounded-lg border border-slate-300 bg-white focus-within:border-blue-600">
                            <span className="hidden whitespace-nowrap pl-3 text-xs font-normal text-slate-400 sm:inline">
                                {SITE}/events/
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
                        </span>
                    </label>
                    {isEdit && form.slug !== originalSlug && (
                        <p className="-mt-2 text-xs text-amber-700">
                            Links to the old address will stop working. Change it only before the event is shared.
                        </p>
                    )}
                    <p className="-mt-2 text-xs text-slate-400">
                        Letters, numbers and hyphens. Each event needs its own address.
                    </p>

                    <label className="block text-sm font-semibold">
                        Subtitle
                        <input
                            maxLength={255}
                            value={form.subtitle}
                            onChange={(event) => update("subtitle", event.target.value)}
                            placeholder="One line under the title"
                            className={inputClass}
                        />
                    </label>

                    <label className="block text-sm font-semibold">
                        Summary
                        <span className="block text-xs font-normal text-slate-500">
                            Two or three sentences. Used in the popup, in search results and when the link is shared.
                        </span>
                        <textarea
                            rows={3}
                            maxLength={2000}
                            value={form.summary}
                            onChange={(event) => update("summary", event.target.value)}
                            className={inputClass}
                        />
                    </label>
                </div>

                {/* DESCRIPTION */}
                <div className="text-sm font-semibold">
                    Description
                    <span className="mb-1 block text-xs font-normal text-slate-500">
                        What the event covers and who should attend. Use H2 for sections.
                    </span>
                    <RichTextEditor value={form.description} onChange={(html) => update("description", html)} />
                </div>
            </div>

            <aside className="space-y-6">
                <div className={cardClass}>
                    <Toggle
                        checked={form.published}
                        onChange={(value) => update("published", value)}
                        label="Published"
                        help="Shows the event page on the website."
                    />
                    <Toggle
                        checked={form.registrationOpen}
                        onChange={(value) => update("registrationOpen", value)}
                        label="Registration open"
                        help="Turn off to stop new registrations."
                    />
                    <Toggle
                        checked={form.popupEnabled}
                        onChange={(value) => update("popupEnabled", value)}
                        label="Show site-wide popup"
                        help="Invites visitors on every page to register, while the event is published, open and still ahead. If several events have it on, the soonest is shown."
                    />

                    <div className="flex flex-wrap gap-2 pt-1">
                        <button
                            type="submit"
                            disabled={saving || uploading}
                            className="rounded-lg bg-blue-700 px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                        <Link href="/admin/events" className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-100">
                            Cancel
                        </Link>
                    </div>

                    {error && (
                        <p role="alert" className="text-sm text-red-600">
                            {error}
                        </p>
                    )}
                </div>

                <div className={cardClass}>
                    <p className="text-sm font-semibold">When and where</p>

                    <label className="block text-sm font-semibold">
                        Starts (India time) <span className="text-red-600">*</span>
                        <input
                            type="datetime-local"
                            required
                            value={form.startsAt}
                            onChange={(event) => update("startsAt", event.target.value)}
                            className={inputClass}
                        />
                    </label>

                    <label className="block text-sm font-semibold">
                        Duration in minutes <span className="text-red-600">*</span>
                        <input
                            type="number"
                            min={5}
                            max={1440}
                            step={5}
                            value={form.durationMinutes}
                            onChange={(event) => update("durationMinutes", event.target.value)}
                            className={inputClass}
                        />
                    </label>

                    <fieldset className="text-sm">
                        <legend className="font-semibold">Mode</legend>
                        <div className="mt-1 flex gap-4">
                            {["online", "offline"].map((mode) => (
                                <label key={mode} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="mode"
                                        value={mode}
                                        checked={form.mode === mode}
                                        onChange={() => update("mode", mode)}
                                        className="accent-blue-700"
                                    />
                                    {mode === "online" ? "Online" : "Offline"}
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <label className="block text-sm font-semibold">
                        Venue {form.mode === "offline" && <span className="text-red-600">*</span>}
                        <input
                            maxLength={255}
                            value={form.venue}
                            onChange={(event) => update("venue", event.target.value)}
                            placeholder={form.mode === "offline" ? "Address of the venue" : "e.g. Online (live webinar)"}
                            className={inputClass}
                        />
                    </label>

                    <label className="block text-sm font-semibold">
                        Contact phone
                        <input
                            type="tel"
                            maxLength={32}
                            value={form.contactPhone}
                            onChange={(event) => update("contactPhone", event.target.value)}
                            placeholder="+91 90729 82555"
                            className={inputClass}
                        />
                    </label>
                </div>

                <div className={cardClass}>
                    <p className="text-sm font-semibold">Poster</p>
                    <p className="-mt-2 text-xs text-slate-500">
                        Upload an image, or enter a path on this site (/events/poster.webp) or an https:// address.
                    </p>

                    {poster && previewable(poster) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={poster} alt="" className="w-full rounded-lg border border-slate-200 object-contain" />
                    ) : (
                        <div className="flex aspect-[4/5] w-full items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 text-xs text-slate-500">
                            No poster yet
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            disabled={uploading}
                            onClick={() => posterInput.current?.click()}
                            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold disabled:opacity-60"
                        >
                            {uploading ? "Uploading..." : poster ? "Replace" : "Upload poster"}
                        </button>
                        {poster && (
                            <button
                                type="button"
                                onClick={() => update("poster", "")}
                                className="rounded-lg px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    <input
                        ref={posterInput}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                        className="hidden"
                        onChange={choosePoster}
                    />

                    <label className="block text-sm font-semibold">
                        Poster address
                        <input
                            maxLength={500}
                            value={form.poster}
                            onChange={(event) => update("poster", event.target.value)}
                            placeholder="/media/12"
                            className={inputClass}
                        />
                    </label>

                    <label className="block text-sm font-semibold">
                        Poster description {poster && <span className="text-red-600">*</span>}
                        <input
                            maxLength={255}
                            value={form.posterAlt}
                            placeholder="What the poster shows, including the date and title"
                            onChange={(event) => update("posterAlt", event.target.value)}
                            className={inputClass}
                        />
                    </label>
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
                        {confirmDelete
                            ? "Click again to delete the event and its registrations"
                            : "Delete event"}
                    </button>
                )}
                {isEdit && (
                    <p className="-mt-4 text-xs text-slate-500">
                        Deleting also removes its registrations. Download the CSV first if you need them.
                    </p>
                )}
            </aside>
        </form>
    );
}
