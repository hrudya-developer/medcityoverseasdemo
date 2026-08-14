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


const ADD_FEEDBACK_URL =
    "https://overseas.technocitysolutions.com/public/api/AddFeedback";


export async function POST(request) {
    try {
        /*
        |--------------------------------------------------------------------------
        | AUTHENTICATED STUDENT
        |--------------------------------------------------------------------------
        */

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
                        "Please login before submitting feedback.",
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
                },
                {
                    status: 401,
                }
            );
        }


        /*
        |--------------------------------------------------------------------------
        | REQUEST
        |--------------------------------------------------------------------------
        */

        const body =
            await request
                .json()
                .catch(
                    () => null
                );


        const type =
            String(
                body?.type ??
                    ""
            )
                .trim()
                .toLowerCase();


        const message =
            String(
                body?.message ??
                    ""
            ).trim();


        if (
            ![
                "feedback",
                "suggestion",
                "issue",
            ].includes(type)
        ) {
            return NextResponse.json(
                {
                    status: false,
                    msg:
                        "Please select a valid feedback type.",
                },
                {
                    status: 400,
                }
            );
        }


        if (!message) {
            return NextResponse.json(
                {
                    status: false,
                    msg:
                        "Feedback message is required.",
                },
                {
                    status: 400,
                }
            );
        }


        if (
            message.length >
            500
        ) {
            return NextResponse.json(
                {
                    status: false,
                    msg:
                        "Feedback cannot exceed 500 characters.",
                },
                {
                    status: 400,
                }
            );
        }


        /*
        |--------------------------------------------------------------------------
        | API KEY
        |--------------------------------------------------------------------------
        */

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
                    msg:
                        "Feedback service is not configured.",
                },
                {
                    status: 500,
                }
            );
        }


        /*
        |--------------------------------------------------------------------------
        | EXTERNAL API
        |--------------------------------------------------------------------------
        */

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

        formData.append(
            "type",
            type
        );

        formData.append(
            "message",
            message
        );


        const externalResponse =
            await fetch(
                ADD_FEEDBACK_URL,
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
            "ADD FEEDBACK RAW:",
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
                },
                {
                    status: 502,
                }
            );
        }


        const success =
            result?.status ===
                true ||
            result?.status ===
                1 ||
            result?.status ===
                "1" ||
            result?.status ===
                "true" ||
            result?.success ===
                true ||
            result?.success ===
                1 ||
            result?.success ===
                "1" ||
            result?.success ===
                "true";


        if (
            !externalResponse.ok ||
            !success
        ) {
            return NextResponse.json(
                {
                    status: false,

                    msg:
                        result?.msg ||
                        result?.message ||
                        "Unable to submit feedback.",
                },
                {
                    status:
                        externalResponse.ok
                            ? 400
                            : externalResponse.status,
                }
            );
        }


        return NextResponse.json(
            {
                status: true,

                msg:
                    result?.msg ||
                    result?.message ||
                    "Feedback submitted successfully.",

                data:
                    result?.data ??
                    null,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error(
            "ADD FEEDBACK ERROR:",
            error
        );


        return NextResponse.json(
            {
                status: false,
                msg:
                    "Unable to submit feedback.",
            },
            {
                status: 500,
            }
        );
    }
}