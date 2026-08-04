"use client";

import GermanCoursesLayout from "@/components/home/german-courses/GermanCoursesLayout";
import FAQ from "@/components/home/FAQ/FAQ";

export default function GermanProgramsClient() {
    return (
        <main className="overflow-hidden bg-white">
            <GermanProgramsHero />

            <GermanCoursesLayout />

            <section
                className="
                    mx-auto max-w-7xl
                    px-4 py-14
                    sm:px-6
                    lg:px-8 lg:py-20
                "
            >
                <FAQ />
            </section>
        </main>
    );
}

function GermanProgramsHero() {
    return (
        <section
            className="
                relative overflow-hidden
                bg-gradient-to-br
                from-[#fff7fa]
                via-white
                to-[#eef7ff]
                px-4 py-14
                sm:px-6 sm:py-16
                lg:px-8 lg:py-20
            "
        >
            <div
                aria-hidden="true"
                className="
                    absolute -left-28
                    top-10 size-72
                    rounded-full
                    bg-primary/10
                    blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    absolute -right-28
                    bottom-10 size-72
                    rounded-full
                    bg-secondary/10
                    blur-3xl
                "
            />

            <div
                className="
                    relative mx-auto
                    max-w-7xl
                    text-center
                "
            >
                <p
                    className="
                        text-sm font-black
                        uppercase
                        tracking-[0.18em]
                        text-primary
                    "
                >
                    Study. Work. Settle.
                </p>

                <h1
                    className="
                        mx-auto mt-4
                        max-w-4xl
                        text-4xl font-black
                        leading-tight
                        text-darkPrimary
                        sm:text-5xl
                        lg:text-6xl
                    "
                >
                    Explore German{" "}
                    <span className="text-primary">
                        Study and Career Programs
                    </span>
                </h1>

                <p
                    className="
                        mx-auto mt-6
                        max-w-3xl
                        text-base leading-8
                        text-slate-600
                        sm:text-lg
                    "
                >
                    Discover university programs,
                    Ausbildung opportunities and
                    career pathways designed for
                    international students planning
                    their future in Germany.
                </p>
            </div>
        </section>
    );
}