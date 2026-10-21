
import Link from "next/link";

import {
  ArrowRight,
  Download,
  BriefcaseMedical,
} from "lucide-react";

import { ukPlacementContent } from "./ukPlacementData";

export default function UKPlacementIntro() {
  
  const {
    badge,
    eyebrow,
    title,
    highlightedTitle,
    description,
    eligibilityHref,
    brochureHref,
  } = ukPlacementContent;

  return (
    <div
      className="
        relative z-20 flex h-full
        flex-col justify-center
        px-5 pt-12 pb-8
        text-center
        sm:px-10 sm:pt-16
        lg:px-0 lg:py-12
        lg:text-left
      "
    >
      <div className="max-w-[720px]">
        {/* Programme badge */}
        <div className="flex justify-center lg:justify-start">
          <span
            className="
              inline-flex max-w-full
              items-center gap-3
              rounded-full
              border border-pink-200
              bg-gradient-to-r
              from-[#fff1f8]
              to-[#f9e7ff]
              px-4 py-3
              text-[10px] font-extrabold
              uppercase tracking-[0.15em]
              text-[#bf1769]
              shadow-[0_6px_18px_rgba(190,30,110,0.07)]
              sm:px-6 sm:text-xs
            "
          >
            <BriefcaseMedical
              size={17}
              className="shrink-0"
            />

            {badge}
          </span>
        </div>

        {/* Eyebrow */}
        <p
          className="
            mt-7 text-[11px]
            font-extrabold uppercase
            tracking-[0.2em]
            text-[#d31b76]
            sm:text-sm
          "
        >
          {eyebrow}
        </p>

        {/* Heading */}
        <h2
          id="uk-nursing-placement-title"
          className="
            mt-5 font-extrabold
            leading-[1.07]
            tracking-[-0.055em]
            text-[#0b103b]
            text-[clamp(2.6rem,4.7vw,5.8rem)]
          "
        >
          <span className="block">
            {title}
          </span>

          <span
            className="
              mt-1 block
              bg-gradient-to-r
              from-primary
              via-darkPrimary
              to-secondary
              bg-clip-text
              text-transparent
            "
          >
            {highlightedTitle}
          </span>
        </h2>

        {/* Description */}
        <p
          className="
            mx-auto mt-6
            max-w-[600px]
            text-sm leading-7
            text-[#60708d]
            sm:text-base sm:leading-8
            lg:mx-0 lg:text-lg
          "
        >
          {description}
        </p>

        {/* CTA buttons */}
        <div
          className="
            mt-8 flex flex-wrap
            justify-center gap-3
            lg:justify-start
          "
        >
          <Link
            href={eligibilityHref}
            className="
              group inline-flex
              min-h-[54px]
              items-center justify-center
              gap-4 rounded-xl
              bg-gradient-to-r
              from-primary
              to-secondary
              px-7 py-3
              text-sm font-bold text-white
              shadow-[0_14px_30px_rgba(214,20,120,0.2)]
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-[0_18px_35px_rgba(214,20,120,0.3)]
              sm:px-9 sm:text-base
            "
          >
            Check Eligibility

            <ArrowRight
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

         

<a
  href={brochureHref}
  download="Medcity-UK-Nursing-MSc-Brochure.pdf"
  className="
    relative z-50
    inline-flex min-h-[54px]
    cursor-pointer items-center
    justify-center gap-3
    rounded-xl border-[1.5px]
    border-[#e31884]
    bg-white/90 px-7 py-3
    text-sm font-bold text-[#971178]
    transition-all duration-300
    hover:-translate-y-1
    hover:bg-pink-50
    sm:px-9 sm:text-base
  "
>
  <Download size={19} />
  <span>Get the Brochure</span>
</a>


        </div>
      </div>
    </div>
  );
}
