"use client";

import Link from "next/link";

import cn from "@/lib/cn";

import {
    ArrowRight,
    Quote,
} from "lucide-react";

import {
    useGetTestimonialsQuery,
} from "@/lib/services/testimonialsApi";

import TestimonialHeader from "./TestimonialHeader";
import TestimonialSlider from "./TestimonialSlider";

const DotPattern = ({
    className = "",
}) => (
    <div
        aria-hidden="true"
        className={cn(`
            pointer-events-none absolute
            grid grid-cols-5 gap-3
            ${className}
        `)}
    >
        {Array.from({
            length: 25,
        }).map((_, index) => (
            <span
                key={index}
                className="h-1.5 w-1.5 rounded-full bg-primary/25"
            />
        ))}
    </div>
);

const TestimonialSkeleton = () => (
    <div
        aria-label="Loading testimonials"
        aria-live="polite"
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
        {Array.from({
            length: 3,
        }).map((_, index) => (
            <div
                key={index}
                className="mx-auto h-[540px] w-full max-w-[390px] animate-pulse overflow-hidden rounded-[28px] bg-white shadow-sm"
            >
                <div className="h-[185px] bg-slate-200" />

                <div
                    className="mx-auto -mt-[155px] h-[225px] w-[225px] rounded-[20px] border-[7px] border-white bg-slate-300"
                />

                <div className="space-y-3 px-8 pt-12">
                    <div className="h-4 rounded bg-slate-100" />

                    <div className="h-4 rounded bg-slate-100" />

                    <div className="mx-auto h-4 w-9/12 rounded bg-slate-100" />

                    <div className="mx-auto mt-8 h-5 w-1/2 rounded bg-slate-200" />
                </div>
            </div>
        ))}
    </div>
);

const TestimonialSection = () => {
    const {
        data: testimonials = [],
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
    } = useGetTestimonialsQuery();

    const featuredTestimonials =
        testimonials.slice(0, 9);

    const showLoading =
        isLoading ||
        (isFetching &&
            testimonials.length === 0);

    return (
        <section
            id="student-testimonials"
            aria-labelledby="testimonial-section-heading"
            className="relative isolate overflow-hidden bg-gradient-to-br from-[#fff6f9] via-white to-[#f3f9ff] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#c01f53_1px,transparent_1px),linear-gradient(to_bottom,#c01f53_1px,transparent_1px)] [background-size:44px_44px]"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-secondary/10 blur-[100px]"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-primary/10 blur-[100px]"
            />

            <DotPattern className="left-8 top-14 hidden sm:grid" />

            <DotPattern className="bottom-14 right-8 hidden opacity-70 md:grid" />

            <div className="relative z-10 mx-auto w-full max-w-[1500px]">
                <TestimonialHeader />

                {showLoading && (
                    <TestimonialSkeleton />
                )}

                {!showLoading &&
                    !isError &&
                    featuredTestimonials.length >
                    0 && (
                        <TestimonialSlider
                            testimonials={
                                featuredTestimonials
                            }
                        />
                    )}

                {!showLoading &&
                    isError && (
                        <div
                            role="alert"
                            className="mx-auto mt-12 max-w-lg rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm"
                        >
                            <p className="text-sm font-medium text-slate-600">
                                {error?.message ||
                                    error
                                        ?.data
                                        ?.message ||
                                    "Testimonials are currently unavailable."}
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    refetch()
                                }
                                className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-darkPrimary"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                {!showLoading &&
                    !isError &&
                    featuredTestimonials.length ===
                    0 && (
                        <p className="mt-12 text-center text-sm text-slate-500">
                            No testimonials found.
                        </p>
                    )}

                {!showLoading &&
                    !isError &&
                    featuredTestimonials.length >
                    0 && (
                        <div className="mt-8 flex justify-center sm:mt-10">
                            <Link
                                href="/all-testimonials"
                                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-darkPrimary px-6 py-3 text-sm font-bold text-white shadow-[0_14px_35px_rgba(192,31,83,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                            >
                                View All Testimonials

                                <ArrowRight
                                    aria-hidden="true"
                                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Link>
                        </div>
                    )}

                <div
                    aria-hidden="true"
                    className="mx-auto mt-14 flex max-w-md items-center justify-center gap-3 text-primary/20"
                >
                    <span className="h-px flex-1 bg-current" />

                    <div
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/10 bg-white text-primary shadow-sm"
                    >
                        <Quote className="h-5 w-5" />
                    </div>

                    <span className="h-px flex-1 bg-current" />
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;