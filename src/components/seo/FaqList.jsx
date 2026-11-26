
import { ChevronDown, MessageCircleQuestion, Sparkles } from "lucide-react";

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
            className={`relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-50 via-white to-[#f8edf3] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20 ${className}`}
        >
            {script}

            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl" />
            <div className="pointer-events-none absolute right-[12%] top-[35%] h-40 w-40 rounded-full bg-sky-100/40 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-5xl">

                {/* Heading */}
                <div className="mb-10 text-center sm:mb-14">

                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-white/80 px-4 py-2 shadow-sm shadow-pink-100/50 backdrop-blur-md">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-100 text-primary">
                            <MessageCircleQuestion size={15} />
                        </span>

                        <span className="text-xs font-bold tracking-[0.12em] text-primary sm:text-sm">
                            HELP & SUPPORT
                        </span>
                    </div>

                    <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-4xl">
                        {title}
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
                        Everything you need to know about your study abroad journey.
                        Explore answers to common questions and move one step closer
                        to your international education.
                    </p>

                    <div className="mx-auto mt-6 flex items-center justify-center gap-2">
                        <span className="h-1 w-8 rounded-full bg-pink-300" />
                        <span className="h-1.5 w-12 rounded-full bg-primary" />
                        <span className="h-1 w-8 rounded-full bg-pink-300" />
                    </div>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">

                    {list.map((faq, index) => (
                        <details
                            key={index}
                            open={index === 0}
                            className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_4px_20px_rgba(15,23,42,0.035)] transition-all duration-300 hover:border-pink-200 hover:shadow-[0_10px_35px_rgba(219,39,119,0.07)] open:border-pink-200 open:shadow-[0_10px_35px_rgba(219,39,119,0.06)] sm:rounded-3xl"
                        >
                            {/* Subtle open accent */}
                            <div className="absolute left-0 top-0 h-full w-1 bg-primary opacity-0 transition-opacity duration-300 group-open:opacity-100" />

                            <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 sm:gap-5 sm:px-6 sm:py-5 lg:px-7 lg:py-6 [&::-webkit-details-marker]:hidden">

                                {/* Number */}
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-xs font-extrabold tracking-wider text-slate-500 transition-all duration-300 group-open:border-primary group-open:bg-primary group-open:text-white sm:h-12 sm:w-12 sm:rounded-2xl sm:text-sm">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                {/* Question */}
                                <h3 className="min-w-0 flex-1 text-sm font-bold leading-6 text-slate-800 transition-colors duration-300 group-open:text-primary-700 sm:text-sm sm:leading-7 lg:text-[15px]">
                                    {faq.question}
                                </h3>

                                {/* Toggle */}
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-300 group-hover:border-primary-200 group-hover:text-primary-600 group-open:rotate-180 group-open:border-primary-600 group-open:bg-primary-600 group-open:text-primary sm:h-10 sm:w-10 sm:rounded-xl">
                                    <ChevronDown size={18} strokeWidth={2.2} />
                                </div>
                            </summary>

                            {/* Answer */}
                            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr]">
                                <div className="overflow-hidden">
                                    <div className="ml-[52px] border-t border-slate-100 pb-5 pl-4 pr-4 pt-4 sm:ml-[68px] sm:pb-6 sm:pl-5 sm:pr-6 sm:pt-5 lg:ml-[84px] lg:pl-6 lg:pr-8">

                                        <div className="space-y-3 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
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

                {/* Counselling CTA */}
                <div className="relative mt-8 overflow-hidden rounded-2xl bg-darkPrimary px-5 py-6 shadow-[0_12px_35px_rgba(15,23,42,0.12)] sm:mt-10 sm:rounded-3xl sm:px-8 sm:py-7">

                    {/* Decorative */}
                    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-primary/20 blur-3xl" />

                    <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white sm:h-14 sm:w-14">
                            <Sparkles size={22} />
                        </div>

                        <div className="flex-1">
                            <h3 className="text-base font-bold text-white sm:text-lg">
                                Still have questions?
                            </h3>

                            <p className="mt-1 text-xs leading-6 text-slate-300 sm:text-sm">
                                Our counsellors are here to help you find the right
                                path for your international education.
                            </p>
                        </div>

                        <div className="hidden shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-semibold text-logoYellow sm:flex">
                            <MessageCircleQuestion size={16} />
                            We're here to help
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
