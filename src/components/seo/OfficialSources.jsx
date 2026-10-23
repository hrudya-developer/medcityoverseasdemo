import { ExternalLink } from "lucide-react";

/*
 * Links to official sources (government, university or public agency
 * sites) so readers and AI search can check the facts on the page.
 * links: [{ label, href, note? }]
 */
export default function OfficialSources({ links, title = "Official sources", intro, className = "" }) {
    const list = (links ?? []).filter((link) => link?.href && /^https:\/\//i.test(link.href));

    if (!list.length) {
        return null;
    }

    return (
        <section className={`mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 ${className}`}>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">{title}</h2>

            <p className="mt-3 leading-7 text-slate-600">
                {intro ?? "Rules, fees and requirements change. Check the latest details on these official websites before you apply."}
            </p>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {list.map((link) => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            target="_blank"
                            rel="noopener"
                            className="group flex h-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-primary/30 hover:shadow-md"
                        >
                            <ExternalLink size={18} aria-hidden="true" className="mt-1 shrink-0 text-primary" />
                            <span>
                                <span className="block font-bold text-slate-900 group-hover:text-primary">{link.label}</span>
                                {link.note && <span className="mt-1 block text-sm leading-6 text-slate-500">{link.note}</span>}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}
