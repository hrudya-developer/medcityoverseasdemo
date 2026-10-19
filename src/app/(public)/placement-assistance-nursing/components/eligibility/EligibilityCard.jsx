const themes = {
  pink: {
    border: "border-[#ffc4dc]",
    iconBg: "bg-[#ffe4f0]",
    iconColor: "text-[#f01473]",
    numberBg: "bg-gradient-to-br from-[#ff388a] to-[#e50068]",
    wave: "#ff4d9b",
    waveLight: "#ffb0d2",
    shadow: "hover:shadow-[0_20px_45px_rgba(240,20,115,0.13)]",
  },
  blue: {
    border: "border-[#c6ddff]",
    iconBg: "bg-[#e4efff]",
    iconColor: "text-[#0466af]",
    numberBg: "bg-gradient-to-br from-[#3897ff] to-[#0067ef]",
    wave: "#74a8ff",
    waveLight: "#c0d9ff",
    shadow: "hover:shadow-[0_20px_45px_rgba(4,102,175,0.13)]",
  },
  purple: {
    border: "border-[#e2c9ff]",
    iconBg: "bg-[#f0e5ff]",
    iconColor: "text-[#9039ed]",
    numberBg: "bg-gradient-to-br from-[#b969ff] to-[#8330ec]",
    wave: "#ae75f7",
    waveLight: "#ddbbff",
    shadow: "hover:shadow-[0_20px_45px_rgba(144,57,237,0.13)]",
  },
  yellow: {
    border: "border-[#ffe0a3]",
    iconBg: "bg-[#fff1d6]",
    iconColor: "text-[#f5a000]",
    numberBg: "bg-gradient-to-br from-[#ffbd28] to-[#ff9700]",
    wave: "#ffcc56",
    waveLight: "#ffe6a5",
    shadow: "hover:shadow-[0_20px_45px_rgba(245,160,0,0.13)]",
  },
};

export default function EligibilityCard({ item }) {
  const theme = themes[item.theme] || themes.pink;
  const Icon = item.icon;

  return (
    <article
      className={`
        group relative isolate flex h-full
        min-h-[225px] flex-col
        overflow-hidden rounded-[30px]
        border bg-white/90
        px-6 pb-8 pt-7
        shadow-[0_10px_35px_rgba(30,20,60,0.035)]
        transition-all duration-500
        hover:-translate-y-1.5
        sm:min-h-[240px] sm:px-8
        ${theme.border}
        ${theme.shadow}
      `}
    >
      {/* Top soft curve */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-28 w-44"
        viewBox="0 0 180 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0 H180 C140 45 115 80 65 85 C30 90 15 110 0 120 Z"
          fill={theme.waveLight}
          opacity=".24"
        />
      </svg>

      {/* Bottom decorative waves */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-28 w-44"
        viewBox="0 0 180 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 120 C55 100 65 45 115 40 C145 35 160 15 180 0 V120 Z"
          fill={theme.waveLight}
          opacity=".85"
        />
        <path
          d="M55 120 C110 95 130 55 180 35 V120 Z"
          fill={theme.wave}
        />
      </svg>

      {/* Card content */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          {/* Number */}
          <div
            className={`
              flex h-[66px] w-[66px]
              shrink-0 items-center justify-center
              rounded-full text-[25px]
              font-black text-white
              shadow-[0_8px_20px_rgba(0,0,0,0.08)]
              ${theme.numberBg}
            `}
          >
            {item.number}
          </div>

          {/* Icon */}
          <div
            className={`
              flex h-[60px] w-[60px]
              shrink-0 items-center justify-center
              rounded-[18px]
              transition-transform duration-500
              group-hover:rotate-6
              group-hover:scale-110
              ${theme.iconBg}
            `}
          >
            <Icon
              size={29}
              strokeWidth={1.8}
              className={theme.iconColor}
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-[19px] font-extrabold leading-[1.3] tracking-tight text-[#101638] sm:text-[21px]">
            {item.title}
          </h3>

          <p className="mt-3 max-w-[350px] text-[14px] leading-[1.75] text-[#69748d] sm:text-[15px]">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}