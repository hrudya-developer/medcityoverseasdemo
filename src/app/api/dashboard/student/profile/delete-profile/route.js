// src/app/api/dashboard/student/profile/delete-profile/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();

        const uid = body?.uid;

        if (!uid) {
            return NextResponse.json(
                {
                    status: false,
                    msg: "User ID is required",
                },
                {
                    status: 400,
                }
            );
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
            await fetch(
                "https://overseas.technocitysolutions.com/public/api/deleteAccount",
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

        console.log(
            "Delete account API response:",
            data
        );

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

        if (data?.status !== true) {
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

        return NextResponse.json(
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