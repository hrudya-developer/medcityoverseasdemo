import {
    BadgeCheck,
    Leaf,
    ShieldCheck,
    TrendingUp,
    UsersRound,
} from "lucide-react";

import {
    FaCanadianMapleLeaf,
} from "react-icons/fa";

const canadaBenefits = [
    {
        number: "01",
        title: "High Quality of Life",
        description:
            "Enjoy access to quality healthcare, education and a safe, clean living environment.",
        icon: BadgeCheck,
    },
    {
        number: "02",
        title: "Diverse and Inclusive",
        description:
            "Canada is a multicultural society that welcomes people from different backgrounds.",
        icon: UsersRound,
    },
    {
        number: "03",
        title: "Strong Economy",
        description:
            "Explore career, entrepreneurship and long-term professional opportunities in a stable economy.",
        icon: TrendingUp,
    },
    {
        number: "04",
        title: "Safe and Secure",
        description:
            "Canada offers a peaceful environment with strong public services and community support.",
        icon: ShieldCheck,
    },
];

export default function CanadaOpportunityCard() {
    return (
        <article
            id="canada-opportunities"
            itemScope
            itemType="https://schema.org/Service"
            aria-labelledby="canada-opportunities-title"
            className="
                group relative
                flex min-w-0 flex-col
                overflow-hidden
                rounded-[28px]
                border border-primary/10
                bg-white p-4
                shadow-[0_14px_42px_rgba(99,26,51,0.08)]
                transition-all duration-500
                hover:-translate-y-1.5
                hover:border-primary/20
                hover:shadow-[0_26px_65px_rgba(192,31,83,0.14)]
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
                content="Canada migration and immigration guidance"
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute -right-20 -top-20
                    size-56 rounded-full
                    bg-primary/10 blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute -bottom-20 -left-20
                    size-56 rounded-full
                    bg-secondary/10 blur-3xl
                "
            />

            <header
                className="
                    relative overflow-hidden
                    rounded-[24px]
                    bg-gradient-to-br
                    from-darkPrimary
                    via-primary
                    to-[#8f1846]
                    p-5 text-white
                    shadow-[0_18px_45px_rgba(99,26,51,0.24)]
                    sm:p-6
                "
            >
                <div
                    aria-hidden="true"
                    className="
                        absolute -right-16 -top-16
                        size-44 rounded-full
                        border-[24px]
                        border-white/10
                        bg-white/[0.04]
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute -bottom-16 -right-8
                        text-white/[0.055]
                    "
                >
                    <FaCanadianMapleLeaf
                        size={200}
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
                        className="
                            grid size-20 shrink-0
                            place-content-center
                            rounded-[22px]
                            border-4 border-white/80
                            bg-white
                            text-primary
                            shadow-[0_16px_35px_rgba(15,23,42,0.22)]
                            sm:size-24
                        "
                    >
                        <FaCanadianMapleLeaf
                            size={42}
                            aria-hidden="true"
                        />
                    </span>

                    <div className="min-w-0">
                        <span
                            className="
                                inline-flex
                                items-center gap-2
                                rounded-full
                                border border-white/20
                                bg-white/10
                                px-3 py-1.5
                                text-[10px]
                                font-black uppercase
                                tracking-[0.14em]
                                text-white
                                backdrop-blur-md
                                sm:text-xs
                            "
                        >
                            <Leaf
                                size={13}
                                aria-hidden="true"
                            />

                            Canada Lifestyle
                        </span>

                        <h3
                            id="canada-opportunities-title"
                            itemProp="name"
                            className="
                                mt-4 text-xl
                                font-black leading-tight
                                tracking-[-0.035em]
                                text-white
                                sm:text-2xl
                            "
                        >
                            <span className="text-logoYellow">
                                Canada
                            </span>

                            {" — "}A Land of Opportunities
                        </h3>

                        <div
                            aria-hidden="true"
                            className="
                                mx-auto mt-4
                                h-1 w-14
                                rounded-full
                                bg-white/85
                                sm:mx-0
                            "
                        />

                        <p
                            itemProp="description"
                            className="
                                mt-4 text-sm
                                font-medium leading-7
                                text-white/85
                                sm:text-[15px]
                            "
                        >
                            Discover a welcoming country
                            where quality of life,
                            diversity, economic
                            opportunity and long-term
                            security come together.
                        </p>
                    </div>
                </div>
            </header>

            <section
                aria-labelledby="canada-benefits-heading"
                className="mt-5"
            >
                <h4
                    id="canada-benefits-heading"
                    className="sr-only"
                >
                    Benefits of living and working in Canada
                </h4>

                <div
                    className="
                        grid grid-cols-1 gap-3
                        sm:grid-cols-2
                        xl:grid-cols-1
                        2xl:grid-cols-2
                    "
                >
                    {canadaBenefits.map(
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
                                    to-primary/[0.035]
                                    p-4
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:border-primary/25
                                    hover:shadow-[0_14px_30px_rgba(192,31,83,0.11)]
                                "
                            >
                                <div
                                    aria-hidden="true"
                                    className="
                                        absolute -right-8
                                        -top-8 size-20
                                        rounded-full
                                        bg-primary/[0.04]
                                        transition-transform
                                        duration-500
                                        group-hover/card:scale-150
                                    "
                                />

                                <div
                                    className="
                                        relative flex
                                        min-w-0
                                        items-start gap-3
                                    "
                                >
                                    <span
                                        className="
                                            grid size-11
                                            shrink-0
                                            place-content-center
                                            rounded-xl
                                            bg-primary/10
                                            text-primary
                                            transition-all
                                            duration-300
                                            group-hover/card:bg-primary
                                            group-hover/card:text-white
                                        "
                                    >
                                        <Icon
                                            size={19}
                                            strokeWidth={2.1}
                                            aria-hidden="true"
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

            <div className="mt-auto pt-5">
                <div
                    className="
                        grid overflow-hidden
                        rounded-2xl
                        border border-primary/10
                        bg-primary/[0.045]
                        sm:grid-cols-2
                    "
                >
                    <OpportunityDetail
                        icon={
                            FaCanadianMapleLeaf
                        }
                        title="Build Your Future"
                        description="Canada offers opportunities to build a career, establish a business and create a long-term future."
                        showDivider
                    />

                    <OpportunityDetail
                        icon={BadgeCheck}
                        title="Better Quality of Life"
                        description="Benefit from public services, community support, security and a welcoming multicultural society."
                    />
                </div>
            </div>

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute bottom-0
                    left-1/2 h-1 w-0
                    -translate-x-1/2
                    rounded-full
                    bg-gradient-to-r
                    from-secondary
                    via-primary
                    to-darkPrimary
                    transition-all
                    duration-500
                    group-hover:w-3/4
                "
            />
        </article>
    );
}

function OpportunityDetail({
    icon: Icon,
    title,
    description,
    showDivider = false,
}) {
    return (
        <div
            className={`
                flex min-w-0
                items-start gap-3
                px-4 py-4
                ${showDivider
                    ? `
                            border-b
                            border-primary/10
                            sm:border-b-0
                            sm:border-r
                        `
                    : ""
                }
            `}
        >
            <span
                className="
                    grid size-10
                    shrink-0
                    place-content-center
                    rounded-xl
                    bg-primary/10
                    text-primary
                "
            >
                <Icon
                    size={19}
                    aria-hidden="true"
                />
            </span>

            <div className="min-w-0">
                <h4
                    className="
                        text-sm font-bold
                        leading-5
                        text-darkPrimary
                    "
                >
                    {title}
                </h4>

                <p
                    className="
                        mt-1.5
                        text-sm leading-5
                        text-slate-600
                    "
                >
                    {description}
                </p>
            </div>
        </div>
    );
}