
"use client";

import {
  ArrowRight,
  Download,
  LockKeyhole,
} from "lucide-react";

export default function BrochureCard({
  onRegister,
  registrationFormId = "registration-form",
}) {
  const handleRegister = () => {
    if (typeof onRegister === "function") {
      onRegister();
      return;
    }

    document
      .getElementById(registrationFormId)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <div className="relative flex min-h-[400px] flex-col overflow-hidden rounded-[26px] border border-[#e62b80]/70 bg-gradient-to-br from-[#571039] via-[#2a1234] to-[#10112d] p-6 shadow-[0_20px_65px_rgba(0,0,0,0.18)] sm:p-9 lg:p-10">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-32 -top-36 h-72 w-72 rounded-full bg-[#c01f53]/25 blur-[80px]" />

        <div className="absolute -bottom-48 -right-24 h-80 w-80 rounded-full border-[55px] border-pink-500/10" />

        <div className="absolute -bottom-60 right-0 h-80 w-80 rounded-full bg-pink-500/10 blur-[60px]" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        {/* Label */}
        <div className="mb-7 flex items-center gap-3">
          <span className="h-[5px] w-10 rounded-full bg-pink-400" />

          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-pink-200 sm:text-xs">
            Programme Brochure
          </span>
        </div>

        {/* Heading */}
        <h3 className="max-w-[560px] text-[27px] font-extrabold leading-tight tracking-tight text-white sm:text-[33px] lg:text-[35px]">
          Get the Programme Brochure
        </h3>

        {/* Description */}
        <p className="mt-4 max-w-[540px] text-[15px] leading-7 text-slate-200/90 sm:text-[16px]">
          The full pathway, payment plan, eligibility
          and support details in one PDF. Easy to
          read and share.
        </p>

        {/* Download Button */}
        <div className="mt-7">
          <button
            type="button"
            onClick={handleRegister}
            className="group inline-flex min-h-[58px] w-full items-center justify-center gap-3 rounded-full border border-pink-400/40 bg-gradient-to-r from-[#c01f53] via-[#df145a] to-[#bd0750] px-5 py-4 text-sm font-bold text-white shadow-[0_12px_35px_rgba(192,31,83,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_45px_rgba(192,31,83,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300 sm:w-auto sm:gap-5 sm:px-8 sm:text-base"
          >
            <Download size={21} />

            <span>Register to Download</span>

            <ArrowRight
              size={21}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-start gap-3 pt-7">
          <LockKeyhole
            size={20}
            className="mt-1 shrink-0 text-pink-400"
          />

          <p className="max-w-[470px] text-[13px] leading-6 text-slate-300 sm:text-sm">
            Fill in the registration form below and
            the brochure download unlocks straight away.
          </p>
        </div>
      </div>
    </div>
  );
}
