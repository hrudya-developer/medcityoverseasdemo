"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {
    Navigation,
} from "swiper/modules";

import {
    Swiper,
    SwiperSlide,
} from "swiper/react";

import GermanProgramCard from "./GermanProgramCard";

import "swiper/css";
import "swiper/css/navigation";

export default function GermanCoursesSlider({
    cards = [],
    imagePath = "",
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
        <div className="relative">
            <div
                className="mb-5 flex justify-center gap-3 lg:justify-end"
            >
                <button
                    ref={previousButtonRef}
                    type="button"
                    aria-label="Show previous German program"
                    className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-darkPrimary shadow-md transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ChevronLeft
                        aria-hidden="true"
                        size={22}
                    />
                </button>

                <button
                    ref={nextButtonRef}
                    type="button"
                    aria-label="Show next German program"
                    className="grid h-11 w-11 place-items-center rounded-full bg-primary text-white shadow-md transition hover:bg-darkPrimary disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ChevronRight
                        aria-hidden="true"
                        size={22}
                    />
                </button>
            </div>

            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl:
                        previousButtonRef.current,
                    nextEl:
                        nextButtonRef.current,
                }}
                onSwiper={setSwiperInstance}
                loop={cards.length > 2}
                grabCursor
                watchOverflow
                spaceBetween={18}
                slidesPerView={1}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                }}
                className="german-home-swiper !overflow-hidden !pb-5"
            >
                {cards.map(
                    (item, index) => (
                        <SwiperSlide
                            key={
                                item?.id ??
                                index
                            }
                            className="!h-auto py-2"
                        >
                            <GermanProgramCard
                                item={item}
                                imagePath={
                                    imagePath
                                }
                            />
                        </SwiperSlide>
                    )
                )}
            </Swiper>
        </div>
    );
}