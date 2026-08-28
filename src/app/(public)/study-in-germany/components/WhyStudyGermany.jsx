import {
    GraduationCap,
    Wrench,
    Globe2,
    BriefcaseBusiness,
  } from "lucide-react";
  
  const reasons = [
    {
      title: "Quality Education",
      description:
        "Study across diverse academic and professional programs with strong learning opportunities.",
      icon: GraduationCap,
    },
    {
      title: "Practical Learning",
      description:
        "Build useful skills through applied study, projects, internships, and hands-on training.",
      icon: Wrench,
    },
    {
      title: "Global Exposure",
      description:
        "Experience an international environment and connect with students from different backgrounds.",
      icon: Globe2,
    },
    {
      title: "Career Opportunities",
      description:
        "Explore career pathways and professional opportunities in Germany after completing your studies.",
      icon: BriefcaseBusiness,
    },
  ];
  
  export default function WhyStudyGermany() {
    return (
      <section
        aria-labelledby="why-study-germany-heading"
        className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        {/* Decorative backgrounds */}
        <div
          aria-hidden="true"
          className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
        />
  
        <div
          aria-hidden="true"
          className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-secondary/5 blur-3xl"
        />
  
        <div className="relative mx-auto max-w-7xl">
          {/* Heading */}
          <div className="text-center sm:text-left">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Why Germany?
            </p>
  
            <h2
              id="why-study-germany-heading"
              className="mt-3 text-3xl font-black tracking-tight text-darkPrimary sm:text-4xl lg:text-5xl"
            >
              Why Study in Germany?
            </h2>
  
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              Build your education and career in one of Europe&apos;s
              leading study destinations.
            </p>
          </div>
  
          {/* Cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
  
              return (
                <article
                  key={reason.title}
                  className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_12px_35px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_22px_50px_rgba(99,26,51,0.12)]"
                >
                  {/* Card number */}
                  <span className="absolute right-5 top-5 text-5xl font-black text-slate-100">
                    0{index + 1}
                  </span>
  
                  {/* Icon */}
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon
                      aria-hidden="true"
                      size={26}
                      strokeWidth={2}
                    />
                  </div>
  
                  {/* Content */}
                  <h3 className="mt-6 text-xl font-extrabold text-slate-950">
                    {reason.title}
                  </h3>
  
                  <div
                    aria-hidden="true"
                    className="mt-3 h-1 w-10 rounded-full bg-primary"
                  />
  
                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    {reason.description}
                  </p>
  
                  {/* Bottom decoration */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full"
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }