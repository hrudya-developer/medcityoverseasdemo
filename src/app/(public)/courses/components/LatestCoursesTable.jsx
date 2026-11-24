
import Link from "next/link";
import {
    ArrowUpRight,
    BookOpen,
    GraduationCap,
    MapPin,
    Clock3,
    CalendarDays,
    Building2,
    Layers3,
} from "lucide-react";

import { getLatestCourses } from "@/lib/courseListing";

const NOT_RECORDED = "Not recorded";

/*
 * The most recently added courses, rendered on the server so the page
 * has a real list of courses before the interactive finder loads.
 * Every value comes from the course records; empty ones show
 * "Not recorded".
 */

export default async function LatestCoursesTable({
    className = "",
}) {
    const { total, courses } = await getLatestCourses(24);

    if (!courses.length) {
        return null;
    }

    return (
        <section
            aria-labelledby="latest-courses-heading"
            className={`relative mx-auto w-full max-w-[1500px] bg-[#f4faff] rounded-3xl p-12 ${className}`}
        >
            {/* Section heading */}
            <div className="mb-8 sm:mb-10">
                <div className="mb-5 flex items-center gap-2">
                    <span className="h-1.5 w-10 rounded-full bg-primary" />
                    <span className="h-1.5 w-4 rounded-full bg-logoYellow" />
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_8px_20px_rgba(192,31,83,0.18)] sm:h-14 sm:w-14">
                        <GraduationCap
                            size={26}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-[0.15em] text-primary">
                            Explore academic opportunities
                        </span>

                        <h2
                            id="latest-courses-heading"
                            className="text-[25px] font-black leading-tight tracking-tight text-[#071D49] sm:text-3xl lg:text-[38px]"
                        >
                            Recently added study abroad courses
                        </h2>
                    </div>
                </div>

                <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                    {Number.isFinite(total) && total > 0 && (
                        <>
                            {courses.length < total
                                ? `The ${courses.length} newest of the ${total.toLocaleString("en-IN")} courses listed on Medcity Overseas. Use the course finder above to search them all.`
                                : `All ${total.toLocaleString("en-IN")} courses currently listed on Medcity Overseas, newest first.`}{" "}
                        </>
                    )}
                    Open a course for its fees and entry requirements where we have recorded them.
                </p>
            </div>

            {/* Desktop and tablet table */}
            <div className="hidden overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)] md:block">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] border-collapse text-left text-sm">
                        <thead>
                            <tr className="bg-[#071D49] text-white">
                                <th
                                    scope="col"
                                    className="px-6 py-5 text-xs font-extrabold uppercase tracking-wider"
                                >
                                    Course
                                </th>

                                <th
                                    scope="col"
                                    className="px-5 py-5 text-xs font-extrabold uppercase tracking-wider"
                                >
                                    University
                                </th>

                                <th
                                    scope="col"
                                    className="px-5 py-5 text-xs font-extrabold uppercase tracking-wider"
                                >
                                    Country
                                </th>

                                <th
                                    scope="col"
                                    className="px-5 py-5 text-xs font-extrabold uppercase tracking-wider"
                                >
                                    Level
                                </th>

                                <th
                                    scope="col"
                                    className="px-5 py-5 text-xs font-extrabold uppercase tracking-wider"
                                >
                                    Duration
                                </th>

                                <th
                                    scope="col"
                                    className="px-6 py-5 text-xs font-extrabold uppercase tracking-wider"
                                >
                                    Intakes
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {courses.map((course, index) => (
                                <tr
                                    key={course.id}
                                    className={`group transition-colors duration-200 hover:bg-pink-50/40 ${
                                        index % 2 === 0
                                            ? "bg-white"
                                            : "bg-slate-50/50"
                                    }`}
                                >
                                    {/* Course */}
                                    <th
                                        scope="row"
                                        className="px-6 py-5 align-top"
                                    >
                                        <Link
                                            href={`/courses/${course.slug}`}
                                            className="inline-flex max-w-[260px] items-start gap-2 font-extrabold leading-relaxed text-[#071D49] transition-colors hover:text-primary"
                                        >
                                            <span className="break-words">
                                                {course.name ?? NOT_RECORDED}
                                            </span>

                                            <ArrowUpRight
                                                size={16}
                                                aria-hidden="true"
                                                className="mt-0.5 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                            />
                                        </Link>
                                    </th>

                                    {/* University */}
                                    <td className="px-5 py-5 align-top">
                                        <div className="flex max-w-[230px] items-start gap-2 text-slate-700">
                                            <Building2
                                                size={16}
                                                aria-hidden="true"
                                                className="mt-0.5 shrink-0 text-secondary"
                                            />
                                            <span className="break-words leading-relaxed">
                                                {course.university ?? NOT_RECORDED}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Country */}
                                    <td className="px-5 py-5 align-top">
                                        <div className="flex items-start gap-2 text-slate-700">
                                            <MapPin
                                                size={16}
                                                aria-hidden="true"
                                                className="mt-0.5 shrink-0 text-primary"
                                            />
                                            <span className="break-words leading-relaxed">
                                                {course.country ?? NOT_RECORDED}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Level */}
                                    <td className="px-5 py-5 align-top">
                                        <span className="inline-flex max-w-[170px] items-center rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold leading-relaxed text-secondary">
                                            {course.level ?? NOT_RECORDED}
                                        </span>
                                    </td>

                                    {/* Duration */}
                                    <td className="px-5 py-5 align-top">
                                        <div className="flex items-start gap-2 text-slate-700">
                                            <Clock3
                                                size={16}
                                                aria-hidden="true"
                                                className="mt-0.5 shrink-0 text-slate-400"
                                            />
                                            <span className="break-words leading-relaxed">
                                                {course.duration ?? NOT_RECORDED}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Intakes */}
                                    <td className="px-6 py-5 align-top">
                                        <div className="flex items-start gap-2 text-slate-700">
                                            <CalendarDays
                                                size={16}
                                                aria-hidden="true"
                                                className="mt-0.5 shrink-0 text-secondary"
                                            />
                                            <span className="break-words leading-relaxed">
                                                {course.intakes ?? NOT_RECORDED}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Bottom decorative accent */}
                <div
                    aria-hidden="true"
                    className="h-1 bg-gradient-to-r from-primary via-secondary to-primary"
                />
            </div>

            {/* Mobile course cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {courses.map((course) => (
                    <article
                        key={course.id}
                        className="group relative min-w-0 overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_14px_35px_rgba(15,23,42,0.10)]"
                    >
                        {/* Top accent */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-secondary"
                        />

                        {/* Course heading */}
                        <div className="flex min-w-0 items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                                <span className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-primary">
                                    <BookOpen
                                        size={14}
                                        aria-hidden="true"
                                    />
                                    Study abroad course
                                </span>

                                <h3 className="break-words text-lg font-black leading-snug text-[#071D49]">
                                    <Link
                                        href={`/courses/${course.slug}`}
                                        className="transition-colors hover:text-primary"
                                    >
                                        {course.name ?? NOT_RECORDED}
                                    </Link>
                                </h3>
                            </div>

                            <Link
                                href={`/courses/${course.slug}`}
                                aria-label={`View course: ${course.name ?? NOT_RECORDED}`}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-darkPrimary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                <ArrowUpRight
                                    size={20}
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>

                        {/* University */}
                        <div className="mt-4 flex min-w-0 items-start gap-2.5">
                            <Building2
                                size={17}
                                aria-hidden="true"
                                className="mt-0.5 shrink-0 text-secondary"
                            />
                            <p className="min-w-0 break-words text-sm font-semibold leading-relaxed text-slate-600">
                                {course.university ?? NOT_RECORDED}
                            </p>
                        </div>

                        {/* Course details */}
                        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 rounded-2xl bg-slate-50 p-4">
                            <div className="min-w-0">
                                <dt className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                    <MapPin
                                        size={14}
                                        aria-hidden="true"
                                        className="text-primary"
                                    />
                                    Country
                                </dt>
                                <dd className="mt-1.5 break-words text-sm font-bold text-[#071D49]">
                                    {course.country ?? NOT_RECORDED}
                                </dd>
                            </div>

                            <div className="min-w-0">
                                <dt className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                    <Layers3
                                        size={14}
                                        aria-hidden="true"
                                        className="text-secondary"
                                    />
                                    Level
                                </dt>
                                <dd className="mt-1.5 break-words text-sm font-bold text-[#071D49]">
                                    {course.level ?? NOT_RECORDED}
                                </dd>
                            </div>

                            <div className="min-w-0">
                                <dt className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                    <Clock3
                                        size={14}
                                        aria-hidden="true"
                                        className="text-primary"
                                    />
                                    Duration
                                </dt>
                                <dd className="mt-1.5 break-words text-sm font-bold text-[#071D49]">
                                    {course.duration ?? NOT_RECORDED}
                                </dd>
                            </div>

                            <div className="min-w-0">
                                <dt className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                    <CalendarDays
                                        size={14}
                                        aria-hidden="true"
                                        className="text-secondary"
                                    />
                                    Intakes
                                </dt>
                                <dd className="mt-1.5 break-words text-sm font-bold text-[#071D49]">
                                    {course.intakes ?? NOT_RECORDED}
                                </dd>
                            </div>
                        </dl>

                        {/* Bottom link */}
                        <Link
                            href={`/courses/${course.slug}`}
                            className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-primary transition-colors hover:text-darkPrimary"
                        >
                            View course details
                            <ArrowUpRight
                                size={17}
                                aria-hidden="true"
                                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}
