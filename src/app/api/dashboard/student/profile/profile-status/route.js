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

const PROFILE_URL =
    "https://overseas.technocitysolutions.com/public/api/getStudentProfile";

export async function GET() {
    try {
        /*
         * Get authenticated student
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
                    completed: false,
                    stage: "",
                    msg: "Please login again.",
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

        if (!session?.uid) {
            return NextResponse.json(
                {
                    status: false,
                    completed: false,
                    stage: "",
                    msg: "Invalid login session.",
                },
                {
                    status: 401,
                }
            );
        }

        /*
         * API key
         */
        const apiKey =
            process.env
                .OVERSEAS_API_KEY;

        if (!apiKey) {
            console.error(
                "OVERSEAS_API_KEY missing"
            );

            return NextResponse.json(
                {
                    status: false,
                    completed: false,
                    stage: "",
                    msg: "Profile service is not configured.",
                },
                {
                    status: 500,
                }
            );
        }

        /*
         * Call existing profile API.
         *
         * Postman:
         * getStudentProfile?api=...&uid=630
         */
        const url =
            new URL(
                PROFILE_URL
            );

        url.searchParams.set(
            "api",
            apiKey
        );

        url.searchParams.set(
            "uid",
            String(
                session.uid
            )
        );

        const upstreamResponse =
            await fetch(
                url.toString(),
                {
                    method: "POST",
                    cache: "no-store",
                }
            );

        const responseText =
            await upstreamResponse.text();

        console.log(
            "PROFILE STATUS API RESPONSE:",
            responseText
        );

        let data;

        try {
            data =
                JSON.parse(
                    responseText
                );
        } catch {
            return NextResponse.json(
                {
                    status: false,
                    completed: false,
                    stage: "",
                    msg: "Profile server returned an invalid response.",
                },
                {
                    status: 502,
                }
            );
        }

        /*
         * Your API response:
         *
         * {
         *   "status": true,
         *   "data": [
         *      {
         *          ...
         *          "stage": "completed",
         *          "status": "1"
         *      }
         *   ]
         * }
         */

        const profile =
            Array.isArray(
                data?.data
            )
                ? data.data[0] ||
                  null
                : data?.data &&
                    typeof data.data ===
                        "object"
                  ? data.data
                  : null;

        const stage =
            String(
                profile?.stage ||
                    ""
            )
                .trim()
                .toLowerCase();

        /*
         * THIS IS THE IMPORTANT CHECK.
         *
         * stage === completed
         *      -> dashboard
         *
         * everything else
         *      -> registration
         */
        const completed =
            data?.status ===
                true &&
            stage ===
                "completed";

        console.log(
            "PROFILE STATUS RESULT:",
            {
                uid: session.uid,
                apiStatus:
                    data?.status,
                stage,
                completed,
            }
        );

        return NextResponse.json(
            {
                status: true,
                completed,
                stage,
                profile,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "Profile status error:",
            error
        );

        return NextResponse.json(
            {
                status: false,
                completed: false,
                stage: "",
                msg: "Unable to check your student profile.",
            },
            {
                status: 500,
            }
        );
    }
}