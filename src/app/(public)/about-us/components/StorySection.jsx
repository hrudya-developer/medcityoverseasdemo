import Link from "next/link";

import cn from "@/lib/cn";

import {
  ArrowRight,
  Check,
  Globe2,
  Plane,
  Sparkles,
  Target,
} from "lucide-react";

import {
  missionPoints,
} from "../aboutData";

const VISION_POINTS = [
  "Become a trusted name in overseas education guidance.",
  "Connect students with leading global universities.",
  "Promote transparent and student-first counselling.",
];

const StorySection = () => {
  return (
    <section
      aria-labelledby="our-story-heading"
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#fffafd] to-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-secondary/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1500px]">
        <StoryCard />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <VisionCard />
          <MissionCard />
        </div>

        <QuickLinks />
      </div>
    </section>
  );
};

const StoryCard = () => {
  return (
    <article className="relative overflow-hidden rounded-[30px] border border-primary/10 bg-white px-6 py-8 shadow-[0_24px_70px_rgba(99,26,51,0.09)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-2/5 opacity-[0.035] [background-image:radial-gradient(#c01f53_1.2px,transparent_1.2px)] [background-size:18px_18px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary">
            <Sparkles
              aria-hidden="true"
              className="h-4 w-4"
            />

            Our Story
          </div>

          <h2
            id="our-story-heading"
            className="mt-5 max-w-3xl font-nunito text-3xl font-black leading-tight text-[#10204a] sm:text-4xl lg:text-5xl"
          >
            Trusted Guidance for{" "}
            <span className="text-primary">
              Overseas Education
            </span>
          </h2>

          <p className="mt-6 max-w-4xl text-sm leading-7 text-slate-600 sm:text-sm sm:leading-8">
            Medcity Overseas provides personalised overseas education
            guidance for students planning to study at universities around
            the world. Our experienced study abroad counsellors help
            students explore{" "}
            <Link
              href="/destinations"
              className="font-semibold text-primary underline-offset-4 transition-colors hover:text-darkPrimary hover:underline"
            >
              international study destinations
            </Link>
            , compare{" "}
            <Link
              href="/universities"
              className="font-semibold text-secondary underline-offset-4 transition-colors hover:text-blue-800 hover:underline"
            >
              universities abroad
            </Link>
            {" "}and choose suitable{" "}
            <Link
              href="/courses"
              className="font-semibold text-primary underline-offset-4 transition-colors hover:text-darkPrimary hover:underline"
            >
              study abroad courses
            </Link>
            {" "}based on their academic background, career goals and
            personal preferences.
          </p>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 sm:text-sm sm:leading-8">
            Our end-to-end study abroad services include university
            applications, admission documentation, scholarship guidance,
            language preparation, education counselling, student visa
            assistance and pre-departure support. From the first counselling
            session to final departure, our goal is to make the overseas
            education process clear, transparent and student-focused.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[26px] border border-primary/10 bg-gradient-to-br from-primary/[0.07] via-white to-secondary/[0.08] p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-secondary/10 blur-3xl"
          />

          <div className="relative z-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-darkPrimary text-white shadow-lg shadow-primary/20">
              <Plane
                aria-hidden="true"
                className="h-7 w-7 -rotate-12"
              />
            </div>

            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.14em] text-secondary">
              Student-first approach
            </p>

            <h3 className="mt-3 text-2xl font-black leading-snug text-[#10204a] sm:text-3xl">
              From first counselling to final departure
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Our counsellors support students throughout their study
              abroad journey, helping simplify university applications,
              documentation, visa preparation and pre-departure planning
              with clear and personalised guidance.
            </p>

            <div
              aria-hidden="true"
              className="mt-7 flex items-center gap-3 text-primary"
            >
              <span className="h-px flex-1 border-t border-dashed border-primary/30" />
              <Plane className="h-5 w-5 rotate-12" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const VisionCard = () => {
  return (
    <article
      aria-labelledby="vision-heading"
      className="group relative overflow-hidden rounded-[22px] border border-secondary/10 bg-white p-5 shadow-[0_14px_40px_rgba(4,102,175,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(4,102,175,0.11)] sm:p-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-secondary/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 opacity-[0.045] [background-image:radial-gradient(#0466AF_1.2px,transparent_1.2px)] [background-size:13px_13px]"
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-transform duration-300 group-hover:scale-105"
          >
            <Globe2 className="h-5 w-5" />
          </span>

          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-secondary/70">
              Where we are going
            </p>

            <h2
              id="vision-heading"
              className="mt-0.5 text-xl font-black text-secondary sm:text-2xl"
            >
              Our Vision
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          To create a future where students across Kerala and beyond can
          confidently access reliable overseas education guidance, quality
          international universities and meaningful global opportunities.
        </p>

        <div className="mt-4 space-y-2.5">
          {VISION_POINTS.map((point) => (
            <PointItem
              key={point}
              point={point}
              variant="secondary"
            />
          ))}
        </div>
      </div>
    </article>
  );
};

const MissionCard = () => {
  return (
    <article
      aria-labelledby="mission-heading"
      className="group relative overflow-hidden rounded-[22px] border border-primary/10 bg-white p-5 shadow-[0_14px_40px_rgba(192,31,83,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(192,31,83,0.11)] sm:p-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 opacity-[0.045] [background-image:radial-gradient(#c01f53_1.2px,transparent_1.2px)] [background-size:13px_13px]"
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105"
          >
            <Target className="h-5 w-5" />
          </span>

          <div>
            <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-primary/70">
              What we work toward
            </p>

            <h2
              id="mission-heading"
              className="mt-0.5 text-xl font-black text-primary sm:text-2xl"
            >
              Our Mission
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          To simplify the study abroad journey through transparent,
          personalised and dependable guidance for university selection,
          admissions, scholarships, student visas and pre-departure
          preparation.
        </p>

        <div className="mt-4 space-y-2.5">
          {missionPoints.map((point) => (
            <PointItem
              key={point}
              point={point}
              variant="primary"
            />
          ))}
        </div>
      </div>
    </article>
  );
};

const PointItem = ({
  point,
  variant,
}) => {
  const isPrimary =
    variant === "primary";

  return (
    <div
      className={cn(`
        flex items-start gap-2.5
        rounded-xl border
        px-3 py-2.5
        ${
          isPrimary
            ? "border-primary/10 bg-primary/[0.04]"
            : "border-secondary/10 bg-secondary/[0.045]"
        }
      `)}
    >
      <span
        aria-hidden="true"
        className={cn(`
          mt-0.5 flex
          h-5 w-5 shrink-0
          items-center justify-center
          rounded-full text-white
          shadow-sm
          ${
            isPrimary
              ? "bg-primary shadow-primary/20"
              : "bg-secondary shadow-secondary/20"
          }
        `)}
      >
        <Check
          className="h-3 w-3"
          strokeWidth={3}
        />
      </span>

      <p className="text-[13px] leading-5 text-slate-600">
        {point}
      </p>
    </div>
  );
};

const QuickLinks = () => {
  const links = [
    {
      href: "/universities",
      label: "Explore International Universities",
      className:
        "border-secondary/15 bg-secondary/5 text-secondary hover:bg-secondary hover:text-white",
    },
    {
      href: "/courses",
      label: "Find Study Abroad Courses",
      className:
        "border-primary/15 bg-primary/5 text-primary hover:bg-primary hover:text-white",
    },
    {
      href: "/branches",
      label: "Find Medcity Branches in Kerala",
      className:
        "border-darkPrimary/15 bg-darkPrimary/5 text-darkPrimary hover:bg-darkPrimary hover:text-white",
    },
  ];

  return (
    <nav
      aria-label="About Medcity Overseas quick links"
      className="mt-6 flex flex-col gap-3 rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:flex-row sm:flex-wrap"
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(`
            group flex min-h-12
            flex-1 items-center
            justify-between gap-3
            rounded-2xl border
            px-4 py-3
            text-sm font-extrabold
            transition-all duration-300
            ${link.className}
          `)}
        >
          <span>{link.label}</span>

          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      ))}
    </nav>
  );
};

export default StorySection;