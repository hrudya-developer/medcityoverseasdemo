import Link from "next/link";
import Image from "next/image";

import DestinationContent from "./DestinationContent";
import DestinationImage from "./DestinationImage";

import {
  buildDestinationImageUrl,
  getDestinationId,
  getDestinationName,
} from "./destinationHelpers";

import { createSlug } from "@/lib/slug";

const FALLBACK_IMAGE =
  "/assets/destination-fallback.webp";

export default function DestinationCard({
  destination,
  imagePath,
  index,
}) {
  const country =
    getDestinationName(destination);

  const destinationId =
    getDestinationId(
      destination,
      index
    );

  const countryImage =
    buildDestinationImageUrl(
      imagePath,
      destination?.image
    ) || FALLBACK_IMAGE;

  const flagImage =
    buildDestinationImageUrl(
      imagePath,
      destination?.flag
    );

  const headingId =
    `destination-${destinationId}`;

  const href =
    `/destination/${createSlug(
      country
    )}`;

  return (
    <Link
      href={href}
      aria-label={`Explore study opportunities in ${country}`}
      className="
        block
        h-full
        py-2
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
        focus-visible:ring-offset-4
      "
    >
      <article
        aria-labelledby={headingId}
        className="
          group
          relative
          mx-auto
          flex
          h-full
          min-h-[470px]
          w-full
          max-w-[430px]
          flex-col
          overflow-hidden
          rounded-[26px]
          border
          border-slate-200/70
          bg-white
          shadow-[0_16px_45px_rgba(15,23,42,0.09)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-primary/20
          hover:shadow-[0_24px_55px_rgba(99,26,51,0.16)]
          sm:rounded-[30px]
        "
      >
     

     <DestinationImage
  country={country}
  countryImage={countryImage}
  flagImage={flagImage}
  index={index}
  priority={index === 0}
/>




        <DestinationContent
          country={country}
          headingId={headingId}
        />

        <div
          aria-hidden="true"
          className="
            absolute
            inset-x-0
            bottom-0
            z-20
            h-1
            origin-left
            scale-x-0
            bg-gradient-to-r
            from-primary
            via-secondary
            to-primary
            transition-transform
            duration-300
            group-hover:scale-x-100
          "
        />
      </article>
    </Link>
  );
}