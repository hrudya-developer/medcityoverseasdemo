
const themes = {
  yellow: {
    card: "border-[#ffe3ad] bg-gradient-to-br from-[#fffdf8] via-white to-[#fff8e8]",
    icon: "bg-gradient-to-br from-[#ffc83d] to-[#ffab00] text-white",
    accent: "bg-[#ffb300]",
    pattern: "bg-[#ffe7b4]",
  },

  pink: {
    card: "border-[#f9d2df] bg-gradient-to-br from-[#fffafd] via-white to-[#fff3f7]",
    icon: "bg-[#ffdbe7] text-[#c01f53]",
    accent: "bg-[#ed2174]",
    pattern: "bg-[#ffd5e4]",
  },

  purple: {
    card: "border-[#ead7ff] bg-gradient-to-br from-[#fdfaff] via-white to-[#f7f0ff]",
    icon: "bg-[#eddbff] text-[#9222d2]",
    accent: "bg-[#a344e8]",
    pattern: "bg-[#ead5ff]",
  },
};

export default function MScBenefitCard({ item }) {
  const theme = themes[item.theme] || themes.pink;
  const Icon = item.icon;

  return (
    <article
      className={`
        group relative isolate flex
        min-h-[240px] flex-col
        overflow-hidden rounded-[24px]
        border p-6
        shadow-[0_8px_28px_rgba(30,40,70,0.035)]
        transition-all duration-500
        hover:-translate-y-1.5
        hover:shadow-[0_18px_40px_rgba(30,40,70,0.09)]
        sm:p-7 lg:p-8
        ${theme.card}
      `}
    >
      {/* Decorative circle */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none absolute
          -bottom-24 -right-20
          h-44 w-44 rounded-full
          opacity-65
          ${theme.pattern}
        `}
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className={`
              flex h-[66px] w-[66px]
              shrink-0 items-center
              justify-center rounded-[20px]
              transition-transform duration-500
              group-hover:scale-110
              ${theme.icon}
            `}
          >
            <Icon size={31} strokeWidth={1.9} />
          </div>

          {/* Text */}
          <div className="min-w-0 flex-1 pt-1">
            <h3
              className="
                text-[19px] font-extrabold
                leading-[1.3] tracking-tight
                text-[#111936]
                sm:text-[21px]
              "
            >
              {item.title}
            </h3>

            <p
              className="
                mt-3 text-sm leading-7
                text-[#626e83]
                sm:text-[15px]
              "
            >
              {item.description}
            </p>
          </div>
        </div>

        {/* Accent line */}
        <div className="mt-auto pt-7">
          <div
            className={`
              h-[4px] w-20
              rounded-full
              transition-all duration-500
              group-hover:w-28
              ${theme.accent}
            `}
          />
        </div>
      </div>
    </article>
  );
}
