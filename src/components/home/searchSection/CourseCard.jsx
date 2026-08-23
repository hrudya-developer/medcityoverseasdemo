import Link from "next/link";

import {
    ArrowRight,
    BookOpen,
    GraduationCap,
    MapPin,
    School,
    Sparkles,
} from "lucide-react";

import CourseDetailItem from "./CourseDetailItem";
import { createSlug } from "@/lib/slug";

import {
    getCountryName,
    getCourseId,
    getCourseName,
    getStudyLevel,
    getUniversityName,
} from "./utils/courseHelpers";

export default function CourseCard({
    course,
    position,
}) {
    const courseId = getCourseId(course);
    const courseName = getCourseName(course);
    const universityName =
        getUniversityName(course);
    const countryName =
        getCountryName(course);
    const studyLevel =
        getStudyLevel(course);

    return (
        <article
            className="group relative flex min-h-[400px] flex-col overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_24px_55px_rgba(99,26,51,0.14)] sm:p-6"
        >
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-[#e1477c] to-secondary"
            />

            <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 size-40 rounded-full bg-primary/[0.055] transition-transform duration-500 group-hover:scale-125"
            />

            <div
                className="relative flex items-center justify-between gap-4"
            >
                <span
                    className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.13em] text-primary"
                >
                    <Sparkles size={13} />
                    Study Program
                </span>

                <span
                    className="grid size-10 shrink-0 place-content-center rounded-xl border border-slate-200 bg-white text-xs font-black text-slate-500 shadow-sm"
                >
                    {String(
                        position || 1
                    ).padStart(2, "0")}
                </span>
            </div>

            <div
                className="relative mt-5 flex items-start gap-3"
            >
                <span
                    className="grid size-12 shrink-0 place-content-center rounded-2xl bg-gradient-to-br from-primary to-darkPrimary text-white shadow-[0_10px_24px_rgba(192,31,83,0.22)]"
                >
                    <GraduationCap
                        aria-hidden="true"
                        size={23}
                    />
                </span>

                <h2
                    className="line-clamp-3 min-h-[72px] pt-1 text-lg font-black leading-6 text-darkPrimary transition-colors group-hover:text-primary"
                >
                    {courseName}
                </h2>
            </div>

            {studyLevel && (
                <div
                    className="relative mt-4 inline-flex w-fit items-center gap-2 rounded-xl bg-logoYellow/20 px-3 py-2 text-xs font-extrabold text-darkPrimary"
                >
                    <BookOpen
                        aria-hidden="true"
                        size={14}
                    />

                    {studyLevel}
                </div>
            )}

            <div
                className="relative mt-5 space-y-3"
            >
                <CourseDetailItem
                    icon={School}
                    label="University"
                    value={universityName}
                    iconClassName="
                        bg-secondary/10
                        text-secondary
                    "
                />

                <CourseDetailItem
                    icon={MapPin}
                    label="Destination"
                    value={countryName}
                    iconClassName="
                        bg-primary/10
                        text-primary
                    "
                />
            </div>

            <div
                className="relative mt-auto border-t border-slate-100 pt-5"
            >
                {courseId ? (
                    <Link
                        href={`/courses/${createSlug(courseName)}`}
                        className="group/button flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-darkPrimary to-primary px-5 text-sm font-bold text-white shadow-[0_12px_25px_rgba(192,31,83,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_17px_32px_rgba(99,26,51,0.27)]"
                    >
                        View Course

                        <ArrowRight
                            aria-hidden="true"
                            size={17}
                            className="transition-transform group-hover/button:translate-x-1"
                        />
                    </Link>
                ) : (
                    <button
                        type="button"
                        disabled
                        className="flex min-h-12 w-full items-center justify-center rounded-xl bg-slate-200 text-sm font-bold text-slate-500"
                    >
                        Details unavailable
                    </button>
                )}
            </div>
        </article>
    );
}