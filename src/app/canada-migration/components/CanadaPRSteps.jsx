import {
    BadgeCheck,
    CircleDollarSign,
    FileCheck2,
    FileText,
    Hourglass,
    Languages,
    Laptop2,
    Mail,
    ShieldCheck,
    UserCheck,
} from "lucide-react";

const prSteps = [
    {
        number: "01",
        title: "Eligibility",
        description:
            "Check whether you may qualify through Express Entry or a Provincial Nominee Program.",
        icon: UserCheck,
    },
    {
        number: "02",
        title: "Prepare Documents",
        description:
            "Collect identity, education, proof of funds, language-test and work-experience documents.",
        icon: FileText,
    },
    {
        number: "03",
        title: "Language Test",
        description:
            "Complete IELTS, CELPIP or TEF based on the language requirements of your pathway.",
        icon: Languages,
    },
    {
        number: "04",
        title: "Create Your Profile",
        description:
            "Submit an online profile and receive a Comprehensive Ranking System score.",
        icon: Laptop2,
    },
    {
        number: "05",
        title: "Receive an ITA",
        description:
            "Enter the candidate pool and wait for an Invitation to Apply when selected.",
        icon: Mail,
    },
    {
        number: "06",
        title: "Submit the Application",
        description:
            "Upload the required documents and submit your permanent residence application.",
        icon: FileCheck2,
    },
    {
        number: "07",
        title: "Pay the Fees",
        description:
            "Pay the application charges and the applicable permanent residence fees.",
        icon: CircleDollarSign,
    },
    {
        number: "08",
        title: "Medical and Security Checks",
        description:
            "Complete the required medical examination and provide police-clearance documents.",
        icon: ShieldCheck,
    },
    {
        number: "09",
        title: "Await the Decision",
        description:
            "Track your application and wait for the final decision from the relevant authority.",
        icon: Hourglass,
    },
];

export default function CanadaPRSteps() {
    return (
        <section
            id="canada-pr-steps"
            aria-labelledby="canada-pr-steps-heading"
            className="
                relative scroll-mt-24
                overflow-hidden
                bg-gradient-to-b
                from-white
                via-[#fffafb]
                to-white
                py-12
                sm:py-14
                lg:py-16
            "
        >
            <BackgroundDecorations />

            <div
                className="
                    relative z-10
                    mx-auto w-full
                    max-w-7xl
                    px-4
                    sm:px-6
                    lg:px-8
                "
            >
                <header
                    className="
                        mx-auto mb-10
                        max-w-3xl
                        text-center
                        sm:mb-12
                    "
                >
                    <div
                        aria-hidden="true"
                        className="
                            mb-4 flex
                            items-center
                            justify-center
                            gap-3
                            sm:gap-5
                        "
                    >
                        <span
                            className="
                                hidden h-px
                                w-14
                                bg-gradient-to-r
                                from-transparent
                                to-primary/40
                                sm:block
                                lg:w-24
                            "
                        />

                        <span className="size-2 rounded-full bg-primary" />
                        <span className="size-1.5 rounded-full bg-primary/60" />

                        <span
                            className="
                                hidden h-px
                                w-14
                                bg-gradient-to-l
                                from-transparent
                                to-primary/40
                                sm:block
                                lg:w-24
                            "
                        />
                    </div>

                    <p
                        className="
                            text-xs font-black
                            uppercase
                            tracking-[0.18em]
                            text-primary
                        "
                    >
                        Permanent Residence Process
                    </p>

                    <h2
                        id="canada-pr-steps-heading"
                        className="
                            mt-3 text-3xl
                            font-black
                            tracking-[-0.04em]
                            text-darkPrimary
                            sm:text-4xl
                            lg:text-[44px]
                        "
                    >
                        Steps Involved in{" "}
                        <span className="text-primary">
                            Canada PR
                        </span>
                    </h2>

                    <p
                        className="
                            mx-auto mt-4
                            max-w-2xl
                            text-sm leading-7
                            text-slate-600
                            sm:text-base
                        "
                    >
                        Follow these key stages to understand
                        the general Canadian permanent residence
                        application journey.
                    </p>
                </header>

                <ol
                    className="
                        grid grid-cols-1
                        gap-4
                        sm:grid-cols-2
                        lg:grid-cols-3
                        lg:gap-5
                    "
                >
                    {prSteps.map((step) => (
                        <PRStepCard
                            key={step.number}
                            step={step}
                        />
                    ))}
                </ol>

                <div
                    className="
                        mx-auto mt-10
                        flex max-w-2xl
                        items-center
                        justify-center
                        gap-3
                        rounded-2xl
                        border border-primary/10
                        bg-primary/[0.045]
                        px-5 py-4
                        text-center
                        text-sm font-semibold
                        leading-6
                        text-darkPrimary
                        sm:w-fit
                        sm:px-6
                    "
                >
                    <BadgeCheck
                        size={19}
                        aria-hidden="true"
                        className="
                            shrink-0
                            text-primary
                        "
                    />

                    Complete every stage carefully and verify
                    current requirements before submitting an
                    application.
                </div>
            </div>
        </section>
    );
}

function PRStepCard({ step }) {
    const Icon = step.icon;

    return (
        <li className="h-full">
            <article
                className="
                    group relative
                    flex h-full
                    min-h-[205px]
                    overflow-hidden
                    rounded-[22px]
                    border border-slate-200/90
                    bg-white/95
                    p-5
                    shadow-[0_10px_30px_rgba(15,23,42,0.06)]
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-primary/20
                    hover:shadow-[0_18px_45px_rgba(99,26,51,0.12)]
                    sm:p-6
                "
            >
                <div
                    aria-hidden="true"
                    className="
                        absolute inset-x-0
                        top-0 h-1
                        origin-left
                        scale-x-0
                        bg-gradient-to-r
                        from-darkPrimary
                        to-primary
                        transition-transform
                        duration-300
                        group-hover:scale-x-100
                    "
                />

                <div className="relative flex w-full items-start gap-4">
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                            <span
                                aria-hidden="true"
                                className="
                                    inline-flex
                                    size-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-gradient-to-br
                                    from-darkPrimary
                                    to-primary
                                    text-sm font-bold
                                    text-white
                                    shadow-[0_8px_20px_rgba(192,31,83,0.25)]
                                "
                            >
                                {step.number}
                            </span>

                            <h3
                                className="
                                    text-base
                                    font-bold
                                    leading-5
                                    text-slate-950
                                    sm:text-lg
                                "
                            >
                                {step.title}
                            </h3>
                        </div>

                        <p
                            className="
                                mt-4 text-sm
                                font-medium
                                leading-6
                                text-slate-600
                                sm:text-[15px]
                            "
                        >
                            {step.description}
                        </p>
                    </div>

                    <span
                        aria-hidden="true"
                        className="
                            grid size-11
                            shrink-0
                            place-content-center
                            rounded-full
                            bg-primary/[0.08]
                            text-primary
                            shadow-sm
                            transition-all
                            duration-300
                            group-hover:scale-105
                            group-hover:bg-primary
                            group-hover:text-white
                        "
                    >
                        <Icon
                            size={21}
                            strokeWidth={1.9}
                        />
                    </span>
                </div>

                <span
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute -bottom-5
                        right-3
                        text-7xl
                        font-black
                        text-primary/[0.05]
                    "
                >
                    {step.number}
                </span>
            </article>
        </li>
    );
}

function BackgroundDecorations() {
    return (
        <div
            aria-hidden="true"
            className="
                pointer-events-none
                absolute inset-0
            "
        >
            <div
                className="
                    absolute -left-24
                    top-10 size-64
                    rounded-full
                    bg-primary/5
                    blur-3xl
                "
            />

            <div
                className="
                    absolute -right-24
                    bottom-0 size-72
                    rounded-full
                    bg-secondary/5
                    blur-3xl
                "
            />

            <div
                className="
                    absolute inset-0
                    opacity-[0.025]
                    [background-image:radial-gradient(#631A33_1px,transparent_1px)]
                    [background-size:24px_24px]
                "
            />
        </div>
    );
}