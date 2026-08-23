"use client";

import Link from "next/link";

import cn from "@/lib/cn";
import { createSlug } from "@/lib/slug";

import {
    ArrowRight,
    BookOpen,
    Clock,
    Globe2,
    GraduationCap,
    Sparkles,
    Wallet,
} from "lucide-react";

export default function UniversityCourseCard({
    course,
    universityName,
}) {
    if (!course) return null;

    const courseId =
        course?.id ||
        course?.course_id ||
        course?.cid ||
        course?.uc_id ||
        "";

    const courseName =
        course?.course ||
        course?.course_name ||
        course?.title ||
        course?.name ||
        "Course";

    const displayUniversity =
        course?.university ||
        course?.university_name ||
        universityName ||
        "University";

    const level =
        course?.level ||
        course?.study_level ||
        course?.course_level ||
        course?.qualification ||
        "Not available";

    const duration =
        course?.duration ||
        course?.course_duration ||
        "Not available";

    const fees =
        course?.fee ||
        course?.fees ||
        course?.tuition_fee ||
        course?.course_fee ||
        "Not available";

    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_26px_70px_rgba(192,31,83,0.16)]">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 blur-3xl transition duration-500 group-hover:bg-primary/20"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -left-16 size-44 rounded-full bg-secondary/10 blur-3xl"
            />

            <div className="relative flex h-full flex-col p-6 sm:p-7">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-darkPrimary text-white shadow-lg shadow-primary/20 transition duration-300 group-hover:rotate-3 group-hover:scale-105">
                        <BookOpen
                            className="size-7"
                            aria-hidden="true"
                        />
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-primary">
                        <Sparkles
                            className="size-3.5"
                            aria-hidden="true"
                        />

                        Featured
                    </span>
                </div>

                <div className="mb-5">
                    <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-secondary">
                        Study Program
                    </p>

                    <h3 className="line-clamp-3 text-xl font-black leading-snug text-darkPrimary transition-colors duration-300 group-hover:text-primary">
                        {courseName}
                    </h3>
                </div>

                <div className="grid gap-3">
                    <InfoLine
                        icon={Globe2}
                        label="University"
                        value={displayUniversity}
                    />

                    <div className="grid gap-3 sm:grid-cols-2">
                        <InfoLine
                            icon={GraduationCap}
                            label="Level"
                            value={level}
                            compact
                        />

                        <InfoLine
                            icon={Clock}
                            label="Duration"
                            value={duration}
                            compact
                        />
                    </div>

                    <FeeLine value={fees} />
                </div>

                <div className="mt-auto pt-6">
                    {courseId ? (
                        <Link
                            href={`/courses/${createSlug(courseName)}`}
                            className="group/link inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-darkPrimary to-primary px-5 py-4 text-sm font-black text-white shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            View Course

                            <span className="grid size-8 place-items-center rounded-full bg-white/15 transition duration-300 group-hover/link:translate-x-1 group-hover/link:bg-white group-hover/link:text-primary">
                                <ArrowRight
                                    className="size-4"
                                    aria-hidden="true"
                                />
                            </span>
                        </Link>
                    ) : (
                        <button
                            type="button"
                            disabled
                            className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-5 py-4 text-sm font-black text-slate-400"
                        >
                            Details unavailable
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}

function InfoLine({
    icon: Icon,
    label,
    value,
    compact = false,
}) {
    return (
        <div
            className={cn(`group/info flex items-start gap-3 rounded-2xl border border-slate-100 bg-[#f8f9fc] transition duration-300 hover:border-primary/15 hover:bg-primary/[0.035] ${compact ? "p-3.5" : "p-4"
                }`)}
        >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-sm ring-1 ring-slate-100 transition duration-300 group-hover/info:bg-primary group-hover/info:text-white">
                <Icon
                    className="size-4.5"
                    aria-hidden="true"
                />
            </span>

            <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                    {label}
                </p>

                <p className="mt-1 line-clamp-2 break-words text-sm font-bold leading-6 text-[#081c47]">
                    {value}
                </p>
            </div>
        </div>
    );
}

function FeeLine({ value }) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-r from-primary/[0.07] via-white to-secondary/[0.07] p-4">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 size-20 rounded-full bg-primary/10 blur-2xl"
            />

            <div className="relative flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                    <Wallet
                        className="size-5"
                        aria-hidden="true"
                    />
                </span>

                <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                        Tuition Fees
                    </p>

                    <p className="mt-1 break-words text-base font-black text-darkPrimary">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}