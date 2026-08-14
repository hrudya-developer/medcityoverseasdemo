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


const APPLICATIONS_URL =
    "https://overseas.technocitysolutions.com/public/api/getUserEnquiries";


export async function POST() {
    try {
        /*
        |--------------------------------------------------------------------------
        | SESSION
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
                        "Please login to view your applications.",
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
                        "Your login session is invalid. Please login again.",
                    data: [],
                },
                {
                    status: 401,
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
                        "Applications service is not configured.",
                    data: [],
                },
                {
                    status: 500,
                }
            );
        }


        /*
        |--------------------------------------------------------------------------
        | EXTERNAL REQUEST
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


        console.log(
            "GET APPLICATIONS REQUEST:",
            {
                uid:
                    String(uid),
            }
        );


        const externalResponse =
            await fetch(
                APPLICATIONS_URL,
                {
                    method:
                        "POST",

                    body:
                        formData,

                    /*
                     * Don't reuse a cached
                     * applications response.
                     */
                    cache:
                        "no-store",

                    headers: {
                        Accept:
                            "application/json",
                    },
                }
            );


        /*
        |--------------------------------------------------------------------------
        | RAW RESPONSE
        |--------------------------------------------------------------------------
        */

        const rawResponse =
            await externalResponse
                .text();

        console.log(
            "GET APPLICATIONS RAW RESPONSE:",
            rawResponse
        );


        let result = {};

        try {
            result =
                rawResponse
                    ? JSON.parse(
                          rawResponse
                      )
                    : {};
        } catch {
            console.error(
                "Invalid getUserEnquiries response:",
                rawResponse
            );

            return NextResponse.json(
                {
                    status: false,

                    msg:
                        "Applications server returned an invalid response.",

                    data: [],
                },
                {
                    status: 502,
                }
            );
        }


        console.log(
            "GET APPLICATIONS PARSED RESPONSE:",
            result
        );


        /*
        |--------------------------------------------------------------------------
        | HTTP ERROR
        |--------------------------------------------------------------------------
        */

        if (
            !externalResponse.ok
        ) {
            return NextResponse.json(
                {
                    status: false,

                    msg:
                        result?.msg ||
                        result?.message ||
                        "Unable to load applications.",

                    data: [],
                },
                {
                    status:
                        externalResponse
                            .status ||
                        502,
                }
            );
        }


        /*
        |--------------------------------------------------------------------------
        | BUSINESS ERROR
        |--------------------------------------------------------------------------
        */

        if (
            result?.status ===
                false ||
            result?.status ===
                0 ||
            result?.status ===
                "0"
        ) {
            return NextResponse.json(
                {
                    status: false,

                    msg:
                        result?.msg ||
                        result?.message ||
                        "Unable to load applications.",

                    data: [],
                },
                {
                    status: 400,
                }
            );
        }


        /*
        |--------------------------------------------------------------------------
        | NORMALIZE APPLICATION ARRAY
        |--------------------------------------------------------------------------
        */

        const applications =
            Array.isArray(
                result?.data
            )
                ? result.data
                : Array.isArray(
                      result?.applications
                  )
                ? result.applications
                : Array.isArray(
                      result?.course
                  )
                ? result.course
                : [];


        console.log(
            "NORMALIZED APPLICATIONS:",
            applications
        );


        /*
         * Useful while debugging Apply Now.
         */
        console.log(
            "APPLICATION IDS:",
            applications.map(
                (item) => ({
                    id:
                        item?.id,

                    c_id:
                        item?.c_id,

                    course_id:
                        item
                            ?.course_id,

                    course:
                        item?.course ??
                        item
                            ?.course_name,
                })
            )
        );


        /*
        |--------------------------------------------------------------------------
        | RESPONSE
        |--------------------------------------------------------------------------
        */

        return NextResponse.json(
            {
                status: true,

                msg:
                    result?.msg ||
                    result?.message ||
                    "",

                count:
                    applications.length,

                data:
                    applications,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error(
            "MY APPLICATIONS ROUTE ERROR:",
            error
        );

        return NextResponse.json(
            {
                status: false,

                msg:
                    error instanceof
                    Error
                        ? error.message
                        : "Unable to load applications.",

                data: [],
            },
            {
                status: 500,
            }
        );
    }
}