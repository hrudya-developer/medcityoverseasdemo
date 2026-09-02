import {
    cookies,
} from "next/headers";

import {
    getUniversityMappingCookieName,
} from "@/lib/universitySlug";

import {
    cleanId,
    normalizeSlug,
} from "./universityHelpers";

/* =========================================================
   GET STORED UNIVERSITY ID

   Reads the short-lived cookie created when a user clicks
   a university card.

   Public URL:
   /universities/griffith-college-australia

   Internal cookie:
   id = 1548

   The ID is never exposed in the URL.
========================================================= */

export async function getStoredUniversityId(
    rawSlug
) {
    const slug =
        normalizeSlug(
            rawSlug
        );

    if (!slug) {
        return "";
    }

    try {
        const cookieName =
            getUniversityMappingCookieName(
                slug
            );

        if (!cookieName) {
            return "";
        }

        const cookieStore =
            await cookies();

        const rawValue =
            cookieStore.get(
                cookieName
            )?.value;

        if (!rawValue) {
            return "";
        }

        let mapping =
            null;

        try {
            mapping =
                JSON.parse(
                    decodeURIComponent(
                        rawValue
                    )
                );
        } catch {
            return "";
        }

        const storedSlug =
            normalizeSlug(
                mapping?.slug
            );

        const storedId =
            cleanId(
                mapping?.id
            );

        if (
            !storedSlug ||
            !storedId
        ) {
            return "";
        }

        /* =================================================
           SAFETY

           Never use an ID stored for another university URL.
        ================================================= */

        if (
            storedSlug !==
            slug
        ) {
            return "";
        }

        return storedId;
    } catch (
        error
    ) {
        if (
            process.env.NODE_ENV ===
            "development"
        ) {
            console.warn(
                "Unable to read stored university mapping:",
                error?.message ??
                    error
            );
        }

        return "";
    }
}