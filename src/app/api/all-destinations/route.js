import { NextResponse } from "next/server";

const DESTINATIONS_API_URL =
    "https://overseas.technocitysolutions.com/public/api/getDestinations";

export async function POST() {
    try {
        const formData = new FormData();

        formData.append(
            "api",
            process.env.OVERSEAS_API_KEY ||
            "overseas@Miak2023"
        );

        formData.append("uid", "0");

        const response = await fetch(
            DESTINATIONS_API_URL,
            {
                method: "POST",
                body: formData,
                next: {
                    revalidate: 3600,
                },
            }
        );

        const result = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    message:
                        result?.message ||
                        "Unable to load destinations.",
                },
                {
                    status: response.status,
                }
            );
        }

        return NextResponse.json({
            destinations: Array.isArray(
                result?.destinations
            )
                ? result.destinations
                : [],

            imagePath:
                result?.destinations_image_path ||
                "",
        });
    } catch (error) {
        console.error(
            "Destinations API error:",
            error
        );

        return NextResponse.json(
            {
                message:
                    "Unable to load destinations.",
            },
            {
                status: 500,
            }
        );
    }
}