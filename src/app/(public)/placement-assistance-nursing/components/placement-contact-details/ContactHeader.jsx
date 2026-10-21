
export default function ContactHeader() {
  return (
    <div className="flex h-full flex-col justify-center">
      {/* Eyebrow */}
      <div className="mb-6 flex items-center gap-4">
        <span className="h-[5px] w-14 rounded-full bg-gradient-to-r from-[#c01f53] to-[#f9a8c7]" />

        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 sm:text-xs">
          Take the Next Step
        </span>
      </div>

      {/* Heading */}
      <h2 className="max-w-[650px] text-3xl sm:text-4xl md:text-5xl font-black leading-[1.15] tracking-tight text-[#080e26]">
        Ready to Begin
        <span className="mt-1 block bg-gradient-to-r from-[#c01f53] via-[#d92772] to-[#ef5599] bg-clip-text text-transparent">
          Your Journey?
        </span>
      </h2>

      {/* Description */}
      <p className="mt-6 max-w-[580px] text-[15px] leading-7 text-slate-600 sm:text-[17px] sm:leading-8">
        Our expert counsellors will answer your
        questions and guide you through every step.
        Your nursing career in the UK is closer
        than you think.
      </p>

      {/* Highlight */}
      <p className="mt-5 max-w-[580px] text-[15px] font-bold leading-7 text-[#080e26] sm:text-[17px]">
        Register below to unlock the programme brochure.
      </p>
    </div>
  );
}
