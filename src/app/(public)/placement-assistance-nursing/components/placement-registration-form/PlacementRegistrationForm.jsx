
import RegistrationIntro from "./RegistrationIntro";
import RegistrationFormCard from "./RegistrationFormCard";

export default function PlacementRegistrationForm({
  onSubmit,
}) {
  return (
    <section
      id="registration-form"
      className="relative isolate w-full scroll-mt-24 overflow-hidden bg-[#eaf2fb]"
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/assets/nursing-uk.webp')] bg-cover bg-center"
      />

      {/* Background overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/25 to-white/5 lg:bg-gradient-to-r lg:from-white/65 lg:via-white/20 lg:to-transparent"
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1600px] min-w-0 grid-cols-1 items-center gap-8 px-4 py-12 sm:px-7 sm:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8 lg:px-10 lg:py-20 xl:gap-12 xl:px-14">
        {/* Left content */}
        <div className="min-w-0 rounded-[24px] bg-white/65 p-5 backdrop-blur-[8px] sm:p-7 lg:bg-white/35 lg:p-8">
          <RegistrationIntro />
        </div>

        {/* Right form */}
        <div className="min-w-0">
          <RegistrationFormCard onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  );
}
