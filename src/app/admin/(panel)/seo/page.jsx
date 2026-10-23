import { listPageSeo, normalisePath } from "@/lib/pageSeo";
import { listAudits, pageType } from "@/lib/seoAudit";
import { blogEntries, pageEntries, SITE_URL, universityEntries } from "@/lib/sitemapData";

import SeoPagesTable from "../../components/SeoPagesTable";

export const dynamic = "force-dynamic";

/*
 * SEO manager: every public page with its latest score, lowest first.
 * Courses (tens of thousands) are not listed one by one; any course
 * page can be checked or edited by typing its address.
 */
export default async function AdminSeoPage() {
    const [pages, blogs, universities, audits, edits] = await Promise.all([
        pageEntries(),
        blogEntries(),
        universityEntries(),
        listAudits(),
        listPageSeo(),
    ]);

    const byPath = new Map();

    const add = (path) => {
        const clean = normalisePath(path);

        if (clean && !byPath.has(clean)) {
            byPath.set(clean, { path: clean, type: pageType(clean), score: null, title: "", checkedAt: null, status: null, edited: false });
        }

        return byPath.get(clean);
    };

    for (const entry of [...pages, ...blogs, ...universities]) {
        add(entry.url.replace(SITE_URL, "") || "/");
    }

    for (const audit of audits) {
        Object.assign(add(audit.path), {
            score: audit.score,
            title: audit.title || "",
            checkedAt: audit.checked_at,
            status: audit.status_code,
        });
    }

    for (const edit of edits) {
        add(edit.path).edited = true;
    }

    return (
        <>
            <h1 className="text-2xl font-bold">SEO manager</h1>
            <p className="mt-1 max-w-3xl text-sm text-slate-500">
                Every page with its score for search (SEO), AI answers (AEO) and AI search (GEO), lowest first. Open a
                page to edit its Google title and description, share image, quick answer, FAQs and photos.
            </p>

            <SeoPagesTable rows={[...byPath.values()]} />
        </>
    );
}
