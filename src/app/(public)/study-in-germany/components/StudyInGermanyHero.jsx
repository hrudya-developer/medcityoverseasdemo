import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  GraduationCap,
  Languages,
} from "lucide-react";

export default function StudyInGermanyHero() {
  const highlights = [
    {
      icon: GraduationCap,
      label: "Study Programs",
    },
    {
      icon: BriefcaseBusiness,
      label: "Ausbildung",
    },
    {
      icon: Languages,
      label: "German Language",
    },
  ];

  return (
    <section
      aria-labelledby="study-in-germany-heading"
      className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-[#fff7fa] via-white to-[#eef7ff] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute -left-28 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
      />

      {/* Background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #631A33 1px, transparent 1px), linear-gradient(to bottom, #631A33 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* =========================
              LEFT CONTENT
          ========================== */}
          <div className="text-center lg:text-left">
            {/* Small badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                <BadgeCheck
                  aria-hidden="true"
                  size={14}
                />
              </span>

              <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                Study in Germany from Kerala
              </span>
            </div>

            {/* Heading */}
            <h1
              id="study-in-germany-heading"
              className="mt-6 text-3xl font-bold leading-[1.12] tracking-tight text-darkPrimary sm:text-3xl md:text-5xl"
            >
              Build Your Future
              <br className="hidden sm:block" /> in{" "}
              <span className="relative inline-block text-primary">
                Germany
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-logoYellow"
                />
              </span>

              <span className="mt-3 block text-2xl font-extrabold text-slate-800 sm:text-3xl lg:text-[34px]">
                Ausbildung, Nursing &amp; Study
                Programs
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">
              Explore academic, vocational, and career opportunities
              in Germany with guidance for program selection,
              eligibility, language preparation, applications, and
              your journey from Kerala to Germany.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="#german-programs-cards"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(192,31,83,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(192,31,83,0.32)]"
              >
                Explore Programs

                <ArrowRight
                  aria-hidden="true"
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/contact-us"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-primary/20 bg-white px-7 py-3 text-sm font-bold text-darkPrimary shadow-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
              >
                Get Free Counselling
              </Link>
            </div>

            {/* Highlights */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md lg:justify-start"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon
                      aria-hidden="true"
                      size={18}
                    />
                  </div>

                  <span className="text-xs font-bold text-slate-800">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* =========================
              RIGHT IMAGE
          ========================== */}
          <div className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:ml-auto">
            {/* Back decorative shape */}
            <div
              aria-hidden="true"
              className="absolute -right-5 -top-5 h-full w-full rounded-[36px] border border-primary/10 bg-primary/5"
            />

            {/* Main image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] border-[6px] border-white bg-white shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
              <Image
                src="/assets/study-in-germany.png"
                alt="Germany destination for international students"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 520px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Bottom image gradient */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"
              />

              {/* Germany badge */}
              <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/30 bg-black/40 px-4 py-3 text-white shadow-lg backdrop-blur-md">
                {/* German flag */}
                <div
                  aria-hidden="true"
                  className="overflow-hidden rounded-md shadow-sm"
                >
                  <span className="block h-[6px] w-8 bg-black" />
                  <span className="block h-[6px] w-8 bg-[#DD0000]" />
                  <span className="block h-[6px] w-8 bg-[#FFCC00]" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
                    Destination
                  </p>

                  <p className="text-sm font-bold">
                    Germany
                  </p>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -right-2 hidden rounded-2xl border border-white bg-white/95 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.15)] backdrop-blur-md sm:flex sm:items-center sm:gap-3 lg:-right-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <GraduationCap size={21} />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Explore
                </p>

                <p className="text-sm font-extrabold text-darkPrimary">
                  Study &amp; Career Paths
                </p>
              </div>
            </div>

            {/* Decorative dots */}
            <div
              aria-hidden="true"
              className="absolute -left-8 -top-8 -z-10 h-28 w-28 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(#c01f53 2px, transparent 2px)",
                backgroundSize: "14px 14px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}