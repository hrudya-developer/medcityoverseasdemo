"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import heroBg from "@/assets/university-course-details.webp";

import {
    GraduationCap,
    MapPin,
    MoveRight,
} from "lucide-react";

/* =========================================================
   VALIDATE REMOTE LOGO
========================================================= */

function getSafeLogoUrl(value) {
    if (!value) {
        return "";
    }

    const logo = String(value).trim();

    if (!logo) {
        return "";
    }

    /*
     * Allow full HTTP/HTTPS URLs.
     */
    if (
        /^https?:\/\//i.test(
            logo
        )
    ) {
        return logo;
    }

    /*
     * Allow local public URLs.
     */
    if (
        logo.startsWith("/")
    ) {
        return logo;
    }

    /*
     * Anything else could cause:
     * Failed to construct 'URL'
     */
    return "";
}

export default function CourseDetailsHero({
    details,
    onApply,
}) {
    const {
        courseTitle =
            "Course Details",

        universityName =
            "University",

        universityLogoUrl =
            "",

        locationName =
            "",

        level =
            "Course",
    } = details ?? {};

    const [
        logoError,
        setLogoError,
    ] = useState(false);

    const safeLogoUrl =
        useMemo(
            () =>
                getSafeLogoUrl(
                    universityLogoUrl
                ),
            [
                universityLogoUrl,
            ]
        );

    const showLogo =
        Boolean(
            safeLogoUrl
        ) &&
        !logoError;

    const handleApply = () => {
        if (
            typeof onApply ===
            "function"
        ) {
            onApply();
        }
    };

    return (
        <section
            className="
                relative
                w-full
                overflow-hidden
                bg-slate-50
            "
        >
            {/* =========================================
                BACKGROUND IMAGE
            ========================================== */}

            <Image
                src={heroBg}
                alt="study abroad courses"
                fill
                priority
                sizes="100vw"
                className="
                    object-cover
                    object-center
                "
            />

            {/* =========================================
                OVERLAY
            ========================================== */}

            <div
                aria-hidden="true"
                className="
                    absolute
                    inset-0
                    bg-gradient-to-r
                    from-white/95
                    via-white/80
                    to-white/20
                    lg:from-white/95
                    lg:via-white/65
                    lg:to-transparent
                "
            />

            {/* =========================================
                DECORATIVE BACKGROUND
            ========================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-24
                    -top-24
                    size-80
                    rounded-full
                    bg-primary/10
                    blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -bottom-32
                    right-0
                    size-96
                    rounded-full
                    bg-secondary/10
                    blur-3xl
                "
            />

            {/* =========================================
                CONTENT
            ========================================== */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    min-h-[410px]
                    w-full
                    max-w-[1600px]
                    items-center
                    px-5
                    py-10
                    sm:px-8
                    lg:min-h-[430px]
                    lg:px-12
                    lg:py-12
                "
            >
                <div
                    className="
                        w-full
                        max-w-[720px]
                    "
                >
                    {/* LEVEL + APPLY */}

                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-3
                        "
                    >
                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-logoYellow
                                px-4
                                py-2
                                text-xs
                                font-bold
                                text-black
                                shadow-lg
                                sm:text-sm
                            "
                        >
                            <GraduationCap
                                size={19}
                                aria-hidden="true"
                            />

                            <span>
                                {level}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={
                                handleApply
                            }
                            className="
                                group
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-darkPrimary
                                px-5
                                py-2
                                text-xs
                                font-bold
                                text-white
                                shadow-lg
                                transition-all
                                duration-300

                                hover:-translate-y-0.5
                                hover:bg-primary

                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-primary
                                focus-visible:ring-offset-2

                                sm:text-sm
                            "
                        >
                            Apply Now

                            <MoveRight
                                size={18}
                                aria-hidden="true"
                                className="
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            />
                        </button>
                    </div>

                    {/* =====================================
                        COURSE TITLE
                    ====================================== */}

                    <h2
                        className="
                            mt-7
                            max-w-[700px]
                            text-2xl
                            font-black
                            leading-tight
                            tracking-[-0.03em]
                            text-slate-950

                            sm:text-3xl

                            lg:text-[2.75rem]
                            lg:leading-[1.1]
                        "
                    >
                        {courseTitle}
                    </h2>

                    {/* TITLE ACCENT */}

                    <div
                        aria-hidden="true"
                        className="
                            mt-5
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <span
                            className="
                                h-1
                                w-14
                                rounded-full
                                bg-primary
                            "
                        />

                        <span
                            className="
                                h-1
                                w-5
                                rounded-full
                                bg-secondary
                            "
                        />

                        <span
                            className="
                                h-1
                                w-2
                                rounded-full
                                bg-logoYellow
                            "
                        />
                    </div>

                    {/* =====================================
                        UNIVERSITY
                    ====================================== */}

                    <div
                        className="
                            mt-6
                            flex
                            w-full
                            max-w-[600px]
                            items-center
                            gap-4
                            rounded-2xl
                            border
                            border-white/80
                            bg-white/85
                            p-4
                            shadow-[0_12px_35px_rgba(15,23,42,0.08)]
                            backdrop-blur-md
                        "
                    >
                        {/* LOGO */}

                        {showLogo ? (
                            <div
                                className="
                                    flex
                                    h-16
                                    w-24
                                    shrink-0
                                    items-center
                                    justify-center
                                    overflow-hidden
                                    rounded-xl
                                    border
                                    border-slate-100
                                    bg-white
                                    p-2
                                    shadow-sm
                                "
                            >
                                <img
                                    src={
                                        safeLogoUrl
                                    }
                                    alt={`${universityName} logo`}
                                    loading="lazy"
                                    decoding="async"
                                    onError={() =>
                                        setLogoError(
                                            true
                                        )
                                    }
                                    className="
                                        block
                                        max-h-full
                                        max-w-full
                                        object-contain
                                    "
                                />
                            </div>
                        ) : (
                            <div
                                className="
                                    grid
                                    h-16
                                    w-20
                                    shrink-0
                                    place-items-center
                                    rounded-xl
                                    bg-gradient-to-br
                                    from-darkPrimary
                                    to-primary
                                    text-white
                                    shadow-lg
                                "
                            >
                                <GraduationCap
                                    size={
                                        29
                                    }
                                    aria-hidden="true"
                                />
                            </div>
                        )}

                        {/* UNIVERSITY INFO */}

                        <div
                            className="
                                min-w-0
                                flex-1
                            "
                        >
                            <p
                                className="
                                    text-[10px]
                                    font-black
                                    uppercase
                                    tracking-[0.15em]
                                    text-primary
                                    sm:text-xs
                                "
                            >
                                University
                            </p>

                            <h2
                                className="
                                    mt-1
                                    line-clamp-2
                                    text-sm
                                    font-black
                                    leading-5
                                    text-darkPrimary
                                    sm:text-base
                                    sm:leading-6
                                "
                            >
                                {
                                    universityName
                                }
                            </h2>

                            {locationName && (
                                <p
                                    className="
                                        mt-1.5
                                        flex
                                        items-center
                                        gap-1.5
                                        text-xs
                                        font-semibold
                                        text-secondary
                                        sm:text-sm
                                    "
                                >
                                    <MapPin
                                        size={
                                            14
                                        }
                                        aria-hidden="true"
                                        className="
                                            shrink-0
                                        "
                                    />

                                    <span
                                        className="
                                            truncate
                                        "
                                    >
                                        {
                                            locationName
                                        }
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}