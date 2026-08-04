import {
    NextResponse,
} from "next/server";

const API_URL =
    "https://overseas.technocitysolutions.com/public/api/getBlog";

export async function GET(request) {
    try {
        const { searchParams } =
            new URL(request.url);

        const uid =
            searchParams.get("uid") ||
            "0";

        const formData =
            new FormData();

        formData.append(
            "api",
            process.env
                .OVERSEAS_API_KEY
        );

        formData.append(
            "uid",
            uid
        );

        const response = await fetch(
            API_URL,
            {
                method: "POST",
                body: formData,
                cache: "no-store",
            }
        );

        const contentType =
            response.headers.get(
                "content-type"
            );

        if (
            !contentType?.includes(
                "application/json"
            )
        ) {
            const text =
                await response.text();

            console.error(
                "Blog API returned non-JSON:",
                text
            );

            return NextResponse.json(
                {
                    message:
                        "Blog API returned an invalid response.",
                },
                {
                    status: 502,
                }
            );
        }

        const result =
            await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    message:
                        result?.message ||
                        "Unable to load blogs.",
                },
                {
                    status:
                        response.status,
                }
            );
        }

        const blogs =
            Array.isArray(
                result?.blog
            )
                ? result.blog
                : [];

        const imagePath =
            result?.blog_image_path ||
            "";

        return NextResponse.json({
            blogs,
            imagePath,
        });
    } catch (error) {
        console.error(
            "Blog route error:",
            error
        );

        return NextResponse.json(
            {
                message:
                    "Unable to load blogs.",
            },
            {
                status: 500,
            }
        );
    }
}