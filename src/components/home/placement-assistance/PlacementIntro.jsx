
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  placementContent,
  placementCountries,
} from "./placementData";

export default function PlacementIntro({
  eligibilityHref = "/contact",
}) {
  return (
    <div
      className="
        relative flex h-full min-w-0
        flex-col justify-center
        px-5 py-12
        sm:px-10 sm:py-16
        lg:py-20 lg:pl-12 lg:pr-0
        xl:pl-16
        2xl:pl-24
      "
    >
      <div
        className="
          relative z-10 w-full max-w-[740px]
          mx-auto text-center
          lg:mx-0 lg:text-left
        "
      >
        {/* Section eyebrow */}
        <div
          className="
            flex items-center justify-center gap-4
            lg:justify-start
          "
        >
          <span
            className="
              text-[12px] font-extrabold
              uppercase tracking-[0.18em]
              text-[#c01f53]
              sm:text-sm xl:text-base
            "
          >
            {placementContent.eyebrow}
          </span>

          <span
            aria-hidden="true"
            className="
              h-px w-10 bg-[#c01f53]/40
              sm:w-20
            "
          />
        </div>

        {/* Main heading */}
        <h2
          id="placement-assistance-title"
          className="
            mt-7 font-extrabold
            leading-[1.08]
            tracking-[-0.055em]
            text-[#111111]
            text-[clamp(2.3rem,4.15vw,5.25rem)]
          "
        >
          <span className="block">
            {placementContent.titleLine1}
          </span>

          <span className="block">
            {placementContent.titleLine2}
          </span>

          <span className="block text-[#c01f53]">
            {placementContent.highlightedTitle}
          </span>
        </h2>

        {/* Description */}
        <p
          className="
            mx-auto mt-6 max-w-[640px]
            text-[14px] leading-[1.85]
            text-[#5b6a83]
            sm:text-[16px]
            xl:text-[18px]
            lg:mx-0
          "
        >
          {placementContent.description}
        </p>

        {/* Country flags */}
        <div
          className="
            mt-8 flex flex-wrap
            items-center justify-center
            gap-3 sm:gap-4
            lg:justify-start
          "
          aria-label="Nursing placement destinations"
        >
          {placementCountries.map((country) => (
            <div
              key={country.name}
              role="img"
              aria-label={country.name}
              title={country.name}
              className="
                flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-full border border-gray-100
                bg-white text-[27px]
                leading-none
                shadow-[0_7px_20px_rgba(0,0,0,0.1)]
                transition-all duration-300
                hover:-translate-y-1.5
                hover:shadow-[0_12px_25px_rgba(192,31,83,0.18)]
                sm:h-14 sm:w-14
                sm:text-[33px]
                xl:h-16 xl:w-16
                xl:text-[37px]
              "
            >
              <span aria-hidden="true">
                {country.flag}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="
            mt-8 flex justify-center
            lg:justify-start
          "
        >
          <Link
            href="/placement-assistance-nursing"
            className="
              group inline-flex
              min-h-[54px] items-center
              justify-center gap-5
              rounded-xl bg-[#c01f53]
              px-7 py-3.5
              text-sm font-semibold text-white
              shadow-[0_12px_25px_rgba(192,31,83,0.17)]
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-[#a71947]
              hover:shadow-[0_16px_30px_rgba(192,31,83,0.25)]
              sm:text-base
            "
          >
            Explore Programmes

            <ArrowRight
              size={20}
              className="
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
