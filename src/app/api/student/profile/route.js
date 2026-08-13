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

export const dynamic =
    "force-dynamic";

export async function GET() {
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
                    msg: "Invalid login session.",
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
            console.error(
                "OVERSEAS_API_KEY is missing."
            );

            return NextResponse.json(
                {
                    status: false,
                    msg: "Profile service is not configured.",
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
            String(
                session.uid
            )
        );

        const upstreamResponse =
            await fetch(
                PROFILE_URL,
                {
                    method: "POST",
                    body: formData,
                    cache: "no-store",
                }
            );

        const responseText =
            await upstreamResponse.text();

        let data;

        try {
            data =
                JSON.parse(
                    responseText
                );
        } catch {
            console.error(
                "Invalid getStudentProfile response:",
                responseText
            );

            return NextResponse.json(
                {
                    status: false,
                    msg: "Profile server returned an invalid response.",
                },
                {
                    status: 502,
                }
            );
        }

        console.log(
            "getStudentProfile response:",
            JSON.stringify(
                data,
                null,
                2
            )
        );

        if (!upstreamResponse.ok) {
            return NextResponse.json(
                {
                    ...data,
                    status: false,

                    msg:
                        data?.msg ||
                        data?.message ||
                        "Unable to load profile.",
                },
                {
                    status:
                        upstreamResponse.status ||
                        502,
                }
            );
        }

        return NextResponse.json(
            data,
            {
                status: 200,
                headers: {
                    "Cache-Control":
                        "no-store, no-cache, must-revalidate",
                },
            }
        );
    } catch (error) {
        console.error(
            "Student profile route error:",
            error
        );

        return NextResponse.json(
            {
                status: false,
                msg: "Unable to load profile.",
            },
            {
                status: 500,
            }
        );
    }
}