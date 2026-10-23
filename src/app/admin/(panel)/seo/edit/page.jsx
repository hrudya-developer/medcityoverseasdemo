import Link from "next/link";

import { getPageSeo, normalisePath } from "@/lib/pageSeo";
import { getAudit, pageType } from "@/lib/seoAudit";

import PageSeoForm from "../../../components/PageSeoForm";

export const dynamic = "force-dynamic";

export default async function EditPageSeo({ searchParams }) {
    const { path: rawPath } = await searchParams;
    const path = normalisePath(rawPath);

    if (!path) {
        return (
            <p className="text-sm text-slate-600">
                No page address given. <Link href="/admin/seo" className="text-blue-700 underline">Back to the SEO manager</Link>
            </p>
        );
    }

    const [seo, audit] = await Promise.all([getPageSeo(path), getAudit(path)]);

    return (
        <>
            <p className="text-sm">
                <Link href="/admin/seo" className="text-blue-700">← SEO manager</Link>
            </p>
            <h1 className="mt-2 text-2xl font-bold">Page SEO</h1>
            <p className="mt-1 break-all text-sm text-slate-500">
                {pageType(path)} ·{" "}
                <a href={path} target="_blank" rel="noreferrer" className="text-blue-700 underline">
                    medcityoverseas.com{path === "/" ? "" : path}
                </a>
            </p>

            <PageSeoForm
                path={path}
                initial={{
                    meta_title: seo?.metaTitle || "",
                    meta_description: seo?.metaDescription || "",
                    focus_keyword: seo?.focusKeyword || "",
                    og_image: seo?.ogImageRaw || "",
                    og_image_alt: seo?.ogImageAlt || "",
                    summary: seo?.summary || "",
                    faqs: seo?.faqs || [],
                    gallery: (seo?.gallery || []).map((photo) => ({ src: photo.src, alt: photo.alt })),
                }}
                audit={
                    audit
                        ? { score: audit.score, checks: audit.checks, checkedAt: String(audit.checked_at), title: audit.title }
                        : null
                }
                updated={seo?.updatedAt ? `${seo.updatedAt}${seo.updatedBy ? ` by ${seo.updatedBy}` : ""}` : ""}
            />
        </>
    );
}
