import "server-only";

import { postOverseasForm } from "@/lib/overseasApi";

/*
 * The university list behind /universities-in-<country>. The page is
 * noindex when this list is empty.
 */

/**
 * A country's live universities. With the alluniversities keyword the
 * endpoint returns every one in a single response and ignores offset.
 */
export function fetchCountryUniversities(countryId) {
    return postOverseasForm("getUniversitybyOffset", {
        uid: "0",
        id: String(countryId),
        offset: "0",
        keyword: "alluniversities",
    });
}

/** The universities in that response. */
export function universityItems(result) {
    return Array.isArray(result?.universities)
        ? result.universities
        : Array.isArray(result?.data)
            ? result.data
            : [];
}
