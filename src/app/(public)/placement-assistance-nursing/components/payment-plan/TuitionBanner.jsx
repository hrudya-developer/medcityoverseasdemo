
import { GraduationCap } from "lucide-react";

import { tuitionDetails } from "./paymentData";

export default function TuitionBanner() {
  return (
    <div
      className="
        relative isolate overflow-hidden
        rounded-[22px]
        bg-gradient-to-r
        from-[#9c164a]
        via-[#cb1e60]
        to-[#f02b78]
        px-5 py-7
        shadow-[0_18px_40px_rgba(192,31,83,0.15)]
        sm:rounded-[28px]
        sm:px-8 sm:py-9
        lg:px-10
      "
    >
      {/* Decorative curves */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -bottom-28
          right-[10%]
          h-56 w-[45%]
          rotate-[-25deg]
          rounded-[50%]
          bg-[#8d1046]/25
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-20
          -top-24
          h-60 w-80
          rounded-full
          bg-white/10
        "
      />

      <div
        className="
          relative z-10
          flex flex-col
          gap-6
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* Left */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div
            className="
              flex h-14 w-14
              shrink-0 items-center
              justify-center rounded-full
              bg-white text-[#c01f53]
              shadow-lg
              sm:h-[76px] sm:w-[76px]
            "
          >
            <GraduationCap
              size={32}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h3
              className="
                text-xl font-extrabold
                text-white
                sm:text-2xl
              "
            >
              {tuitionDetails.title}
            </h3>

            <p
              className="
                mt-2 max-w-[420px]
                text-sm leading-6
                text-white/85
                sm:text-base
              "
            >
              {tuitionDetails.description}
            </p>
          </div>
        </div>

        {/* Amount */}
        <div
          className="
            border-t border-white/25
            pt-5
            sm:border-l sm:border-t-0
            sm:pl-8 sm:pt-0
          "
        >
          <p
            className="
              whitespace-nowrap
              text-[clamp(2.3rem,4vw,4rem)]
              font-black
              leading-none
              tracking-tight
              text-[#f7ec22]
            "
          >
            {tuitionDetails.amount}
          </p>
        </div>
      </div>
    </div>
  );
}
