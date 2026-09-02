"use client";

import {
    useState,
} from "react";

import {
    ChevronDown,
    ChevronUp,
} from "lucide-react";

import TestimonialCard from "@/components/home/testimonials/TestimonialCard";

export default function TestimonialsGrid({
    testimonials = [],
}) {
    const [expanded, setExpanded] =
        useState(false);

    if (!Array.isArray(testimonials) || testimonials.length === 0) {
        return null;
    }

    return (
        <div className="mt-10 sm:mt-12 lg:mt-14">
            {/* ================================================
                TESTIMONIAL GRID
            ================================================= */}

            <div
                className={`
                    grid
                    grid-cols-1
                    gap-6

                    sm:grid-cols-2
                    sm:gap-7

                    xl:grid-cols-3
                    xl:gap-8

                    ${
                        expanded
                            ? ""
                            : `
                                [&>*:nth-child(n+2)]:hidden

                                sm:[&>*:nth-child(n+2)]:block
                                sm:[&>*:nth-child(n+3)]:hidden

                                xl:[&>*:nth-child(n+3)]:block
                                xl:[&>*:nth-child(n+4)]:hidden
                            `
                    }
                `}
            >
                {testimonials.map(
                    (
                        testimonial,
                        index
                    ) => (
                        <TestimonialCard
                            key={
                                testimonial.id ||
                                testimonial._id ||
                                index
                            }
                            testimonial={
                                testimonial
                            }
                        />
                    )
                )}
            </div>

            {/* ================================================
                VIEW MORE / SHOW LESS
            ================================================= */}

            {testimonials.length > 1 && (
                <div
                    className="
                        mt-8
                        flex
                        justify-center

                        sm:mt-10

                        lg:mt-12
                    "
                >
                    <button
                        type="button"
                        onClick={() =>
                            setExpanded(
                                (previous) =>
                                    !previous
                            )
                        }
                        aria-expanded={
                            expanded
                        }
                        className="
                            group

                            inline-flex
                            min-h-[46px]
                            items-center
                            justify-center
                            gap-2

                            rounded-2xl

                            border
                            border-primary/15

                            bg-white

                            px-5
                            py-2.5

                            text-sm
                            font-extrabold
                            text-primary

                            shadow-[0_8px_25px_rgba(192,31,83,0.10)]

                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:border-primary/30
                            hover:bg-primary
                            hover:text-white
                            hover:shadow-[0_12px_30px_rgba(192,31,83,0.18)]

                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-primary
                            focus-visible:ring-offset-2

                            sm:min-h-[48px]
                            sm:px-6
                            sm:text-[15px]
                        "
                    >
                        <span>
                            {expanded
                                ? "Show Less"
                                : "View More"}
                        </span>

                        <span
                            className="
                                grid
                                size-7
                                place-items-center

                                rounded-full

                                bg-primary/10

                                transition-all
                                duration-300

                                group-hover:bg-white/15
                            "
                        >
                            {expanded ? (
                                <ChevronUp
                                    className="size-4"
                                    aria-hidden="true"
                                />
                            ) : (
                                <ChevronDown
                                    className="size-4"
                                    aria-hidden="true"
                                />
                            )}
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
}