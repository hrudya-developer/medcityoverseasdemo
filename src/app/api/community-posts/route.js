import {
    NextResponse,
} from "next/server";

const API_URL =
    "https://overseas.technocitysolutions.com/public/api/getCommunityPosts";

export async function GET(request) {
    try {
        const { searchParams } =
            new URL(request.url);

        const uid =
            searchParams.get("uid") ||
            "0";

        const offset =
            searchParams.get("offset") ||
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

        formData.append(
            "offset",
            offset
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
                "Community API returned non-JSON:",
                text
            );

            return NextResponse.json(
                {
                    message:
                        "Community API returned an invalid response.",
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
                        "Unable to load community posts.",
                },
                {
                    status:
                        response.status,
                }
            );
        }

        const posts =
            Array.isArray(
                result?.posts
            )
                ? result.posts
                : [];

        const imagePath =
            result?.post_image_path ||
            result?.posts_image_path ||
            "";

        const nextOffset =
            result?.nextoffset ??
            result?.next_offset ??
            null;

        return NextResponse.json({
            success:
                result?.status === true,
            posts,
            imagePath,
            nextOffset,
        });
    } catch (error) {
        console.error(
            "Community posts route error:",
            error
        );

        return NextResponse.json(
            {
                message:
                    "Unable to load community posts.",
            },
            {
                status: 500,
            }
        );
    }
}