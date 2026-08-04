import Link from "next/link";

import {
    ArrowUpRight,
    Building2,
    MapPin,
} from "lucide-react";

import {
    getUniversityId,
    getUniversityLocation,
    getUniversityLogoUrl,
    getUniversityName,
} from "../lib/universityUtils";

const UniversityCard = ({
    university,
    universityImagePath,
    countryName = "",
}) => {
    const universityId =
        getUniversityId(university);

    const universityName =
        getUniversityName(university);

    const location =
        getUniversityLocation(
            university,
            countryName
        );

    const logoUrl =
        getUniversityLogoUrl(
            university,
            universityImagePath
        );

    const universityHref =
        universityId
            ? `/university-details/${universityId}`
            : "#";

    return (
        <article
            className="
                group relative
                flex h-full flex-col
                overflow-hidden
                rounded-[28px]
                border border-slate-200/80
                bg-white
                shadow-[0_14px_40px_rgba(15,23,42,0.07)]
                transition-all duration-500
                hover:-translate-y-2
                hover:border-primary/25
                hover:shadow-[0_28px_70px_rgba(15,23,42,0.14)]
            "
        >
            <div
                aria-hidden="true"
                className="
                    absolute inset-x-0 top-0
                    z-30 h-1
                    origin-left scale-x-0
                    bg-gradient-to-r
                    from-primary
                    via-[#e84a7d]
                    to-secondary
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                "
            />



            <Link
                href={`/university-details/${university.id}`}
                aria-label={`View details for ${universityName}`}
                className="flex h-full w-full flex-col"
            >
                <div
                    className="
                        relative flex h-[215px]
                        items-center justify-center
                        overflow-hidden
                        bg-gradient-to-br
                        from-[#edf3ff]
                        via-[#f4f7fd]
                        to-[#e4ecfb]
                        px-6 py-7
                    "
                >
                    {/* Premium darker grid */}
                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute inset-0
                            [background-image:linear-gradient(rgba(6,29,85,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(6,29,85,0.13)_1px,transparent_1px)]
                            [background-size:30px_30px]
                        "
                    />

                    {/* Soft brand glows */}
                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute -left-14 -top-16
                            h-44 w-44
                            rounded-full
                            bg-primary/12
                            blur-3xl
                        "
                    />

                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute -bottom-16 -right-14
                            h-48 w-48
                            rounded-full
                            bg-secondary/12
                            blur-3xl
                        "
                    />

                    {/* Subtle decorative accents */}
                    <span
                        aria-hidden="true"
                        className="
                            absolute left-6 top-7
                            h-3 w-3
                            rotate-12 rounded-[3px]
                            bg-primary/25
                        "
                    />

                    <span
                        aria-hidden="true"
                        className="
                            absolute bottom-8 right-8
                            h-4 w-4
                            rotate-45 rounded-[4px]
                            border border-secondary/25
                            bg-white/70
                        "
                    />

                    {/* Fixed logo frame */}
                    <div
                        className="
                            relative z-10
                            flex h-[136px]
                            w-full max-w-[238px]
                            items-center justify-center
                            overflow-hidden
                            rounded-[24px]
                            border border-white/90
                            bg-white/95
                            px-7 py-6
                            shadow-[0_18px_45px_rgba(15,23,42,0.11)]
                            backdrop-blur-xl
                            transition-all duration-500
                            group-hover:scale-[1.025]
                            group-hover:shadow-[0_24px_58px_rgba(192,31,83,0.14)]
                        "
                    >
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt={`${universityName} logo`}
                                loading="lazy"
                                decoding="async"
                                className="
                                    block
                                    h-[84px]
                                    w-[184px]
                                    object-contain
                                "
                                onError={(event) => {
                                    const image =
                                        event.currentTarget;

                                    image.style.display =
                                        "none";

                                    const fallback =
                                        image.nextElementSibling;

                                    if (fallback) {
                                        fallback.style.display =
                                            "flex";
                                    }
                                }}
                            />
                        ) : null}

                        <div
                            className={`
                                absolute inset-0
                                items-center justify-center
                                rounded-[24px]
                                bg-gradient-to-br
                                from-primary/5
                                via-white
                                to-secondary/10
                                ${logoUrl
                                    ? "hidden"
                                    : "flex"
                                }
                            `}
                        >
                            <Building2
                                aria-hidden="true"
                                className="h-12 w-12 text-primary/30"
                            />
                        </div>
                    </div>

                    <span
                        className="
                            absolute right-4 top-4
                            z-20 inline-flex
                            items-center rounded-full
                            border border-slate-200/80
                            bg-white/90
                            px-3 py-1.5
                            text-[10px]
                            font-extrabold uppercase
                            tracking-[0.14em]
                            text-slate-500
                            shadow-sm
                            backdrop-blur-md
                        "
                    >
                        University
                    </span>
                </div>

                <div
                    className="
                        relative flex flex-1
                        flex-col p-5
                        sm:p-6
                    "
                >
                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute -right-10 -top-10
                            h-28 w-28
                            rounded-full
                            bg-primary/[0.035]
                        "
                    />

                    <h3
                        className="
                            relative
                            line-clamp-2
                            min-h-[52px]
                            text-lg font-black
                            leading-6
                            text-[#10204a]
                            transition-colors
                            duration-300
                            group-hover:text-primary
                        "
                    >
                        {universityName}
                    </h3>

                    {location && (
                        <div
                            className="
                                relative mt-4
                                flex min-h-[46px]
                                items-start gap-3
                                text-sm leading-6
                                text-slate-500
                            "
                        >
                            <span
                                className="
                                    mt-0.5 flex h-8 w-8
                                    shrink-0 items-center
                                    justify-center
                                    rounded-xl
                                    bg-secondary/10
                                    text-secondary
                                "
                            >
                                <MapPin
                                    aria-hidden="true"
                                    className="h-4 w-4"
                                />
                            </span>

                            <span className="line-clamp-2">
                                {location}
                            </span>
                        </div>
                    )}

                    <div
                        className="
                            relative mt-auto
                            flex items-center
                            justify-between
                            border-t border-slate-100
                            pt-5
                        "
                    >
                        <Link href={`/university-details/${university.id}`}>
                            <span
                                className="
                                text-sm font-extrabold
                                text-primary
                            "
                            >
                                View university
                            </span>
                        </Link>

                        <span
                            aria-hidden="true"
                            className="
                                flex h-10 w-10
                                items-center justify-center
                                rounded-full
                                bg-primary/10
                                text-primary
                                transition-all duration-300
                                group-hover:bg-primary
                                group-hover:text-white
                                group-hover:shadow-lg
                                group-hover:shadow-primary/25
                            "
                        >
                            <ArrowUpRight
                                className="
                                    h-4 w-4
                                    transition-transform
                                    duration-300
                                    group-hover:-translate-y-0.5
                                    group-hover:translate-x-0.5
                                "
                            />
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
};

export default UniversityCard;