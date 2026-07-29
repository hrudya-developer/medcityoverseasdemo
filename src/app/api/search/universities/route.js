import { NextResponse } from "next/server";

import {
    postOverseasJson,
} from "@/lib/overseasApi";

const getId = (item) =>
    String(
        item?.id ||
        item?.u_id ||
        item?.university_id ||
        ""
    );

const getName = (item) =>
    item?.name ||
    item?.university ||
    item?.university_name ||
    "";

export async function GET(request) {
    try {
        const { searchParams } =
            new URL(request.url);

        const countryId =
            searchParams.get("countryId");

        const uid =
            searchParams.get("uid") || "0";

        if (!countryId) {
            return NextResponse.json(
                {
                    message:
                        "countryId is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const result =
            await postOverseasJson(
                "getUniversitybyOffset",
                {
                    uid,
                    id: countryId,
                    offset: 0,
                    keyword: "alluniversities",
                }
            );

        const source = Array.isArray(
            result?.data
        )
            ? result.data
            : Array.isArray(
                result?.universities
            )
                ? result.universities
                : [];

        const universities = source
            .map((item) => ({
                id: getId(item),
                name: getName(item),
            }))
            .filter(
                (item) => item.id && item.name
            );

        return NextResponse.json({
            universities,
        });
    } catch (error) {
        console.error(
            "University search API error:",
            error
        );

        return NextResponse.json(
            {
                message:
                    error?.message ||
                    "Failed to load universities.",
            },
            {
                status: 500,
            }
        );
    }
}