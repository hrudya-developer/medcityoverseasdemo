"use client";

import Image from "next/image";
import Link from "next/link";

import {
    ArrowDown,
    ArrowRight,
    Globe2,
    GraduationCap,
    Search,
    Sparkles,
    University,
    UsersRound,
} from "lucide-react";

import SearchSection from "@/components/home/searchSection/SearchSection";
import FAQ from "@/components/home/FAQ/FAQ";
import StudyTabContent from "@/components/home/services/programs/StudyTabContent";

const heroStats = [
    { value: "25+", label: "Destinations", icon: Globe2 },
    { value: "500+", label: "Top Universities", icon: University },
    { value: "1000+", label: "Courses Available", icon: GraduationCap },
    { value: "10,000+", label: "Students Guided", icon: UsersRound },
];

export default function CoursePageClient() {
    const scrollToSearch = () => {
        document
            .getElementById("course-search")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    };

    return (
        <div className="overflow-hidden bg-white">
            <CourseHero
                onSearchClick={scrollToSearch}
            />

            <section
                id="course-search"
                aria-labelledby="course-search-heading"
                className="relative z-20 scroll-mt-24 bg-black"
            >
                <h2
                    id="course-search-heading"
                    className="sr-only"
                >
                    Search international courses
                </h2>

                <SearchSection
                    title="Search International Courses"
                    description="Choose your destination, university and preferred study area to discover programs that match your academic and career goals."
                    className="pt-16 lg:pt-20"
                />
            </section>

            <StudyTabContent />

            <FAQ />
        </div>
    );
}

function CourseHero({ onSearchClick }) {
    return (
        <section className="relative isolate overflow-hidden bg-white px-3 py-3 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
            <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[28px] border border-slate-100 bg-gradient-to-br from-white via-[#fff9fc] to-[#eef7ff] shadow-[0_30px_90px_rgba(15,23,42,0.10)] sm:rounded-[36px] lg:rounded-[44px]">
                <HeroDecorations />

                <div className="relative z-10 grid gap-8 px-5 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10 lg:min-h-[650px] lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-10 lg:px-12 lg:pb-32 lg:pt-12 xl:px-16 2xl:gap-16">
                    <HeroContent onSearchClick={onSearchClick} />
                    <HeroVisual />
                </div>

                <HeroStats />
            </div>

            <button
                type="button"
                onClick={onSearchClick}
                aria-label="Scroll to course search"
                className="group mx-auto mt-4 hidden items-center gap-2 text-[11px] font-black uppercase tracking-[0.17em] text-slate-500 transition hover:text-primary lg:flex"
            >
                Start your search
                <ArrowDown
                    size={16}
                    className="animate-bounce transition-transform group-hover:translate-y-1"
                />
            </button>
        </section>
    );
}

function HeroContent({ onSearchClick }) {
    return (
        <div className="mx-auto max-w-[660px] text-center lg:mx-0 lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/85 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-primary shadow-[0_8px_24px_rgba(192,31,83,0.08)] backdrop-blur-md sm:px-4 sm:text-xs">
                <Sparkles size={15} />
                Explore global education
            </div>

            <h1 className="mt-5 text-3xl font-black leading-[0.98] tracking-[-0.05em] text-[#0c1b35] sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl">
                Find the Right Course for Your{" "}
                <span className="relative inline-block text-primary">
                    Global Future
                    <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-2 h-1.5 rounded-full bg-logoYellow sm:-bottom-3"
                    />
                </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:text-base lg:mx-0 lg:text-lg lg:leading-8">
                Explore international courses, compare universities and discover
                study programs aligned with your academic interests and career
                ambitions.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:max-w-[650px]">
                {["Destination", "University", "Study Programs"].map((item, index) => (
                    <button
                        key={item}
                        type="button"
                        onClick={onSearchClick}
                        className="group flex min-h-[74px] items-center gap-3 rounded-2xl border border-white/90 bg-white/80 px-4 text-left shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_18px_36px_rgba(192,31,83,0.12)]"
                    >
                        <span className="grid size-10 shrink-0 place-content-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                            {index === 0 ? <Globe2 size={19} /> : index === 1 ? <University size={19} /> : <GraduationCap size={19} />}
                        </span>
                        <span>
                            <span className="block text-[11px] font-semibold text-slate-500">
                                {index === 0 ? "Search by" : index === 1 ? "Choose your" : "Compare"}
                            </span>
                            <span className="block text-sm font-black text-[#0c1b35]">
                                {item}
                            </span>
                        </span>
                    </button>
                ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                <button
                    type="button"
                    onClick={onSearchClick}
                    className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl bg-primary px-6 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(192,31,83,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(192,31,83,0.34)] hover:cursor-pointer"
                >
                    <Search size={18} />
                    Explore Courses
                    <span className="grid size-9 place-content-center rounded-full bg-white text-primary transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight size={18} />
                    </span>
                </button>

                <Link
                    href="/contact-us"
                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-6 text-sm font-semibold text-[#0c1b35] shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:text-primary"
                >
                    Request callback
                    <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                    />
                </Link>
            </div>

        </div>
    );
}

function HeroVisual() {
    return (
        <div
            className="
                relative mx-auto
                w-full max-w-[560px]
                lg:max-w-[620px]
            "
        >
            <div
                className="
                    relative mx-auto
                    flex min-h-[370px]
                    items-center justify-center
                    overflow-visible
                    sm:min-h-[470px]
                    lg:min-h-[530px]
                "
            >
                {/* Soft blue background glow */}
                <div
                    aria-hidden="true"
                    className="
                        absolute left-1/2 top-1/2
                        size-[290px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-secondary/10
                        blur-[55px]
                        sm:size-[410px]
                        lg:size-[490px]
                    "
                />

                {/* Secondary light-blue circle */}
                <div
                    aria-hidden="true"
                    className="
                        absolute left-1/2 top-1/2
                        size-[260px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-[#eaf6ff]
                        sm:size-[370px]
                        lg:size-[450px]
                    "
                />

                {/* Blue dotted pattern */}
                <div
                    aria-hidden="true"
                    className="
                        absolute right-[2%] top-[7%]
                        size-24 opacity-45
                        [background-image:radial-gradient(#0466AF_1.5px,transparent_1.5px)]
                        [background-size:12px_12px]
                        sm:size-32
                        lg:size-36
                    "
                />

                {/* Pink dotted pattern */}
                <div
                    aria-hidden="true"
                    className="
                        absolute bottom-[5%] left-[5%]
                        size-20 opacity-35
                        [background-image:radial-gradient(#c01f53_1.5px,transparent_1.5px)]
                        [background-size:12px_12px]
                        sm:size-28
                    "
                />

                {/* Yellow decorative circle */}
                <div
                    aria-hidden="true"
                    className="
                        absolute bottom-[9%] right-[4%]
                        size-16 rounded-full
                        bg-logoYellow/80
                        shadow-[0_15px_35px_rgba(247,236,34,0.25)]
                        sm:size-24
                        lg:size-28
                    "
                />

                {/* Blue decorative ring */}
                <div
                    aria-hidden="true"
                    className="
                        absolute left-[4%] top-[17%]
                        size-14 rounded-full
                        border-[5px] border-secondary/20
                        sm:size-20
                        lg:size-24
                    "
                />

                {/* Blue rounded block */}
                <div
                    aria-hidden="true"
                    className="
                        absolute left-[12%] bottom-[13%]
                        size-12 rotate-12
                        rounded-2xl
                        bg-secondary/15
                        sm:size-16
                    "
                />

                {/* Small primary circle */}
                <div
                    aria-hidden="true"
                    className="
                        absolute right-[13%] top-[31%]
                        size-5 rounded-full
                        bg-primary/30
                        sm:size-7
                    "
                />

                {/* Small blue circle */}
                <div
                    aria-hidden="true"
                    className="
                        absolute right-[20%] bottom-[20%]
                        size-6 rounded-full
                        bg-secondary/25
                        sm:size-8
                    "
                />

                {/* Plus decorations */}
                <span
                    aria-hidden="true"
                    className="
                        absolute left-[15%] top-[38%]
                        select-none text-3xl
                        font-black text-primary/20
                        sm:text-4xl
                    "
                >
                    +
                </span>

                <span
                    aria-hidden="true"
                    className="
                        absolute right-[15%] top-[17%]
                        select-none text-3xl
                        font-black text-secondary/25
                        sm:text-4xl
                    "
                >
                    +
                </span>

                {/* Circular image */}
                <div
                    className="
                        relative z-10
                        size-[275px]
                        overflow-hidden
                        rounded-full
                        border-[4px] border-white
                        bg-white
                        shadow-[0_28px_70px_rgba(15,23,42,0.17)]
                        sm:size-[385px]
                        sm:border-[5px]
                        lg:size-[460px]
                        xl:size-[490px]
                    "
                >
                    <div
                        aria-hidden="true"
                        className="
                            absolute inset-0
                            rounded-full
                            bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8),transparent_72%)]
                        "
                    />

                    <Image
                        src="/assets/study-abroad-courses-hero.png"
                        alt="Student exploring international study options"
                        fill
                        priority
                        sizes="
                            (min-width:1280px) 490px,
                            (min-width:1024px) 460px,
                            (min-width:640px) 385px,
                            275px
                        "
                        className="
                            relative z-10
                            object-cover
                            object-center
                        "
                    />
                </div>

                {/* Destination card */}
                <div
                    className="
                        absolute right-0 top-[8%] z-20
                        rounded-2xl
                        border border-white/15
                        bg-secondary
                        px-4 py-3
                        text-white
                        shadow-[0_18px_42px_rgba(192,31,83,0.32)]
                        sm:right-[1%]
                        sm:px-5 sm:py-4
                        lg:right-0
                    "
                >
                    <p className="text-lg font-black sm:text-2xl">
                        25+
                    </p>

                    <p
                        className="
                            mt-1 text-[10px]
                            font-bold text-white/80
                            sm:text-xs
                        "
                    >
                        Study destinations
                    </p>
                </div>

                {/* Students card */}
                <div
                    className="
                        absolute bottom-[7%] left-0 z-20
                        rounded-2xl
                        border border-white/15
                        bg-darkPrimary
                        px-4 py-3
                        text-white
                        shadow-[0_18px_42px_rgba(192,31,83,0.32)]
                        sm:left-[1%]
                        sm:px-5 sm:py-4
                        lg:left-0
                    "
                >
                    <p className="text-xs font-black sm:text-sm">
                        10,000+ students
                    </p>

                    <p
                        className="
                            mt-1 text-[10px]
                            font-semibold text-white/80
                            sm:text-xs
                        "
                    >
                        guided worldwide
                    </p>
                </div>
            </div>
        </div>
    );
}

function HeroStats() {
    return (
        <div className="relative z-20 px-4 pb-5 sm:px-7 sm:pb-7 lg:absolute lg:inset-x-10 lg:bottom-6 lg:p-0 xl:inset-x-14">
            <div className="grid overflow-hidden rounded-[24px] border border-white/90 bg-white/92 shadow-[0_24px_60px_rgba(32,88,130,0.14)] backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4 lg:rounded-[28px]">
                {heroStats.map(({ value, label, icon: Icon }, index) => (
                    <div
                        key={label}
                        className={`flex items-center gap-4 px-4 py-4 sm:px-5 lg:px-6 lg:py-5 ${index > 0 ? "lg:border-l lg:border-slate-200" : ""}`}
                    >
                        <span className={`grid size-12 shrink-0 place-content-center rounded-2xl sm:size-14 ${index % 2 === 0 ? "bg-primary/10 text-primary" : "bg-logoYellow/65 text-[#0c1b35]"}`}>
                            <Icon size={23} strokeWidth={2.2} />
                        </span>
                        <div>
                            <p className="text-xl font-black text-primary sm:text-2xl">{value}</p>
                            <p className="mt-0.5 text-xs font-bold text-slate-600 sm:text-sm">{label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function HeroDecorations() {
    return (
        <>
            <div aria-hidden="true" className="absolute -left-24 top-10 size-72 rounded-full bg-primary/10 blur-[90px]" />
            <div aria-hidden="true" className="absolute -right-24 top-12 size-80 rounded-full bg-secondary/10 blur-[100px]" />
            <div aria-hidden="true" className="absolute inset-0 opacity-[0.13] [background-image:radial-gradient(rgba(15,23,42,0.22)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        </>
    );
}