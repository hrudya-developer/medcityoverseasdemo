import Link from "next/link";

import {
  ArrowRight,
  Building2,
  Globe2,
  GraduationCap,
  MapPin,
  Plane,
  Search,
  ShieldCheck,
} from "lucide-react";

export default function UniversitiesHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f8fbff]">
      {/* =====================================================
          BACKGROUND GLOWS
      ===================================================== */}

      <div
        aria-hidden="true"
        className="absolute -left-44 -top-48 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-secondary/10 blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-[-150px] right-[-100px] h-[420px] w-[420px] rounded-full bg-darkPrimary/10 blur-[110px]"
      />

      {/* =====================================================
          DOT PATTERN
      ===================================================== */}

      <div
        aria-hidden="true"
        className="absolute right-10 top-10 hidden grid-cols-6 gap-3 opacity-30 lg:grid"
      >
        {Array.from({ length: 36 }).map((_, index) => (
          <span
            key={index}
            className="size-1.5 rounded-full bg-primary/60"
          />
        ))}
      </div>

      {/* =====================================================
          HERO CONTAINER
      ===================================================== */}

      <div
        className="
          relative mx-auto grid
          min-h-[560px]
          max-w-7xl
          items-center
          px-5 py-14
          sm:px-6
          md:min-h-[600px]
          md:py-16
          lg:min-h-[650px]
          lg:grid-cols-[1.02fr_.98fr]
          lg:gap-12
          lg:px-8
          lg:py-20
        "
      >
        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="relative z-10 text-center lg:text-left">
          {/* BREADCRUMB */}

          <nav
            aria-label="Breadcrumb"
            className="
              mb-7
              flex
              items-center
              justify-center
              gap-2
              text-sm
              text-slate-500
              lg:justify-start
            "
          >
            <Link
              href="/"
              className="transition hover:text-primary"
            >
              Home
            </Link>

            <span>/</span>

            <span className="font-semibold text-slate-700">
              Universities
            </span>
          </nav>

          {/* BADGE */}

          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-primary/20
              bg-white/80
              px-4
              py-2
              text-xs
              font-black
              uppercase
              tracking-[0.14em]
              text-primary
              shadow-sm
              backdrop-blur
            "
          >
            <GraduationCap size={16} />

            Global Universities
          </span>

          {/* TITLE */}

          <h1
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-3xl
              font-extrabold
              leading-[1.08]
              tracking-[-0.035em]
              text-darkPrimary
              sm:text-4xl
              md:text-5xl
              lg:mx-0
              lg:max-w-2xl
              lg:text-5xl
            "
          >
            Explore Universities

            <span
              className="
                ml-2
                bg-gradient-to-r
                from-primary
                via-darkPrimary
                to-secondary
                bg-clip-text
                text-transparent
                sm:ml-3
              "
            >
              Abroad
            </span>

            <span className="mt-2 block">
              for Indian Students
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-6
              max-w-xl
              text-base
              leading-7
              text-slate-600
              sm:text-lg
              sm:leading-8
              lg:mx-0
            "
          >
            Discover international universities across leading
            study destinations. Compare institutions, courses and
            global study opportunities to build your future.
          </p>

          {/* CTA */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              items-center
              justify-center
              gap-4
              lg:justify-start
            "
          >
            <a
              href="#study-destinations"
              className="
                group
                inline-flex
                items-center
                gap-3
                rounded-xl
                bg-primary
                px-7
                py-3
                text-sm
                font-semibold
                text-white
                shadow-[0_16px_35px_rgba(192,31,83,0.22)]
                transition
                duration-300
                hover:-translate-y-0.5
                hover:bg-darkPrimary
              "
            >
              Explore Destinations

              <span
                className="
                  grid
                  size-8
                  place-items-center
                  rounded-full
                  bg-white
                  text-primary
                "
              >
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </a>

            <Link
              href="/courses"
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-secondary
                bg-secondary
                px-7
                py-3
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#03558f]
              "
            >
              <Search size={17} />

              Find a Course
            </Link>
          </div>

          {/* =================================================
              SMALL BENEFITS
          ================================================= */}

          <div
            className="
              mx-auto
              mt-10
              grid
              max-w-xl
              gap-4
              sm:grid-cols-3
              sm:gap-5
              lg:mx-0
            "
          >
            <HeroFeature
              icon={<Building2 size={19} />}
              title="Global Universities"
              className="bg-primary/10 text-primary"
            />

            <HeroFeature
              icon={<Globe2 size={19} />}
              title="Study Destinations"
              className="bg-secondary/10 text-secondary"
            />

            <HeroFeature
              icon={<ShieldCheck size={19} />}
              title="Expert Guidance"
              className="bg-darkPrimary/10 text-darkPrimary"
            />
          </div>
        </div>

        {/* =================================================
            RIGHT VISUAL
        ================================================= */}

        <HeroVisual />
      </div>

      {/* =====================================================
          MOBILE/TABLET DECORATIVE BOTTOM GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          bottom-[-100px]
          left-1/2
          h-[220px]
          w-[80%]
          -translate-x-1/2
          rounded-full
          bg-gradient-to-r
          from-primary/10
          via-darkPrimary/10
          to-secondary/10
          blur-[80px]
          lg:hidden
        "
      />
    </section>
  );
}

/* =========================================================
   FEATURE
========================================================= */

function HeroFeature({
  icon,
  title,
  className,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        gap-3
        lg:justify-start
      "
    >
      <span
        className={`
          grid
          size-11
          shrink-0
          place-items-center
          rounded-2xl
          ${className}
        `}
      >
        {icon}
      </span>

      <span className="text-left text-sm font-bold leading-5 text-slate-700">
        {title}
      </span>
    </div>
  );
}

/* =========================================================
   RIGHT VISUAL
========================================================= */

function HeroVisual() {
  return (
    <div className="relative hidden min-h-[540px] lg:block">
      {/* =====================================================
          OUTER ORBITS
      ===================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-dashed
          border-secondary/25
        "
      />

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[440px]
          w-[440px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-primary/20
        "
      />

      {/* =====================================================
          PLANE
      ===================================================== */}

      <div className="absolute right-20 top-4 z-20 rotate-[18deg] text-primary">
        <Plane
          size={34}
          fill="currentColor"
          strokeWidth={1.5}
        />
      </div>

      {/* PLANE PATH */}

      <div
        className="
          absolute
          right-24
          top-14
          h-[120px]
          w-[220px]
          rotate-[-10deg]
          rounded-[50%]
          border-t-2
          border-dashed
          border-primary/40
        "
      />

      {/* =====================================================
          MAIN GLOBE
      ===================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[370px]
          w-[370px]
          -translate-x-1/2
          -translate-y-1/2
          overflow-hidden
          rounded-full
          bg-gradient-to-br
          from-primary
          via-darkPrimary
          to-secondary
          shadow-[0_35px_100px_rgba(99,26,51,0.35)]
        "
      >
        {/* MAIN COLOR OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-tr
            from-darkPrimary/40
            via-primary/10
            to-secondary/40
          "
        />

        {/* PRIMARY GLOW */}

        <div
          className="
            absolute
            -left-16
            -top-20
            h-56
            w-56
            rounded-full
            bg-primary/40
            blur-[65px]
          "
        />

        {/* SECONDARY GLOW */}

        <div
          className="
            absolute
            -bottom-20
            -right-16
            h-64
            w-64
            rounded-full
            bg-secondary/45
            blur-[70px]
          "
        />

        {/* DARK PRIMARY DEPTH */}

        <div
          className="
            absolute
            bottom-[-40px]
            left-[25%]
            h-52
            w-52
            rounded-full
            bg-darkPrimary/45
            blur-[55px]
          "
        />

        {/* TOP HIGHLIGHT */}

        <div
          className="
            absolute
            left-[18%]
            top-[9%]
            h-[120px]
            w-[180px]
            rotate-[-22deg]
            rounded-full
            bg-white/10
            blur-2xl
          "
        />

        {/* =====================================================
            LONGITUDE LINES
        ===================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-[7%]
            h-[86%]
            w-[34%]
            -translate-x-1/2
            rounded-[50%]
            border
            border-white/20
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-[7%]
            h-[86%]
            w-[66%]
            -translate-x-1/2
            rounded-[50%]
            border
            border-white/15
          "
        />

        {/* =====================================================
            LATITUDE LINES
        ===================================================== */}

        <div
          className="
            absolute
            left-[7%]
            top-[31%]
            h-[38%]
            w-[86%]
            rounded-[50%]
            border
            border-white/15
          "
        />

        <div
          className="
            absolute
            left-[12%]
            top-[43%]
            h-[20%]
            w-[76%]
            rounded-[50%]
            border
            border-white/15
          "
        />

        {/* CONTINENT DOTS */}

        <GlobeDots />

        {/* =====================================================
            CENTER MESSAGE
        ===================================================== */}

        <div className="absolute inset-0 grid place-items-center">
          <div
            className="
              rounded-3xl
              border
              border-white/20
              bg-white/10
              px-7
              py-5
              text-center
              shadow-[0_20px_50px_rgba(0,0,0,0.15)]
              backdrop-blur-md
            "
          >
            <div
              className="
                mx-auto
                grid
                size-12
                place-items-center
                rounded-full
                bg-white
                text-primary
                shadow-lg
              "
            >
              <Search size={22} />
            </div>

            <p className="mt-3 text-sm font-black leading-5 text-white">
              Your Future
              <br />
              Starts Here
            </p>
          </div>
        </div>

        {/* =====================================================
            NETWORK POINTS
        ===================================================== */}

        <span className="absolute left-[16%] top-[44%] size-2 rounded-full bg-white shadow-[0_0_14px_white]" />

        <span className="absolute right-[17%] top-[33%] size-2 rounded-full bg-white shadow-[0_0_14px_white]" />

        <span className="absolute bottom-[18%] left-[48%] size-2 rounded-full bg-white shadow-[0_0_14px_white]" />

        <span className="absolute bottom-[28%] right-[22%] size-1.5 rounded-full bg-white shadow-[0_0_12px_white]" />
      </div>

      {/* =====================================================
          ORBIT LOCATION 1
      ===================================================== */}

      <span
        className="
          absolute
          left-8
          top-[46%]
          grid
          size-10
          place-items-center
          rounded-full
          border
          border-secondary/20
          bg-white
          text-secondary
          shadow-md
        "
      >
        <MapPin size={18} />
      </span>

      {/* =====================================================
          ORBIT LOCATION 2
      ===================================================== */}

      <span
        className="
          absolute
          bottom-16
          right-12
          grid
          size-9
          place-items-center
          rounded-full
          border
          border-primary/20
          bg-white
          text-primary
          shadow-md
        "
      >
        <MapPin size={16} />
      </span>

      {/* =====================================================
          DECORATIVE SMALL POINTS
      ===================================================== */}

      <span className="absolute bottom-[25%] left-[13%] size-2 rounded-full bg-primary/50" />

      <span className="absolute right-[10%] top-[34%] size-2 rounded-full bg-secondary/50" />

      <span className="absolute right-[23%] top-[15%] size-1.5 rounded-full bg-darkPrimary/50" />
    </div>
  );
}

/* =========================================================
   GLOBE DOTS
========================================================= */

function GlobeDots() {
  const dots = [
    [18, 30],
    [22, 28],
    [26, 32],
    [30, 30],
    [34, 34],
    [38, 30],
    [42, 31],
    [46, 36],
    [50, 34],
    [54, 38],
    [58, 36],
    [62, 39],
    [66, 42],
    [70, 41],
    [74, 45],

    [25, 40],
    [29, 43],
    [33, 42],
    [37, 46],
    [41, 43],
    [45, 48],
    [49, 46],
    [53, 50],
    [57, 47],
    [61, 51],
    [65, 49],
    [69, 53],

    [32, 54],
    [36, 57],
    [40, 55],
    [44, 60],
    [48, 57],
    [52, 61],
    [56, 59],
    [60, 63],

    [41, 66],
    [45, 69],
    [49, 67],
    [53, 71],

    [65, 30],
    [68, 32],
    [72, 34],
    [75, 36],
    [78, 38],
  ];

  return (
    <>
      {dots.map(([left, top], index) => (
        <span
          key={index}
          className="
            absolute
            size-1.5
            rounded-full
            bg-white/80
            shadow-[0_0_7px_rgba(255,255,255,0.45)]
          "
          style={{
            left: `${left}%`,
            top: `${top}%`,
          }}
        />
      ))}
    </>
  );
}