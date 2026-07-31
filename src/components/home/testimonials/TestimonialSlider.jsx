"use client";

import {
    Autoplay,
    Pagination,
} from "swiper/modules";

import {
    Swiper,
    SwiperSlide,
} from "swiper/react";

import TestimonialCard from "./TestimonialCard";

import "swiper/css";
import "swiper/css/pagination";

const TestimonialSlider = ({
    testimonials = [],
}) => {
    if (!testimonials.length) {
        return null;
    }

    return (
        <div className="testimonial-slider mt-10 sm:mt-12 lg:mt-14">
            <Swiper
                modules={[
                    Autoplay
                ]}
                slidesPerView={1}
                spaceBetween={20}
                grabCursor
                watchOverflow
                loop={
                    testimonials.length > 3
                }
                autoplay={
                    testimonials.length > 1
                        ? {
                            delay: 3500,
                            disableOnInteraction:
                                false,
                            pauseOnMouseEnter:
                                true,
                        }
                        : false
                }
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 18,
                    },

                    640: {
                        slidesPerView: 2,
                        spaceBetween: 22,
                    },

                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 26,
                    },
                }}
                className="pb-14"
            >
                {testimonials.map(
                    (
                        testimonial,
                        index
                    ) => (
                        <SwiperSlide
                            key={
                                testimonial?.id ||
                                index
                            }
                            className="h-auto py-5"
                        >
                            <TestimonialCard
                                testimonial={
                                    testimonial
                                }
                            />
                        </SwiperSlide>
                    )
                )}
            </Swiper>

            <style jsx global>{`
                .testimonial-slider
                    .swiper-wrapper {
                    align-items: stretch;
                }

                .testimonial-slider
                    .swiper-slide {
                    height: auto;
                }

                .testimonial-slider
                    .swiper-pagination {
                    bottom: 4px;
                }

                .testimonial-slider
                    .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    background: #c01f53;
                    opacity: 0.25;
                    transition:
                        width 0.3s ease,
                        opacity 0.3s ease;
                }

                .testimonial-slider
                    .swiper-pagination-bullet-active {
                    width: 28px;
                    border-radius: 999px;
                    opacity: 1;
                }
            `}</style>
        </div>
    );
};

export default TestimonialSlider;