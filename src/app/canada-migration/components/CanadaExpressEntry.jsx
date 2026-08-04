import {
    FileText,
    MapPin,
    Star,
    Target,
    TrendingUp,
    Users,
} from "lucide-react";

const expressEntryFeatures = [
    {
        number: "01",
        title: "Federal Programs",
        description:
            "Express Entry manages the Federal Skilled Worker Program, Federal Skilled Trades Program and Canadian Experience Class.",
        icon: Target,
    },
    {
        number: "02",
        title: "CRS Score",
        description:
            "The Comprehensive Ranking System score is based on factors such as age, education, work experience and language ability.",
        icon: FileText,
    },
    {
        number: "03",
        title: "Invitation to Apply",
        description:
            "Eligible candidates with competitive profiles may receive an Invitation to Apply during an Express Entry draw.",
        icon: Star,
    },
    {
        number: "04",
        title: "CRS Enhancement",
        description:
            "An eligible provincial nomination can significantly increase an applicant's CRS score.",
        icon: TrendingUp,
    },
];

export default function CanadaExpressEntry() {
    return (
        <article
            id="canada-express-entry"
            aria-labelledby="canada-express-entry-title"
            itemScope
            itemType="https://schema.org/Service"
            className="
                group relative
                flex min-w-0 flex-col
                overflow-hidden
                rounded-[28px]
                border border-primary/15
                bg-white p-4
                shadow-[0_14px_42px_rgba(99,26,51,0.08)]
                transition-all duration-500
                hover:-translate-y-1.5
                hover:border-primary/25
                hover:shadow-[0_26px_65px_rgba(99,26,51,0.14)]
                sm:p-5
                lg:p-6
            "
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
                content="Canada Express Entry guidance"
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute -right-20 -top-20
                    size-56 rounded-full
                    bg-primary/[0.07]
                    blur-3xl
                "
            />

            <header
                className="
                    relative overflow-hidden
                    rounded-[24px]
                    border border-primary/10
                    bg-gradient-to-br
                    from-primary/[0.08]
                    via-white
                    to-primary/[0.03]
                    p-5
                    sm:p-6
                "
            >
                <div
                    aria-hidden="true"
                    className="
                        absolute -left-16 -top-16
                        size-44 rounded-full
                        border-[24px]
                        border-white/60
                        bg-primary/[0.06]
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute -bottom-14 -right-10
                        text-primary/[0.04]
                    "
                >
                    <MapPin
                        size={190}
                        strokeWidth={1}
                    />
                </div>

                <div
                    className="
                        relative z-10
                        flex flex-col
                        items-center gap-5
                        text-center
                        sm:flex-row
                        sm:text-left
                    "
                >
                    <span
                        aria-hidden="true"
                        className="
                            grid size-20
                            shrink-0
                            place-content-center
                            rounded-[22px]
                            border-4 border-white
                            bg-gradient-to-br
                            from-primary
                            to-darkPrimary
                            text-white
                            shadow-[0_14px_30px_rgba(192,31,83,0.28)]
                            sm:size-24
                        "
                    >
                        <span className="relative">
                            <Users
                                size={38}
                                strokeWidth={2.2}
                            />

                            <span
                                className="
                                    absolute -bottom-3
                                    left-1/2
                                    grid size-7
                                    -translate-x-1/2
                                    place-content-center
                                    rounded-full
                                    border-2 border-white
                                    bg-white
                                    text-primary
                                    shadow
                                "
                            >
                                <MapPin
                                    size={13}
                                    strokeWidth={2.5}
                                />
                            </span>
                        </span>
                    </span>

                    <div className="min-w-0">
                        <span
                            className="
                                inline-flex items-center
                                gap-2 rounded-full
                                border border-primary/10
                                bg-white/85
                                px-3 py-1.5
                                text-[10px]
                                font-black uppercase
                                tracking-[0.14em]
                                text-darkPrimary
                                shadow-sm
                                sm:text-xs
                            "
                        >
                            <MapPin
                                size={13}
                                aria-hidden="true"
                                className="text-primary"
                            />

                            Canada Immigration
                        </span>

                        <h3
                            id="canada-express-entry-title"
                            itemProp="name"
                            className="
                                mt-4 text-xl
                                font-black leading-tight
                                tracking-[-0.035em]
                                text-primary
                                sm:text-2xl
                            "
                        >
                            Canada Express Entry Program
                        </h3>

                        <div
                            aria-hidden="true"
                            className="
                                mx-auto mt-4
                                h-1 w-14
                                rounded-full
                                bg-primary
                                sm:mx-0
                            "
                        />

                        <p
                            itemProp="description"
                            className="
                                mt-4 text-sm
                                font-medium leading-7
                                text-slate-600
                                sm:text-[15px]
                            "
                        >
                            A points-based immigration
                            system used to manage eligible
                            skilled-worker applications for
                            Canadian permanent residence.
                        </p>
                    </div>
                </div>
            </header>

            <section
                aria-labelledby="express-entry-features-heading"
                className="mt-5"
            >
                <h4
                    id="express-entry-features-heading"
                    className="sr-only"
                >
                    Express Entry program highlights
                </h4>

                <div
                    className="
                        grid grid-cols-1 gap-3
                        sm:grid-cols-2
                        xl:grid-cols-1
                        2xl:grid-cols-2
                    "
                >
                    {expressEntryFeatures.map(
                        ({
                            number,
                            title,
                            description,
                            icon: Icon,
                        }) => (
                            <article
                                key={number}
                                className="
                                    group/card
                                    relative min-w-0
                                    overflow-hidden
                                    rounded-2xl
                                    border border-primary/10
                                    bg-gradient-to-br
                                    from-white
                                    to-primary/[0.025]
                                    p-4
                                    transition-all duration-300
                                    hover:-translate-y-1
                                    hover:border-primary/25
                                    hover:shadow-[0_14px_30px_rgba(192,31,83,0.10)]
                                "
                            >
                                <div
                                    aria-hidden="true"
                                    className="
                                        absolute -right-8 -top-8
                                        size-20 rounded-full
                                        bg-primary/[0.04]
                                        transition-transform
                                        duration-500
                                        group-hover/card:scale-150
                                    "
                                />

                                <div
                                    className="
                                        relative flex min-w-0
                                        items-start gap-3
                                    "
                                >
                                    <span
                                        aria-hidden="true"
                                        className="
                                            grid size-11
                                            shrink-0
                                            place-content-center
                                            rounded-xl
                                            bg-primary/[0.08]
                                            text-primary
                                            transition-all duration-300
                                            group-hover/card:bg-primary
                                            group-hover/card:text-white
                                        "
                                    >
                                        <Icon
                                            size={20}
                                            strokeWidth={2.1}
                                        />
                                    </span>

                                    <div className="min-w-0 flex-1">
                                        <div
                                            className="
                                                flex items-start
                                                justify-between gap-3
                                            "
                                        >
                                            <h5
                                                className="
                                                    min-w-0
                                                    text-sm font-bold
                                                    leading-5
                                                    text-darkPrimary
                                                    sm:text-[15px]
                                                "
                                            >
                                                {title}
                                            </h5>

                                            <span
                                                aria-hidden="true"
                                                className="
                                                    grid size-7
                                                    shrink-0
                                                    place-content-center
                                                    rounded-full
                                                    bg-primary/10
                                                    text-[10px]
                                                    font-black
                                                    text-primary
                                                "
                                            >
                                                {number}
                                            </span>
                                        </div>

                                        <p
                                            className="
                                                mt-2
                                                text-sm leading-6
                                                text-slate-600
                                            "
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
                aria-label="Express Entry note"
                className="mt-auto pt-5"
            >
                <div
                    className="
                        flex items-start gap-3
                        rounded-2xl
                        border border-primary/10
                        bg-primary/[0.045]
                        px-4 py-4
                    "
                >
                    <span
                        aria-hidden="true"
                        className="
                            grid size-10
                            shrink-0
                            place-content-center
                            rounded-xl
                            bg-primary/10
                            text-primary
                        "
                    >
                        <TrendingUp size={19} />
                    </span>

                    <p
                        className="
                            text-sm font-semibold
                            leading-6
                            text-darkPrimary
                        "
                    >
                        A stronger Express Entry profile may
                        improve your CRS ranking and increase
                        your chance of receiving an
                        Invitation to Apply.
                    </p>
                </div>
            </aside>

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute bottom-0 left-1/2
                    h-1 w-0
                    -translate-x-1/2
                    rounded-full
                    bg-gradient-to-r
                    from-secondary
                    via-primary
                    to-darkPrimary
                    transition-all duration-500
                    group-hover:w-3/4
                "
            />
        </article>
    );
}