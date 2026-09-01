import Link from "next/link";

import {
  ArrowRight,
  Building2,
  Globe2,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function CountryUniversitiesHero({
  countryName,
  universityCount,
}) {
  const countrySlug = countryName
    ?.toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  return (
    <section className="relative isolate overflow-hidden bg-[#280653] text-white">
      {/* =====================================================
          DEEP DARK BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          bg-gradient-to-br
          from-[#170252]
          via-[#06172f]
          to-[#53042b]
        "
      />

      {/* =====================================================
          LARGE GRID
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          opacity-[0.13]
          [background-image:linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)]
          [background-size:48px_48px]
        "
      />

      {/* =====================================================
          SMALL GRID
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          opacity-[0.045]
          [background-image:linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)]
          [background-size:24px_24px]
        "
      />

      {/* =====================================================
          PRIMARY GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          -right-48
          -top-52
          h-[620px]
          w-[620px]
          rounded-full
          bg-primary/20
          blur-[150px]
        "
      />

      {/* =====================================================
          SECONDARY GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          -bottom-60
          left-[8%]
          h-[560px]
          w-[560px]
          rounded-full
          bg-secondary/20
          blur-[160px]
        "
      />

      {/* =====================================================
          DARK PRIMARY GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          right-[22%]
          top-[10%]
          h-[400px]
          w-[400px]
          rounded-full
          bg-darkPrimary/30
          blur-[130px]
        "
      />

      {/* =====================================================
          CENTER BLUE LIGHT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          left-[42%]
          top-1/2
          h-[300px]
          w-[500px]
          -translate-y-1/2
          rounded-full
          bg-secondary/[0.07]
          blur-[110px]
        "
      />

      {/* =====================================================
          TOP RIGHT DOTS
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          right-[5%]
          top-10
          hidden
          grid-cols-7
          gap-3
          opacity-20
          xl:grid
        "
      >
        {Array.from({
          length: 42,
        }).map((_, index) => (
          <span
            key={index}
            className="size-1 rounded-full bg-white"
          />
        ))}
      </div>

      {/* =====================================================
          EDGE DARKENING
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,8,23,0.38)_100%)]
        "
      />

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          grid
          min-h-[460px]
          max-w-7xl
          items-center
          gap-12
          px-5
          py-14
          sm:px-6
          sm:py-16
          lg:grid-cols-[1.12fr_.88fr]
          lg:px-8
          lg:py-16
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
              flex-wrap
              items-center
              justify-center
              gap-2
              text-sm
              text-white/50
              lg:justify-start
            "
          >
            <Link
              href="/"
              className="transition duration-300 hover:text-white"
            >
              Home
            </Link>

            <span className="text-white/25">
              /
            </span>

            <Link
              href="/universities"
              className="transition duration-300 hover:text-white"
            >
              Universities
            </Link>

            <span className="text-white/25">
              /
            </span>

            <span className="font-semibold text-white/90">
              {countryName}
            </span>
          </nav>

          {/* BADGE */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/[0.07]
              px-4
              py-2
              shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
              backdrop-blur-md
            "
          >
            <span className="grid size-6 place-items-center rounded-full bg-logoYellow text-darkPrimary">
              <Sparkles size={12} />
            </span>

            <span className="text-[11px] font-black uppercase tracking-[0.17em] text-logoYellow">
              International Universities
            </span>
          </div>

          {/* HEADING */}

          <h1
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-3xl
              font-extrabold
              leading-[1.06]
              tracking-[-0.04em]
              text-white
              sm:text-4xl
              lg:mx-0
              lg:text-5xl
            "
          >
            Universities in{" "}

            <span
              className="
                bg-gradient-to-r
                from-[#ffffff]
                via-[#ffd3e1]
                to-[#8bcaff]
                bg-clip-text
                text-transparent
              "
            >
              {countryName}
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-base
              leading-8
              text-white/65
              sm:text-lg
              lg:mx-0
            "
          >
            Discover leading universities,
            institutions, courses and
            international study opportunities
            available in {countryName}.
          </p>

          {/* CTA */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              items-center
              justify-center
              gap-3
              lg:justify-start
            "
          >
            <a
              href="#universities"
              className="
                group
                inline-flex
                items-center
                gap-3
                rounded-xl
                bg-primary
                px-6
                py-3.5
                text-sm
                font-bold
                text-white
                shadow-[0_16px_40px_rgba(192,31,83,0.35)]
                transition
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#d12660]
                hover:shadow-[0_20px_50px_rgba(192,31,83,0.45)]
              "
            >
              Explore Universities

              <span className="grid size-7 place-items-center rounded-full bg-white/15">
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </a>

            <Link
              href={`/study-in-${countrySlug}`}
              className="
                inline-flex
                items-center
                gap-2.5
                rounded-xl
                border
                border-white/12
                bg-white/[0.07]
                px-6
                py-3.5
                text-sm
                font-bold
                text-white
                shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                backdrop-blur-md
                transition
                duration-300
                hover:-translate-y-0.5
                hover:border-white/20
                hover:bg-white/[0.12]
              "
            >
              <Globe2
                size={17}
                className="text-[#8bcaff]"
              />

              Study in {countryName}
            </Link>
          </div>

          {/* MINI INFO */}

          <div
            className="
              mx-auto
              mt-9
              flex
              max-w-xl
              flex-wrap
              items-center
              justify-center
              gap-x-7
              gap-y-3
              text-xs
              font-semibold
              text-white/45
              lg:mx-0
              lg:justify-start
            "
          >
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />

              Global institutions
            </span>

            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-secondary" />

              International programs
            </span>

            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-logoYellow" />

              Study opportunities
            </span>
          </div>
        </div>

        {/* =================================================
            RIGHT VISUAL
        ================================================= */}

        <div className="relative hidden h-[360px] lg:block">
          {/* LARGE BACK GLOW */}

          <div
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-1/2
              h-[300px]
              w-[360px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-primary/15
              blur-[80px]
            "
          />

          {/* DECORATIVE VERTICAL LINE */}

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-[8%]
              right-[3%]
              top-[8%]
              w-px
              bg-gradient-to-b
              from-transparent
              via-white/15
              to-transparent
            "
          />

          {/* =================================================
              MAIN DESTINATION CARD
          ================================================= */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              w-[370px]
              -translate-x-1/2
              -translate-y-1/2
              overflow-hidden
              rounded-[2rem]
              border
              border-white/[0.13]
              bg-white/[0.075]
              p-6
              shadow-[0_35px_90px_rgba(0,0,0,0.32)]
              backdrop-blur-xl
            "
          >
            {/* CARD GRID */}

            <div
              aria-hidden="true"
              className="
                absolute inset-0
                opacity-[0.10]
                [background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)]
                [background-size:28px_28px]
              "
            />

            {/* TOP COLOR LINE */}

            <div
              aria-hidden="true"
              className="
                absolute
                inset-x-0
                top-0
                h-[3px]
                bg-gradient-to-r
                from-primary
                via-logoYellow
                to-secondary
              "
            />

            {/* PRIMARY CARD GLOW */}

            <div
              aria-hidden="true"
              className="
                absolute
                -right-16
                -top-20
                size-52
                rounded-full
                bg-primary/25
                blur-[65px]
              "
            />

            {/* SECONDARY CARD GLOW */}

            <div
              aria-hidden="true"
              className="
                absolute
                -bottom-20
                -left-20
                size-52
                rounded-full
                bg-secondary/20
                blur-[65px]
              "
            />

            {/* TOP ROW */}

            <div className="relative z-10 flex items-start justify-between gap-5">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-black/10
                  px-3
                  py-1.5
                  backdrop-blur
                "
              >
                <MapPin
                  size={13}
                  className="text-logoYellow"
                />

                <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white/65">
                  Study Destination
                </span>
              </div>

              <span
                className="
                  grid
                  size-11
                  place-items-center
                  rounded-2xl
                  bg-white
                  text-primary
                  shadow-[0_12px_30px_rgba(0,0,0,0.2)]
                "
              >
                <GraduationCap size={20} />
              </span>
            </div>

            {/* COUNTRY */}

            <div className="relative z-10 mt-7">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                Explore
              </p>

              <h2
                className="
                  mt-1.5
                  text-[2.65rem]
                  font-black
                  leading-none
                  tracking-[-0.045em]
                  text-white
                "
              >
                {countryName}
              </h2>

              <p className="mt-3 max-w-[270px] text-sm leading-6 text-white/55">
                Discover leading institutions
                and global study opportunities.
              </p>
            </div>

            {/* STATS */}

            <div className="relative z-10 mt-7 grid grid-cols-2 gap-3">
              {/* UNIVERSITIES */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.10]
                  bg-white/[0.07]
                  p-3.5
                  backdrop-blur-md
                "
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-[0_8px_20px_rgba(192,31,83,0.25)]">
                    <Building2 size={17} />
                  </span>

                  <div>
                    <p className="text-xl font-black leading-none text-white">
                      {universityCount}
                    </p>

                    <p className="mt-1.5 text-[10px] font-semibold text-white/45">
                      Universities
                    </p>
                  </div>
                </div>
              </div>

              {/* STUDY HUB */}

              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.10]
                  bg-white/[0.07]
                  p-3.5
                  backdrop-blur-md
                "
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-white shadow-[0_8px_20px_rgba(4,102,175,0.25)]">
                    <Globe2 size={17} />
                  </span>

                  <div>
                    <p className="text-xs font-black leading-4 text-white">
                      Global
                    </p>

                    <p className="mt-1 text-[10px] font-semibold text-white/45">
                      Study Hub
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        

          {/* DECORATIVE DOTS */}

          <span className="absolute left-[7%] top-[18%] size-2 rounded-full bg-primary shadow-[0_0_15px_rgba(192,31,83,0.8)]" />

          <span className="absolute bottom-[17%] right-[7%] size-2 rounded-full bg-secondary shadow-[0_0_15px_rgba(4,102,175,0.8)]" />

          <span className="absolute bottom-[8%] right-[26%] size-1.5 rounded-full bg-logoYellow shadow-[0_0_12px_rgba(247,236,34,0.6)]" />
        </div>
      </div>

      {/* =====================================================
          BOTTOM FADE
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          bottom-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/15
          to-transparent
        "
      />
    </section>
  );
}