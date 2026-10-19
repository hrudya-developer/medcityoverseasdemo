
import MastersRouteHeader from "./MastersRouteHeader";
import MastersRouteCard from "./MastersRouteCard";
import { mastersRouteData } from "./mastersRouteData";

export default function MastersRouteSection() {
  return (
    <section
      className="
        relative overflow-hidden 
        py-16 sm:py-20 lg:py-24
      "
      aria-labelledby="masters-route-title"
    >
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-12">
        <MastersRouteHeader />

        {/* Staggered cards */}
        <div
          className="
            grid grid-cols-1
            gap-6
            md:grid-cols-2
            lg:grid-cols-4
            lg:items-start
            lg:gap-5
            xl:gap-7
          "
        >
          {mastersRouteData.map((item, index) => {
            const staggerPosition =
              index === 0 || index === 3
                ? "lg:mt-24"
                : "lg:mt-0";

            return (
              <MastersRouteCard
                key={item.id}
                item={item}
                className={staggerPosition}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
