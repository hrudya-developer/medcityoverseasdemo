
const themes = {
  pink: {
    background:
      "from-[#fff1f6] via-[#fff8fb] to-[#fff1f7]",
    border: "border-[#fbd6e4]",
    circle:
      "bg-gradient-to-br from-[#f43c91] to-[#bd1055]",
    iconBg: "bg-[#fbdce9]",
    iconColor: "text-[#e72b7b]",
    amount: "text-[#b71454]",
    line: "bg-[#ef3a8d]",
  },

  blue: {
    background:
      "from-[#edf8ff] via-[#f7fcff] to-[#eaf5ff]",
    border: "border-[#d5eaff]",
    circle:
      "bg-gradient-to-br from-[#16a6f7] to-[#0071c8]",
    iconBg: "bg-[#d9efff]",
    iconColor: "text-[#078de1]",
    amount: "text-[#0864b1]",
    line: "bg-[#168fed]",
  },

  yellow: {
    background:
      "from-[#fff8e9] via-[#fffdf8] to-[#fff7e9]",
    border: "border-[#ffe8bf]",
    circle:
      "bg-gradient-to-br from-[#ffbd38] to-[#ed8a00]",
    iconBg: "bg-[#ffefd3]",
    iconColor: "text-[#ed9200]",
    amount: "text-[#d58709]",
    line: "bg-[#f5a51a]",
  },
};

export default function PaymentCard({ item }) {
  const theme = themes[item.theme] || themes.pink;

  const Icon = item.icon;

  return (
    <article
      className={`
        group relative flex h-full
        min-h-[240px] flex-col
        overflow-hidden rounded-[24px]
        border bg-gradient-to-br
        p-6
        shadow-[0_8px_28px_rgba(25,25,55,0.035)]
        transition-all duration-300
        hover:-translate-y-1.5
        hover:shadow-[0_20px_45px_rgba(25,25,55,0.09)]
        sm:p-7
        ${theme.background}
        ${theme.border}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div
          className={`
            flex h-14 w-14
            shrink-0 items-center
            justify-center rounded-full
            text-xl font-extrabold
            text-white shadow-md
            ${theme.circle}
          `}
        >
          {item.number}
        </div>

        <div
          className={`
            flex h-14 w-14
            items-center justify-center
            rounded-full
            ${theme.iconBg}
            ${theme.iconColor}
          `}
        >
          <Icon size={26} strokeWidth={1.8} />
        </div>
      </div>

      {/* Details */}
      <div className="mt-6">
        <p
          className="
            text-xs font-extrabold
            uppercase tracking-[0.18em]
            text-[#45465e]
          "
        >
          {item.label}
        </p>

        <h3
          className={`
            mt-3 text-[clamp(2rem,3vw,2.65rem)]
            font-black leading-none
            tracking-tight
            ${theme.amount}
          `}
        >
          {item.amount}
        </h3>

        <div
          className={`
            mt-4 h-[4px] w-12
            rounded-full
            ${theme.line}
          `}
        />

        <p
          className="
            mt-4 max-w-[350px]
            text-sm leading-7
            text-[#586078]
            sm:text-[15px]
          "
        >
          {item.description}
        </p>
      </div>
    </article>
  );
}
