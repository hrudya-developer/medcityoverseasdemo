import ServiceCard from "./ServiceCard";
import { servicesData } from "./servicesData";

export default function MedcityServicesSection() {
  return (
    <section
      id="medcity-services"
      aria-labelledby="medcity-services-title"
      className="
        relative isolate w-full
        overflow-hidden
        bg-gradient-to-b
        from-[#fffafd]
        via-[#fffaff]
        to-[#fdf8ff]
        py-16
        sm:py-20
        lg:py-24
      "
    >
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Left circles */}
        <div
          className="
            absolute -left-36 -top-20
            h-[360px] w-[360px]
            rounded-full bg-[#fde6f2]/60
          "
        />

        <div
          className="
            absolute -left-24 top-40
            h-[300px] w-[300px]
            rounded-full bg-[#f5e7ff]/40
          "
        />

        {/* Right circle */}
        <div
          className="
            absolute -right-36 top-16
            h-[400px] w-[400px]
            rounded-full bg-[#fce7f2]/60
          "
        />

        {/* Soft bottom glow */}
        <div
          className="
            absolute bottom-0 left-1/2
            h-[350px] w-[700px]
            -translate-x-1/2
            rounded-full
            bg-[#f5eaff]/35
            blur-[100px]
          "
        />

        {/* Decorative dotted curve */}
        <svg
          className="
            absolute right-0 top-36
            hidden h-[230px] w-[260px]
            lg:block
          "
          viewBox="0 0 260 230"
          fill="none"
        >
          <path
            d="M260 20 C170 10 110 60 65 125 C30 175 20 205 0 230"
            stroke="#f5a6cb"
            strokeWidth="2"
            strokeDasharray="7 9"
            opacity=".65"
          />

          <circle
            cx="77"
            cy="108"
            r="12"
            fill="#fffafd"
            stroke="#ee8fbd"
            strokeWidth="6"
          />
        </svg>
      </div>

      {/* Main container */}
      <div
        className="
          relative z-10
          mx-auto w-full
          max-w-[1540px]
          px-5
          sm:px-8
          lg:px-12
          xl:px-14
        "
      >
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-[950px] text-center sm:mb-14">
          {/* Badge */}
          <span
            className="
              inline-flex items-center
              justify-center
              rounded-xl
              bg-[#f7ec22]
              px-5 py-3
              text-[11px] font-extrabold
              uppercase
              tracking-[0.18em]
              text-[#631a33]
              sm:px-7
              sm:text-xs
            "
          >
            End-to-End Support
          </span>

          {/* Title */}
          <h2
            id="medcity-services-title"
            className="
              mt-6
              text-3xl sm:text-4xl md:text-5xl font-black
              leading-[1.15]
              tracking-[-0.045em]
              text-[#201733]
            "
          >
            Comprehensive{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#e91e72]
                to-[#a922bc]
                bg-clip-text
                text-transparent
              "
            >
              Services
            </span>{" "}
            by Medcity
          </h2>

          {/* Accent line */}
          <div
            className="
              mx-auto mt-5
              h-[4px] w-16
              rounded-full
              bg-[#e91e72]
            "
          />

          {/* Subtitle */}
          <p
            className="
              mx-auto mt-5
              max-w-[700px]
              text-sm leading-7
              text-[#77758b]
              sm:text-base
              sm:leading-8
              lg:text-[17px]
            "
          >
            From application to arrival, we support you
            at every step of your journey to the UK
            with expert guidance and personalised assistance.
          </p>
        </div>

        {/* Services grid */}
        <div
          className="
            grid grid-cols-1
            gap-4
            sm:grid-cols-2
            sm:gap-5
            lg:grid-cols-3
            xl:grid-cols-4
            xl:gap-5
          "
        >
          {servicesData.map((item) => (
            <ServiceCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}