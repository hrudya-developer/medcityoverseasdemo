import {
    BadgeCheck,
    Building2,
    FileCheck2,
    Rocket,
    Send,
    UsersRound,
} from "lucide-react";

const startupVisaSteps = [
    {
        number: "01",
        title: "Meet Eligibility",
        description:
            "Review the basic eligibility requirements for Canada's Start-Up Visa Program.",
        icon: BadgeCheck,
    },
    {
        number: "02",
        title: "Prepare Your Proposal",
        description:
            "Develop and present an innovative business proposal for assessment.",
        icon: Send,
    },
    {
        number: "03",
        title: "Secure Organization Support",
        description:
            "Obtain support from an eligible designated Canadian organization.",
        icon: UsersRound,
    },
    {
        number: "04",
        title: "Submit Your Application",
        description:
            "Prepare the required documents and submit the immigration application.",
        icon: FileCheck2,
    },
    {
        number: "05",
        title: "Build Your Business",
        description:
            "Establish an innovative Canadian business with growth and employment potential.",
        icon: Building2,
    },
];

export default function CanadaVisaStartup() {
    return (
        <article
            id="canada-startup-visa"
            itemScope
            itemType="https://schema.org/Service"
            aria-labelledby="canada-startup-visa-title"
            className="
                group relative
                flex min-w-0 flex-col
                overflow-hidden
                rounded-[28px]
                border border-secondary/15
                bg-white p-4
                shadow-[0_14px_42px_rgba(4,102,175,0.08)]
                transition-all duration-500
                hover:-translate-y-1.5
                hover:border-secondary/25
                hover:shadow-[0_26px_65px_rgba(4,102,175,0.14)]
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
                content="Canada Start-Up Visa guidance"
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute -right-20 -top-20
                    size-56 rounded-full
                    bg-secondary/[0.08]
                    blur-3xl
                "
            />

            <header
                className="
                    relative overflow-hidden
                    rounded-[24px]
                    border border-secondary/10
                    bg-gradient-to-br
                    from-secondary/[0.08]
                    via-white
                    to-secondary/[0.03]
                    p-5
                    sm:p-6
                "
            >
                <div
                    aria-hidden="true"
                    className="
                        absolute -right-16 -top-16
                        size-44 rounded-full
                        border-[24px]
                        border-white/60
                        bg-secondary/[0.06]
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute -bottom-14 -right-8
                        text-secondary/[0.04]
                    "
                >
                    <Rocket
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
                            from-secondary
                            to-[#063a72]
                            text-white
                            shadow-[0_14px_30px_rgba(4,102,175,0.28)]
                            sm:size-24
                        "
                    >
                        <Rocket
                            size={40}
                            strokeWidth={2}
                        />
                    </span>

                    <div className="min-w-0">
                        <span
                            className="
                                inline-flex items-center
                                gap-2 rounded-full
                                border border-secondary/10
                                bg-white/85
                                px-3 py-1.5
                                text-[10px]
                                font-black uppercase
                                tracking-[0.14em]
                                text-secondary
                                shadow-sm
                                sm:text-xs
                            "
                        >
                            <Rocket
                                size={13}
                                aria-hidden="true"
                            />

                            Canada Business Immigration
                        </span>

                        <h3
                            id="canada-startup-visa-title"
                            itemProp="name"
                            className="
                                mt-4 text-xl
                                font-black leading-tight
                                tracking-[-0.035em]
                                text-secondary
                                sm:text-2xl
                            "
                        >
                            Start-Up Visa for Entrepreneurs
                        </h3>

                        <div
                            aria-hidden="true"
                            className="
                                mx-auto mt-4
                                h-1 w-14
                                rounded-full
                                bg-secondary
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
                            A business immigration pathway
                            for eligible entrepreneurs who
                            plan to establish an innovative
                            company in Canada.
                        </p>
                    </div>
                </div>
            </header>

            <section
                aria-labelledby="startup-visa-steps-heading"
                className="mt-5"
            >
                <h4
                    id="startup-visa-steps-heading"
                    className="sr-only"
                >
                    Start-Up Visa application stages
                </h4>

                <ol
                    className="
                        grid grid-cols-1 gap-3
                        sm:grid-cols-2
                        xl:grid-cols-1
                        2xl:grid-cols-2
                    "
                >
                    {startupVisaSteps.map(
                        ({
                            number,
                            title,
                            description,
                            icon: Icon,
                        }) => (
                            <li
                                key={number}
                                className="h-full"
                            >
                                <article
                                    className="
                                        group/card
                                        relative h-full min-w-0
                                        overflow-hidden
                                        rounded-2xl
                                        border border-secondary/10
                                        bg-gradient-to-br
                                        from-white
                                        to-secondary/[0.025]
                                        p-4
                                        transition-all duration-300
                                        hover:-translate-y-1
                                        hover:border-secondary/25
                                        hover:shadow-[0_14px_30px_rgba(4,102,175,0.10)]
                                    "
                                >
                                    <div
                                        aria-hidden="true"
                                        className="
                                            absolute -right-8 -top-8
                                            size-20 rounded-full
                                            bg-secondary/[0.04]
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
                                                bg-secondary/[0.08]
                                                text-secondary
                                                transition-all duration-300
                                                group-hover/card:bg-secondary
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
                                                        text-[#063a72]
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
                                                        bg-secondary/10
                                                        text-[10px]
                                                        font-black
                                                        text-secondary
                                                    "
                                                >
                                                    {number}
                                                </span>
                                            </div>

                                            <p
                                                className="
                                                    mt-2 text-sm
                                                    leading-6
                                                    text-slate-600
                                                "
                                            >
                                                {description}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        )
                    )}
                </ol>
            </section>

            <aside
                aria-label="Start-Up Visa note"
                className="mt-auto pt-5"
            >
                <div
                    className="
                        flex items-start gap-3
                        rounded-2xl
                        border border-secondary/10
                        bg-secondary/[0.045]
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
                            bg-secondary/10
                            text-secondary
                        "
                    >
                        <Rocket size={19} />
                    </span>

                    <p
                        className="
                            text-sm font-semibold
                            leading-6
                            text-[#063a72]
                        "
                    >
                        An eligible innovative business
                        proposal may provide a pathway
                        toward establishing a company and
                        pursuing permanent residence in
                        Canada.
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
                    from-[#063a72]
                    via-secondary
                    to-cyan-400
                    transition-all duration-500
                    group-hover:w-3/4
                "
            />
        </article>
    );
}