"use client";

import Link from "next/link";

import {
    ArrowRight,
    BookOpen,
    Clock,
    GraduationCap,
    Landmark,
    Sparkles,
    Wallet,
} from "lucide-react";

import {
    createPublicCourseHref,
    createPublicCourseSlug,
    getPublicCourseId,
} from "@/lib/courseSlug";

/* =========================================================
   UNIVERSITY COURSE CARD
========================================================= */

export default function UniversityCourseCard({
    course,
    universityName,
}) {
    if (!course) {
        return null;
    }

    /* =========================================================
       DATA
    ========================================================= */

    const courseId =
        getPublicCourseId(
            course
        );

    const courseName =
        course?.course ||
        course?.course_name ||
        course?.program_name ||
        course?.title ||
        course?.name ||
        "Course";

    const displayUniversity =
        course?.university ||
        course?.university_name ||
        course?.u_name ||
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

    /* =========================================================
       COURSE URL
    ========================================================= */

    const courseSlug =
        createPublicCourseSlug(
            course,
            displayUniversity
        );

    const courseHref =
        createPublicCourseHref(
            course,
            displayUniversity
        );

    /* =========================================================
       SAVE COURSE MAPPING
    ========================================================= */

    const handleCourseClick =
        () => {
            if (
                !courseSlug ||
                !courseId
            ) {
                return;
            }

            try {
                sessionStorage.setItem(
                    `public-course:${courseSlug}`,
                    JSON.stringify({
                        id:
                            courseId,

                        slug:
                            courseSlug,

                        name:
                            courseName,

                        university:
                            displayUniversity,

                        course,

                        createdAt:
                            Date.now(),
                    })
                );
            } catch (
                error
            ) {
                console.warn(
                    "Unable to store public course mapping:",
                    error
                );
            }
        };

    /* =========================================================
       CARD
    ========================================================= */

    return (
        <article
            className="
                group
                relative
                flex
                h-full
                min-w-0
                flex-col
                overflow-hidden

                rounded-[18px]
                border
                border-slate-200/80
                bg-white

                shadow-[0_10px_30px_rgba(15,23,42,0.06)]

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-primary/25
                hover:shadow-[0_20px_50px_rgba(192,31,83,0.12)]

                sm:rounded-[20px]

                md:rounded-[22px]

                lg:rounded-[24px]

                xl:rounded-[26px]
            "
        >
            {/* =====================================================
                BACKGROUND DECORATION
            ===================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-14
                    -top-14
                    size-28
                    rounded-full
                    bg-primary/[0.06]
                    blur-3xl

                    sm:size-32
                    md:size-36
                    xl:size-40
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -bottom-16
                    -left-16
                    size-32
                    rounded-full
                    bg-secondary/[0.05]
                    blur-3xl

                    md:size-36
                "
            />

            {/* =====================================================
                CONTENT
            ===================================================== */}

            <div
                className="
                    relative
                    flex
                    h-full
                    min-w-0
                    flex-col

                    p-4

                    sm:p-4

                    md:p-4.5

                    lg:p-5

                    xl:p-6
                "
            >
                {/* =================================================
                    TOP
                ================================================= */}

                <div
                    className="
                        mb-3
                        flex
                        min-w-0
                        items-start
                        justify-between
                        gap-2

                        sm:mb-3.5

                        md:mb-4

                        lg:mb-5
                    "
                >
                    {/* ICON */}

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

                            shadow-md
                            shadow-primary/20

                            sm:size-10

                            md:size-11

                            xl:size-12
                            xl:rounded-2xl
                        "
                    >
                        <BookOpen
                            className="
                                size-[17px]

                                sm:size-[18px]

                                md:size-[18px]

                                xl:size-5
                            "
                            aria-hidden="true"
                        />
                    </div>

                    {/* FEATURED */}

                    <span
                        className="
                            inline-flex
                            min-w-0
                            shrink-0
                            items-center
                            gap-1

                            rounded-full

                            border
                            border-primary/10

                            bg-primary/[0.05]

                            px-2.5
                            py-1

                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.07em]
                            text-primary

                            sm:text-[10px]

                            md:text-[9px]

                            lg:text-[10px]

                            xl:px-3
                        "
                    >
                        <Sparkles
                            className="
                                size-3
                                shrink-0
                            "
                            aria-hidden="true"
                        />

                        <span className="truncate">
                            Featured
                        </span>
                    </span>
                </div>

                {/* =================================================
                    COURSE TITLE
                ================================================= */}

                <div
                    className="
                        mb-3.5
                        min-w-0

                        sm:mb-4

                        md:mb-4

                        lg:mb-5
                    "
                >
                    <p
                        className="
                            mb-1

                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.13em]
                            text-secondary

                            sm:text-[10px]

                            md:text-[9px]

                            lg:text-[10px]

                            xl:text-[11px]
                        "
                    >
                        Study Program
                    </p>

                    <h3
                        className="
                            line-clamp-3
                            break-words

                            text-[15px]
                            font-bold
                            leading-[1.45]
                            text-darkPrimary

                            transition-colors

                            group-hover:text-primary

                            min-[400px]:text-base

                            sm:text-[16px]

                            md:text-[15px]

                            lg:text-base

                            xl:text-[17px]
                            xl:leading-[1.5]
                        "
                    >
                        {courseName}
                    </h3>
                </div>

                {/* =================================================
                    INFORMATION
                ================================================= */}

                <div
                    className="
                        grid
                        min-w-0
                        gap-2.5

                        sm:gap-2.5

                        md:gap-2.5

                        xl:gap-3
                    "
                >
                    {/* UNIVERSITY */}

                    <InfoLine
                        icon={
                            Landmark
                        }
                        label="University"
                        value={
                            displayUniversity
                        }
                    />

                    {/* LEVEL + DURATION */}

                    <div
                        className="
                            grid
                            min-w-0
                            grid-cols-1
                            gap-2.5

                            md:grid-cols-2

                            xl:gap-3
                        "
                    >
                        <InfoLine
                            icon={
                                GraduationCap
                            }
                            label="Level"
                            value={
                                level
                            }
                            compact
                        />

                        <InfoLine
                            icon={
                                Clock
                            }
                            label="Duration"
                            value={
                                duration
                            }
                            compact
                        />
                    </div>

                    {/* FEES */}

                    <FeeLine
                        value={
                            fees
                        }
                    />
                </div>

                {/* =================================================
                    CTA
                ================================================= */}

                <div
                    className="
                        mt-auto
                        pt-4

                        sm:pt-4

                        lg:pt-5
                    "
                >
                    {courseId &&
                    courseHref ? (
                        <Link
                            href={
                                courseHref
                            }
                            onClick={
                                handleCourseClick
                            }
                            className="
                                group/link

                                flex
                                min-h-[44px]
                                w-full
                                min-w-0

                                items-center
                                justify-center
                                gap-2

                                rounded-xl

                                bg-gradient-to-r
                                from-darkPrimary
                                to-primary

                                px-3.5
                                py-2.5

                                text-[13px]
                                font-black
                                text-white

                                shadow-md
                                shadow-primary/15

                                transition-all
                                duration-300

                                hover:-translate-y-0.5
                                hover:shadow-lg

                                sm:min-h-[46px]
                                sm:text-[13px]

                                md:min-h-[44px]
                                md:text-xs

                                lg:min-h-[46px]
                                lg:text-[13px]

                                xl:min-h-[48px]
                                xl:rounded-2xl
                                xl:px-4
                                xl:text-sm
                            "
                        >
                            <span
                                className="
                                    min-w-0
                                    truncate
                                "
                            >
                                View Course
                            </span>

                            <span
                                className="
                                    grid
                                    size-6
                                    shrink-0
                                    place-items-center

                                    rounded-full

                                    bg-white/15

                                    transition-all
                                    duration-300

                                    group-hover/link:translate-x-0.5
                                    group-hover/link:bg-white
                                    group-hover/link:text-primary

                                    sm:size-6

                                    md:size-7

                                    xl:size-8
                                "
                            >
                                <ArrowRight
                                    className="
                                        size-3.5

                                        md:size-3.5

                                        xl:size-4
                                    "
                                    aria-hidden="true"
                                />
                            </span>
                        </Link>
                    ) : (
                        <button
                            type="button"
                            disabled
                            className="
                                flex
                                min-h-[44px]
                                w-full
                                items-center
                                justify-center

                                rounded-xl

                                border
                                border-slate-200
                                bg-slate-100

                                px-3.5
                                py-2.5

                                text-[13px]
                                font-black
                                text-slate-400

                                sm:min-h-[46px]
                                sm:text-[13px]

                                md:min-h-[44px]
                                md:text-xs

                                lg:min-h-[46px]
                                lg:text-[13px]

                                xl:min-h-[48px]
                                xl:rounded-2xl
                                xl:text-sm
                            "
                        >
                            Details unavailable
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}

/* =========================================================
   INFO LINE
========================================================= */

function InfoLine({
    icon: Icon,
    label,
    value,
    compact = false,
}) {
    return (
        <div
            className={`
                group/info

                flex
                min-w-0
                items-center

                gap-2.5

                rounded-xl

                border
                border-slate-100

                bg-[#f8f9fc]

                transition

                hover:border-primary/15
                hover:bg-primary/[0.035]

                sm:gap-2.5
                sm:rounded-xl

                md:gap-2.5

                lg:rounded-[14px]

                xl:gap-3
                xl:rounded-2xl

                ${
                    compact
                        ? `
                            p-2.5

                            sm:p-2.5

                            md:p-2.5

                            xl:p-3
                        `
                        : `
                            p-3

                            sm:p-3

                            md:p-3

                            xl:p-3.5
                        `
                }
            `}
        >
            {/* ICON */}

            <span
                className="
                    grid
                    size-8
                    shrink-0
                    place-items-center

                    rounded-lg

                    bg-white

                    text-primary

                    shadow-sm
                    ring-1
                    ring-slate-100

                    sm:size-8

                    md:size-9

                    xl:size-10
                    xl:rounded-xl
                "
            >
                <Icon
                    className="
                        size-3.5

                        sm:size-3.5

                        md:size-4
                    "
                    aria-hidden="true"
                />
            </span>

            {/* TEXT */}

            <div className="min-w-0 flex-1">
                <p
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.09em]
                        text-slate-400

                        sm:text-[10px]

                        md:text-[9px]

                        lg:text-[10px]

                        xl:text-[10px]
                    "
                >
                    {label}
                </p>

                <p
                    className="
                        mt-0.5

                        line-clamp-2
                        break-words

                        text-[13px]
                        font-bold
                        leading-[1.45]
                        text-[#081c47]

                        sm:text-[13px]

                        md:text-[12px]

                        lg:text-[13px]

                        xl:text-sm
                        xl:leading-5
                    "
                >
                    {value}
                </p>
            </div>
        </div>
    );
}

/* =========================================================
   FEE LINE
========================================================= */

function FeeLine({
    value,
}) {
    return (
        <div
            className="
                relative
                min-w-0
                overflow-hidden

                rounded-xl

                border
                border-primary/15

                bg-gradient-to-r
                from-primary/[0.07]
                via-white
                to-secondary/[0.07]

                p-3

                sm:p-3
                sm:rounded-xl

                md:p-3

                lg:rounded-[14px]

                xl:rounded-2xl
                xl:p-3.5
            "
        >
            <div
                className="
                    relative
                    flex
                    min-w-0
                    items-center

                    gap-2.5

                    sm:gap-2.5

                    md:gap-2.5

                    xl:gap-3
                "
            >
                {/* ICON */}

                <span
                    className="
                        grid
                        size-8
                        shrink-0
                        place-items-center

                        rounded-lg

                        bg-primary

                        text-white

                        shadow-md
                        shadow-primary/15

                        sm:size-8

                        md:size-9

                        xl:size-10
                        xl:rounded-xl
                    "
                >
                    <Wallet
                        className="
                            size-3.5

                            sm:size-3.5

                            md:size-4

                            xl:size-[18px]
                        "
                        aria-hidden="true"
                    />
                </span>

                {/* CONTENT */}

                <div className="min-w-0 flex-1">
                    <p
                        className="
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.09em]
                            text-slate-400

                            sm:text-[10px]

                            md:text-[9px]

                            lg:text-[10px]
                        "
                    >
                        Tuition Fees
                    </p>

                    <p
                        className="
                            mt-0.5

                            truncate

                            text-[13px]
                            font-black
                            text-darkPrimary

                            sm:text-[13px]

                            md:text-xs

                            lg:text-[13px]

                            xl:text-sm
                        "
                    >
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}