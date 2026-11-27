import Image from "next/image";

import { ChevronRight, Sparkles } from "lucide-react";

import { currentPagePath, getPageSeo, SITE_URL } from "@/lib/pageSeo";
import { templateOutputsFaqSchema } from "@/lib/faqSchemaPaths";
import { templateShowsQuickAnswer } from "@/lib/quickAnswerPaths";

/*
 * The quick answer, photos and FAQs added to a page in the admin's SEO
 * manager. Rendered by the public layout after the page's own content,
 * with FAQ structured data, so any page can get them without code
 * changes. Shows nothing when the page has none. On templates with
 * their own FAQPage the FAQs join that block instead.
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

    // Templates with their own FAQPage add these FAQs to it (faqsWithPageSeo),
    // so the page keeps a single FAQPage block.
    const faqSchema = seo.faqs.length > 0 && !templateOutputsFaqSchema(path);

    return (
        <section className="bg-white py-10 sm:py-10" aria-label="More about this page">
            {faqSchema && (
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

            <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
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
                   
<div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white via-white to-rose-50/60 p-4 sm:p-6 lg:p-8">

    {/* Decorative background */}
    <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-pink-100/40 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-rose-100/40 blur-3xl" />

    <div className="relative">

        {/* Heading */}
        <div className="mb-6 sm:mb-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-pink-50 px-3 py-1.5 text-xs font-bold tracking-wider text-pink-600 sm:text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                HELP & SUPPORT
            </div>

            <h2 className="text-2xl font-black leading-tight tracking-tight text-secondary sm:text-3xl lg:text-4xl">
                Frequently asked questions
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Find answers to the most common questions and get the clarity you need.
            </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">

            {seo.faqs.map((faq, index) => (
                <details
                    key={index}
                    open={index === 0}
                    className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm transition-all duration-300 hover:border-pink-200 hover:shadow-[0_8px_25px_rgba(219,39,119,0.06)] open:border-pink-200 open:shadow-[0_8px_25px_rgba(219,39,119,0.06)]"
                >
                    <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 sm:gap-4 sm:px-5 sm:py-5 [&::-webkit-details-marker]:hidden">

                        {/* Number */}
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-xs font-extrabold text-slate-500 transition-all duration-300 group-open:bg-primary group-open:text-white sm:h-10 sm:w-10 sm:text-sm">
                            {String(index + 1).padStart(2, "0")}
                        </div>

                        {/* Question */}
                        <h3 className="min-w-0 flex-1 text-sm font-bold leading-6 text-slate-800 transition-colors duration-300 group-open:text-primary sm:text-base sm:leading-7">
                            {faq.question}
                        </h3>

                        {/* Arrow */}
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-300 group-hover:border-primary group-hover:text-primary group-open:rotate-90 group-open:border-primary group-open:bg-primary group-open:text-white">
                            <ChevronRight
                                size={18}
                                aria-hidden="true"
                                className="transition-transform duration-300"
                            />
                        </div>

                    </summary>

                    {/* Answer */}
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                            <div className="ml-[52px] border-t border-slate-100 px-4 pb-5 pt-4 sm:ml-[60px] sm:px-5 sm:pb-6">

                                <div className="space-y-3 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                                    {faq.answer.split(/\n\s*\n/).map((paragraph, position) => (
                                        <p key={position}>
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>

                </details>
            ))}

        </div>

    </div>
</div>

                )}
            </div>
        </section>
    );
}
