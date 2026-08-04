"use client";

import {
    useMemo,
    useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    Banknote,
    Check,
    Earth,
    GraduationCap,
    Languages,
    Phone,
    Thermometer,
    University,
} from "lucide-react";

import FAQ from "@/components/home/FAQ/FAQ";
import DestinationHero from "./DestinationHero";
import DestinationUniversities from "./DestinationUniversities";
// import CounsellingModal from "@/components/counselling/CounsellingModal";

const DEFAULT_IMAGE =
    "/images/destination-fallback.webp";

function toSafeText(
    value,
    fallback = "",
    visited = new WeakSet()
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
        const text =
            String(value).trim();

        return text || fallback;
    }

    if (
        typeof value === "boolean"
    ) {
        return value ? "Yes" : "No";
    }

    if (Array.isArray(value)) {
        const text = value
            .map((item) =>
                toSafeText(
                    item,
                    "",
                    visited
                )
            )
            .filter(Boolean)
            .join(", ");

        return text || fallback;
    }

    if (
        typeof value === "object"
    ) {
        if (visited.has(value)) {
            return fallback;
        }

        visited.add(value);

        const nestedValue =
            value?.name ??
            value?.country ??
            value?.country_name ??
            value?.destination_name ??
            value?.title ??
            value?.label ??
            value?.text ??
            value?.value ??
            value?.description ??
            value?.content ??
            "";

        return toSafeText(
            nestedValue,
            fallback,
            visited
        );
    }

    return fallback;
}

function toSafeImage(
    value,
    fallback = DEFAULT_IMAGE
) {
    const imageValue = toSafeText(
        value,
        ""
    );

    return imageValue || fallback;
}

function normalizeAttractions(
    attractions
) {
    if (!Array.isArray(attractions)) {
        return [];
    }

    const seenText =
        new Set();

    return attractions
        .map((item, index) => {
            const text =
                toSafeText(
                    item?.text ??
                    item?.name ??
                    item?.title ??
                    item?.label ??
                    item
                        ?.attraction_name ??
                    item?.description ??
                    item?.details ??
                    item,
                    ""
                );

            if (!text) {
                return null;
            }

            const normalizedText =
                text.toLowerCase();

            if (
                seenText.has(
                    normalizedText
                )
            ) {
                return null;
            }

            seenText.add(
                normalizedText
            );

            return {
                id: String(
                    item?.id ??
                    item?.attraction_id ??
                    `attraction-${index}`
                ),

                text,
            };
        })
        .filter(Boolean);
}

export default function DestinationDetailsClient({
    countryId,
    country,
    attractions = [],
    universities = [],
    universityImagePath = "",
    image,
    flag,
}) {
    const [
        showCounselling,
        setShowCounselling,
    ] = useState(false);

    const countryName = useMemo(
        () =>
            toSafeText(
                country?.country ??
                country?.country_name ??
                country
                    ?.destination_name ??
                country?.name ??
                country?.title,
                "Study Destination"
            ),
        [country]
    );

    const safeImage = useMemo(
        () =>
            toSafeImage(
                image,
                DEFAULT_IMAGE
            ),
        [image]
    );

    const safeFlag = useMemo(
        () =>
            toSafeImage(flag, null),
        [flag]
    );

    const normalizedAttractions =
        useMemo(
            () =>
                normalizeAttractions(
                    attractions
                ),
            [attractions]
        );


    return (
        <>
            <main className="overflow-hidden bg-[#f8fafc]">
                <DestinationHero
                    country={country}
                    countryName={
                        countryName
                    }
                    image={safeImage}
                    flag={safeFlag}
                    onOpenCounselling={() =>
                        setShowCounselling(
                            true
                        )
                    }
                />

                <QuickInfo
                    country={country}
                />

                <AboutDestination
                    country={country}
                    countryName={
                        countryName
                    }
                    image={safeImage}
                    flag={safeFlag}
                />

                <WhyChoose
                    countryName={
                        countryName
                    }
                    attractions={
                        normalizedAttractions
                    }
                />

                <DestinationUniversities
                    countryId={countryId}
                    countryName={countryName}
                    universities={universities}
                    universityImagePath={
                        universityImagePath
                    }
                />

                <DestinationCTA
                    countryName={
                        countryName
                    }
                    onOpenCounselling={() =>
                        setShowCounselling(
                            true
                        )
                    }
                />

                <FAQ />
            </main>

            {/* <CounsellingModal
                open={showCounselling}
                onClose={() =>
                    setShowCounselling(
                        false
                    )
                }
            /> */}
        </>
    );
}

function QuickInfo({ country }) {
    const currencyName =
        toSafeText(
            country?.currency,
            ""
        );

    const currencySymbol =
        toSafeText(
            country?.currency_symbol ??
            country?.currencySymbol,
            ""
        );

    const currency = [
        currencySymbol,
        currencyName,
    ]
        .filter(Boolean)
        .join(" ");

    const items = [
        {
            icon: University,
            label: "Capital",
            value: toSafeText(
                country?.capital,
                "N/A"
            ),
        },
        {
            icon: Languages,
            label: "Language",
            value: toSafeText(
                country?.language ??
                country
                    ?.official_language,
                "N/A"
            ),
        },
        {
            icon: Banknote,
            label: "Currency",
            value:
                currency || "N/A",
        },
        {
            icon: Phone,
            label: "Dialling Code",
            value: toSafeText(
                country?.diallingcode ??
                country
                    ?.dialling_code ??
                country?.phone_code,
                "N/A"
            ),
        },
        {
            icon: Thermometer,
            label: "Temperature",
            value: toSafeText(
                country?.temperature ??
                country?.climate,
                "N/A"
            ),
        },
        {
            icon: Earth,
            label: "Continent",
            value: toSafeText(
                country?.continent,
                "N/A"
            ),
        },
    ];

    return (
        <section
            aria-label="Destination information"
            className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        >
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
                {items.map(
                    ({
                        icon: Icon,
                        label,
                        value,
                    }) => (
                        <article
                            key={label}
                            className="group rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
                        >
                            <span className="mx-auto grid size-12 place-content-center rounded-full bg-primary text-white transition group-hover:bg-darkPrimary">
                                <Icon
                                    size={20}
                                    aria-hidden="true"
                                />
                            </span>

                            <p className="mt-4 text-xs font-semibold text-slate-500">
                                {label}
                            </p>

                            <h2 className="mt-1 break-words font-black text-slate-900">
                                {value}
                            </h2>
                        </article>
                    )
                )}
            </div>
        </section>
    );
}

function AboutDestination({
    country,
    countryName,
    image,
    flag,
}) {
    const description = toSafeText(
        country?.description ??
        country?.short_description ??
        country?.details ??
        country?.content,
        `Discover education, lifestyle and career opportunities in ${countryName}.`
    );

    return (
        <section
            aria-labelledby="about-destination-heading"
            className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-3 lg:px-8"
        >
            <article className="overflow-hidden rounded-3xl bg-white shadow-md md:grid md:grid-cols-2 lg:col-span-2">
                <div className="relative min-h-[280px] bg-gradient-to-br from-slate-50 to-primary/5">
                    <Image
                        src={flag || image}
                        alt={
                            flag
                                ? `Flag of ${countryName}`
                                : `Explore ${countryName}`
                        }
                        fill
                        sizes="(max-width: 767px) 92vw, 45vw"
                        className={
                            flag
                                ? "object-contain p-8"
                                : "object-cover"
                        }
                    />
                </div>

                <div className="p-6 sm:p-8">
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-primary">
                        Destination Overview
                    </p>

                    <h2
                        id="about-destination-heading"
                        className="mt-3 text-3xl font-black text-slate-950"
                    >
                        About {countryName}
                    </h2>

                    <p className="mt-5 leading-7 text-slate-600">
                        {description}
                    </p>
                </div>
            </article>

            <article className="relative min-h-[340px] overflow-hidden rounded-3xl shadow-md">
                <Image
                    src={image}
                    alt={`Explore ${countryName}`}
                    fill
                    sizes="(max-width: 1023px) 92vw, 32vw"
                    className="object-cover"
                />

                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"
                />

                <p className="absolute inset-x-7 bottom-7 text-lg font-semibold leading-7 text-white">
                    Discover quality
                    education, global
                    exposure and exciting
                    career opportunities in{" "}
                    {countryName}.
                </p>
            </article>
        </section>
    );
}

function WhyChoose({
    countryName,
    attractions = [],
}) {
    return (
        <section
            aria-labelledby="why-choose-destination-heading"
            className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
        >
            <div className="rounded-3xl bg-white p-6 shadow-md sm:p-8">
                <div className="max-w-3xl">
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-primary">
                        Destination Benefits
                    </p>

                    <h2
                        id="why-choose-destination-heading"
                        className="mt-3 text-3xl font-black text-slate-950"
                    >
                        Why Choose{" "}
                        {countryName}?
                    </h2>
                </div>

                {attractions.length > 0 ? (
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {attractions.map(
                            (item) => (
                                <article
                                    key={
                                        item.id
                                    }
                                    className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-primary/20 hover:bg-white hover:shadow-md"
                                >
                                    <span className="grid size-10 shrink-0 place-content-center rounded-full bg-primary text-white transition group-hover:bg-darkPrimary">
                                        <Check
                                            size={18}
                                            aria-hidden="true"
                                        />
                                    </span>

                                    <p className="text-sm font-semibold leading-6 text-slate-700">
                                        {
                                            item.text
                                        }
                                    </p>
                                </article>
                            )
                        )}
                    </div>
                ) : (
                    <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-slate-500">
                        Destination highlights
                        will be available soon.
                    </div>
                )}
            </div>
        </section>
    );
}

function UniversitiesSection({
    countryId,
    countryName,
    universities = [],
    universityImagePath = "",
}) {
    return (
        <section
            id="universities"
            aria-labelledby="destination-universities-heading"
            className="mx-auto max-w-7xl scroll-mt-24 px-4 py-5 sm:px-6 lg:px-8"
        >

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <DestinationUniversities
                        countryId={countryId}
                        countryName={countryName}
                        universities={universities}
                        universityImagePath={
                            universityImagePath
                        }
                    />
                </div>



            </div>
        </section>
    );
}

function DestinationCTA({
    countryName,
    onOpenCounselling,
}) {
    return (
        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-secondary to-[#07477f] p-7 text-white shadow-[0_18px_45px_rgba(4,102,175,0.2)] sm:p-10">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:18px_18px]"
                />

                <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.15em] text-white/70">
                            Start Your Journey
                        </p>

                        <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                            Ready to Start Your
                            Journey in{" "}
                            {countryName}?
                        </h2>

                        <p className="mt-3 max-w-2xl text-white/80">
                            Get expert guidance
                            for admissions,
                            scholarships, visas
                            and documentation.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={
                            onOpenCounselling
                        }
                        className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-xl bg-white px-7 font-bold text-darkPrimary shadow-lg transition hover:-translate-y-1 hover:bg-logoYellow"
                    >
                        Get Free Counselling

                        <ArrowRight
                            size={18}
                            aria-hidden="true"
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </button>
                </div>
            </div>
        </section>
    );
}