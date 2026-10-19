
const themes = {
  pink: {
    card: "border-[#f8c9df] bg-gradient-to-br from-[#fff9fc] via-white to-[#fff0f7]",
    icon: "bg-gradient-to-br from-[#f62b83] to-[#bd0750]",
    duration: "bg-[#ffe6f1] text-[#d31765]",
    number: "text-[#ed94bb]",
    pattern: "bg-[#fbd8e9]",
  },

  blue: {
    card: "border-[#c6ddff] bg-gradient-to-br from-[#f8fbff] via-white to-[#eaf4ff]",
    icon: "bg-gradient-to-br from-[#389dff] to-[#0754c7]",
    duration: "bg-[#e6f2ff] text-[#0466af]",
    number: "text-[#91c4fa]",
    pattern: "bg-[#dcecff]",
  },
};

export default function MScTimelineCard({ item }) {
  const theme = themes[item.theme] || themes.pink;
  const Icon = item.icon;

  return (
    <article
      className={`
        group relative isolate flex
        min-h-[220px] flex-col
        overflow-hidden rounded-[26px]
        border p-6
        shadow-[0_10px_30px_rgba(30,40,70,0.04)]
        transition-all duration-500
        hover:-translate-y-1.5
        hover:shadow-[0_20px_45px_rgba(30,40,70,0.1)]
        sm:min-h-[235px]
        sm:flex-row sm:items-center
        sm:gap-6 sm:p-8
        ${theme.card}
      `}
    >
      {/* Decorative circle */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none absolute
          -right-20 -top-24
          h-56 w-56 rounded-full
          opacity-45
          ${theme.pattern}
        `}
      />

      <div
        aria-hidden="true"
        className={`
          pointer-events-none absolute
          -bottom-28 -right-14
          h-44 w-44 rounded-full
          opacity-60
          ${theme.pattern}
        `}
      />

      {/* Icon */}
      <div
        className={`
          relative z-10 flex
          h-[72px] w-[72px]
          shrink-0 items-center
          justify-center rounded-[22px]
          text-white
          shadow-[0_10px_25px_rgba(0,0,0,0.12)]
          transition-transform duration-500
          group-hover:scale-105
          sm:h-[88px] sm:w-[88px]
          ${theme.icon}
        `}
      >
        <Icon size={38} strokeWidth={1.8} />
      </div>

      {/* Content */}
      <div className="relative z-10 mt-5 min-w-0 flex-1 sm:mt-0">
        <span
          className={`
            inline-flex rounded-lg
            px-4 py-2 text-[11px]
            font-extrabold uppercase
            tracking-[0.12em]
            ${theme.duration}
          `}
        >
          {item.duration}
        </span>

        <h3
          className="
            mt-4 text-[21px]
            font-extrabold leading-tight
            tracking-tight text-[#111936]
            sm:text-[23px]
          "
        >
          {item.title}
        </h3>

        <p
          className="
            mt-3 max-w-[440px]
            text-sm leading-7
            text-[#626e83]
            sm:text-[15px]
          "
        >
          {item.description}
        </p>
      </div>

      {/* Number */}
      <div
        aria-hidden="true"
        className={`
          absolute right-6 top-6
          z-10 text-[34px]
          font-extrabold
          sm:right-7 sm:top-auto
          sm:text-[40px]
          ${theme.number}
        `}
      >
        {item.number}
      </div>
    </article>
  );
}
