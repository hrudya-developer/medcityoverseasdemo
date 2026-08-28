import Image from "next/image";

import CountryFlag from "./CountryFlag";
import DestinationBadge from "./DestinationBadge";

export default function DestinationImage({
  country,
  countryImage,
  flagImage,
  index,
  priority = false,
}) {
  return (
    <div className="relative h-[250px] shrink-0 overflow-hidden sm:h-[270px] lg:h-[285px]">
      <Image
        src={countryImage}
        alt={`${country} study abroad destination`}
        fill
        priority={priority}
        fetchPriority={
          priority
            ? "high"
            : "auto"
        }
        sizes="
          (max-width: 639px) calc(100vw - 32px),
          (max-width: 1023px) calc(50vw - 32px),
          400px
        "
        className="
          object-cover
          transition-transform
          duration-500
          ease-out
          group-hover:scale-105
        "
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#071827]/95 via-[#071827]/35 to-transparent"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/20"
      />

      <DestinationBadge />

      <span
        aria-hidden="true"
        className="
          absolute
          right-3
          top-3
          grid
          h-9
          min-w-9
          place-items-center
          rounded-full
          border
          border-white/25
          bg-white/15
          px-2
          text-[11px]
          font-extrabold
          text-white
          backdrop-blur-md
          sm:right-4
          sm:top-4
          sm:h-10
          sm:min-w-10
        "
      >
        {String(index + 1).padStart(
          2,
          "0"
        )}
      </span>

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          flex
          items-end
          justify-between
          gap-3
          p-4
          sm:gap-4
          sm:p-5
        "
      >
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/65 sm:text-[10px]">
            Begin your journey
          </p>

          <p className="mt-1 truncate font-nunito text-2xl font-extrabold leading-tight text-white drop-shadow-md sm:text-[28px]">
            {country}
          </p>
        </div>

        <CountryFlag
          country={country}
          flagImage={flagImage}
        />
      </div>
    </div>
  );
}