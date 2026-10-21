
import RegistrationBenefits from "./RegistrationBenefits";

export default function RegistrationIntro() {
  return (
    <div className="relative z-10 flex min-w-0 flex-col">
      {/* Small label */}
      <div className="mb-5 flex items-center gap-3">
        <span className="h-[5px] w-12 rounded-full bg-gradient-to-r from-[#c01f53] to-[#ff77a7]" />

        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#080e26] sm:text-xs">
          Your UK Nursing Journey
        </span>
      </div>

      {/* Heading */}
      <h2 className="max-w-[650px] text-3xl sm:text-4xl md:text-5xl font-black leading-[1.12] tracking-tight text-[#080e26]">
        Register for the
        <span className="mt-1 block bg-gradient-to-r from-[#c01f53] via-[#dc246b] to-[#ed4689] bg-clip-text text-transparent">
          UK MSc Nursing Pathway
        </span>
      </h2>

      {/* Description */}
      <p className="mt-5 max-w-[550px] text-sm leading-7 text-[#425578] sm:text-base sm:leading-8">
        Take the first step towards your UK nursing
        career. Fill in the form and get access to
        the programme brochure, expert guidance
        and next steps.
      </p>

      {/* Benefits */}
      <RegistrationBenefits />

      {/* Bottom caption */}
      <div className="mt-8 hidden max-w-[320px] rotate-[-3deg] xl:block">
        <p className="font-serif text-2xl italic leading-snug text-[#c01f53]">
          Your Nursing Career
          <span className="block">Starts Here</span>
        </p>

        <div className="mt-2 h-1 w-28 rounded-full bg-gradient-to-r from-[#c01f53] to-pink-300" />
      </div>
    </div>
  );
}
