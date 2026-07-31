import { NextResponse } from "next/server";

import {
    postOverseasForm,
} from "@/lib/overseasApi";

const DEFAULT_IMAGE_PATH =
    "https://overseas.technocitysolutions.com/public/uploads/destination";

const cleanPath = (path) => {
    if (!path) {
        return DEFAULT_IMAGE_PATH;
    }

    return String(path).replace(/\/+$/, "");
};

const getDestinations = (result) => {
    if (Array.isArray(result?.destinations)) {
        return result.destinations;
    }

    if (Array.isArray(result?.data)) {
        return result.data;
    }

    return [];
};

export async function POST(request) {
    try {
        let body = {};

        try {
            body = await request.json();
        } catch {
            body = {};
        }

        const uid = Number(body?.uid ?? 0);

        const result = await postOverseasForm(
            "getDestinations",
            {
                uid: Number.isFinite(uid)
                    ? uid
                    : 0,
            },
            {
                next: {
                    revalidate: 3600,
                    tags: ["destinations"],
                },
            }
        );

        return NextResponse.json(
            {
                success: true,

                destinations:
                    getDestinations(result),

                imagePath: cleanPath(
                    result?.destinations_image_path
                ),
            },
            {
                status: 200,

                headers: {
                    "Cache-Control":
                        "public, s-maxage=3600, stale-while-revalidate=86400",
                },
            }
        );
    } catch (error) {
        console.error(
            "All destinations route error:",
            error instanceof Error
                ? error.message
                : error
        );

        return NextResponse.json(
            {
                success: false,
                destinations: [],
                imagePath:
                    DEFAULT_IMAGE_PATH,
                message:
                    "Unable to load destinations.",
            },
            {
                status: 500,
            }
        );
    }
}