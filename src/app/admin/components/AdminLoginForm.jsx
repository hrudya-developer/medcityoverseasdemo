"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

async function postJson(url, body) {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.success === false) {
        throw new Error(result.message || "Something went wrong. Please try again.");
    }

    return result;
}

export default function AdminLoginForm() {
    const router = useRouter();

    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    async function sendCode(event) {
        event.preventDefault();
        setBusy(true);
        setError("");

        try {
            const result = await postJson("/api/admin/login/send", { email });

            setMessage(result.message);
            setStep("code");
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setBusy(false);
        }
    }

    async function verify(event) {
        event.preventDefault();
        setBusy(true);
        setError("");

        try {
            await postJson("/api/admin/login/verify", { email, code });

            router.replace("/admin/blogs");
            router.refresh();
        } catch (requestError) {
            setError(requestError.message);
            setBusy(false);
        }
    }

    return (
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-xl font-bold">Website admin</h1>
            <p className="mt-1 text-sm text-slate-500">medcityoverseas.com</p>

            {step === "email" ? (
                <form onSubmit={sendCode} className="mt-6 space-y-4">
                    <label className="block text-sm font-semibold">
                        Email
                        <input
                            type="email"
                            required
                            autoFocus
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal outline-none focus:border-blue-600"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={busy}
                        className="w-full rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white disabled:opacity-60"
                    >
                        {busy ? "Sending..." : "Email me a code"}
                    </button>
                </form>
            ) : (
                <form onSubmit={verify} className="mt-6 space-y-4">
                    <p className="text-sm text-slate-600">{message}</p>

                    <label className="block text-sm font-semibold">
                        Six-digit code
                        <input
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            pattern="\d{6}"
                            maxLength={6}
                            required
                            autoFocus
                            value={code}
                            onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-lg tracking-[0.4em] outline-none focus:border-blue-600"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={busy}
                        className="w-full rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white disabled:opacity-60"
                    >
                        {busy ? "Checking..." : "Sign in"}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setStep("email");
                            setCode("");
                            setError("");
                        }}
                        className="w-full text-sm text-slate-500 underline"
                    >
                        Use a different email
                    </button>
                </form>
            )}

            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </div>
    );
}
