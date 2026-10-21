
import { pathwayContent } from "./pathwayData";

export default function PathwayHeader() {
  const {
    badge,
    title,
    highlightedTitle,
    description,
  } = pathwayContent;

  return (
    <div className="mx-auto max-w-[1100px] text-center">
      {/* Badge */}
      <span
        className="
          inline-flex items-center
          justify-center rounded-xl
          bg-[#f7ec22]
          px-6 py-3
          text-[11px] font-extrabold
          uppercase tracking-[0.22em]
          text-[#631a33]
          sm:text-sm
        "
      >
        {badge}
      </span>

      {/* Heading */}
      <h2
        id="registration-pathway-title"
        className="
          mt-7 text-3xl sm:text-4xl md:text-5xl font-black
          leading-[1.15]
          tracking-[-0.045em]
          text-[#101936]
        "
      >
        {title}{" "}
        <span
          className="
            bg-gradient-to-r
            from-[#c01f53]
            via-[#df1685]
            to-[#a000e8]
            bg-clip-text text-transparent
          "
        >
          {highlightedTitle}
        </span>
      </h2>

      {/* Description */}
      <p
        className="
          mx-auto mt-5 max-w-[850px]
          text-sm leading-7
          text-[#758098]
          sm:text-base sm:leading-8
          lg:text-lg
        "
      >
        {description}
      </p>
    </div>
  );
}
