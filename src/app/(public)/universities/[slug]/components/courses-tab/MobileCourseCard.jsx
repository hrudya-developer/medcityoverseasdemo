"use client";

import {
    getCourseCount,
    getMainCourseName,
} from "./mainCourseHelpers";

export default function MobileCourseCard({
    mainCourse,
    isActive = false,
}) {
    if (!mainCourse) {
        return null;
    }

    const name =
        getMainCourseName(
            mainCourse
        );

    const courseCount =
        getCourseCount(
            mainCourse
        );

    return (
        <div
            role="tab"
            aria-selected={
                isActive
            }
            aria-controls="university-course-list"
            className="
                relative
                w-full
                min-w-0
                overflow-hidden

                rounded-[18px]

                border
                border-primary/25

                bg-gradient-to-br
                from-primary/[0.09]
                via-white
                to-secondary/[0.04]

                px-4
                py-5

                text-center

                shadow-[0_10px_25px_rgba(192,31,83,0.10)]
            "
        >
            {/* ACTIVE TOP LINE */}

            <span
                aria-hidden="true"
                className="
                    absolute
                    inset-x-5
                    top-0
                    h-1
                    rounded-b-full
                    bg-primary
                "
            />

            {/* CONTENT */}

            <div
                className="
                    flex
                    min-w-0
                    flex-col
                    items-center
                    justify-center
                    gap-2.5
                "
            >
                {/* COURSE NAME */}

                <span
                    className="
                        max-w-[280px]

                        line-clamp-2

                        text-[14px]
                        font-bold
                        leading-[1.4]
                        text-darkPrimary

                        min-[400px]:text-base
                    "
                >
                    {name}
                </span>

                {/* COURSE COUNT */}

                <span
                    className="
                        inline-flex
                        items-center
                        justify-center

                        rounded-full

                        bg-primary/10

                        px-3
                        py-1

                        text-[13px]
                        font-bold
                        leading-none
                        text-primary
                    "
                >
                    {courseCount}{" "}
                    {courseCount === 1
                        ? "Course"
                        : "Courses"}
                </span>
            </div>
        </div>
    );
}