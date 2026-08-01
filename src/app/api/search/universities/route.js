import { NextResponse } from "next/server";

import {
    postOverseasForm,
} from "@/lib/overseasApi";

const getUniversities = (result) => {
    if (Array.isArray(result?.universities)) {
        return result.universities;
    }

    if (Array.isArray(result?.data)) {
        return result.data;
    }

    return [];
};

const getUniversityImagePath = (
    result
) =>
    result?.universities_image_path ||
    result?.university_image_path ||
    result?.universityImagePath ||
    result?.imagePath ||
    "";

export async function GET(request) {
    try {
        const { searchParams } =
            new URL(request.url);

        const countryId =
            searchParams.get("countryId");

        const uid =
            searchParams.get("uid") || "0";

        const offset =
            searchParams.get("offset") || "0";

        const keyword =
            searchParams.get("keyword") ||
            "alluniversities";

        if (!countryId) {
            return NextResponse.json(
                {
                    success: false,
                    universities: [],
                    universityImagePath: "",
                    message:
                        "countryId is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const result =
            await postOverseasForm(
                "getUniversitybyOffset",
                {
                    uid,
                    id: countryId,
                    offset,
                    keyword,
                },
                {
                    cache: "no-store",
                }
            );

        return NextResponse.json(
            {
                success: true,

                universities:
                    getUniversities(result),

                universityImagePath:
                    getUniversityImagePath(
                        result
                    ),

                nextOffset:
                    result?.nextoffset ??
                    null,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "Universities route error:",
            error instanceof Error
                ? error.message
                : error
        );

        return NextResponse.json(
            {
                success: false,
                universities: [],
                universityImagePath: "",
                message:
                    "Unable to load universities.",
            },
            {
                status: 500,
            }
        );
    }
}