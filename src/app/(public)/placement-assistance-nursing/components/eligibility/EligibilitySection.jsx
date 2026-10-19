import Image from "next/image";

import {
  GraduationCap,
  FileCheck2,
  UsersRound,
} from "lucide-react";

import EligibilityCard from "./EligibilityCard";
import { eligibilityData } from "./eligibilityData";

function NurseVisual() {
  return (
    <div
      className="
        relative mx-auto
        w-full max-w-[410px]
        sm:max-w-[460px]
        xl:max-w-[480px]
      "
    >
      <Image
        src="/assets/nurse-placement.png"
        alt="Nursing graduate exploring international career opportunities"
        width={1278}
        height={1230}
        sizes="(max-width: 640px) 90vw, (max-width: 1280px) 460px, 480px"
        className="
          h-auto w-full
          object-contain
          drop-shadow-[0_20px_35px_rgba(192,31,83,0.08)]
        "
      />
    </div>
  );
}

export default function EligibilitySection() {
  return (
    <section
      id="eligibility"
      aria-labelledby="eligibility-title"
      className="
        relative isolate w-full
        overflow-hidden
        bg-gradient-to-br
        from-[#fffafd]
        via-white
        to-[#faf7ff]
        py-16 sm:py-20 lg:py-24
      "
    >
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-36 -top-36 h-[440px] w-[440px] rounded-full bg-[#fce6f4]/50" />

        <div className="absolute -right-40 top-24 h-[450px] w-[450px] rounded-full bg-[#eee7ff]/45" />

        <div className="absolute bottom-0 left-1/2 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-[#fff0f8]/60 blur-[90px]" />

        <svg
          className="absolute left-0 top-[35%] hidden h-[300px] w-[300px] lg:block"
          viewBox="0 0 300 300"
          fill="none"
        >
          <path
            d="M-20 70 C100 -20 240 80 290 220"
            stroke="#f3a6d2"
            strokeWidth="2"
            strokeDasharray="7 9"
            opacity=".6"
          />
        </svg>

        <svg
          className="absolute right-0 top-[35%] hidden h-[300px] w-[300px] lg:block"
          viewBox="0 0 300 300"
          fill="none"
        >
          <path
            d="M320 70 C200 -20 60 80 10 220"
            stroke="#d8a6f3"
            strokeWidth="2"
            strokeDasharray="7 9"
            opacity=".6"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-[850px] text-center sm:mb-16">
          <span className="inline-flex items-center justify-center rounded-xl bg-[#f7ec22] px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#631a33] sm:text-xs">
            Eligibility
          </span>

          <h2
            id="eligibility-title"
            className="mt-6 text-[clamp(2.2rem,4.2vw,4.5rem)] font-black leading-[1.12] tracking-[-0.05em] text-[#101638]"
          >
            Who Can{" "}
            <span className="text-[#c01f53]">
              Apply?
            </span>
          </h2>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#e91e72]" />

          <p className="mx-auto mt-5 max-w-[750px] text-sm leading-7 text-[#73809b] sm:text-base sm:leading-8 lg:text-lg">
            Our UK nursing pathway is open to motivated
            and qualified nursing graduates who are
            ready to build a global career.
          </p>
        </div>

        {/* Desktop layout */}
        <div
          className="
            hidden items-center
            gap-5
            xl:grid
            xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)_minmax(0,1fr)]
            xl:gap-6
          "
        >
          {/* Left cards */}
          <div className="flex min-w-0 flex-col gap-6">
            <EligibilityCard item={eligibilityData[0]} />
            <EligibilityCard item={eligibilityData[2]} />
          </div>

          {/* Center nurse */}
          <div className="relative min-w-0 px-2">
            <NurseVisual />
          </div>

          {/* Right cards */}
          <div className="flex min-w-0 flex-col gap-6">
            <EligibilityCard item={eligibilityData[1]} />
            <EligibilityCard item={eligibilityData[3]} />
          </div>
        </div>

        {/* Tablet and mobile layout */}
        <div className="xl:hidden">
          <div className="mx-auto mb-12 max-w-[300px] sm:max-w-[350px]">
            <NurseVisual />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {eligibilityData.map((item) => (
              <EligibilityCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}