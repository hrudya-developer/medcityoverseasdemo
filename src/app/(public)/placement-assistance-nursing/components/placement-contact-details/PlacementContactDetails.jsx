
import ContactHeader from "./ContactHeader";
import ContactActions from "./ContactActions";
import ContactAddress from "./ContactAddress";

export default function PlacementContactDetails({
  onConsultation,
}) {
  return (
    <section className="w-full min-w-0 overflow-hidden bg-white px-3 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="relative isolate mx-auto w-full max-w-[1440px] overflow-hidden rounded-[24px] border border-[#f6a8c9] bg-gradient-to-br from-[#fff4f8] via-[#fffafb] to-[#ffeef5] px-4 py-8 shadow-[0_18px_60px_rgba(192,31,83,0.06)] sm:rounded-[30px] sm:px-8 sm:py-12 xl:px-12 xl:py-16">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -bottom-44 -left-36 h-[350px] w-[350px] rounded-full bg-[#f9c7da]/45" />

          <div className="absolute -right-32 -top-40 h-[360px] w-[360px] rounded-full bg-[#fbd5e3]/50" />

          <div className="absolute bottom-[-150px] right-[-130px] h-[270px] w-[270px] rounded-full border-[55px] border-pink-200/30" />

          <div className="absolute left-1/3 top-0 h-64 w-64 rounded-full bg-white/50 blur-[90px]" />
        </div>

        {/* Main content */}
        <div className="relative z-10 grid min-w-0 grid-cols-1 items-center gap-9 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-10">
          {/* Left section */}
          <div className="min-w-0">
            <ContactHeader />
          </div>

          {/* Right section */}
          <div className="min-w-0 xl:border-l xl:border-[#f1b8cc] xl:pl-10">
            <ContactActions
              onConsultation={onConsultation}
            />
          </div>
        </div>

        {/* Address */}
        <ContactAddress />
      </div>
    </section>
  );
}
