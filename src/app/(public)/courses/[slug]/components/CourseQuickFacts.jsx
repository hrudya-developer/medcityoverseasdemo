import {
    BarChart3,
    CalendarDays,
    Clock,
    GraduationCap,
    Sparkles,
} from "lucide-react";

const items = [
    {
        key: "duration",
        title: "Duration",
        icon: Clock,
        helper: "Full-time program",
        helperIcon: CalendarDays,
        accent: "pink",
    },
    {
        key: "level",
        title: "Level",
        icon: BarChart3,
        helper: "Globally recognized",
        helperIcon: GraduationCap,
        accent: "blue",
    },
    {
        key: "intakes",
        title: "Intakes",
        icon: CalendarDays,
        helper: "Multiple intakes",
        helperIcon: Sparkles,
        accent: "green",
    },
];

const accentStyles = {
    pink: {
        bar: "from-primary via-[#e43a74] to-[#ff7ca5]",
        iconBg: "bg-primary/10",
        iconText: "text-primary",
        helperBg: "bg-primary/10",
        helperText: "text-primary",
        glow: "bg-primary/20",
    },

    blue: {
        bar: "from-secondary via-[#188ed8] to-[#65bfff]",
        iconBg: "bg-secondary/10",
        iconText: "text-secondary",
        helperBg: "bg-secondary/10",
        helperText: "text-secondary",
        glow: "bg-secondary/20",
    },

    green: {
        bar: "from-emerald-500 via-teal-400 to-cyan-400",
        iconBg: "bg-emerald-500/10",
        iconText: "text-emerald-600",
        helperBg: "bg-emerald-500/10",
        helperText: "text-emerald-600",
        glow: "bg-emerald-400/20",
    },
};

export default function CourseQuickFacts({
    duration,
    level,
    intakes,
    intakesRaw,
}) {
    const values = {
        duration,
        level,
        intakes,
    };

    return (
        <aside
            className="
                grid
                w-full
                gap-4
                lg:w-[440px]
                xl:w-[470px]
            "
        >
            {items.map((item, index) => {
                const Icon = item.icon;
                const HelperIcon = item.helperIcon;
                const styles =
                    accentStyles[item.accent];

                return (
                    <div
                        key={item.key}
                        className={`
                            group
                            relative
                            overflow-hidden
                            rounded-[26px]
                            border
                            border-white/45
                            bg-white/[0.94]
                            shadow-[0_20px_60px_rgba(2,12,27,0.20)]
                            backdrop-blur-2xl
                            transition-all
                            duration-500

                            hover:-translate-y-1
                            hover:shadow-[0_28px_75px_rgba(2,12,27,0.28)]

                            ${
                                index === 1
                                    ? "lg:translate-x-7"
                                    : ""
                            }
                        `}
                    >
                        {/* LEFT BRAND ACCENT */}
                        <div
                            aria-hidden="true"
                            className={`
                                absolute
                                inset-y-0
                                left-0
                                w-[4px]
                                bg-gradient-to-b
                                ${styles.bar}
                            `}
                        />

                        {/* SOFT INTERNAL GLOW */}
                        <div
                            aria-hidden="true"
                            className={`
                                pointer-events-none
                                absolute
                                -right-12
                                -top-16
                                h-36
                                w-36
                                rounded-full
                                blur-3xl
                                ${styles.glow}
                            `}
                        />

                        <div
                            className="
                                relative
                                flex
                                min-h-[118px]
                                items-center
                                gap-4
                                px-5
                                py-5
                                sm:px-6
                            "
                        >
                            {/* MAIN ICON */}
                            <div
                                className={`
                                    grid
                                    h-14
                                    w-14
                                    shrink-0
                                    place-items-center
                                    rounded-[18px]
                                    shadow-sm
                                    transition-transform
                                    duration-500
                                    group-hover:scale-105

                                    ${styles.iconBg}
                                    ${styles.iconText}
                                `}
                            >
                                <Icon
                                    size={23}
                                    strokeWidth={2.1}
                                    aria-hidden="true"
                                />
                            </div>

                            {/* VALUE */}
                            <div
                                className="
                                    min-w-0
                                    flex-1
                                "
                            >
                                <p
                                    className="
                                        text-[10px]
                                        font-black
                                        uppercase
                                        tracking-[0.2em]
                                        text-slate-400
                                    "
                                >
                                    {item.title}
                                </p>

                                <p
                                    className="
                                        mt-1.5
                                        break-words
                                        text-[15px]
                                        font-black
                                        leading-5
                                        text-[#08162f]
                                        sm:text-base
                                    "
                                >
                                    {values[item.key] ||
                                        "Not Available"}
                                </p>

                                {item.key ===
                                    "intakes" &&
                                    intakesRaw &&
                                    intakesRaw !==
                                        intakes && (
                                        <p
                                            title={
                                                intakesRaw
                                            }
                                            className="
                                                mt-1
                                                line-clamp-1
                                                max-w-[190px]
                                                text-xs
                                                font-bold
                                                text-primary
                                            "
                                        >
                                            {
                                                intakesRaw
                                            }
                                        </p>
                                    )}
                            </div>

                            {/* RIGHT SUPPORT INFO */}
                            <div
                                className="
                                    hidden
                                    min-w-[125px]
                                    items-center
                                    gap-3
                                    border-l
                                    border-slate-200
                                    pl-5
                                    sm:flex
                                "
                            >
                                <div
                                    className={`
                                        grid
                                        h-10
                                        w-10
                                        shrink-0
                                        place-items-center
                                        rounded-xl

                                        ${styles.helperBg}
                                        ${styles.helperText}
                                    `}
                                >
                                    <HelperIcon
                                        size={17}
                                        strokeWidth={
                                            2.1
                                        }
                                        aria-hidden="true"
                                    />
                                </div>

                                <div>
                                    <p
                                        className="
                                            max-w-[90px]
                                            text-[11px]
                                            font-extrabold
                                            leading-[1.4]
                                            text-slate-700
                                        "
                                    >
                                        {
                                            item.helper
                                        }
                                    </p>

                                    <p
                                        className="
                                            mt-0.5
                                            text-[10px]
                                            font-semibold
                                            text-slate-400
                                        "
                                    >
                                        {item.key ===
                                        "duration"
                                            ? "On-campus"
                                            : item.key ===
                                                "level"
                                              ? "International"
                                              : "Every year"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </aside>
    );
}