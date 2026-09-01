import {
    CheckCircle2,
    Globe2,
    GraduationCap,
  } from "lucide-react";
  
  const benefits = [
    {
      icon: GraduationCap,
      title:
        "University Guidance",
      description:
        "Explore universities and courses based on your academic goals.",
    },
    {
      icon: CheckCircle2,
      title:
        "Application Support",
      description:
        "Get assistance throughout important application stages.",
    },
    {
      icon: Globe2,
      title:
        "Global Destinations",
      description:
        "Compare study options across leading international destinations.",
    },
  ];
  
  export default function UniversitiesBenefits() {
    return (
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="rounded-[2rem] bg-gradient-to-r from-darkPrimary via-primary to-secondary px-7 py-10 text-white">
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map(
              ({
                icon: Icon,
                title,
                description,
              }) => (
                <div
                  key={title}
                  className="flex gap-4"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10">
                    <Icon size={23} />
                  </span>
  
                  <div>
                    <h3 className="font-black">
                      {title}
                    </h3>
  
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      {description}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    );
  }