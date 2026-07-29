import {
    ArrowDown,
    Building2,
    CheckCircle2,
    MapPin,
} from "lucide-react";

import BranchBreadcrumb from "./BranchBreadcrumb";

const stats = [
    {
        value: "18+",
        label: "Branches",
    },
    {
        value: "14+",
        label: "Cities",
    },
    {
        value: "1:1",
        label: "Guidance",
    },
];

const highlights = [
    "Easy-to-reach locations",
    "Experienced counsellors",
    "Personalized support",
];

export default function AcademyCentersHeader({
    totalBranches,
}) {
    return (
        <section
            className="
        relative isolate mx-auto
        w-full overflow-hidden
        bg-gradient-to-br
        from-white via-[#fff8fb] to-[#edf6ff]
        px-4 pb-10 pt-16
        sm:px-6
        lg:px-8
      "
        >
            <HeaderBackground />

            <div
                className="
          relative z-10 mx-auto
          flex min-h-[520px]
          max-w-[1200px]
          flex-col items-center
          justify-center
          text-center
        "
            >
                <BranchBreadcrumb />

                <div
                    className="
            inline-flex items-center gap-2
            rounded-full
            border border-primary/15
            bg-white/85
            px-4 py-1.5
            text-[10px] font-extrabold
            uppercase tracking-[0.16em]
            text-primary
            shadow-[0_8px_25px_rgba(192,31,83,0.08)]
            backdrop-blur-md
            sm:text-xs
          "
                >
                    <span
                        className="
              flex h-8 w-8
              items-center justify-center
              rounded-full
              bg-gradient-to-br
              from-primary to-darkPrimary
              text-white
              shadow-[0_7px_18px_rgba(192,31,83,0.25)]
            "
                    >
                        <Building2 className="h-4 w-4" />
                    </span>

                    Our Presence
                </div>

                <h1
                    id="branches-heading"
                    className="
            mt-5
            text-3xl font-extrabold
            leading-tight text-darkPrimary
            sm:text-4xl lg:text-5xl
          "
                >
                    <span className="text-primary">
                        {totalBranches}+ <br />
                    </span>

                    Medcity Study Abroad Branches <br />

                    <span className="text-primary">
                        Across Kerala
                    </span>
                </h1>

                <div className="mt-6 flex items-center justify-center gap-2">
                    <span className="h-1.5 w-16 rounded-full bg-primary" />
                    <span className="h-1.5 w-9 rounded-full bg-secondary" />
                    <span className="h-1.5 w-4 rounded-full bg-logoYellow" />
                </div>

                <p
                    className="
            mt-6 max-w-3xl
            text-sm leading-7
            text-slate-600
            sm:text-base sm:leading-8
            lg:text-lg
          "
                >
                    Access trusted study abroad counselling,
                    university admission support, visa guidance
                    and personalized assistance through{" "}
                    <span className="font-extrabold text-darkPrimary">
                        {totalBranches}+ Medcity Study Abroad
                        branches
                    </span>{" "}
                    across Kerala.
                </p>

                <div
                    className="
            mt-7 flex max-w-3xl
            flex-wrap items-center
            justify-center gap-x-6 gap-y-3
          "
                >
                    {highlights.map((item) => (
                        <Highlight
                            key={item}
                            text={item}
                        />
                    ))}
                </div>

                <div
                    className="
            mt-9 grid w-full
            max-w-2xl grid-cols-3
            gap-2.5 sm:gap-4
          "
                >
                    {stats.map((item) => (
                        <StatCard
                            key={item.label}
                            value={item.value}
                            label={item.label}
                        />
                    ))}
                </div>

                <div
                    className="
            mt-9 flex w-full
            flex-col items-center
            justify-center gap-3
            sm:w-auto sm:flex-row
          "
                >
                    <a
                        href="#branch-grid"
                        className="
              group inline-flex min-h-[50px]
              w-full items-center
              justify-center gap-2
              rounded-xl
              bg-gradient-to-r
              from-primary to-darkPrimary
              px-7 py-3
              text-sm font-extrabold
              text-white
              shadow-[0_14px_30px_rgba(192,31,83,0.24)]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_18px_38px_rgba(192,31,83,0.32)]
              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-primary/20
              sm:w-auto
            "
                    >
                        Explore Our Branches

                        <ArrowDown
                            className="
                h-4 w-4
                transition-transform duration-300
                group-hover:translate-y-1
              "
                        />
                    </a>

                    <a
                        href="#branch-grid"
                        className="
              inline-flex min-h-[50px]
              w-full items-center
              justify-center gap-2
              rounded-xl
              border border-primary/20
              bg-white/85
              px-6 py-3
              text-sm font-extrabold
              text-darkPrimary
              shadow-[0_8px_24px_rgba(15,23,42,0.06)]
              backdrop-blur-md
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-primary
              hover:bg-primary/[0.05]
              sm:w-auto
            "
                    >
                        <MapPin className="h-4 w-4 text-primary" />
                        View All Locations
                    </a>
                </div>
            </div>
        </section>
    );
}

function Highlight({ text }) {
    return (
        <div
            className="
        flex items-center gap-2
        rounded-full
        border border-slate-200/70
        bg-white/70
        px-3 py-2
        shadow-[0_7px_20px_rgba(15,23,42,0.04)]
        backdrop-blur-sm
      "
        >
            <span
                className="
          flex h-5 w-5 shrink-0
          items-center justify-center
          rounded-full
          bg-primary/[0.08]
        "
            >
                <CheckCircle2
                    className="h-3.5 w-3.5 text-primary"
                    strokeWidth={2.6}
                />
            </span>

            <span className="text-xs font-bold text-slate-600 sm:text-[13px]">
                {text}
            </span>
        </div>
    );
}

function StatCard({ value, label }) {
    return (
        <div
            className="
        group rounded-2xl
        border border-white/80
        bg-white/75
        px-2 py-4
        text-center
        shadow-[0_12px_32px_rgba(15,23,42,0.07)]
        backdrop-blur-md
        transition-all duration-300
        hover:-translate-y-1
        hover:border-primary/20
        hover:bg-white
        hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)]
        sm:px-5 sm:py-5
      "
        >
            <p
                className="
          bg-gradient-to-r
          from-primary to-darkPrimary
          bg-clip-text
          text-xl font-black
          text-transparent
          sm:text-3xl
        "
            >
                {value}
            </p>

            <p
                className="
          mt-1 text-[10px]
          font-bold uppercase
          tracking-[0.08em]
          text-slate-500
          sm:text-xs
        "
            >
                {label}
            </p>
        </div>
    );
}

function HeaderBackground() {
    return (
        <div
            aria-hidden="true"
            className="
        pointer-events-none
        absolute inset-0 -z-10
        overflow-hidden
      "
        >
            <div
                className="
          absolute -left-28 -top-28
          h-[380px] w-[380px]
          rounded-full
          bg-primary/[0.11]
          blur-[100px]
        "
            />

            <div
                className="
          absolute -bottom-36 -right-28
          h-[440px] w-[440px]
          rounded-full
          bg-secondary/[0.11]
          blur-[110px]
        "
            />

            <div
                className="
          absolute left-1/2 top-[44%]
          h-48 w-96
          -translate-x-1/2
          rounded-full
          bg-logoYellow/[0.07]
          blur-[90px]
        "
            />

            <div
                className="
          absolute left-5 top-8
          h-40 w-40
          opacity-20
          [background-image:radial-gradient(#c01f53_1.2px,transparent_1.2px)]
          [background-size:13px_13px]
          [mask-image:linear-gradient(to_bottom_right,black,transparent_80%)]
        "
            />

            <div
                className="
          absolute bottom-5 right-5
          h-44 w-44
          opacity-[0.13]
          [background-image:radial-gradient(#0466AF_1.3px,transparent_1.3px)]
          [background-size:14px_14px]
          [mask-image:linear-gradient(to_top_left,black,transparent_80%)]
        "
            />

            <div
                className="
          absolute -left-28 bottom-[-130px]
          h-80 w-80 rounded-full
          border border-primary/[0.08]
        "
            />

            <div
                className="
          absolute -left-12 bottom-[-90px]
          h-56 w-56 rounded-full
          border border-primary/[0.08]
        "
            />

            <div
                className="
          absolute -right-32 top-[-120px]
          h-96 w-96 rounded-full
          border border-secondary/[0.08]
        "
            />

            <div
                className="
          absolute -right-10 top-[-60px]
          h-64 w-64 rounded-full
          border border-secondary/[0.08]
        "
            />

            <div
                className="
          absolute left-[8%] top-[42%]
          hidden h-12 w-12
          items-center justify-center
          rounded-2xl
          border border-primary/10
          bg-white/70
          text-primary
          shadow-[0_14px_35px_rgba(15,23,42,0.07)]
          backdrop-blur-md
          lg:flex
        "
            >
                <MapPin className="h-5 w-5" />
            </div>

            <div
                className="
          absolute right-[8%] top-[30%]
          hidden h-14 w-14
          -rotate-6
          items-center justify-center
          rounded-2xl
          border border-secondary/10
          bg-white/70
          text-secondary
          shadow-[0_14px_35px_rgba(15,23,42,0.07)]
          backdrop-blur-md
          lg:flex
        "
            >
                <Building2 className="h-6 w-6" />
            </div>

            <div
                className="
          absolute inset-x-0 top-1/2
          h-px
          bg-gradient-to-r
          from-transparent
          via-primary/[0.06]
          to-transparent
        "
            />
        </div>
    );
}