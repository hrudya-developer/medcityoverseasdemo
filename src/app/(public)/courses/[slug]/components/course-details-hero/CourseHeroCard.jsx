import {
    MoveRight,
} from "lucide-react";

import CourseHeroActions from "./CourseHeroActions";
import CourseUniversityCard from "./CourseUniversityCard";

export default function CourseHeroCard({
    courseTitle,
    level,
    onApply,
    showLogo,
    safeLogoUrl,
    universityName,
    locationName,
    onLogoError,
}) {
    return (
        <div
            className="
                relative
                mx-auto
                w-full
                max-w-[780px]
                text-center

                lg:mx-0
                lg:text-left
            "
        >
            {/* =====================================================
                LEVEL
            ====================================================== */}

            <CourseHeroActions
                level={level}
            />

            {/* =====================================================
                EYEBROW
            ====================================================== */}

            <div
                className="
                    mt-6
                    flex
                    items-center
                    justify-center
                    gap-3

                    sm:mt-7

                    lg:justify-start
                    lg:gap-4
                "
            >
                <span
                    className="
                        h-[3px]
                        w-8
                        shrink-0
                        rounded-full
                        bg-primary

                        sm:w-11
                    "
                />

                <p
                    className="
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.14em]
                        text-white/60

                        sm:text-[10px]
                        sm:tracking-[0.2em]

                        lg:text-[11px]
                        lg:tracking-[0.22em]
                    "
                >
                    Study Today

                    <span
                        className="
                            mx-1
                            text-white/25

                            sm:mx-2.5
                        "
                    >
                        |
                    </span>

                    Explore Tomorrow

                    <span
                        className="
                            mx-1
                            text-white/25

                            sm:mx-2.5
                        "
                    >
                        |
                    </span>

                    Lead Globally
                </p>
            </div>

            {/* =====================================================
                TITLE
            ====================================================== */}

            <h1
                className="
                    mx-auto
                    mt-4
                    max-w-[760px]

                    text-[1.9rem]
                    font-bold
                    leading-[1.08]
                    tracking-[-0.04em]
                    text-white

                    sm:mt-5
                    sm:text-[2.35rem]

                    md:text-[2.65rem]

                    lg:mx-0
                    lg:text-5xl
                    lg:leading-[1.03]
                    lg:tracking-[-0.05em]
                "
            >
                {courseTitle}
            </h1>

            {/* =====================================================
                DESCRIPTION
            ====================================================== */}

            <p
                className="
                    mx-auto
                    mt-4
                    max-w-[670px]

                    text-sm
                    font-medium
                    leading-6
                    text-white/68

                    sm:mt-5
                    sm:text-base
                    sm:leading-8

                    lg:mx-0
                "
            >
                Build a global career with
                industry-focused learning,
                international exposure and
                hands-on training designed
                for tomorrow&apos;s world.
            </p>

            {/* =====================================================
                UNIVERSITY + APPLY
            ====================================================== */}

            <div
                className="
                    mx-auto
                    mt-5
                    flex
                    w-full
                    max-w-[520px]
                    flex-col
                    gap-3

                    sm:flex-row
                    sm:items-stretch

                    lg:mx-0
                    lg:max-w-none
                "
            >
                {/* =================================================
                    UNIVERSITY
                ================================================== */}

                <div
                    className="
                        min-w-0
                        w-full

                        sm:w-auto
                        sm:max-w-[390px]
                        sm:flex-1
                    "
                >
                    <CourseUniversityCard
                        showLogo={showLogo}
                        safeLogoUrl={
                            safeLogoUrl
                        }
                        universityName={
                            universityName
                        }
                        locationName={
                            locationName
                        }
                        onLogoError={
                            onLogoError
                        }
                    />
                </div>

                {/* =================================================
                    APPLY NOW
                ================================================== */}

                <button
                    type="button"
                    onClick={onApply}
                    className="
                        group
                        relative

                        flex
                        h-[88px]
                        w-full
                        shrink-0

                        items-center
                        justify-center
                        gap-2.5

                        overflow-hidden
                        rounded-[18px]

                        border
                        border-white/10

                        bg-primary

                        px-5

                        text-sm
                        font-black
                        text-white

                        shadow-[0_16px_45px_rgba(192,31,83,0.30)]

                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:bg-darkPrimary
                        hover:shadow-[0_22px_55px_rgba(192,31,83,0.42)]

                        sm:w-[150px]

                        md:w-[165px]

                        lg:w-[175px]
                    "
                >
                    {/* TOP GLOW */}

                    <span
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            -right-8
                            -top-8

                            size-24
                            rounded-full

                            bg-white/15
                            blur-2xl
                        "
                    />

                    {/* BOTTOM GLOW */}

                    <span
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            -bottom-10
                            -left-6

                            size-20
                            rounded-full

                            bg-darkPrimary/30
                            blur-2xl
                        "
                    />

                    {/* LABEL */}

                    <span
                        className="
                            relative
                            z-10
                            whitespace-nowrap
                        "
                    >
                        Apply Now
                    </span>

                    {/* ARROW */}

                    <MoveRight
                        size={18}
                        aria-hidden="true"
                        className="
                            relative
                            z-10
                            shrink-0

                            transition-transform
                            duration-300

                            group-hover:translate-x-1
                        "
                    />
                </button>
            </div>
        </div>
    );
}