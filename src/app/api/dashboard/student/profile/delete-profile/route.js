import { SESSION_COOKIE_NAME } from "@/lib/auth/session";
import {
    getSessionUid,
    unauthorizedResponse,
} from "@/lib/auth/sessionUid";
// src/app/api/dashboard/student/profile/delete-profile/route.js

import { NextResponse } from "next/server";

import { legacyFetch } from "@/lib/legacy";

export async function POST() {
    try {
        // The uid always comes from the signed session cookie,
        // never from the request body.
        const uid =
            await getSessionUid();

        if (!uid) {
            return unauthorizedResponse();
        }

        const apiKey =
            process.env.OVERSEAS_API_KEY;

        if (!apiKey) {
            console.error(
                "OVERSEAS_API_KEY is missing"
            );

            return NextResponse.json(
                {
                    status: false,
                    msg: "Server configuration error",
                },
                {
                    status: 500,
                }
            );
        }

        const formData = new FormData();

        formData.append(
            "api",
            apiKey
        );

        formData.append(
            "uid",
            String(uid)
        );

        const externalResponse =
            await legacyFetch("https://overseas.technocitysolutions.com/public/api/deleteAccount",
                {
                    method: "POST",
                    body: formData,
                    cache: "no-store",
                }
            );

        const rawResponse =
            await externalResponse.text();

        let data;

        try {
            data =
                rawResponse
                    ? JSON.parse(rawResponse)
                    : {};
        } catch {
            data = {
                status: false,
                msg: rawResponse ||
                    "Invalid response from external API",
            };
        }


        if (!externalResponse.ok) {
            return NextResponse.json(
                {
                    status: false,
                    msg:
                        data?.msg ||
                        "Failed to delete account",
                },
                {
                    status:
                        externalResponse.status,
                }
            );
        }

        if (
            !(
                data?.status === true ||
                data?.status === 1 ||
                data?.status === "1" ||
                data?.status === "true"
            )
        ) {
            return NextResponse.json(
                {
                    status: false,
                    msg:
                        data?.msg ||
                        "Unable to delete account",
                },
                {
                    status: 400,
                }
            );
        }

        const deleted = NextResponse.json(
            {
                status: true,
                msg:
                    data?.msg ||
                    "Profile deleted successfully",
            },
            {
                status: 200,
            }
        );

        // The account no longer exists, so end the session here too.
        deleted.cookies.set({
            name: SESSION_COOKIE_NAME,
            value: "",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 0,
        });

        return deleted;
    } catch (error) {
        console.error(
            "Delete account route error:",
            error
        );

        return NextResponse.json(
            {
                status: false,
                msg: "Internal server error",
            },
            {
                status: 500,
            }
        );
    }
}