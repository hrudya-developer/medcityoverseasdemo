import {
    BriefcaseBusiness,
    Building2,
    GraduationCap,
    HeartPulse,
    MapPinned,
    ShieldCheck,
} from "lucide-react";

const benefits = [
    {
        id: 1,
        title: "Career Opportunities",
        description:
            "Explore skilled employment opportunities across eligible industries.",
        icon: BriefcaseBusiness,
    },
    {
        id: 2,
        title: "Quality Healthcare",
        description:
            "Australia has an established healthcare and public-service system.",
        icon: HeartPulse,
    },
    {
        id: 3,
        title: "Recognised Education",
        description:
            "Access internationally recognised education and training opportunities.",
        icon: GraduationCap,
    },
    {
        id: 4,
        title: "Safe Communities",
        description:
            "Live in diverse communities with established public infrastructure.",
        icon: ShieldCheck,
    },
    {
        id: 5,
        title: "Regional Pathways",
        description:
            "Eligible applicants may explore state and regional migration pathways.",
        icon: MapPinned,
    },
    {
        id: 6,
        title: "Business Environment",
        description:
            "Build professional networks in a developed and diverse economy.",
        icon: Building2,
    },
];

export default function AustraliaMigrationBenefits() {
    return (
        <section
            id="australia-benefits"
            aria-labelledby="australia-benefits-heading"
            className="relative bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
        >
            <div className="mx-auto max-w-7xl">
                <div
                    className="relative rounded-[28px] border border-slate-200/80 bg-white px-4 pb-5 pt-14 shadow-[0_18px_50px_rgba(15,23,42,0.1)] sm:px-6 lg:px-8"
                >
                    <h2
                        id="australia-benefits-heading"
                        className="absolute left-4 top-0 -translate-y-1/2 rounded-xl bg-gradient-to-r from-darkPrimary to-primary px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(192,31,83,0.28)] sm:left-6 sm:text-base lg:left-8"
                    >
                        Benefits of Migrating to Australia
                    </h2>

                    <div
                        className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
                    >
                        {benefits.map(
                            ({
                                id,
                                title,
                                description,
                                icon: Icon,
                            }) => (
                                <article
                                    key={id}
                                    className="group flex min-h-[180px] flex-col items-center justify-center rounded-2xl bg-slate-50 px-4 py-5 text-center transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="grid size-12 place-content-center rounded-2xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-white"
                                    >
                                        <Icon size={24} />
                                    </span>

                                    <h3 className="mt-4 text-sm font-bold text-slate-900">
                                        {title}
                                    </h3>

                                    <p className="mt-2 text-xs leading-5 text-slate-500">
                                        {description}
                                    </p>
                                </article>
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}