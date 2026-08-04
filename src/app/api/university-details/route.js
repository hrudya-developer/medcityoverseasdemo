import { NextResponse } from "next/server";

const API_URL =
    "https://overseas.technocitysolutions.com/public/api/getUniversityDetails";

export async function POST(request) {
    try {
        const body = await request.json();

        const universityId = body?.universityId;
        const uid = body?.uid || "0";

        if (!universityId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "University ID is required.",
                },
                { status: 400 }
            );
        }

        const formData = new FormData();

        formData.append(
            "api",
            process.env.OVERSEAS_API_KEY
        );

        formData.append("uid", String(uid));
        formData.append(
            "id",
            String(universityId)
        );

        const response = await fetch(API_URL, {
            method: "POST",
            body: formData,
            cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        data?.message ||
                        "Failed to fetch university details.",
                },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error(
            "University details API error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Something went wrong while fetching university details.",
            },
            { status: 500 }
        );
    }
}