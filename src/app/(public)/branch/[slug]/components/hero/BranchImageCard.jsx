import Image from "next/image";
import { MapPin } from "lucide-react";

export default function BranchImageCard({
  center,
  location,
  branchName,
}) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-slate-200/70
        bg-white
        shadow-[0_18px_50px_rgba(15,23,42,0.08)]
        transition-all
        duration-500

        hover:-translate-y-1
        hover:shadow-[0_24px_65px_rgba(15,23,42,0.11)]

        md:mt-[28px]
        md:h-[455px]
      "
    >
      {/* subtle top highlight */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-8
          right-8
          top-0
          z-20
          h-px
          bg-gradient-to-r
          from-transparent
          via-secondary/30
          to-transparent
        "
      />

      <div
        className="
          flex
          h-full
          flex-col
        "
      >
        {/* =========================================
            IMAGE
        ========================================= */}

        <div
          className="
            relative
            min-h-[320px]
            flex-1
            overflow-hidden
            bg-[#f5f9fd]

            sm:min-h-[360px]
            md:min-h-0
          "
        >
          <Image
            src={center.image}
            alt={`${branchName} study abroad consultants in ${location}`}
            fill
            priority
            sizes="
              (max-width: 767px) 92vw,
              (max-width: 1279px) 45vw,
              380px
            "
            className="
              object-cover
              object-center
              transition-transform
              duration-700
              group-hover:scale-[1.02]
            "
          />
        </div>

        {/* =========================================
            BRANCH INFO
        ========================================= */}

        <div
          className="
            relative
            flex
            shrink-0
            items-center
            gap-3
            overflow-hidden
            border-t
            border-slate-100
            bg-white
            px-5
            py-4
          "
        >
          {/* pink glow */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-14
              -left-10
              h-28
              w-28
              rounded-full
              bg-primary/[0.07]
              blur-2xl
            "
          />

          {/* blue glow */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-10
              -top-12
              h-24
              w-24
              rounded-full
              bg-secondary/[0.06]
              blur-2xl
            "
          />

          {/* accent */}

          <span
            aria-hidden="true"
            className="
              absolute
              bottom-0
              left-0
              top-0
              w-[4px]
              bg-gradient-to-b
              from-primary
              via-[#df4a78]
              to-secondary
            "
          />

          {/* location icon */}

          <span
            className="
              relative
              z-10
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-primary/10
              bg-[#fff0f5]
              text-primary
            "
          >
            <MapPin
              className="h-[18px] w-[18px]"
              aria-hidden="true"
            />
          </span>

          {/* branch */}

          <div
            className="
              relative
              z-10
              min-w-0
            "
          >
            <p
              className="
                truncate
                text-sm
                font-black
                text-darkPrimary
                sm:text-[15px]
              "
            >
              {branchName}
            </p>

            <p
              className="
                mt-1
                truncate
                text-[11px]
                font-medium
                text-slate-500
              "
            >
              {center?.city}

              {center?.state
                ? `, ${center.state}`
                : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}