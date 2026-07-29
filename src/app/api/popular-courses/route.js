import { NextResponse } from "next/server";

import { postOverseasForm } from "@/lib/overseasApi";

const getId = (item) =>
    String(
        item?.id ??
        item?.c_id ??
        item?.course_id ??
        item?.main_course_id ??
        ""
    );

const getName = (item) =>
    item?.name ??
    item?.course ??
    item?.main_course ??
    item?.course_name ??
    item?.main_course_name ??
    item?.title ??
    "";

const getImage = (item) =>
    item?.icon ??
    item?.image ??
    item?.course_image ??
    item?.main_course_image ??
    "";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        const uid = searchParams.get("uid") || "0";

        const result = await postOverseasForm(
            "getMainCourses",
            {
                api:
                    process.env.OVERSEAS_API_KEY ||
                    "overseas@Miak2023",
                uid,
            }
        );

        console.log(
            "Popular courses API response:",
            result
        );

        /*
         * Your Postman response returns:
         *
         * maincourse: [...]
         * maincourse_image_path: "..."
         */
        const source =
            result?.maincourse ??
            result?.maincourses ??
            result?.main_courses ??
            result?.mainCourses ??
            result?.courses ??
            result?.data ??
            [];

        const imagePath =
            result?.maincourse_image_path ??
            result?.main_course_image_path ??
            result?.course_image_path ??
            result?.image_path ??
            result?.path ??
            "";

        const courses = (
            Array.isArray(source) ? source : []
        )
            .filter((item) => {
                const isActive =
                    item?.status === undefined ||
                    String(item.status) === "1";

                const isPopular =
                    item?.popular === undefined ||
                    String(item.popular).toLowerCase() ===
                    "true" ||
                    String(item.popular) === "1";

                return isActive && isPopular;
            })
            .map((item) => ({
                id: getId(item),
                name: getName(item),
                icon: getImage(item),
            }))
            .filter(
                (item) =>
                    Boolean(item.id) &&
                    Boolean(item.name)
            );

        return NextResponse.json(
            {
                courses,
                imagePath,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "Popular courses route error:",
            error
        );

        return NextResponse.json(
            {
                courses: [],
                imagePath: "",
                message:
                    error?.message ||
                    "Failed to load popular courses.",
            },
            {
                status: 500,
            }
        );
    }
}