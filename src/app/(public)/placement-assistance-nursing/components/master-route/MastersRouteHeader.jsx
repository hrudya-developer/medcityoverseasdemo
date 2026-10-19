
export default function MastersRouteHeader() {
  return (
    <div className="mx-auto mb-14 max-w-9xl text-center lg:mb-20">
      {/* Badge */}
      <div className="mb-6 flex justify-center">
        <span
          className="
            inline-flex items-center
            rounded-full
            px-6 py-3
            text-[11px] font-extrabold
            uppercase tracking-[0.22em]
            text-[#631a33]
            shadow-sm
            sm:text-xs
          "
        >
          Medcity Study Abroad
        </span>
      </div>

      {/* Heading */}
      <h2
        className="
          text-4xl font-extrabold
          leading-[1.15] tracking-tight
          text-[#281623]
          sm:text-5xl
          lg:text-[58px]
        "
      >
        Why the{" "}
        <span className="text-[#c01f53]">
          Masters Route?
        </span>
      </h2>

      {/* Decorative underline */}
      <div className="mt-5 flex items-center justify-center gap-2">
        <span className="h-1.5 w-24 rounded-full bg-[#c01f53]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#c01f53]" />
      </div>
    </div>
  );
}
