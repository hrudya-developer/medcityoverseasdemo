import {
    BadgeCheck,
    Clock3,
    Heart,
    ShieldCheck,
    UserRound,
    Users,
} from "lucide-react";

const sponsoredMembers = [
    {
        number: "01",
        title: "Spouse or Partner",
        description:
            "An eligible spouse or common-law partner.",
        icon: Heart,
    },
    {
        number: "02",
        title: "Dependent Children",
        description:
            "Eligible dependent children, subject to current age and dependency requirements.",
        icon: UserRound,
    },
    {
        number: "03",
        title: "Other Relatives",
        description:
            "Certain other relatives may qualify in limited circumstances.",
        icon: UserRound,
    },
    {
        number: "04",
        title: "Parents and Grandparents",
        description:
            "Parents and grandparents may be sponsored when program and financial requirements are met.",
        icon: Users,
    },
    {
        number: "05",
        title: "Processing Time",
        description:
            "Processing time can vary depending on the relationship category and application location.",
        icon: Clock3,
    },
];

export default function CanadaFamilySponsorship() {
    return (
        <article
            id="canada-family-sponsorship"
            aria-labelledby="canada-family-sponsorship-title"
            itemScope
            itemType="https://schema.org/Service"
            className="
                group relative
                flex min-w-0 flex-col
                overflow-hidden
                rounded-[28px]
                border border-orange-200/80
                bg-white p-4
                shadow-[0_14px_42px_rgba(234,88,12,0.08)]
                transition-all duration-500
                hover:-translate-y-1.5
                hover:border-orange-300
                hover:shadow-[0_26px_65px_rgba(234,88,12,0.14)]
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
                content="Canada family sponsorship guidance"
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute -right-20 -top-20
                    size-56 rounded-full
                    bg-orange-200/30
                    blur-3xl
                "
            />

            <header
                className="
                    relative overflow-hidden
                    rounded-[24px]
                    border border-orange-200/70
                    bg-gradient-to-br
                    from-orange-50
                    via-white
                    to-amber-50
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
                        border-white/70
                        bg-orange-300/20
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute -bottom-14 -right-8
                        text-orange-700/[0.04]
                    "
                >
                    <Users
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
                            from-orange-400
                            to-orange-600
                            text-white
                            shadow-[0_14px_30px_rgba(234,88,12,0.24)]
                            sm:size-24
                        "
                    >
                        <Users
                            size={42}
                            strokeWidth={2}
                        />
                    </span>

                    <div className="min-w-0">
                        <span
                            className="
                                inline-flex items-center
                                gap-2 rounded-full
                                border border-orange-200
                                bg-white/90
                                px-3 py-1.5
                                text-[10px]
                                font-black uppercase
                                tracking-[0.14em]
                                text-orange-700
                                shadow-sm
                                sm:text-xs
                            "
                        >
                            <BadgeCheck
                                size={13}
                                aria-hidden="true"
                            />

                            Family Immigration
                        </span>

                        <h3
                            id="canada-family-sponsorship-title"
                            itemProp="name"
                            className="
                                mt-4 text-xl
                                font-black leading-tight
                                tracking-[-0.035em]
                                text-orange-950
                                sm:text-2xl
                            "
                        >
                            Family Sponsorship
                        </h3>

                        <div
                            aria-hidden="true"
                            className="
                                mx-auto mt-4
                                h-1 w-14
                                rounded-full
                                bg-orange-500
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
                            Canada provides family
                            sponsorship pathways that may
                            allow eligible citizens and
                            permanent residents to reunite
                            with close family members.
                        </p>
                    </div>
                </div>
            </header>

            <section
                aria-labelledby="eligible-sponsors-heading"
                className="
                    mt-5 rounded-2xl
                    border border-orange-200/70
                    bg-orange-50/70
                    p-4
                    sm:p-5
                "
            >
                <div className="flex min-w-0 items-start gap-4">
                    <span
                        aria-hidden="true"
                        className="
                            grid size-11
                            shrink-0
                            place-content-center
                            rounded-xl
                            bg-orange-100
                            text-orange-700
                        "
                    >
                        <ShieldCheck
                            size={21}
                            strokeWidth={2.1}
                        />
                    </span>

                    <div className="min-w-0">
                        <h4
                            id="eligible-sponsors-heading"
                            className="
                                text-sm font-bold
                                text-orange-950
                                sm:text-[15px]
                            "
                        >
                            Eligible Sponsors
                        </h4>

                        <p
                            className="
                                mt-2 text-sm
                                leading-6
                                text-slate-600
                            "
                        >
                            Sponsors generally need to meet
                            age, status, residency and
                            financial requirements under the
                            applicable sponsorship program.
                        </p>
                    </div>
                </div>
            </section>

            <section
                aria-labelledby="sponsored-members-heading"
                className="mt-5"
            >
                <div className="mb-4 flex items-center gap-3">
                    <span
                        aria-hidden="true"
                        className="h-px flex-1 bg-orange-200"
                    />

                    <h4
                        id="sponsored-members-heading"
                        className="
                            shrink-0 text-sm
                            font-extrabold uppercase
                            tracking-[0.08em]
                            text-orange-800
                        "
                    >
                        Who Can Be Sponsored
                    </h4>

                    <span
                        aria-hidden="true"
                        className="h-px flex-1 bg-orange-200"
                    />
                </div>

                <div
                    className="
                        grid grid-cols-1 gap-3
                        sm:grid-cols-2
                    "
                >
                    {sponsoredMembers.map(
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
                                    border border-orange-200/70
                                    bg-gradient-to-br
                                    from-white
                                    to-orange-50/60
                                    p-4
                                    transition-all duration-300
                                    hover:-translate-y-1
                                    hover:border-orange-300
                                    hover:shadow-[0_14px_30px_rgba(234,88,12,0.11)]
                                "
                            >
                                <div
                                    aria-hidden="true"
                                    className="
                                        absolute -right-8 -top-8
                                        size-20 rounded-full
                                        bg-orange-200/20
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
                                            bg-orange-100
                                            text-orange-700
                                            transition-all duration-300
                                            group-hover/card:bg-orange-500
                                            group-hover/card:text-white
                                        "
                                    >
                                        <Icon
                                            size={19}
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
                                                    text-orange-950
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
                                                    bg-orange-100
                                                    text-[10px]
                                                    font-black
                                                    text-orange-700
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
                        )
                    )}
                </div>
            </section>

            <aside
                aria-label="Family sponsorship note"
                className="mt-auto pt-5"
            >
                <div
                    className="
                        flex items-start gap-3
                        rounded-2xl
                        border border-orange-200/70
                        bg-orange-50
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
                            bg-orange-100
                            text-orange-700
                        "
                    >
                        <Heart size={19} />
                    </span>

                    <p
                        className="
                            text-sm font-semibold
                            leading-6
                            text-orange-950
                        "
                    >
                        Family sponsorship can help
                        eligible Canadian citizens and
                        permanent residents reunite with
                        qualifying close family members.
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
                    from-amber-400
                    via-orange-500
                    to-orange-700
                    transition-all duration-500
                    group-hover:w-3/4
                "
            />
        </article>
    );
}