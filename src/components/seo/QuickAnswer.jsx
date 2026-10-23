import { MessageCircle, Phone, Sparkles } from "lucide-react";

import { currentPagePath, getPageSeo } from "@/lib/pageSeo";
import { templateShowsQuickAnswer } from "@/lib/quickAnswerPaths";
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY, CONTACT_WHATSAPP, displayDate, isoDate } from "@/lib/seoSchema";

/*
 * The "In short" box near the top of a page: a short summary that names
 * the topic, a counselling contact line and the "Last updated" date.
 * Branch pages pass their own phone and WhatsApp numbers. A summary
 * written for the page in the admin's SEO manager replaces the
 * template's text (pages listed in lib/quickAnswerPaths.js).
 */
export default async function QuickAnswer({
    children,
    updated,
    phone = CONTACT_PHONE,
    phoneDisplay = CONTACT_PHONE_DISPLAY,
    whatsapp = CONTACT_WHATSAPP,
    showContact = true,
    className = "",
}) {
    const path = await currentPagePath();
    const adminSummary = path && templateShowsQuickAnswer(path) ? (await getPageSeo(path))?.summary : "";
    const content = adminSummary || children;
    const updatedText = displayDate(updated);
    const paragraphs = typeof content === "string" ? content.split(/\n\s*\n/) : null;

    return (
        <section aria-label="In short" className={`mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 ${className}`}>
            <div className="rounded-2xl border border-secondary/20 bg-gradient-to-br from-secondary/[0.07] to-primary/[0.05] p-5 sm:p-6">
                <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-secondary">
                    <Sparkles size={15} aria-hidden="true" />
                    In short
                </p>

                <div className="mt-2 space-y-3 text-[1.02rem] leading-8 text-slate-800">
                    {paragraphs ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>) : content}
                </div>

                {(showContact || updatedText) && (
                    <div className="mt-4 flex flex-col gap-2 border-t border-secondary/10 pt-4 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                        {showContact && (
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                <span className="font-semibold text-slate-700">Talk to a counsellor:</span>
                                <a
                                    href={`tel:${phone}`}
                                    className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline"
                                >
                                    <Phone size={15} aria-hidden="true" />
                                    {phoneDisplay}
                                </a>
                                {whatsapp && (
                                    <a
                                        href={whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 font-bold text-[#128c4a] hover:underline"
                                    >
                                        <MessageCircle size={15} aria-hidden="true" />
                                        WhatsApp
                                    </a>
                                )}
                            </div>
                        )}

                        {updatedText && (
                            <p className="text-xs text-slate-500">
                                Last updated <time dateTime={isoDate(updated)}>{updatedText}</time> by Medcity Overseas
                            </p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
