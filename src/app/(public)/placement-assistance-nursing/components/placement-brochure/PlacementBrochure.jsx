
import BrochureHeader from "./BrochureHeader";
import BrochureCard from "./BrochureCard";
import BrochureFeatures from "./BrochureFeatures";

export default function PlacementBrochure({
  onRegister,
  registrationFormId = "registration-form",
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#080e26] py-16 text-white sm:py-20 lg:py-24">
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-40 -top-56 h-[550px] w-[550px] rounded-full bg-blue-700/10 blur-[110px]" />

        <div className="absolute -bottom-72 -left-44 h-[500px] w-[500px] rounded-full bg-pink-700/10 blur-[110px]" />

        <div className="absolute right-[-160px] top-[-220px] h-[450px] w-[450px] rounded-full border border-blue-400/10" />

        <div className="absolute right-[-100px] top-[-150px] h-[450px] w-[450px] rounded-full border border-blue-400/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <BrochureHeader />

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
          <BrochureCard
            onRegister={onRegister}
            registrationFormId={registrationFormId}
          />

          <BrochureFeatures />
        </div>
      </div>
    </section>
  );
}
