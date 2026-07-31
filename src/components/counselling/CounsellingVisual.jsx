import Image from "next/image";

import {
    CheckCircle2,
    Headphones,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

const benefits = [
    "Personalised course guidance",
    "University application support",
    "Visa and admission assistance",
];

const CounsellingVisual = () => {
    return (
        <aside
            className="
                relative isolate
                min-h-[560px]
                overflow-hidden
                rounded-[30px]
                bg-darkPrimary
                px-6 py-10
                sm:px-9 sm:py-12
                lg:min-h-full
                lg:px-10
            "
        >
            <Image
                src="/assets/counselling.webp"
                alt="study-abroad-counselling"
                fill
                sizes="
                    (max-width: 1023px) 100vw,
                    45vw
                "
                className="object-cover"
                priority={false}
            />

            <div
                aria-hidden="true"
                className="
                    absolute inset-0
                    bg-gradient-to-br
                    from-black/90
                    via-black/80
                    to-black/80
                "
            />

            <div
                aria-hidden="true"
                className="
                    absolute -right-24
                    -top-24 h-72 w-72
                    rounded-full
                    bg-secondary/25
                    blur-[90px]
                "
            />

            <div
                aria-hidden="true"
                className="
                    absolute -bottom-24
                    -left-24 h-72 w-72
                    rounded-full
                    bg-primary/30
                    blur-[90px]
                "
            />

            <Image
                src="/assets/study-abroad-path.webp"
                alt="study-abroad-path"
                width={150}
                height={150}
                aria-hidden="true"
                className="
                    absolute right-5 top-6
                    hidden h-auto w-28
                    opacity-80
                    lg:block
                "
            />

            <div className="relative z-10 flex h-full flex-col">
                <div
                    className="
                        inline-flex w-fit
                        items-center gap-2
                        rounded-full
                        border border-white/20
                        bg-white/10
                        px-4 py-2
                        text-xs font-bold
                        uppercase
                        tracking-[0.14em]
                        text-white
                        backdrop-blur-md
                    "
                >
                    <Headphones className="h-4 w-4" />

                    Expert Guidance
                </div>

                <h2
                    id="counselling-heading"
                    className="
                        mt-8 font-nunito
                        text-3xl font-extrabold
                        leading-tight text-white
                        sm:text-4xl
                        lg:text-5xl
                    "
                >
                    Your dream university{" "}
                    <span
                        className="
                            bg-gradient-to-r
                            from-logoYellow
                            via-white
                            to-[#b9dcff]
                            bg-clip-text
                            text-transparent
                        "
                    >
                        awaits you
                    </span>
                </h2>

                <p
                    className="
                        mt-5 max-w-lg
                        text-sm leading-7
                        text-white/80
                        sm:text-base
                        sm:leading-8
                    "
                >
                    Get personalised support for
                    course selection, university
                    applications, admissions and
                    student visas.
                </p>

                <ul className="mt-8 space-y-4">
                    {benefits.map((benefit) => (
                        <li
                            key={benefit}
                            className="
                                flex items-center
                                gap-3 text-sm
                                font-semibold
                                text-white/90
                            "
                        >
                            <CheckCircle2
                                aria-hidden="true"
                                className="
                                    h-5 w-5
                                    shrink-0
                                    text-logoYellow
                                "
                            />

                            {benefit}
                        </li>
                    ))}
                </ul>

                <div
                    className="
                        mt-auto grid gap-3
                        pt-10 sm:grid-cols-2
                    "
                >
                    <div
                        className="
                            rounded-2xl
                            border border-white/15
                            bg-white/10
                            p-4
                            backdrop-blur-md
                        "
                    >
                        <Sparkles
                            aria-hidden="true"
                            className="
                                h-5 w-5
                                text-logoYellow
                            "
                        />

                        <p className="mt-3 text-sm font-bold text-white">
                            Free consultation
                        </p>
                    </div>

                    <div
                        className="
                            rounded-2xl
                            border border-white/15
                            bg-white/10
                            p-4
                            backdrop-blur-md
                        "
                    >
                        <ShieldCheck
                            aria-hidden="true"
                            className="
                                h-5 w-5
                                text-logoYellow
                            "
                        />

                        <p className="mt-3 text-sm font-bold text-white">
                            Trusted guidance
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default CounsellingVisual;