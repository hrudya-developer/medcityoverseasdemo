import { cache } from "react";

import {
    postOverseasForm,
} from "@/lib/overseasApi";

import {
    cleanId,
} from "./universityHelpers";

export const getDestinations = cache(
    async () => {
        try {
            const result =
                await postOverseasForm(
                    "getDestinations",
                    {
                        uid: 0,
                    },
                    {
                        next: {
                            revalidate: 3600,
                        },
                    }
                );

            if (
                Array.isArray(
                    result?.destinations
                )
            ) {
                return result.destinations;
            }

            if (
                Array.isArray(result?.data)
            ) {
                return result.data;
            }

            return [];
        } catch (error) {
            console.warn(
                "Destination loading error:",
                error?.message ?? error
            );

            return [];
        }
    }
);

export const getUniversityDetails =
    cache(async (universityId) => {
        const safeId =
            cleanId(universityId);

        if (!safeId) {
            return null;
        }

        try {
            return await postOverseasForm(
                "getUniversityDetails",
                {
                    uid: 0,
                    id: safeId,
                },
                {
                    next: {
                        revalidate: 3600,
                    },
                }
            );
        } catch (error) {
            console.error(
                "University details error:",
                {
                    universityId:
                        safeId,
                    error:
                        error?.message ??
                        error,
                }
            );

            return null;
        }
    });

export const getUniversityMainCourses =
    cache(async (universityId) => {
        const safeId =
            cleanId(universityId);

        if (!safeId) {
            return [];
        }

        try {
            const result =
                await postOverseasForm(
                    "getCoursebyMainUniversity",
                    {
                        uid: 0,
                        u_id: safeId,
                    },
                    {
                        next: {
                            revalidate: 3600,
                        },
                    }
                );

            const candidates = [
                result?.main_courses,
                result?.maincourse,
                result?.courses,
                result?.course,
                result?.data?.main_courses,
                result?.data?.maincourse,
                result?.data?.courses,
                result?.data,
            ];

            for (
                const candidate of
                candidates
            ) {
                if (
                    Array.isArray(
                        candidate
                    )
                ) {
                    return candidate.filter(
                        Boolean
                    );
                }
            }

            return [];
        } catch (error) {
            console.warn(
                "University main course error:",
                {
                    universityId:
                        safeId,
                    error:
                        error?.message ??
                        error,
                }
            );

            return [];
        }
    });