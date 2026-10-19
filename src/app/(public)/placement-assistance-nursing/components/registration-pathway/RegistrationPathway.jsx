
import PathwayHeader from "./PathwayHeader";
import PathwayStep from "./PathwayStep";

import { pathwaySteps } from "./pathwayData";

export default function RegistrationPathway() {
  return (
    <section
      id="registration-pathway"
      aria-labelledby="registration-pathway-title"
      className="relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="relative mx-auto w-full max-w-[1920px] px-5 sm:px-8 lg:px-10 xl:px-12">
        <PathwayHeader />

        <div className="relative mt-12 sm:mt-16 lg:mt-20">
          <ol className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-5 sm:gap-y-10 xl:grid-cols-8 xl:gap-x-3">
            {pathwaySteps.map((step, index) => (
              <PathwayStep
                key={step.id}
                step={step}
                index={index}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
