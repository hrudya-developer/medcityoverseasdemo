
import { mscRouteContent } from "./mscRouteData";

export default function MScRouteHeader() {
  const {
    badge,
    title,
    highlightedTitle,
    description,
  } = mscRouteContent;

  return (
    <div className="mb-9 sm:mb-12">
      {/* Badge */}
      <span
        className="
          inline-flex items-center
          rounded-xl bg-[#f7ec22]
          px-5 py-3
          text-[11px] font-extrabold
          uppercase tracking-[0.2em]
          text-[#631a33]
          sm:text-xs
        "
      >
        {badge}
      </span>

      {/* Heading */}
      <h2
        id="msc-route-title"
        className="
          mt-6 max-w-[1250px]
          text-[clamp(2rem,4vw,4.2rem)]
          font-extrabold
          leading-[1.12]
          tracking-[-0.045em]
          text-[#10172f]
        "
      >
        {title}{" "}
        <span
          className="
            bg-gradient-to-r
            from-[#c01f53]
            via-[#e91e79]
            to-[#a51bd5]
            bg-clip-text text-transparent
          "
        >
          {highlightedTitle}
        </span>
      </h2>

      {/* Accent */}
      <div className="mt-5 h-1 w-16 rounded-full bg-[#c01f53]" />

      {/* Description */}
      <p
        className="
          mt-5 max-w-[900px]
          text-sm leading-7
          text-[#657086]
          sm:text-base sm:leading-8
          lg:text-lg
        "
      >
        {description}
      </p>
    </div>
  );
}
