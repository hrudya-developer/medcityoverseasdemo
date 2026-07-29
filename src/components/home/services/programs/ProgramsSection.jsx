import {
    Globe2,
    GraduationCap,
    Send,
    ShieldCheck,
} from "lucide-react";

import mapBg from "@/assets/mapBg.png";
import Tabs from "./Tabs";

const programs = [
    {
        id: "global-education",
        icon: GraduationCap,
        title: "Global Education",
        description:
            "Explore leading universities, internationally recognized courses, and study abroad opportunities that support your academic and career goals.",
        theme: "pink",
    },
    {
        id: "global-exposure",
        icon: Globe2,
        title: "Global Exposure",
        description:
            "Study in an international environment, experience diverse cultures, and develop the global skills employers value.",
        theme: "blue",
    },
    {
        id: "secure-future",
        icon: ShieldCheck,
        title: "Secure Your Future",
        description:
            "Receive professional guidance for university admissions, student visas, documentation, and your international education journey.",
        theme: "pink",
    },
];

export default function ProgramsSection() {
    return (
        <section
            id="programs"
            aria-labelledby="programs-heading"
            className="scroll-mt-28 overflow-visible"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                    className="
            mb-14
            w-full
            overflow-visible
            bg-contain
            bg-top
            bg-no-repeat
            pb-4
          "
                    style={{
                        backgroundImage: `url(${mapBg.src})`,
                    }}
                >
                    <ProgramsHeader />

                    <ProgramsGrid />
                </div>

                <div aria-label="Explore international education programs">
                    <Tabs />
                </div>
            </div>
        </section>
    );
}

function ProgramsHeader() {
    return (
        <header
            className="mx-auto max-w-4xl text-center"
            data-aos="fade-up"
        >
            <div className="flex justify-center pb-8 pt-16">
                <span
                    className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-full
            bg-blue-100
            px-4
            py-2
            text-xs
            font-bold
            uppercase
            tracking-[0.12em]
            text-darkPrimary
          "
                >
                    <Send
                        aria-hidden="true"
                        className="h-4 w-4 text-darkPrimary"
                    />

                    Explore Our Programs
                </span>
            </div>

            <h1
                id="programs-heading"
                className="
          font-nunito
          text-3xl
          font-extrabold
          leading-tight
          text-darkPrimary
          sm:text-4xl
          lg:text-5xl
        "
            >
                Unlock Global Education
                <br />

                <span
                    className="
            bg-gradient-to-r
            from-primary
            to-secondary
            bg-clip-text
            text-transparent
          "
                >
                    Study Abroad Opportunities
                </span>
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-base font-bold text-gray-900">
                Your trusted gateway to international education, university admissions,
                student visa assistance, and immigration support.
            </p>

            <p
                className="
          mx-auto
          mt-4
          max-w-3xl
          text-sm
          leading-7
          text-slate-700
          sm:text-base
        "
            >
                Begin your international education journey with professional study
                abroad counselling and personalised support. From choosing the right
                university and course to completing admission and student visa
                procedures, our experts help make the process simple, secure, and
                stress-free.
            </p>
        </header>
    );
}

function ProgramsGrid() {
    return (
        <div
            className="
        mt-20
        grid
        grid-cols-1
        gap-x-5
        gap-y-20
        overflow-visible
        px-1
        sm:grid-cols-2
        sm:px-4
        md:grid-cols-3
      "
        >
            {programs.map((program, index) => (
                <ProgramCard
                    key={program.id}
                    program={program}
                    index={index}
                />
            ))}
        </div>
    );
}

function ProgramCard({
    program,
    index,
}) {
    const {
        id,
        icon: Icon,
        title,
        description,
        theme,
    } = program;

    const isPink = theme === "pink";

    return (
        <article
            aria-labelledby={`${id}-title`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className={`
        group
        relative
        mx-auto
        min-h-[300px]
        w-full
        max-w-[380px]
        overflow-visible
        rounded-[28px]
        border
        px-6
        pb-8
        pt-16
        text-center
        shadow-[0_14px_36px_rgba(15,23,42,0.10)]
        transition-all
        duration-500
        ease-out
        hover:-translate-y-2
        hover:shadow-[0_24px_55px_rgba(15,23,42,0.16)]

        sm:last:col-span-2
        sm:last:max-w-[380px]
        sm:last:justify-self-center

        md:last:col-span-1
        md:last:max-w-none

        ${isPink
                    ? "border-primary/20"
                    : "border-secondary/20"
                }
      `}
        >
            <CardBackground isPink={isPink} />

            <div
                className={`
          absolute
          left-1/2
          top-0
          z-30
          flex
          h-[72px]
          w-[72px]
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border-4
          border-white
          text-white
          shadow-[0_14px_30px_rgba(15,23,42,0.22)]
          transition-all
          duration-500
          group-hover:-translate-y-[58%]
          group-hover:scale-110
          ${isPink
                        ? "bg-gradient-to-br from-primary to-darkPrimary"
                        : "bg-gradient-to-br from-secondary to-blue-800"
                    }
        `}
            >
                <Icon
                    aria-hidden="true"
                    className="h-9 w-9"
                    strokeWidth={1.8}
                />
            </div>

            <DotPattern
                position="top"
                isPink={isPink}
            />

            <DotPattern
                position="bottom"
                isPink={isPink}
            />

            <div className="relative z-10">
                <h3
                    id={`${id}-title`}
                    className={`
            mb-4
            text-xl
            font-extrabold
            ${isPink
                            ? "text-darkPrimary"
                            : "text-secondary"
                        }
          `}
                >
                    {title}
                </h3>

                <div
                    aria-hidden="true"
                    className={`
            mx-auto
            mb-6
            h-1
            w-16
            rounded-full
            transition-all
            duration-500
            group-hover:w-24
            ${isPink
                            ? "bg-primary"
                            : "bg-secondary"
                        }
          `}
                />

                <p
                    className="
            mx-auto
            max-w-[290px]
            text-sm
            leading-7
            text-slate-700
            sm:text-base
          "
                >
                    {description}
                </p>
            </div>
        </article>
    );
}

function CardBackground({
    isPink,
}) {
    return (
        <div
            aria-hidden="true"
            className="
        pointer-events-none
        absolute
        inset-0
        -z-10
        overflow-hidden
        rounded-[28px]
      "
        >
            <div
                className={`
          absolute
          inset-0
          bg-gradient-to-br
          ${isPink
                        ? "from-pink-50 via-white to-rose-50"
                        : "from-blue-50 via-white to-sky-50"
                    }
        `}
            />

            <div
                className={`
          absolute
          -right-16
          -top-16
          h-44
          w-44
          rounded-full
          blur-3xl
          transition-transform
          duration-700
          group-hover:scale-125
          ${isPink
                        ? "bg-primary/20"
                        : "bg-secondary/20"
                    }
        `}
            />

            <div
                className={`
          absolute
          -bottom-20
          -left-20
          h-48
          w-48
          rounded-full
          blur-3xl
          ${isPink
                        ? "bg-primary/12"
                        : "bg-secondary/12"
                    }
        `}
            />

            <div
                className="
          absolute
          inset-0
          opacity-[0.14]
          [background-image:radial-gradient(circle,rgba(15,23,42,0.22)_1px,transparent_1px)]
          [background-size:18px_18px]
          [mask-image:linear-gradient(to_bottom_right,black,transparent_74%)]
        "
            />
        </div>
    );
}

function DotPattern({
    position,
    isPink,
}) {
    return (
        <div
            aria-hidden="true"
            className={`
        absolute
        z-10
        grid
        grid-cols-4
        gap-1
        opacity-25
        ${position === "top"
                    ? "left-7 top-8"
                    : "bottom-8 right-7"
                }
        ${isPink
                    ? "text-primary"
                    : "text-secondary"
                }
      `}
        >
            {Array.from({
                length: 16,
            }).map((_, index) => (
                <span
                    key={index}
                    className="h-1.5 w-1.5 rounded-full bg-current"
                />
            ))}
        </div>
    );
}