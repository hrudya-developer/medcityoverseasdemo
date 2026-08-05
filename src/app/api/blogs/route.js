import { NextResponse } from "next/server";

const API_URL =
    "https://overseas.technocitysolutions.com/public/api/getBlog";

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
                        "Blog API configuration is missing.",
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
            searchParams.get("id") ||
            "0";

        const formData =
            new FormData();

        formData.append(
            "api",
            API_KEY
        );

        /*
         * This matches your previously
         * working implementation.
         */
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
                "Blog API request failed:",
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
                        "Unable to load blogs.",
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
                "Blog API returned non-JSON:",
                rawResponse.slice(
                    0,
                    500
                )
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

        let result;

        try {
            result =
                JSON.parse(rawResponse);
        } catch (error) {
            console.error(
                "Unable to parse blog API response:",
                error
            );

            return NextResponse.json(
                {
                    message:
                        "Blog API returned invalid JSON.",
                },
                {
                    status: 502,
                }
            );
        }

        const blogs =
            Array.isArray(result?.blog)
                ? result.blog.filter(
                    (blog) =>
                        String(
                            blog?.status ??
                            "1"
                        ) === "1"
                )
                : [];

        const imagePath =
            typeof result?.blog_image_path ===
                "string"
                ? result.blog_image_path
                : "";

        return NextResponse.json(
            {
                blogs,
                imagePath,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "Blog route error:",
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
                    "Unable to load blogs.",
            },
            {
                status: 500,
            }
        );
    }
}