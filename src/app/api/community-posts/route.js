import { NextResponse } from "next/server";

const API_URL =
    "https://overseas.technocitysolutions.com/public/api/getCommunityPosts";

const API_KEY =
    process.env.OVERSEAS_API_KEY;

export async function GET(request) {
    try {
        if (!API_KEY) {
            console.error(
                "OVERSEAS_API_KEY is missing."
            );

            return NextResponse.json(
                {
                    message:
                        "Community API configuration is missing.",
                },
                {
                    status: 500,
                }
            );
        }

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
            API_KEY
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
                headers: {
                    Accept:
                        "application/json",
                },
            }
        );

        const contentType =
            response.headers.get(
                "content-type"
            ) || "";

        const rawResponse =
            await response.text();

        if (!response.ok) {
            console.error(
                "Community API request failed:",
                {
                    status:
                        response.status,
                    body:
                        rawResponse.slice(
                            0,
                            500
                        ),
                }
            );

            return NextResponse.json(
                {
                    message:
                        "Unable to load community posts.",
                },
                {
                    status:
                        response.status,
                }
            );
        }

        if (
            !contentType.includes(
                "application/json"
            )
        ) {
            console.error(
                "Community API returned non-JSON:",
                rawResponse.slice(
                    0,
                    500
                )
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

        let result;

        try {
            result =
                JSON.parse(rawResponse);
        } catch (error) {
            console.error(
                "Unable to parse community API response:",
                error
            );

            return NextResponse.json(
                {
                    message:
                        "Community API returned invalid JSON.",
                },
                {
                    status: 502,
                }
            );
        }

        const posts =
            Array.isArray(result?.posts)
                ? result.posts
                : Array.isArray(
                    result?.post
                )
                    ? result.post
                    : [];

        const imagePath =
            result?.post_image_path ||
            result?.posts_image_path ||
            result?.imagePath ||
            "";

        const nextOffset =
            result?.nextoffset ??
            result?.next_offset ??
            result?.nextOffset ??
            null;

        return NextResponse.json(
            {
                success: true,
                posts,
                imagePath,
                nextOffset,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "Community posts route error:",
            {
                message:
                    error?.message,
                cause:
                    error?.cause,
            }
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