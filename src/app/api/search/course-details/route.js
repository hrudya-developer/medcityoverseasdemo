import {
    NextResponse,
} from "next/server";

const API_URL =
    "https://overseas.technocitysolutions.com/public/api/getCoursedetails";

const API_KEY =
    "overseas@Miak2023";

export async function GET(request) {
    try {
        const {
            searchParams,
        } = new URL(request.url);

        const courseId =
            searchParams.get("courseId");

        const uid =
            searchParams.get("uid") || "0";

        if (!courseId) {
            return NextResponse.json(
                {
                    message:
                        "Course ID is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const formData =
            new FormData();

        formData.append(
            "api",
            API_KEY
        );

        formData.append(
            "uid",
            String(uid)
        );

        formData.append(
            "id",
            String(courseId)
        );

        formData.append(
            "c_id",
            String(courseId)
        );

        const response = await fetch(
            API_URL,
            {
                method: "POST",
                body: formData,
                cache: "no-store",
            }
        );

        const text =
            await response.text();

        if (!response.ok) {
            return NextResponse.json(
                {
                    message:
                        "Unable to fetch course details.",
                },
                {
                    status:
                        response.status,
                }
            );
        }

        let result;

        try {
            result =
                JSON.parse(text);
        } catch {
            return NextResponse.json(
                {
                    message:
                        "Invalid response from course API.",
                },
                {
                    status: 502,
                }
            );
        }

        const course =
            result?.course?.[0] ??
            result?.data?.[0] ??
            result?.details?.[0] ??
            result?.course ??
            result?.data ??
            result?.details ??
            null;

        return NextResponse.json({
            course,
            raw: result,
        });
    } catch (error) {
        console.error(
            "Course details API error:",
            error
        );

        return NextResponse.json(
            {
                message:
                    "Something went wrong while fetching course details.",
            },
            {
                status: 500,
            }
        );
    }
}