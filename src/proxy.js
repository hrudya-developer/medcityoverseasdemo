import { NextResponse } from "next/server";

/*
 * Passes the public address of each page (before rewrites, so
 * /study-in-uk rather than /destination/uk) to the app as the
 * x-page-path header. Page metadata and the extra SEO blocks use it to
 * find the edits made in the admin's SEO manager.
 */
export function proxy(request) {
    const headers = new Headers(request.headers);

    headers.set("x-page-path", request.nextUrl.pathname.replace(/\/+$/, "") || "/");

    return NextResponse.next({ request: { headers } });
}

export const config = {
    matcher: ["/((?!api|_next|media|admin|dashboard|sitemaps|sitemap.xml|robots.txt|llms.txt|favicon.ico|.*\\.[a-z0-9]+$).*)"],
};
