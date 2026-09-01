import Link from "next/link";

import {
  ArrowUpRight,
  Building2,
  MapPin,
  Sparkles,
} from "lucide-react";

import { createSlug } from "@/lib/slug";

export default function DestinationCard({
  destination,
}) {
  const name = destination.destinationName;
  const slug = createSlug(name);

  return (
    <Link
      href={`/universities-in-${slug}`}
      aria-label={`Explore universities in ${name}`}
      className="
        group
        relative
        isolate
        flex
        min-h-[320px]
        flex-col
        overflow-hidden
        rounded-[2rem]
        border
        border-primary/10
        bg-white
        p-7
        shadow-[0_14px_40px_rgba(15,23,42,0.08)]
        transition
        duration-500
        hover:-translate-y-2
        hover:border-primary/30
        hover:shadow-[0_30px_75px_rgba(99,26,51,0.18)]
      "
    >
      {/* COLORFUL TOP STRIP */}
      <div
        className="
          absolute
          inset-x-0
          top-0
          h-1.5
          bg-gradient-to-r
          from-primary
          via-secondary
          to-logoYellow
        "
      />

      {/* BACKGROUND COLOR BLOBS */}
      <div
        aria-hidden="true"
        className="
          absolute
          -right-14
          -top-16
          h-44
          w-44
          rounded-full
          bg-primary/20
          blur-3xl
          transition
          duration-500
          group-hover:bg-primary/30
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          -bottom-16
          -left-16
          h-48
          w-48
          rounded-full
          bg-secondary/20
          blur-3xl
          transition
          duration-500
          group-hover:bg-secondary/30
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          left-1/2
          top-1/2
          h-36
          w-36
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-logoYellow/10
          blur-3xl
        "
      />

      {/* SOFT COLOR WASH */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-primary/[0.04]
          via-white
          to-secondary/[0.06]
        "
      />

      {/* DOT PATTERN */}
      <div
        aria-hidden="true"
        className="absolute right-6 top-7 grid grid-cols-4 gap-2 opacity-30"
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className="size-1.5 rounded-full bg-primary"
          />
        ))}
      </div>

      {/* TOP ROW */}
      <div className="relative z-10 flex items-start justify-between">
        <div
          className="
            relative
            grid
            size-16
            place-items-center
            rounded-[1.35rem]
            bg-gradient-to-br
            from-primary
            via-darkPrimary
            to-secondary
            text-white
            shadow-[0_12px_28px_rgba(99,26,51,0.25)]
            transition
            duration-500
            group-hover:-rotate-6
            group-hover:scale-110
          "
        >
          <MapPin size={25} strokeWidth={2.2} />

          <span
            className="
              absolute
              -right-1
              -top-1
              grid
              size-6
              place-items-center
              rounded-full
              border-2
              border-white
              bg-logoYellow
              text-darkPrimary
              shadow-sm
            "
          >
            <Sparkles size={11} />
          </span>
        </div>

        <div
          className="
            grid
            size-11
            place-items-center
            rounded-full
            bg-secondary
            text-white
            shadow-[0_10px_25px_rgba(4,102,175,0.25)]
            transition
            duration-500
            group-hover:rotate-12
            group-hover:scale-110
            group-hover:bg-primary
          "
        >
          <ArrowUpRight size={19} strokeWidth={2.4} />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mt-8">
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-secondary/15
            bg-secondary/10
            px-3.5
            py-1.5
            text-[11px]
            font-black
            uppercase
            tracking-[0.14em]
            text-secondary
          "
        >
          <Building2 size={13} />

          Study in {name}
        </div>

        <h3
          className="
            mt-4
            text-[1.35rem]
            font-black
            leading-[1.22]
            tracking-[-0.025em]
            text-darkPrimary
            transition
            duration-300
            group-hover:text-primary
          "
        >
          Universities in {name}
        </h3>

        <p className="mt-3 max-w-[95%] text-sm leading-6 text-slate-600">
          Explore top universities, courses and international
          study opportunities available in {name}.
        </p>
      </div>

      {/* CTA */}
      <div
        className="
          relative
          z-10
          mt-auto
          flex
          items-center
          justify-between
          pt-7
        "
      >
        <span
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-black
            text-primary
          "
        >
          View Universities

          <ArrowUpRight
            size={16}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          />
        </span>

        <span
          className="
            rounded-full
            bg-logoYellow/80
            px-3
            py-1
            text-[10px]
            font-black
            uppercase
            tracking-[0.12em]
            text-darkPrimary
          "
        >
          Explore
        </span>
      </div>

      {/* BOTTOM GRADIENT */}
      <div
        aria-hidden="true"
        className="
          absolute
          bottom-0
          left-0
          h-[4px]
          w-full
          scale-x-0
          bg-gradient-to-r
          from-primary
          via-secondary
          to-logoYellow
          transition-transform
          duration-500
          group-hover:scale-x-100
        "
      />
    </Link>
  );
}