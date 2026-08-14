import { NextResponse } from "next/server";

const QUALIFICATION_FIELDS = [
    "highest",

    "tenth_syllabus",
    "tenth_overall",

    "twelth_stream",
    "twelth_overall",
    "twelth_english",

    "degree_stream",
    "degree_overall",
    "degree_english",

    "pg_stream",
    "pg_overall",
    "pg_english",

    "ielts_overall",
    "ielts_l",
    "ielts_r",
    "ielts_w",
    "ielts_s",
];

export async function POST(request) {
    try {
        const body = await request.json();

        const uid = body?.uid;

        if (!uid) {
            return NextResponse.json(
                {
                    status: false,
                    msg: "User ID is required.",
                },
                {
                    status: 400,
                }
            );
        }

        if (!body?.highest) {
            return NextResponse.json(
                {
                    status: false,
                    msg: "Highest qualification is required.",
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
                "OVERSEAS_API_KEY is missing."
            );

            return NextResponse.json(
                {
                    status: false,
                    msg: "Server configuration error.",
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

        for (const field of QUALIFICATION_FIELDS) {
            formData.append(
                field,
                String(
                    body?.[field] ?? ""
                )
            );
        }

        const externalResponse =
            await fetch(
                "https://overseas.technocitysolutions.com/public/api/updateQualifications",
                {
                    method: "POST",
                    body: formData,
                    cache: "no-store",
                }
            );

        const responseText =
            await externalResponse.text();

        let result = null;

        try {
            result = responseText
                ? JSON.parse(
                      responseText
                  )
                : {};
        } catch {
            console.error(
                "Invalid updateQualifications response:",
                responseText
            );

            return NextResponse.json(
                {
                    status: false,
                    msg: "Invalid response from qualification API.",
                },
                {
                    status: 502,
                }
            );
        }

        console.log(
            "updateQualifications:",
            result
        );

        if (!externalResponse.ok) {
            return NextResponse.json(
                {
                    status: false,
                    msg:
                        result?.msg ||
                        result?.message ||
                        "Qualification update failed.",
                },
                {
                    status:
                        externalResponse.status,
                }
            );
        }

        if (
            result?.status === false
        ) {
            return NextResponse.json(
                {
                    status: false,
                    msg:
                        result?.msg ||
                        result?.message ||
                        "Qualification update failed.",
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
                    result?.msg ||
                    result?.message ||
                    "Qualification updated successfully.",
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
            "qualification-update route error:",
            error
        );

        return NextResponse.json(
            {
                status: false,
                msg: "Internal server error.",
            },
            {
                status: 500,
            }
        );
    }
}