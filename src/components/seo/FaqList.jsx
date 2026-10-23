import { ChevronRight } from "lucide-react";

import { faqPageNode, jsonLdString } from "@/lib/seoSchema";

/*
 * Frequently asked questions with their FAQPage structured data. Pass
 * `path` so the markup gets a stable @id; set schema={false} when the
 * page's own graph already carries the FAQs.
 */
export default function FaqList({ faqs, path, title = "Frequently asked questions", schema = true, className = "" }) {
    const list = (faqs ?? []).filter((faq) => faq?.question && faq?.answer);

    if (!list.length) {
        return null;
    }

    return (
        <section className={`mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 ${className}`}>
            {schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: jsonLdString({ "@context": "https://schema.org", ...faqPageNode(path || "/", list) }),
                    }}
                />
            )}

            <h2 className="text-2xl font-black text-secondary sm:text-3xl">{title}</h2>

            <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
                {list.map((faq, index) => (
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
                            {String(faq.answer)
                                .split(/\n\s*\n/)
                                .map((paragraph, position) => (
                                    <p key={position}>{paragraph}</p>
                                ))}
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}
