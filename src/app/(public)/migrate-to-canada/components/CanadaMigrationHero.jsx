import Image from "next/image";
import Link from "next/link";

import {
    ArrowDown,
    ArrowRight,
    BadgeCheck,
    BriefcaseBusiness,
    CheckCircle2,
    MapPinned,
    Plane,
    Sparkles,
} from "lucide-react";

const highlights = [
    {
        icon: BadgeCheck,

    },
    {
        icon: BriefcaseBusiness,

    },
    {
        icon: MapPinned,

    },
];

const imageHighlights = [
    "Express Entry",
    "Provincial Nominee Program",
    "Work and Business Pathways",
];

export default function CanadaMigrationHero() {
    return (
        <section
            aria-labelledby="canada-migration-heading"
            className="relative isolate overflow-hidden bg-gradient-to-br from-[#fff8fb] via-white to-[#eef7ff]"
        >
            <HeroBackground />

            <div
                className="relative z-10 mx-auto grid w-full max-w-[1450px] items-center gap-12 px-4 py-10 sm:px-6 sm:py-12 lg:min-h-[610px] lg:grid-cols-[1fr_0.92fr] lg:gap-14 lg:px-8 lg:py-14 xl:gap-20"
            >
                <HeroContent />

                <HeroVisual />
            </div>

            <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            />
        </section>
    );
}

function HeroContent() {
  return (
    <div className="relative z-20 mx-auto w-full max-w-[680px] text-center lg:mx-0 lg:text-left">
      {/* SEO eyebrow */}
      <p className="text-xs font-black uppercase tracking-[0.18em] text-primary sm:text-sm">
        Canada Immigration Consultants in Kerala
      </p>

      {/* Badge */}
      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/85 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-primary shadow-[0_8px_25px_rgba(99,26,51,0.08)] backdrop-blur-xl sm:text-xs">
        <Sparkles
          size={14}
          aria-hidden="true"
        />

        Migrate. Work. Build Your Future.
      </div>

      {/* Main h2 */}
      <h1
        id="canada-migration-heading"
        className="mt-5 text-3xl font-black leading-[1.07] tracking-[-0.045em] text-[#0c1b35] sm:text-4xl lg:text-[48px] xl:text-[54px]"
      >
        Migrate to Canada{" "}
        <span className="relative inline-block text-darkPrimary">
          from Kerala

          <span
            aria-hidden="true"
            className="absolute inset-x-1 -bottom-2 h-1 rounded-full bg-logoYellow"
          />
        </span>
      </h1>

      {/* SEO-rich intro */}
      <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">
        Explore pathways to migrate to Canada from Kerala with
        guidance from Medcity Overseas. Understand Express
        Entry, Provincial Nominee Programs, work permits,
        family sponsorship and permanent residence pathways.
      </p>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base lg:mx-0">
        Explore Canadian immigration options based on your
        qualifications, work experience, occupation, language
        proficiency and individual migration goals.
      </p>

      {/* Highlights */}
      <div
        className="mt-7 flex items-center justify-center gap-3 lg:justify-start"
        aria-label="Canada migration services"
      >
        {highlights.map(({ icon: Icon }, index) => (
          <div
            key={index}
            className="group relative grid size-12 place-items-center rounded-2xl border border-primary/10 bg-primary text-white shadow-[0_10px_24px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_32px_rgba(192,31,83,0.22)] sm:size-14"
          >
            <Icon
              size={20}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
        <a
          href="#canada-immigration-programs"
          className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-2xl bg-darkPrimary px-6 text-sm font-black text-white shadow-[0_15px_35px_rgba(4,102,175,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:shadow-[0_20px_42px_rgba(192,31,83,0.3)]"
        >
          Explore Migration Pathways

          <Plane
            size={17}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>

        <a
          href="#canada-migration-faq"
          className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-2xl border border-darkPrimary/15 bg-white/90 px-6 text-sm font-black text-darkPrimary shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:text-primary hover:shadow-md"
        >
          Canada Migration FAQs

          <ArrowDown
            size={17}
            aria-hidden="true"
            className="transition-transform group-hover:translate-y-1"
          />
        </a>
      </div>
    </div>
  );
}

function HeroVisual() {
    return (
        <div
            className="relative mx-auto w-full max-w-[600px] px-2 pb-10 pt-5 sm:px-4 sm:pt-8 lg:max-w-[610px] lg:px-0 lg:pb-4"
        >
            <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[82%] w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-[60px] bg-gradient-to-br from-primary/15 via-white to-secondary/15 blur-[45px]"
            />

            <div
                aria-hidden="true"
                className="absolute -right-2 top-4 h-36 w-36 opacity-30 [background-image:radial-gradient(#c01f53_1.5px,transparent_1.5px)] [background-size:14px_14px] sm:-right-5 sm:h-44 sm:w-44"
            />

            <div
                aria-hidden="true"
                className="absolute -left-3 bottom-20 size-28 rounded-full border-[20px] border-secondary/10 sm:-left-7 sm:size-36 sm:border-[25px]"
            />

            <div
                aria-hidden="true"
                className="absolute left-[14%] top-1 h-3 w-24 rounded-full bg-gradient-to-r from-primary via-logoYellow to-secondary opacity-80 shadow-sm sm:w-32"
            />

            <div
                className="relative mx-auto w-[92%] rounded-[32px] bg-white/75 p-2.5 shadow-[0_30px_80px_rgba(15,23,42,0.15)] ring-1 ring-white backdrop-blur-xl sm:w-[87%] sm:rounded-[40px] sm:p-3 lg:w-[82%]"
            >
                <div
                    className="relative aspect-[4/3] overflow-hidden rounded-[25px] bg-gradient-to-br from-[#fff8fb] via-white to-[#eaf6ff] sm:rounded-[32px]"
                >
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 z-[1] opacity-[0.055] [background-image:radial-gradient(#631A33_1px,transparent_1px)] [background-size:18px_18px]"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute -right-20 -top-16 z-[1] size-56 rounded-full border-[28px] border-white/50 bg-secondary/[0.08]"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute -bottom-20 -left-20 z-[1] size-48 rounded-full bg-primary/[0.08] blur-2xl"
                    />

                    <Image
                        src="/assets/canada-migration.webp"
                        alt="Study in Canada opportunities for students from Kerala"
                        fill
                        priority
                        sizes="
                            (max-width: 640px) 84vw,
                            (max-width: 1024px) 72vw,
                            (max-width: 1280px) 42vw,
                            500px
                        "
                        className="relative z-[2] object-contain object-center p-5 transition-transform duration-700 hover:scale-[1.025] sm:p-6 lg:p-7"
                    />

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[42%] bg-gradient-to-t from-[#071b36]/20 via-[#071b36]/5 to-transparent"
                    />

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-br from-white/10 via-transparent to-secondary/5"
                    />
                </div>

                <div
                    aria-hidden="true"
                    className="absolute right-2 top-2 size-16 rounded-tr-[25px] border-r-[9px] border-t-[9px] border-logoYellow sm:right-3 sm:top-3 sm:size-20 sm:border-r-[12px] sm:border-t-[12px]"
                />

                <div
                    aria-hidden="true"
                    className="absolute bottom-2 left-2 size-14 rounded-bl-[22px] border-b-[8px] border-l-[8px] border-secondary sm:bottom-3 sm:left-3 sm:size-20 sm:border-b-[11px] sm:border-l-[11px]"
                />

            </div>


            <div
                className="relative z-20 mx-auto -mt-4 grid max-w-[88%] grid-cols-2 gap-3 sm:-mt-6 sm:max-w-[80%] lg:absolute lg:bottom-0 lg:left-1/2 lg:w-[74%] lg:-translate-x-1/2 lg:mt-0"
            >


            </div>

            <div
                aria-hidden="true"
                className="absolute right-[2%] top-[31%] hidden h-24 w-5 rounded-full bg-gradient-to-b from-logoYellow via-primary to-secondary shadow-[0_10px_25px_rgba(192,31,83,0.2)] lg:block"
            />
        </div>
    );
}



function HeroBackground() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
        >
            {/* Main square grid */}
            <div
                className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(99,26,51,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(99,26,51,0.08)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
            />

            {/* Smaller grid on right */}
            <div
                className="absolute right-0 top-0 h-full w-[48%] opacity-[0.2] [background-image:linear-gradient(rgba(4,102,175,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(4,102,175,0.09)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]"
            />

            <div
                className="absolute -left-32 top-10 size-[420px] rounded-full bg-primary/10 blur-[120px]"
            />

            <div
                className="absolute -right-32 bottom-0 size-[430px] rounded-full bg-secondary/10 blur-[130px]"
            />

            <div
                className="absolute left-[44%] top-1/2 hidden h-[80%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/10 to-transparent lg:block"
            />

            <div
                className="absolute left-[5%] top-[15%] size-2 rounded-full bg-primary/40 shadow-[38px_28px_0_rgba(192,31,83,0.15),78px_-12px_0_rgba(4,102,175,0.15)]"
            />
        </div>
    );
}