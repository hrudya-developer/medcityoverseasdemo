
import { registrationBenefits } from "./registrationData";

export default function RegistrationBenefits() {
  return (
    <div className="mt-7 flex flex-col gap-4 sm:mt-8 sm:gap-5">
      {registrationBenefits.map((benefit) => {
        const Icon = benefit.icon;

        return (
          <div
            key={benefit.id}
            className="group flex items-center gap-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-pink-200/70 bg-pink-100/90 text-[#c01f53] shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14">
              <Icon size={23} strokeWidth={2.2} />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-extrabold leading-snug text-[#080e26] sm:text-base">
                {benefit.title}
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#425578] sm:text-sm">
                {benefit.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
