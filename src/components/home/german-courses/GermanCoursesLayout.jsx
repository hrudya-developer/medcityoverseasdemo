"use client";

import { useMemo } from "react";

import Link from "next/link";

import {
    ArrowRight,
    Loader2,
} from "lucide-react";

import GermanCoursesSlider from "./GermanCoursesSlider";
import AusbildungVideoSection from "./AusbildungVideoSection";

import {
    useGetGermanProgramDetailsQuery,
    useGetHomeGermanProgramsQuery,
} from "@/lib/services/germanProgramsApi.js";

import {
    isAusbildungProgram,
    sortGermanPrograms,
} from "./germanProgramsHelpers";

import "./germanCourses.css";

export default function GermanCoursesLayout() {
    const {
        data: homeData,
        isLoading: programsLoading,
        isError: programsError,
    } = useGetHomeGermanProgramsQuery(
        0
    );

    const cards = useMemo(
        () =>
            sortGermanPrograms(
                homeData?.programs ?? []
            ),
        [homeData?.programs]
    );

    const ausbildungProgram =
        useMemo(
            () =>
                cards.find(
                    isAusbildungProgram
                ) ||
                cards[0] ||
                null,
            [cards]
        );

    const {
        data: programDetails,
        isLoading: videosLoading,
        isError: videosError,
    } =
        useGetGermanProgramDetailsQuery(
            {
                uid: 0,
                id: ausbildungProgram?.id,
            },
            {
                skip:
                    !ausbildungProgram?.id,
            }
        );

    return (
        <section
            id="german-popular-courses"
            aria-labelledby="german-courses-heading"
            className="
                relative
                overflow-hidden
                bg-gradient-to-br
                from-pink-50
                via-white
                to-blue-50
                py-14
                sm:py-16
                lg:py-20
            "
        >
            <BackgroundDecorations />

            <div
                className="
                    relative
                    mx-auto
                    max-w-7xl
                    px-4
                    sm:px-6
                    lg:px-8
                "
            >
                <div
                    className="
                        grid
                        items-center
                        gap-10
                        lg:grid-cols-[0.85fr_1.65fr]
                    "
                >
                    <div
                        className="
                            text-center
                            lg:text-left
                        "
                    >
                        <span
                            className="
                                inline-flex
                                rounded-full
                                border
                                border-pink-200
                                bg-white
                                px-4
                                py-2
                                text-xs
                                font-bold
                                uppercase
                                tracking-widest
                                text-primary
                                shadow-sm
                            "
                        >
                            Study. Work. Settle
                            in Germany
                        </span>

                        <h1
                            id="german-courses-heading"
                            className="
                                mt-5
                                font-nunito
                                text-3xl
                                font-extrabold
                                leading-tight
                                text-darkPrimary
                                sm:text-4xl
                                lg:text-5xl
                            "
                        >
                            German{" "}
                            <span className="lg:block">
                                Popular{" "}
                                <span
                                    className="
                                        bg-gradient-to-r
                                        from-primary
                                        via-[#a83d8b]
                                        to-secondary
                                        bg-clip-text
                                        text-transparent
                                    "
                                >
                                    Courses
                                </span>
                            </span>
                        </h1>

                        <p
                            className="
                                mx-auto
                                mt-5
                                max-w-md
                                text-sm
                                leading-7
                                text-slate-600
                                sm:text-base
                                lg:mx-0
                            "
                        >
                            Discover leading
                            German study and
                            career pathways for
                            education, employment
                            and international
                            experience.
                        </p>

                        <Link
                            href="/germanPopularCourses"
                            className="
                                mt-7
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                rounded-2xl
                                bg-primary
                                px-5
                                py-3
                                text-sm
                                font-bold
                                text-white
                                shadow-lg
                                shadow-pink-200
                                transition
                                hover:-translate-y-1
                                hover:bg-darkPrimary
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-primary
                                focus-visible:ring-offset-2
                                sm:text-base
                            "
                        >
                            View All Programs

                            <ArrowRight
                                aria-hidden="true"
                                size={20}
                            />
                        </Link>
                    </div>

                    <div className="min-w-0">
                        {programsLoading && (
                            <div
                                className="
                                    flex
                                    min-h-[380px]
                                    items-center
                                    justify-center
                                "
                            >
                                <Loader2
                                    className="
                                        animate-spin
                                        text-darkPrimary
                                    "
                                    size={40}
                                />
                            </div>
                        )}

                        {!programsLoading &&
                            programsError && (
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
                                    German programs.
                                </p>
                            )}

                        {!programsLoading &&
                            !programsError &&
                            cards.length ===
                            0 && (
                                <p
                                    className="
                                        rounded-2xl
                                        border
                                        border-dashed
                                        border-slate-300
                                        bg-white
                                        px-5
                                        py-10
                                        text-center
                                        text-slate-500
                                    "
                                >
                                    No German
                                    programs found.
                                </p>
                            )}

                        {!programsLoading &&
                            !programsError &&
                            cards.length >
                            0 && (
                                <GermanCoursesSlider
                                    cards={cards}
                                    imagePath={
                                        homeData?.imagePath ??
                                        ""
                                    }
                                />
                            )}
                    </div>
                </div>

                {!programsLoading &&
                    !programsError &&
                    ausbildungProgram && (
                        <AusbildungVideoSection
                            program={
                                ausbildungProgram
                            }
                            videos={
                                programDetails?.youtube ??
                                []
                            }
                            isLoading={
                                videosLoading
                            }
                            isError={
                                videosError
                            }
                        />
                    )}
            </div>
        </section>
    );
}

function BackgroundDecorations() {
    return (
        <>
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-28
                    top-12
                    h-72
                    w-72
                    rounded-full
                    bg-pink-200/40
                    blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-28
                    bottom-8
                    h-72
                    w-72
                    rounded-full
                    bg-blue-200/40
                    blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.22]
                    [background-image:radial-gradient(circle_at_1px_1px,rgba(99,26,51,0.12)_1px,transparent_0)]
                    [background-size:24px_24px]
                "
            />
        </>
    );
}