import {
    ArrowRight,
    Globe2,
    GraduationCap,
    MapPin,
    Plane,
    Sparkles,
  } from "lucide-react";
  
  export default function DestinationHero() {
    return (
      <section
        aria-labelledby="destinations-page-heading"
        className="
          relative
          isolate
          flex
          min-h-[460px]
          items-center
          overflow-hidden
          bg-gradient-to-br
          from-white
          via-[#fff8fb]
          to-[#eef7ff]
          px-4
          py-16
          sm:min-h-[500px]
          sm:px-6
          lg:min-h-[540px]
          lg:px-8
        "
        style={{
          backgroundImage:
            "url('/assets/mapBg.png')",
          backgroundSize: "cover",
          backgroundRepeat:
            "no-repeat",
          backgroundPosition:
            "center",
        }}
      >
        {/* ==================================================
            BACKGROUND OVERLAY
        ================================================== */}
  
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0
            -z-20
            bg-gradient-to-b
            from-white/35
            via-white/80
            to-white
          "
        />
  
        {/* ==================================================
            AMBIENT GLOWS
        ================================================== */}
  
        <div
          aria-hidden="true"
          className="
            absolute
            -left-28
            top-0
            -z-10
            h-[360px]
            w-[360px]
            rounded-full
            bg-primary/10
            blur-[100px]
          "
        />
  
        <div
          aria-hidden="true"
          className="
            absolute
            -right-24
            bottom-0
            -z-10
            h-[380px]
            w-[380px]
            rounded-full
            bg-secondary/10
            blur-[105px]
          "
        />
  
        {/* ==================================================
            DECORATIVE DOTS
        ================================================== */}
  
        <div
          aria-hidden="true"
          className="
            absolute
            left-[6%]
            top-20
            hidden
            h-28
            w-28
            opacity-[0.10]
            sm:block
            [background-image:radial-gradient(#c01f53_1.4px,transparent_1.4px)]
            [background-size:14px_14px]
          "
        />
  
        <div
          aria-hidden="true"
          className="
            absolute
            bottom-16
            right-[6%]
            hidden
            h-28
            w-28
            opacity-[0.10]
            sm:block
            [background-image:radial-gradient(#0466af_1.4px,transparent_1.4px)]
            [background-size:14px_14px]
          "
        />
  
        {/* ==================================================
            CONTENT
        ================================================== */}
  
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-6xl
            flex-col
            items-center
            text-center
          "
        >
          {/* EYEBROW */}
  
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-primary/15
              bg-white/90
              p-1.5
              pr-4
              text-[11px]
              font-extrabold
              uppercase
              tracking-[0.16em]
              text-primary
              shadow-[0_12px_35px_rgba(99,26,51,0.08)]
              backdrop-blur-xl
              sm:text-xs
            "
          >
            <span
              aria-hidden="true"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-primary
                to-darkPrimary
                text-white
                shadow-md
                shadow-primary/20
              "
            >
              <Globe2 className="h-4 w-4" />
            </span>
  
            Study Abroad Destinations
          </div>
  
          {/* H1 */}
  
          <h1
            id="destinations-page-heading"
            className="
              mt-6
              max-w-5xl
              font-nunito
              text-3xl
              font-black
              leading-[1.08]
              tracking-[-0.04em]
              text-darkPrimary
              sm:text-4xl
              md:text-5xl
              lg:text-[56px]
            "
          >
            Top Study Abroad Destinations{" "}
  
            <span
              className="
                bg-gradient-to-r
                from-primary
                via-[#db3d70]
                to-secondary
                bg-clip-text
                text-transparent
              "
            >
              for Indian Students
            </span>
          </h1>
  
          {/* ACCENT */}
  
          <div
            aria-hidden="true"
            className="
              mt-5
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <span className="h-1.5 w-16 rounded-full bg-primary" />
            <span className="h-1.5 w-7 rounded-full bg-secondary" />
            <span className="h-1.5 w-3 rounded-full bg-logoYellow" />
          </div>
  
          {/* SEO INTRO */}
  
          <p
            className="
              mt-6
              max-w-4xl
              text-sm
              leading-7
              text-slate-600
              sm:text-base
              sm:leading-8
              lg:text-lg
            "
          >
            Explore leading study abroad destinations including Germany,
            the UK, Australia, Ireland, New Zealand, the USA and more.
            Compare international education opportunities, universities,
            courses and student pathways to find the right destination
            for your future.
          </p>
  
          {/* TRUST / FEATURE CHIPS */}
  
          <div
            className="
              mt-8
              flex
              flex-wrap
              items-center
              justify-center
              gap-3
            "
          >
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-2xl
                border
                border-primary/10
                bg-white/90
                px-4
                py-3
                text-sm
                font-bold
                text-slate-700
                shadow-[0_10px_30px_rgba(15,23,42,0.06)]
                backdrop-blur
              "
            >
              <GraduationCap className="h-4 w-4 text-primary" />
  
              Leading universities
            </div>
  
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-2xl
                border
                border-secondary/10
                bg-white/90
                px-4
                py-3
                text-sm
                font-bold
                text-slate-700
                shadow-[0_10px_30px_rgba(15,23,42,0.06)]
                backdrop-blur
              "
            >
              <MapPin className="h-4 w-4 text-secondary" />
  
              Popular study countries
            </div>
  
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-2xl
                border
                border-primary/10
                bg-white/90
                px-4
                py-3
                text-sm
                font-bold
                text-slate-700
                shadow-[0_10px_30px_rgba(15,23,42,0.06)]
                backdrop-blur
              "
            >
              <Plane className="h-4 w-4 text-primary" />
  
              Study abroad guidance
            </div>
          </div>
  
          {/* SMALL SUPPORTING LINE */}
  
          <div
            className="
              mt-7
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-slate-500
            "
          >
            <Sparkles
              aria-hidden="true"
              className="h-4 w-4 text-secondary"
            />
  
            Discover your ideal destination and begin your overseas
            education journey.
  
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 text-primary"
            />
          </div>
        </div>
      </section>
    );
  }