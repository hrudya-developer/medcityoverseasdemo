import { NextResponse } from "next/server";

import {
    postOverseasForm,
} from "@/lib/overseasApi";

const getId = (item) =>
    String(
        item?.c_id ||
        item?.id ||
        item?.course_id ||
        item?.main_course_id ||
        ""
    );

const getName = (item) =>
    item?.course ||
    item?.main_course ||
    item?.name ||
    item?.course_name ||
    item?.main_course_name ||
    item?.title ||
    "";

export async function GET(request) {
    try {
        const { searchParams } =
            new URL(request.url);

        const universityId =
            searchParams.get("universityId");

        const uid =
            searchParams.get("uid") || "0";

        if (!universityId) {
            return NextResponse.json(
                {
                    message:
                        "universityId is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const result =
            await postOverseasForm(
                "getCoursebyMainUniversity",
                {
                    u_id: universityId,
                    uid,
                }
            );

        const source =
            result?.main_courses ||
            result?.maincourse ||
            result?.courses ||
            result?.data ||
            [];

        const courses = (
            Array.isArray(source)
                ? source
                : []
        )
            .map((item) => ({
                id: getId(item),
                name: getName(item),
            }))
            .filter(
                (item) => item.id && item.name
            );

        return NextResponse.json({
            courses,
        });
    } catch (error) {
        console.error(
            "Main course search API error:",
            error
        );

        return NextResponse.json(
            {
                message:
                    error?.message ||
                    "Failed to load courses.",
            },
            {
                status: 500,
            }
        );
    }
}