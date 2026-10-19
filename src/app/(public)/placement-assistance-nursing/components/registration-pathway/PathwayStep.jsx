
const themes = {
  pink: {
    circle:
      "border-[#f9d5e5] bg-gradient-to-br from-[#fff7fb] via-white to-white",
    number:
      "bg-gradient-to-br from-[#ed216b] to-[#c01f53]",
    shadow:
      "hover:shadow-[0_15px_35px_rgba(192,31,83,0.12)]",
  },

  purple: {
    circle:
      "border-[#ead7ff] bg-gradient-to-br from-[#faf5ff] via-white to-white",
    number:
      "bg-gradient-to-br from-[#c017e8] to-[#8124e5]",
    shadow:
      "hover:shadow-[0_15px_35px_rgba(145,36,229,0.12)]",
  },

  blue: {
    circle:
      "border-[#d4e6ff] bg-gradient-to-br from-[#f3f8ff] via-white to-white",
    number:
      "bg-gradient-to-br from-[#278aff] to-[#0466af]",
    shadow:
      "hover:shadow-[0_15px_35px_rgba(4,102,175,0.12)]",
  },
};

export default function PathwayStep({ step, index }) {
  const theme = themes[step.theme] || themes.pink;

  const isLastMobile = index % 2 === 1;
  const isLastTablet = index % 4 === 3;
  const isLastDesktop = index === 7;

  const connectorVisibility = [
    isLastMobile ? "hidden" : "block",
    isLastTablet ? "sm:hidden" : "sm:block",
    isLastDesktop ? "xl:hidden" : "xl:block",
  ].join(" ");

  return (
    <li className="relative flex min-w-0 items-center justify-center">
      {/* Dotted connector between circles */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute left-1/2 top-1/2
          z-0 h-[2px] w-full
          -translate-y-1/2
          border-t-[3px]
          border-dotted border-[#c8b6cc]
          ${connectorVisibility}
        `}
      />

      {/* Circle */}
      <div
        className={`
          group relative z-10
          flex aspect-square
          w-full max-w-[180px]
          flex-col items-center
          justify-center rounded-full
          border-[2px] p-4
          text-center
          shadow-[0_8px_25px_rgba(30,40,70,0.035)]
          transition-all duration-500
          hover:-translate-y-2
          hover:scale-[1.03]
          sm:max-w-[190px]
          xl:max-w-none
          ${theme.circle}
          ${theme.shadow}
        `}
      >
        {/* Number badge */}
        <span
          className={`
            absolute left-1/2 top-3
            flex h-10 w-10
            -translate-x-1/2
            items-center justify-center
            rounded-full
            text-base font-extrabold
            text-white
            shadow-[0_5px_14px_rgba(0,0,0,0.08)]
            sm:h-11 sm:w-11
            sm:text-lg
            xl:top-[10%]
            ${theme.number}
          `}
        >
          {step.id}
        </span>

        {/* Title */}
        <h3
          className="
            mt-9 max-w-[145px]
            text-[13px] font-extrabold
            leading-[1.4]
            tracking-[-0.025em]
            text-[#111936]
            sm:text-[14px]
            xl:text-[clamp(11px,0.95vw,16px)]
          "
        >
          {step.title}
        </h3>
      </div>
    </li>
  );
}
