"use client";

import { BookOpen } from "lucide-react";

export default function UniversityMainCourseTabs({
    courses = [],
    selectedMainCourseId,
    onSelectMainCourse,
}) {
    if (
        !Array.isArray(courses) ||
        courses.length === 0
    ) {
        return null;
    }

    return (
        <section
            aria-label="Main course categories"
            className="mb-8"
        >
            <div className="mb-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">
                    Course Categories
                </p>

                <h3 className="mt-1 text-xl font-black text-darkPrimary sm:text-2xl">
                    Select a main course
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Scroll horizontally to explore all
                    available course categories.
                </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"
                />

                <div
                    role="tablist"
                    aria-label="University main courses"
                    className="main-course-scroll relative flex gap-3 overflow-x-auto px-3 pb-4 pt-3"
                >
                    {courses.map(
                        (mainCourse, index) => {
                            const mainCourseId =
                                String(
                                    mainCourse?.id ??
                                    mainCourse?.c_id ??
                                    index
                                );

                            const isActive =
                                String(
                                    selectedMainCourseId
                                ) ===
                                mainCourseId;

                            const courseCount =
                                Array.isArray(
                                    mainCourse?.courses
                                )
                                    ? mainCourse
                                        .courses
                                        .length
                                    : Number(
                                        mainCourse?.courseCount ??
                                        mainCourse?.course_count ??
                                        0
                                    );

                            const mainCourseName =
                                mainCourse?.name ||
                                mainCourse?.main_course ||
                                mainCourse?.main_course_name ||
                                mainCourse?.category_name ||
                                "Main course";

                            return (
                                <button
                                    key={
                                        mainCourseId
                                    }
                                    type="button"
                                    role="tab"
                                    aria-selected={
                                        isActive
                                    }
                                    aria-controls="university-course-list"
                                    tabIndex={
                                        isActive
                                            ? 0
                                            : -1
                                    }
                                    onClick={() =>
                                        onSelectMainCourse?.(
                                            mainCourseId
                                        )
                                    }
                                    className={`group relative flex min-w-[220px] shrink-0 items-center gap-4 overflow-hidden rounded-2xl border px-4 py-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${isActive
                                            ? "border-primary bg-gradient-to-br from-primary via-[#b5164c] to-darkPrimary text-white shadow-xl shadow-primary/20"
                                            : "border-slate-200 bg-white text-darkPrimary hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/[0.04] hover:shadow-lg"
                                        }`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`pointer-events-none absolute -right-8 -top-8 size-24 rounded-full blur-2xl ${isActive
                                                ? "bg-white/15"
                                                : "bg-primary/10"
                                            }`}
                                    />

                                    <span
                                        aria-hidden="true"
                                        className={`relative grid size-12 shrink-0 place-items-center rounded-2xl border transition duration-300 ${isActive
                                                ? "border-white/20 bg-white/15 text-white shadow-inner"
                                                : "border-primary/10 bg-primary/10 text-primary group-hover:scale-105 group-hover:bg-primary group-hover:text-white"
                                            }`}
                                    >
                                        <BookOpen className="size-6" />
                                    </span>

                                    <span className="relative min-w-0 flex-1">
                                        <span className="block truncate text-sm font-black sm:text-base">
                                            {
                                                mainCourseName
                                            }
                                        </span>

                                        <span
                                            className={`mt-1.5 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${isActive
                                                    ? "bg-white/15 text-white/90"
                                                    : "bg-secondary/10 text-secondary"
                                                }`}
                                        >
                                            {
                                                courseCount
                                            }{" "}
                                            {courseCount ===
                                                1
                                                ? "Course"
                                                : "Courses"}
                                        </span>
                                    </span>

                                    {isActive && (
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-x-6 bottom-0 h-1 rounded-t-full bg-logoYellow"
                                        />
                                    )}
                                </button>
                            );
                        }
                    )}
                </div>
            </div>
        </section>
    );
}