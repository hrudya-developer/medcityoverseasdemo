
import { ClipboardList } from "lucide-react";

import { financialRequirements } from "./paymentData";

function RequirementRow({ item }) {
  const Icon = item.icon;

  return (
    <div
      className="
        grid gap-4 border-b
        border-[#f5dce6]
        px-5 py-5
        last:border-b-0
        transition-colors duration-300
        hover:bg-[#fff8fb]
        sm:px-7
        lg:grid-cols-[minmax(220px,0.9fr)_minmax(0,2fr)]
        lg:items-center
        lg:gap-8
      "
    >
      {/* Category */}
      <div className="flex items-center gap-4">
        <div
          className="
            flex h-11 w-11
            shrink-0 items-center
            justify-center rounded-full
            bg-[#fff0f5]
            text-[#c01f53]
          "
        >
          <Icon size={21} strokeWidth={1.8} />
        </div>

        <h4
          className="
            text-sm font-extrabold
            text-[#171b3d]
            sm:text-base
          "
        >
          {item.title}
        </h4>
      </div>

      {/* Values */}
      <div className="min-w-0">
        {item.items.map((detail, index) => (
          <div
            key={`${detail.description}-${index}`}
            className={`
              flex flex-col gap-2
              py-2
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:gap-5
              ${
                index > 0
                  ? "border-t border-[#f5dce6] pt-4"
                  : ""
              }
            `}
          >
            <p
              className="
                min-w-0 text-sm
                leading-6 text-[#687086]
                sm:text-[15px]
              "
            >
              {detail.description}
            </p>

            <span
              className="
                inline-flex w-fit
                max-w-full shrink-0
                items-center justify-center
                rounded-xl bg-[#fff0f5]
                px-4 py-2
                text-sm font-extrabold
                text-[#c01f53]
                sm:text-[15px]
              "
            >
              {detail.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FinancialRequirements() {
  return (
    <div
      className="
        overflow-hidden
        rounded-[24px]
        border border-[#f7d5e2]
        bg-white
        shadow-[0_14px_40px_rgba(35,25,50,0.04)]
        sm:rounded-[28px]
      "
    >
      {/* Header */}
      <div
        className="
          relative flex items-center
          gap-4 overflow-hidden
          bg-gradient-to-r
          from-[#fff0f6]
          via-[#fff6fa]
          to-[#ffe8f2]
          px-5 py-5
          sm:px-8
        "
      >
        <div
          className="
            flex h-12 w-12
            shrink-0 items-center
            justify-center rounded-full
            bg-[#ffdce9]
            text-[#c01f53]
          "
        >
          <ClipboardList size={23} />
        </div>

        <div>
          <h3
            className="
              text-lg font-extrabold
              tracking-tight text-[#111638]
              sm:text-2xl
            "
          >
            Additional Financial Requirements
          </h3>

          <p className="mt-1 text-xs text-[#6a7187] sm:text-sm">
            Estimated expenses to consider when planning your studies.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-12 -top-20
            h-48 w-56 rotate-[-25deg]
            rounded-full bg-pink-200/35
          "
        />
      </div>

      {/* Rows */}
      <div>
        {financialRequirements.map((item) => (
          <RequirementRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
