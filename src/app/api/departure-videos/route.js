import { NextResponse } from "next/server";

import { legacyFetch } from "@/lib/legacy";

const API_URL =
    "https://overseas.technocitysolutions.com/public/api/getHomeResponses";

export async function GET() {
    try {
        const formData = new FormData();

        formData.append(
            "api",
            process.env.OVERSEAS_API_KEY
        );

        formData.append("uid", "0");

        const response = await legacyFetch(API_URL, {
            method: "POST",
            body: formData,
            cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    message:
                        result?.message ||
                        "Unable to load departure videos.",
                },
                {
                    status: response.status,
                }
            );
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error(
            "Departure video API error:",
            error
        );

        return NextResponse.json(
            {
                message:
                    "Unable to load departure videos.",
            },
            {
                status: 500,
            }
        );
    }
}