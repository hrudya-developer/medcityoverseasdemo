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


const APPLY_COURSE_URL =
    "https://overseas.technocitysolutions.com/public/api/applyCourse";


/* =========================================================
   POST - APPLY FOR COURSE
========================================================= */

export async function POST(request) {
    try {
        /* =================================================
           GET LOGIN SESSION
        ================================================= */

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
                        "Please login to apply for this course.",
                },
                {
                    status: 401,
                }
            );
        }


        /* =================================================
           VERIFY LOGIN SESSION
        ================================================= */

        const session =
            verifySessionToken(
                token
            );

        if (!session?.uid) {
            return NextResponse.json(
                {
                    status: false,
                    msg:
                        "Your login session is invalid. Please login again.",
                },
                {
                    status: 401,
                }
            );
        }


        /* =================================================
           API KEY
        ================================================= */

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
                        "Course application service is not configured.",
                },
                {
                    status: 500,
                }
            );
        }


        /* =================================================
           REQUEST BODY
        ================================================= */

        const body =
            await request
                .json()
                .catch(
                    () => null
                );

        const courseId =
            body?.c_id ??
            body?.courseId ??
            body?.id;


        /* =================================================
           VALIDATION
        ================================================= */

        if (
            courseId ===
                undefined ||
            courseId ===
                null ||
            String(
                courseId
            ).trim() === ""
        ) {
            return NextResponse.json(
                {
                    status: false,
                    msg:
                        "Course ID is required.",
                },
                {
                    status: 400,
                }
            );
        }


        /* =================================================
           BUILD BACKEND FORM DATA

           Backend requires:
           api
           uid
           c_id
        ================================================= */

        const formData =
            new FormData();

        formData.append(
            "api",
            apiKey
        );

        formData.append(
            "uid",
            String(
                session.uid
            )
        );

        formData.append(
            "c_id",
            String(
                courseId
            )
        );


        console.log(
            "APPLY COURSE REQUEST:",
            {
                uid:
                    session.uid,

                c_id:
                    courseId,
            }
        );


        /* =================================================
           CALL OVERSEAS API
        ================================================= */

        const upstreamResponse =
            await fetch(
                APPLY_COURSE_URL,
                {
                    method:
                        "POST",

                    body:
                        formData,

                    cache:
                        "no-store",
                }
            );


        /* =================================================
           READ RESPONSE
        ================================================= */

        const responseText =
            await upstreamResponse
                .text();

        console.log(
            "APPLY COURSE RESPONSE:",
            responseText
        );


        /* =================================================
           PARSE RESPONSE
        ================================================= */

        let data;

        try {
            data =
                JSON.parse(
                    responseText
                );
        } catch {
            console.error(
                "Invalid applyCourse response:",
                responseText
            );

            return NextResponse.json(
                {
                    status: false,
                    msg:
                        "Course server returned an invalid response.",
                },
                {
                    status: 502,
                }
            );
        }


        /* =================================================
           UPSTREAM HTTP ERROR
        ================================================= */

        if (
            !upstreamResponse.ok
        ) {
            return NextResponse.json(
                {
                    ...data,

                    status: false,

                    msg:
                        data?.msg ||
                        data?.message ||
                        "Unable to apply for this course.",
                },
                {
                    status:
                        upstreamResponse
                            .status ||
                        502,
                }
            );
        }


        /* =================================================
           API BUSINESS ERROR
        ================================================= */

        if (
            data?.status ===
                false ||
            data?.status ===
                0 ||
            data?.status ===
                "0"
        ) {
            return NextResponse.json(
                {
                    ...data,

                    status: false,

                    msg:
                        data?.msg ||
                        data?.message ||
                        "Unable to apply for this course.",
                },
                {
                    status: 400,
                }
            );
        }


        /* =================================================
           SUCCESS
        ================================================= */

        return NextResponse.json(
            {
                ...data,

                status: true,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "Apply course error:",
            error
        );

        return NextResponse.json(
            {
                status: false,

                msg:
                    "Unable to apply for this course.",
            },
            {
                status: 500,
            }
        );
    }
}