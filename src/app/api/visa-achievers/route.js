import {
    NextResponse,
} from "next/server";

const HOME_RESPONSES_URL =
    "https://overseas.technocitysolutions.com/public/api/getHomeResponses";

export async function GET() {
    try {
        const apiKey =
            process.env.OVERSEAS_API_KEY;

        if (!apiKey) {
            console.error(
                "OVERSEAS_API_KEY is missing."
            );

            return NextResponse.json(
                {
                    message:
                        "Server configuration error.",
                },
                {
                    status: 500,
                }
            );
        }

        const formData =
            new FormData();

        formData.append(
            "api",
            apiKey
        );

        formData.append(
            "uid",
            "0"
        );

        const response =
            await fetch(
                HOME_RESPONSES_URL,
                {
                    method: "POST",
                    body: formData,

                    next: {
                        revalidate: 3600,
                    },
                }
            );

        const result =
            await response.json();

        if (!response.ok) {
            console.error(
                "Visa achievers upstream API error:",
                result
            );

            return NextResponse.json(
                {
                    message:
                        result?.message ||
                        "Unable to load visa achievers.",
                },
                {
                    status:
                        response.status,
                }
            );
        }

        /*
         * IMPORTANT:
         * Change `result?.visa` below if
         * your API uses a different field
         * name for the achievers array.
         */
        const achievers =
            Array.isArray(
                result?.visa
            )
                ? result.visa
                : [];

        const imagePath =
            result?.visa_image_path ||
            "";

        return NextResponse.json(
            {
                achievers,
                imagePath,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "Visa achievers route error:",
            error
        );

        return NextResponse.json(
            {
                message:
                    "Unable to load visa achievers.",
            },
            {
                status: 500,
            }
        );
    }
}