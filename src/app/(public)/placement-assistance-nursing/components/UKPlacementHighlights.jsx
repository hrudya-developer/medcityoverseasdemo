
import {
  GraduationCap,
  Coins,
  UsersRound,
} from "lucide-react";

import { ukPlacementHighlights } from "./ukPlacementData";

const icons = {
  graduation: GraduationCap,
  scholarship: Coins,
  students: UsersRound,
};

export default function UKPlacementHighlights() {
  return (
    <div className="relative z-30 w-full">
      <div
        className="
          grid grid-cols-1
          gap-0 overflow-hidden
          rounded-[24px]
          border border-white/80
          bg-white/95
          shadow-[0_20px_60px_rgba(101,35,85,0.12)]
          backdrop-blur-xl
          sm:grid-cols-3
          sm:rounded-[30px]
        "
      >
        {ukPlacementHighlights.map((item, index) => {
          const Icon = icons[item.icon];

          return (
            <div
              key={item.title}
              className={`
                flex min-w-0 items-center
                gap-4 px-5 py-5
                sm:gap-3 sm:px-4 sm:py-7
                lg:gap-5 lg:px-7
                ${
                  index !== 0
                    ? "border-t border-pink-100 sm:border-l sm:border-t-0"
                    : ""
                }
              `}
            >
              {/* Icon */}
              <div
                className="
                  flex h-14 w-14 shrink-0
                  items-center justify-center
                  rounded-full
                  bg-[#fce8f4]
                  text-[#d8197a]
                  sm:h-12 sm:w-12
                  lg:h-16 lg:w-16
                "
              >
                <Icon
                  size={27}
                  strokeWidth={1.8}
                />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <h3
                  className="
                    text-lg font-extrabold
                    leading-tight
                    text-[#101638]
                    sm:text-base
                    lg:text-xl
                    xl:text-2xl
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-1 text-sm
                    leading-5 text-[#66718c]
                    lg:text-base
                  "
                >
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <p
        className="
          mt-5 text-center
          text-xs leading-5
          text-[#74809a]
          sm:text-sm
        "
      >
        *Up to ₹10,00,000, subject to university eligibility criteria.
      </p>
    </div>
  );
}
