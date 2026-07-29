import { NextResponse } from "next/server";

import {
    postOverseasForm,
} from "@/lib/overseasApi";

export async function GET(request) {
    try {
        const { searchParams } =
            new URL(request.url);

        const countryId =
            searchParams.get("countryId");

        const universityId =
            searchParams.get("universityId");

        const courseId =
            searchParams.get("courseId");

        const uid =
            searchParams.get("uid") || "0";

        const offset =
            searchParams.get("offset") || "0";

        if (
            !countryId ||
            !universityId ||
            !courseId
        ) {
            return NextResponse.json(
                {
                    message:
                        "countryId, universityId and courseId are required.",
                },
                {
                    status: 400,
                }
            );
        }

        const result =
            await postOverseasForm(
                "getAllUniversityCoursesLatest",
                {
                    uid,
                    d_id: countryId,
                    u_id: universityId,
                    c_id: courseId,
                    offset,
                }
            );

        const courses = Array.isArray(
            result?.course
        )
            ? result.course
            : [];

        const nextOffset =
            result?.nextoffset &&
                String(result.nextoffset) !== "0"
                ? String(result.nextoffset)
                : null;

        return NextResponse.json({
            courses,
            nextOffset,
        });
    } catch (error) {
        console.error(
            "Course search API error:",
            error
        );

        return NextResponse.json(
            {
                message:
                    error?.message ||
                    "Failed to search courses.",
            },
            {
                status: 500,
            }
        );
    }
}