import {
    Globe2,
    GraduationCap,
    Languages,
    PlaneTakeoff,
    ShieldCheck,
    Sparkles,
    Users,
  } from "lucide-react";
  
  import ServiceRow from "./ServiceRow";
  
  const services = [
    {
      icon: Users,
      title: "Expert Counsellors",
      subtitle: "Personalised guidance",
      rowClass:
        "bg-gradient-to-r from-[#fff1f6] via-white to-[#fff7fa]",
      iconClass:
        "bg-primary text-white",
      arrowClass:
        "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
    },
    {
      icon: Languages,
      title: "Language Training",
      subtitle: "Build global confidence",
      rowClass:
        "bg-gradient-to-r from-[#fff9d7] via-white to-[#fffdf0]",
      iconClass:
        "bg-logoYellow text-darkPrimary",
      arrowClass:
        "bg-logoYellow/30 text-darkPrimary group-hover:bg-logoYellow",
    },
    {
      icon: GraduationCap,
      title: "University Guidance",
      subtitle: "Find the right university",
      rowClass:
        "bg-gradient-to-r from-[#edf7ff] via-white to-[#f5fbff]",
      iconClass:
        "bg-secondary text-white",
      arrowClass:
        "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white",
    },
    {
      icon: Globe2,
      title: "Global Opportunities",
      subtitle: "Explore study destinations",
      rowClass:
        "bg-gradient-to-r from-[#fff1f6] via-white to-[#fff7fa]",
      iconClass:
        "bg-primary text-white",
      arrowClass:
        "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
    },
    {
      icon: PlaneTakeoff,
      title: "Pre-departure Guidance",
      subtitle: "Prepare for your journey",
      rowClass:
        "bg-gradient-to-r from-[#fff9d7] via-white to-[#fffdf0]",
      iconClass:
        "bg-logoYellow text-darkPrimary",
      arrowClass:
        "bg-logoYellow/30 text-darkPrimary group-hover:bg-logoYellow",
    },
    {
      icon: ShieldCheck,
      title: "Visa Support",
      subtitle: "End-to-end assistance",
      rowClass:
        "bg-gradient-to-r from-[#edf7ff] via-white to-[#f5fbff]",
      iconClass:
        "bg-secondary text-white",
      arrowClass:
        "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white",
    },
  ];
  
  export default function BranchServicesCard() {
    return (
      <div
        className="
          relative
          overflow-hidden
          rounded-[30px]
          border
          border-slate-200/70
          bg-white
          p-4
          shadow-[0_20px_60px_rgba(15,23,42,0.09)]
          sm:p-5
          md:min-h-[455px]
        "
      >
        {/* Color accents */}
  
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-14
            -top-14
            h-40
            w-40
            rounded-full
            bg-primary/15
            blur-3xl
          "
        />
  
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-16
            top-[35%]
            h-44
            w-44
            rounded-full
            bg-secondary/15
            blur-3xl
          "
        />
  
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-[-55px]
            left-[35%]
            h-40
            w-40
            rounded-full
            bg-logoYellow/20
            blur-3xl
          "
        />
  
        {/* Small grid */}
  
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.14]
            [background-image:linear-gradient(rgba(192,31,83,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(4,102,175,0.07)_1px,transparent_1px)]
            [background-size:24px_24px]
          "
        />
  
        {/* Header */}
  
        <div
          className="
            relative
            z-10
            mb-3
            flex
            items-center
            gap-3
            rounded-[18px]
            bg-gradient-to-r
            from-primary
            via-[#d63a70]
            to-secondary
            px-4
            py-3
            text-white
            shadow-[0_10px_28px_rgba(192,31,83,0.18)]
          "
        >
          <span
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-white/15
              backdrop-blur
            "
          >
            <Sparkles
              className="h-4 w-4"
              aria-hidden="true"
            />
          </span>
  
          <div>
            <p
              className="
                text-[11px]
                font-black
                uppercase
                tracking-[0.15em]
              "
            >
              Study Abroad Support
            </p>
  
            <p
              className="
                mt-0.5
                text-[10px]
                text-white/80
              "
            >
              Everything you need for your journey
            </p>
          </div>
        </div>
  
        {/* Rows */}
  
        <div
          className="
            relative
            z-10
            flex
            h-[calc(100%-64px)]
            flex-col
            justify-between gap-2
          "
        >
          {services.map((service) => (
            <ServiceRow
              key={service.title}
              {...service}
            />
          ))}
        </div>
      </div>
    );
  }