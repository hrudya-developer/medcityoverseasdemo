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

const UPDATE_PROFILE_URL =
    "https://overseas.technocitysolutions.com/public/api/updateUserProfile2";

function formatDobForBackend(value) {
    if (!value) {
        return "";
    }

    const raw =
        String(value).trim();

    // HTML date input:
    // 1991-05-20
    // Backend:
    // 20/05/1991
    let match =
        raw.match(
            /^(\d{4})-(\d{2})-(\d{2})$/
        );

    if (match) {
        const [
            ,
            year,
            month,
            day,
        ] = match;

        return `${day}/${month}/${year}`;
    }

    // Already-supported backend formats:
    // 20.05.1991
    // 20-05-1991
    // 20/05/1991
    match =
        raw.match(
            /^(\d{2})[./-](\d{2})[./-](\d{4})$/
        );

    if (match) {
        const [
            ,
            day,
            month,
            year,
        ] = match;

        return `${day}/${month}/${year}`;
    }

    return raw;
}

function normalizeCode(value) {
    const digits =
        String(
            value ?? "91"
        ).replace(
            /\D/g,
            ""
        );

    return digits
        ? `+${digits}`
        : "";
}

function normalizeMobile(
    value,
    code
) {
    let mobile =
        String(
            value ?? ""
        ).replace(
            /\D/g,
            ""
        );

    const codeDigits =
        String(
            code ?? ""
        ).replace(
            /\D/g,
            ""
        );

    if (!mobile) {
        return "";
    }

    /*
     * If client sends:
     * +919874521022
     *
     * Backend wants:
     * mobile = 9874521022
     * code   = +91
     */
    if (
        codeDigits &&
        mobile.startsWith(
            codeDigits
        )
    ) {
        mobile =
            mobile.slice(
                codeDigits.length
            );
    }

    return mobile;
}

function normalizeCountry(value) {
    const raw =
        String(
            value ?? ""
        )
            .trim()
            .toLowerCase();

    if (
        raw === "in" ||
        raw === "india"
    ) {
        return "India";
    }

    return String(
        value ?? ""
    ).trim();
}

export async function POST(
    request
) {
    try {
        /* =========================
           AUTH
        ========================= */

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
                        "Please login again.",
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
                    msg:
                        "Invalid login session.",
                },
                {
                    status: 401,
                }
            );
        }

        /* =========================
           API KEY
        ========================= */

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
                        "Profile service is not configured.",
                },
                {
                    status: 500,
                }
            );
        }

        /* =========================
           BODY
        ========================= */

        const body =
            await request.json();

        const rawCode =
            body?.code ??
            "91";

        const name =
            String(
                body?.name ?? ""
            ).trim();

        const code =
            normalizeCode(
                rawCode
            );

        const mobile =
            normalizeMobile(
                body?.mobile,
                rawCode
            );

        const country =
            normalizeCountry(
                body?.country
            );

        const address =
            String(
                body?.address ?? ""
            ).trim();

        const gender =
            String(
                body?.gender ?? ""
            )
                .trim()
                .toLowerCase();

        const dob =
            formatDobForBackend(
                body?.dob
            );

        /* =========================
           VALIDATION
        ========================= */

        const missingFields = [];

        if (!name) {
            missingFields.push(
                "name"
            );
        }

        if (!mobile) {
            missingFields.push(
                "mobile"
            );
        }

        if (!code) {
            missingFields.push(
                "code"
            );
        }

        if (!country) {
            missingFields.push(
                "country"
            );
        }

        if (!address) {
            missingFields.push(
                "address"
            );
        }

        if (!gender) {
            missingFields.push(
                "gender"
            );
        }

        if (!dob) {
            missingFields.push(
                "dob"
            );
        }

        if (
            missingFields.length > 0
        ) {
            console.error(
                "UPDATE PROFILE MISSING FIELDS:",
                {
                    missingFields,
                    received: {
                        uid:
                            session.uid,
                        name,
                        mobile,
                        code,
                        country,
                        address,
                        gender,
                        dob,
                    },
                }
            );

            return NextResponse.json(
                {
                    status: false,

                    msg:
                        `Missing required field${
                            missingFields.length >
                            1
                                ? "s"
                                : ""
                        }: ${missingFields.join(
                            ", "
                        )}`,
                },
                {
                    status: 400,
                }
            );
        }

        /* =========================
           FORM DATA
        ========================= */

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
            "name",
            name
        );

        formData.append(
            "mobile",
            mobile
        );

        formData.append(
            "code",
            code
        );

        formData.append(
            "country",
            country
        );

        formData.append(
            "address",
            address
        );

        formData.append(
            "gender",
            gender
        );

        formData.append(
            "dob",
            dob
        );

        console.log(
            "UPDATE PROFILE PAYLOAD:",
            {
                uid:
                    session.uid,
                name,
                mobile,
                code,
                country,
                address,
                gender,
                dob,
            }
        );

        /* =========================
           UPSTREAM REQUEST
        ========================= */

        const upstreamResponse =
            await fetch(
                UPDATE_PROFILE_URL,
                {
                    method:
                        "POST",

                    body:
                        formData,

                    cache:
                        "no-store",
                }
            );

        const responseText =
            await upstreamResponse.text();

        console.log(
            "UPDATE PROFILE RESPONSE:",
            responseText
        );

        let data;

        try {
            data =
                JSON.parse(
                    responseText
                );
        } catch {
            console.error(
                "Invalid update profile response:",
                responseText
            );

            return NextResponse.json(
                {
                    status: false,
                    msg:
                        "Profile server returned an invalid response.",
                },
                {
                    status: 502,
                }
            );
        }

        /* =========================
           UPSTREAM ERROR
        ========================= */

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
                        "Unable to update profile.",
                },
                {
                    status:
                        upstreamResponse
                            .status ||
                        502,
                }
            );
        }

        if (
            data?.status === false
        ) {
            return NextResponse.json(
                data,
                {
                    status: 400,
                }
            );
        }

        /* =========================
           SUCCESS
        ========================= */

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
            "Update profile error:",
            error
        );

        return NextResponse.json(
            {
                status: false,
                msg:
                    "Unable to update profile.",
            },
            {
                status: 500,
            }
        );
    }
}