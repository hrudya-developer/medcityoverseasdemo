
export default function BrochureHeader() {
  return (
    <div className="mb-9 max-w-[1100px] sm:mb-11">
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <span className="h-[5px] w-16 rounded-full bg-gradient-to-r from-[#c01f53] via-pink-400 to-[#f18ab3]" />

        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-pink-200 sm:text-xs">
          Programme Brochure
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.15] tracking-tight text-white">
        Your Future in{" "}
        <span className="bg-gradient-to-r from-[#f65b9b] via-[#e32970] to-[#c01f53] bg-clip-text text-transparent">
          UK Healthcare
        </span>{" "}
        Starts Here
      </h2>

      <p className="mt-5 max-w-[950px] text-[15px] leading-7 text-slate-300 sm:text-[17px] sm:leading-8">
        Go from nursing graduate to a qualified
        UK-registered mental health nurse. The NHS
        needs compassionate, skilled mental health
        professionals like you, and with this MSc
        and Medcity&apos;s support, every step is guided.
      </p>
    </div>
  );
}
