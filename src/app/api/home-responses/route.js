import { NextResponse } from "next/server";

import { legacyFetch } from "@/lib/legacy";

const HOME_RESPONSES_URL =
    "https://overseas.technocitysolutions.com/public/api/getHomeResponses";

export async function POST(request) {
    if (!process.env.OVERSEAS_API_KEY) {
        console.error("OVERSEAS_API_KEY is missing");

        return NextResponse.json(
            {
                status: false,
                msg: "Server configuration error.",
            },
            {
                status: 500,
            }
        );
    }

    try {
        const body = await request
            .json()
            .catch(() => ({}));

        const uid = body?.uid ?? 0;

        const formData = new FormData();

        formData.append(
            "api",
            process.env.OVERSEAS_API_KEY
        );

        formData.append("uid", String(uid));

        const response = await legacyFetch(HOME_RESPONSES_URL,
            {
                method: "POST",
                body: formData,
                cache: "no-store",
            }
        );

        const result = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    message:
                        result?.message ||
                        "Unable to load German programs.",
                },
                {
                    status: response.status,
                }
            );
        }

        return NextResponse.json({
            programs: Array.isArray(
                result?.home_tile_new
            )
                ? result.home_tile_new
                : [],

            imagePath:
                result?.hometile_image_path ||
                "",
        });
    } catch (error) {
        console.error(
            "Home responses route error:",
            error
        );

        return NextResponse.json(
            {
                message:
                    "Unable to load German programs.",
            },
            {
                status: 500,
            }
        );
    }
}