"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    ChevronLeft,
    ChevronRight,
    Loader2,
    PlayCircle,
} from "lucide-react";

import {
    Navigation,
} from "swiper/modules";

import {
    Swiper,
    SwiperSlide,
} from "swiper/react";

import AusbildungVideoCard from "./AusbildungVideoCard";

export default function AusbildungVideoSection({
    program,
    videos = [],
    isLoading,
    isError,
}) {
    const previousButtonRef =
        useRef(null);

    const nextButtonRef =
        useRef(null);

    const [
        swiperInstance,
        setSwiperInstance,
    ] = useState(null);

    useEffect(() => {
        if (
            !swiperInstance ||
            !previousButtonRef.current ||
            !nextButtonRef.current
        ) {
            return;
        }

        swiperInstance.params.navigation.prevEl =
            previousButtonRef.current;

        swiperInstance.params.navigation.nextEl =
            nextButtonRef.current;

        swiperInstance.navigation.destroy();
        swiperInstance.navigation.init();
        swiperInstance.navigation.update();
    }, [swiperInstance]);

    return (
        <section
            aria-labelledby="ausbildung-videos-title"
            className="
                relative
                mt-10
                overflow-hidden
                rounded-[32px]
                border
                border-slate-200/80
                bg-white/80
                px-4
                py-10
                shadow-[0_24px_70px_rgba(15,23,42,0.08)]
                backdrop-blur-xl
                sm:mt-14
                sm:px-7
                sm:py-12
                lg:px-9
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-14
                    -top-14
                    h-40
                    w-40
                    rounded-full
                    border-[28px]
                    border-primary/5
                "
            />

            <div
                className="
                    relative
                    mb-8
                    flex
                    flex-col
                    gap-5
                    sm:flex-row
                    sm:items-end
                    sm:justify-between
                "
            >
                <div>
                    <div
                        className="
                            mb-3
                            flex
                            items-center
                            gap-3
                        "
                    >
                        <span
                            className="
                                grid
                                h-11
                                w-11
                                place-items-center
                                rounded-xl
                                bg-primary
                                text-white
                                shadow-lg
                            "
                        >
                            <PlayCircle
                                aria-hidden="true"
                                size={23}
                            />
                        </span>

                        <span
                            className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-primary
                            "
                        >
                            Watch and Explore
                        </span>
                    </div>

                    <h3
                        id="ausbildung-videos-title"
                        className="
                            text-2xl
                            font-extrabold
                            text-slate-950
                            sm:text-3xl
                        "
                    >
                        Ausbildung — Germany&apos;s
                        Most In-Demand Career Path
                    </h3>

                    <p
                        className="
                            mt-2
                            max-w-2xl
                            text-sm
                            leading-7
                            text-slate-600
                        "
                    >
                        Watch useful videos
                        about Ausbildung,
                        career opportunities
                        and student life in
                        Germany.
                    </p>
                </div>

                {videos.length > 1 && (
                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >
                        <button
                            ref={
                                previousButtonRef
                            }
                            type="button"
                            aria-label="Show previous Ausbildung video"
                            className="
                                grid
                                h-11
                                w-11
                                place-items-center
                                rounded-full
                                bg-darkPrimary
                                text-white
                                shadow-md
                                transition
                                hover:bg-primary
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                            "
                        >
                            <ChevronLeft
                                aria-hidden="true"
                                size={21}
                            />
                        </button>

                        <button
                            ref={
                                nextButtonRef
                            }
                            type="button"
                            aria-label="Show next Ausbildung video"
                            className="
                                grid
                                h-11
                                w-11
                                place-items-center
                                rounded-full
                                bg-darkPrimary
                                text-white
                                shadow-md
                                transition
                                hover:bg-primary
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                            "
                        >
                            <ChevronRight
                                aria-hidden="true"
                                size={21}
                            />
                        </button>
                    </div>
                )}
            </div>

            {isLoading && (
                <div
                    className="
                        flex
                        justify-center
                        py-14
                    "
                >
                    <Loader2
                        className="
                            animate-spin
                            text-primary
                        "
                        size={38}
                    />
                </div>
            )}

            {!isLoading && isError && (
                <p
                    className="
                        rounded-2xl
                        border
                        border-red-200
                        bg-red-50
                        px-5
                        py-8
                        text-center
                        font-semibold
                        text-red-600
                    "
                >
                    Failed to load
                    Ausbildung videos.
                </p>
            )}

            {!isLoading &&
                !isError &&
                videos.length === 0 && (
                    <div
                        className="
                            rounded-3xl
                            border
                            border-dashed
                            border-slate-300
                            bg-white
                            px-6
                            py-12
                            text-center
                        "
                    >
                        <PlayCircle
                            aria-hidden="true"
                            className="
                                mx-auto
                                text-slate-300
                            "
                            size={44}
                        />

                        <p
                            className="
                                mt-4
                                font-semibold
                                text-slate-500
                            "
                        >
                            Ausbildung videos
                            are not available.
                        </p>
                    </div>
                )}

            {!isLoading &&
                !isError &&
                videos.length > 0 && (
                    <Swiper
                        key={`ausbildung-${program?.id}`}
                        modules={[
                            Navigation,
                        ]}
                        navigation={{
                            prevEl:
                                previousButtonRef.current,
                            nextEl:
                                nextButtonRef.current,
                        }}
                        onSwiper={
                            setSwiperInstance
                        }
                        loop={false}
                        grabCursor
                        watchOverflow
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            768: {
                                slidesPerView:
                                    2,
                            },
                            1024: {
                                slidesPerView:
                                    3,
                            },
                        }}
                        className="
                            ausbildung-video-swiper
                            !overflow-hidden
                            !pb-10
                        "
                    >
                        {videos.map(
                            (
                                video,
                                index
                            ) => (
                                <SwiperSlide
                                    key={
                                        video?.id ??
                                        index
                                    }
                                    className="!h-auto"
                                >
                                    <AusbildungVideoCard
                                        video={
                                            video
                                        }
                                        index={
                                            index
                                        }
                                    />
                                </SwiperSlide>
                            )
                        )}
                    </Swiper>
                )}
        </section>
    );
}