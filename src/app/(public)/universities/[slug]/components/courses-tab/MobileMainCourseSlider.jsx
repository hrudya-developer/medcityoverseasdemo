"use client";

import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import MobileCourseCard from "./MobileCourseCard";

import {
    cleanId,
    getMainCourseId,
} from "./mainCourseHelpers";

export function MobileMainCourseSlider({
    courses = [],
    selectedMainCourseId = "",
    onSelectMainCourse,
}) {
    /* =========================================================
       SELECTED INDEX
    ========================================================= */

    const selectedIndex =
        useMemo(
            () => {
                const index =
                    courses.findIndex(
                        (
                            item
                        ) =>
                            getMainCourseId(
                                item
                            ) ===
                            cleanId(
                                selectedMainCourseId
                            )
                    );

                return index >=
                    0
                    ? index
                    : 0;
            },
            [
                courses,
                selectedMainCourseId,
            ]
        );

    const selectedCourse =
        courses[
            selectedIndex
        ];

    const hasPrevious =
        selectedIndex >
        0;

    const hasNext =
        selectedIndex <
        courses.length -
            1;

    /* =========================================================
       ANIMATION
    ========================================================= */

    const [
        direction,
        setDirection,
    ] = useState(
        "next"
    );

    const [
        animating,
        setAnimating,
    ] = useState(
        false
    );

    const [
        visibleCourse,
        setVisibleCourse,
    ] = useState(
        selectedCourse
    );

    const timeoutRef =
        useRef(
            null
        );

    /* =========================================================
       SYNC EXTERNAL TAB CHANGE

       If a category changes from somewhere else,
       keep the mobile slider synchronized.
    ========================================================= */

    useEffect(
        () => {
            if (
                !animating
            ) {
                setVisibleCourse(
                    selectedCourse
                );
            }
        },
        [
            selectedCourse,
            animating,
        ]
    );

    /* =========================================================
       CLEAN TIMEOUT
    ========================================================= */

    useEffect(
        () => {
            return () => {
                if (
                    timeoutRef.current
                ) {
                    window.clearTimeout(
                        timeoutRef.current
                    );
                }
            };
        },
        []
    );

    /* =========================================================
       CHANGE COURSE
    ========================================================= */

    function changeCourse(
        nextIndex,
        nextDirection
    ) {
        if (
            animating ||
            nextIndex < 0 ||
            nextIndex >=
                courses.length
        ) {
            return;
        }

        const nextCourse =
            courses[
                nextIndex
            ];

        const nextId =
            getMainCourseId(
                nextCourse
            );

        if (!nextId) {
            return;
        }

        setDirection(
            nextDirection
        );

        setAnimating(
            true
        );

        /*
         * Current card moves out.
         */
        timeoutRef.current =
            window.setTimeout(
                () => {
                    /*
                     * Swap visible card.
                     */
                    setVisibleCourse(
                        nextCourse
                    );

                    /*
                     * Update selected category
                     * and course results.
                     */
                    onSelectMainCourse?.(
                        nextId
                    );

                    /*
                     * Let React render the new card
                     * in its entering position.
                     */
                    window.requestAnimationFrame(
                        () => {
                            window.requestAnimationFrame(
                                () => {
                                    setAnimating(
                                        false
                                    );
                                }
                            );
                        }
                    );
                },
                180
            );
    }

    function handlePrevious() {
        changeCourse(
            selectedIndex -
                1,
            "previous"
        );
    }

    function handleNext() {
        changeCourse(
            selectedIndex +
                1,
            "next"
        );
    }

    /* =========================================================
       EMPTY
    ========================================================= */

    if (
        !Array.isArray(
            courses
        ) ||
        courses.length ===
            0
    ) {
        return null;
    }

    return (
        <div className="p-4 sm:hidden">
            <div
                role="tablist"
                aria-label="University main courses"
                className="
                    flex
                    items-center
                    gap-2
                "
            >
                {/* =============================================
                    PREVIOUS
                ============================================= */}

                <button
                    type="button"
                    onClick={
                        handlePrevious
                    }
                    disabled={
                        !hasPrevious ||
                        animating
                    }
                    aria-label="Previous main course"
                    className="
                        grid
                        size-9
                        shrink-0
                        place-items-center
                        rounded-full
                        border
                        border-slate-200
                        bg-white
                        text-darkPrimary
                        shadow-sm
                        transition-all
                        duration-300

                        hover:border-primary/30
                        hover:bg-primary
                        hover:text-white

                        disabled:pointer-events-none
                        disabled:opacity-25
                    "
                >
                    <ChevronLeft
                        className="size-4.5"
                        aria-hidden="true"
                    />
                </button>

                {/* =============================================
                    SLIDE VIEWPORT
                ============================================= */}

                <div
                    className="
                        relative
                        min-w-0
                        flex-1
                        overflow-hidden
                    "
                >
                    <div
                        className={`
                            will-change-transform
                            transition-all
                            duration-[280ms]
                            ease-out

                            ${
                                animating
                                    ? direction ===
                                      "next"
                                        ? "-translate-x-full opacity-0"
                                        : "translate-x-full opacity-0"
                                    : "translate-x-0 opacity-100"
                            }
                        `}
                    >
                        <MobileCourseCard
                            mainCourse={
                                visibleCourse
                            }
                            isActive
                        />
                    </div>
                </div>

                {/* =============================================
                    NEXT
                ============================================= */}

                <button
                    type="button"
                    onClick={
                        handleNext
                    }
                    disabled={
                        !hasNext ||
                        animating
                    }
                    aria-label="Next main course"
                    className="
                        grid
                        size-9
                        shrink-0
                        place-items-center
                        rounded-full
                        border
                        border-primary/20
                        bg-primary
                        text-white
                        shadow-md
                        shadow-primary/15
                        transition-all
                        duration-300

                        hover:bg-darkPrimary
                        hover:shadow-lg

                        disabled:pointer-events-none
                        disabled:opacity-25
                    "
                >
                    <ChevronRight
                        className="size-4.5"
                        aria-hidden="true"
                    />
                </button>
            </div>

            {/* =============================================
                COUNTER / DOTS
            ============================================= */}

            <div
                className="
                    mt-3
                    flex
                    items-center
                    justify-center
                    gap-1.5
                "
            >
                {courses.map(
                    (
                        item,
                        index
                    ) => {
                        const active =
                            index ===
                            selectedIndex;

                        return (
                            <span
                                key={
                                    getMainCourseId(
                                        item
                                    ) ||
                                    index
                                }
                                aria-hidden="true"
                                className={`
                                    h-1.5
                                    rounded-full
                                    transition-all
                                    duration-300

                                    ${
                                        active
                                            ? "w-5 bg-primary"
                                            : "w-1.5 bg-slate-200"
                                    }
                                `}
                            />
                        );
                    }
                )}
            </div>
        </div>
    );
}