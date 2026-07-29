import {
    BarChart3,
    CalendarDays,
    Clock,
} from "lucide-react";

const items = [
    {
        key: "duration",
        title: "Duration",
        icon: Clock,
    },
    {
        key: "level",
        title: "Level",
        icon: BarChart3,
    },
    {
        key: "intakes",
        title: "Intakes",
        icon: CalendarDays,
    },
];

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
        <section
            className="
                relative mx-5
                -mt-10
                rounded-2xl
                border border-slate-100
                bg-white
                shadow-xl
                lg:mx-auto
                lg:max-w-6xl
            "
        >
            <div
                className="
                    grid grid-cols-1
                    divide-y divide-slate-200
                    md:grid-cols-3
                    md:divide-x
                    md:divide-y-0
                "
            >
                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.key}
                            className="
                                flex items-center
                                gap-5 p-6
                            "
                        >
                            <div
                                className="
                                    grid size-12
                                    shrink-0
                                    place-content-center
                                    rounded-full
                                    bg-primary
                                    text-white
                                "
                            >
                                <Icon />
                            </div>

                            <div className="min-w-0">
                                <p
                                    className="
                                        text-sm font-semibold
                                        uppercase
                                        text-slate-600
                                    "
                                >
                                    {item.title}
                                </p>

                                <p
                                    className="
                                        mt-1 break-words
                                        text-sm font-bold
                                        text-slate-950
                                    "
                                >
                                    {values[item.key]}
                                </p>

                                {item.key === "intakes" &&
                                    intakes !==
                                    intakesRaw &&
                                    intakesRaw && (
                                        <p className="mt-1 text-sm text-primary">
                                            {intakesRaw}
                                        </p>
                                    )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}