import HeroBackground from "./hero/HeroBackground";
import HeroBreadcrumb from "./hero/HeroBreadcrumb";
import HeroContent from "./hero/HeroContent";
import HeroVisual from "./hero/HeroVisual";

export default function BranchHero({
  center,
}) {
  if (!center) {
    return null;
  }

  const location =
    center?.seoLocation ||
    center?.city ||
    center?.district ||
    "Kerala";

  const branchName =
    center?.name ||
    `Medcity ${location}`;

  const description =
    center?.seoDescription ||
    `Visit Medcity Overseas ${location} for expert study abroad counselling, university admissions, course selection and student visa guidance.`;

  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        bg-gradient-to-br
        from-[#fffafd]
        via-[#f8fbff]
        to-[#f2f8ff]
        py-8
        sm:py-10
        md:py-12
        xl:py-14
      "
    >
      <HeroBackground />

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1600px]
          px-4
          sm:px-6
          lg:px-8
          xl:px-10
        "
      >
        <HeroBreadcrumb
          location={location}
        />

        <div
          className="
            grid
            items-center
            gap-12
            xl:grid-cols-[0.82fr_1.18fr]
            xl:gap-12
            2xl:gap-16
          "
        >
          <HeroContent
            center={center}
            location={location}
            branchName={branchName}
            description={description}
          />

          <HeroVisual
            center={center}
            location={location}
            branchName={branchName}
          />
        </div>
      </div>
    </section>
  );
}