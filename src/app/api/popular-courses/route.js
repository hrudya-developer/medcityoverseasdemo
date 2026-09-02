import {
    NextResponse,
} from "next/server";

import {
    postOverseasForm,
} from "@/lib/overseasApi";

/* =========================================================
   HELPERS
========================================================= */

const getId = (item) =>
    String(
        item?.id ??
        item?.c_id ??
        item?.course_id ??
        item?.main_course_id ??
        ""
    ).trim();

const getName = (item) =>
    String(
        item?.name ??
        item?.course ??
        item?.main_course ??
        item?.course_name ??
        item?.main_course_name ??
        item?.title ??
        ""
    ).trim();

const getImage = (item) =>
    String(
        item?.icon ??
        item?.image ??
        item?.course_image ??
        item?.main_course_image ??
        ""
    ).trim();

/* =========================================================
   GET
========================================================= */

export async function GET(request) {
    try {
        const {
            searchParams,
        } = new URL(
            request.url
        );

        const uid =
            searchParams.get(
                "uid"
            ) || "0";

        /* =================================================
           API

           postOverseasForm already adds the API key.
           Do NOT pass api again here.
        ================================================= */

        const result =
            await postOverseasForm(
                "getMainCourses",
                {
                    uid,
                },
                {
                    next: {
                        revalidate:
                            3600,
                    },
                }
            );

        /* =================================================
           RESPONSE

           API currently returns:

           maincourse: [...]
           maincourse_image_path: "..."
        ================================================= */

        const source =
            result?.maincourse ??
            result?.maincourses ??
            result?.main_courses ??
            result?.mainCourses ??
            result?.courses ??
            result?.data ??
            [];

        const imagePath =
            result
                ?.maincourse_image_path ??
            result
                ?.main_course_image_path ??
            result
                ?.course_image_path ??
            result?.image_path ??
            result?.path ??
            "";

        /* =================================================
           ALL ACTIVE MAIN COURSES

           IMPORTANT:
           We are NOT filtering by popular anymore.
        ================================================= */

        const courses = (
            Array.isArray(
                source
            )
                ? source
                : []
        )
            .filter(
                (item) => {
                    /*
                     * If status is missing,
                     * treat it as active.
                     */

                    return (
                        item?.status ===
                            undefined ||
                        item?.status ===
                            null ||
                        String(
                            item.status
                        ) === "1"
                    );
                }
            )
            .map(
                (item) => ({
                    id:
                        getId(
                            item
                        ),

                    name:
                        getName(
                            item
                        ),

                    icon:
                        getImage(
                            item
                        ),

                    /*
                     * Keep these fields too.
                     * Useful if UI later wants
                     * popular indicators.
                     */

                    popular:
                        item?.popular ??
                        false,

                    status:
                        item?.status ??
                        "",
                })
            )
            .filter(
                (item) =>
                    Boolean(
                        item.id
                    ) &&
                    Boolean(
                        item.name
                    )
            );

        if (
            process.env.NODE_ENV ===
            "development"
        ) {
            console.log(
                "MAIN COURSES",
                {
                    apiCount:
                        Array.isArray(
                            source
                        )
                            ? source.length
                            : 0,

                    returnedCount:
                        courses.length,

                    courses:
                        courses.map(
                            (
                                course
                            ) => ({
                                id:
                                    course.id,

                                name:
                                    course.name,

                                popular:
                                    course.popular,
                            })
                        ),
                }
            );
        }

        return NextResponse.json(
            {
                courses,
                imagePath,

                count:
                    courses.length,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "Main courses route error:",
            error
        );

        return NextResponse.json(
            {
                courses: [],
                imagePath:
                    "",
                count: 0,

                message:
                    error
                        ?.message ||
                    "Failed to load main courses.",
            },
            {
                status: 500,
            }
        );
    }
}