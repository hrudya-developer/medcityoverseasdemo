import PlacementIntro from "./PlacementIntro";
import PlacementGrid from "./PlacementGrid";

export default function PlacementAssistanceSection({
  eligibilityHref = "/contact-us",
  brochureHref = "/contact-us",
}) {
  return (
    <section
      id="placement-assistance"
      aria-labelledby="placement-assistance-title"
      className="
        relative isolate
        w-full overflow-hidden
        bg-[#EFF8FF]
      "
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div
          className="
            grid w-full
            grid-cols-1
            items-center
            gap-0
            lg:grid-cols-2
          "
          data-aos="fade-up"
        >
          {/* Left content */}
          <div className="relative z-10 min-w-0">
            <PlacementIntro
              eligibilityHref={eligibilityHref}
            />
          </div>

          {/* Right image collage */}
          <div className="relative min-w-0">
            <PlacementGrid />
          </div>
        </div>
      </div>
    </section>
  );
}