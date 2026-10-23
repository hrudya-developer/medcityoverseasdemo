import "server-only";

import { callLegacy } from "@/lib/legacy";

/*
 * Former client for the Laravel API on overseas.technocitysolutions.com.
 *
 * The website now reads the database directly, so these functions answer
 * from src/lib/legacy with the same JSON the API used to return. The
 * function names are kept so existing callers do not change.
 */

function toFields(values) {
    const fields = {};

    Object.entries(values ?? {}).forEach(([key, value]) => {
        if (value === undefined || value === null) {
            return;
        }

        fields[key] = Array.isArray(value)
            ? value.map((item) => String(item ?? ""))
            : typeof value === "object"
                ? JSON.stringify(value)
                : String(value);
    });

    return fields;
}

async function call(endpoint, values) {
    const name = String(endpoint ?? "").replace(/^\/+|\/+$/g, "");

    try {
        return await callLegacy(name, toFields(values));
    } catch (error) {
        const wrapped = new Error(
            error?.status === 404
                ? `Unknown endpoint: ${name}`
                : "The database request failed."
        );

        wrapped.status = error?.status === 404 ? 404 : 500;
        wrapped.code = "OVERSEAS_API_ERROR";
        wrapped.cause = error;

        throw wrapped;
    }
}

// The third "options" argument (fetch cache settings) no longer applies.
export async function postOverseasJson(endpoint, payload = {}) {
    return call(endpoint, payload);
}

export async function postOverseasForm(endpoint, values = {}) {
    return call(endpoint, values);
}
