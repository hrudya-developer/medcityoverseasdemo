"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function UniversityDetailsError({
    error,
    reset,
}) {
    return (
        <main className="grid min-h-[70vh] place-items-center bg-[#f7f9fd] px-4">
            <section className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-xl">
                <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
                    <AlertTriangle
                        className="size-8"
                        aria-hidden="true"
                    />
                </div>

                <h2 className="mt-5 text-2xl font-black text-darkPrimary">
                    Unable to load university
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                    {error?.message ||
                        "Something went wrong while loading the university details."}
                </p>

                <button
                    type="button"
                    onClick={() => reset()}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-white transition hover:bg-darkPrimary"
                >
                    <RefreshCw
                        className="size-4"
                        aria-hidden="true"
                    />

                    Try Again
                </button>
            </section>
        </main>
    );
}