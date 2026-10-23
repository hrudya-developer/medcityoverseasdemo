import "server-only";

import * as catalog from "./catalog";
import * as content from "./content";
import * as students from "./students";

/*
 * The old Laravel API endpoints, now answered straight from the database.
 *
 * Keys are the Laravel endpoint names, so code that used to call
 * https://overseas.technocitysolutions.com/public/api/<name> can call
 * callLegacy("<name>", fields) and get the same JSON back.
 */
const HANDLERS = {
    getHomeResponses: content.getHomeResponses,
    getDestinations: content.getDestinations,
    getDestinationDetails: content.getDestinationDetails,
    getHomeTileDetails: content.getHomeTileDetails,
    getServices: content.getServices,
    getTestimonial: content.getTestimonial,
    getWebBlogs: content.getWebBlogs,
    getWebBlogDetail: content.getWebBlogDetail,
    getCommunityPosts: content.getCommunityPosts,
    getMainCourses: content.getMainCourses,

    getUniversitybyOffset: catalog.getUniversitybyOffset,
    getUniversityDetails: catalog.getUniversityDetails,
    getAllUniversityCoursesLatest: catalog.getAllUniversityCoursesLatest,
    getCoursebyMainUniversity: catalog.getCoursebyMainUniversity,
    getCoursedetails: catalog.getCoursedetails,
    searchResults: catalog.searchResults,

    getStudentProfile: students.getStudentProfile,
    setUserProfile: students.setUserProfile,
    updateUserProfile2: students.updateUserProfile2,
    updateQualifications: students.updateQualifications,
    addToPreferlist: students.addToPreferlist,
    removePreferlist: students.removePreferlist,
    getPrefereList: students.getPrefereList,
    applyCourse: students.applyCourse,
    getUserEnquiries: students.getUserEnquiries,
    AddFeedback: students.addFeedback,
    getFeedback: students.getFeedback,
    deleteAccount: students.deleteAccount,
    postEnquiries: students.postEnquiries,
};

export class LegacyEndpointError extends Error {
    constructor(endpoint) {
        super(`Unknown endpoint: ${endpoint}`);
        this.status = 404;
    }
}

export function hasLegacyEndpoint(endpoint) {
    return Object.prototype.hasOwnProperty.call(HANDLERS, endpoint);
}

export async function callLegacy(endpoint, input = {}) {
    if (!hasLegacyEndpoint(endpoint)) {
        throw new LegacyEndpointError(endpoint);
    }

    return HANDLERS[endpoint](input ?? {});
}

/* =========================================================
   legacyFetch: drop-in for fetch() against the old API URL
========================================================= */

async function readBody(body) {
    if (!body) {
        return {};
    }

    if (typeof FormData !== "undefined" && body instanceof FormData) {
        const values = {};

        for (const [key, value] of body.entries()) {
            values[key] = typeof value === "string" ? value : "";
        }

        return values;
    }

    if (body instanceof URLSearchParams) {
        return Object.fromEntries(body.entries());
    }

    if (typeof body === "string") {
        try {
            return JSON.parse(body);
        } catch {
            return Object.fromEntries(new URLSearchParams(body).entries());
        }
    }

    return {};
}

function endpointFromUrl(url) {
    const path = new URL(String(url), "http://local").pathname;

    return path.split("/").filter(Boolean).pop() ?? "";
}

/**
 * Behaves like fetch(url, init) for URLs of the old Laravel API, but answers
 * from the database. Existing route code that parses the Response keeps
 * working unchanged.
 */
export async function legacyFetch(url, init = {}) {
    const endpoint = endpointFromUrl(url);
    const query = Object.fromEntries(
        new URL(String(url), "http://local").searchParams.entries()
    );
    const input = { ...query, ...(await readBody(init.body)) };

    try {
        const result = await callLegacy(endpoint, input);

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(`Legacy endpoint ${endpoint} failed:`, error);

        return new Response(
            JSON.stringify({ status: false, msg: "Server error" }),
            {
                status: error?.status === 404 ? 404 : 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
