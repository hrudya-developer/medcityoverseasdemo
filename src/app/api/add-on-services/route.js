import { NextResponse } from "next/server";

const API_URL =
    "https://overseas.technocitysolutions.com/public/api/getServices";

export async function GET() {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                api:
                    process.env
                        .OVERSEAS_API_KEY,
                uid: 0,
            }),
            cache: "no-store",
        });

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
                "Services API returned non-JSON:",
                text
            );

            return NextResponse.json(
                {
                    message:
                        "Services API returned an invalid response.",
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
                        "Unable to load services.",
                },
                {
                    status:
                        response.status,
                }
            );
        }

        const services =
            result?.services ||
            result?.service ||
            result?.data ||
            [];

        const imageBaseUrl =
            result?.services_image_path ||
            result?.service_image_path ||
            result?.image_path ||
            "";

        return NextResponse.json({
            services:
                Array.isArray(services)
                    ? services
                    : [],
            imageBaseUrl,
        });
    } catch (error) {
        console.error(
            "Add-on services route error:",
            error
        );

        return NextResponse.json(
            {
                message:
                    "Unable to load services.",
            },
            {
                status: 500,
            }
        );
    }
}