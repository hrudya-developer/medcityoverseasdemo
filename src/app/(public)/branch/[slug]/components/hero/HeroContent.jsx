import Link from "next/link";

import {
  ArrowRight,
  Building2,
  MapPin,
  Sparkles,
} from "lucide-react";

import TrustPoint from "./TrustPoint";

export default function HeroContent({
  center,
  location,
  branchName,
  description,
}) {
  return (
    <div
      className="
        mx-auto
        w-full
        max-w-[680px]
        text-center
        xl:mx-0
        xl:text-left
      "
    >
      {/* Tag */}

      <div
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-primary/10
          bg-white/90
          px-4
          py-2
          shadow-[0_8px_28px_rgba(99,26,51,0.07)]
          backdrop-blur-xl
        "
      >
        <span
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            bg-primary/10
            text-primary
          "
        >
          <Sparkles
            className="h-3.5 w-3.5"
            aria-hidden="true"
          />
        </span>

        <span
          className="
            text-[10px]
            font-black
            uppercase
            tracking-[0.19em]
            text-primary
            sm:text-[11px]
          "
        >
          Medcity Overseas
        </span>
      </div>

      {/* Heading */}

      <h1
        className="
          mx-auto
          mt-6
          max-w-[660px]
          text-3xl
          font-black
          leading-[1.08]
          tracking-[-0.035em]
          text-darkPrimary
          sm:text-4xl
          md:text-5xl
          xl:mx-0
        "
      >
        Study Abroad Consultants in{" "}
        <span
          className="
            relative
            inline-block
            text-primary
          "
        >
          {location}

          <span
            aria-hidden="true"
            className="
              absolute
              -bottom-2
              left-1/2
              h-[4px]
              w-14
              -translate-x-1/2
              rounded-full
              bg-logoYellow
              xl:left-0
              xl:translate-x-0
            "
          />
        </span>
      </h1>

      {/* Description */}

      <p
        className="
          mx-auto
          mt-7
          max-w-[620px]
          text-sm
          leading-7
          text-slate-600
          sm:text-[15px]
          md:text-base
          xl:mx-0
        "
      >
        {description}
      </p>

      {/* Branch identity */}

      <div
        className="
          mt-7
          flex
          items-center
          justify-center
          gap-3
          xl:justify-start
        "
      >
        <span
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-secondary/10
            bg-secondary/[0.08]
            text-secondary
            shadow-sm
          "
        >
          <Building2
            className="h-5 w-5"
            aria-hidden="true"
          />
        </span>

        <div className="text-left">
          <h2
            className="
              text-sm
              font-black
              text-darkPrimary
              sm:text-base
            "
          >
            {branchName}
          </h2>

          <p
            className="
              mt-1
              text-[11px]
              text-slate-500
              sm:text-xs
            "
          >
            {center?.city}

            {center?.state
              ? `, ${center.state}`
              : ""}
          </p>
        </div>
      </div>

      {/* CTA */}

      <div
        className="
          mt-8
          flex
          flex-wrap
          items-center
          justify-center
          gap-3
          xl:justify-start
        "
      >
        <Link
          href="/contact-us"
          className="
            group
            inline-flex
            min-h-[50px]
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-primary
            to-darkPrimary
            px-6
            text-sm
            font-extrabold
            text-white
            shadow-[0_16px_35px_rgba(192,31,83,0.20)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-[0_20px_42px_rgba(99,26,51,0.24)]
          "
        >
          Book Free Counselling

          <ArrowRight
            className="
              h-4
              w-4
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
            aria-hidden="true"
          />
        </Link>

        <a
          href="#branch-location"
          className="
            inline-flex
            min-h-[50px]
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-slate-200
            bg-white/90
            px-6
            text-sm
            font-bold
            text-darkPrimary
            shadow-[0_8px_24px_rgba(15,23,42,0.05)]
            backdrop-blur
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-primary/25
            hover:text-primary
          "
        >
          <MapPin
            className="h-4 w-4"
            aria-hidden="true"
          />

          Get Directions
        </a>
      </div>

      {/* Trust */}

      <div
        className="
          mt-6
          flex
          flex-wrap
          justify-center
          gap-x-5
          gap-y-2
          text-[11px]
          font-semibold
          text-slate-500
          xl:justify-start
        "
      >
        <TrustPoint
          text="Expert counsellors"
        />

        <TrustPoint
          text="University guidance"
        />

        <TrustPoint
          text="Visa assistance"
        />
      </div>
    </div>
  );
}