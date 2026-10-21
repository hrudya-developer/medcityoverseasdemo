const themes = {
  pink: {
    card: "border-pink-500/20 bg-gradient-to-br from-[#26152f] to-[#11152e]",
    icon: "border-pink-500/30 bg-pink-600/20 text-pink-400",
  },
  blue: {
    card: "border-sky-500/25 bg-gradient-to-br from-[#092d49] to-[#0d1b35]",
    icon: "border-sky-400/30 bg-sky-500/20 text-sky-300",
  },
  purple: {
    card: "border-purple-500/20 bg-gradient-to-br from-[#291331] to-[#17142e]",
    icon: "border-pink-500/30 bg-pink-600/20 text-pink-400",
  },
};

export default function BrochureFeatureCard({
  feature,
  wide = false,
}) {
  const Icon = feature.icon;
  const theme = themes[feature.variant] ?? themes.pink;

  return (
    <div
      className={`
        group relative flex h-full min-w-0 flex-col
        overflow-hidden rounded-[22px]
        border p-5
        transition-all duration-300
        hover:-translate-y-1
        hover:border-pink-400/40
        hover:shadow-[0_18px_50px_rgba(0,0,0,0.2)]
        sm:p-6 lg:p-7
        ${wide ? "md:col-span-2" : ""}
        ${theme.card}
      `}
    >
      <div className="relative z-10 flex h-full min-w-0 flex-col items-start gap-5">

        {/* ICON - TOP ROW */}
        <div
          className={`
            flex h-[62px] w-[62px]
            shrink-0 items-center justify-center
            rounded-full border
            sm:h-[72px] sm:w-[72px]
            ${theme.icon}
          `}
        >
          <Icon size={29} strokeWidth={1.8} />
        </div>

        {/* CONTENT - BOTTOM */}
        <div className="w-full min-w-0">
          <h3
            className="
              text-lg font-bold
              leading-snug text-white
              sm:text-xl
              break-words
            "
          >
            {feature.title}
          </h3>

          <p
            className="
              mt-3 text-sm
              leading-7 text-slate-300/80
              sm:text-[15px]
              break-words
            "
          >
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}