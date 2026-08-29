import { GraduationCap } from "lucide-react";

export default function SearchSectionHeader() {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center lg:mb-10">
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-pink-200 backdrop-blur-md">
        <GraduationCap size={15} aria-hidden="true" />
        Find Your Perfect Study Program
      </span>

      <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
        Find Study Abroad{" "}
        <span className="bg-gradient-to-r from-[#ff7cad] via-primary to-[#ffb1cd] bg-clip-text text-transparent">
          Courses & Universities
        </span>
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
        Explore study abroad courses and universities across leading
        destinations including Germany, the UK, Canada, Australia, Ireland,
        New Zealand and more. Compare programs and find the right option for
        your academic and career goals.
      </p>
    </div>
  );
}