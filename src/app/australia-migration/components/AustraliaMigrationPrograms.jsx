import Link from "next/link";

import {
    ArrowUpRight,
    BadgeCheck,
    BriefcaseBusiness,
    Building2,
    Check,
    Heart,
    Landmark,
    MapPin,
    Network,
    Sparkles,
    UserRound,
    UsersRound,
} from "lucide-react";

const migrationPathways = [
    {
        id: "skilled-migration",
        pathway: "Pathway 01",
        title: "Skilled Migration",
        description:
            "Explore points-tested and nominated migration pathways for eligible professionals with in-demand skills.",
        icon: BriefcaseBusiness,
        accent: "blue",
        options: [
            {
                code: "Class 189",
                title:
                    "Skilled Independent Visa",
                description:
                    "A permanent visa pathway for invited skilled workers who do not require state, territory or employer nomination.",
                icon: UsersRound,
            },
            {
                code: "Class 190",
                title:
                    "Skilled Nominated Visa",
                description:
                    "A permanent skilled visa for eligible applicants nominated by an Australian state or territory.",
                icon: Landmark,
            },
            {
                code: "Class 491",
                title:
                    "Skilled Work Regional Visa",
                description:
                    "A provisional pathway for invited applicants nominated by a state or territory, or sponsored by an eligible relative.",
                icon: MapPin,
            },
        ],
    },
    {
        id: "employer-sponsored",
        pathway: "Pathway 02",
        title:
            "Employer-Sponsored Visas",
        description:
            "Australian employers may sponsor eligible overseas workers for temporary, regional or permanent skilled positions.",
        icon: Building2,
        accent: "pink",
        options: [
            {
                code: "Class 482",
                title:
                    "Skills in Demand Visa",
                description:
                    "A temporary skilled visa for eligible workers sponsored by an approved Australian employer.",
                icon: UserRound,
            },
            {
                code: "Class 186",
                title:
                    "Employer Nomination Scheme",
                description:
                    "A permanent residence pathway for eligible skilled workers nominated by an Australian employer.",
                icon: UsersRound,
            },
        ],
    },
    {
        id: "family-migration",
        pathway: "Pathway 03",
        title: "Family Migration",
        description:
            "Australian citizens, permanent residents and eligible New Zealand citizens may sponsor qualifying family members.",
        icon: UsersRound,
        accent: "maroon",
        options: [
            {
                code: "Partner Visas",
                title:
                    "Partner Migration",
                description:
                    "Visa options for eligible spouses, de facto partners and prospective spouses.",
                icon: Heart,
            },
            {
                code: "Parent Visas",
                title:
                    "Parent Migration",
                description:
                    "Pathways for eligible parents of Australian citizens, permanent residents or eligible New Zealand citizens.",
                icon: UsersRound,
            },
            {
                code: "Child Visas",
                title:
                    "Child Migration",
                description:
                    "Visa pathways for eligible dependent, adopted or orphaned children.",
                icon: UserRound,
            },
            {
                code: "Other Family",
                title:
                    "Other Family Visas",
                description:
                    "Limited visa options for eligible carers, remaining relatives and aged dependent relatives.",
                icon: Network,
            },
        ],
    },
];

const accentStyles = {
    blue: {
        topBorder:
            "bg-gradient-to-r from-[#0757a6] to-secondary",
        iconBox:
            "bg-gradient-to-br from-[#0757a6] to-[#063d77]",
        iconSoft:
            "bg-blue-50 text-[#0757a6]",
        code: "text-[#0757a6]",
        badge:
            "bg-blue-50 text-[#0757a6]",
        check:
            "bg-blue-50 text-[#0757a6]",
        hover:
            "hover:border-blue-200 hover:shadow-[0_18px_42px_rgba(7,87,166,0.12)]",
        glow: "bg-blue-100/60",
    },

    pink: {
        topBorder:
            "bg-gradient-to-r from-primary to-[#e04d80]",
        iconBox:
            "bg-gradient-to-br from-primary to-darkPrimary",
        iconSoft:
            "bg-primary/10 text-primary",
        code: "text-primary",
        badge:
            "bg-primary/10 text-primary",
        check:
            "bg-primary/10 text-primary",
        hover:
            "hover:border-primary/20 hover:shadow-[0_18px_42px_rgba(192,31,83,0.13)]",
        glow: "bg-primary/10",
    },

    maroon: {
        topBorder:
            "bg-gradient-to-r from-darkPrimary to-[#9d2f59]",
        iconBox:
            "bg-gradient-to-br from-[#9d2f59] to-darkPrimary",
        iconSoft:
            "bg-[#f8edf2] text-darkPrimary",
        code: "text-darkPrimary",
        badge:
            "bg-[#f8edf2] text-darkPrimary",
        check:
            "bg-[#f8edf2] text-darkPrimary",
        hover:
            "hover:border-darkPrimary/20 hover:shadow-[0_18px_42px_rgba(99,26,51,0.13)]",
        glow: "bg-darkPrimary/10",
    },
};

export default function AustraliaMigrationPrograms() {
    return (
        <section
            id="australia-migration-programs"
            aria-labelledby="australia-pathways-heading"
            className="
                relative scroll-mt-24
                overflow-hidden
                bg-gradient-to-b
                from-white
                via-[#fffafb]
                to-[#f4f9ff]
                px-4 py-14
                sm:px-6 sm:py-16
                lg:px-8 lg:py-20
            "
        >
            <SectionBackground />

            <div
                className="
                    relative z-10
                    mx-auto w-full
                    max-w-[1450px]
                "
            >
                <SectionHeader />

                <div
                    className="
                        grid grid-cols-1
                        items-stretch gap-6
                        lg:grid-cols-3
                        lg:gap-5
                        xl:gap-7
                    "
                >
                    {migrationPathways.map(
                        (
                            pathway,
                            pathwayIndex
                        ) => (
                            <PathwayColumn
                                key={pathway.id}
                                pathway={
                                    pathway
                                }
                                pathwayIndex={
                                    pathwayIndex
                                }
                            />
                        )
                    )}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/contact-us"
                        className="
                            group inline-flex
                            min-h-13 items-center
                            justify-center gap-3
                            rounded-2xl
                            bg-gradient-to-r
                            from-darkPrimary
                            to-primary
                            px-7
                            text-sm font-black
                            text-white
                            shadow-[0_16px_38px_rgba(192,31,83,0.25)]
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-[0_22px_48px_rgba(192,31,83,0.34)]
                        "
                    >
                        Get Australia Migration Guidance

                        <ArrowUpRight
                            size={18}
                            aria-hidden="true"
                            className="
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                                group-hover:-translate-y-1
                            "
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}

function SectionHeader() {
    return (
        <header
            className="
                mx-auto mb-12
                max-w-3xl text-center
            "
        >
            <div
                className="
                    mx-auto flex w-fit
                    items-center gap-3
                "
            >
                <span
                    aria-hidden="true"
                    className="
                        grid size-12
                        place-content-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-primary
                        to-darkPrimary
                        text-white
                        shadow-[0_12px_28px_rgba(192,31,83,0.25)]
                    "
                >
                    <Network size={23} />
                </span>

                <h2
                    id="australia-pathways-heading"
                    className="
                        text-3xl font-black
                        tracking-[-0.04em]
                        text-darkPrimary
                        sm:text-4xl
                        lg:text-[44px]
                    "
                >
                    Immigration Pathways
                </h2>
            </div>

            <p
                className="
                    mx-auto mt-4
                    max-w-2xl
                    text-sm leading-7
                    text-slate-600
                    sm:text-base
                "
            >
                Explore skilled, employer-sponsored and
                family migration options for living,
                working and building your future in
                Australia.
            </p>

            <div
                aria-hidden="true"
                className="
                    mt-5 flex
                    items-center justify-center
                    gap-2
                "
            >
                <span className="h-px w-8 bg-primary" />

                <span
                    className="
                        size-2 rounded-full
                        bg-primary
                        ring-4 ring-primary/10
                    "
                />

                <span className="h-px w-8 bg-primary" />
            </div>
        </header>
    );
}

function PathwayColumn({
    pathway,
    pathwayIndex,
}) {
    const styles =
        accentStyles[pathway.accent];

    const HeaderIcon = pathway.icon;

    return (
        <article
            id={pathway.id}
            aria-labelledby={`${pathway.id}-heading`}
            className="
                group/column relative
                flex h-full min-w-0
                flex-col overflow-hidden
                rounded-[28px]
                border border-slate-200/80
                bg-white/90
                p-4
                shadow-[0_16px_45px_rgba(15,23,42,0.07)]
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-[0_26px_65px_rgba(15,23,42,0.12)]
                sm:p-5
                xl:p-6
            "
        >
            <div
                aria-hidden="true"
                className={`
                    absolute inset-x-0
                    top-0 h-1
                    ${styles.topBorder}
                `}
            />

            <div
                aria-hidden="true"
                className={`
                    absolute -right-20
                    -top-20 size-52
                    rounded-full blur-3xl
                    ${styles.glow}
                `}
            />

            <header
                className="
                    relative z-10
                    rounded-[22px]
                    border border-slate-100
                    bg-white
                    p-4
                    shadow-[0_10px_30px_rgba(15,23,42,0.07)]
                    sm:p-5
                "
            >
                <div
                    className="
                        flex items-center gap-4
                    "
                >
                    <span
                        aria-hidden="true"
                        className={`
                            grid size-14
                            shrink-0
                            place-content-center
                            rounded-2xl
                            text-white
                            shadow-[0_12px_28px_rgba(15,23,42,0.16)]
                            ${styles.iconBox}
                        `}
                    >
                        <HeaderIcon
                            size={25}
                            strokeWidth={2}
                        />
                    </span>

                    <div className="min-w-0">
                        <span
                            className={`
                                inline-flex
                                rounded-full
                                px-2.5 py-1
                                text-[9px]
                                font-black uppercase
                                tracking-[0.14em]
                                ${styles.badge}
                            `}
                        >
                            {pathway.pathway}
                        </span>

                        <h3
                            id={`${pathway.id}-heading`}
                            className="
                                mt-2 text-lg
                                font-black
                                leading-6
                                text-darkPrimary
                                sm:text-xl
                            "
                        >
                            {pathway.title}
                        </h3>
                    </div>
                </div>
            </header>

            <p
                className="
                    relative z-10
                    mt-5 min-h-[72px]
                    text-xs leading-6
                    text-slate-600
                    sm:text-sm
                "
            >
                {pathway.description}
            </p>

            <div
                className="
                    relative z-10
                    mt-5 space-y-3
                "
            >
                {pathway.options.map(
                    (
                        option,
                        optionIndex
                    ) => (
                        <PathwayOption
                            key={`${pathway.id}-${option.code}`}
                            option={
                                option
                            }
                            index={
                                optionIndex
                            }
                            styles={
                                styles
                            }
                        />
                    )
                )}
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
                    group-hover/column:w-3/4
                "
            />

            <span className="sr-only">
                Pathway {pathwayIndex + 1}
            </span>
        </article>
    );
}

function PathwayOption({
    option,
    index,
    styles,
}) {
    const Icon = option.icon;

    return (
        <article
            className={`
                group/card relative
                min-w-0 overflow-hidden
                rounded-[20px]
                border border-slate-200/80
                bg-white p-4
                shadow-[0_8px_24px_rgba(15,23,42,0.05)]
                transition-all
                duration-300
                hover:-translate-y-1
                ${styles.hover}
            `}
        >
            <div
                aria-hidden="true"
                className="
                    absolute -right-10
                    -top-10 size-24
                    rounded-full
                    bg-slate-100/60
                    transition-transform
                    duration-500
                    group-hover/card:scale-150
                "
            />

            <div
                className="
                    relative flex
                    min-w-0 items-start gap-3
                "
            >
                <span
                    aria-hidden="true"
                    className={`
                        grid size-11
                        shrink-0
                        place-content-center
                        rounded-xl
                        transition-all
                        duration-300
                        group-hover/card:scale-105
                        ${styles.iconBox}
                        text-white
                        shadow-[0_8px_20px_rgba(15,23,42,0.14)]
                    `}
                >
                    <Icon
                        size={19}
                        strokeWidth={2}
                    />
                </span>

                <div className="min-w-0 flex-1">
                    <div
                        className="
                            flex items-start
                            justify-between gap-3
                        "
                    >
                        <div className="min-w-0">
                            <p
                                className={`
                                    text-xs
                                    font-black
                                    ${styles.code}
                                `}
                            >
                                {option.code}
                            </p>

                            <h4
                                className="
                                    mt-1 text-xs
                                    font-bold
                                    leading-5
                                    text-slate-700
                                "
                            >
                                {option.title}
                            </h4>
                        </div>

                        <span
                            aria-hidden="true"
                            className="
                                grid size-7
                                shrink-0
                                place-content-center
                                rounded-full
                                border border-slate-200
                                bg-slate-50
                                text-slate-400
                                transition-all
                                duration-300
                                group-hover/card:border-primary/20
                                group-hover/card:text-primary
                            "
                        >
                            <ArrowUpRight
                                size={12}
                            />
                        </span>
                    </div>

                    <p
                        className="
                            mt-3 text-[11px]
                            leading-5
                            text-slate-500
                            sm:text-xs
                        "
                    >
                        {option.description}
                    </p>

                    <div
                        className="
                            mt-3 flex
                            items-center gap-2
                        "
                    >
                        <span
                            aria-hidden="true"
                            className={`
                                grid size-4
                                place-content-center
                                rounded-full
                                ${styles.check}
                            `}
                        >
                            <Check size={10} />
                        </span>

                        <span
                            className="
                                text-[9px]
                                font-semibold
                                text-slate-400
                            "
                        >
                            Visa option {index + 1}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}

function SectionBackground() {
    return (
        <div
            aria-hidden="true"
            className="
                pointer-events-none
                absolute inset-0
            "
        >
            <div
                className="
                    absolute inset-0
                    opacity-[0.2]
                    [background-image:linear-gradient(rgba(99,26,51,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(99,26,51,0.055)_1px,transparent_1px)]
                    [background-size:34px_34px]
                    [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]
                "
            />

            <div
                className="
                    absolute -left-28
                    top-20 size-80
                    rounded-full
                    bg-primary/[0.07]
                    blur-3xl
                "
            />

            <div
                className="
                    absolute -right-28
                    bottom-10 size-80
                    rounded-full
                    bg-secondary/[0.07]
                    blur-3xl
                "
            />

            <div
                className="
                    absolute left-1/2
                    top-0 h-44 w-44
                    -translate-x-1/2
                    rounded-full
                    bg-logoYellow/[0.07]
                    blur-3xl
                "
            />
        </div>
    );
}