import { NextResponse } from "next/server";

/*
 * Passes the public address of each page (before rewrites, so
 * /study-in-uk rather than /destination/uk) to the app as the
 * x-page-path header. Page metadata and the extra SEO blocks use it to
 * find the edits made in the admin's SEO manager. Requests for the www
 * host are redirected to https://medcityoverseas.com first.
 */
const CANONICAL_ORIGIN = "https://medcityoverseas.com";

function bareHost(value) {
    return String(value ?? "").trim().toLowerCase().replace(/:\d+$/, "");
}

/**
 * Whether the visitor asked for the www host. The Host header wins when it
 * already names the main host, so a visitor cannot trigger the redirect by
 * sending their own x-forwarded-host. Otherwise the last x-forwarded-host
 * entry (the one added by the nearest proxy) is used.
 */
function isWwwRequest(request) {
    const host = bareHost(request.headers.get("host"));

    if (host === "medcityoverseas.com") {
        return false;
    }

    if (host === "www.medcityoverseas.com") {
        return true;
    }

    const forwarded = String(request.headers.get("x-forwarded-host") ?? "")
        .split(",")
        .map(bareHost)
        .filter(Boolean);

    return forwarded[forwarded.length - 1] === "www.medcityoverseas.com";
}

export function proxy(request) {
    // www.medcityoverseas.com is the same site: send it to the main host
    // so Google sees one address per page.
    if (isWwwRequest(request)) {
        const target = new URL(
            `${request.nextUrl.pathname}${request.nextUrl.search}`,
            CANONICAL_ORIGIN
        );
        const response = NextResponse.redirect(target, 308);

        // The answer depends on the host, so shared caches must not reuse it.
        response.headers.set("Vary", "Host, X-Forwarded-Host");
        response.headers.set("Cache-Control", "private, no-store");

        return response;
    }

    const headers = new Headers(request.headers);

    headers.set("x-page-path", request.nextUrl.pathname.replace(/\/+$/, "") || "/");

    return NextResponse.next({ request: { headers } });
}

export const config = {
    matcher: ["/((?!api|_next|media|admin|dashboard|sitemaps|sitemap.xml|robots.txt|llms.txt|favicon.ico|.*\\.[a-z0-9]+$).*)"],
};
