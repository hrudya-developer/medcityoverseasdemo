"use client";

import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    Sparkles,
    University,
} from "lucide-react";

const HERO_STATS = [
    {
        value: "100+",
        label: "Universities",
    },
    {
        value: "500+",
        label: "Courses",
    },
    {
        value: "25+",
        label: "Destinations",
    },
    {
        value: "10K+",
        label: "Students Guided",
    },
];

function toSafeText(
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
        return String(value).trim() || fallback;
    }

    if (typeof value === "object") {
        return toSafeText(
            value?.name ??
            value?.title ??
            value?.label ??
            value?.text ??
            value?.value,
            fallback
        );
    }

    return fallback;
}

export default function DestinationHero({
    country,
    countryName,
    image,
    flag,
    onOpenCounselling,
}) {
    const capital = toSafeText(
        country?.capital,
        "Explore"
    );

    return (
        <section
            aria-labelledby="destination-hero-heading"
            className="relative overflow-hidden bg-gradient-to-br from-[#e8f5ff] via-[#f7fbff] to-[#fff8fb]"
        >
            {/* Grid background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
            >
                <div
                    className="absolute inset-0 opacity-[0.32] [background-image:linear-gradient(rgba(4,102,175,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(4,102,175,0.09)_1px,transparent_1px)] [background-size:32px_32px]"
                />

                <div className="absolute -left-32 top-8 size-80 rounded-full bg-secondary/10 blur-3xl" />

                <div className="absolute -right-28 bottom-8 size-80 rounded-full bg-primary/10 blur-3xl" />

                <div className="absolute left-[12%] top-[20%] size-2 rounded-full bg-secondary/30 shadow-[45px_36px_0_rgba(4,102,175,0.13),92px_-8px_0_rgba(192,31,83,0.13)]" />
            </div>

            <div
                className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 sm:py-14 lg:min-h-[520px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-10 lg:py-12"
            >
                {/* Left content */}
                <div
                    className="relative z-20 flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                    <div
                        className="inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-white/90 px-4 py-2 text-sm font-bold text-secondary shadow-[0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur-md"
                    >
                        {flag ? (
                            <span
                                className="relative size-6 shrink-0 overflow-hidden rounded-full border border-white shadow-sm"
                            >
                                <Image
                                    src={flag}
                                    alt={`${countryName} flag`}
                                    fill
                                    sizes="24px"
                                    className="object-cover"
                                />
                            </span>
                        ) : (
                            <Sparkles
                                size={15}
                                aria-hidden="true"
                            />
                        )}

                        Study Destination
                    </div>

                    <h1
                        id="destination-hero-heading"
                        className="mt-7 max-w-[650px] text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl xl:text-5xl"
                    >
                        <span className="block">
                            Build Your Future by
                        </span>

                        <span className="mt-2 block">
                            Studying in{" "}
                            <span
                                className="inline-block rounded-2xl bg-secondary px-3 py-1 text-white shadow-[0_10px_25px_rgba(4,102,175,0.2)]"
                            >
                                {countryName}
                            </span>
                        </span>
                    </h1>

                    <p
                        className="mt-6 max-w-[520px] text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8"
                    >
                        Discover quality education and global
                        career opportunities in{" "}
                        <strong className="font-bold text-slate-900">
                            {countryName}
                        </strong>
                        .
                    </p>

                    <div
                        className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center lg:justify-start"
                    >
                        <Link
                            href="#universities"
                            className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(192,31,83,0.24)] transition duration-300 hover:-translate-y-1 hover:bg-darkPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            Explore Universities

                            <ArrowRight
                                size={18}
                                aria-hidden="true"
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>

                        <button
                            type="button"
                            onClick={onOpenCounselling}
                            className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-bold text-slate-950 transition duration-300 hover:bg-white/70 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            <span className="border-b-2 border-secondary pb-1">
                                Request a Callback
                            </span>

                            <ArrowRight
                                size={18}
                                aria-hidden="true"
                                className="-rotate-45 text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </button>
                    </div>
                </div>

                {/* Right visual */}
                <div
                    className="relative mx-auto w-full max-w-[500px]"
                >
                    <div
                        aria-hidden="true"
                        className="absolute -inset-5 rounded-[48px] bg-gradient-to-br from-secondary/10 via-white/20 to-primary/10 blur-2xl"
                    />

                    <div
                        className="relative h-[320px] overflow-hidden rounded-[34px] border-4 border-white bg-[#b9ddf8] shadow-[0_28px_65px_rgba(15,23,42,0.18)] sm:h-[380px] sm:rounded-[42px] lg:h-[420px]"
                    >
                        <Image
                            src={image}
                            alt={`Study opportunities in ${countryName}`}
                            fill
                            priority
                            quality={100}
                            sizes="
                                (max-width: 639px) 92vw,
                                (max-width: 1023px) 500px,
                                500px
                            "
                            className="object-cover object-center"
                        />

                        <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"
                        />

                        <div
                            className="absolute inset-x-0 bottom-0 px-5 pb-6 pt-20 text-left text-white sm:px-7 sm:pb-7"
                        >
                            <p
                                className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 sm:text-xs"
                            >
                                Your global journey starts here
                            </p>

                            <p className="mt-2 text-xl font-black sm:text-2xl">
                                Study in {countryName}
                            </p>
                        </div>
                    </div>

                    {/* Capital card */}
                    <div
                        className="absolute right-2 top-6 z-20 hidden min-w-[180px] items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-[0_18px_40px_rgba(15,23,42,0.15)] backdrop-blur-xl sm:flex lg:-right-5"
                    >
                        <span
                            className="grid size-11 shrink-0 place-content-center rounded-xl bg-secondary/10 text-secondary"
                        >
                            <University
                                size={20}
                                aria-hidden="true"
                            />
                        </span>

                        <div className="text-left">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Capital
                            </p>

                            <p className="mt-1 text-sm font-black uppercase text-slate-900">
                                {capital}
                            </p>
                        </div>
                    </div>

                    {/* Expert guidance */}
                    <div
                        className="absolute -left-4 top-1/2 z-20 hidden -translate-y-1/2 items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.15)] backdrop-blur-xl md:flex lg:-left-9"
                    >
                        <div className="flex -space-x-2.5">
                            <span className="grid size-9 place-content-center rounded-full border-2 border-white bg-primary text-xs font-bold text-white">
                                M
                            </span>

                            <span className="grid size-9 place-content-center rounded-full border-2 border-white bg-secondary text-xs font-bold text-white">
                                S
                            </span>

                            <span className="grid size-9 place-content-center rounded-full border-2 border-white bg-logoYellow text-xs font-bold text-slate-900">
                                +
                            </span>
                        </div>

                        <div className="text-left">
                            <p className="text-sm font-black text-slate-900">
                                Expert Guidance
                            </p>

                            <p className="mt-0.5 text-[11px] text-slate-500">
                                Admissions and visa support
                            </p>
                        </div>
                    </div>

                    {/* Counselling support */}
                    <div
                        className="absolute -right-2 bottom-6 z-20 hidden w-[128px] rounded-2xl border border-white/80 bg-white/95 p-3.5 text-center shadow-[0_18px_40px_rgba(15,23,42,0.15)] backdrop-blur-xl sm:block lg:-right-4"
                    >
                        <div
                            className="mx-auto grid size-14 place-content-center rounded-full border-[6px] border-secondary/15 text-base font-black text-secondary"
                        >
                            100%
                        </div>

                        <p className="mt-2 text-[11px] font-bold leading-4 text-slate-600">
                            Counselling Support
                        </p>
                    </div>
                </div>
            </div>

            {/* Statistics strip */}
            <div className="relative z-10 bg-darkPrimary">
                <div
                    className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-4 sm:grid-cols-4"
                >
                    {HERO_STATS.map((stat) => (
                        <div
                            key={stat.label}
                            className="px-4 py-5 text-center sm:py-6"
                        >
                            <p className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                                {stat.value}
                            </p>

                            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70 sm:text-xs">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}