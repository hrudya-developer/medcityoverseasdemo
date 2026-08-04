import { NextResponse } from "next/server";

const API_URL =
    "https://overseas.technocitysolutions.com/public/api/getDestinationDetails";

export async function POST(request) {
    try {
        const body = await request.json();

        const id = String(
            body?.id ?? ""
        ).trim();

        const uid = String(
            body?.uid ?? 0
        ).trim();

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Destination id is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const apiKey =
            process.env
                .OVERSEAS_API_KEY;

        if (!apiKey) {
            console.error(
                "OVERSEAS_API_KEY is missing."
            );

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Destination service is not configured.",
                },
                {
                    status: 500,
                }
            );
        }

        const formData =
            new URLSearchParams({
                api: apiKey,
                uid,
                id,
            });

        const apiResponse =
            await fetch(API_URL, {
                method: "POST",

                headers: {
                    Accept:
                        "application/json",

                    "Content-Type":
                        "application/x-www-form-urlencoded",
                },

                body: formData.toString(),

                cache: "no-store",
            });

        const responseText =
            await apiResponse.text();

        let result;

        try {
            result =
                JSON.parse(
                    responseText
                );
        } catch {
            console.error(
                "Destination API returned non-JSON:",
                responseText.slice(
                    0,
                    500
                )
            );

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "The destination service returned an invalid response.",
                },
                {
                    status: 502,
                }
            );
        }

        if (!apiResponse.ok) {
            return NextResponse.json(
                {
                    success: false,

                    message:
                        result?.message ||
                        "Failed to fetch destination details.",
                },
                {
                    status:
                        apiResponse.status,
                }
            );
        }

        return NextResponse.json(
            result,
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "Destination details route error:",
            error
        );

        return NextResponse.json(
            {
                success: false,

                message:
                    "Something went wrong while loading destination details.",
            },
            {
                status: 500,
            }
        );
    }
}