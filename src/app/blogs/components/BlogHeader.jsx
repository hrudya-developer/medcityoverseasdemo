"use client";

import { FaRss } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

export default function BlogHeader() {
    return (
        <header className="relative mx-auto max-w-9xl mb-10 overflow-hidden rounded-[40px] bg-gradient-to-br from-white via-[#fff8fb] to-[#f8fbff] py-20 px-6 text-center">

            {/* World Map */}
            <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.06] bg-[url('/assets/mapBg.png')] bg-center bg-no-repeat bg-contain"
            />

            {/* Grid Pattern */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_right,#d1d5db20_1px,transparent_1px),linear-gradient(to_bottom,#d1d5db20_1px,transparent_1px)] bg-[size:40px_40px]"
            />

            {/* Gradient Glow */}
            <div
                aria-hidden="true"
                className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-primary/15 blur-[120px]"
            />

            <div
                aria-hidden="true"
                className="absolute -right-20 bottom-12 h-80 w-80 rounded-full bg-secondary/10 blur-[130px]"
            />

            {/* Decorative Circles */}
            <span className="absolute left-12 top-16 h-5 w-5 rounded-full bg-primary/20" />
            <span className="absolute right-16 top-28 h-3 w-3 rounded-full bg-secondary/30" />
            <span className="absolute bottom-16 left-24 h-4 w-4 rounded-full bg-primary/25" />
            <span className="absolute bottom-24 right-28 h-6 w-6 rounded-full bg-secondary/15" />

            <div className="relative z-10">

                <span className="mx-auto flex size-20 items-center justify-center rounded-full border border-primary/15 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(192,31,83,0.18)]">
                    <span className="absolute inset-0 animate-ping rounded-full bg-primary/10" />

                    <FaRss className="relative text-3xl text-primary" />
                </span>

                <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/70 px-6 py-2 backdrop-blur-md shadow-md">
                    <HiSparkles className="text-primary" />

                    <span className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                        Stay Updated
                    </span>
                </div>

                <h1
                    id="study-abroad-blog-heading"
                    className="mt-8 text-4xl font-black leading-tight text-darkPrimary md:text-6xl"
                >
                    Latest{" "}
                    <span className="bg-gradient-to-r from-primary via-pink-500 to-secondary bg-clip-text text-transparent">
                        Study Abroad
                    </span>

                    <br />

                    Blogs & Student Guides
                </h1>

                <div className="mt-8 flex justify-center items-center gap-3">
                    <span className="h-1 w-16 rounded-full bg-primary" />

                    <span className="h-3 w-3 rounded-full bg-secondary shadow-lg shadow-secondary/40" />

                    <span className="h-1 w-16 rounded-full bg-primary" />
                </div>

                <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600">
                    Discover expert insights on
                    <span className="font-semibold text-secondary"> student visas</span>,
                    <span className="font-semibold text-secondary"> scholarships</span>,
                    <span className="font-semibold text-secondary"> university admissions</span>,
                    overseas destinations, career opportunities and real student experiences to confidently begin your international education journey.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-3">

                    {[
                        "🎓 Study Abroad",
                        "🌍 Universities",
                        "✈️ Student Visa",
                        "💰 Scholarships",
                        "📚 Career Guides",
                    ].map((item) => (
                        <span
                            key={item}
                            className="rounded-full border border-slate-200 bg-white/90 px-5 py-2 text-sm font-semibold text-slate-700 shadow transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-xl"
                        >
                            {item}
                        </span>
                    ))}

                </div>

            </div>

        </header>
    );
}