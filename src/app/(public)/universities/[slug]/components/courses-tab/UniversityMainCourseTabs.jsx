"use client";

import {
    BookOpen,
    ChevronRight,
    GraduationCap,
    Layers3,
} from "lucide-react";

import {
    cleanId,
    getCourseCount,
    getMainCourseId,
    getMainCourseName,
} from "./mainCourseHelpers";
import { MobileMainCourseSlider } from "./MobileMainCourseSlider";



export default function UniversityMainCourseTabs({
    courses = [],
    selectedMainCourseId = "",
    onSelectMainCourse,
}) {
    if (
        !Array.isArray(courses) ||
        courses.length === 0
    ) {
        return null;
    }

    const totalCourses =
        courses.reduce(
            (total, item) =>
                total +
                getCourseCount(item),
            0
        );

    return (
        <aside
            aria-label="Main course categories"
            className="
                lg:sticky
                lg:top-28
                lg:self-start
            "
        >
            <div
                className="
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-slate-200/80
                    bg-white
                    shadow-[0_20px_60px_rgba(15,23,42,0.08)]

                    sm:rounded-[28px]
                    lg:rounded-[30px]
                "
            >
                {/* HEADER */}

                <div
                    className="
                        relative
                        overflow-hidden
                        border-b
                        border-slate-100
                        bg-gradient-to-br
                        from-white
                        via-primary/[0.025]
                        to-secondary/[0.035]

                        px-4
                        py-4

                        sm:px-5
                        sm:py-5
                    "
                >
                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            -right-12
                            -top-12
                            size-28
                            rounded-full
                            bg-primary/[0.06]
                            blur-2xl
                        "
                    />

                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            -bottom-12
                            -left-12
                            size-24
                            rounded-full
                            bg-secondary/[0.06]
                            blur-2xl
                        "
                    />

                    <div
                        className="
                            relative
                            flex
                            items-start
                            gap-3
                        "
                    >
                        <div
                            className="
                                grid
                                size-10
                                shrink-0
                                place-items-center
                                rounded-xl
                                bg-gradient-to-br
                                from-primary
                                to-darkPrimary
                                text-white
                                shadow-lg
                                shadow-primary/20

                                sm:size-12
                                sm:rounded-2xl
                            "
                        >
                            <Layers3
                                className="
                                    size-4
                                    sm:size-5
                                "
                                aria-hidden="true"
                            />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p
                                className="
                                    text-[9px]
                                    font-black
                                    uppercase
                                    tracking-[0.2em]
                                    text-secondary

                                    sm:text-[10px]
                                "
                            >
                                Study Areas
                            </p>

                            <h2
                                className="
                                    mt-1
                                    text-lg
                                    font-black
                                    tracking-tight
                                    text-darkPrimary

                                    sm:text-xl
                                "
                            >
                                Main Courses
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-[11px]
                                    font-semibold
                                    leading-5
                                    text-slate-500

                                    sm:text-xs
                                "
                            >
                                Choose a study area to
                                explore available programs.
                            </p>
                        </div>
                    </div>

                    {/* STATS */}

                    <div
                        className="
                            relative
                            mt-3
                            flex
                            flex-wrap
                            gap-2

                            sm:mt-4
                        "
                    >
                        <span
                            className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                border
                                border-primary/10
                                bg-primary/[0.06]
                                px-2.5
                                py-1
                                text-[10px]
                                font-black
                                text-primary

                                sm:px-3
                                sm:py-1.5
                                sm:text-[11px]
                            "
                        >
                            <BookOpen
                                className="size-3"
                                aria-hidden="true"
                            />

                            {courses.length}{" "}
                            {courses.length === 1
                                ? "Category"
                                : "Categories"}
                        </span>

                        <span
                            className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                border
                                border-secondary/10
                                bg-secondary/[0.06]
                                px-2.5
                                py-1
                                text-[10px]
                                font-black
                                text-secondary

                                sm:px-3
                                sm:py-1.5
                                sm:text-[11px]
                            "
                        >
                            <GraduationCap
                                className="size-3"
                                aria-hidden="true"
                            />

                            {totalCourses}{" "}
                            {totalCourses === 1
                                ? "Course"
                                : "Courses"}
                        </span>
                    </div>
                </div>

                {/* ========================================
                    MOBILE
                    < sm
                ======================================== */}

                <MobileMainCourseSlider
                    courses={courses}
                    selectedMainCourseId={
                        selectedMainCourseId
                    }
                    onSelectMainCourse={
                        onSelectMainCourse
                    }
                />

                {/* ========================================
                    TABLET / DESKTOP
                    sm+
                ======================================== */}

                <div
                    role="tablist"
                    aria-label="University main courses"
                    className="
                        hidden
                        gap-3
                        overflow-x-auto
                        p-4

                        sm:flex

                        lg:max-h-[540px]
                        lg:flex-col
                        lg:overflow-x-hidden
                        lg:overflow-y-auto
                        lg:pr-3

                        lg:[scrollbar-width:thin]
                        lg:[scrollbar-color:#c01f53_#f1f5f9]
                    "
                >
                    {courses.map(
                        (mainCourse) => {
                            const mainCourseId =
                                getMainCourseId(
                                    mainCourse
                                );

                            if (!mainCourseId) {
                                return null;
                            }

                            const isActive =
                                cleanId(
                                    selectedMainCourseId
                                ) ===
                                mainCourseId;

                            return (
                                <DesktopCourseCard
                                    key={
                                        mainCourseId
                                    }
                                    mainCourse={
                                        mainCourse
                                    }
                                    isActive={
                                        isActive
                                    }
                                    onClick={() =>
                                        onSelectMainCourse?.(
                                            mainCourseId
                                        )
                                    }
                                />
                            );
                        }
                    )}
                </div>

                {courses.length > 6 && (
                    <div
                        className="
                            hidden
                            border-t
                            border-slate-100
                            bg-slate-50/70
                            px-5
                            py-3
                            text-center

                            lg:block
                        "
                    >
                        <p
                            className="
                                text-[11px]
                                font-bold
                                text-slate-400
                            "
                        >
                            Scroll to explore more
                            study areas
                        </p>
                    </div>
                )}
            </div>
        </aside>
    );
}

function DesktopCourseCard({
    mainCourse,
    isActive,
    onClick,
}) {
    const name =
        getMainCourseName(
            mainCourse
        );

    const courseCount =
        getCourseCount(
            mainCourse
        );

    return (
        <button
            type="button"
            role="tab"
            aria-selected={
                isActive
            }
            aria-controls="university-course-list"
            onClick={
                onClick
            }
            className={`
                group
                relative
                min-w-[230px]
                shrink-0
                overflow-hidden
                rounded-[18px]
                border
                px-4
                py-4
                text-left
                transition-all
                duration-300

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2

                lg:w-full
                lg:min-w-0

                ${
                    isActive
                        ? `
                            border-primary/35
                            bg-gradient-to-br
                            from-primary/[0.10]
                            via-white
                            to-secondary/[0.05]
                            shadow-[0_14px_35px_rgba(192,31,83,0.12)]
                        `
                        : `
                            border-slate-200/80
                            bg-[#f8fafc]

                            hover:-translate-y-0.5
                            hover:border-primary/25
                            hover:bg-white
                            hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)]
                        `
                }
            `}
        >
            {/* ACTIVE LINE */}

            <span
                aria-hidden="true"
                className={`
                    absolute
                    inset-y-3
                    left-0
                    w-1
                    rounded-r-full
                    transition-all

                    ${
                        isActive
                            ? "bg-primary opacity-100"
                            : "opacity-0"
                    }
                `}
            />

            <div
                className="
                    relative
                    flex
                    items-center
                    gap-3
                "
            >
                {/* ICON */}

                <span
                    className={`
                        grid
                        size-11
                        shrink-0
                        place-items-center
                        rounded-xl
                        border
                        transition-all
                        duration-300

                        ${
                            isActive
                                ? `
                                    border-primary
                                    bg-gradient-to-br
                                    from-primary
                                    to-darkPrimary
                                    text-white
                                    shadow-lg
                                    shadow-primary/20
                                `
                                : `
                                    border-slate-200
                                    bg-white
                                    text-primary
                                    shadow-sm

                                    group-hover:border-primary/20
                                    group-hover:bg-primary
                                    group-hover:text-white
                                `
                        }
                    `}
                >
                    <BookOpen
                        className="size-5"
                        aria-hidden="true"
                    />
                </span>

                {/* CONTENT */}

                <span className="min-w-0 flex-1">
                    <span
                        className="
                            block
                            line-clamp-2
                            text-[13px]
                            font-bold
                            leading-5
                            text-darkPrimary

                            xl:text-sm
                        "
                    >
                        {name}
                    </span>

                    <span
                        className={`
                            mt-2
                            inline-flex
                            rounded-full
                            px-2.5
                            py-1
                            text-[10px]
                            font-black

                            ${
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "bg-secondary/[0.08] text-secondary"
                            }
                        `}
                    >
                        {courseCount}{" "}
                        {courseCount === 1
                            ? "Course"
                            : "Courses"}
                    </span>
                </span>

                {/* ARROW */}

                <span
                    className={`
                        grid
                        size-8
                        shrink-0
                        place-items-center
                        rounded-full
                        transition-all
                        duration-300

                        ${
                            isActive
                                ? `
                                    bg-primary
                                    text-white
                                `
                                : `
                                    bg-white
                                    text-slate-300
                                    shadow-sm

                                    group-hover:bg-primary/10
                                    group-hover:text-primary
                                `
                        }
                    `}
                >
                    <ChevronRight
                        className="size-4"
                        aria-hidden="true"
                    />
                </span>
            </div>
        </button>
    );
}