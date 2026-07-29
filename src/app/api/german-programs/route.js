import { NextResponse } from "next/server";

const GERMAN_PROGRAM_URL =
    "https://overseas.technocitysolutions.com/public/api/getHomeTileDetails";

export async function POST(request) {
    try {
        const body = await request
            .json()
            .catch(() => ({}));

        const uid = body?.uid ?? 0;
        const id = body?.id;

        if (!id) {
            return NextResponse.json(
                {
                    message:
                        "Program id is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const url = new URL(
            GERMAN_PROGRAM_URL
        );

        url.searchParams.set(
            "api",
            process.env.OVERSEAS_API_KEY ||
            "overseas@Miak2023"
        );

        url.searchParams.set(
            "uid",
            String(uid)
        );

        url.searchParams.set(
            "id",
            String(id)
        );

        const response = await fetch(url, {
            method: "POST",
            cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    message:
                        result?.message ||
                        "Unable to load German program.",
                },
                {
                    status: response.status,
                }
            );
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error(
            "German program route error:",
            error
        );

        return NextResponse.json(
            {
                message:
                    "Unable to load German program.",
            },
            {
                status: 500,
            }
        );
    }
}