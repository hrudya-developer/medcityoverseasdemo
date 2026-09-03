import Image from "next/image";

export default function PartnerCard({ partner }) {
  return (
    <article
      className="
        group relative flex h-[245px] flex-col items-center justify-center
        overflow-hidden rounded-[26px]
        border border-pink-100/80
        bg-gradient-to-b from-white via-white to-pink-50/60
        px-6 py-6 text-center
        shadow-[0_8px_30px_rgba(236,72,153,0.08)]
        transition-all duration-300
        hover:-translate-y-2
        hover:border-pink-200
        hover:shadow-[0_18px_45px_rgba(236,72,153,0.16)]
      " data-aos="fade-up"
    >
      {/* Pink hover glow */}
      <div
        className="
          pointer-events-none absolute -right-16 -top-16
          h-36 w-36 rounded-full bg-pink-100/40
          blur-2xl transition-all duration-500
          group-hover:scale-150 group-hover:bg-pink-200/50
        "
      />

      {/* Top accent */}
      <div
        className="
          absolute left-1/2 top-0 h-[3px] w-0
          -translate-x-1/2 rounded-full bg-primary
          transition-all duration-300
          group-hover:w-20
        "
      />

      {/* Logo */}
      <div
        className="
          relative mb-5 flex h-[90px] w-full
          items-center justify-center
        "
      >
        <Image
          src={partner.logo}
          alt={`${partner.name} logo`}
          fill
          sizes="260px"
          className="
            object-contain object-center
            transition-transform duration-300
            group-hover:scale-110
          "
        />
      </div>

      {/* University name */}
      <h3
        className="
          relative z-10 min-h-12
          text-[16px] font-semibold leading-6
          text-slate-900 transition-colors duration-300
          group-hover:text-primary
        "
      >
        {partner.name}
      </h3>

      {/* Divider */}
      <span
        className="
          my-3 block h-[2px] w-8 rounded-full
          bg-pink-200 transition-all duration-300
          group-hover:w-14 group-hover:bg-primary
        "
      />

      {/* Country */}
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />

        <p className="text-sm font-medium text-primary">
          {partner.country}
        </p>
      </div>
    </article>
  );
}