import cn from "@/lib/cn";

import {
    BriefcaseBusiness,
    Globe2,
    Users,
} from "lucide-react";

const workData = [
    {
        id: "international-destinations",
        icon: Globe2,
        title: "International Work Destinations",
        description:
            "Explore study abroad destinations where international students can gain valuable work experience while they learn.",
        color: "text-primary",
        border: "from-primary to-red-400",
        background: "bg-pink-50",
    },
    {
        id: "in-demand-jobs",
        icon: BriefcaseBusiness,
        title: "In-Demand Job Opportunities",
        description:
            "Explore high-demand industries and part-time job opportunities that can support your studies and help build your career abroad.",
        color: "text-secondary",
        border: "from-secondary to-blue-500",
        background: "bg-blue-50",
    },
    {
        id: "cultural-exchange",
        icon: Users,
        title: "Cultural Exchange and Networking",
        description:
            "Build a global professional network, gain international work experience, and develop skills valued by employers worldwide.",
        color: "text-primary",
        border: "from-primary to-red-400",
        background: "bg-rose-50",
    },
];

export default function WorkTabContent() {
    return (
        <section
            aria-labelledby="work-opportunities-heading"
            className="overflow-hidden bg-gradient-to-b from-white to-gray-100 py-10"
        >
            <div className="mx-auto max-w-7xl px-3 sm:px-5 md:px-8">
                <WorkHeader />

                <WorkGrid />
            </div>
        </section>
    );
}

function WorkHeader() {
    return (
        <header className="mx-auto max-w-4xl text-center">
            <div
                aria-hidden="true"
                className="mb-5 flex items-center justify-center gap-4"
            >
                <div className="h-[2px] w-16 bg-primary sm:w-24" />

                <div
                    className="flex size-14 items-center justify-center rounded-full border border-primary text-primary"
                >
                    <BriefcaseBusiness
                        aria-hidden="true"
                        className="size-6"
                    />
                </div>

                <div className="h-[2px] w-16 bg-primary sm:w-24" />
            </div>

            <p
                className="inline-flex rounded-full bg-secondary/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary"
            >
                Study and Work Abroad
            </p>

            <h2
                id="work-opportunities-heading"
                className="mt-3 text-3xl font-extrabold leading-tight text-darkPrimary sm:text-4xl lg:text-5xl"
            >
                International Job Opportunities for
                <br />

                <span
                    className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                >
                    Study Abroad Students
                </span>
            </h2>

            <div
                aria-hidden="true"
                className="mx-auto mt-5 h-1 w-20 rounded-full bg-primary"
            />

            <p
                className="mx-auto mt-8 max-w-4xl text-sm leading-7 text-slate-800 sm:text-base md:text-lg md:leading-8"
            >
                Studying abroad offers more than an international degree.
                Many countries provide part-time work opportunities,
                post-study work pathways, and hands-on industry experience
                that help students manage expenses and build global career
                prospects.
            </p>
        </header>
    );
}

function WorkGrid() {
    return (
        <div
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
            {workData.map((item, index) => (
                <WorkCard
                    key={item.id}
                    item={item}
                    index={index}
                />
            ))}
        </div>
    );
}

function WorkCard({
    item,
    index,
}) {
    const Icon = item.icon;

    return (
        <article
            aria-labelledby={`${item.id}-heading`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="group relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[32px] border border-slate-100 bg-white p-7 shadow-[0_14px_38px_rgba(15,23,42,0.08)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_55px_rgba(15,23,42,0.15)] sm:p-8 lg:max-w-none"
        >
            <CardBackground item={item} />

            <div className="relative z-10 flex justify-center">
                <div
                    aria-hidden="true"
                    className={cn(`
            relative
            flex
            size-24
            items-center
            justify-center
            rounded-full
            ${item.background}
            transition-transform
            duration-500
            group-hover:scale-105
            sm:size-28
          `)}
                >
                    <Icon
                        className={`size-9 sm:size-10 ${item.color}`}
                        strokeWidth={1.8}
                    />

                    <div
                        className="absolute inset-0 animate-spin rounded-full border-2 border-dashed border-primary/30 [animation-duration:12s] motion-reduce:animate-none"
                    />
                </div>
            </div>

            <h3
                id={`${item.id}-heading`}
                className="relative z-10 mt-7 text-center text-xl font-extrabold text-slate-950"
            >
                {item.title}
            </h3>

            <div
                aria-hidden="true"
                className={cn(`
          relative
          z-10
          mx-auto
          mt-4
          h-1
          w-16
          rounded-full
          bg-gradient-to-r
          ${item.border}
          transition-all
          duration-500
          group-hover:w-24
        `)}
            />

            <p
                className="relative z-10 mt-5 text-center text-sm leading-7 text-slate-700 sm:text-base"
            >
                {item.description}
            </p>

            <div
                aria-hidden="true"
                className={cn(`
          absolute
          bottom-0
          left-0
          h-2
          w-full
          bg-gradient-to-r
          ${item.border}
        `)}
            />
        </article>
    );
}

function CardBackground({
    item,
}) {
    return (
        <>
            <div
                aria-hidden="true"
                className={cn(`
          pointer-events-none
          absolute
          -right-16
          -top-16
          size-44
          rounded-full
          ${item.background}
          opacity-70
          blur-3xl
          transition-transform
          duration-700
          group-hover:scale-125
        `)}
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -left-20 size-48 rounded-full bg-slate-100 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle,rgba(15,23,42,0.28)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom_right,black,transparent_75%)]"
            />
        </>
    );
}