"use client";

import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    Building2,
    MapPin,
} from "lucide-react";

const FALLBACK_LOGO =
    "/images/university-fallback.webp";

function toSafeString(
    value,
    fallback = ""
) {
    if (
        value === null ||
        value === undefined
    ) {
        return fallback;
    }

    if (
        typeof value === "string" ||
        typeof value === "number"
    ) {
        return (
            String(value).trim() ||
            fallback
        );
    }

    return fallback;
}

function buildLogoUrl(
    basePath,
    fileName
) {
    const logoName =
        toSafeString(fileName);

    if (!logoName) {
        return FALLBACK_LOGO;
    }

    if (
        logoName.startsWith("http://") ||
        logoName.startsWith("https://") ||
        logoName.startsWith("/")
    ) {
        return logoName;
    }

    const cleanBasePath = String(
        basePath || ""
    )
        .trim()
        .replace(/\/+$/, "");

    if (!cleanBasePath) {
        return FALLBACK_LOGO;
    }

    return `${cleanBasePath}/${logoName.replace(
        /^\/+/,
        ""
    )}`;
}

export default function DestinationUniversities({
    countryId,
    countryName,
    universities = [],
    universityImagePath = "",
}) {
    const visibleUniversities =
        Array.isArray(universities)
            ? universities.slice(0, 4)
            : [];

    return (
        <section
            id="universities"
            aria-labelledby="country-universities-heading"
            className="
                scroll-mt-24
                bg-[#f8fafc]
                py-12
                sm:py-14
                lg:py-16
            "
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <header
                    className="
                        flex flex-col gap-5
                        text-center
                        lg:flex-row
                        lg:items-end
                        lg:justify-between
                        lg:text-left
                    "
                >
                    <div>
                        <div
                            className="
                                mx-auto inline-flex
                                items-center gap-2
                                rounded-full
                                border border-primary/15
                                bg-primary/5
                                px-4 py-2
                                text-xs font-black
                                uppercase
                                tracking-[0.14em]
                                text-primary
                                lg:mx-0
                            "
                        >
                            <Building2
                                size={16}
                                aria-hidden="true"
                            />

                            Explore Institutions
                        </div>

                        <h2
                            id="country-universities-heading"
                            className="
                                mt-4 text-3xl
                                font-black
                                tracking-[-0.03em]
                                text-darkPrimary
                                sm:text-4xl
                            "
                        >
                            Universities in{" "}
                            <span className="text-primary">
                                {countryName}
                            </span>
                        </h2>

                        <p
                            className="
                                mx-auto mt-3
                                max-w-2xl
                                text-base leading-7
                                text-slate-600
                                lg:mx-0
                            "
                        >
                            Explore leading institutions
                            and available study
                            opportunities in{" "}
                            <strong className="font-bold text-slate-900">
                                {countryName}
                            </strong>
                            .
                        </p>
                    </div>

                    <Link
                        href={`/all-universities/${encodeURIComponent(
                            countryId
                        )}?country=${encodeURIComponent(
                            countryName
                        )}`}
                        className="
                            group mx-auto
                            inline-flex min-h-12
                            items-center justify-center
                            gap-2 rounded-xl
                            border border-primary/15
                            bg-white px-5
                            text-sm font-bold
                            text-primary shadow-sm
                            transition duration-300
                            hover:-translate-y-0.5
                            hover:border-primary/30
                            hover:shadow-md
                            lg:mx-0
                        "
                    >
                        View All Universities

                        <ArrowRight
                            size={17}
                            aria-hidden="true"
                            className="
                                transition-transform
                                group-hover:translate-x-1
                            "
                        />
                    </Link>
                </header>

                {visibleUniversities.length >
                    0 ? (
                    <div
                        className="
                            mt-9 grid gap-5
                            sm:grid-cols-2
                            lg:grid-cols-3
                            xl:grid-cols-4
                        "
                    >
                        {visibleUniversities.map(
                            (
                                university,
                                index
                            ) => {
                                const universityId =
                                    toSafeString(
                                        university?.id ??
                                        university
                                            ?.university_id ??
                                        university
                                            ?.u_id
                                    );

                                const universityName =
                                    toSafeString(
                                        university
                                            ?.name ??
                                        university
                                            ?.university_name ??
                                        university
                                            ?.title,
                                        "University"
                                    );

                                const location =
                                    toSafeString(
                                        university
                                            ?.location ??
                                        university
                                            ?.city ??
                                        university
                                            ?.address,
                                        countryName
                                    );

                                const logoUrl =
                                    buildLogoUrl(
                                        universityImagePath,
                                        university
                                            ?.logo ??
                                        university
                                            ?.image ??
                                        university
                                            ?.university_logo
                                    );

                                return (
                                    <article
                                        key={
                                            universityId ||
                                            `${universityName}-${index}`
                                        }
                                        className="
        group relative flex h-full flex-col
        overflow-hidden rounded-[28px]
        border border-slate-200/80
        bg-white
        shadow-[0_14px_40px_rgba(15,23,42,0.07)]
        transition-all duration-500
        hover:-translate-y-2
        hover:border-primary/25
        hover:shadow-[0_28px_70px_rgba(192,31,83,0.14)]
    "
                                    >
                                        {/* Top accent */}
                                        <div
                                            aria-hidden="true"
                                            className="
            absolute inset-x-0 top-0 z-10 h-1.5
            bg-gradient-to-r
            from-primary
            via-secondary
            to-logoYellow
        "
                                        />

                                        {/* Logo area */}
                                        <div
                                            className="
            relative flex h-40 items-center
            justify-center overflow-hidden
            bg-gradient-to-br
            from-slate-50 via-white to-slate-100
            px-4 pt-5
            sm:h-44 sm:px-5
        "
                                        >
                                            <div
                                                aria-hidden="true"
                                                className="
                absolute inset-0 opacity-[0.045]
                [background-image:radial-gradient(#c01f53_1px,transparent_1px)]
                [background-size:16px_16px]
            "
                                            />

                                            <div
                                                className="
                relative z-10 flex
                h-[104px] w-full max-w-[180px]
                items-center justify-center
                rounded-[20px]
                border border-slate-200/80
                bg-white p-4
                shadow-[0_10px_28px_rgba(15,23,42,0.08)]
                transition-transform duration-500
                group-hover:scale-[1.03]
                sm:h-28 sm:max-w-[190px]
            "
                                            >
                                                <Image
                                                    src={logoUrl}
                                                    alt={`${universityName} logo`}
                                                    width={150}
                                                    height={70}
                                                    quality={100}
                                                    className="
                    h-[64px] w-[140px]
                    object-contain
                    sm:h-[70px] sm:w-[150px]
                "
                                                />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div
                                            className="
            flex flex-1 flex-col
            border-t border-slate-100
            p-5
            sm:p-6
        "
                                        >
                                            <h3
                                                className="
                line-clamp-2 min-h-[52px]
                text-sm font-bold
                leading-6 tracking-[-0.02em]
                text-black
                transition-colors duration-300
                group-hover:text-primary
                sm:text-xl sm:leading-7
            "
                                            >
                                                {universityName}
                                            </h3>

                                            <div
                                                className="
                mt-4 inline-flex w-fit
                max-w-full items-start gap-2
                rounded-full
                bg-slate-100
                px-3 py-2
                text-sm font-medium
                leading-5 text-slate-600
            "
                                            >
                                                <MapPin
                                                    size={16}
                                                    aria-hidden="true"
                                                    className="
                    mt-0.5 shrink-0
                    text-primary
                "
                                                />

                                                <span className="line-clamp-1 text-secondary">
                                                    {location}
                                                </span>
                                            </div>

                                            {universityId ? (
                                                <Link
                                                    href={`/university-details/${encodeURIComponent(
                                                        universityId
                                                    )}`}
                                                    className="
                    group/link mt-6
                    inline-flex min-h-11
                    items-center justify-center
                    gap-2 rounded-xl
                    bg-gray-50 px-5
                    text-sm font-bold
                    text-primary border border-primary
                    shadow-[0_10px_24px_rgba(192,31,83,0.2)]
                    transition-all duration-300
                    hover:bg-darkPrimary
                    hover:shadow-[0_16px_30px_rgba(99,26,51,0.25)]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-primary
                    focus-visible:ring-offset-2
                "
                                                >
                                                    View University

                                                    <ArrowRight
                                                        size={16}
                                                        aria-hidden="true"
                                                        className="
                        transition-transform duration-300
                        group-hover/link:translate-x-1
                    "
                                                    />
                                                </Link>
                                            ) : null}
                                        </div>
                                    </article>
                                );
                            }
                        )}
                    </div>
                ) : (
                    <div
                        className="
                            mt-9 rounded-3xl
                            border border-slate-200
                            bg-white p-8
                            text-center
                            text-slate-500
                        "
                    >
                        No universities are currently
                        available for {countryName}.
                    </div>
                )}
            </div>
        </section>
    );
}