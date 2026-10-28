"use client";

import { useId, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";

import cn from "@/lib/cn";
import { isValidMobile } from "@/lib/phone";
import { CONTACT_WHATSAPP } from "@/lib/seoSchema";

import { markRegisteredFor } from "./eventStorage";

import "react-international-phone/style.css";

/*
 * Registration for one event, used inline on the event page and in the
 * site-wide popup. It posts JSON to /api/events/register:
 *   { event, name, phone, email, qualification, city, source, website }
 * where `website` is a hidden honeypot that people leave empty.
 */

/*
 * The phone field loads in the browser only, as in the counselling
 * form: its country list renders about 240 flag images without alt
 * text, which crawlers would read as part of the page.
 */
const PhoneInput = dynamic(
    () => import("react-international-phone").then((module) => module.PhoneInput),
    {
        ssr: false,
        loading: () => (
            <input
                type="tel"
                disabled
                aria-label="Mobile number"
                placeholder="+91"
                className="h-12 w-full rounded-xl border-0 bg-transparent px-3 text-base text-slate-800 outline-none"
            />
        ),
    }
);

export const QUALIFICATION_OPTIONS = [
    "GNM",
    "BSc Nursing",
    "Post Basic BSc",
    "MSc Nursing",
    "Nursing student",
    "Other",
];

const INITIAL = { name: "", email: "", qualification: "", city: "", website: "" };

const inputClass =
    "h-12 w-full rounded-xl border bg-white px-3.5 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm";

function FieldError({ id, message }) {
    if (!message) {
        return null;
    }

    return (
        <p id={id} className="mt-1.5 text-xs font-medium text-red-600">
            {message}
        </p>
    );
}

export default function EventRegistrationForm({ event, source = "page", compact = false, onSuccess }) {
    const uid = useId();
    const ids = {
        name: `${uid}-name`,
        phone: `${uid}-phone`,
        email: `${uid}-email`,
        qualification: `${uid}-qualification`,
        city: `${uid}-city`,
        website: `${uid}-website`,
    };

    const [form, setForm] = useState(INITIAL);
    const [mobile, setMobile] = useState("");
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(null);

    // Blocks a second send between a tap and the re-render that disables the button.
    const sendingRef = useRef(false);

    const update = (name, value) => {
        setForm((current) => ({ ...current, [name]: value }));
        setErrors((current) => (current[name] ? { ...current, [name]: "" } : current));
    };

    const validate = () => {
        const next = {};
        const digits = mobile.replace(/\D/g, "");

        if (form.name.trim().length < 2) {
            next.name = "Please enter your name.";
        }

        // The picker keeps the country code ("+91") in an empty field.
        if (digits.length <= 3) {
            next.phone = "Please enter your mobile number.";
        } else if (!isValidMobile(mobile)) {
            next.phone = digits.startsWith("91")
                ? "Indian mobile numbers have 10 digits starting 6 to 9. Outside India? Choose your country from the flag."
                : "Please enter a valid mobile number.";
        }

        if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            next.email = "Please enter a valid email address, or leave it empty.";
        }

        setErrors(next);

        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (submitEvent) => {
        submitEvent.preventDefault();

        if (sendingRef.current) {
            return;
        }

        setFormError("");

        if (!validate()) {
            return;
        }

        sendingRef.current = true;
        setSubmitting(true);

        let response;

        try {
            response = await fetch("/api/events/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    event: event.slug,
                    name: form.name.trim(),
                    phone: mobile,
                    email: form.email.trim(),
                    qualification: form.qualification,
                    city: form.city.trim(),
                    source: source === "popup" ? "popup" : "page",
                    website: form.website,
                }),
            });
        } catch {
            setFormError("We could not reach our server. Please check your internet connection and try again.");
            sendingRef.current = false;
            setSubmitting(false);

            return;
        }

        // A proxy or server error page is not JSON.
        const result = await response.json().catch(() => null);

        if (!response.ok || !result || result.success === false) {
            setFormError(
                result?.message ||
                    (response.status >= 500
                        ? "Something went wrong on our side. Please try again in a minute, or call us."
                        : "We could not complete your registration. Please check your details and try again.")
            );
            sendingRef.current = false;
            setSubmitting(false);

            return;
        }

        markRegisteredFor(event.slug);
        setDone({ alreadyRegistered: Boolean(result.alreadyRegistered) });
        setSubmitting(false);

        try {
            onSuccess?.(result);
        } catch (error) {
            console.error("Event registration onSuccess error:", error);
        }
    };

    if (done) {
        return (
            <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-slate-800">
                <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-emerald-600" aria-hidden="true" />
                    <p className="text-sm font-semibold leading-6 sm:text-base">
                        {done.alreadyRegistered
                            ? "You were already registered. We will send the joining link to your phone before the webinar."
                            : "You are registered. We will send the joining link to your phone before the webinar."}
                    </p>
                </div>

                <a
                    href={CONTACT_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1fa855] px-5 text-sm font-bold text-white transition hover:bg-[#178a45] focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 sm:w-auto"
                >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    Message us on WhatsApp
                </a>
            </div>
        );
    }

    const gap = compact ? "space-y-3.5" : "space-y-4";

    return (
        <form onSubmit={handleSubmit} noValidate className={cn("relative", gap)} aria-busy={submitting}>
            <div>
                <label htmlFor={ids.name} className="mb-1.5 block text-sm font-bold text-slate-800">
                    Name <span className="text-primary">*</span>
                </label>
                <input
                    id={ids.name}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={191}
                    value={form.name}
                    onChange={(changeEvent) => update("name", changeEvent.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? `${ids.name}-error` : undefined}
                    placeholder="Your full name"
                    className={cn(inputClass, errors.name ? "border-red-500" : "border-slate-200")}
                />
                <FieldError id={`${ids.name}-error`} message={errors.name} />
            </div>

            <div>
                <label htmlFor={ids.phone} className="mb-1.5 block text-sm font-bold text-slate-800">
                    Mobile number <span className="text-primary">*</span>
                </label>
                <div
                    className={cn(
                        "overflow-hidden rounded-xl border bg-white transition focus-within:ring-2 focus-within:ring-primary/20",
                        errors.phone ? "border-red-500" : "border-slate-200 focus-within:border-primary"
                    )}
                >
                    <PhoneInput
                        defaultCountry="in"
                        value={mobile}
                        onChange={(phone) => {
                            // A leading 0 typed after +91 is dropped, so it does not take a digit's place.
                            setMobile(phone.startsWith("+910") ? `+91${phone.slice(4)}` : phone);
                            setErrors((current) => (current.phone ? { ...current, phone: "" } : current));
                        }}
                        inputProps={{
                            id: ids.phone,
                            name: "phone",
                            autoComplete: "tel",
                            required: true,
                            "aria-invalid": Boolean(errors.phone),
                            "aria-describedby": errors.phone ? `${ids.phone}-error` : undefined,
                        }}
                        className="w-full"
                        inputClassName="!h-12 !w-full !border-0 !bg-transparent !text-base sm:!text-sm !text-slate-800 !outline-none"
                    />
                </div>
                <FieldError id={`${ids.phone}-error`} message={errors.phone} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor={ids.email} className="mb-1.5 block text-sm font-bold text-slate-800">
                        Email <span className="font-normal text-slate-500">(optional)</span>
                    </label>
                    <input
                        id={ids.email}
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        maxLength={191}
                        value={form.email}
                        onChange={(changeEvent) => update("email", changeEvent.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? `${ids.email}-error` : undefined}
                        placeholder="you@example.com"
                        className={cn(inputClass, errors.email ? "border-red-500" : "border-slate-200")}
                    />
                    <FieldError id={`${ids.email}-error`} message={errors.email} />
                </div>

                <div>
                    <label htmlFor={ids.qualification} className="mb-1.5 block text-sm font-bold text-slate-800">
                        Qualification
                    </label>
                    <select
                        id={ids.qualification}
                        name="qualification"
                        value={form.qualification}
                        onChange={(changeEvent) => update("qualification", changeEvent.target.value)}
                        className={cn(inputClass, "border-slate-200 pr-8", !form.qualification && "text-slate-400")}
                    >
                        <option value="">Choose one</option>
                        {QUALIFICATION_OPTIONS.map((option) => (
                            <option key={option} value={option} className="text-slate-800">
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor={ids.city} className="mb-1.5 block text-sm font-bold text-slate-800">
                    City <span className="font-normal text-slate-500">(optional)</span>
                </label>
                <input
                    id={ids.city}
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    maxLength={100}
                    value={form.city}
                    onChange={(changeEvent) => update("city", changeEvent.target.value)}
                    placeholder="e.g. Kochi"
                    className={cn(inputClass, "border-slate-200")}
                />
            </div>

            {/* Honeypot: hidden from people and screen readers, filled only by bots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                <label htmlFor={ids.website}>Website</label>
                <input
                    id={ids.website}
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(changeEvent) => update("website", changeEvent.target.value)}
                />
            </div>

            {formError && (
                <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
                    {formError}
                </p>
            )}

            <button
                type="submit"
                disabled={submitting}
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-darkPrimary px-6 py-3 text-base font-bold text-white shadow-[0_14px_30px_rgba(192,31,83,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(192,31,83,0.35)] focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
                {submitting ? "Registering..." : "Register now"}
                {!submitting && (
                    <Send className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                )}
            </button>

            <p className="text-center text-xs leading-5 text-slate-500">
                By registering, you agree to be contacted by Medcity Study Abroad about this event.
            </p>
        </form>
    );
}
