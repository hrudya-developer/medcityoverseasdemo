import Image from "next/image";

import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Sparkles,
} from "lucide-react";

const highlights = [
  "Personalized counselling",
  "University application support",
  "Student visa guidance",
];

export default function AcademyCentersHeader({
  totalBranches,
}) {
  return (
    <section
      className="
        relative isolate overflow-hidden
        bg-gradient-to-br
        from-[#fffafb]
        via-white
        to-[#f3f8ff]
        px-4 py-14
        sm:px-6 sm:py-16
        lg:px-8 lg:py-20
      "
    >
      <HeaderBackground />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div
          className="
            grid items-center gap-12
            lg:min-h-[600px]
            lg:grid-cols-[1.02fr_0.98fr]
            lg:gap-10
            xl:gap-16
          "
        >
          {/* ==========================================
              LEFT CONTENT
          ========================================== */}

          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            {/* Eyebrow */}
            <div
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-primary/10
                bg-white/80
                px-3 py-2
                shadow-[0_8px_30px_rgba(15,23,42,0.06)]
                backdrop-blur-xl
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
                  shadow-[0_7px_18px_rgba(192,31,83,0.22)]
                "
              >
                <Sparkles
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              </span>

              <span
                className="
                  pr-1 text-[10px]
                  font-extrabold uppercase
                  tracking-[0.18em]
                  text-primary
                  sm:text-[11px]
                "
              >
                Medcity Overseas Branch Network
              </span>
            </div>

            {/* Heading */}
            <h1
              id="branches-heading"
              className="
                mt-6
                text-3xl
                font-bold
                leading-[1.04]
                tracking-[-0.045em]
                text-[#10172a]
                sm:text-3xl
                md:text-4xl
                lg:text-5xl
              "
            >
              Study Abroad

              <span className="block">
                Consultants
              </span>

              <span
                className="
                  mt-1 block
                  bg-gradient-to-r
                  from-primary
                  via-[#a81c4c]
                  to-darkPrimary
                  bg-clip-text
                  text-transparent
                "
              >
                Across Kerala
              </span>
            </h1>

            {/* Accent */}
            <div
              aria-hidden="true"
              className="
                mx-auto mt-5
                flex items-center justify-center
                gap-1.5
                lg:mx-0 lg:justify-start
              "
            >
              <span className="h-1.5 w-16 rounded-full bg-primary" />
              <span className="h-1.5 w-7 rounded-full bg-secondary" />
              <span className="h-1.5 w-3 rounded-full bg-logoYellow" />
            </div>

            {/* Description */}
            <p
              className="
                mx-auto mt-7 max-w-xl
                text-[15px] leading-7
                text-slate-600
                sm:text-base sm:leading-8
                lg:mx-0
                lg:text-[17px]
              "
            >
              Find a Medcity Overseas branch near you
              for expert{" "}
              <strong className="font-semibold text-slate-800">
                study abroad counselling
              </strong>
              , university applications, course
              selection, student visa guidance and
              language training.
            </p>

            {/* Highlights */}
            <div
              className="
                mt-7 flex flex-wrap
                justify-center gap-2.5
                lg:justify-start
              "
            >
              {highlights.map((item) => (
                <Highlight
                  key={item}
                  text={item}
                />
              ))}
            </div>

            {/* CTAs */}
            <div
              className="
                mt-8 flex flex-col
                justify-center gap-3
                sm:flex-row
                lg:justify-start
              "
            >
              <a
                href="#branch-grid"
                className="
                  group inline-flex
                  min-h-[52px]
                  items-center justify-center
                  gap-2 rounded-2xl
                  bg-gradient-to-r
                  from-primary to-darkPrimary
                  px-7 py-3
                  text-sm font-extrabold
                  text-white
                  shadow-[0_14px_35px_rgba(192,31,83,0.22)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_20px_45px_rgba(99,26,51,0.28)]
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-primary/20
                "
              >
                Explore Our Branches

                <ArrowDown
                  className="
                    h-4 w-4
                    transition-transform
                    duration-300
                    group-hover:translate-y-1
                  "
                  aria-hidden="true"
                />
              </a>

              <a
                href="#branch-grid"
                className="
                  group inline-flex
                  min-h-[52px]
                  items-center justify-center
                  gap-2 rounded-2xl
                  border border-slate-200
                  bg-white/80
                  px-7 py-3
                  text-sm font-extrabold
                  text-slate-800
                  shadow-[0_8px_25px_rgba(15,23,42,0.05)]
                  backdrop-blur-xl
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-primary/30
                  hover:bg-white
                  hover:text-primary
                "
              >
                Find Nearby Branch

                <ArrowRight
                  className="
                    h-4 w-4
                    transition-transform
                    group-hover:translate-x-1
                  "
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* Stats */}
            <div
              className="
                mx-auto mt-10
                grid max-w-[520px]
                grid-cols-3
                divide-x divide-slate-200
                rounded-2xl
                border border-slate-200/80
                bg-white/70
                px-2 py-4
                shadow-[0_12px_35px_rgba(15,23,42,0.05)]
                backdrop-blur-xl
                lg:mx-0
              "
            >
              <Stat
                value={`${totalBranches}+`}
                label="Branches"
              />

              <Stat
                value="14+"
                label="Cities"
              />

              <Stat
                value="1:1"
                label="Guidance"
              />
            </div>
          </div>

          {/* ==========================================
              RIGHT — KERALA BRANCH MAP
          ========================================== */}

          <div
            className="
              relative mx-auto
              flex w-full max-w-[620px]
              items-center justify-center
              lg:min-h-[570px]
            "
          >
            {/* Outer decorative glow */}
            <div
              aria-hidden="true"
              className="
                absolute left-1/2 top-1/2
                h-[520px] w-[520px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-primary/[0.07]
                blur-[100px]
              "
            />

            {/* Main map panel */}
            <div
              className="
                relative
                flex min-h-[530px]
                w-full max-w-[540px]
                items-center justify-center
                overflow-hidden
                rounded-[38px]

                border border-primary/[0.10]

                bg-gradient-to-br
                from-[#ffe9f1]
                via-[#f9efff]
                to-[#e5f2ff]

                px-6 py-10

                shadow-[0_35px_90px_rgba(99,26,51,0.14)]

                sm:min-h-[560px]
                sm:px-8
                sm:py-12
              "
            >
              {/* Inner top highlight */}
              <div
                aria-hidden="true"
                className="
                  absolute inset-x-8 top-0
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-white
                  to-transparent
                "
              />

              {/* Pink glow */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  -left-20 -top-20
                  h-[280px] w-[280px]
                  rounded-full
                  bg-primary/[0.16]
                  blur-[80px]
                "
              />

              {/* Blue glow */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  -bottom-24 -right-20
                  h-[320px] w-[320px]
                  rounded-full
                  bg-secondary/[0.15]
                  blur-[90px]
                "
              />

              {/* Center map glow */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  left-1/2 top-1/2
                  h-[390px] w-[390px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-gradient-to-br
                  from-white/75
                  via-[#fff5f8]/45
                  to-[#eef7ff]/60
                  blur-[50px]
                "
              />

              {/* Large ring */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  left-1/2 top-1/2
                  h-[430px] w-[430px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border border-primary/[0.08]
                "
              />

              {/* Middle ring */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  left-1/2 top-1/2
                  h-[350px] w-[350px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border border-secondary/[0.08]
                "
              />

              {/* Small ring */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  left-1/2 top-1/2
                  h-[270px] w-[270px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border border-white/70
                "
              />

              {/* Dot decoration */}
              <div
                aria-hidden="true"
                className="
                  absolute right-4 top-4
                  h-36 w-36
                  opacity-[0.14]
                  [background-image:radial-gradient(#c01f53_1.4px,transparent_1.4px)]
                  [background-size:13px_13px]
                  [mask-image:linear-gradient(to_bottom_left,black,transparent)]
                "
              />

              <div
                aria-hidden="true"
                className="
                  absolute bottom-4 left-4
                  h-28 w-28
                  opacity-[0.10]
                  [background-image:radial-gradient(#0466AF_1.4px,transparent_1.4px)]
                  [background-size:13px_13px]
                  [mask-image:linear-gradient(to_top_right,black,transparent)]
                "
              />

              {/* Top badge */}
              <div
                className="
                  absolute left-5 top-5
                  z-20
                  inline-flex items-center
                  gap-2
                  rounded-full
                  border border-white/80
                  bg-white/85
                  px-3.5 py-2
                  text-[11px]
                  font-extrabold
                  text-darkPrimary
                  shadow-[0_12px_35px_rgba(99,26,51,0.10)]
                  backdrop-blur-xl
                  sm:left-7
                  sm:top-7
                "
              >
                <span
                  className="
                    flex h-7 w-7
                    items-center justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-primary/15
                    to-primary/5
                    text-primary
                  "
                >
                  <MapPin
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                </span>

                Our Presence Across Kerala
              </div>

              {/* Map */}
              <div
                className="
                  relative z-10
                  flex w-full
                  items-center justify-center
                  pt-10
                "
              >
                <Image
                  src="/assets/medcity-branches-kerala.png"
                  alt="Medcity Overseas study abroad branch locations across Kerala"
                  width={408}
                  height={612}
                  priority
                  sizes="
                    (max-width: 640px) 260px,
                    (max-width: 1024px) 330px,
                    360px
                  "
                  className="
                    h-auto
                    w-[260px]
                    object-contain
                    drop-shadow-[0_28px_35px_rgba(15,23,42,0.18)]
                    transition-transform
                    duration-500
                    hover:scale-[1.025]
                    sm:w-[320px]
                    lg:w-[350px]
                  "
                />
              </div>

              {/* Branch count */}
              <div
                className="
                  absolute bottom-5 left-5
                  z-20
                  flex items-center gap-3
                  rounded-2xl
                  border border-white/90
                  bg-white/90
                  px-4 py-3
                  shadow-[0_18px_45px_rgba(99,26,51,0.12)]
                  backdrop-blur-xl
                  sm:bottom-7
                  sm:left-7
                "
              >
                <span
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-xl
                    bg-gradient-to-br
                    from-primary
                    to-darkPrimary
                    text-white
                    shadow-[0_8px_20px_rgba(192,31,83,0.25)]
                  "
                >
                  <MapPin
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <p className="text-lg font-black leading-none text-darkPrimary">
                    {totalBranches}+
                  </p>

                  <p
                    className="
                      mt-1
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-[0.1em]
                      text-slate-400
                    "
                  >
                    Branch Locations
                  </p>
                </div>
              </div>

              {/* Availability */}
              <div
                className="
                  absolute bottom-7 right-7
                  z-20 hidden
                  rounded-2xl
                  border border-white/90
                  bg-white/90
                  px-4 py-3
                  shadow-[0_18px_45px_rgba(15,23,42,0.08)]
                  backdrop-blur-xl
                  sm:block
                "
              >
                <div className="flex items-center gap-2">
                  <span
                    className="
                      relative flex
                      h-2.5 w-2.5
                    "
                  >
                    <span
                      className="
                        absolute inline-flex
                        h-full w-full
                        animate-ping
                        rounded-full
                        bg-emerald-400
                        opacity-50
                      "
                    />

                    <span
                      className="
                        relative inline-flex
                        h-2.5 w-2.5
                        rounded-full
                        bg-emerald-500
                      "
                    />
                  </span>

                  <span className="text-[11px] font-extrabold text-slate-700">
                    Counselling Available
                  </span>
                </div>

                <p className="mt-1 pl-[18px] text-[10px] text-slate-400">
                  Multiple locations
                </p>
              </div>
            </div>

            {/* Outside decoration */}
            <div
              aria-hidden="true"
              className="
                absolute -right-2 top-[14%]
                hidden h-20 w-20
                rounded-full
                border border-secondary/[0.10]
                xl:block
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute -right-7 top-[21%]
                hidden h-3 w-3
                rounded-full
                bg-secondary/30
                xl:block
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute -left-2 bottom-[13%]
                hidden h-14 w-14
                rounded-full
                border border-primary/[0.10]
                xl:block
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   HIGHLIGHT
========================================== */

function Highlight({ text }) {
  return (
    <div
      className="
        inline-flex items-center gap-2
        rounded-full
        border border-slate-200/80
        bg-white/75
        px-3.5 py-2
        shadow-[0_7px_20px_rgba(15,23,42,0.04)]
        backdrop-blur-lg
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-primary/20
        hover:bg-white
      "
    >
      <span
        className="
          flex h-5 w-5
          shrink-0
          items-center justify-center
          rounded-full
          bg-primary/[0.08]
        "
      >
        <CheckCircle2
          className="h-3.5 w-3.5 text-primary"
          strokeWidth={2.7}
          aria-hidden="true"
        />
      </span>

      <span className="text-xs font-bold text-slate-600 sm:text-[13px]">
        {text}
      </span>
    </div>
  );
}

/* ==========================================
   STAT
========================================== */

function Stat({ value, label }) {
  return (
    <div className="px-2 text-center sm:px-5">
      <p
        className="
          bg-gradient-to-r
          from-primary
          to-darkPrimary
          bg-clip-text
          text-xl font-black
          text-transparent
          sm:text-2xl
        "
      >
        {value}
      </p>

      <p
        className="
          mt-1
          text-[9px]
          font-extrabold
          uppercase
          tracking-[0.1em]
          text-slate-400
          sm:text-[10px]
        "
      >
        {label}
      </p>
    </div>
  );
}

/* ==========================================
   BACKGROUND
========================================== */

function HeaderBackground() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute inset-0
        -z-10 overflow-hidden
      "
    >
      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #631A33 1px, transparent 1px), linear-gradient(to bottom, #631A33 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />

      {/* Left pink glow */}
      <div
        className="
          absolute
          -left-48 top-0
          h-[500px] w-[500px]
          rounded-full
          bg-primary/[0.08]
          blur-[130px]
        "
      />

      {/* Right blue glow */}
      <div
        className="
          absolute
          -right-48 bottom-[-100px]
          h-[520px] w-[520px]
          rounded-full
          bg-secondary/[0.08]
          blur-[140px]
        "
      />

      {/* Center glow */}
      <div
        className="
          absolute
          left-1/2 top-1/2
          h-[250px] w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-logoYellow/[0.035]
          blur-[100px]
        "
      />

      {/* Dots */}
      <div
        className="
          absolute
          left-[3%] top-[12%]
          h-40 w-40
          opacity-[0.11]
          [background-image:radial-gradient(#c01f53_1.3px,transparent_1.3px)]
          [background-size:14px_14px]
        "
      />

      {/* Bottom fade */}
      <div
        className="
          absolute inset-x-0 bottom-0
          h-28
          bg-gradient-to-t
          from-white/70
          to-transparent
        "
      />
    </div>
  );
}