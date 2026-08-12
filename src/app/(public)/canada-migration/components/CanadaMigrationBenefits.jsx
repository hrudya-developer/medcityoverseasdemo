import cn from "@/lib/cn";

import {
    BadgeDollarSign,
    GraduationCap,
    HeartPulse,
    ShieldCheck,
    TrendingUp,
    Users,
} from "lucide-react";

const benefits = [
    {
        id: 1,
        title: "High-Quality Healthcare",
        description:
            "Access quality healthcare services and a strong public health system.",
        icon: HeartPulse,
    },
    {
        id: 2,
        title: "World-Renowned Education",
        description:
            "Benefit from respected schools, colleges and universities across Canada.",
        icon: GraduationCap,
    },
    {
        id: 3,
        title: "Affordable Living",
        description:
            "Explore communities offering a balanced cost of living and quality lifestyle.",
        icon: BadgeDollarSign,
    },
    {
        id: 4,
        title: "Safe and Inclusive Society",
        description:
            "Live in a multicultural society known for safety, inclusion and diversity.",
        icon: ShieldCheck,
    },
    {
        id: 5,
        title: "Economic Opportunities",
        description:
            "Discover employment, entrepreneurship and long-term career opportunities.",
        icon: TrendingUp,
    },
    {
        id: 6,
        title: "Pathways to PR and Citizenship",
        description:
            "Explore eligible pathways toward permanent residence and Canadian citizenship.",
        icon: Users,
    },
];

export default function CanadaMigrationBenefits() {
    return (
        <section
            id="canada-benefits"
            aria-labelledby="canada-benefits-heading"
            className="relative overflow-hidden bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 top-10 size-64 rounded-full bg-primary/[0.06] blur-3xl"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 bottom-0 size-72 rounded-full bg-secondary/[0.06] blur-3xl"
            />

            <div className="relative mx-auto max-w-7xl">
                <div
                    className="relative rounded-[28px] border border-slate-200/80 bg-white px-4 pb-5 pt-14 shadow-[0_18px_50px_rgba(15,23,42,0.10)] sm:px-6 sm:pb-6 lg:px-8 lg:pb-7"
                >
                    <header
                        className="absolute left-4 top-0 -translate-y-1/2 sm:left-6 lg:left-8"
                    >
                        <h2
                            id="canada-benefits-heading"
                            className="rounded-xl bg-gradient-to-r from-darkPrimary to-primary px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(192,31,83,0.28)] sm:px-6 sm:text-base"
                        >
                            Benefits of Migrating to Canada
                        </h2>
                    </header>

                    <div
                        className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-0"
                    >
                        {benefits.map(
                            (
                                benefit,
                                index
                            ) => {
                                const Icon =
                                    benefit.icon;

                                return (
                                    <article
                                        key={
                                            benefit.id
                                        }
                                        className={cn(`
                                            group relative
                                            flex min-h-[175px]
                                            flex-col
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            bg-slate-50/80
                                            px-4 py-5
                                            text-center
                                            transition-all
                                            duration-300
                                            hover:-translate-y-1
                                            hover:bg-white
                                            hover:shadow-[0_14px_35px_rgba(15,23,42,0.08)]
                                            ${index !==
                                                benefits.length -
                                                1
                                                ? "lg:rounded-none lg:border-r lg:border-slate-200"
                                                : ""
                                            }
                                            ${index ===
                                                0
                                                ? "lg:rounded-l-2xl"
                                                : ""
                                            }
                                            ${index ===
                                                benefits.length -
                                                1
                                                ? "lg:rounded-r-2xl"
                                                : ""
                                            }
                                        `)}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className="grid size-12 place-content-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_12px_25px_rgba(192,31,83,0.24)]"
                                        >
                                            <Icon
                                                size={
                                                    24
                                                }
                                                strokeWidth={
                                                    2.2
                                                }
                                            />
                                        </span>

                                        <h3
                                            className="mt-4 max-w-[155px] text-sm font-bold leading-5 text-slate-900"
                                        >
                                            {
                                                benefit.title
                                            }
                                        </h3>

                                        <p
                                            className="mt-2 line-clamp-3 max-w-[180px] text-xs leading-5 text-slate-500"
                                        >
                                            {
                                                benefit.description
                                            }
                                        </p>
                                    </article>
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}