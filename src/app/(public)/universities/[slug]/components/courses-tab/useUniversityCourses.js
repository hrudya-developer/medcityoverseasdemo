"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    addCountsToMainCourses,
    cleanId,
    createCourseCountMap,
    filterCoursesByCategory,
    getDefaultCategoryId,
    getMainCourseId,
    removeDuplicateCourses,
} from "./universityCoursesHelpers";

export default function useUniversityCourses({
    universityId,
    mainCourses = [],
    initialCourses = [],
    initialCourseCategoryId = "",
}) {
    /* =====================================================
       NORMALIZE INPUT
    ===================================================== */

    const safeMainCourses =
        useMemo(
            () =>
                Array.isArray(
                    mainCourses
                )
                    ? mainCourses.filter(
                          Boolean
                      )
                    : [],
            [
                mainCourses,
            ]
        );

    const safeInitialCourses =
        useMemo(
            () =>
                Array.isArray(
                    initialCourses
                )
                    ? removeDuplicateCourses(
                          initialCourses.filter(
                              Boolean
                          )
                      )
                    : [],
            [
                initialCourses,
            ]
        );

    /* =====================================================
       COUNTS
    ===================================================== */

    const courseCountMap =
        useMemo(
            () =>
                createCourseCountMap(
                    safeInitialCourses
                ),
            [
                safeInitialCourses,
            ]
        );

    const mainCoursesWithCounts =
        useMemo(
            () =>
                addCountsToMainCourses(
                    safeMainCourses,
                    courseCountMap
                ),
            [
                safeMainCourses,
                courseCountMap,
            ]
        );

    /* =====================================================
       DEFAULT CATEGORY
    ===================================================== */

    const defaultCategoryId =
        useMemo(
            () =>
                getDefaultCategoryId({
                    mainCourses:
                        mainCoursesWithCounts,

                    preferredCategoryId:
                        initialCourseCategoryId,
                }),
            [
                mainCoursesWithCounts,
                initialCourseCategoryId,
            ]
        );

    /* =====================================================
       SELECTED CATEGORY
    ===================================================== */

    const [
        selectedMainCourseId,
        setSelectedMainCourseId,
    ] = useState(
        () =>
            cleanId(
                defaultCategoryId
            )
    );

    /* =====================================================
       INITIAL COURSES
    ===================================================== */

    const [
        courses,
        setCourses,
    ] = useState(
        () =>
            filterCoursesByCategory(
                safeInitialCourses,
                defaultCategoryId
            )
    );

    const [
        loading,
        setLoading,
    ] = useState(
        false
    );

    const [
        error,
        setError,
    ] = useState(
        ""
    );

    /* =====================================================
       LOCAL COURSES
    ===================================================== */

    const getLocalCourses =
        useCallback(
            (categoryId) =>
                filterCoursesByCategory(
                    safeInitialCourses,
                    categoryId
                ),
            [
                safeInitialCourses,
            ]
        );

    /* =====================================================
       ENSURE SELECTED CATEGORY EXISTS
    ===================================================== */

    useEffect(
        () => {
            if (
                mainCoursesWithCounts.length ===
                0
            ) {
                return;
            }

            const exists =
                mainCoursesWithCounts.some(
                    (item) =>
                        getMainCourseId(
                            item
                        ) ===
                        cleanId(
                            selectedMainCourseId
                        )
                );

            if (exists) {
                return;
            }

            const nextId =
                cleanId(
                    defaultCategoryId
                );

            if (!nextId) {
                return;
            }

            setSelectedMainCourseId(
                nextId
            );

            setCourses(
                getLocalCourses(
                    nextId
                )
            );
        },
        [
            mainCoursesWithCounts,
            selectedMainCourseId,
            defaultCategoryId,
            getLocalCourses,
        ]
    );

    /* =====================================================
       FETCH CATEGORY
    ===================================================== */

    const fetchCategoryCourses =
        useCallback(
            async (
                categoryId,
                signal
            ) => {
                const safeUniversityId =
                    cleanId(
                        universityId
                    );

                const safeCategoryId =
                    cleanId(
                        categoryId
                    );

                if (
                    !safeUniversityId ||
                    !safeCategoryId
                ) {
                    return;
                }

                setLoading(
                    true
                );

                setError(
                    ""
                );

                try {
                    let offset =
                        "0";

                    let allCourses =
                        [];

                    const visitedOffsets =
                        new Set();

                    let requests =
                        0;

                    while (
                        offset !==
                            null &&
                        requests < 50
                    ) {
                        if (
                            visitedOffsets.has(
                                offset
                            )
                        ) {
                            break;
                        }

                        visitedOffsets.add(
                            offset
                        );

                        requests +=
                            1;

                        const params =
                            new URLSearchParams({
                                universityId:
                                    safeUniversityId,

                                courseId:
                                    safeCategoryId,

                                offset,
                            });

                        const response =
                            await fetch(
                                `/api/university-courses?${params.toString()}`,
                                {
                                    method:
                                        "GET",

                                    signal,

                                    cache:
                                        "no-store",
                                }
                            );

                        const result =
                            await response.json();

                        if (
                            !response.ok
                        ) {
                            throw new Error(
                                result?.message ??
                                    "Unable to load university courses."
                            );
                        }

                        const pageCourses =
                            Array.isArray(
                                result?.courses
                            )
                                ? result.courses
                                : [];

                        allCourses = [
                            ...allCourses,
                            ...pageCourses,
                        ];

                        const nextOffset =
                            cleanId(
                                result?.nextOffset
                            );

                        if (
                            !nextOffset ||
                            nextOffset ===
                                "0" ||
                            nextOffset ===
                                offset
                        ) {
                            offset =
                                null;
                        } else {
                            offset =
                                nextOffset;
                        }
                    }

                    const uniqueCourses =
                        removeDuplicateCourses(
                            allCourses
                        );

                    if (
                        uniqueCourses.length >
                        0
                    ) {
                        setCourses(
                            uniqueCourses
                        );

                        return;
                    }

                    setCourses(
                        getLocalCourses(
                            safeCategoryId
                        )
                    );
                } catch (
                    error
                ) {
                    if (
                        error?.name ===
                        "AbortError"
                    ) {
                        return;
                    }

                    console.error(
                        "University courses request failed:",
                        error
                    );

                    const fallback =
                        getLocalCourses(
                            safeCategoryId
                        );

                    setCourses(
                        fallback
                    );

                    if (
                        fallback.length ===
                        0
                    ) {
                        setError(
                            error?.message ??
                                "Unable to load courses."
                        );
                    }
                } finally {
                    if (
                        !signal?.aborted
                    ) {
                        setLoading(
                            false
                        );
                    }
                }
            },
            [
                universityId,
                getLocalCourses,
            ]
        );

    /* =====================================================
       CATEGORY CHANGE
    ===================================================== */

    const selectMainCourse =
        useCallback(
            (categoryId) => {
                const safeId =
                    cleanId(
                        categoryId
                    );

                if (
                    !safeId ||
                    safeId ===
                        selectedMainCourseId
                ) {
                    return;
                }

                setSelectedMainCourseId(
                    safeId
                );

                setCourses(
                    getLocalCourses(
                        safeId
                    )
                );

                setError(
                    ""
                );
            },
            [
                selectedMainCourseId,
                getLocalCourses,
            ]
        );

    /* =====================================================
       FETCH WHEN CATEGORY CHANGES
    ===================================================== */

    useEffect(
        () => {
            const categoryId =
                cleanId(
                    selectedMainCourseId
                );

            if (
                !categoryId ||
                !universityId
            ) {
                return;
            }

            const controller =
                new AbortController();

            fetchCategoryCourses(
                categoryId,
                controller.signal
            );

            return () => {
                controller.abort();
            };
        },
        [
            selectedMainCourseId,
            universityId,
            fetchCategoryCourses,
        ]
    );

    return {
        courses,

        loading,

        error,

        selectedMainCourseId,

        mainCourses:
            mainCoursesWithCounts,

        totalCourses:
            safeInitialCourses.length,

        selectMainCourse,
    };
}