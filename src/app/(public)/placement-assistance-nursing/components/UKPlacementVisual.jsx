
import Image from "next/image";

import { Plane } from "lucide-react";

import { ukPlacementContent } from "./ukPlacementData";

export default function UKPlacementVisual() {
  return (
    <div
      className="
        relative isolate
        mx-auto w-full
        max-w-[760px]
        overflow-hidden
        rounded-[28px]
        sm:rounded-[36px]
        lg:max-w-none
        lg:overflow-visible
      "
    >
      {/* Decorative pink shape */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute right-[-15%] top-[-20%]
          h-[95%] w-[100%]
          rounded-full
          bg-gradient-to-br
          from-[#eaa6e8]/60
          via-[#f5a2c8]/50
          to-[#fbd4e9]/20
          blur-[2px]
        "
      />

      {/* Main image */}
      <div
        className="
          relative z-10
          aspect-[1.12]
          w-full overflow-hidden
          rounded-[28px]
          sm:aspect-[1.2]
          sm:rounded-[36px]
          lg:aspect-[0.95]
          lg:rounded-none
          xl:aspect-[1.12]
        "
      >
        <Image
          src={ukPlacementContent.image}
          alt="Nurse with London landmarks representing UK nursing career opportunities"
          fill
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="object-cover object-center"
        />

        {/* Soft overlay */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            bg-gradient-to-t
            from-[#7b135c]/15
            via-transparent
            to-transparent
          "
        />
      </div>

      {/* Plane decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-[2%] top-[16%]
          z-20 hidden
          xl:block
        "
      >
        <Plane
          size={36}
          fill="#d21879"
          className="-rotate-45 text-[#d21879]"
        />

        <svg
          className="absolute left-2 top-8 h-28 w-28"
          viewBox="0 0 120 120"
        >
          <path
            d="M20 10 C110 20 110 115 30 95 C-10 80 15 45 55 55"
            fill="none"
            stroke="#d21879"
            strokeWidth="2"
            strokeDasharray="5 6"
          />
        </svg>
      </div>
    </div>
  );
}
