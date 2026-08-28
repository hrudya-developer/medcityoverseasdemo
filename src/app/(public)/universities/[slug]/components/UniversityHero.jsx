"use client";

import Image from "next/image";

import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Globe,
    Landmark,
    MapPin,
    Trophy,
} from "lucide-react";

import {
    Swiper,
    SwiperSlide,
} from "swiper/react";

import {
    Autoplay,
    Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import UniversityBreadcrumb from "./UniversityBreadcrumb";

export default function UniversityHero({
    data,
    onBack,
    onCourses,
}) {
    const {
        universityName,
        locationText,
        ranking,
        universityType,
        countryName,
        aboutText,
        logo,
        sliderImages = [],
    } = data;

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#071936] via-[#0b2853] to-darkPrimary px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
            <div className="mx-auto max-w-7xl">
                <UniversityBreadcrumb
                    universityName={
                        universityName
                    }
                />



                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
                    <div className="text-center lg:text-left">
                        <div className="flex flex-col items-center gap-5 lg:flex-row">
                            <div className="relative grid size-20 shrink-0 place-content-center overflow-hidden rounded-2xl bg-white p-3 shadow-2xl">
                                {logo ? (
                                    <Image
                                        src={logo}
                                        alt={`${universityName} logo`}
                                        fill
                                        sizes="80px"
                                        className="object-contain p-3"
                                        priority
                                    />
                                ) : (
                                    <Landmark className="size-10 text-primary" />
                                )}
                            </div>

                            <div>
                                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-logoYellow">
                                    University Profile
                                </p>

                                <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl xl:text-5xl">
                                    {universityName}

                                    <CheckCircle className="ml-3 inline size-7 fill-primary text-white" />
                                </h1>
                            </div>
                        </div>

                        <p className="mt-6 flex items-center justify-center gap-2 font-bold text-logoYellow lg:justify-start">
                            <MapPin className="size-5" />

                            {locationText}
                        </p>

                        <p className="mx-auto mt-5 line-clamp-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base lg:mx-0">
                            {aboutText}
                        </p>

                        <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
                            <HeroBadge
                                icon={Trophy}
                                text={`Ranking ${ranking}`}
                                solid
                            />

                            <HeroBadge
                                icon={Landmark}
                                text={universityType}
                            />

                            <HeroBadge
                                icon={Globe}
                                text={countryName}
                            />
                        </div>

                        <button
                            type="button"
                            onClick={onCourses}
                            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3 font-bold text-white transition hover:bg-white hover:text-primary"
                        >
                            Explore Courses

                            <ArrowRight className="size-5" />
                        </button>
                    </div>

                    <div className="mx-auto w-full max-w-[420px]">
                        <div className="relative aspect-square overflow-hidden rounded-[36px] border border-white/20 bg-white/10 p-3 shadow-2xl">
                            {sliderImages.length >
                                0 ? (
                                <Swiper
                                    modules={[
                                        Autoplay,
                                        Pagination,
                                    ]}
                                    loop={
                                        sliderImages.length >
                                        1
                                    }
                                    autoplay={
                                        sliderImages.length >
                                            1
                                            ? {
                                                delay: 3500,
                                                disableOnInteraction:
                                                    false,
                                            }
                                            : false
                                    }
                                    pagination={{
                                        clickable: true,
                                    }}
                                    className="h-full w-full overflow-hidden rounded-[28px]"
                                >
                                    {sliderImages.map(
                                        (
                                            image,
                                            index
                                        ) => (
                                            <SwiperSlide
                                                key={`${image}-${index}`}
                                            >
                                                <div className="relative h-full w-full">
                                                    <Image
                                                        src={
                                                            image
                                                        }
                                                        alt={`${universityName} campus ${index +
                                                            1
                                                            }`}
                                                        fill
                                                        sizes="(max-width: 768px) 90vw, 420px"
                                                        priority={
                                                            index ===
                                                            0
                                                        }
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        )
                                    )}
                                </Swiper>
                            ) : (
                                <div className="grid h-full place-content-center text-white">
                                    <Landmark className="size-24" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function HeroBadge({
    icon: Icon,
    text,
    solid = false,
}) {
    if (!text) return null;

    return (
        <span
            className={
                solid
                    ? "inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary"
                    : "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
            }
        >
            <Icon className="size-4" />

            {text}
        </span>
    );
}