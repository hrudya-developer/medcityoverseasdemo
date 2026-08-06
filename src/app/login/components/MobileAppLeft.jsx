import Image from "next/image";

import {
    Building2,
    GraduationCap,
    Headphones,
    Plane,
    Star,
    Users,
} from "lucide-react";

import mobileAppImage from "@/assets/appImage.png";

const decorativeIcons = [
    {
        Icon: GraduationCap,
        position: "left-[3%] top-[20%]",
        color: "text-[#d30b55]",
        delay: "0s",
    },
    {
        Icon: Plane,
        position: "left-[1%] top-[51%]",
        color: "text-[#0879c9]",
        delay: "0.6s",
    },
    {
        Icon: Users,
        position: "right-[1%] top-[45%]",
        color: "text-[#d30b55]",
        delay: "1.1s",
    },
    {
        Icon: Headphones,
        position: "bottom-[8%] left-[7%]",
        color: "text-orange-500",
        delay: "1.6s",
    },
    {
        Icon: Building2,
        position: "bottom-[2%] right-[15%]",
        color: "text-[#0879c9]",
        delay: "2s",
    },
];

function OrbitBall({
    orbitClassName,
    ballClassName,
    duration = "18s",
    delay = "0s",
    reverse = false,
}) {
    return (
        <div
            aria-hidden="true"
            className={`
        pointer-events-none absolute
        left-1/2 top-[51%]
        -translate-x-1/2 -translate-y-1/2
        ${orbitClassName}
      `}
        >
            <div
                className={`
          relative h-full w-full
          ${reverse
                        ? "login-orbit-reverse-spin"
                        : "login-orbit-spin"}
        `}
                style={{
                    animationDuration: duration,
                    animationDelay: delay,
                }}
            >
                <span
                    className={`
            absolute left-1/2 top-0
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            ${ballClassName}
          `}
                />
            </div>
        </div>
    );
}

export default function MobileAppLeft() {
    return (
        <section
            aria-label="Medcity Study Abroad mobile application"
            className="
        relative flex h-full min-h-0 w-full
        items-center justify-center overflow-hidden
        bg-[radial-gradient(circle_at_50%_52%,rgba(223,22,88,0.1),transparent_40%),linear-gradient(145deg,#ffffff_0%,#fff8fb_55%,#f7f8ff_100%)]
      "
        >
            {/* Fine dotted background */}
            <div
                aria-hidden="true"
                className="
          pointer-events-none absolute inset-0
          opacity-[0.045]
          [background-image:radial-gradient(#c01f53_1px,transparent_1px)]
          [background-size:20px_20px]
        "
            />

            {/* Responsive illustration stage */}
            <div
                className="
          relative aspect-square
          w-[min(350px,92%)]
          shrink-0
        "
            >
                {/* Center glow */}
                <div
                    aria-hidden="true"
                    className="
            absolute left-1/2 top-[51%]
            aspect-square w-[72%]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-gradient-to-br
            from-[#d30b55]/20
            via-pink-100/30
            to-[#0879c9]/15
            blur-2xl
          "
                />

                {/* Outer orbit line */}
                <div
                    aria-hidden="true"
                    className="
            absolute left-1/2 top-[51%]
            aspect-square w-[80%]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            border border-dashed border-[#d30b55]/25
          "
                />

                {/* Outer orbit balls */}
                <OrbitBall
                    orbitClassName="aspect-square w-[80%]"
                    ballClassName="
            h-2.5 w-2.5
            bg-[#d30b55]
            shadow-[0_0_14px_rgba(211,11,85,0.8)]
          "
                    duration="18s"
                />

                <OrbitBall
                    orbitClassName="aspect-square w-[80%]"
                    ballClassName="
            h-2.5 w-2.5
            bg-[#0879c9]
            shadow-[0_0_14px_rgba(8,121,201,0.8)]
          "
                    duration="18s"
                    delay="-6s"
                />

                <OrbitBall
                    orbitClassName="aspect-square w-[80%]"
                    ballClassName="
            h-2 w-2
            bg-violet-500
            shadow-[0_0_12px_rgba(139,92,246,0.8)]
          "
                    duration="18s"
                    delay="-12s"
                />

                {/* Inner orbit line */}
                <div
                    aria-hidden="true"
                    className="
            absolute left-1/2 top-[51%]
            aspect-square w-[61%]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            border border-violet-300/40
          "
                />

                {/* Inner orbit balls */}
                <OrbitBall
                    orbitClassName="aspect-square w-[61%]"
                    ballClassName="
            h-2.5 w-2.5
            bg-violet-500
            shadow-[0_0_12px_rgba(139,92,246,0.85)]
          "
                    duration="14s"
                    reverse
                />

                <OrbitBall
                    orbitClassName="aspect-square w-[61%]"
                    ballClassName="
            h-2 w-2
            bg-pink-500
            shadow-[0_0_10px_rgba(236,72,153,0.8)]
          "
                    duration="14s"
                    delay="-3.5s"
                    reverse
                />

                <OrbitBall
                    orbitClassName="aspect-square w-[61%]"
                    ballClassName="
            h-3 w-3
            bg-sky-500
            shadow-[0_0_14px_rgba(14,165,233,0.85)]
          "
                    duration="14s"
                    delay="-7s"
                    reverse
                />

                <OrbitBall
                    orbitClassName="aspect-square w-[61%]"
                    ballClassName="
            h-2.5 w-2.5
            bg-[#d30b55]
            shadow-[0_0_14px_rgba(211,11,85,0.9)]
          "
                    duration="14s"
                    delay="-10.5s"
                    reverse
                />

                {/* Inner highlight ring */}
                <div
                    aria-hidden="true"
                    className="
            absolute left-1/2 top-[51%]
            aspect-square w-[49%]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            border border-white/90
            shadow-[inset_0_0_30px_rgba(255,255,255,0.9)]
          "
                />

                {/* Travel path */}
                <svg
                    aria-hidden="true"
                    viewBox="0 0 350 350"
                    className="
            pointer-events-none absolute inset-0
            h-full w-full text-[#d30b55]/35
          "
                >
                    <path
                        d="M12 258C69 294 105 241 147 254C214 274 216 169 270 187C310 201 316 123 344 94"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="6 9"
                        strokeLinecap="round"
                    />

                    <circle
                        cx="12"
                        cy="258"
                        r="3"
                        fill="currentColor"
                    />

                    <circle
                        cx="344"
                        cy="94"
                        r="3"
                        fill="currentColor"
                    />
                </svg>

                {/* Floating feature icons */}
                {decorativeIcons.map(
                    ({
                        Icon,
                        position,
                        color,
                        delay,
                    }) => (
                        <span
                            key={`${position}-${delay}`}
                            aria-hidden="true"
                            style={{
                                animationDelay: delay,
                            }}
                            className={`
                login-icon-float
                absolute z-30
                grid h-9 w-9
                place-items-center
                rounded-xl
                border border-white
                bg-white/95
                shadow-[0_10px_24px_rgba(15,23,42,0.11)]
                backdrop-blur-md
                sm:h-10 sm:w-10
                ${position}
                ${color}
              `}
                        >
                            <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                        </span>
                    ),
                )}

                {/* Rating card */}
                <div
                    className="
            absolute right-[1%] top-[4%] z-40
            flex items-center gap-1.5
            rounded-xl border border-white
            bg-white/95 px-2 py-1.5
            shadow-[0_12px_28px_rgba(15,23,42,0.12)]
            backdrop-blur-md
            sm:gap-2 sm:px-2.5 sm:py-2
          "
                >
                    <span
                        className="
              grid h-7 w-7 place-items-center
              rounded-lg bg-amber-100
              text-amber-500
              sm:h-8 sm:w-8
            "
                    >
                        <Star className="h-3.5 w-3.5 fill-current sm:h-4 sm:w-4" />
                    </span>

                    <div>
                        <p className="text-[10px] font-black leading-none text-slate-900 sm:text-xs">
                            4.8 Rating
                        </p>

                        <p className="mt-1 text-[8px] font-semibold text-slate-500 sm:text-[9px]">
                            Trusted by students
                        </p>
                    </div>
                </div>

                {/* Phone */}
                <div
                    className="
            absolute left-1/2 top-[51%] z-20
            -translate-x-1/2 -translate-y-1/2
          "
                >
                    <Image
                        src={mobileAppImage}
                        alt="Medcity Study Abroad mobile application"
                        priority
                        sizes="(max-width: 1024px) 180px, 210px"
                        className="
              login-phone-float
              h-auto
              w-[clamp(165px,20vw,210px)]
              object-contain
              drop-shadow-[0_26px_30px_rgba(15,23,42,0.3)]
            "
                    />
                </div>

                {/* Platform shadow */}
                <div
                    aria-hidden="true"
                    className="
            absolute bottom-[2%] left-1/2
            h-8 w-[62%]
            -translate-x-1/2
            rounded-[50%]
            bg-gradient-to-r
            from-[#d30b55]/20
            via-violet-400/30
            to-[#0879c9]/20
            blur-xl
          "
                />
            </div>
        </section>
    );
}