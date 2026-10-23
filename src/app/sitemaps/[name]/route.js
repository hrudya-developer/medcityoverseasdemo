import {
    blogEntries,
    courseEntries,
    courseSitemapCount,
    pageEntries,
    universityEntries,
    urlsetXml,
    xmlResponse,
} from "@/lib/sitemapData";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
    const { name } = await params;

    if (name === "pages.xml") {
        return xmlResponse(urlsetXml(await pageEntries()));
    }

    if (name === "universities.xml") {
        return xmlResponse(urlsetXml(await universityEntries()));
    }

    if (name === "blogs.xml") {
        return xmlResponse(urlsetXml(await blogEntries()));
    }

    const coursePart = /^courses-(\d{1,3})\.xml$/.exec(name);

    if (coursePart) {
        const part = Number(coursePart[1]);

        if (part >= 1 && part <= (await courseSitemapCount())) {
            return xmlResponse(urlsetXml(await courseEntries(part)));
        }
    }

    return new Response("Not found", { status: 404 });
}
