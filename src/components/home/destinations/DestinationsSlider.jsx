"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Navigation,
} from "swiper/modules";

import {
    Swiper,
    SwiperSlide,
} from "swiper/react";

import DestinationCard from "./destinationCard/DestinationCard";
import DestinationNavigation from "./DestinationNavigation";

import "swiper/css";
import "swiper/css/navigation";

export default function DestinationsSlider({
    destinations = [],
    imagePath = "",
}) {
    const previousButtonRef =
        useRef(null);

    const nextButtonRef =
        useRef(null);

    const [swiperInstance, setSwiperInstance] =
        useState(null);

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

    if (!destinations.length) {
        return null;
    }

    return (
        <div className="relative">
            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: previousButtonRef.current,
                    nextEl: nextButtonRef.current,
                }}
                onSwiper={setSwiperInstance}
                slidesPerView={1}
                slidesPerGroup={1}
                spaceBetween={16}
                speed={650}
                grabCursor
                watchOverflow
                allowTouchMove
                loop={destinations.length > 3}
                breakpoints={{
                    480: {
                        slidesPerView: 1.15,
                        slidesPerGroup: 1,
                        spaceBetween: 16,
                    },

                    640: {
                        slidesPerView: 2,
                        slidesPerGroup: 1,
                        spaceBetween: 18,
                    },

                    900: {
                        slidesPerView: 2.5,
                        slidesPerGroup: 1,
                        spaceBetween: 22,
                    },

                    1024: {
                        slidesPerView: 3,
                        slidesPerGroup: 1,
                        spaceBetween: 24,
                    },

                    1280: {
                        slidesPerView: 3,
                        slidesPerGroup: 1,
                        spaceBetween: 28,
                    },
                }}
                className="destinationSwiper !overflow-hidden !pb-2"
            >
                {destinations.map(
                    (
                        destination,
                        index
                    ) => (
                        <SwiperSlide
                            key={
                                destination?.id ??
                                destination?.country ??
                                index
                            }
                            className="!h-auto"
                        >
                            <DestinationCard
                                destination={
                                    destination
                                }
                                imagePath={
                                    imagePath
                                }
                                index={index}
                            />
                        </SwiperSlide>
                    )
                )}
            </Swiper>

            <DestinationNavigation
                previousButtonRef={
                    previousButtonRef
                }
                nextButtonRef={
                    nextButtonRef
                }
            />
        </div>
    );
}