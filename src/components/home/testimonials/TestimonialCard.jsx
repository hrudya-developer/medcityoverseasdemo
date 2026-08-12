"use client";

import {
    MapPin,
    Quote,
    Star,
} from "lucide-react";

import {
    useState,
} from "react";

const FALLBACK_IMAGE =
    "/assets/avatarFallback.png";

const TestimonialCard = ({
    testimonial,
}) => {
    const name =
        testimonial?.name || "Student";

    const country =
        testimonial?.country || "";

    const text =
        testimonial?.text || "";

    const [imageSource, setImageSource] =
        useState(
            testimonial?.image ||
            FALLBACK_IMAGE
        );

    const displayText =
        text.length > 220
            ? `${text.slice(0, 220)}...`
            : text;

    return (
        <article
            className="group relative mx-auto flex min-h-[540px] w-full max-w-[390px] flex-col overflow-hidden rounded-[28px] border border-white/90 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.13)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(192,31,83,0.22)]"
        >
            <div
                className="relative h-[185px] shrink-0 overflow-hidden bg-gradient-to-br from-darkPrimary via-darkPrimary to-darkPrimary"
            >
                <div
                    aria-hidden="true"
                    className="absolute inset-y-0 right-0 w-[58%] opacity-20 [background-image:radial-gradient(circle,rgba(255,255,255,0.9)_1.4px,transparent_1.4px)] [background-size:12px_12px]"
                />

                <Quote
                    aria-hidden="true"
                    className="absolute left-6 top-6 h-10 w-10 text-white/15"
                />
            </div>

            <div
                className="absolute left-1/2 top-[25px] z-20 -translate-x-1/2"
            >
                <div
                    className="relative rounded-[20px] bg-white p-[7px] shadow-[0_18px_45px_rgba(15,23,42,0.3)]"
                >
                    <div
                        aria-hidden="true"
                        className="absolute -inset-2 rounded-[22px] border-2 border-dashed border-primary/30 transition-transform duration-700 group-hover:rotate-180"
                    />

                    <img
                        src={imageSource}
                        alt={`${name} testimonial`}
                        onError={() => {
                            if (
                                imageSource !==
                                FALLBACK_IMAGE
                            ) {
                                setImageSource(
                                    FALLBACK_IMAGE
                                );
                            }
                        }}
                        className="relative h-[205px] w-[205px] rounded-[15px] object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-[225px] sm:w-[225px]"
                    />
                </div>
            </div>

            <div
                className="relative z-10 flex flex-1 flex-col items-center px-7 pb-8 pt-[112px] text-center sm:px-9"
            >
                <div
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                    <Quote className="h-5 w-5" />
                </div>

                {displayText ? (
                    <blockquote
                        className="mt-4 line-clamp-5 text-[13px] italic leading-6 text-slate-600"
                    >
                        “{displayText}”
                    </blockquote>
                ) : (
                    <p className="mt-4 text-[13px] italic leading-6 text-slate-500">
                        A successful study abroad
                        experience with Medcity
                        Study Abroad.
                    </p>
                )}

                <footer className="mt-auto pt-6">
                    <h3
                        className="text-[16px] font-extrabold uppercase tracking-wide text-slate-900 sm:text-[17px]"
                    >
                        {name}
                    </h3>

                    {country && (
                        <p
                            className="mt-2 flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500"
                        >
                            <MapPin className="h-3.5 w-3.5 text-primary" />

                            {country}
                        </p>
                    )}

                    <div
                        aria-label="Rated 5 out of 5 stars"
                        className="mt-3 flex justify-center gap-1 text-yellow-400"
                    >
                        {Array.from({
                            length: 5,
                        }).map(
                            (_, index) => (
                                <Star
                                    key={
                                        index
                                    }
                                    aria-hidden="true"
                                    className="h-4 w-4 fill-current"
                                />
                            )
                        )}
                    </div>
                </footer>
            </div>

            <div
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 h-1 w-24 -translate-x-1/2 rounded-t-full bg-darkPrimary"
            />
        </article>
    );
};

export default TestimonialCard;