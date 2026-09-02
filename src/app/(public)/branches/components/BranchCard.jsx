import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function BranchCard({
  center,
  index,
}) {
  if (!center) {
    return null;
  }

  const branchNumber = String(
    index + 1
  ).padStart(2, "0");

  const city =
    center?.city ||
    center?.district ||
    center?.location ||
    "Kerala";

  const branchTitle =
    center?.seoTitle ||
    `Study Abroad Consultants in ${city}`;

  const branchDescription =
    center?.seoDescription ||
    `Visit Medcity Overseas ${city} for study abroad counselling, university applications, course selection and student visa guidance.`;

  const imageAlt =
    center?.imageAlt ||
    `${
      center?.name ||
      "Medcity Overseas"
    } study abroad counselling center in ${city}`;

  const phones = Array.isArray(
    center?.phones
  )
    ? center.phones
    : [];

  return (
    <article
      role="listitem"
      className="
        group relative flex h-full flex-col overflow-hidden
        rounded-[30px]
        border border-slate-200/80
        bg-white
        shadow-[0_16px_45px_rgba(15,23,42,0.07)]
        transition-all duration-500 ease-out
        hover:-translate-y-2
        hover:border-primary/20
        hover:shadow-[0_28px_65px_rgba(99,26,51,0.14)]
      "
    >
      {/* Top accent */}
      <div
        aria-hidden="true"
        className="
          absolute inset-x-8 top-0 z-20 h-[3px]
          origin-center scale-x-0
          rounded-full
          bg-gradient-to-r
          from-transparent
          via-primary
          to-transparent
          transition-transform duration-500
          group-hover:scale-x-100
        "
      />

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-20 -top-20
          h-48 w-48
          rounded-full
          bg-primary/[0.08]
          blur-3xl
          transition-all duration-700
          group-hover:scale-125
          group-hover:bg-primary/[0.13]
        "
      />

      {/* ================= IMAGE ================= */}
      <div className="relative p-2.5 pb-0">
        <div
          className="
            relative h-[215px]
            overflow-hidden
            rounded-[24px]
            bg-slate-100
            sm:h-[230px]
            lg:h-[220px]
          "
        >
          {center?.image && (
            <Image
              src={center.image}
              alt={imageAlt}
              fill
              sizes="
                (max-width: 639px) 100vw,
                (max-width: 1023px) 50vw,
                33vw
              "
              className="
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.06]
              "
            />
          )}

          {/* Image overlays */}
          <div
            aria-hidden="true"
            className="
              absolute inset-0
              bg-gradient-to-t
              from-[#101828]/75
              via-[#101828]/5
              to-transparent
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute inset-0
              bg-gradient-to-br
              from-primary/[0.08]
              via-transparent
              to-secondary/[0.08]
              opacity-0
              transition-opacity duration-500
              group-hover:opacity-100
            "
          />

          {/* Branch number */}
          <div
            className="
              absolute left-4 top-4
              inline-flex items-center gap-2
              rounded-full
              border border-white/60
              bg-white/90
              py-1.5 pl-1.5 pr-3
              shadow-[0_8px_25px_rgba(15,23,42,0.16)]
              backdrop-blur-xl
            "
          >
            <span
              className="
                flex h-7 min-w-7
                items-center justify-center
                rounded-full
                bg-primary
                px-1.5
                text-[10px] font-black
                text-white
              "
            >
              {branchNumber}
            </span>

            <span
    className="
        max-w-[150px]
        truncate
        text-[10px]
        font-extrabold
        uppercase
        tracking-[0.1em]
        text-slate-700
    "
>
    {city} Branch
</span>
          </div>

          {/* City */}
          <div
            className="
              absolute bottom-4 left-4
              inline-flex items-center gap-2
              rounded-full
              border border-white/25
              bg-slate-950/45
              px-3.5 py-2
              text-xs font-bold text-white
              shadow-lg
              backdrop-blur-xl
            "
          >
            <MapPin
              className="h-3.5 w-3.5 text-white"
              aria-hidden="true"
            />

            {city}
          </div>

          {/* Google Maps */}
          {center?.mapLink && (
            <a
              href={center.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${
                center?.name || city
              } on Google Maps`}
              title={`View ${
                center?.name || city
              } on Google Maps`}
              className="
                absolute bottom-4 right-4
                flex h-10 w-10
                items-center justify-center
                rounded-full
                border border-white/70
                bg-white
                text-primary
                shadow-[0_10px_25px_rgba(15,23,42,0.22)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:scale-105
                hover:bg-primary
                hover:text-white
                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-white/40
              "
            >
              <ArrowUpRight
                className="h-4 w-4"
                aria-hidden="true"
              />
            </a>
          )}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6">
        {/* Category */}
        <div className="mb-2 flex items-center gap-2">
          <span
            className="
              flex h-7 w-7
              items-center justify-center
              rounded-lg
              bg-primary/[0.08]
              text-primary
            "
          >
            <Building2
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />
          </span>

          <p
            className="
              text-[10px]
              font-extrabold uppercase
              tracking-[0.17em]
              text-primary
            "
          >
            Medcity Overseas
          </p>
        </div>

        {/* Branch heading - NOT A LINK */}
        <h2
          className="
            text-[20px] font-black
            leading-[1.35]
            tracking-[-0.02em]
            text-darkPrimary
            transition-colors duration-300
            group-hover:text-primary
            sm:text-[21px]
          "
        >
          {branchTitle}
        </h2>

        {/* Decorative line */}
        <div
          aria-hidden="true"
          className="mt-3 flex items-center gap-1.5"
        >
          <span className="h-1 w-8 rounded-full bg-primary" />
          <span className="h-1 w-3 rounded-full bg-secondary" />
          <span className="h-1 w-1 rounded-full bg-logoYellow" />
        </div>

        {/* Description */}
        <p
          className="
            mt-3
            text-[13px]
            leading-6
            text-slate-500
          "
        >
          {branchDescription}
        </p>

        {/* ================= CONTACT ================= */}
        <div
          className="
            mt-5 overflow-hidden
            rounded-[20px]
            border border-slate-100
            bg-slate-50/70
          "
        >
          {/* Address */}
          {center?.address && (
            <div
              className="
                flex items-start gap-3
                border-b border-slate-200/60
                px-4 py-3.5
                transition-colors duration-300
                hover:bg-white
              "
            >
              <ContactIcon>
                <MapPin
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </ContactIcon>

              <div className="min-w-0">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                  Address
                </p>

                <address className="mt-1 text-[13px] not-italic leading-5 text-slate-600">
                  {center.address}
                </address>
              </div>
            </div>
          )}

          {/* Phones */}
          {phones.length > 0 && (
            <div
              className="
                flex items-start gap-3
                border-b border-slate-200/60
                px-4 py-3.5
                transition-colors duration-300
                hover:bg-white
              "
            >
              <ContactIcon>
                <Phone
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </ContactIcon>

              <div className="min-w-0">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                  Call Us
                </p>

                <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1">
                  {phones.map(
                    (
                      phone,
                      phoneIndex
                    ) => (
                      <a
                        key={`${phone}-${phoneIndex}`}
                        href={`tel:${phone.replace(
                          /[^\d+]/g,
                          ""
                        )}`}
                        aria-label={`Call ${
                          center?.name ||
                          city
                        } at ${phone}`}
                        className="
                          text-[13px]
                          font-bold
                          text-secondary
                          transition-colors
                          hover:text-primary
                          hover:underline
                        "
                      >
                        {phone}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Email */}
          {center?.email && (
            <div
              className="
                flex items-start gap-3
                px-4 py-3.5
                transition-colors duration-300
                hover:bg-white
              "
            >
              <ContactIcon>
                <Mail
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </ContactIcon>

              <div className="min-w-0">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                  Email
                </p>

                <a
                  href={`mailto:${center.email}`}
                  aria-label={`Email ${
                    center?.name ||
                    city
                  }`}
                  className="
                    mt-1 block
                    break-all
                    text-[13px]
                    font-bold
                    text-secondary
                    transition-colors
                    hover:text-primary
                    hover:underline
                  "
                >
                  {center.email}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* ================= CTA ================= */}
        <div className="mt-auto pt-5">
          <Link
            href="/contact-us"
            aria-label={`Contact Medcity Overseas ${city}`}
            className="
              group/cta
              flex w-full
              items-center justify-between
              rounded-2xl
              border border-primary/10
              bg-gradient-to-r
              from-primary/[0.07]
              via-primary/[0.035]
              to-secondary/[0.06]
              px-4 py-3.5
              text-sm font-extrabold
              text-darkPrimary
              transition-all duration-300
              hover:border-primary/20
              hover:from-primary/[0.12]
              hover:to-secondary/[0.10]
              hover:text-primary
              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-primary/15
            "
          >
            <span>Contact Us</span>

            <span
              className="
                flex h-8 w-8
                items-center justify-center
                rounded-full
                bg-white
                text-primary
                shadow-sm
                transition-all duration-300
                group-hover/cta:translate-x-1
                group-hover/cta:bg-primary
                group-hover/cta:text-white
              "
            >
              <ArrowRight
                className="h-4 w-4"
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function ContactIcon({
  children,
}) {
  return (
    <span
      className="
        mt-0.5 flex h-9 w-9
        shrink-0 items-center justify-center
        rounded-xl
        border border-primary/[0.08]
        bg-white
        text-primary
        shadow-[0_5px_14px_rgba(15,23,42,0.05)]
      "
    >
      {children}
    </span>
  );
}