import Image from "next/image";
import Link from "next/link";

import {
    ArrowUpRight,
    BadgeCheck,
    Headphones,
    Plane,
    ShieldCheck,
    Sparkles,
    Star,
    UsersRound,
} from "lucide-react";

import contactHero from "./images/contact-medcity-study-abroad.webp";

const supportItems = [
    {
        icon: ShieldCheck,
        title: "Expert Guidance",
        description: "Trusted advice",
    },
    {
        icon: Headphones,
        title: "Quick Response",
        description: "Always available",
    },
    {
        icon: BadgeCheck,
        title: "Personal Support",
        description: "Made for you",
    },
];

const ContactHero = () => {
    return (
        <section
            className="relative isolate mx-auto w-full max-w-[1600px] overflow-hidden bg-gradient-to-br from-white via-[#fffafd] to-[#f3f8ff] px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10 xl:py-11"
        >
            <BackgroundDecorations />

            <div
                className="mx-auto grid w-full max-w-[1400px] items-center gap-8 lg:grid-cols-[1.12fr_0.72fr] lg:gap-10 xl:grid-cols-[1.18fr_0.65fr] xl:gap-14 2xl:gap-20"
            >
                <div
                    className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                    <div
                        aria-hidden="true"
                        className="absolute -left-7 top-10 hidden h-20 w-20 rounded-full bg-primary/[0.06] blur-2xl lg:block"
                    />

                    <ContactBreadcrumb />

                    <h1
                        className="mt-4 max-w-3xl font-nunito text-[31px] font-black leading-[1.08] tracking-[-0.035em] text-darkPrimary sm:text-[38px] lg:text-[44px] xl:text-[50px] 2xl:text-[54px]"
                    >
                        We’re Here to{" "}
                        <span className="relative inline-block">
                            <span
                                className="bg-gradient-to-r from-primary to-[#e73b70] bg-clip-text text-transparent"
                            >
                                Help You
                            </span>

                            <span
                                aria-hidden="true"
                                className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-logoYellow/70"
                            />
                        </span>

                        <span className="block">
                            Start Your{" "}
                            <span
                                className="bg-gradient-to-r from-secondary to-[#3694d7] bg-clip-text text-transparent"
                            >
                                Journey
                            </span>
                        </span>
                    </h1>

                    <div
                        aria-hidden="true"
                        className="mt-4 flex items-center justify-center gap-2 lg:justify-start"
                    >
                        <span className="h-1.5 w-12 rounded-full bg-primary" />
                        <span className="h-1.5 w-4 rounded-full bg-primary/25" />
                    </div>

                    <p
                        className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-[15px] sm:leading-7 lg:text-base"
                    >
                        Have questions or need guidance? Our experienced team is
                        ready to support you throughout your study abroad journey.
                    </p>

                    <div
                        className="mt-6 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
                    >
                        {supportItems.map((item) => (
                            <SupportCard
                                key={item.title}
                                item={item}
                            />
                        ))}
                    </div>

                    <div
                        className="mt-6 flex w-full justify-center lg:justify-start"
                    >
                        <a
                            href="#contact-form"
                            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-darkPrimary to-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_13px_28px_rgba(192,31,83,0.23)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(99,26,51,0.27)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                            Contact Our Experts

                            <ArrowUpRight
                                aria-hidden="true"
                                className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </a>
                    </div>
                </div>

                <HeroVisual />
            </div>
        </section>
    );
};

const ContactBreadcrumb = () => {
    return (
        <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/80 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary shadow-[0_8px_20px_rgba(15,23,42,0.05)] backdrop-blur-md sm:text-[11px]"
        >
            <ol className="flex items-center gap-2">
                <li>
                    <Link
                        href="/"
                        className="transition-colors hover:text-darkPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                    >
                        Home
                    </Link>
                </li>

                <li
                    aria-hidden="true"
                    className="text-slate-300"
                >
                    /
                </li>

                <li aria-current="page">
                    Contact Us
                </li>
            </ol>
        </nav>
    );
};

const SupportCard = ({ item }) => {
    const Icon = item.icon;

    return (
        <div
            className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 px-3 py-3 text-left shadow-[0_8px_22px_rgba(15,23,42,0.06)] backdrop-blur-md transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/[0.04] before:to-secondary/[0.04] before:opacity-0 before:transition-opacity before:duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-white hover:shadow-[0_14px_30px_rgba(192,31,83,0.11)] hover:before:opacity-100 sm:flex-col sm:items-start sm:gap-2.5 xl:flex-row xl:items-center"
        >
            <span
                className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-white"
            >
                <Icon
                    aria-hidden="true"
                    className="h-5 w-5"
                    strokeWidth={2.2}
                />
            </span>

            <div className="relative z-10 min-w-0">
                <p
                    className="text-xs font-extrabold leading-4 text-[#132342] xl:text-[13px]"
                >
                    {item.title}
                </p>

                <p className="mt-0.5 text-[10px] text-slate-500">
                    {item.description}
                </p>
            </div>
        </div>
    );
};

const HeroVisual = () => {
    return (
        <div
            className="relative mx-auto w-full max-w-[280px] pb-9 sm:max-w-[315px] sm:pb-10 lg:max-w-[330px] lg:pb-8 xl:max-w-[355px]"
        >
            <div
                aria-hidden="true"
                className="absolute -right-12 top-1/2 hidden h-52 w-52 -translate-y-1/2 rounded-full border border-dashed border-secondary/15 xl:block"
            />

            <svg
                aria-hidden="true"
                className="pointer-events-none absolute -left-10 top-[13%] hidden h-32 w-28 overflow-visible lg:block"
                viewBox="0 0 140 140"
                fill="none"
            >
                <path
                    d="M12 10C40 20 25 53 48 72C66 88 92 105 130 122"
                    stroke="#c01f53"
                    strokeWidth="2"
                    strokeDasharray="5 7"
                    opacity="0.55"
                />
            </svg>

            <div
                aria-hidden="true"
                className="absolute -left-7 top-[12%] z-20 hidden text-primary lg:block"
            >
                <Plane
                    className="h-7 w-7 -rotate-12 fill-primary"
                    strokeWidth={1.5}
                />
            </div>

            <div
                className="relative isolate h-[270px] w-full overflow-hidden rounded-[28px] border-[5px] border-white bg-[#dcefff] shadow-[0_24px_55px_rgba(4,102,175,0.18)] sm:h-[300px] sm:rounded-[32px] lg:h-[320px] xl:h-[340px]"
            >
                <Image
                    src={contactHero}
                    alt="Student planning overseas education with Medcity Study Abroad consultants"
                    fill
                    priority
                    sizes="
            (max-width: 639px) 280px,
            (max-width: 1023px) 315px,
            355px
          "
                    className="object-cover object-center transition-transform duration-700 hover:scale-[1.025]"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary/10 via-transparent to-white/10"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-3 rounded-[21px] border border-white/30 sm:rounded-[25px]"
                />
            </div>

            <div
                className="absolute right-[-10px] top-5 z-30 flex items-center gap-2 rounded-2xl border border-white/80 bg-white/95 px-2.5 py-2 shadow-[0_12px_28px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:right-[-18px] sm:top-7 sm:px-3 sm:py-2.5"
            >
                <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary"
                >
                    <ArrowUpRight
                        className="h-4 w-4"
                        strokeWidth={2.5}
                    />
                </span>

                <div className="whitespace-nowrap">
                    <p className="text-[11px] font-black text-[#132342] sm:text-xs">
                        185,000+
                    </p>

                    <p className="text-[8px] text-slate-500 sm:text-[9px]">
                        Students Guided
                    </p>
                </div>
            </div>

            <div
                className="absolute bottom-[70px] right-[-10px] z-30 flex max-w-[145px] items-center gap-2 rounded-2xl border border-white/80 bg-white/95 px-2.5 py-2 shadow-[0_12px_28px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:bottom-[78px] sm:right-[-20px] sm:max-w-[158px] sm:px-3 sm:py-2.5 lg:bottom-[62px]"
            >
                <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                >
                    <UsersRound
                        className="h-4 w-4"
                        strokeWidth={2.2}
                    />
                </span>

                <p
                    className="text-[9px] font-extrabold leading-[1.35] text-[#132342] sm:text-[10px]"
                >
                    Trusted by Thousands of Students
                </p>
            </div>

            <div
                className="absolute bottom-0 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-2xl border border-white/80 bg-white/95 px-3 py-2.5 shadow-[0_16px_34px_rgba(15,23,42,0.15)] backdrop-blur-xl sm:left-[-18px] sm:translate-x-0 lg:left-[-28px]"
            >
                <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-logoYellow to-[#f5ad12] text-xs font-black text-darkPrimary shadow-[0_7px_16px_rgba(247,196,34,0.3)]"
                >
                    4.3
                </span>

                <div>
                    <div
                        aria-hidden="true"
                        className="flex items-center gap-0.5"
                    >
                        {Array.from({ length: 5 }).map(
                            (_, index) => (
                                <Star
                                    key={index}
                                    className="h-3 w-3 fill-[#f7b500] text-[#f7b500]"
                                />
                            )
                        )}
                    </div>

                    <p className="mt-0.5 text-[10px] font-extrabold text-[#132342]">
                        Excellent Reviews
                    </p>

                    <p className="text-[8px] text-slate-500">
                        Rated by 4,000+ students
                    </p>
                </div>

                <Sparkles
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-primary"
                />
            </div>
        </div>
    );
};

const BackgroundDecorations = () => {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
            <div
                className="absolute -left-24 top-8 h-64 w-64 rounded-full bg-primary/[0.07] blur-3xl"
            />

            <div
                className="absolute -right-28 -top-20 h-96 w-96 rounded-full bg-secondary/[0.08] blur-3xl"
            />

            <div
                className="absolute left-5 top-10 hidden h-28 w-28 opacity-[0.16] [background-image:radial-gradient(#c01f53_1.7px,transparent_1.7px)] [background-size:15px_15px] lg:block"
            />

            <div
                className="absolute -left-24 top-[35%] hidden h-56 w-56 rounded-full border border-primary/10 lg:block"
            />

            <div
                className="absolute left-[7%] top-[58%] hidden h-20 w-20 rounded-full border-2 border-dashed border-secondary/15 xl:block"
            />

            <div
                className="absolute right-0 top-0 h-40 w-40 opacity-[0.1] [background-image:radial-gradient(#0466AF_1.5px,transparent_1.5px)] [background-size:15px_15px]"
            />

            <div
                className="absolute bottom-0 left-0 h-32 w-32 opacity-[0.07] [background-image:radial-gradient(#c01f53_1.5px,transparent_1.5px)] [background-size:16px_16px]"
            />

            <div
                className="absolute left-0 top-1/2 hidden h-32 w-1.5 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-primary via-secondary to-logoYellow xl:block"
            />
        </div>
    );
};

export default ContactHero;