"use client";

import { useState } from "react";
import Link from "next/link";

import {
    ArrowUpRight,
    Building2,
    GraduationCap,
    MapPin,
} from "lucide-react";

import { createSlug } from "@/lib/slug";

/* =========================================================
   UNIVERSITY HELPERS
========================================================= */

const getUniversityId = (university) =>
    university?.id ||
    university?.u_id ||
    university?.university_id ||
    university?.uid ||
    "";

const getUniversityName = (university) =>
    university?.name ||
    university?.university_name ||
    university?.university ||
    university?.u_name ||
    university?.title ||
    "International University";

const getUniversityLocation = (
    university,
    fallback = ""
) =>
    university?.location ||
    university?.city ||
    university?.place ||
    university?.address ||
    university?.university_location ||
    fallback;

/* =========================================================
   LOGO HELPERS
========================================================= */

const getLogoFile = (university) =>
    university?.logo ||
    university?.university_logo ||
    university?.university_image ||
    university?.image ||
    university?.u_logo ||
    university?.uni_logo ||
    university?.logo_image ||
    university?.image_name ||
    university?.universityLogo ||
    "";

const buildMediaUrl = (
    basePath,
    file
) => {
    if (!file) return "";

    const value = String(file).trim();

    if (!value) return "";

    if (/^https?:\/\//i.test(value)) {
        return value;
    }

    if (/^(data:|blob:)/i.test(value)) {
        return value;
    }

    if (value.startsWith("//")) {
        return `https:${value}`;
    }

    if (!basePath) {
        return "";
    }

    const cleanBasePath =
        String(basePath)
            .trim()
            .replace(/\/+$/, "");

    const cleanFile =
        value.replace(/^\/+/, "");

    return `${cleanBasePath}/${cleanFile}`;
};

/* =========================================================
   CARD
========================================================= */

export default function UniversityCard({
    university,
    universityImagePath = "",
    countryName = "",
    index = 0,
}) {
    const [
        imageFailed,
        setImageFailed,
    ] = useState(false);

    const universityId =
        getUniversityId(university);

    const universityName =
        getUniversityName(university);

    const location =
        getUniversityLocation(
            university,
            countryName
        );

    const logoFile =
        getLogoFile(university);

    const logoUrl =
        buildMediaUrl(
            universityImagePath,
            logoFile
        );

    const slug =
        university?.slug ||
        createSlug(universityName);

    const universityHref =
        universityId || slug
            ? `/universities/${slug}`
            : "#";

    const accentStyles = [
        {
            glow: "bg-primary/20",
            icon: "text-primary",
            gradient:
                "from-primary via-[#d52d67] to-secondary",
        },
        {
            glow: "bg-secondary/20",
            icon: "text-secondary",
            gradient:
                "from-secondary via-[#168bd7] to-primary",
        },
        {
            glow: "bg-darkPrimary/20",
            icon: "text-darkPrimary",
            gradient:
                "from-darkPrimary via-primary to-secondary",
        },
    ];

    const accent =
        accentStyles[
            index %
            accentStyles.length
        ];

    const showLogo =
        Boolean(logoUrl) &&
        !imageFailed;

    return (
        <article
            className="
                group
                relative
                isolate
                flex
                h-full
                min-h-[430px]
                flex-col
                overflow-hidden
                rounded-[30px]
                border
                border-slate-200/80
                bg-white
                shadow-[0_16px_45px_rgba(15,23,42,0.08)]
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-primary/25
                hover:shadow-[0_30px_80px_rgba(99,26,51,0.16)]
            "
        >
            {/* TOP ACCENT */}
            <div
                aria-hidden="true"
                className={`
                    absolute
                    inset-x-0
                    top-0
                    z-30
                    h-[4px]
                    origin-left
                    scale-x-0
                    bg-gradient-to-r
                    ${accent.gradient}
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                `}
            />

            <Link
                href={universityHref}
                aria-label={`View ${universityName}`}
                className="
                    flex
                    h-full
                    flex-1
                    flex-col
                "
            >
                {/* =====================================================
                    LOGO AREA
                ===================================================== */}
                <div
                    className="
                        relative
                        flex
                        h-[225px]
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        border-b
                        border-slate-100
                        bg-gradient-to-br
                        from-[#eef3ff]
                        via-[#f8faff]
                        to-[#edf6ff]
                        px-6
                        py-8
                    "
                >
                    {/* GRID */}
                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            opacity-70
                            [background-image:linear-gradient(rgba(15,38,85,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,38,85,0.08)_1px,transparent_1px)]
                            [background-size:30px_30px]
                        "
                    />

                    {/* LEFT GLOW */}
                    <div
                        aria-hidden="true"
                        className={`
                            pointer-events-none
                            absolute
                            -left-20
                            -top-20
                            h-56
                            w-56
                            rounded-full
                            ${accent.glow}
                            blur-[75px]
                        `}
                    />

                    {/* RIGHT GLOW */}
                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            -bottom-24
                            -right-16
                            h-56
                            w-56
                            rounded-full
                            bg-secondary/15
                            blur-[75px]
                        "
                    />

                    {/* DECORATIVE ELEMENTS */}
                    <span
                        aria-hidden="true"
                        className="
                            absolute
                            left-7
                            top-8
                            h-3
                            w-3
                            rotate-12
                            rounded-[3px]
                            bg-primary/25
                        "
                    />

                    <span
                        aria-hidden="true"
                        className="
                            absolute
                            bottom-8
                            right-8
                            h-4
                            w-4
                            rotate-45
                            rounded-[4px]
                            border
                            border-secondary/25
                            bg-white/80
                        "
                    />

                    {/* BADGE */}
                    <span
                        className="
                            absolute
                            right-4
                            top-4
                            z-20
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            border-white
                            bg-white/90
                            px-3
                            py-1.5
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.14em]
                            text-slate-500
                            shadow-sm
                            backdrop-blur-md
                        "
                    >
                        <GraduationCap
                            size={12}
                            aria-hidden="true"
                        />

                        University
                    </span>

                    {/* PREMIUM LOGO FRAME */}
                    <div
                        className="
                            relative
                            z-10
                            flex
                            h-[142px]
                            w-full
                            max-w-[255px]
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-[26px]
                            border
                            border-white
                            bg-white/95
                            px-8
                            py-6
                            shadow-[0_20px_50px_rgba(15,23,42,0.12)]
                            backdrop-blur-xl
                            transition-all
                            duration-500
                            group-hover:scale-[1.035]
                            group-hover:shadow-[0_28px_65px_rgba(192,31,83,0.16)]
                        "
                    >
                        {/* INNER SHINE */}
                        <div
                            aria-hidden="true"
                            className="
                                pointer-events-none
                                absolute
                                inset-x-0
                                top-0
                                h-1/2
                                bg-gradient-to-b
                                from-white
                                to-transparent
                            "
                        />

                        {showLogo ? (
                            <img
                                src={logoUrl}
                                alt={`${universityName} logo`}
                                loading="lazy"
                                decoding="async"
                                onError={() =>
                                    setImageFailed(
                                        true
                                    )
                                }
                                className="
                                    relative
                                    z-10
                                    block
                                    max-h-[92px]
                                    max-w-[195px]
                                    object-contain
                                    transition-transform
                                    duration-500
                                    group-hover:scale-[1.03]
                                "
                            />
                        ) : (
                            <div
                                className="
                                    relative
                                    z-10
                                    flex
                                    flex-col
                                    items-center
                                    justify-center
                                    gap-3
                                    text-center
                                "
                            >
                                <span
                                    className={`
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-slate-100
                                        ${accent.icon}
                                    `}
                                >
                                    <Building2
                                        aria-hidden="true"
                                        className="
                                            h-7
                                            w-7
                                        "
                                    />
                                </span>

                                <span
                                    className="
                                        max-w-[180px]
                                        line-clamp-2
                                        text-xs
                                        font-bold
                                        text-slate-400
                                    "
                                >
                                    {universityName}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* =====================================================
                    CONTENT
                ===================================================== */}
                <div
                    className="
                        relative
                        flex
                        flex-1
                        flex-col
                        p-6
                    "
                >
                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            -right-10
                            -top-10
                            h-28
                            w-28
                            rounded-full
                            bg-primary/[0.04]
                        "
                    />

                    <div
                        className="
                            relative
                            z-10
                        "
                    >
                        <p
                            className="
                                text-[10px]
                                font-black
                                uppercase
                                tracking-[0.16em]
                                text-secondary
                            "
                        >
                            International
                            University
                        </p>

                        <h3
                            className="
                                mt-2
                                line-clamp-2
                                min-h-[52px]
                                text-lg
                                font-black
                                leading-6
                                tracking-[-0.02em]
                                text-[#10204a]
                                transition-colors
                                duration-300
                                group-hover:text-primary
                            "
                        >
                            {universityName}
                        </h3>
                    </div>

                    {/* LOCATION */}
                    <div
                        className="
                            relative
                            z-10
                            mt-5
                            flex
                            min-h-[46px]
                            items-start
                            gap-3
                        "
                    >
                        <span
                            className="
                                mt-0.5
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-secondary/10
                                text-secondary
                            "
                        >
                            <MapPin
                                aria-hidden="true"
                                className="
                                    h-4
                                    w-4
                                "
                            />
                        </span>

                        <span
                            className="
                                line-clamp-2
                                pt-1
                                text-sm
                                leading-6
                                text-slate-500
                            "
                        >
                            {location ||
                                countryName ||
                                "International"}
                        </span>
                    </div>

                    {/* FOOTER */}
                    <div
                        className="
                            relative
                            z-10
                            mt-auto
                            flex
                            items-center
                            justify-between
                            border-t
                            border-slate-100
                            pt-5
                        "
                    >
                        <div>
                            <span
                                className="
                                    block
                                    text-sm
                                    font-black
                                    text-primary
                                "
                            >
                                View university
                            </span>

                            <span
                                className="
                                    mt-0.5
                                    block
                                    text-[10px]
                                    font-semibold
                                    text-slate-400
                                "
                            >
                                Courses & details
                            </span>
                        </div>

                        <span
                            aria-hidden="true"
                            className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-primary/10
                                text-primary
                                transition-all
                                duration-300
                                group-hover:-translate-y-0.5
                                group-hover:translate-x-0.5
                                group-hover:bg-primary
                                group-hover:text-white
                                group-hover:shadow-lg
                                group-hover:shadow-primary/25
                            "
                        >
                            <ArrowUpRight
                                className="
                                    h-4
                                    w-4
                                "
                            />
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}