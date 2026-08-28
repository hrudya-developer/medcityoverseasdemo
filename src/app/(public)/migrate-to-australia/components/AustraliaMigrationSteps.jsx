import {
    BadgeCheck,
    BriefcaseBusiness,
    ClipboardCheck,
    FileCheck2,
    FileText,
    Hourglass,
    Languages,
    Laptop2,
    MailCheck,
    MapPinned,
    ShieldCheck,
} from "lucide-react";

const migrationSteps = [
    {
        number: "01",
        title: "Choose Your Visa Pathway",
        description:
            "Identify a suitable skilled, state-nominated, regional or employer-sponsored pathway based on your profile.",
        icon: MapPinned,
    },
    {
        number: "02",
        title: "Check Your Occupation",
        description:
            "Confirm that your nominated occupation is eligible for the visa pathway you plan to pursue.",
        icon: BriefcaseBusiness,
    },
    {
        number: "03",
        title: "Complete a Skills Assessment",
        description:
            "Obtain a suitable assessment from the relevant Australian assessing authority for your nominated occupation.",
        icon: ClipboardCheck,
    },
    {
        number: "04",
        title: "Meet English Requirements",
        description:
            "Complete an accepted English-language test when required and obtain results that support your visa eligibility and points claim.",
        icon: Languages,
    },
    {
        number: "05",
        title: "Calculate Your Points",
        description:
            "Review factors such as age, qualifications, employment experience, English ability and nomination eligibility.",
        icon: FileText,
    },
    {
        number: "06",
        title: "Submit an Expression of Interest",
        description:
            "Create a SkillSelect profile and submit accurate details about your qualifications, work history and migration preferences.",
        icon: Laptop2,
    },
    {
        number: "07",
        title: "Seek Nomination if Required",
        description:
            "Apply for state, territory, regional or employer nomination when it is required for your selected pathway.",
        icon: BadgeCheck,
    },
    {
        number: "08",
        title: "Receive an Invitation",
        description:
            "Wait for an invitation to apply. Submitting an Expression of Interest does not guarantee that an invitation will be issued.",
        icon: MailCheck,
    },
    {
        number: "09",
        title: "Lodge the Visa Application",
        description:
            "Submit the online visa application within the invitation period and provide evidence supporting the claims in your profile.",
        icon: FileCheck2,
    },
    {
        number: "10",
        title: "Health and Character Checks",
        description:
            "Complete any required health examinations, police clearances and identity checks requested for the application.",
        icon: ShieldCheck,
    },
    {
        number: "11",
        title: "Await the Decision",
        description:
            "Monitor your application, respond to any further information requests and wait for the final visa outcome.",
        icon: Hourglass,
    },
];

export default function AustraliaMigrationSteps() {
    return (
        <section
            id="australia-migration-steps"
            aria-labelledby="australia-migration-steps-heading"
            className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white via-[#fffafb] to-[#f5f9ff] py-12 sm:py-14 lg:py-16"
        >
            <StepsBackground />

            <div
                className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
            >
                <header
                    className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
                >
                    <div
                        aria-hidden="true"
                        className="mb-5 flex items-center justify-center gap-3 sm:gap-5"
                    >
                        <span
                            className="hidden h-px w-14 bg-gradient-to-r from-transparent to-primary/40 sm:block lg:w-24"
                        />

                        <span className="size-2 rounded-full bg-primary" />

                        <span className="size-1.5 rounded-full bg-secondary/60" />

                        <span
                            className="hidden h-px w-14 bg-gradient-to-l from-transparent to-secondary/40 sm:block lg:w-24"
                        />
                    </div>

                    <p
                        className="text-xs font-black uppercase tracking-[0.18em] text-primary"
                    >
                        Skilled Migration Process
                    </p>

                    <h2
                        id="australia-migration-steps-heading"
                        className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] text-darkPrimary sm:text-4xl lg:text-[44px]"
                    >
                        Steps Involved in{" "}
                        <span className="text-primary">
                            Australia Migration
                        </span>
                    </h2>

                    <p
                        className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base"
                    >
                        Follow these general stages to
                        understand the Australian skilled
                        migration and visa application
                        process.
                    </p>
                </header>

                <ol
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {migrationSteps.map(
                        (step, index) => (
                            <MigrationStepCard
                                key={step.number}
                                step={step}
                                index={index}
                            />
                        )
                    )}
                </ol>

                <aside
                    aria-label="Australia migration process note"
                    className="mx-auto mt-10 max-w-3xl sm:mt-12"
                >

                </aside>
            </div>
        </section>
    );
}

function MigrationStepCard({
    step,
    index,
}) {
    const Icon = step.icon;

    return (
        <li className="h-full">
            <article
                className="group relative flex h-full min-h-[220px] overflow-hidden rounded-[24px] border border-slate-200/90 bg-white/95 p-5 shadow-[0_10px_32px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_20px_48px_rgba(99,26,51,0.12)] sm:p-6"
            >
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-darkPrimary via-primary to-secondary transition-transform duration-300 group-hover:scale-x-100"
                />

                <div
                    aria-hidden="true"
                    className="absolute -right-12 -top-12 size-32 rounded-full bg-primary/[0.045] transition-transform duration-500 group-hover:scale-125"
                />

                <div className="relative flex w-full flex-col">
                    <div
                        className="flex items-start justify-between gap-4"
                    >
                        <span
                            aria-hidden="true"
                            className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-darkPrimary to-primary text-sm font-black text-white shadow-[0_8px_20px_rgba(192,31,83,0.25)]"
                        >
                            {step.number}
                        </span>

                        <span
                            aria-hidden="true"
                            className="grid size-11 shrink-0 place-content-center rounded-2xl bg-primary/[0.08] text-primary transition-all duration-300 group-hover:rotate-3 group-hover:bg-primary group-hover:text-white"
                        >
                            <Icon
                                size={21}
                                strokeWidth={2}
                            />
                        </span>
                    </div>

                    <h3
                        className="mt-5 text-lg font-black leading-6 text-slate-950"
                    >
                        {step.title}
                    </h3>

                    <p
                        className="mt-3 text-sm font-medium leading-6 text-slate-600"
                    >
                        {step.description}
                    </p>
                </div>

                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-5 right-3 text-7xl font-black text-primary/[0.045]"
                >
                    {step.number}
                </span>

                {index < migrationSteps.length - 1 && (
                    <span
                        aria-hidden="true"
                        className="absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 place-content-center rounded-full border border-primary/10 bg-white text-[10px] font-black text-primary shadow-sm lg:grid"
                    >
                        →
                    </span>
                )}
            </article>
        </li>
    );
}

function StepsBackground() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
        >
            <div
                className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(99,26,51,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,26,51,0.06)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
            />

            <div
                className="absolute -left-24 top-20 size-72 rounded-full bg-primary/[0.07] blur-3xl"
            />

            <div
                className="absolute -right-24 bottom-10 size-80 rounded-full bg-secondary/[0.07] blur-3xl"
            />

            <div
                className="absolute left-[8%] top-[18%] size-2 rounded-full bg-primary/40 shadow-[38px_28px_0_rgba(192,31,83,0.14),78px_-12px_0_rgba(4,102,175,0.14)]"
            />
        </div>
    );
}