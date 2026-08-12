"use client";

import { useState } from "react";
import heroBg from "@/assets/university-course-details.png";

import {
    GraduationCap,
    MapPin,
    MoveRight,
} from "lucide-react";

export default function CourseDetailsHero({
    details,
    onApply,
}) {
    const [logoError, setLogoError] =
        useState(false);

    const {
        courseTitle,
        universityName,
        universityLogoUrl,
        locationName,
        level,
    } = details;

    return (
        <section
            className="relative mx-auto min-h-[400px] w-full overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${heroBg.src})`,
            }}
        >
            <div
                aria-hidden="true"
                className="absolute -left-24 -top-24 size-80 rounded-full bg-primary/10 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="absolute -bottom-32 right-0 size-96 rounded-full bg-secondary/10 blur-3xl"
            />

            <div
                className="relative mx-auto flex min-h-[420px] max-w-9xl items-center px-5 py-10 sm:px-8 lg:px-12"
            >
                <div className="max-w-3xl">
                    <div className="flex flex-wrap gap-3">
                        <div
                            className="inline-flex items-center gap-3 rounded-full bg-logoYellow px-4 py-2 text-xs font-bold text-black shadow-lg sm:text-sm"
                        >
                            <GraduationCap size={20} />

                            {level}
                        </div>

                        <button
                            type="button"
                            onClick={onApply}
                            className="inline-flex items-center gap-2 rounded-full bg-darkPrimary px-5 py-2 text-xs font-bold text-white shadow-lg transition hover:bg-primary sm:text-sm"
                        >
                            Apply Now

                            <MoveRight size={18} />
                        </button>
                    </div>

                    <h1
                        className="mt-8 max-w-3xl text-2xl font-extrabold leading-tight text-slate-950 sm:text-3xl lg:text-5xl"
                    >
                        {courseTitle}
                    </h1>

                    <div className="mt-5 h-1 w-20 rounded-full bg-primary" />

                    <div
                        className="mt-6 flex mb-8 max-w-2xl items-center gap-4 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm"
                    >
                        {universityLogoUrl &&
                            !logoError ? (
                            <img
                                src={universityLogoUrl}
                                alt={universityName}
                                className="size-16 rounded-xl border border-slate-100 bg-white object-contain p-2 shadow-md"
                                onError={() =>
                                    setLogoError(true)
                                }
                            />
                        ) : (
                            <div
                                className="grid size-16 shrink-0 place-content-center rounded-xl bg-darkPrimary text-white shadow-lg"
                            >
                                <GraduationCap size={30} />
                            </div>
                        )}

                        <div className="min-w-0">
                            <p
                                className="text-xs font-extrabold uppercase tracking-wider text-primary"
                            >
                                University
                            </p>

                            <h2
                                className="mt-1 text-base font-extrabold text-darkPrimary sm:text-lg"
                            >
                                {universityName}
                            </h2>

                            <p
                                className="mt-1 flex items-center gap-2 text-sm font-medium text-secondary"
                            >
                                <MapPin size={15} />

                                {locationName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}