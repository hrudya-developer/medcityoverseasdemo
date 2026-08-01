import { NextResponse } from "next/server";

const ENQUIRY_API_URL =
    "https://overseas.technocitysolutions.com/public/api/postEnquiries";

const REQUIRED_FIELDS = [
    "firstname",
    "email",
    "mobile",
];

export async function POST(request) {
    try {
        const body = await request.json();

        const missingField =
            REQUIRED_FIELDS.find(
                (field) =>
                    !String(
                        body?.[field] || ""
                    ).trim()
            );

        if (missingField) {
            return NextResponse.json(
                {
                    message: `${missingField} is required.`,
                },
                {
                    status: 400,
                }
            );
        }

        const email = String(
            body.email
        )
            .trim()
            .toLowerCase();

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                email
            )
        ) {
            return NextResponse.json(
                {
                    message:
                        "Enter a valid email address.",
                },
                {
                    status: 400,
                }
            );
        }

        const mobileDigits = String(
            body.mobile
        ).replace(/\D/g, "");

        if (
            mobileDigits.length < 7 ||
            mobileDigits.length > 15
        ) {
            return NextResponse.json(
                {
                    message:
                        "Enter a valid mobile number.",
                },
                {
                    status: 400,
                }
            );
        }

        const formData = new FormData();

        formData.append(
            "api",
            process.env.OVERSEAS_API_KEY
        );

        formData.append(
            "firstname",
            String(
                body.firstname || ""
            ).trim()
        );

        formData.append(
            "lastname",
            String(
                body.lastname || ""
            ).trim()
        );

        formData.append("email", email);

        formData.append(
            "mobile",
            String(body.mobile).trim()
        );

        formData.append(
            "destination",
            String(
                body.destination || ""
            )
        );

        formData.append(
            "nearestidp",
            String(
                body.nearestidp || ""
            )
        );

        formData.append(
            "studylevel",
            String(
                body.studylevel || ""
            )
        );

        formData.append(
            "modeofcounselling",
            String(
                body.modeofcounselling || ""
            )
        );

        formData.append(
            "starttime",
            String(
                body.starttime || ""
            )
        );

        formData.append(
            "fund",
            String(body.fund || "")
        );

        formData.append(
            "message",
            String(
                body.message || ""
            ).trim()
        );

        formData.append("ip", "");

        const response = await fetch(
            ENQUIRY_API_URL,
            {
                method: "POST",
                body: formData,
                cache: "no-store",
            }
        );

        const result =
            await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    message:
                        result?.message ||
                        "Unable to submit your enquiry.",
                },
                {
                    status: response.status,
                }
            );
        }

        return NextResponse.json({
            success: true,
            message:
                result?.message ||
                "Your enquiry was submitted successfully.",
        });
    } catch (error) {
        console.error(
            "Enquiry API route error:",
            error
        );

        return NextResponse.json(
            {
                message:
                    "Unable to submit your enquiry. Please try again.",
            },
            {
                status: 500,
            }
        );
    }
}