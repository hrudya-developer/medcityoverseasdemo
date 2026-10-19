
import MScRouteHeader from "./MScRouteHeader";
import MScTimelineCard from "./MScTimelineCard";
import MScBenefitCard from "./MScBenefitCard";

import {
  mscTimeline,
  mscBenefits,
} from "./mscRouteData";

export default function MScRouteSection() {
  return (
    <section
      id="msc-route"
      aria-labelledby="msc-route-title"
      className="
        relative isolate overflow-hidden
        bg-slate-100
        py-14 sm:py-20 lg:py-24
      "
    >
      <div
        className="
          relative mx-auto
          w-full max-w-[1500px]
          px-4 sm:px-6 lg:px-10 xl:px-12
        "
      >
        {/* Header */}
        <MScRouteHeader />

        {/* First row - Timeline */}
        <div
          className="
            grid grid-cols-1
            gap-5 md:grid-cols-2
            lg:gap-6
          "
        >
          {mscTimeline.map((item) => (
            <MScTimelineCard
              key={item.id}
              item={item}
            />
          ))}
        </div>

        {/* Second row - Benefits */}
        <div
          className="
            mt-5 grid grid-cols-1
            gap-5
            md:grid-cols-2
            lg:mt-6
            lg:grid-cols-3 lg:gap-6
          "
        >
          {mscBenefits.map((item) => (
            <MScBenefitCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
