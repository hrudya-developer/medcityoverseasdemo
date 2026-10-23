import Link from "next/link";

import { ArrowRight, ChevronRight, ExternalLink, MessageCircle, Phone } from "lucide-react";

import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY, CONTACT_WHATSAPP } from "@/lib/seoSchema";

/*
 * Building blocks for the keyword landing pages (guides): a hero with
 * the visible breadcrumb and the page's only H1, plain sections with an
 * H2, simple lists, a table wrapper, link cards and a contact band. The
 * SEO blocks themselves (In short, question and answer, FAQs, sources)
 * come from components/seo.
 */

export const NOT_RECORDED = "Not recorded";

export function GuideHero({ eyebrow, title, intro, breadcrumbs = [], children }) {
    return (
        <section className="relative isolate overflow-hidden bg-darkPrimary text-white">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-darkPrimary via-[#151d42] to-secondary" />
            <div className="mx-auto max-w-5xl px-4 pb-14 pt-8 sm:px-6 sm:pb-16 lg:px-8">
                {breadcrumbs.length > 0 && (
                    <nav aria-label="Breadcrumb" className="text-sm text-white/70">
                        <ol className="flex flex-wrap items-center gap-1.5">
                            {breadcrumbs.map((item, index) => (
                                <li key={item.path} className="flex items-center gap-1.5">
                                    {index > 0 && <ChevronRight size={14} aria-hidden="true" />}
                                    {index < breadcrumbs.length - 1 ? (
                                        <Link href={item.path} className="hover:text-white hover:underline">
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <span aria-current="page" className="text-white">
                                            {item.name}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}

                {eyebrow && <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-yellow-300">{eyebrow}</p>}

                <h1 className="mt-3 max-w-4xl text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl">{title}</h1>

                {intro && <p className="mt-5 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">{intro}</p>}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                        href={CONTACT_WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#128c4a] px-6 py-3 font-bold text-white transition hover:bg-[#0f7a40]"
                    >
                        <MessageCircle size={18} aria-hidden="true" />
                        WhatsApp a counsellor
                    </a>
                    <a
                        href={`tel:${CONTACT_PHONE}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 font-bold text-white transition hover:bg-white/10"
                    >
                        <Phone size={18} aria-hidden="true" />
                        Call {CONTACT_PHONE_DISPLAY}
                    </a>
                </div>

                {children}
            </div>
        </section>
    );
}

export function GuideSection({ id, title, intro, children, className = "" }) {
    return (
        <section id={id} className={`mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 ${className}`}>
            <h2 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl">{title}</h2>
            {intro && <p className="mt-4 text-base leading-8 text-slate-700 sm:text-[1.05rem]">{intro}</p>}
            {children}
        </section>
    );
}

export function Prose({ children, className = "" }) {
    return <div className={`mt-4 space-y-4 text-base leading-8 text-slate-700 sm:text-[1.05rem] ${className}`}>{children}</div>;
}

/** items: strings, elements or { title, text } */
export function PointList({ items, ordered = false, className = "" }) {
    const List = ordered ? "ol" : "ul";

    return (
        <List className={`mt-5 space-y-3 ${ordered ? "list-decimal pl-6" : ""} ${className}`}>
            {items.map((item, index) => (
                <li
                    key={index}
                    className={`rounded-2xl border border-slate-100 bg-slate-50 p-4 leading-7 text-slate-700 ${ordered ? "ml-1 pl-3" : ""}`}
                >
                    {typeof item === "object" && item && "title" in item ? (
                        <>
                            <span className="font-bold text-slate-900">{item.title}</span>
                            {item.text ? <span>{`: `}{item.text}</span> : null}
                        </>
                    ) : (
                        item
                    )}
                </li>
            ))}
        </List>
    );
}

export function TableWrap({ children, minWidth = 640, caption }) {
    return (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm" style={{ minWidth }}>
                {caption && <caption className="px-4 pt-4 text-left text-sm text-slate-500">{caption}</caption>}
                {children}
            </table>
        </div>
    );
}

export const th = "px-4 py-3";
export const theadClass = "bg-slate-50 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-500";
export const tbodyClass = "divide-y divide-slate-100 text-slate-700 align-top";

/** A link to an official site inside running text. */
export function SourceLink({ href, children }) {
    return (
        <a href={href} target="_blank" rel="noopener" className="font-semibold text-secondary underline decoration-secondary/30 underline-offset-2 hover:decoration-secondary">
            {children}
            <ExternalLink size={13} aria-hidden="true" className="ml-0.5 inline-block align-baseline" />
        </a>
    );
}

export function TextLink({ href, children }) {
    return (
        <Link href={href} className="font-bold text-primary hover:underline">
            {children}
        </Link>
    );
}

/** links: [{ href, title, text }] to other pages on the site. */
export function RelatedLinks({ title = "Related guides", links, className = "" }) {
    return (
        <section className={`mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 ${className}`}>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">{title}</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-primary/30 hover:shadow-md"
                        >
                            <span>
                                <span className="block font-bold text-slate-900 group-hover:text-primary">{link.title}</span>
                                {link.text && <span className="mt-1 block text-sm leading-6 text-slate-600">{link.text}</span>}
                            </span>
                            <ArrowRight size={18} aria-hidden="true" className="mt-1 shrink-0 text-primary" />
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

/*
 * The language training note. Classes are given by Medcity
 * International Academy (medcityacademy.com), not Medcity Overseas.
 * subjects: "German", "IELTS and OET", ...
 */
export function AcademyNote({ lead, subjects = "German" }) {
    return (
        <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/[0.04] p-5 leading-7 text-slate-700">
            {lead ? `${lead} ` : ""}
            {subjects} classes are available at{" "}
            <a href="https://medcityacademy.com/courses/" target="_blank" rel="noopener" className="font-bold text-primary hover:underline">
                Medcity International Academy
            </a>
            .
        </div>
    );
}

export function ContactBand({ title = "Talk to a Medcity Overseas counsellor", text }) {
    return (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-secondary p-6 text-white sm:p-8">
                <h2 className="text-2xl font-black sm:text-3xl">{title}</h2>
                <p className="mt-3 max-w-3xl leading-7 text-white/85">
                    {text ??
                        "Call or WhatsApp us to book a counselling session, or visit one of our branches across Kerala, and we will look at your marks, test plans and budget with you."}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a href={`tel:${CONTACT_PHONE}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-secondary">
                        <Phone size={18} aria-hidden="true" />
                        {CONTACT_PHONE_DISPLAY}
                    </a>
                    <a
                        href={CONTACT_WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 font-bold text-white hover:bg-white/10"
                    >
                        <MessageCircle size={18} aria-hidden="true" />
                        WhatsApp
                    </a>
                    <Link href="/branches" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 font-bold text-white hover:bg-white/10">
                        Find a branch
                    </Link>
                    <Link href="/contact-us" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 font-bold text-white hover:bg-white/10">
                        Contact us
                    </Link>
                </div>
            </div>
        </section>
    );
}
