import {
    BookOpen,
    FileCheck2,
    GraduationCap,
    Languages,
    PlaneTakeoff,
    Stamp,
} from "lucide-react";

const services = [
    {
        icon: GraduationCap,
        title:
            "University Selection",
        description:
            "Guidance to identify universities that match your profile, budget and goals.",
    },
    {
        icon: BookOpen,
        title:
            "Course Selection",
        description:
            "Support to compare study programs and choose the right academic pathway.",
    },
    {
        icon: FileCheck2,
        title:
            "Application Support",
        description:
            "Assistance with applications, documents and admission requirements.",
    },
    {
        icon: Stamp,
        title:
            "Student Visa Guidance",
        description:
            "Support through student visa documentation and application procedures.",
    },
    {
        icon: Languages,
        title:
            "Language Training",
        description:
            "Language preparation and training support for selected study destinations.",
    },
    {
        icon: PlaneTakeoff,
        title:
            "Pre-departure Guidance",
        description:
            "Helpful guidance for travel, preparation and your transition abroad.",
    },
];

export default function BranchServices({
    center,
}) {
    const location =
        center.seoLocation ||
        center.city;

    return (
        <section
            className="
                border-y
                border-slate-100
                bg-[#f8fbff]
                py-16
                lg:py-20
            "
        >
            <div
                className="
                    mx-auto
                    max-w-7xl
                    px-5
                    sm:px-6
                    lg:px-8
                "
            >
                <div className="mx-auto max-w-3xl text-center">
                    <p
                        className="
                            text-xs
                            font-black
                            uppercase
                            tracking-[0.22em]
                            text-primary
                        "
                    >
                        Our Services
                    </p>

                    <h2
                        className="
                            mt-3
                            text-3xl
                            font-black
                            text-darkPrimary
                            sm:text-4xl
                        "
                    >
                        Study Abroad Support in{" "}
                        <span className="text-primary">
                            {location}
                        </span>
                    </h2>

                    <p
                        className="
                            mx-auto
                            mt-4
                            max-w-2xl
                            leading-7
                            text-slate-600
                        "
                    >
                        Get expert support from
                        the first counselling
                        session through your
                        overseas admission and
                        visa journey.
                    </p>
                </div>

                <div
                    className="
                        mt-10
                        grid
                        gap-5
                        sm:grid-cols-2
                        lg:grid-cols-3
                    "
                >
                    {services.map(
                        ({
                            icon: Icon,
                            title,
                            description,
                        }) => (
                            <article
                                key={title}
                                className="
                                    rounded-[24px]
                                    border
                                    border-slate-100
                                    bg-white
                                    p-6
                                    shadow-sm
                                    transition
                                    hover:-translate-y-1
                                    hover:shadow-lg
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
                                        bg-secondary/10
                                        text-secondary
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
                                    {description}
                                </p>
                            </article>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}