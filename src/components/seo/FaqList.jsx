
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

import { faqsWithPageSeo } from "@/lib/pageSeo";
import { faqPageNode, jsonLdString } from "@/lib/seoSchema";

/*
 * Frequently asked questions with their FAQPage structured data.
 * Existing schema, SEO and accordion functionality preserved.
 */

export default async function FaqList({
    faqs,
    path,
    title = "Frequently asked questions",
    schema = true,
    className = "",
}) {
    const list = (faqs ?? []).filter(
        (faq) => faq?.question && faq?.answer
    );

    const schemaFaqs = schema ? await faqsWithPageSeo(list) : [];

    const script = schemaFaqs.length > 0 && (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: jsonLdString({
                    "@context": "https://schema.org",
                    ...faqPageNode(path || "/", schemaFaqs),
                }),
            }}
        />
    );

    if (!list.length) {
        return script || null;
    }

    return (
        <section
            className={`relative mx-auto max-w-7xl bg-[#c5e4ef4a] rounded-3xl overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16 ${className}`}
        >
            {script}

            {/* Decorative background elements */}
            {/* <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-pink-100/60 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-rose-50 blur-3xl" /> */}

            <div className="relative">

                {/* Heading */}
                <div className="mb-8 flex flex-col items-center text-center sm:mb-10">

                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-pink-600 sm:text-sm">
                        <MessageCircleQuestion size={17} />
                        Help & Support
                    </div>

                    <h2 className="max-w-3xl text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                        {title}
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                        Find answers to common questions and get the
                        information you need to plan your study abroad journey.
                    </p>

                    <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-pink-400 to-rose-600" />
                </div>

                {/* FAQ Layout */}
                <div className="grid grid-cols-1 gap-3 lg:gap-4">

                    {list.map((faq, index) => (
                        <details
                            key={index}
                            open={index === 0}
                            className="group overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-[0_3px_18px_rgba(219,39,119,0.045)] transition-all duration-300 hover:border-pink-200 hover:shadow-[0_8px_25px_rgba(219,39,119,0.09)] open:border-pink-200 open:shadow-[0_8px_25px_rgba(219,39,119,0.08)]"
                        >
                            <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 sm:gap-5 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">

                                {/* Number */}
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-sm font-extrabold text-pink-600 transition-colors duration-300 group-open:bg-pink-600 group-open:text-white sm:h-12 sm:w-12 sm:rounded-2xl">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                {/* Question */}
                                <h3 className="min-w-0 flex-1 text-sm font-bold leading-6 text-slate-800 sm:text-base lg:text-lg">
                                    {faq.question}
                                </h3>

                                {/* Expand icon */}
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pink-100 bg-pink-50 text-pink-600 transition-all duration-300 group-open:rotate-180 group-open:border-pink-600 group-open:bg-pink-600 group-open:text-white sm:h-10 sm:w-10">
                                    <ChevronDown size={19} strokeWidth={2.5} />
                                </div>
                            </summary>

                            {/* Answer */}
                            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr]">
                                <div className="overflow-hidden">
                                    <div className="ml-[52px] border-l-2 border-pink-200 pb-5 pl-4 pr-4 sm:ml-[68px] sm:pl-5 sm:pr-6">

                                        <div className="space-y-3 text-sm leading-7 text-slate-600 sm:text-base">
                                            {String(faq.answer)
                                                .split(/\n\s*\n/)
                                                .map((paragraph, position) => (
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

                {/* Bottom note */}
                <div className="mt-6 flex flex-col items-center justify-center gap-2 bg-darkPrimary rounded-2xl border border-pink-100 px-4 py-4 text-center sm:flex-row sm:gap-3">
                    <MessageCircleQuestion
                        size={19}
                        className="shrink-0 text-white"
                    />
                    <p className="text-xs leading-6 text-white sm:text-sm">
                        Still have questions? Our counsellors are here to
                        help you plan your study abroad journey.
                    </p>
                </div>

            </div>
        </section>
    );
}
