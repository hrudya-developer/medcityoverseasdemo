import { courseSitemapCount, indexXml, xmlResponse } from "@/lib/sitemapData";

export const dynamic = "force-dynamic";

/** Sitemap index: one file per kind of page, courses split into parts. */
export async function GET() {
    const courseParts = await courseSitemapCount();

    const paths = [
        "/sitemaps/pages.xml",
        "/sitemaps/universities.xml",
        "/sitemaps/blogs.xml",
        ...Array.from({ length: courseParts }, (_, index) => `/sitemaps/courses-${index + 1}.xml`),
    ];

    return xmlResponse(indexXml(paths));
}
