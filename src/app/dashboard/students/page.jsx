"use client";

import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    BookOpen,
    FileText,
    GraduationCap,
    Heart,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

const QUICK_ACTIONS = [
    {
        icon: FileText,
        title: "My Applications",
        value: "0",
        description:
            "Track submitted applications",
        href:
            "/dashboard/students/applications",
        gradient:
            "from-rose-50 via-white to-white",
    },
    {
        icon: Heart,
        title: "My Wishlist",
        value: "0",
        description:
            "Saved courses for later",
        href:
            "/dashboard/students/wishlist",
        gradient:
            "from-purple-50 via-white to-white",
    },
    {
        icon: BookOpen,
        title: "Find Courses",
        value: "Explore",
        description:
            "Search courses globally",
        href:
            "/dashboard/students/courses",
        gradient:
            "from-sky-50 via-white to-white",
    },
    {
        icon: GraduationCap,
        title: "Counselling",
        value: "Book Now",
        description:
            "Get expert guidance from our counsellors",
        href:
            "/dashboard/students/counselling",
        gradient:
            "from-emerald-50 via-white to-white",
    },
];

export default function StudentDashboardPage() {
    const [
        studentName,
        setStudentName,
    ] = useState("Student");

    useEffect(() => {
        let active =
            true;

        async function loadSession() {
            try {
                const response =
                    await fetch(
                        "/api/auth/session",
                        {
                            method:
                                "GET",

                            credentials:
                                "include",

                            cache:
                                "no-store",
                        }
                    );

                const data =
                    await response
                        .json()
                        .catch(
                            () => null
                        );

                if (
                    !active ||
                    !response.ok
                ) {
                    return;
                }

                const name =
                    data?.user?.name
                        ?.trim();

                if (name) {
                    setStudentName(
                        name
                    );
                }
            } catch (error) {
                console.error(
                    "Unable to load dashboard session:",
                    error
                );
            }
        }

        loadSession();

        return () => {
            active =
                false;
        };
    }, []);

    return (
        <div
            className="
                mx-auto
                w-full
                max-w-[1500px]

                space-y-5

                sm:space-y-6
            "
        >
            <DashboardHero
                studentName={
                    studentName
                }
            />

            <QuickActions />

            <MissionBanner />
        </div>
    );
}

function DashboardHero({
    studentName,
}) {
    return (
        <section
            className="
                relative

                min-h-[270px]

                overflow-hidden

                rounded-[30px]

                bg-[#111943]

                shadow-[0_18px_45px_rgba(15,23,42,0.10)]

                sm:min-h-[320px]
            "
        >
            <Image
                src="/assets/study-abroad-student.png"
                alt="Student exploring study abroad opportunities"
                fill
                priority
                sizes="
                    (max-width: 768px) 100vw,
                    80vw
                "
                className="
                    object-cover
                    object-center
                "
            />

            <div
                aria-hidden="true"
                className="
                    absolute
                    inset-0

                    bg-gradient-to-r

                    from-[#050816]/95

                    via-[#111943]/80

                    to-[#111943]/10
                "
            />

            <div
                aria-hidden="true"
                className="
                    pointer-events-none

                    absolute

                    -left-20
                    bottom-[-120px]

                    h-80
                    w-80

                    rounded-full

                    bg-[#d51a62]/25

                    blur-[90px]
                "
            />

            <div
                className="
                    relative

                    flex
                    min-h-[270px]

                    items-center

                    p-6

                    sm:min-h-[320px]
                    sm:p-8

                    lg:p-10
                "
            >
                <div className="max-w-xl">
                    <div
                        className="
                            inline-flex

                            items-center

                            rounded-full

                            border
                            border-white/15

                            bg-white/10

                            px-3
                            py-1.5

                            text-xs
                            font-semibold

                            text-white/90

                            backdrop-blur-md
                        "
                    >
                        Welcome 
                        <span
                            className="
                                ml-1
                                font-black
                                text-white
                            "
                        >
                           back 
                        </span>

                        <span className="ml-1">
                            👋
                        </span>
                    </div>

                    <h1
                        className="
                            mt-5

                            text-4xl
                            font-black

                            leading-[1.05]

                            tracking-[-0.04em]

                            text-white

                            sm:text-5xl

                            lg:text-6xl
                        "
                    >
                        Your Dream,

                        <span
                            className="
                                block
                                text-[#ff2c75]
                            "
                        >
                            Our Guidance
                        </span>
                    </h1>

                    <p
                        className="
                            mt-4

                            text-sm

                            font-medium

                            text-white/70

                            sm:text-base
                        "
                    >
                        Discover. Learn.
                        Achieve.
                    </p>

                    <Link
                        href="/dashboard/students/courses"
                        className="
                            mt-6

                            inline-flex

                            items-center

                            gap-2.5

                            rounded-xl

                            bg-white

                            px-5
                            py-3

                            text-sm
                            font-bold

                            text-[#111943]

                            shadow-[0_10px_25px_rgba(0,0,0,0.18)]

                            transition-all
                            duration-200

                            hover:-translate-y-0.5
                            hover:bg-slate-50

                            active:translate-y-0
                        "
                    >
                        Find a Course

                        <ArrowRight
                            size={16}
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}

function QuickActions() {
    return (
        <section
            className="
                grid

                grid-cols-1

                gap-4

                sm:grid-cols-2

                xl:grid-cols-4
            "
        >
            {QUICK_ACTIONS.map(
                (item) => (
                    <QuickActionCard
                        key={
                            item.title
                        }
                        {...item}
                    />
                )
            )}
        </section>
    );
}

function QuickActionCard({
    icon: Icon,
    title,
    value,
    description,
    href,
    gradient,
}) {
    return (
        <Link
            href={href}
            className={`
                group

                relative

                overflow-hidden

                rounded-3xl

                border
                border-slate-100

                bg-gradient-to-br

                ${gradient}

                p-5

                shadow-[0_8px_25px_rgba(15,23,42,0.045)]

                transition-all
                duration-200

                hover:-translate-y-1

                hover:border-[#d51a62]/10

                hover:shadow-[0_16px_38px_rgba(15,23,42,0.08)]

                sm:p-6
            `}
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none

                    absolute

                    -right-10
                    -top-10

                    h-28
                    w-28

                    rounded-full

                    bg-white/80

                    blur-2xl
                "
            />

            <div
                className="
                    relative

                    flex

                    items-start

                    justify-between
                "
            >
                <div
                    className="
                        grid

                        h-11
                        w-11

                        place-items-center

                        rounded-2xl

                        bg-white

                        text-[#d51a62]

                        shadow-sm
                    "
                >
                    <Icon
                        size={21}
                    />
                </div>

                <ArrowRight
                    size={17}
                    className="
                        text-slate-300

                        transition-all

                        group-hover:translate-x-1

                        group-hover:text-[#d51a62]
                    "
                />
            </div>

            <div className="relative">
                <p
                    className="
                        mt-5

                        text-sm

                        font-black

                        text-[#111943]
                    "
                >
                    {title}
                </p>

                <p
                    className="
                        mt-2

                        text-2xl

                        font-black

                        tracking-[-0.03em]

                        text-indigo-600
                    "
                >
                    {value}
                </p>

                <p
                    className="
                        mt-2

                        text-xs

                        font-medium

                        leading-5

                        text-slate-500
                    "
                >
                    {description}
                </p>
            </div>
        </Link>
    );
}

function MissionBanner() {
    return (
        <section
            className="
                relative

                overflow-hidden

                rounded-[28px]

                bg-gradient-to-r

                from-[#101a4d]

                via-[#5b245a]

                to-[#d51a62]

                p-6

                text-white

                shadow-[0_16px_38px_rgba(15,23,42,0.10)]

                sm:p-8
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none

                    absolute

                    -right-16
                    -top-20

                    h-56
                    w-56

                    rounded-full

                    bg-white/10

                    blur-3xl
                "
            />

            <div
                className="
                    relative

                    flex

                    flex-col

                    gap-5

                    md:flex-row
                    md:items-center
                    md:justify-between
                "
            >
                <div
                    className="
                        flex

                        items-center

                        gap-4
                    "
                >
                    <div
                        className="
                            grid

                            h-12
                            w-12

                            shrink-0

                            place-items-center

                            rounded-xl

                            border
                            border-cyan-300/40

                            bg-white/10

                            backdrop-blur-md
                        "
                    >
                        <GraduationCap
                            size={23}
                        />
                    </div>

                    <div>
                        <h2
                            className="
                                text-xl

                                font-black

                                tracking-[-0.02em]

                                sm:text-2xl
                            "
                        >
                            Your Future,
                            Our Mission
                        </h2>

                        <p
                            className="
                                mt-1

                                text-sm

                                text-white/70
                            "
                        >
                            We’re here to
                            help you achieve
                            your dreams.
                        </p>
                    </div>
                </div>

                <Link
                    href="/dashboard/students/courses"
                    className="
                        inline-flex

                        w-fit

                        items-center

                        gap-2

                        rounded-xl

                        bg-white

                        px-5
                        py-3

                        text-sm
                        font-bold

                        text-[#111943]

                        shadow-lg

                        transition-all

                        hover:-translate-y-0.5
                        hover:bg-slate-50
                    "
                >
                    Explore Courses

                    <ArrowRight
                        size={16}
                    />
                </Link>
            </div>
        </section>
    );
}