import { NextResponse } from "next/server";

/*
 * Passes the public address of each page (before rewrites, so
 * /study-in-uk rather than /destination/uk) to the app as the
 * x-page-path header. Page metadata and the extra SEO blocks use it to
 * find the edits made in the admin's SEO manager. Requests for the www
 * host are redirected to https://medcityoverseas.com first.
 */
const CANONICAL_ORIGIN = "https://medcityoverseas.com";

function requestHost(request) {
    // A proxy in front of the app may pass the public host in x-forwarded-host.
    const raw =
        request.headers.get("x-forwarded-host") ||
        request.headers.get("host") ||
        "";

    return raw.split(",")[0].trim().toLowerCase().replace(/:\d+$/, "");
}

export function proxy(request) {
    // www.medcityoverseas.com is the same site: send it to the main host
    // so Google sees one address per page.
    if (requestHost(request) === "www.medcityoverseas.com") {
        const target = new URL(
            `${request.nextUrl.pathname}${request.nextUrl.search}`,
            CANONICAL_ORIGIN
        );

        return NextResponse.redirect(target, 308);
    }

    const headers = new Headers(request.headers);

    headers.set("x-page-path", request.nextUrl.pathname.replace(/\/+$/, "") || "/");

    return NextResponse.next({ request: { headers } });
}

export const config = {
    matcher: ["/((?!api|_next|media|admin|dashboard|sitemaps|sitemap.xml|robots.txt|llms.txt|favicon.ico|.*\\.[a-z0-9]+$).*)"],
};
