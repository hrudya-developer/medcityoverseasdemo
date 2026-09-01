import Image from "next/image";

import {
  Award,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  Plane,
  Users,
} from "lucide-react";

import "./about.css";

const teamMembers = [
  {
    name: "Simi Josi",
    role: "CEO",
    image: "/assets/Simi-Josi-CEO-Medcity.png",
    imageAlt:
      "Simi Josi, CEO of Medcity International Academy",
    description:
      "Leading Medcity with a student-focused vision to expand international education opportunities and support students in achieving their global academic goals.",
    theme: "pink",
    icon: Award,
    number: "01",
  },
  {
    name: "Manoj Mathew",
    role: "COO",
    image: "/assets/Manoj-Mathew-COO-Medcity.png",
    imageAlt:
      "Manoj Mathew, COO of Medcity International Academy",
    description:
      "Driving operational excellence across Medcity to deliver reliable, efficient and student-focused overseas education support.",
    theme: "blue",
    icon: BriefcaseBusiness,
    number: "02",
  },
  {
    name: "Sangeetha Gopi",
    role: "CAO",
    image: "/assets/Sangeetha-Gopi-CAO-Medcity.png",
    imageAlt:
      "Sangeetha Gopi, CAO of Medcity International Academy",
    description:
      "Supporting academic quality and student success through a strong commitment to education, guidance and personalised learning experiences.",
    theme: "pink",
    icon: Building2,
    number: "03",
  },
  {
    name: "Anil Mohan",
    role: "CFO",
    image: "/assets/Anil-Mohan-CFO-Medcity.png",
    imageAlt:
      "Anil Mohan, CFO of Medcity International Academy",
    description:
      "Strengthening Medcity through responsible financial leadership, sustainable growth and continued investment in quality international education services.",
    theme: "blue",
    icon: ChartNoAxesCombined,
    number: "04",
  },
];

const AboutTeamMembers = () => {
  return (
    <section
      id="leadership-team"
      aria-labelledby="leadership-team-heading"
      aria-describedby="leadership-team-description"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <TeamBackground />

      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            SECTION HEADER
        ===================================================== */}
        <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-secondary/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-secondary sm:text-sm">
            <Users
              aria-hidden="true"
              className="h-4 w-4"
            />

            Our Leadership
          </div>

          <h2
            id="leadership-team-heading"
            className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[46px]"
          >
            Meet the Leadership Team at{" "}
            <span className="bg-gradient-to-r from-primary via-[#e23069] to-darkPrimary bg-clip-text text-transparent">
              Medcity Overseas
            </span>
          </h2>

          <div
            aria-hidden="true"
            className="mt-5 flex items-center justify-center gap-3"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary sm:w-20" />

            <Plane className="h-5 w-5 rotate-45 text-primary" />

            <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary sm:w-20" />
          </div>

          <p
            id="leadership-team-description"
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base lg:text-[17px]"
          >
            Meet the experienced leadership team guiding Medcity Overseas
            with a shared commitment to international education, student
            success and personalised study abroad guidance.
          </p>
        </header>

        {/* =====================================================
            LEADERSHIP CARDS
        ===================================================== */}
        <div
          role="list"
          aria-label="Medcity Overseas leadership team"
          className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-7"
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.name}
              member={member}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamMemberCard = ({
  member,
  index,
}) => {
  const Icon = member.icon;
  const isPink = member.theme === "pink";

  const titleId =
    `leadership-member-${index + 1}`;

  return (
    <article
      role="listitem"
      aria-labelledby={titleId}
      className="team-card group relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_15px_45px_rgba(15,23,42,0.07)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_28px_65px_rgba(15,23,42,0.14)] motion-reduce:transform-none motion-reduce:transition-none"
      style={{
        animationDelay: `${index * 120}ms`,
      }}
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}
      {/* =====================================================
    IMAGE
===================================================== */}
<div
  className={`
    relative
    mx-3
    mt-3
    h-[340px]
    overflow-hidden
    rounded-2xl
    p-4
    sm:h-[350px]
    sm:p-5
    lg:h-[315px]
    xl:h-[355px]
    2xl:h-[390px]
    ${
      isPink
        ? "bg-gradient-to-br from-[#fff0f5] via-[#ffe6ef] to-[#fff7fa]"
        : "bg-gradient-to-br from-[#eef8ff] via-[#e3f2ff] to-[#f8fcff]"
    }
  `}
>
  {/* Dot pattern */}
  <div
    aria-hidden="true"
    className={`
      absolute
      inset-0
      opacity-35
      [background-size:18px_18px]
      ${
        isPink
          ? "[background-image:radial-gradient(#c01f53_1.2px,transparent_1.2px)]"
          : "[background-image:radial-gradient(#0466af_1.2px,transparent_1.2px)]"
      }
    `}
  />

  {/* Decorative number */}
  <span
    aria-hidden="true"
    className={`
      absolute
      right-5
      top-3
      z-[1]
      select-none
      text-6xl
      font-black
      ${
        isPink
          ? "text-primary/[0.06]"
          : "text-secondary/[0.06]"
      }
    `}
  >
    {member.number}
  </span>

  {/* Airplane decoration */}
  <div
    aria-hidden="true"
    className="absolute right-5 top-[82px] z-[2] h-24 w-28"
  >
    <div
      className={`
        absolute
        bottom-0
        left-0
        h-[70px]
        w-[100px]
        rounded-[50%]
        border-t-2
        border-dashed
        ${
          isPink
            ? "border-primary/35"
            : "border-secondary/35"
        }
      `}
    />

    <Plane
      className={`
        absolute
        right-0
        top-0
        h-[18px]
        w-[18px]
        rotate-45
        transition-all
        duration-700
        group-hover:-translate-y-3
        group-hover:translate-x-2
        motion-reduce:transform-none
        motion-reduce:transition-none
        ${
          isPink
            ? "text-primary"
            : "text-secondary"
        }
      `}
    />
  </div>

  {/* ===============================================
      ACTUAL PHOTO CONTAINER
      Padding on all four sides
  =============================================== */}
  {/* Actual team member photo */}
<div
  className="
    relative
    z-10
    h-full
    w-full
    overflow-hidden
    rounded-2xl
    bg-white/40
  "
>
  <Image
    src={member.image}
    alt={member.imageAlt}
    fill
    sizes="
      (max-width: 640px) 100vw,
      (max-width: 1024px) 50vw,
      25vw
    "
    className="
      rounded-2xl
      object-contain
      object-center
      transition-transform
      duration-700
      ease-out
      group-hover:scale-[1.025]
      motion-reduce:transform-none
      motion-reduce:transition-none
    "
  />
</div>
</div>

      {/* =====================================================
          ROLE ICON
      ===================================================== */}
      <div
        aria-hidden="true"
        className="relative z-20 -mt-7 flex justify-center"
      >
        <div
          className={`
            flex
            h-[58px]
            w-[58px]
            items-center
            justify-center
            rounded-full
            border-[4px]
            border-white
            text-white
            shadow-lg
            transition-all
            duration-500
            group-hover:scale-110
            group-hover:rotate-6
            motion-reduce:transform-none
            motion-reduce:transition-none
            ${
              isPink
                ? "bg-gradient-to-br from-[#e94278] to-primary shadow-primary/20"
                : "bg-gradient-to-br from-[#168fe0] to-secondary shadow-secondary/20"
            }
          `}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>

      {/* =====================================================
          MEMBER INFORMATION
      ===================================================== */}
      <div className="px-5 pb-7 pt-4 text-center sm:px-6">
        <h3
          id={titleId}
          className="text-xl font-bold tracking-tight text-[#102650] sm:text-[22px]"
        >
          {member.name}
        </h3>

        <p
          className={`
            mt-1
            text-sm
            font-semibold
            uppercase
            tracking-[0.16em]
            ${
              isPink
                ? "text-primary"
                : "text-secondary"
            }
          `}
        >
          {member.role}
        </p>

        <div
          aria-hidden="true"
          className={`
            mx-auto
            mt-3
            h-[2px]
            w-9
            rounded-full
            transition-all
            duration-500
            group-hover:w-16
            motion-reduce:transition-none
            ${
              isPink
                ? "bg-primary"
                : "bg-secondary"
            }
          `}
        />

        <p className="mx-auto mt-4 max-w-[280px] text-[14px] leading-6 text-slate-600">
          {member.description}
        </p>
      </div>

      {/* Bottom hover line */}
      <div
        aria-hidden="true"
        className={`
          absolute
          bottom-0
          left-1/2
          h-[3px]
          w-0
          -translate-x-1/2
          transition-all
          duration-500
          group-hover:w-full
          motion-reduce:transition-none
          ${
            isPink
              ? "bg-primary"
              : "bg-secondary"
          }
        `}
      />
    </article>
  );
};

const TeamBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#0466af_1px,transparent_1px),linear-gradient(90deg,#0466af_1px,transparent_1px)] [background-size:45px_45px]" />

      {/* Blue glow */}
      <div className="absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[120px]" />

      {/* Pink glow */}
      <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />

      {/* Decorative circles */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-secondary/10" />

      <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full border border-secondary/10" />
    </div>
  );
};

export default AboutTeamMembers;