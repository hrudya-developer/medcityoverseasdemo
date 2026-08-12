import {
    Award,
    Globe,
    Headphones,
    RotateCcw,
} from "lucide-react";

export default function CourseBenefits({
    country,
    intakes,
    universityName,
}) {
    const benefits = [
        {
            icon: Globe,
            title: "Global Learning",
            text:
                country !== "N/A"
                    ? `Study in ${country}`
                    : "Study globally",
        },
        {
            icon: RotateCcw,
            title: "Flexible Intake",
            text: intakes,
        },
        {
            icon: Award,
            title: "Recognized University",
            text: universityName,
        },
        {
            icon: Headphones,
            title: "Student Support",
            text: "Guidance at every step",
        },
    ];

    return (
        <section
            className="mx-auto mb-10 max-w-7xl px-5 lg:px-12"
        >
            <div
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
                <div
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {benefits.map(
                        ({
                            icon: Icon,
                            title,
                            text,
                        }) => (
                            <div
                                key={title}
                                className="flex items-center gap-4"
                            >
                                <div
                                    className="grid size-12 shrink-0 place-content-center rounded-full bg-primary text-white"
                                >
                                    <Icon size={20} />
                                </div>

                                <div className="min-w-0">
                                    <h3
                                        className="font-bold text-[#071b45]"
                                    >
                                        {title}
                                    </h3>

                                    <p
                                        className="mt-1 break-words text-sm text-slate-600"
                                    >
                                        {text}
                                    </p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}