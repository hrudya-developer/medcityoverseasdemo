
const themes = {
  pink: {
    background: "from-[#fff5f8] via-white to-[#fff0f5]",
    border: "border-[#f7d6e2]",
    icon: "bg-gradient-to-br from-[#e91e63] to-[#bd0046]",
    title: "text-[#c01f53]",
    accent: "bg-[#c01f53]",
    pattern: "bg-[#f7b5cb]",
    bottom: "bg-gradient-to-r from-[#c01f53] to-[#ed5c8c]",
    shadow: "hover:shadow-[#c01f53]/15",
  },
  blue: {
    background: "from-[#eff7ff] via-white to-[#edf5ff]",
    border: "border-[#d5e6ff]",
    icon: "bg-gradient-to-br from-[#3897ff] to-[#0466af]",
    title: "text-[#092b59]",
    accent: "bg-[#1479ed]",
    pattern: "bg-[#c6ddff]",
    bottom: "bg-gradient-to-r from-[#0466af] to-[#338dff]",
    shadow: "hover:shadow-[#0466af]/15",
  },
  yellow: {
    background: "from-[#fffaf0] via-white to-[#fff8e9]",
    border: "border-[#ffe8bd]",
    icon: "bg-gradient-to-br from-[#ffc928] to-[#f4a900]",
    title: "text-[#321b27]",
    accent: "bg-[#ffb900]",
    pattern: "bg-[#ffe9b3]",
    bottom: "bg-gradient-to-r from-[#f2a900] to-[#ffc72c]",
    shadow: "hover:shadow-[#f4a900]/15",
  },
  purple: {
    background: "from-[#fff5fc] via-white to-[#fff0f8]",
    border: "border-[#f5d5ea]",
    icon: "bg-gradient-to-br from-[#e91e79] to-[#a90065]",
    title: "text-[#c01f53]",
    accent: "bg-[#c01f53]",
    pattern: "bg-[#f4b9de]",
    bottom: "bg-gradient-to-r from-[#c01f53] to-[#df4f9d]",
    shadow: "hover:shadow-[#c01f53]/15",
  },
};

export default function MastersRouteCard({
  item,
  className = "",
}) {
  const theme = themes[item.theme] || themes.pink;
  const Icon = item.icon;

  return (
    <article
      className={`
        group relative isolate flex
        min-h-[310px] flex-col
        overflow-hidden rounded-[30px]
        border bg-gradient-to-br
        p-7 shadow-[0_12px_35px_rgba(40,20,40,0.07)]
        transition-all duration-500
        hover:-translate-y-2 hover:shadow-2xl
        sm:p-8
        lg:min-h-[350px]
        ${theme.background}
        ${theme.border}
        ${theme.shadow}
        ${className}
      `}
    >
      {/* Top curved pattern */}
      <div
        className={`
          pointer-events-none absolute
          -right-12 -top-24
          h-48 w-64 rotate-[25deg]
          rounded-[50%] opacity-35
          transition-transform duration-500
          group-hover:rotate-[15deg]
          ${theme.pattern}
        `}
      />




      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Icon */}
        <div
          className={`
            mb-7 flex h-[72px] w-[72px]
            shrink-0 items-center justify-center
            rounded-full text-white
            shadow-lg transition-transform
            duration-500 group-hover:scale-110
            ${theme.icon}
          `}
        >
          <Icon size={34} strokeWidth={2} />
        </div>

        {/* Title */}
        <h3
          className={`
            mb-4 text-[23px]
            font-extrabold leading-[1.25]
            tracking-tight
            ${theme.title}
          `}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p
          className="
            max-w-[320px] text-[16px]
            leading-[1.75] text-[#645b65]
          "
        >
          {item.description}
        </p>

        {/* Accent line */}
        <div className="mt-auto pt-7">
          <div
            className={`
              h-[5px] w-16 rounded-full
              transition-all duration-500
              group-hover:w-24
              ${theme.accent}
            `}
          />
        </div>
      </div>
    </article>
  );
}
