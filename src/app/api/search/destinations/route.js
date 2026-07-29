import { NextResponse } from "next/server";

import {
    postOverseasJson,
} from "@/lib/overseasApi";

const getId = (item) =>
    String(
        item?.id ||
        item?.d_id ||
        item?.country_id ||
        ""
    );

const getName = (item) =>
    item?.country ||
    item?.name ||
    item?.country_name ||
    item?.destination_name ||
    "";

export async function GET(request) {
    try {
        const { searchParams } =
            new URL(request.url);

        const uid =
            searchParams.get("uid") || "0";

        const result =
            await postOverseasJson(
                "getDestinations",
                {
                    uid,
                }
            );

        const source = Array.isArray(
            result?.destinations
        )
            ? result.destinations
            : Array.isArray(result?.data)
                ? result.data
                : [];

        const destinations = source
            .map((item) => ({
                id: getId(item),
                name: getName(item),
            }))
            .filter(
                (item) => item.id && item.name
            );

        return NextResponse.json({
            destinations,
        });
    } catch (error) {
        console.error(
            "Destination search API error:",
            error
        );

        return NextResponse.json(
            {
                message:
                    error?.message ||
                    "Failed to load destinations.",
            },
            {
                status: 500,
            }
        );
    }
}