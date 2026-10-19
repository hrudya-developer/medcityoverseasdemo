
import UKPlacementIntro from "./UKPlacementIntro";
import UKPlacementVisual from "./UKPlacementVisual";
import UKPlacementHighlights from "./UKPlacementHighlights";

export default function UKNursingPlacementSection() {
  return (
    <section
      id="uk-nursing-placement"
      aria-labelledby="uk-nursing-placement-title"
      className="
        relative w-full
        overflow-hidden
        bg-white px-3 py-10
        sm:px-6 sm:py-14
        lg:px-8 lg:py-20
      "
    >
      {/* Main banner */}
      <div
        className="
          relative isolate
          mx-auto max-w-[1600px]
          overflow-hidden
          rounded-[28px]
          border border-[#f7e1ef]
          bg-gradient-to-br
          from-[#fffafd]
          via-white
          to-[#fce0f2]
          shadow-[0_25px_70px_rgba(75,25,65,0.07)]
          sm:rounded-[36px]
          lg:rounded-[42px]
        "
      >
        {/* Background accents */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -left-24 -bottom-32
            h-[360px] w-[360px]
            rounded-full
            bg-[#f9c4ee]/45
            blur-[80px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-24 -top-24
            h-[400px] w-[400px]
            rounded-full
            bg-[#f2b3e6]/35
            blur-[80px]
          "
        />

        {/* Main two-column content */}
        <div
          className="
            relative z-10 grid
            grid-cols-1 items-center
            lg:grid-cols-[1.05fr_0.95fr]
          "
        >
          <div className="min-w-0 lg:pl-12 xl:pl-16">
            <UKPlacementIntro />
          </div>

          <div className="min-w-0 px-5 pb-5 sm:px-10 lg:px-0 lg:pb-0">
            <UKPlacementVisual />
          </div>
        </div>

        {/* Highlights */}
        <div
          className="
            relative z-20
            mx-auto w-full
            max-w-[1450px]
            px-5 pb-8
            sm:px-10 sm:pb-10
            lg:-mt-8 lg:px-12
            xl:px-16
          "
        >
          <UKPlacementHighlights />
        </div>
      </div>
    </section>
  );
}
