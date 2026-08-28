import {
    BookOpen,
    Building2,
    Globe2,
    GraduationCap,
} from "lucide-react";

const overviewItems = [
    {
        key: "universities",
        label: "Universities",
        icon: Building2,
    },
    {
        key: "courses",
        label: "Courses",
        icon: BookOpen,
    },
    {
        key: "students",
        label: "International Students",
        icon: GraduationCap,
    },
    {
        key: "language",
        label: "Primary Language",
        icon: Globe2,
    },
];

const getValue = (country, key) => {
    const values = {
        universities:
            country?.university_count ??
            country?.universities_count ??
            country?.total_universities,

        courses:
            country?.course_count ??
            country?.courses_count ??
            country?.total_courses,

        students:
            country?.international_students ??
            country?.student_count,

        language:
            country?.language ??
            country?.primary_language,
    };

    const value = values[key];

    if (
        typeof value === "string" ||
        typeof value === "number"
    ) {
        return String(value);
    }

    return "Available";
};

export default function DestinationOverview({
    country,
}) {
    return (
        <section
            id="destination-overview"
            aria-labelledby="destination-overview-heading"
            className="scroll-mt-24 bg-white py-12 sm:py-14"
        >
            <div
                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
            >
                <header className="mx-auto max-w-3xl text-center">
                    <p
                        className="text-xs font-black uppercase tracking-[0.16em] text-primary"
                    >
                        Destination Overview
                    </p>

                    <h2
                        id="destination-overview-heading"
                        className="mt-3 text-3xl font-black text-darkPrimary sm:text-4xl"
                    >
                        Everything You Need to Know
                    </h2>
                </header>

                <div
                    className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {overviewItems.map(
                        ({
                            key,
                            label,
                            icon: Icon,
                        }) => (
                            <article
                                key={key}
                                className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 text-center transition-all hover:-translate-y-1 hover:border-primary/20 hover:bg-white hover:shadow-lg"
                            >
                                <span
                                    className="mx-auto grid size-12 place-content-center rounded-2xl bg-primary/10 text-primary"
                                >
                                    <Icon size={22} />
                                </span>

                                <p
                                    className="mt-4 text-xl font-black text-darkPrimary"
                                >
                                    {getValue(
                                        country,
                                        key
                                    )}
                                </p>

                                <p
                                    className="mt-1 text-xs font-bold text-slate-500"
                                >
                                    {label}
                                </p>
                            </article>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}