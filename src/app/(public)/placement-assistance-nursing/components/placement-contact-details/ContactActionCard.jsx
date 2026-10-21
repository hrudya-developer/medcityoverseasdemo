
const themes = {
  pink: {
    icon: "bg-[#ffe2ed] text-[#c01f53] ring-[#fbd0df]",
    button:
      "bg-[#f7ec22] text-[#631a33] hover:bg-[#ffef55]",
  },
  green: {
    icon: "bg-[#ddf9ed] text-[#08a967] ring-[#c6f2dc]",
    button:
      "bg-[#09ae68] text-white hover:bg-[#07965a]",
  },
};

export default function ContactActionCard({
  action,
  onClick,
}) {
  const Icon = action.icon;
  const theme = themes[action.theme] ?? themes.pink;

  const buttonClass = `
    inline-flex min-h-[48px] w-full
    items-center justify-center gap-2
    rounded-full px-4 py-3
    text-center text-[13px] font-bold
    leading-5 transition-all duration-300
    hover:-translate-y-0.5
    @[540px]:w-auto @[540px]:shrink-0
    ${theme.button}
  `;

  const actionContent = (
    <>
      <Icon size={18} className="shrink-0" />
      <span>{action.buttonText}</span>
    </>
  );

  return (
    <article className="@container min-w-0 rounded-[22px] border border-[#f8cbdc] bg-white/85 p-5 shadow-[0_12px_35px_rgba(192,31,83,0.04)] transition-all duration-300 hover:border-[#e9a3bf] hover:shadow-[0_18px_45px_rgba(192,31,83,0.10)] sm:p-6">
      <div className="flex min-w-0 flex-col gap-5 @[540px]:flex-row @[540px]:items-center @[540px]:justify-between">
        {/* Icon + Text */}
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div
            className={`
              flex h-[62px] w-[62px] shrink-0
              items-center justify-center
              rounded-full ring-[6px]
              ${theme.icon}
            `}
          >
            <Icon size={26} strokeWidth={2.3} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-[17px] font-extrabold leading-snug text-[#080e26] sm:text-[19px]">
              {action.title}
            </h3>

            <p className="mt-1 text-[13px] leading-6 text-slate-500 sm:text-[14px]">
              {action.description}
            </p>
          </div>
        </div>

        {/* Button */}
        {onClick ? (
          <button
            type="button"
            onClick={onClick}
            className={buttonClass}
          >
            {actionContent}
          </button>
        ) : (
          <a
            href={action.href}
            className={buttonClass}
          >
            {actionContent}
          </a>
        )}
      </div>
    </article>
  );
}
