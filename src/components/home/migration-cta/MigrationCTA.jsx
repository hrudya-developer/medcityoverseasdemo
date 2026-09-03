import Image from "next/image";
import Link from "next/link";

import migrateCanada from "@/assets/migrate-canada.png";
import migrateAustralia from "@/assets/migrate-australia.png";

import {
    ArrowRight,
    BriefcaseBusiness,
    Plane,
    ShieldCheck,
    Users,
} from "lucide-react";

/* =========================================================
   MIGRATION DATA
========================================================= */

const migrationOptions = [
    {
        country: "Canada",

        flag: "/assets/canada-flag.png",

        image: migrateCanada,

        href: "/migrate-to-canada",

        accent: "primary",

        button:
            "bg-gradient-to-r from-[#ef3b6a] to-primary hover:from-primary hover:to-[#9f1944]",

        border:
            "border-primary/30 hover:border-primary/60",

        glow:
            "hover:shadow-[0_25px_60px_rgba(192,31,83,0.28)]",

        features: [
            "High quality of life",
            "Career opportunities",
            "Multicultural society",
        ],
    },

    {
        country: "Australia",

        flag: "/assets/australia-flag.png",

        image: migrateAustralia,

        href: "/migrate-to-australia",

        accent: "secondary",

        button:
            "bg-gradient-to-r from-[#1478d4] to-secondary hover:from-secondary hover:to-[#034d86]",

        border:
            "border-secondary/30 hover:border-secondary/60",

        glow:
            "hover:shadow-[0_25px_60px_rgba(4,102,175,0.28)]",

        features: [
            "Strong economy",
            "Excellent lifestyle",
            "Global opportunities",
        ],
    },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function MigrationCTA() {
    return (
        <section
            aria-labelledby="migration-cta-heading"
            className="
                relative
                overflow-hidden
                bg-white
                px-4
                py-10
                sm:px-6
                sm:py-12
                lg:px-8
                lg:py-16
            "
        >
            {/* =================================================
                OUTER BACKGROUND GLOWS
            ================================================= */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    top-10
                    h-[350px]
                    w-[350px]
                    rounded-full
                    bg-primary/10
                    blur-[110px]
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    bottom-0
                    h-[350px]
                    w-[350px]
                    rounded-full
                    bg-secondary/10
                    blur-[110px]
                "
            />

            {/* =================================================
                MAIN BANNER
            ================================================= */}

            <div
                className="
                    relative
                    mx-auto
                    w-full
                    max-w-[1600px]
                    overflow-hidden
                    rounded-[40px] shadow-sm
                    bg-gradient-to-br
                    from-[#3d0828]
                    via-[#210c35]
                    to-primary
                    shadow-[0_28px_80px_rgba(31,14,40,0.18)]
                " data-aos="fade-up"
            >
                {/* Pink glow */}
                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        -bottom-48
                        -left-36
                        h-[450px]
                        w-[560px]
                        rounded-full
                        bg-primary/35
                        blur-[110px]
                    "
                />

                {/* Blue glow */}
                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        -right-48
                        -top-52
                        h-[520px]
                        w-[560px]
                        rounded-full
                        bg-secondary/25
                        blur-[125px]
                    "
                />

                {/* =================================================
                    DOT BACKGROUND
                ================================================= */}

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        left-[25%]
                        top-8
                        hidden
                        h-[300px]
                        w-[480px]
                        opacity-[0.08]
                        lg:block
                    "
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, white 1.25px, transparent 1.25px)",

                        backgroundSize:
                            "11px 11px",

                        maskImage:
                            "radial-gradient(ellipse at center, black 10%, transparent 72%)",

                        WebkitMaskImage:
                            "radial-gradient(ellipse at center, black 10%, transparent 72%)",
                    }}
                />

                {/* =================================================
                    BOTTOM PINK CURVE
                ================================================= */}

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        -bottom-32
                        -left-28
                        h-44
                        w-[60%]
                        rotate-[-4deg]
                        rounded-[50%]
                        border-t-[5px]
                        border-primary/80
                    "
                />

                {/* =================================================
                    CONTENT GRID
                ================================================= */}

                <div
                    className="
                        relative
                        z-10
                        grid
                        gap-10
                        px-6
                        py-9
                        sm:px-8
                        sm:py-10
                        lg:grid-cols-[0.95fr_1.25fr]
                        lg:items-center
                        lg:gap-12
                        lg:px-12
                        lg:py-12
                        xl:px-16
                        xl:py-14
                    "
                >
                    {/* =================================================
                        LEFT CONTENT
                    ================================================= */}

                    <div>
                        {/* Label */}

                        <div
                            className="
                                mb-6
                                flex
                                items-center
                                gap-4
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-primary/40
                                    bg-primary/15
                                    text-[#ff4f82]
                                    backdrop-blur
                                "
                            >
                                <Plane
                                    size={19}
                                    strokeWidth={2}
                                />
                            </div>

                            <div>
                                <p
                                    className="
                                        text-xs
                                        font-black
                                        uppercase
                                        tracking-[0.22em]
                                        text-logoYellow
                                        sm:text-sm
                                    "
                                >
                                    Migration Opportunities
                                </p>

                                <span
                                    className="
                                        mt-3
                                        block
                                        h-[2px]
                                        w-20
                                        bg-gradient-to-r
                                        from-logoYellow
                                        to-transparent
                                    "
                                />
                            </div>
                        </div>

                        {/* Heading */}

                        <h2
                            id="migration-cta-heading"
                            className="
                                max-w-[620px]
                                text-3xl
                                font-extrabold
                                leading-[1.08]
                                tracking-[-0.04em]
                                text-white
                                sm:text-4xl
                                md:text-5xl
                            "
                        >
                            Planning to
                            <br />

                            migrate{" "}

                            <span
                                className="
                                    bg-gradient-to-r
                                    from-[#ff4778]
                                    via-[#ff5784]
                                    to-[#ff7899]
                                    bg-clip-text
                                    text-transparent
                                "
                            >
                                abroad?
                            </span>
                        </h2>

                        {/* Description */}

                        <p
                            className="
                                mt-6
                                max-w-[560px]
                                text-base
                                leading-7
                                text-white/65
                                sm:text-lg
                            "
                        >
                            Explore migration opportunities for
                            Canada and Australia and take the next
                            step toward building your future
                            overseas.
                        </p>

                        {/* =================================================
                            FLIGHT PATH
                        ================================================= */}

                        <div
                            aria-hidden="true"
                            className="
                                relative
                                mt-5
                                hidden
                                h-16
                                max-w-[490px]
                                sm:block
                            "
                        >
                            <svg
                                viewBox="0 0 500 90"
                                fill="none"
                                className="
                                    absolute
                                    inset-0
                                    h-full
                                    w-full
                                "
                            >
                                <path
                                    d="M0 35C110 85 230 85 365 30"
                                    stroke="rgba(255,255,255,0.25)"
                                    strokeWidth="2"
                                    strokeDasharray="8 9"
                                />
                            </svg>

                            <Plane
                                size={30}
                                fill="currentColor"
                                className="
                                    absolute
                                    right-[20%]
                                    top-1
                                    rotate-[-18deg]
                                    text-primary
                                "
                            />
                        </div>

                        {/* =================================================
                            BENEFITS
                        ================================================= */}

                        <div
                            className="
                                mt-7
                                grid
                                max-w-[620px]
                                grid-cols-1
                                gap-4
                                sm:grid-cols-3
                            "
                        >
                            <Benefit
                                icon={
                                    <ShieldCheck
                                        size={20}
                                    />
                                }
                                title="Secure"
                                text="your future"
                            />

                            <Benefit
                                icon={
                                    <BriefcaseBusiness
                                        size={20}
                                    />
                                }
                                title="Better"
                                text="opportunities"
                            />

                            <Benefit
                                icon={
                                    <Users
                                        size={20}
                                    />
                                }
                                title="Stable"
                                text="lifestyle"
                            />
                        </div>
                    </div>

                    {/* =================================================
                        MIGRATION CARDS
                    ================================================= */}

                    <div
                        className="
                            grid
                            gap-5
                            sm:grid-cols-2
                            lg:gap-6
                        "
                    >
                        {migrationOptions.map(
                            (option) => (
                                <MigrationCard
                                    key={option.country}
                                    option={option}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* =========================================================
   MIGRATION CARD
========================================================= */

function MigrationCard({ option }) {
    const isCanada =
        option.accent === "primary";

    return (
        <Link
            href={option.href}
            aria-label={`Explore migration opportunities to ${option.country}`}
            className={`
                group
                relative
                block
                overflow-hidden
                rounded-[26px]
                border
                ${option.border}
                bg-white
                shadow-[0_20px_45px_rgba(0,0,0,0.16)]
                transition-all
                duration-500
                hover:-translate-y-2
                ${option.glow}
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
                focus-visible:ring-offset-4
                focus-visible:ring-offset-[#200b32]
            `}
        >
            {/* =================================================
                IMAGE
            ================================================= */}

            <div
                className="
                    relative
                    h-[210px]
                    overflow-hidden
                    sm:h-[225px]
                    lg:h-[240px]
                    xl:h-[250px]
                "
            >
                <Image
                    src={option.image}
                    alt={`${option.country} migration`}
                    fill
                    priority={false}
                    sizes="
                        (max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        390px
                    "
                    className="
                        object-cover
                        object-center
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                    "
                />

                {/* Image overlay */}

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/65
                        via-black/5
                        to-black/5
                    "
                />

                {/* =================================================
                    FLAG
                ================================================= */}

                <div
                    className="
                        absolute
                        left-5
                        top-5
                        z-20
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-full
                        border-[3px]
                        border-white
                        bg-white
                        shadow-[0_12px_28px_rgba(0,0,0,0.28)]
                    "
                >
                    <Image
                        src={option.flag}
                        alt={`${option.country} flag`}
                        width={64}
                        height={64}
                        sizes="64px"
                        className="
                            h-full
                            w-full
                            object-cover
                        "
                    />
                </div>

                {/* =================================================
                    EXPLORE LABEL
                ================================================= */}

                <span
                    className={`
                        absolute
                        bottom-5
                        left-5
                        z-20
                        rounded-full
                        border
                        border-white/20
                        px-4
                        py-1.5
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-[0.12em]
                        text-white
                        shadow-sm
                        backdrop-blur-md
                        ${
                            isCanada
                                ? "bg-primary/90"
                                : "bg-secondary/90"
                        }
                    `}
                >
                    Explore
                </span>
            </div>

            {/* =================================================
                CARD BODY
            ================================================= */}

            <div
                className="
                    bg-white
                    px-5
                    pb-5
                    pt-5
                    sm:px-6
                    sm:pb-6
                "
            >
                <h3
                    className="
                        text-xl
                        font-black
                        tracking-[-0.03em]
                        text-slate-900
                        sm:text-2xl
                    "
                >
                    Migrate to{" "}

                    <span
                        className={
                            isCanada
                                ? "text-primary"
                                : "text-secondary"
                        }
                    >
                        {option.country}
                    </span>
                </h3>

                {/* =================================================
                    FEATURES
                ================================================= */}

                <div
                    className="
                        mt-5
                        space-y-3
                    "
                >
                    {option.features?.map(
                        (feature) => (
                            <div
                                key={feature}
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    text-sm
                                    font-medium
                                    text-slate-600
                                "
                            >
                                <span
                                    className={`
                                        flex
                                        h-7
                                        w-7
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        ${
                                            isCanada
                                                ? "bg-primary/10 text-primary"
                                                : "bg-secondary/10 text-secondary"
                                        }
                                    `}
                                >
                                    <ShieldCheck
                                        size={14}
                                        strokeWidth={2.2}
                                    />
                                </span>

                                <span>
                                    {feature}
                                </span>
                            </div>
                        )
                    )}
                </div>

                {/* =================================================
                    BUTTON
                ================================================= */}

                <div
                    className={`
                        mt-6
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        ${option.button}
                        px-5
                        py-3
                        text-sm
                        font-bold
                        text-white
                        shadow-lg
                        transition-all
                        duration-300
                    `}
                >
                    <span>
                        Explore {option.country}
                    </span>

                    <span
                        className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            text-slate-900
                            shadow-sm
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                        "
                    >
                        <ArrowRight
                            size={18}
                            strokeWidth={2.3}
                        />
                    </span>
                </div>
            </div>
        </Link>
    );
}

/* =========================================================
   BENEFIT
========================================================= */

function Benefit({
    icon,
    title,
    text,
}) {
    return (
        <div
            className="
                flex
                items-center
                gap-3
                border-white/10
                sm:border-r
                sm:pr-4
                sm:last:border-r-0
            "
        >
            <div
                className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-primary/45
                    to-primary/15
                    text-white
                    ring-1
                    ring-white/10
                    shadow-[0_8px_20px_rgba(192,31,83,0.15)]
                "
            >
                {icon}
            </div>

            <div>
                <p
                    className="
                        text-sm
                        font-bold
                        text-white
                    "
                >
                    {title}
                </p>

                <p
                    className="
                        mt-0.5
                        text-xs
                        text-white/55
                    "
                >
                    {text}
                </p>
            </div>
        </div>
    );
}