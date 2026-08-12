import {
    ArrowRight,
    Sparkles,
} from "lucide-react";

import Link from "next/link";

const DecorativeDots = ({
    className = "",
    dotClassName = "bg-logoYellow",
}) => {
    return (
        <div
            aria-hidden="true"
            className={`grid grid-cols-4 gap-2 ${className}`}
        >
            {Array.from({ length: 12 }).map(
                (_, index) => (
                    <span
                        key={index}
                        className={`h-1 w-1 rounded-full ${dotClassName}`}
                    />
                )
            )}
        </div>
    );
};

const ContactCard = ({
    id,
    title,
    description,
    Icon,
}) => {
    return (
        <article
            className="group relative flex h-full min-h-[350px] flex-col overflow-hidden rounded-[30px] border border-black/10 bg-white p-7 text-black shadow-[0_25px_70px_rgba(247,236,34,0.25)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_90px_rgba(247,236,34,0.4)]"
        >


            {/* Bottom decorative shape */}
            <div
                aria-hidden="true"
                className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-black/10 blur-3xl"
            />

            {/* Decorative rings */}
            <div
                aria-hidden="true"
                className="absolute -right-10 bottom-10 h-32 w-32 rounded-full border border-black/10"
            />

            <div
                aria-hidden="true"
                className="absolute -right-4 bottom-16 h-20 w-20 rounded-full border border-black/10"
            />

            <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                    {/* Icon */}
                    <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-black text-logoYellow shadow-[0_12px_30px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-darkPrimary"
                    >
                        <Icon
                            aria-hidden="true"
                            className="h-7 w-7"
                            strokeWidth={1.8}
                        />
                    </div>

                    {/* Badge */}
                    <div
                        className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/10 px-3 py-1.5 text-[11px] font-bold text-black backdrop-blur-md"
                    >
                        <Sparkles
                            aria-hidden="true"
                            className="h-3.5 w-3.5"
                        />

                        Expert support
                    </div>
                </div>

                <div className="mt-7">
                    <span
                        className="text-sm font-bold tracking-wider text-black/55"
                    >
                        {id}
                    </span>

                    <h3
                        className="mt-2 text-2xl font-extrabold leading-tight text-black"
                    >
                        {title}
                    </h3>

                    <div
                        aria-hidden="true"
                        className="mt-4 h-0.5 w-14 rounded-full bg-black/70 transition-all duration-500 group-hover:w-24"
                    />

                    <p
                        className="mt-5 text-sm leading-7 text-black/75 sm:text-base"
                    >
                        {description}
                    </p>
                </div>

                <div className="mt-auto pt-7">
                    <Link
                        href="/contact-us"
                        aria-label="Contact Medcity Study Abroad"
                        className="group/button relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-black bg-black px-5 py-4 text-sm font-bold text-logoYellow shadow-[0_15px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-darkPrimary hover:shadow-[0_20px_45px_rgba(0,0,0,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-logoYellow"
                    >
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover/button:translate-x-full"
                        />

                        <span className="relative">
                            Contact Us
                        </span>

                        <span
                            className="relative flex h-8 w-8 items-center justify-center rounded-full bg-logoYellow text-black transition-all duration-300 group-hover/button:translate-x-1 group-hover/button:bg-white"
                        >
                            <ArrowRight
                                aria-hidden="true"
                                className="h-4 w-4"
                            />
                        </span>
                    </Link>
                </div>

                <DecorativeDots
                    className="absolute bottom-24 right-0 opacity-20"
                    dotClassName="bg-black"
                />
            </div>
        </article>
    );
};

const StandardServiceCard = ({
    id,
    title,
    description,
    Icon,
}) => {
    return (
        <article
            className="group relative flex h-full min-h-[350px] flex-col overflow-hidden rounded-[30px] border border-white/15 bg-white/[0.07] p-7 text-white backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/60 hover:bg-white/[0.11] hover:shadow-[0_25px_70px_rgba(0,0,0,0.28)]"
        >
            {/* Hover gradient */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            {/* Top corner glow */}
            <div
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl transition-transform duration-700 group-hover:scale-125"
            />

            {/* Large background number */}
            <span
                aria-hidden="true"
                className="absolute right-5 top-3 text-7xl font-black text-white/[0.035] transition-all duration-500 group-hover:text-primary/[0.08]"
            >
                {id}
            </span>

            <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start gap-4">
                    <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/60 bg-primary/10 text-white shadow-[0_10px_30px_rgba(192,31,83,0.15)] transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary group-hover:shadow-[0_15px_35px_rgba(192,31,83,0.35)]"
                    >
                        <Icon
                            aria-hidden="true"
                            className="h-7 w-7"
                            strokeWidth={1.7}
                        />
                    </div>

                    <div>
                        <span
                            className="text-sm font-bold tracking-wider text-primary"
                        >
                            {id}
                        </span>

                        <h3
                            className="mt-1 text-xl font-bold leading-snug text-white"
                        >
                            {title}
                        </h3>
                    </div>
                </div>

                <div
                    aria-hidden="true"
                    className="ml-[72px] mt-5 h-0.5 w-12 rounded-full bg-primary transition-all duration-500 group-hover:w-20"
                />

                <p
                    className="mt-7 text-sm leading-7 text-white/70 sm:text-base"
                >
                    {description}
                </p>

                <div
                    className="mt-auto flex items-end justify-between pt-8"
                >
                    <span
                        className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35 transition-colors duration-300 group-hover:text-primary"
                    >
                        Student support
                    </span>

                    <DecorativeDots className="opacity-55" />
                </div>
            </div>
        </article>
    );
};

const EssentialServiceCard = (props) => {
    const isContactCard =
        props.variant === "contact";

    if (isContactCard) {
        return <ContactCard {...props} />;
    }

    return <StandardServiceCard {...props} />;
};

export default EssentialServiceCard;