import {
    getSessionUid,
    unauthorizedResponse,
} from "@/lib/auth/sessionUid";
import { NextResponse } from "next/server";

const WISHLIST_API_URL =
    "https://overseas.technocitysolutions.com/public/api/getPrefereList";

export async function POST(request) {
    try {
        /* ---------------------------------
         * 1. Read request body
         * --------------------------------- */
        const body =
            await request.json();

        // The uid always comes from the signed session cookie,
        // never from the request body.
        const uid =
            await getSessionUid();

        if (!uid) {
            return unauthorizedResponse();
        }

        /* ---------------------------------
         * 2. Get API key
         * --------------------------------- */
        const apiKey =
            process.env
                .OVERSEAS_API_KEY;

        if (!apiKey) {
            console.error(
                "OVERSEAS_API_KEY is missing."
            );

            return NextResponse.json(
                {
                    status: false,
                    msg: "Server configuration error.",
                    data: [],
                    imagePath: "",
                },
                {
                    status: 500,
                }
            );
        }


        /* ---------------------------------
         * 3. Prepare external API request
         * --------------------------------- */
        const formData =
            new FormData();

        formData.append(
            "api",
            apiKey
        );

        formData.append(
            "uid",
            String(uid)
        );

        /* ---------------------------------
         * 4. Call external API
         * --------------------------------- */
        const response =
            await fetch(
                WISHLIST_API_URL,
                {
                    method: "POST",
                    body: formData,
                    cache: "no-store",
                }
            );

        const raw =
            await response.text();


        /* ---------------------------------
         * 5. Parse API response
         * --------------------------------- */
        let result;

        try {
            result =
                raw
                    ? JSON.parse(raw)
                    : {};
        } catch (error) {
            console.error(
                "GET WISHLIST JSON PARSE ERROR:",
                error
            );

            return NextResponse.json(
                {
                    status: false,
                    msg: "Invalid wishlist API response.",
                    data: [],
                    imagePath: "",
                },
                {
                    status: 502,
                }
            );
        }


        /* ---------------------------------
         * 6. External API HTTP error
         * --------------------------------- */
        if (!response.ok) {
            return NextResponse.json(
                {
                    status: false,

                    msg:
                        result?.msg ||
                        result?.message ||
                        "Unable to fetch wishlist.",

                    data: [],
                    imagePath: "",
                },
                {
                    status:
                        response.status,
                }
            );
        }

        /* ---------------------------------
         * 7. IMPORTANT
         *
         * API returns:
         *
         * {
         *   course_image_path: "...",
         *   course: [...]
         * }
         *
         * NOT:
         *
         * {
         *   data: [...]
         * }
         * --------------------------------- */
        const courses =
            Array.isArray(
                result?.course
            )
                ? result.course
                : [];

        const imagePath =
            typeof result
                ?.course_image_path ===
            "string"
                ? result.course_image_path
                : "";




        /* ---------------------------------
         * 8. Return normalized response
         *
         * Frontend can continue using
         * result.data
         * --------------------------------- */
        return NextResponse.json(
            {
                status: true,

                msg:
                    courses.length > 0
                        ? "Wishlist loaded successfully."
                        : "No wishlisted courses found.",

                data:
                    courses,

                imagePath:
                    imagePath,

                count:
                    courses.length,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "GET WISHLIST ROUTE ERROR:",
            error
        );

        return NextResponse.json(
            {
                status: false,

                msg:
                    error instanceof Error
                        ? error.message
                        : "Internal server error.",

                data: [],
                imagePath: "",
            },
            {
                status: 500,
            }
        );
    }
}