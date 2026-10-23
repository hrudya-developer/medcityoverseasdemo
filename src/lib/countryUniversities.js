import "server-only";

import { cache } from "react";

import { postOverseasForm } from "@/lib/overseasApi";

/*
 * The university list behind /universities-in-<country>. That page is
 * indexed only when it lists at least one university, so other pages
 * link to it only under the same rule (countryUniversitiesIndexable).
 */

/** One batch (20 universities) of a country's list, from this offset. */
export function fetchUniversityBatch(countryId, offset = "0") {
    return postOverseasForm("getUniversitybyOffset", {
        uid: "0",
        id: String(countryId),
        offset,
        keyword: "alluniversities",
    });
}

/** The universities in one batch response. */
export function universityItems(result) {
    return Array.isArray(result?.universities)
        ? result.universities
        : Array.isArray(result?.data)
            ? result.data
            : [];
}

/**
 * Whether /universities-in-<country> is indexable: it lists at least one
 * university. The page reads batches until one is empty, so its list is
 * empty exactly when the first batch is, and one batch is enough here.
 * If the lookup fails the link is left out rather than risk pointing at
 * a noindex page. Memoised per request.
 */
export const countryUniversitiesIndexable = cache(async (countryId) => {
    if (!countryId) {
        return false;
    }

    try {
        return universityItems(await fetchUniversityBatch(countryId)).length > 0;
    } catch (error) {
        console.error("University list check failed:", error);

        return false;
    }
});
