import Image from "next/image";

import { ChevronRight, Sparkles } from "lucide-react";

import { currentPagePath, getPageSeo, SITE_URL } from "@/lib/pageSeo";
import { templateShowsQuickAnswer } from "@/lib/quickAnswerPaths";

/*
 * The quick answer, photos and FAQs added to a page in the admin's SEO
 * manager. Rendered by the public layout after the page's own content,
 * with FAQ structured data, so any page can get them without code
 * changes. Shows nothing when the page has none.
 */
export default async function PageSeoExtras() {
    const path = await currentPagePath();

    // Blog posts show their own quick answer and FAQs.
    if (!path || path.startsWith("/blog-details/")) {
        return null;
    }

    const found = await getPageSeo(path);

    // Templates with their own "In short" box show the admin's summary there.
    const seo = found && templateShowsQuickAnswer(path) ? { ...found, summary: "" } : found;

    if (!seo || (!seo.summary && !seo.faqs.length && !seo.gallery.length)) {
        return null;
    }

    const url = `${SITE_URL}${path === "/" ? "" : path}`;

    return (
        <section className="border-t border-slate-100 bg-white py-14 sm:py-16" aria-label="More about this page">
            {seo.faqs.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "@id": `${url}#page-faq`,
                            mainEntity: seo.faqs.map((faq) => ({
                                "@type": "Question",
                                name: faq.question,
                                acceptedAnswer: { "@type": "Answer", text: faq.answer },
                            })),
                        }).replace(/</g, "\\u003c"),
                    }}
                />
            )}

            <div className="mx-auto max-w-5xl space-y-12 px-4 sm:px-6 lg:px-8">
                {seo.summary && (
                    <div className="rounded-2xl border border-secondary/20 bg-gradient-to-br from-secondary/[0.07] to-primary/[0.05] p-6">
                        <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-secondary">
                            <Sparkles size={15} aria-hidden="true" />
                            In short
                        </p>
                        <div className="mt-2 space-y-3 text-[1.05rem] leading-8 text-slate-800">
                            {seo.summary.split(/\n\s*\n/).map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                )}

                {seo.gallery.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-black text-secondary sm:text-3xl">Photos</h2>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {seo.gallery.map((photo, index) => (
                                <figure key={`${photo.src}-${index}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                                    <div className="relative aspect-[4/3]">
                                        <Image
                                            src={photo.url}
                                            alt={photo.alt}
                                            fill
                                            sizes="(max-width: 640px) 100vw, 340px"
                                            unoptimized={!photo.url.startsWith("/media/")}
                                            className="object-cover"
                                        />
                                    </div>
                                    <figcaption className="px-4 py-3 text-sm text-slate-600">{photo.alt}</figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                )}

                {seo.faqs.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-black text-secondary sm:text-3xl">Frequently asked questions</h2>
                        <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200">
                            {seo.faqs.map((faq, index) => (
                                <details key={index} open={index === 0} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex cursor-pointer items-start justify-between gap-4">
                                        <h3 className="font-bold leading-snug text-slate-900">{faq.question}</h3>
                                        <ChevronRight
                                            size={20}
                                            aria-hidden="true"
                                            className="mt-0.5 shrink-0 text-primary transition-transform group-open:rotate-90"
                                        />
                                    </summary>
                                    <div className="mt-3 space-y-3 leading-7 text-slate-600">
                                        {faq.answer.split(/\n\s*\n/).map((paragraph, position) => (
                                            <p key={position}>{paragraph}</p>
                                        ))}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
