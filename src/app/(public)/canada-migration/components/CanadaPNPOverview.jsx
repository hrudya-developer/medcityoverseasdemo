import {
    BadgeCheck,
    FileText,
    Landmark,
    Link2,
    Medal,
    UsersRound,
} from "lucide-react";

const pnpHighlights = [
    {
        number: "01",
        title: "Provincial Categories",
        description:
            "Provincial and territorial streams vary, with candidates selected according to regional labour-market and economic needs.",
        icon: UsersRound,
    },
    {
        number: "02",
        title: "Express Entry Connection",
        description:
            "Some Provincial Nominee Program streams are linked to Express Entry, while others use a separate application process.",
        icon: Link2,
    },
    {
        number: "03",
        title: "Additional CRS Points",
        description:
            "An eligible provincial nomination can significantly increase an Express Entry candidate's CRS score.",
        icon: Medal,
    },
];

export default function CanadaPNPOverview() {
    return (
        <article
            id="canada-pnp-overview"
            itemScope
            itemType="https://schema.org/Service"
            aria-labelledby="canada-pnp-title"
            className="group relative flex min-w-0 flex-col overflow-hidden rounded-[28px] border border-purple-200/80 bg-white p-4 shadow-[0_14px_42px_rgba(126,34,206,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:border-purple-300 hover:shadow-[0_26px_65px_rgba(126,34,206,0.14)] sm:p-5 lg:p-6"
        >
            <meta
                itemProp="provider"
                content="Medcity Study Abroad"
            />

            <meta
                itemProp="areaServed"
                content="Canada"
            />

            <meta
                itemProp="serviceType"
                content="Canada Provincial Nominee Program guidance"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-purple-200/30 blur-3xl"
            />

            <header
                className="relative overflow-hidden rounded-[24px] border border-purple-200/70 bg-gradient-to-br from-purple-50 via-white to-violet-50 p-5 sm:p-6"
            >
                <div
                    aria-hidden="true"
                    className="absolute -right-16 -top-16 size-44 rounded-full border-[24px] border-white/70 bg-purple-300/20"
                />

                <div
                    aria-hidden="true"
                    className="absolute -bottom-14 -right-8 text-purple-700/[0.04]"
                >
                    <Landmark
                        size={190}
                        strokeWidth={1}
                    />
                </div>

                <div
                    className="relative z-10 flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left"
                >
                    <span
                        aria-hidden="true"
                        className="grid size-20 shrink-0 place-content-center rounded-[22px] border-4 border-white bg-gradient-to-br from-purple-400 to-purple-700 text-white shadow-[0_14px_30px_rgba(126,34,206,0.24)] sm:size-24"
                    >
                        <Landmark
                            size={40}
                            strokeWidth={2}
                        />
                    </span>

                    <div className="min-w-0">
                        <span
                            className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-purple-700 shadow-sm sm:text-xs"
                        >
                            <BadgeCheck
                                size={13}
                                aria-hidden="true"
                            />

                            Provincial Immigration
                        </span>

                        <h3
                            id="canada-pnp-title"
                            itemProp="name"
                            className="mt-4 text-xl font-black leading-tight tracking-[-0.035em] text-purple-950 sm:text-2xl"
                        >
                            Provincial Nominee Program
                            (PNP)
                        </h3>

                        <div
                            aria-hidden="true"
                            className="mx-auto mt-4 h-1 w-14 rounded-full bg-purple-600 sm:mx-0"
                        />

                        <p
                            itemProp="description"
                            className="mt-4 text-sm font-medium leading-7 text-slate-600 sm:text-[15px]"
                        >
                            A Canadian immigration route
                            designed around provincial and
                            territorial labour-market and
                            economic requirements.
                        </p>
                    </div>
                </div>
            </header>

            <section
                aria-labelledby="pnp-highlights-heading"
                className="mt-5"
            >
                <h4
                    id="pnp-highlights-heading"
                    className="sr-only"
                >
                    Provincial Nominee Program highlights
                </h4>

                <div
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2"
                >
                    {pnpHighlights.map(
                        ({
                            number,
                            title,
                            description,
                            icon: Icon,
                        }) => (
                            <article
                                key={number}
                                className="group/card relative min-w-0 overflow-hidden rounded-2xl border border-purple-200/70 bg-gradient-to-br from-white to-purple-50/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-[0_14px_30px_rgba(126,34,206,0.11)]"
                            >
                                <div
                                    aria-hidden="true"
                                    className="absolute -right-8 -top-8 size-20 rounded-full bg-purple-200/20 transition-transform duration-500 group-hover/card:scale-150"
                                />

                                <div
                                    className="relative flex min-w-0 items-start gap-3"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="grid size-11 shrink-0 place-content-center rounded-xl bg-purple-100 text-purple-700 transition-all duration-300 group-hover/card:bg-purple-600 group-hover/card:text-white"
                                    >
                                        <Icon
                                            size={19}
                                            strokeWidth={2.1}
                                        />
                                    </span>

                                    <div className="min-w-0 flex-1">
                                        <div
                                            className="flex items-start justify-between gap-3"
                                        >
                                            <h5
                                                className="min-w-0 text-sm font-bold leading-5 text-purple-950 sm:text-[15px]"
                                            >
                                                {title}
                                            </h5>

                                            <span
                                                aria-hidden="true"
                                                className="grid size-7 shrink-0 place-content-center rounded-full bg-purple-100 text-[10px] font-black text-purple-700"
                                            >
                                                {number}
                                            </span>
                                        </div>

                                        <p
                                            className="mt-2 text-sm leading-6 text-slate-600"
                                        >
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        )
                    )}
                </div>
            </section>

            <aside
                aria-label="Provincial nomination note"
                className="mt-auto pt-5"
            >
                <div
                    className="flex items-start gap-3 rounded-2xl border border-purple-200/70 bg-purple-50 px-4 py-4"
                >
                    <span
                        aria-hidden="true"
                        className="grid size-10 shrink-0 place-content-center rounded-xl bg-purple-100 text-purple-700"
                    >
                        <FileText size={19} />
                    </span>

                    <p
                        className="text-sm font-semibold leading-6 text-purple-950"
                    >
                        A provincial nomination may
                        considerably strengthen an eligible
                        applicant’s pathway toward Canadian
                        permanent residence.
                    </p>
                </div>
            </aside>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 via-purple-600 to-purple-900 transition-all duration-500 group-hover:w-3/4"
            />
        </article>
    );
}