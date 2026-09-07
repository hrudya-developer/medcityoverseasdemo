import Link from "next/link";

import {
  ArrowRight,
} from "lucide-react";

export default function ServiceRow({
  icon: Icon,
  title,
  subtitle,
  rowClass = "",
  iconClass = "",
  arrowClass = "",
}) {
  return (
    <div
      className={`
        group
        grid
        w-full
        grid-cols-[42px_minmax(0,1fr)_30px]
        items-center
        gap-3
        rounded-[16px]
        border
        border-white/80
        px-3
        py-2
        shadow-[0_6px_18px_rgba(15,23,42,0.04)]
        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:shadow-[0_10px_28px_rgba(15,23,42,0.08)]

        ${rowClass}
      `}
    >
      {/* ICON */}

      <span
        className={`
          flex
          h-[42px]
          w-[42px]
          shrink-0
          items-center
          justify-center
          rounded-[13px]
          shadow-sm
          transition-transform
          duration-300

          group-hover:scale-105

          ${iconClass}
        `}
      >
        <Icon
          className="
            h-[18px]
            w-[18px]
          "
          aria-hidden="true"
        />
      </span>

      {/* TEXT */}

      <div
        className="
          min-w-0
          text-left
        "
      >
        <p
          className="
            text-[12px]
            font-black
            leading-[1.2]
            text-darkPrimary
            sm:text-[13px]
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1
            text-[10px]
            font-medium
            leading-[1.4]
            text-slate-500
          "
        >
          {subtitle}
        </p>
      </div>

      {/* CONTACT LINK */}

      <Link
        href="/contact-us"
        aria-label={`Contact us about ${title}`}
        title={`Contact us about ${title}`}
        className={`
          flex
          h-[30px]
          w-[30px]
          shrink-0
          items-center
          justify-center
          rounded-full
          transition-all
          duration-300

          hover:scale-110

          ${arrowClass}
        `}
      >
        <ArrowRight
          className="
            h-3.5
            w-3.5
            transition-transform
            duration-300

            group-hover:translate-x-0.5
          "
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}