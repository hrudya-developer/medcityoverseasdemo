export const dynamic = "force-dynamic";

/*
 * A fixed answer the SEO checker uses to confirm that an address really
 * reaches this website (and not another app or an error page) before it
 * loads pages from it. Contains nothing private.
 */
const PROBE_TOKEN = "medcityoverseas-seo-probe-1";

export function GET() {
    return new Response(PROBE_TOKEN, {
        headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
}
