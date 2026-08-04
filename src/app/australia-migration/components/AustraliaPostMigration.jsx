import Image from "next/image";
import Link from "next/link";

import {
    ArrowUpRight,
    BriefcaseBusiness,
    Compass,
    Globe2,
    Handshake,
    Heart,
    Languages,
} from "lucide-react";

const supportItems = [
    {
        icon: Compass,
        title: "Orientation Programs",
        description:
            "Assistance with understanding Australian culture, communities and essential systems.",
    },
    {
        icon: BriefcaseBusiness,
        title: "Employment Services",
        description:
            "Guidance with job searching, career preparation and professional development.",
    },
    {
        icon: Languages,
        title: "Language Support",
        description:
            "English-language support to improve communication and workplace confidence.",
    },
];

export default function AustraliaPostMigration() {
    return (
        <section
            id="post-migration-support"
            aria-labelledby="post-migration-support-heading"
            className="
                relative scroll-mt-24
                overflow-hidden bg-white
                py-10
                sm:py-12
                lg:py-16
            "
        >
            <BackgroundDecorations />

            <div
                className="
                    relative z-10
                    mx-auto grid w-full
                    max-w-[1500px]
                    grid-cols-1 gap-6
                    px-4
                    sm:px-6
                    lg:grid-cols-[1.45fr_0.95fr]
                    lg:items-stretch
                    lg:gap-7
                    lg:px-8
                "
            >
                <SupportCard />

                <QuoteCard />
            </div>

            <ContactBar />
        </section>
    );
}

function SupportCard() {
    return (
        <article
            className="
                group relative
                isolate overflow-hidden
                rounded-[28px]
                border border-slate-200/80
                bg-white
                shadow-[0_18px_55px_rgba(15,23,42,0.1)]
                transition-all duration-500
                hover:-translate-y-1
                hover:shadow-[0_28px_70px_rgba(15,23,42,0.14)]
            "
        >
            <div
                className="
                    grid min-h-full
                    grid-cols-1
                    lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)]
                "
            >
                <div className="relative z-10 flex flex-col">
                    <header
                        className="
                            relative overflow-hidden
                            bg-gradient-to-r
                            from-[#0466AF]
                            via-[#0759A1]
                            to-[#0D3D88]
                            px-5 py-4
                            text-white
                            sm:px-7
                            sm:py-5
                        "
                    >
                        <div
                            aria-hidden="true"
                            className="
                                absolute -right-16
                                -top-16 size-40
                                rounded-full
                                bg-white/10
                                blur-2xl
                            "
                        />

                        <div className="relative flex items-center gap-3">
                            <span
                                aria-hidden="true"
                                className="
                                    grid size-11
                                    shrink-0
                                    place-content-center
                                    rounded-xl
                                    bg-white/15
                                    backdrop-blur-sm
                                    sm:size-12
                                "
                            >
                                <Handshake
                                    size={22}
                                    strokeWidth={2}
                                />
                            </span>

                            <div>
                                <p
                                    className="
                                        text-[10px]
                                        font-black uppercase
                                        tracking-[0.15em]
                                        text-white/70
                                    "
                                >
                                    Settlement Assistance
                                </p>

                                <h2
                                    id="post-migration-support-heading"
                                    className="
                                        mt-1 text-lg
                                        font-black
                                        leading-tight
                                        sm:text-xl
                                    "
                                >
                                    Post-Migration Support
                                </h2>
                            </div>
                        </div>
                    </header>

                    <div
                        className="
                            flex flex-1 flex-col
                            justify-center gap-3
                            px-5 py-6
                            sm:px-7
                            sm:py-7
                            lg:pr-5
                        "
                    >
                        {supportItems.map(
                            ({
                                icon: Icon,
                                title,
                                description,
                            }) => (
                                <article
                                    key={title}
                                    className="
                                        group/item
                                        relative flex
                                        min-w-0 items-start
                                        gap-4 overflow-hidden
                                        rounded-2xl
                                        border border-transparent
                                        p-3
                                        transition-all
                                        duration-300
                                        hover:-translate-y-0.5
                                        hover:border-blue-100
                                        hover:bg-blue-50/70
                                        hover:shadow-[0_12px_28px_rgba(4,102,175,0.08)]
                                    "
                                >
                                    <div
                                        aria-hidden="true"
                                        className="
                                            absolute -right-8
                                            -top-8 size-20
                                            rounded-full
                                            bg-blue-100/40
                                            opacity-0
                                            transition-all
                                            duration-300
                                            group-hover/item:opacity-100
                                        "
                                    />

                                    <span
                                        aria-hidden="true"
                                        className="
                                            relative grid
                                            size-11 shrink-0
                                            place-content-center
                                            rounded-full
                                            bg-gradient-to-br
                                            from-[#0466AF]
                                            to-[#0A3E87]
                                            text-white
                                            shadow-[0_8px_20px_rgba(4,102,175,0.22)]
                                            transition-transform
                                            duration-300
                                            group-hover/item:scale-105
                                        "
                                    >
                                        <Icon
                                            size={19}
                                            strokeWidth={2}
                                        />
                                    </span>

                                    <div className="relative min-w-0 flex-1">
                                        <h3
                                            className="
                                                text-sm font-black
                                                text-slate-900
                                                sm:text-[15px]
                                            "
                                        >
                                            {title}
                                        </h3>

                                        <p
                                            className="
                                                mt-1 text-sm
                                                leading-6
                                                text-slate-600
                                            "
                                        >
                                            {description}
                                        </p>
                                    </div>
                                </article>
                            )
                        )}
                    </div>
                </div>

                <div
                    className="
                        relative min-h-[250px]
                        overflow-hidden
                        sm:min-h-[310px]
                        lg:min-h-full
                    "
                >
                    <Image
                        src="/assets/migrate-australia.png"
                        alt="Sydney Opera House representing life in Australia"
                        fill
                        sizes="
                            (max-width: 1024px) 100vw,
                            38vw
                        "
                        className="
                            object-cover object-center
                            transition-transform
                            duration-700
                            group-hover:scale-105
                        "
                    />

                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute inset-0
                            bg-gradient-to-t
                            from-[#04172e]/35
                            via-transparent
                            to-transparent
                            lg:bg-gradient-to-r
                            lg:from-white/25
                            lg:via-transparent
                            lg:to-transparent
                        "
                    />

                    <div
                        className="
                            absolute bottom-5 left-5
                            rounded-2xl
                            border border-white/30
                            bg-slate-950/45
                            px-4 py-3
                            text-white
                            shadow-xl
                            backdrop-blur-xl
                        "
                    >
                        <p
                            className="
                                text-[10px]
                                font-black uppercase
                                tracking-[0.14em]
                                text-white/70
                            "
                        >
                            Your New Beginning
                        </p>

                        <p className="mt-1 text-sm font-bold">
                            Settle with confidence
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
}

function QuoteCard() {
    return (
        <aside
            aria-label="Australia migration message"
            className="
                group relative
                isolate flex min-h-[300px]
                flex-col justify-between
                overflow-hidden
                rounded-[28px]
                border border-dashed
                border-primary/35
                bg-gradient-to-br
                from-white
                via-white
                to-rose-50
                p-6
                shadow-[0_18px_55px_rgba(15,23,42,0.08)]
                transition-all duration-500
                hover:-translate-y-1
                hover:border-primary/50
                hover:shadow-[0_28px_70px_rgba(192,31,83,0.12)]
                sm:p-8
                lg:min-h-full
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute -bottom-12
                    -right-8
                    text-primary/[0.08]
                    transition-transform
                    duration-700
                    group-hover:scale-110
                "
            >
                <Globe2 className="size-56 sm:size-64" />
            </div>

            <div
                aria-hidden="true"
                className="
                    absolute right-8 top-8
                    size-20 rounded-full
                    border-[14px]
                    border-primary/[0.06]
                "
            />

            <div className="relative z-10">
                <span
                    aria-hidden="true"
                    className="
                        block font-serif
                        text-6xl font-black
                        leading-none
                        text-primary
                        sm:text-7xl
                    "
                >
                    “
                </span>

                <blockquote
                    className="
                        -mt-2 max-w-xl
                        text-xl font-black
                        leading-snug
                        tracking-[-0.025em]
                        text-slate-900
                        sm:text-2xl
                        lg:text-[clamp(1.25rem,1.7vw,1.75rem)]
                    "
                >
                    Australia isn&apos;t just a destination;
                    it&apos;s a place to build a better future
                    for you and your loved ones.
                </blockquote>

                <span
                    aria-hidden="true"
                    className="
                        mt-6 block h-[3px]
                        w-16 rounded-full
                        bg-logoYellow
                        sm:w-20
                    "
                />
            </div>

            <div
                className="
                    relative z-10 mt-8
                    flex items-center gap-3
                    border-t border-primary/15
                    pt-5
                "
            >
                <span
                    aria-hidden="true"
                    className="
                        grid size-9
                        place-content-center
                        rounded-xl
                        bg-primary/10
                        text-primary
                    "
                >
                    <Heart
                        size={17}
                        fill="currentColor"
                    />
                </span>

                <p
                    className="
                        text-sm font-bold
                        text-slate-800
                        sm:text-base
                    "
                >
                    A new beginning awaits!
                </p>
            </div>
        </aside>
    );
}

function ContactBar() {
    return (
        <div
            className="
                relative z-10
                mx-auto mt-7
                w-full max-w-[1500px]
                px-4
                sm:px-6
                lg:px-8
            "
        >
            <div
                className="
                    relative overflow-hidden
                    rounded-[24px]
                    bg-gradient-to-r
                    from-darkPrimary
                    via-primary
                    to-[#d91658]
                    px-5 py-5
                    text-white
                    shadow-[0_18px_45px_rgba(192,31,83,0.24)]
                    sm:px-7
                "
            >
                <div
                    aria-hidden="true"
                    className="
                        absolute inset-0
                        opacity-[0.08]
                        [background-image:radial-gradient(#ffffff_1px,transparent_1px)]
                        [background-size:18px_18px]
                    "
                />

                <div
                    className="
                        relative flex
                        flex-col gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >
                    <div className="flex items-start gap-4">
                        <span
                            aria-hidden="true"
                            className="
                                grid size-12
                                shrink-0
                                place-content-center
                                rounded-full
                                border-2 border-white
                                bg-white/10
                                shadow-[0_8px_20px_rgba(99,26,51,0.25)]
                            "
                        >
                            <Globe2 size={23} />
                        </span>

                        <div>
                            <h2
                                className="
                                    text-base font-black
                                    sm:text-lg
                                "
                            >
                                Need help settling in Australia?
                            </h2>

                            <p
                                className="
                                    mt-1 max-w-3xl
                                    text-sm leading-6
                                    text-white/80
                                "
                            >
                                Contact Medcity Study Abroad
                                for personalised guidance on
                                migration and post-arrival
                                support.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/contact-us"
                        className="
                            group inline-flex
                            min-h-12 shrink-0
                            items-center
                            justify-center gap-2
                            rounded-2xl
                            bg-white px-5
                            text-sm font-black
                            text-darkPrimary
                            shadow-lg
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:bg-logoYellow
                        "
                    >
                        Contact Us

                        <ArrowUpRight
                            size={17}
                            aria-hidden="true"
                            className="
                                transition-transform
                                group-hover:translate-x-1
                                group-hover:-translate-y-1
                            "
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

function BackgroundDecorations() {
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
                    opacity-[0.15]
                    [background-image:linear-gradient(rgba(99,26,51,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,26,51,0.05)_1px,transparent_1px)]
                    [background-size:34px_34px]
                    [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]
                "
            />

            <div
                className="
                    absolute -left-28
                    top-10 size-72
                    rounded-full
                    bg-secondary/[0.06]
                    blur-3xl
                "
            />

            <div
                className="
                    absolute -right-28
                    bottom-10 size-72
                    rounded-full
                    bg-primary/[0.06]
                    blur-3xl
                "
            />
        </div>
    );
}