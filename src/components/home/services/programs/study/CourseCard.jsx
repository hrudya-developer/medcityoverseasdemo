import {
    CheckCheck,
} from "lucide-react";

import CourseImage from "./CourseImage";
import DotPattern from "./DotPattern";

import {
    createCourseImageUrl,
} from "./courseImageUtils";

export default function CourseCard({
    course,
    index,
    imagePath,
}) {
    const courseName =
        course?.name?.trim() ||
        "Study Abroad Course";

    const courseId =
        course?.id ?? index;

    const imageUrl =
        createCourseImageUrl(
            imagePath,
            course?.icon
        );

    const headingId =
        `popular-course-${courseId}`;

    const courseNumber =
        String(index + 1).padStart(
            2,
            "0"
        );

    return (
        <article
            aria-labelledby={headingId}
            className="
                group
                relative
                mx-auto
                flex
                w-full
                max-w-[390px]
                flex-col
                overflow-hidden
                rounded-[26px]
                border
                border-slate-200/70
                bg-white
                shadow-[0_14px_42px_rgba(15,23,42,0.09)]
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-primary/25
                hover:shadow-[0_26px_70px_rgba(192,31,83,0.16)]
            "
        >
            <CardImageSection
                imageUrl={imageUrl}
                courseName={courseName}
            />

            <CardContent
                headingId={headingId}
                courseName={courseName}
                courseNumber={courseNumber}
            />

            <div
                aria-hidden="true"
                className="
                    absolute
                    inset-x-8
                    bottom-0
                    h-1
                    origin-center
                    scale-x-0
                    rounded-t-full
                    bg-gradient-to-r
                    from-primary
                    via-secondary
                    to-primary
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                "
            />
        </article>
    );
}

function CardImageSection({
    imageUrl,
    courseName,
}) {
    return (
        <div className="relative">
            <CourseImage
                imageUrl={imageUrl}
                courseName={courseName}
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/55
                    via-black/5
                    to-transparent
                "
            />

            <PopularBadge />

            <CheckBadge />
        </div>
    );
}

function PopularBadge() {
    return (
        <div
            className="
                absolute
                left-4
                top-4
                z-20
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/25
                bg-black/30
                px-3
                py-1.5
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.13em]
                text-white
                shadow-lg
                backdrop-blur-md
            "
        >
            <span
                aria-hidden="true"
                className="
                    h-2
                    w-2
                    rounded-full
                    bg-logoYellow
                    shadow-[0_0_10px_rgba(247,236,34,0.8)]
                "
            />

            Popular Course
        </div>
    );
}

function CheckBadge() {
    return (
        <div
            aria-hidden="true"
            className="
                absolute
                -bottom-8
                left-1/2
                z-30
                -translate-x-1/2
            "
        >
            <div
                className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    border-[6px]
                    border-white
                    bg-white
                    shadow-[0_10px_30px_rgba(15,23,42,0.20)]
                "
            >
                <div
                    className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-br
                        from-primary
                        to-darkPrimary
                        text-white
                        transition-transform
                        duration-500
                        group-hover:-rotate-6
                        group-hover:scale-110
                    "
                >
                    <CheckCheck
                        className="h-5 w-5"
                        strokeWidth={2.6}
                    />
                </div>
            </div>
        </div>
    );
}

function CardContent({
    headingId,
    courseName,
    courseNumber,
}) {
    return (
        <div
            className="
                relative
                flex
                min-h-[160px]
                flex-1
                flex-col
                items-center
                justify-center
                overflow-hidden
                bg-gradient-to-br
                from-white
                via-[#fff6fa]
                to-[#eef7ff]
                px-6
                pb-7
                pt-12
                text-center
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -bottom-14
                    -left-14
                    h-36
                    w-36
                    rounded-full
                    bg-primary/[0.07]
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-14
                    -top-12
                    h-32
                    w-32
                    rounded-full
                    bg-secondary/[0.07]
                "
            />

            <DotPattern />

            <span
                aria-hidden="true"
                className="
                    absolute
                    right-5
                    top-5
                    text-2xl
                    font-black
                    leading-none
                    text-secondary/[25%]
                    transition-colors
                    duration-500
                    group-hover:text-primary/[0.08]
                "
            >
                {courseNumber}
            </span>

            <h3
                id={headingId}
                className="
                    relative
                    z-10
                    flex
                    min-h-[58px]
                    items-center
                    justify-center
                    text-lg
                    font-extrabold
                    leading-snug
                    text-secondary
                    transition-colors
                    duration-300
                    group-hover:text-primary
                    sm:text-xl
                "
            >
                {courseName}
            </h3>

            <div
                aria-hidden="true"
                className="
                    relative
                    z-10
                    mt-5
                    h-1
                    w-16
                    rounded-full
                    bg-gradient-to-r
                    from-primary
                    via-secondary
                    to-primary
                    transition-all
                    duration-500
                    group-hover:w-24
                "
            />
        </div>
    );
}