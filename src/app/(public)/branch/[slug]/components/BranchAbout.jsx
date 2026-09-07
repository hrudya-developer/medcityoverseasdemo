import {
    CheckCircle2,
    Globe2,
    GraduationCap,
    Plane,
    ShieldCheck,
} from "lucide-react";

const points = [
    {
        icon: GraduationCap,
        title: "University Admissions",
        text:
            "Support for selecting suitable universities, courses and intakes.",
    },
    {
        icon: Globe2,
        title: "Study Abroad Counselling",
        text:
            "Personalised counselling based on your academic profile and goals.",
    },
    {
        icon: ShieldCheck,
        title: "Student Visa Guidance",
        text:
            "Step-by-step support for documentation and student visa applications.",
    },
    {
        icon: Plane,
        title: "Pre-departure Support",
        text:
            "Practical guidance before you begin your international education journey.",
    },
];

export default function BranchAbout({
    center,
}) {
    const location =
        center.seoLocation ||
        center.city;

    return (
        <section className="bg-white py-16 lg:py-20">
            <div
                className="
                    mx-auto
                    grid
                    max-w-7xl
                    gap-10
                    px-5
                    sm:px-6
                    lg:grid-cols-[0.95fr_1.05fr]
                    lg:px-8
                "
            >
                <div>
                    <p
                        className="
                            text-xs
                            font-black
                            uppercase
                            tracking-[0.22em]
                            text-primary
                        "
                    >
                        About Our Branch
                    </p>

                    <h2
                        className="
                            mt-3
                            text-3xl
                            font-black
                            leading-tight
                            text-darkPrimary
                            sm:text-4xl
                        "
                    >
                        Medcity Overseas{" "}
                        <span className="text-primary">
                            {location}
                        </span>
                    </h2>

                    <p
                        className="
                            mt-5
                            text-base
                            leading-8
                            text-slate-600
                        "
                    >
                        Medcity Overseas{" "}
                        {location} provides
                        personalised guidance
                        for students planning to
                        study abroad. Our team
                        helps with course and
                        university selection,
                        overseas applications,
                        documentation, student
                        visas and other important
                        steps in the admission
                        journey.
                    </p>

                    <p
                        className="
                            mt-4
                            text-base
                            leading-8
                            text-slate-600
                        "
                    >
                        Students from{" "}
                        {center.city},{" "}
                        {center.district} and
                        nearby areas can visit
                        our branch for direct,
                        one-to-one support from
                        our education
                        counsellors.
                    </p>

                    <div
                        className="
                            mt-7
                            space-y-3
                        "
                    >
                        {[
                            "Personalised study abroad counselling",
                            "Course and university shortlisting",
                            "Application and documentation support",
                            "Student visa guidance",
                        ].map((item) => (
                            <div
                                key={item}
                                className="
                                    flex
                                    items-start
                                    gap-3
                                "
                            >
                                <CheckCircle2
                                    size={19}
                                    className="mt-0.5 shrink-0 text-primary"
                                />

                                <p className="text-sm font-semibold text-slate-700">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className="
                        grid
                        gap-4
                        sm:grid-cols-2
                    "
                >
                    {points.map(
                        ({
                            icon: Icon,
                            title,
                            text,
                        }) => (
                            <article
                                key={title}
                                className="
                                    rounded-[24px]
                                    border
                                    border-slate-100
                                    bg-[#f8fbff]
                                    p-6
                                    transition
                                    hover:-translate-y-1
                                    hover:shadow-lg
                                    hover:shadow-slate-900/5
                                "
                            >
                                <span
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-primary/10
                                        text-primary
                                    "
                                >
                                    <Icon
                                        size={22}
                                    />
                                </span>

                                <h3
                                    className="
                                        mt-5
                                        text-lg
                                        font-black
                                        text-darkPrimary
                                    "
                                >
                                    {title}
                                </h3>

                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        leading-6
                                        text-slate-600
                                    "
                                >
                                    {text}
                                </p>
                            </article>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}