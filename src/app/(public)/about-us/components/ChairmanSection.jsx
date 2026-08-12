import Image from "next/image";
import Link from "next/link";

import {
    ArrowUpRight,
    Award,
    Globe2,
    GraduationCap,
    Plane,
    Quote,
    Sparkles,
} from "lucide-react";


const PRINCIPLES = [
    {
        icon: GraduationCap,
        title: "Quality Learning",
        description:
            "Industry-focused training",
    },
    {
        icon: Globe2,
        title: "Global Readiness",
        description:
            "Skills for international success",
    },
    {
        icon: Sparkles,
        title: "Personal Mentorship",
        description:
            "Guidance at every stage",
    },
];

const ChairmanSection = () => {
    return (
        <section
            aria-labelledby="chairman-message-heading"
            className="relative isolate overflow-hidden px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14"
        >
            <SectionBackground />

            <div
                className="relative mx-auto max-w-[1450px] overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-[#a70f46] via-darkPrimary to-[#071f5c] shadow-[0_25px_70px_rgba(49,20,72,0.25)] sm:rounded-[30px]"
            >
                <CardPatterns />

                <div
                    className="relative z-10 grid items-stretch lg:grid-cols-[0.42fr_0.58fr]"
                >
                    <ChairmanVisual />

                    <ChairmanMessage />
                </div>
            </div>
        </section>
    );
};

const ChairmanVisual = () => {
    return (
        <div
            className="relative flex min-h-[340px] items-center justify-center overflow-hidden px-5 pb-20 pt-8 sm:min-h-[400px] sm:px-8 sm:pb-24 sm:pt-10 lg:min-h-[500px] lg:px-6 lg:pb-24 lg:pt-10"
        >
            <PortraitBackground />

            <div
                aria-hidden="true"
                className="absolute left-5 top-3 z-20 font-serif text-[52px] font-black leading-none text-logoYellow/90 sm:left-7 sm:top-4 sm:text-[68px]"
            >
                “
            </div>

            <div
                className="absolute right-4 top-5 z-30 hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white/90 shadow-[0_10px_25px_rgba(0,0,0,0.14)] backdrop-blur-xl sm:flex"
            >
                <Sparkles
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-logoYellow"
                />

                Inspiring Leadership
            </div>

            <div
                className="relative z-20 flex h-full w-full items-center justify-center"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[66%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-[44%_56%_51%_49%/54%_43%_57%_46%] bg-gradient-to-br from-logoYellow/15 via-white/[0.05] to-secondary/20 blur-3xl"
                />

                <div
                    className="relative z-10 h-[265px] w-full sm:h-[325px] lg:h-[410px]"
                >
                    <Image
                        src={`/assets/rahul-chakrapani-chairman-medcity.webp`}
                        alt="Rahul Chakrapani, Chairman of Medcity International Academy"
                        fill
                        sizes="
                            (max-width: 639px) 100vw,
                            (max-width: 1023px) 480px,
                            42vw
                        "
                        className="object-contain object-center drop-shadow-[0_24px_38px_rgba(0,0,0,0.32)]"
                    />
                </div>
            </div>

            <div
                className="absolute bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-[340px] -translate-x-1/2 rounded-2xl border border-white/15 bg-[#07162f]/70 px-4 py-3 text-center shadow-[0_15px_35px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:bottom-5"
            >
                <p
                    className="font-nunito text-lg font-black text-logoYellow sm:text-xl"
                >
                    Rahul Chakrapani
                </p>

                <p className="mt-0.5 text-[11px] font-semibold text-white/70">
                    Chairman, Medcity International
                    Academy
                </p>

                <div className="mx-auto mt-2 flex items-center justify-center gap-2">
                    <span className="h-px w-8 bg-white/20" />

                    <Quote
                        aria-hidden="true"
                        className="h-3 w-3 text-logoYellow"
                    />

                    <span className="h-px w-8 bg-white/20" />
                </div>
            </div>
        </div>
    );
};

const PortraitBackground = () => {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
        >
            <div
                className="absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-logoYellow/10 blur-3xl"
            />

            <div
                className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-secondary/15 blur-3xl"
            />

            <div
                className="absolute left-1/2 top-1/2 h-[70%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-[32px] bg-gradient-to-b from-white/[0.07] via-white/[0.025] to-transparent blur-xl"
            />

            <div
                className="absolute bottom-28 right-4 h-24 w-24 opacity-[0.12] [background-image:radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:12px_12px]"
            />

            <svg
                viewBox="0 0 340 240"
                fill="none"
                className="absolute right-0 top-14 hidden h-48 w-60 text-logoYellow/15 sm:block"
            >
                <path
                    d="M15 208C73 144 132 170 166 105C201 38 267 68 325 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="7 9"
                    strokeLinecap="round"
                />
            </svg>

            <Plane
                className="absolute right-5 top-12 hidden h-5 w-5 -rotate-12 text-logoYellow/30 sm:block"
            />
        </div>
    );
};

const ChairmanMessage = () => {
    return (
        <div
            className="relative flex flex-col justify-center border-t border-white/10 px-5 py-7 text-white sm:px-8 sm:py-9 lg:border-l lg:border-t-0 lg:px-10 lg:py-10 xl:px-12 xl:py-12"
        >
            <div
                className="inline-flex w-fit items-center gap-2 rounded-full border border-logoYellow/25 bg-logoYellow/10 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-logoYellow sm:text-[10px]"
            >
                <Award
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                />

                A Message From Our Chairman
            </div>

            <h2
                id="chairman-message-heading"
                className="mt-4 max-w-3xl font-nunito text-2xl font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-3xl lg:text-[38px]"
            >
                Let&apos;s Shape Your{" "}

                <span
                    className="bg-gradient-to-r from-logoYellow via-white to-[#8cc8ff] bg-clip-text text-transparent"
                >
                    Global Future
                </span>
                , Together.
            </h2>

            <div
                aria-hidden="true"
                className="mt-4 flex items-center gap-2"
            >
                <span className="h-1 w-12 rounded-full bg-logoYellow" />
                <span className="h-1 w-7 rounded-full bg-white/50" />
                <span className="h-1 w-3 rounded-full bg-secondary" />
            </div>

            <blockquote
                className="relative mt-5 max-w-3xl border-l-2 border-logoYellow/70 pl-4 text-sm leading-6 text-white/85 sm:leading-7"
            >
                At Medcity, every programme is built
                on three principles: quality learning,
                personal mentorship and real-world
                readiness.
            </blockquote>

            <p
                className="mt-4 max-w-3xl text-sm leading-6 text-white/70 sm:leading-7"
            >
                Whether you are taking your first step
                in language learning or preparing for
                advanced licensure, our team is here to
                guide you with expert support, practical
                training and personal attention at every
                stage.
            </p>

            <div
                className="mt-5 grid gap-3 sm:grid-cols-3"
            >
                {PRINCIPLES.map((item) => (
                    <PrincipleCard
                        key={item.title}
                        icon={item.icon}
                        title={item.title}
                        description={
                            item.description
                        }
                    />
                ))}
            </div>

            <div
                className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-end sm:justify-between"
            >
                <div>
                    <p
                        className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/45"
                    >
                        With warm regards
                    </p>

                    <p
                        className="mt-1.5 font-nunito text-xl font-black text-logoYellow"
                    >
                        Rahul Chakrapani
                    </p>

                    <p className="mt-0.5 text-[11px] font-semibold text-white/60">
                        Chairman, Medcity International
                        Academy
                    </p>
                </div>

                <Link
                    href="/contact-us"
                    className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-extrabold text-darkPrimary shadow-[0_12px_25px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-logoYellow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
                >
                    Start Your Journey

                    <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                </Link>
            </div>
        </div>
    );
};

const PrincipleCard = ({
    icon: Icon,
    title,
    description,
}) => {
    return (
        <article
            className="group rounded-xl border border-white/10 bg-white/[0.06] px-3 py-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-logoYellow/25 hover:bg-white/[0.1]"
        >
            <div className="flex items-center gap-2.5 sm:block">
                <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-logoYellow transition-transform duration-300 group-hover:scale-105"
                >
                    <Icon className="h-4 w-4" />
                </span>

                <div>
                    <h3
                        className="text-[13px] font-extrabold text-white sm:mt-2"
                    >
                        {title}
                    </h3>

                    <p className="mt-0.5 text-[11px] leading-4 text-white/55">
                        {description}
                    </p>
                </div>
            </div>
        </article>
    );
};

const CardPatterns = () => {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
        >
            <div
                className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-logoYellow/10 blur-3xl"
            />

            <div
                className="absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"
            />

            <div
                className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"
            />

            <div className="absolute -right-24 top-10 h-64 w-64 rounded-full border border-white/10" />

            <div className="absolute -right-10 top-24 h-44 w-44 rounded-full border border-white/10" />
        </div>
    );
};

const SectionBackground = () => {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
            <div
                className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-primary/[0.05] blur-3xl"
            />

            <div
                className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-secondary/[0.06] blur-3xl"
            />

            <div
                className="absolute left-6 top-12 h-28 w-28 opacity-15 [background-image:radial-gradient(#c01f53_1.3px,transparent_1.3px)] [background-size:12px_12px]"
            />
        </div>
    );
};

export default ChairmanSection;