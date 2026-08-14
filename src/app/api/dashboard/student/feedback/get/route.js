import {
    NextResponse,
} from "next/server";

import {
    cookies,
} from "next/headers";

import {
    SESSION_COOKIE_NAME,
    verifySessionToken,
} from "@/lib/auth/session";


const GET_FEEDBACK_URL =
    "https://overseas.technocitysolutions.com/public/api/getFeedback";


export async function POST() {
    try {
        const cookieStore =
            await cookies();

        const token =
            cookieStore.get(
                SESSION_COOKIE_NAME
            )?.value;


        if (!token) {
            return NextResponse.json(
                {
                    status: false,
                    msg:
                        "Please login to view feedback history.",
                    data: [],
                },
                {
                    status: 401,
                }
            );
        }


        const session =
            verifySessionToken(
                token
            );


        const uid =
            session?.uid ??
            session?.id ??
            null;


        if (!uid) {
            return NextResponse.json(
                {
                    status: false,
                    msg:
                        "Your login session is invalid.",
                    data: [],
                },
                {
                    status: 401,
                }
            );
        }


        const apiKey =
            process.env
                .OVERSEAS_API_KEY;


        if (!apiKey) {
            return NextResponse.json(
                {
                    status: false,
                    msg:
                        "Feedback service is not configured.",
                    data: [],
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
            String(uid)
        );


        const externalResponse =
            await fetch(
                GET_FEEDBACK_URL,
                {
                    method:
                        "POST",

                    body:
                        formData,

                    cache:
                        "no-store",
                }
            );


        const raw =
            await externalResponse
                .text();


        console.log(
            "GET FEEDBACK RAW:",
            raw
        );


        let result;


        try {
            result =
                raw
                    ? JSON.parse(
                          raw
                      )
                    : {};
        } catch {
            return NextResponse.json(
                {
                    status: false,
                    msg:
                        "Feedback server returned an invalid response.",
                    data: [],
                },
                {
                    status: 502,
                }
            );
        }


        if (
            !externalResponse.ok ||
            result?.status ===
                false
        ) {
            return NextResponse.json(
                {
                    status: false,

                    msg:
                        result?.msg ||
                        result?.message ||
                        "Unable to load feedback history.",

                    data: [],
                },
                {
                    status:
                        externalResponse.ok
                            ? 400
                            : externalResponse.status,
                }
            );
        }


        /*
         * Your API response uses:
         *
         * {
         *   status: true,
         *   details: [...]
         * }
         */
        const data =
            Array.isArray(
                result?.details
            )
                ? result.details
                : Array.isArray(
                      result?.data
                  )
                ? result.data
                : [];


        return NextResponse.json(
            {
                status: true,
                data,
                count:
                    data.length,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error(
            "GET FEEDBACK ERROR:",
            error
        );


        return NextResponse.json(
            {
                status: false,
                msg:
                    "Unable to load feedback history.",
                data: [],
            },
            {
                status: 500,
            }
        );
    }
}