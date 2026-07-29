import { NextResponse } from "next/server";

const HOME_RESPONSES_URL =
    "https://overseas.technocitysolutions.com/public/api/getHomeResponses";

export async function POST(request) {
    try {
        const body = await request
            .json()
            .catch(() => ({}));

        const uid = body?.uid ?? 0;

        const formData = new FormData();

        formData.append(
            "api",
            process.env.OVERSEAS_API_KEY ||
            "overseas@Miak2023"
        );

        formData.append("uid", String(uid));

        const response = await fetch(
            HOME_RESPONSES_URL,
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