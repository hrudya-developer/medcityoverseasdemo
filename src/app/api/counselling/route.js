import { NextResponse } from "next/server";

import {
    postOverseasForm,
} from "@/lib/overseasApi";
import { isPlausiblePhone } from "@/lib/phone";

const REQUIRED_FIELDS = [
    "firstname",
    "lastname",
    "email",
    "mobile",
    "destination",
    "nearestidp",
    "studylevel",
    "modeofcounselling",
    "starttime",
    "fund",
];

const safeText = (value) => {
    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value).trim();
};

const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );

export async function POST(request) {
    try {
        const contentType =
            request.headers.get(
                "content-type"
            ) || "";

        let values = {};

        if (
            contentType.includes(
                "application/json"
            )
        ) {
            values = await request.json();
        } else {
            const formData =
                await request.formData();

            values = Object.fromEntries(
                formData.entries()
            );
        }

        const payload = {
            firstname: safeText(
                values?.firstname
            ),

            lastname: safeText(
                values?.lastname
            ),

            email: safeText(
                values?.email
            ),

            mobile: safeText(
                values?.mobile
            ),

            destination: safeText(
                values?.destination
            ),

            nearestidp: safeText(
                values?.nearestidp
            ),

            studylevel: safeText(
                values?.studylevel
            ),

            modeofcounselling: safeText(
                values?.modeofcounselling
            ),

            starttime: safeText(
                values?.starttime
            ),

            fund: safeText(
                values?.fund
            ),

            ip: safeText(values?.ip),
        };

        const missingFields =
            REQUIRED_FIELDS.filter(
                (field) => !payload[field]
            );

        if (missingFields.length > 0) {
            return NextResponse.json(
                {
                    success: false,

                    message:
                        "Please complete all required fields.",

                    fields: missingFields,
                },
                {
                    status: 400,
                }
            );
        }

        if (!isValidEmail(payload.email)) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Please enter a valid email address.",
                },
                {
                    status: 400,
                }
            );
        }

        if (!isPlausiblePhone(payload.mobile)) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Please enter a valid mobile number.",
                },
                {
                    status: 400,
                }
            );
        }

        const result =
            await postOverseasForm(
                "postEnquiries",
                payload
            );

        // A repeat of an enquiry we already hold is not an error for the
        // visitor: the team already has it.
        if (result?.response === "Existing Data") {
            return NextResponse.json({
                success: true,
                message:
                    "We already have your enquiry. Our team will contact you soon.",
            });
        }

        // The upstream can answer HTTP 200 with status false when it
        // rejects an enquiry. Do not tell the visitor it was sent.
        if (
            result?.status === false ||
            result?.status === 0 ||
            result?.status === "0" ||
            result?.status === "false"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        result?.msg ||
                        result?.message ||
                        "Unable to submit your enquiry.",
                },
                {
                    status: 400,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,

                message:
                    result?.message ||
                    "Your enquiry has been submitted successfully.",

                data: result?.data ?? null,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "Counselling submission error:",
            error instanceof Error
                ? error.message
                : error
        );

        return NextResponse.json(
            {
                success: false,

                message:
                    "Unable to submit your enquiry. Please try again.",
            },
            {
                status: 500,
            }
        );
    }
}