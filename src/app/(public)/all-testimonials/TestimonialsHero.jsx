import Link from "next/link";

import {
    ArrowRight,
    Quote,
    Sparkles,
    Star,
} from "lucide-react";

export default function TestimonialsHero({
    testimonialCount = 0,
}) {
    return (
        <section
            aria-labelledby="testimonials-heading"
            className="
                relative
                isolate
                overflow-hidden
                bg-[#fffafc]
            "
        >
            {/* =====================================================
                TOP BRAND STRIP
            ===================================================== */}

            <div
                aria-hidden="true"
                className="
                    absolute
                    inset-x-0
                    top-0
                    h-1.5
                    bg-gradient-to-r
                    from-darkPrimary
                    via-primary
                    to-secondary
                "
            />

            {/* =====================================================
                BACKGROUND DECORATION
            ===================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-10
                    -z-10
                    h-[420px]
                    w-[820px]
                    -translate-x-1/2
                    rounded-[50%]
                    bg-primary/[0.05]
                    blur-[110px]
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-20
                    bottom-0
                    -z-10
                    size-52
                    rounded-full
                    bg-secondary/[0.07]
                    blur-3xl
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-20
                    top-20
                    -z-10
                    size-48
                    rounded-full
                    bg-logoYellow/20
                    blur-3xl
                "
            />

            {/* =====================================================
                MAIN HERO
            ===================================================== */}

            <div
                className="
                    mx-auto
                    max-w-[1500px]
                    px-4
                    pb-12
                    pt-14

                    sm:px-6
                    sm:pb-14
                    sm:pt-16

                    lg:px-8
                    lg:pb-16
                    lg:pt-20
                "
            >
                {/* BREADCRUMB */}

                <nav
                    aria-label="Breadcrumb"
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        text-xs
                        font-bold
                        text-slate-500

                        sm:text-sm
                    "
                >
                    <Link
                        href="/"
                        className="
                            transition-colors
                            hover:text-primary
                        "
                    >
                        Home
                    </Link>

                    <span
                        aria-hidden="true"
                        className="text-slate-300"
                    >
                        /
                    </span>

                    <span
                        aria-current="page"
                        className="text-primary"
                    >
                        Student Testimonials
                    </span>
                </nav>

                {/* =================================================
                    CENTER CONTENT
                ================================================= */}

                <div
                    className="
                        mx-auto
                        mt-7
                        max-w-4xl
                        text-center
                    "
                >
                    <div
                        className="
                            mx-auto
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-primary/15
                            bg-white
                            px-3
                            py-1.5
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.14em]
                            text-primary
                            shadow-sm

                            sm:px-4
                            sm:py-2
                            sm:text-xs
                        "
                    >
                        <Sparkles
                            className="size-3.5"
                            aria-hidden="true"
                        />

                        Real Student Voices
                    </div>

                    <h1
                        id="testimonials-heading"
                        className="
                            mt-5
                            font-nunito
                            text-3xl
                            font-extrabold
                            leading-[1.05]
                            tracking-[-0.04em]
                            text-darkPrimary

                            sm:text-4xl

                            md:text-4xl

                            lg:text-5xl

                        "
                    >
                        Stories That Inspire
                        {" "}
                        <span className="text-primary">
                            Study Abroad Journeys
                        </span>
                    </h1>

                    <p
                        className="
                            mx-auto
                            mt-5
                            max-w-3xl
                            text-[15px]
                            leading-7
                            text-slate-600

                            sm:text-base
                            sm:leading-8

                            lg:text-[17px]
                        "
                    >
                        Read genuine student testimonials and
                        success stories from students supported
                        by Medcity Overseas through admissions,
                        course selection, visa guidance and
                        overseas education support.
                    </p>

                    <div
                        className="
                            mt-7
                            flex
                            flex-col
                            items-center
                            justify-center
                            gap-3

                            min-[420px]:flex-row
                        "
                    >
                        <a
                            href="#student-stories"
                            className="
                                group
                                inline-flex
                                min-h-[48px]
                                items-center
                                justify-center
                                gap-2
                                rounded-2xl
                                bg-primary
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                shadow-[0_12px_30px_rgba(192,31,83,0.20)]
                                transition-all
                                duration-300

                                hover:-translate-y-0.5
                                hover:bg-darkPrimary

                                sm:px-6
                                sm:text-[15px]
                            "
                        >
                            Explore Student Stories

                            <ArrowRight
                                className="
                                    size-4
                                    transition-transform
                                    group-hover:translate-x-1
                                "
                                aria-hidden="true"
                            />
                        </a>

                        <Link
                            href="/contact-us"
                            className="
                                inline-flex
                                min-h-[48px]
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-darkPrimary
                                shadow-sm
                                transition-all
                                duration-300

                                hover:border-primary/20
                                hover:text-primary

                                sm:px-6
                                sm:text-[15px]
                            "
                        >
                            Start Your Journey
                        </Link>
                    </div>
                </div>

                {/* =================================================
                    STORY COLLAGE
                ================================================= */}

                <div
                    className="
                        relative
                        mx-auto
                        mt-12
                        max-w-6xl

                        sm:mt-14

                        lg:mt-16
                    "
                >
                    {/* LARGE QUOTE MARK */}

                    <Quote
                        aria-hidden="true"
                        className="
                            absolute
                            -left-2
                            -top-8
                            -z-10
                            size-24
                            text-primary/[0.08]

                            sm:size-32

                            lg:-left-10
                            lg:size-40
                        "
                    />

                    <div
                        className="
                            grid
                            gap-4

                            md:grid-cols-3
                            md:items-end

                            lg:gap-5
                        "
                    >
                        {/* LEFT STORY */}

                        <StoryCard
                            text="The guidance helped me understand the admission process clearly and choose the right path for my studies."
                            label="Student Experience"
                            className="
                                md:translate-y-6
                            "
                        />

                        {/* CENTER FEATURE */}

                        <div
                            className="
                                relative
                                overflow-hidden
                                rounded-[28px]
                                bg-darkPrimary
                                p-6
                                text-white
                                shadow-[0_22px_60px_rgba(99,26,51,0.22)]

                                sm:p-7

                                lg:rounded-[32px]
                                lg:p-8
                            "
                        >
                            <div
                                aria-hidden="true"
                                className="
                                    absolute
                                    -right-10
                                    -top-10
                                    size-28
                                    rounded-full
                                    bg-logoYellow/10
                                    blur-2xl
                                "
                            />

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                "
                            >
                                <div
                                    className="
                                        grid
                                        size-11
                                        place-items-center
                                        rounded-xl
                                        bg-logoYellow
                                        text-darkPrimary
                                    "
                                >
                                    <Quote
                                        className="size-5"
                                        aria-hidden="true"
                                    />
                                </div>

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-1
                                    "
                                    aria-label="Student success stories"
                                >
                                    {Array.from({
                                        length: 5,
                                    }).map(
                                        (_, index) => (
                                            <Star
                                                key={index}
                                                className="
                                                    size-4
                                                    fill-logoYellow
                                                    text-logoYellow
                                                "
                                                aria-hidden="true"
                                            />
                                        )
                                    )}
                                </div>
                            </div>

                            <p
                                className="
                                    mt-6
                                    font-nunito
                                    text-lg
                                    font-bold
                                    leading-8

                                    sm:text-2xl
                                "
                            >
                                Every student journey is
                                different. Every success story
                                can inspire the next one.
                            </p>

                            <div
                                className="
                                    mt-6
                                    flex
                                    items-end
                                    justify-between
                                    gap-4
                                "
                            >
                                <div>
                                    <p
                                        className="
                                            text-xs
                                            font-black
                                            uppercase
                                            tracking-[0.14em]
                                            text-logoYellow
                                        "
                                    >
                                        Medcity Overseas
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            text-white/70
                                        "
                                    >
                                        Student success stories
                                    </p>
                                </div>

                                {testimonialCount > 0 && (
                                    <div className="text-right">
                                        <p
                                            className="
                                                text-3xl
                                                font-black
                                                text-logoYellow
                                            "
                                        >
                                            {testimonialCount}+
                                        </p>

                                        <p
                                            className="
                                                text-[11px]
                                                font-bold
                                                text-white/60
                                            "
                                        >
                                            Stories
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT STORY */}

                        <StoryCard
                            text="From course selection to visa support, the process felt more manageable with proper guidance throughout."
                            label="Study Abroad Journey"
                            className="
                                md:translate-y-6
                            "
                        />
                    </div>
                </div>
            </div>

           
        </section>
    );
}

function StoryCard({
    text,
    label,
    className = "",
}) {
    return (
        <article
            className={`
                rounded-[24px]
                border
                border-slate-200/80
                bg-white
                p-5
                shadow-[0_14px_40px_rgba(15,23,42,0.07)]

                sm:p-6

                ${className}
            `}
        >
            <Quote
                className="
                    size-7
                    text-primary
                "
                aria-hidden="true"
            />

            <p
                className="
                    mt-4
                    text-sm
                    font-semibold
                    leading-7
                    text-slate-700

                    sm:text-[15px]
                "
            >
                {text}
            </p>

            <div
                className="
                    mt-5
                    h-px
                    bg-slate-100
                "
            />

            <p
                className="
                    mt-4
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.13em]
                    text-secondary

                    sm:text-[11px]
                "
            >
                {label}
            </p>
        </article>
    );
}