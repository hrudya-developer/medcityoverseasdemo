import {
    NextResponse,
} from "next/server";

import {
    postOverseasForm,
} from "@/lib/overseasApi";

function cleanId(
    value = ""
) {
    return String(
        value ?? ""
    ).trim();
}

function extractCourses(
    result
) {
    if (
        Array.isArray(
            result?.course
        )
    ) {
        return result.course.filter(
            Boolean
        );
    }

    if (
        Array.isArray(
            result?.courses
        )
    ) {
        return result.courses.filter(
            Boolean
        );
    }

    if (
        Array.isArray(
            result?.data?.course
        )
    ) {
        return result.data.course.filter(
            Boolean
        );
    }

    if (
        Array.isArray(
            result?.data
        )
    ) {
        return result.data.filter(
            Boolean
        );
    }

    return [];
}

export async function GET(
    request
) {
    try {
        const {
            searchParams,
        } =
            new URL(
                request.url
            );

        const universityId =
            cleanId(
                searchParams.get(
                    "universityId"
                )
            );

        const courseId =
            cleanId(
                searchParams.get(
                    "courseId"
                )
            );

        const offset =
            cleanId(
                searchParams.get(
                    "offset"
                ) ?? "0"
            );

        if (!universityId) {
            return NextResponse.json(
                {
                    success:
                        false,

                    message:
                        "University ID is required.",
                },
                {
                    status: 400,
                }
            );
        }

        if (!courseId) {
            return NextResponse.json(
                {
                    success:
                        false,

                    message:
                        "Main course ID is required.",
                },
                {
                    status: 400,
                }
            );
        }

        /*
         * This matches the working React app:
         *
         * c_id
         * u_id
         * offset
         * uid
         */

        const result =
            await postOverseasForm(
                "getAllUniversityCoursesLatest",
                {
                    uid: 0,

                    c_id:
                        courseId,

                    u_id:
                        universityId,

                    offset:
                        offset || "0",
                },
                {
                    cache:
                        "no-store",
                }
            );

        const courses =
            extractCourses(
                result
            );

        const nextOffset =
            result?.nextoffset &&
            String(
                result.nextoffset
            ) !== "0"
                ? String(
                      result.nextoffset
                  )
                : null;

        return NextResponse.json(
            {
                success:
                    true,

                courses,

                nextOffset,

                courseImagePath:
                    result
                        ?.maincourse_image_path ??
                    result
                        ?.course_image_path ??
                    result
                        ?.courses_image_path ??
                    result
                        ?.image_path ??
                    "",
            },
            {
                status: 200,
            }
        );
    } catch (
        error
    ) {
        console.error(
            "University courses API error:",
            error
        );

        return NextResponse.json(
            {
                success:
                    false,

                message:
                    error?.message ??
                    "Unable to load university courses.",
            },
            {
                status: 500,
            }
        );
    }
}