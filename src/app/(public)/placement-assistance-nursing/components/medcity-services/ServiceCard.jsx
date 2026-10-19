import { ArrowUpRight } from "lucide-react";

const themes = {
  pink: {
    border: "border-[#f8d3e4]",
    hoverBorder: "hover:border-[#ef9fc3]",
    iconBg: "bg-[#fce7f1]",
    iconColor: "text-[#e91e72]",
    number: "text-[#e9a1c6]",
    arrowBg: "bg-[#fff0f6]",
    arrowBorder: "border-[#f7c4dc]",
    arrowColor: "text-[#e91e72]",
    shadow: "hover:shadow-[0_18px_42px_rgba(233,30,114,0.11)]",
  },

  purple: {
    border: "border-[#e8d8ff]",
    hoverBorder: "hover:border-[#cdb0fa]",
    iconBg: "bg-[#f1e6ff]",
    iconColor: "text-[#7939e8]",
    number: "text-[#c6a4ee]",
    arrowBg: "bg-[#f6efff]",
    arrowBorder: "border-[#dfcaff]",
    arrowColor: "text-[#7939e8]",
    shadow: "hover:shadow-[0_18px_42px_rgba(121,57,232,0.10)]",
  },

  blue: {
    border: "border-[#d6e6ff]",
    hoverBorder: "hover:border-[#a9ccff]",
    iconBg: "bg-[#e7f1ff]",
    iconColor: "text-[#1479ed]",
    number: "text-[#a5c8ff]",
    arrowBg: "bg-[#eef6ff]",
    arrowBorder: "border-[#c5ddff]",
    arrowColor: "text-[#1479ed]",
    shadow: "hover:shadow-[0_18px_42px_rgba(20,121,237,0.10)]",
  },

  orange: {
    border: "border-[#ffe0d5]",
    hoverBorder: "hover:border-[#ffc3ac]",
    iconBg: "bg-[#fff0e9]",
    iconColor: "text-[#f36a2d]",
    number: "text-[#f1b3a3]",
    arrowBg: "bg-[#fff5ef]",
    arrowBorder: "border-[#ffd5c2]",
    arrowColor: "text-[#f36a2d]",
    shadow: "hover:shadow-[0_18px_42px_rgba(243,106,45,0.10)]",
  },
};

export default function ServiceCard({ item }) {
  const theme = themes[item.theme] || themes.pink;
  const Icon = item.icon;

  return (
    <article
      className={`
        group relative isolate flex
        min-h-[175px] flex-col
        overflow-hidden rounded-[24px]
        border bg-white/85
        p-5
        shadow-[0_5px_24px_rgba(42,25,64,0.035)]
        backdrop-blur-sm
        transition-all duration-300
        hover:-translate-y-1.5
        hover:bg-white
        sm:min-h-[190px]
        sm:p-6
        lg:min-h-[195px]
        ${theme.border}
        ${theme.hoverBorder}
        ${theme.shadow}
      `}
    >
      {/* Service number */}
      <span
        className={`
          absolute right-5 top-5
          text-[16px] font-extrabold
          tracking-tight
          ${theme.number}
        `}
      >
        {String(item.id).padStart(2, "0")}
      </span>

      {/* Icon */}
      <div
        className={`
          flex h-[58px] w-[58px]
          shrink-0 items-center justify-center
          rounded-[19px]
          transition-transform duration-300
          group-hover:scale-105
          ${theme.iconBg}
        `}
      >
        <Icon
          size={29}
          strokeWidth={1.9}
          className={theme.iconColor}
        />
      </div>

      {/* Text */}
      <div className="mt-5 flex flex-1 items-end justify-between gap-3">
        <div className="min-w-0">
          <h3
            className="
              text-[16px] font-extrabold
              leading-[1.35]
              tracking-[-0.025em]
              text-[#201a35]
              sm:text-[17px]
              xl:text-[18px]
            "
          >
            {item.title}
          </h3>

          <p
            className="
              mt-2 max-w-[260px]
              text-[13px] leading-[1.65]
              text-[#77758b]
              sm:text-[14px]
            "
          >
            {item.description}
          </p>
        </div>

        {/* Decorative arrow */}
        <div
          aria-hidden="true"
          className={`
            flex h-9 w-9 shrink-0
            items-center justify-center
            rounded-full border
            transition-all duration-300
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
            ${theme.arrowBg}
            ${theme.arrowBorder}
            ${theme.arrowColor}
          `}
        >
          <ArrowUpRight size={17} strokeWidth={2.2} />
        </div>
      </div>
    </article>
  );
}