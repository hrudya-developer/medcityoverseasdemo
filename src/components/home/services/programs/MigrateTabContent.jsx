import Image from "next/image";
import cn from "@/lib/cn";

import Link from "next/link";
import migrateCanada from "@/assets/migrate-canada.png";
import migrateAustralia from "@/assets/migrate-australia.png";

import {
    ArrowRight,
    BriefcaseBusiness,
    Globe,
    GraduationCap,
    HeartPulse,
    ShieldCheck,
    Users,
} from "lucide-react";

const immigrationData = [
    {
        id: "canada-skilled-immigration",
        country: "Canada",
        badge: "CANADA",
        title: "Canadian Skilled Immigration",
        link: "/canada-migration",
        image: migrateCanada,
        imageAlt:
            "Canadian skilled immigration pathway for qualified professionals",
        buttonColor: "bg-primary",
        buttonHover: "hover:bg-darkPrimary",
        accent: "text-primary",
        accentBackground: "bg-primary/10",
        accentBorder: "hover:border-primary/40",
        dividerColor: "bg-primary",
        features: [
            {
                id: "canada-education",
                icon: GraduationCap,
                text: "Quality Education",
            },
            {
                id: "canada-healthcare",
                icon: HeartPulse,
                text: "Healthcare Access",
            },
            {
                id: "canada-quality-life",
                icon: ShieldCheck,
                text: "High Quality of Life",
            },
        ],
        description:
            "Canada’s skilled immigration programs support qualified professionals and experienced workers in pursuing international career opportunities, permanent residency pathways, and a higher standard of living.",
    },
    {
        id: "australia-skilled-immigration",
        country: "Australia",
        badge: "AUSTRALIA",
        title: "Australian Skilled Immigration",
        link: "/australia-migration",
        image: migrateAustralia,
        imageAlt:
            "Australian skilled immigration pathway for professionals and tradespeople",
        buttonColor: "bg-secondary",
        buttonHover: "hover:bg-blue-800",
        accent: "text-secondary",
        accentBackground: "bg-secondary/10",
        accentBorder: "hover:border-secondary/40",
        dividerColor: "bg-secondary",
        features: [
            {
                id: "australia-jobs",
                icon: BriefcaseBusiness,
                text: "In-Demand Jobs",
            },
            {
                id: "australia-society",
                icon: Users,
                text: "Multicultural Society",
            },
            {
                id: "australia-pr",
                icon: Globe,
                text: "Pathway to PR",
            },
        ],
        description:
            "Australia’s skilled immigration pathways are designed for qualified professionals and skilled tradespeople whose qualifications and experience match the needs of the Australian labour market.",
    },
];

export default function MigrateTabContent() {
    return (
        <section
            id="skilled-immigration-programs"
            aria-labelledby="skilled-immigration-title"
            aria-describedby="skilled-immigration-description"
            className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-b from-white to-gray-100 py-10 [content-visibility:auto] [contain-intrinsic-size:900px] sm:py-12 lg:py-14"
        >
            {/* Dot pattern */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-30 opacity-35 [background-image:radial-gradient(circle,rgba(99,26,51,0.14)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]"
            />

            {/* Background glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(192,31,83,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(4,102,175,0.10),transparent_32%)]"
            />

            {/* Left decorative rings */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 top-20 -z-10 h-64 w-64 rounded-full border border-primary/10"
            >
                <div className="absolute inset-8 rounded-full border border-primary/10" />
                <div className="absolute inset-16 rounded-full bg-primary/5" />
            </div>

            {/* Right decorative square */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 bottom-10 -z-10 hidden h-64 w-64 rotate-12 rounded-[48px] border border-secondary/10 lg:block"
            />

            <div className="mx-auto max-w-7xl px-3 sm:px-5 md:px-8">
                <header className="mx-auto mb-14 max-w-4xl text-center">
                    <p
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary shadow-sm"
                    >
                        <Globe
                            aria-hidden="true"
                            size={17}
                            strokeWidth={2.2}
                        />

                        Skilled Migration Pathways
                    </p>

                    <h2
                        id="skilled-immigration-title"
                        className="mt-5 text-balance text-3xl font-extrabold leading-tight tracking-tight text-darkPrimary sm:text-4xl lg:text-5xl"
                    >
                        Skilled Immigration{" "}
                        <span
                            className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                        >
                            Opportunities
                        </span>
                    </h2>

                    <p
                        id="skilled-immigration-description"
                        className="mx-auto mt-5 max-w-3xl text-pretty text-base leading-8 text-gray-600 md:text-lg"
                    >
                        Explore skilled immigration pathways to Canada and
                        Australia designed for qualified professionals seeking
                        global career growth, permanent residency opportunities,
                        and a better quality of life.
                    </p>

                    <div
                        aria-hidden="true"
                        className="mx-auto mt-6 flex items-center justify-center gap-2"
                    >
                        <span className="h-1.5 w-4 rounded-full bg-primary/30" />
                        <span className="h-1.5 w-16 rounded-full bg-primary" />
                        <span className="h-1.5 w-4 rounded-full bg-primary/30" />
                    </div>
                </header>

                <div
                    role="list"
                    aria-label="Skilled immigration programs"
                    className="grid grid-cols-1 gap-8 lg:grid-cols-2"
                >
                    {immigrationData.map((item) => (
                        <article
                            key={item.id}
                            id={item.id}
                            role="listitem"
                            aria-labelledby={`${item.id}-title`}
                            aria-describedby={`${item.id}-description`}
                            className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary/15 hover:shadow-2xl motion-reduce:transform-none motion-reduce:transition-none"
                        >
                            <div className="relative">
                                <div className="relative h-[260px] w-full sm:h-[300px] md:h-[320px]">
                                    <Image
                                        src={item.image}
                                        alt={item.imageAlt}
                                        fill
                                        sizes="
                      (max-width: 1024px) 100vw,
                      50vw
                    "
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                                />

                                <span
                                    className="absolute left-5 top-5 rounded-full bg-white px-5 py-2 text-sm font-semibold tracking-wide text-primary shadow-md"
                                >
                                    {item.badge}
                                </span>

                                <div
                                    aria-hidden="true"
                                    className="absolute -bottom-8 left-1/2 z-20 -translate-x-1/2"
                                >
                                    <div
                                        className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-white shadow-xl"
                                    >
                                        <div
                                            className={cn(`
                        flex h-12 w-12
                        items-center justify-center
                        rounded-full
                        text-white
                        transition-transform duration-300
                        group-hover:scale-110
                        motion-reduce:transform-none
                        motion-reduce:transition-none
                        ${item.buttonColor}
                      `)}
                                        >
                                            <Users
                                                size={24}
                                                strokeWidth={2.1}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative px-5 pb-8 pt-14 text-center sm:px-7">
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute right-5 top-8 grid grid-cols-4 gap-1 opacity-15"
                                >
                                    {Array.from({ length: 16 }).map((_, index) => (
                                        <span
                                            key={index}
                                            className="h-1.5 w-1.5 rounded-full bg-primary"
                                        />
                                    ))}
                                </div>

                                <h3
                                    id={`${item.id}-title`}
                                    className="text-balance text-xl font-bold leading-tight text-darkPrimary"
                                >
                                    {item.title}
                                </h3>

                                <div
                                    aria-hidden="true"
                                    className={cn(`
                    mx-auto mt-4
                    h-1 w-20
                    rounded-full
                    transition-[width] duration-300
                    group-hover:w-28
                    motion-reduce:transition-none
                    ${item.dividerColor}
                  `)}
                                />

                                <p
                                    id={`${item.id}-description`}
                                    className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-gray-600 md:text-base"
                                >
                                    {item.description}
                                </p>

                                <ul
                                    aria-label={`${item.country} immigration benefits`}
                                    className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
                                >
                                    {item.features.map((feature) => {
                                        const FeatureIcon = feature.icon;

                                        return (
                                            <li
                                                key={feature.id}
                                                className={cn(`
                          flex min-h-[112px]
                          flex-col items-center justify-center
                          gap-3 rounded-2xl
                          border border-gray-100
                          bg-gray-50 p-4
                          transition-[transform,border-color,background-color]
                          duration-300
                          hover:-translate-y-1
                          hover:bg-white
                          motion-reduce:transform-none
                          motion-reduce:transition-none
                          ${item.accentBorder}
                        `)}
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className={cn(`
                            flex h-10 w-10
                            items-center justify-center
                            rounded-full
                            ${item.accent}
                            ${item.accentBackground}
                          `)}
                                                >
                                                    <FeatureIcon
                                                        size={19}
                                                        strokeWidth={2.1}
                                                    />
                                                </span>

                                                <span className="text-sm font-semibold text-secondary">
                                                    {feature.text}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <Link
                                    href={item.link}
                                    aria-label={`Explore ${item.title}`}
                                    className={cn(`
                    mt-10
                    inline-flex items-center justify-center
                    gap-3 rounded-xl
                    px-4 py-3
                    text-sm font-semibold
                    text-white
                    shadow-md
                    outline-none
                    transition-[transform,background-color,box-shadow]
                    duration-300
                    hover:scale-105
                    hover:shadow-lg
                    focus-visible:ring-2
                    focus-visible:ring-primary
                    focus-visible:ring-offset-4
                    motion-reduce:transform-none
                    motion-reduce:transition-none
                    ${item.buttonColor}
                    ${item.buttonHover}
                  `)}
                                >
                                    Explore {item.country} Immigration

                                    <ArrowRight
                                        aria-hidden="true"
                                        size={18}
                                        strokeWidth={2.2}
                                    />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                <p className="sr-only">
                    Medcity provides skilled immigration guidance for Canada
                    and Australia, including eligibility support, documentation
                    guidance, career pathway information, permanent residency
                    options and settlement preparation.
                </p>
            </div>
        </section>
    );
}