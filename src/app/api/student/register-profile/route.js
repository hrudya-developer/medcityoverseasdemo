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
    "https://overseas.technocitysolutions.com/public/api/setUserProfile";

function isSuccessfulStatus(value) {
    return (
        value === true ||
        value === 1 ||
        value === "1" ||
        value === "true"
    );
}

export async function POST(
    request
) {
    try {
        /* =========================================
           1. READ AUTHENTICATED SESSION
           ========================================= */

        const cookieStore =
            await cookies();

        const sessionCookie =
            cookieStore.get(
                SESSION_COOKIE_NAME
            )?.value;

        if (!sessionCookie) {
            return NextResponse.json(
                {
                    status: false,
                    msg: "Your login session has expired. Please login again.",
                },
                {
                    status: 401,
                }
            );
        }

        const session =
            verifySessionToken(
                sessionCookie
            );

        if (!session) {
            return NextResponse.json(
                {
                    status: false,
                    msg: "Invalid login session. Please login again.",
                },
                {
                    status: 401,
                }
            );
        }

        /*
         * UID comes ONLY from the verified cookie.
         *
         * Never trust a uid sent by the browser.
         */
        const uid =
            session?.uid;

        if (!uid) {
            console.error(
                "Authenticated session has no UID:",
                session
            );

            return NextResponse.json(
                {
                    status: false,
                    msg: "Your account identifier could not be found.",
                },
                {
                    status: 401,
                }
            );
        }

        /* =========================================
           2. READ FORM DATA FROM CLIENT
           ========================================= */

        const body =
            await request.json();

        const name =
            String(
                body?.name ?? ""
            ).trim();

        const mobile =
            String(
                body?.mobile ?? ""
            ).trim();

        const country =
            String(
                body?.country ?? "in"
            )
                .trim()
                .toLowerCase();

        const address =
            String(
                body?.address ?? ""
            ).trim();

        const gender =
            String(
                body?.gender ?? ""
            ).trim();

        const code =
            String(
                body?.code ?? "91"
            )
                .trim()
                .replace(
                    /^\+/,
                    ""
                );

        const dob =
            String(
                body?.dob ?? ""
            ).trim();

        /* =========================================
           3. VALIDATION
           ========================================= */

        if (!name) {
            return NextResponse.json(
                {
                    status: false,
                    msg: "Name is required.",
                },
                {
                    status: 400,
                }
            );
        }

        if (!mobile) {
            return NextResponse.json(
                {
                    status: false,
                    msg: "Contact number is required.",
                },
                {
                    status: 400,
                }
            );
        }

        if (!dob) {
            return NextResponse.json(
                {
                    status: false,
                    msg: "Date of birth is required.",
                },
                {
                    status: 400,
                }
            );
        }

        if (!gender) {
            return NextResponse.json(
                {
                    status: false,
                    msg: "Gender is required.",
                },
                {
                    status: 400,
                }
            );
        }

        if (!address) {
            return NextResponse.json(
                {
                    status: false,
                    msg: "Address is required.",
                },
                {
                    status: 400,
                }
            );
        }

        /* =========================================
           4. API KEY
           ========================================= */

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

        /* =========================================
           5. PREPARE UPSTREAM FORM DATA
           ========================================= */

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
            "name",
            name
        );

        formData.append(
            "mobile",
            mobile
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
            "code",
            code
        );

        formData.append(
            "dob",
            dob
        );

        console.log(
            "Creating profile:",
            {
                uid,
                name,
                mobile,
                country,
                gender,
                code,
                dob,
                email:
                    session?.email,
            }
        );

        /* =========================================
           6. CALL MEDCITY API
           ========================================= */

        const upstreamResponse =
            await fetch(
                PROFILE_URL,
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

        let data;

        try {
            data =
                JSON.parse(
                    responseText
                );
        } catch {
            console.error(
                "setUserProfile invalid response:",
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
            "setUserProfile response:",
            JSON.stringify(
                data,
                null,
                2
            )
        );

        /* =========================================
           7. HANDLE UPSTREAM HTTP ERROR
           ========================================= */

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
                        "Unable to create profile.",
                },
                {
                    status:
                        upstreamResponse
                            .status ||
                        502,
                }
            );
        }

        /* =========================================
           8. HANDLE API STATUS
           ========================================= */

        if (
            data?.status !==
                undefined &&
            !isSuccessfulStatus(
                data.status
            )
        ) {
            return NextResponse.json(
                {
                    ...data,

                    status: false,

                    msg:
                        data?.msg ||
                        data?.message ||
                        "Unable to create profile.",
                },
                {
                    status: 400,
                }
            );
        }

        /* =========================================
           9. SUCCESS
           ========================================= */

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
            "Create profile error:",
            error
        );

        return NextResponse.json(
            {
                status: false,

                msg: "Unable to create profile. Please try again.",
            },
            {
                status: 500,
            }
        );
    }
}