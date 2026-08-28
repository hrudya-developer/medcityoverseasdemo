"use client";

import {
  useMemo,
} from "react";

import {
  ArrowRight,
  Banknote,
  Check,
  Earth,
  Languages,
  Phone,
  Thermometer,
  University,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";


import DestinationHero from "./DestinationHero";
import DestinationUniversities from "./DestinationUniversities";
import DestinationFAQ from "./DestinationFAQ";

const DEFAULT_IMAGE =
  "/images/destination-fallback.webp";

function safeText(
  value,
  fallback = ""
) {
  if (
    value === null ||
    value === undefined
  ) {
    return fallback;
  }

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    return (
      String(value).trim() ||
      fallback
    );
  }

  return fallback;
}

export default function DestinationDetailsClient({
  countryId,
  country,
  highlights = [],
  universities = [],
  universityImagePath = "",
  image,
  flag,
  seo,
}) {
  const countryName =
    useMemo(
      () =>
        safeText(
          country?.country ??
            country?.country_name ??
            country?.destination_name ??
            country?.name,
          "Study Destination"
        ),
      [country]
    );

  const safeImage =
    image || DEFAULT_IMAGE;

  return (
    <main className="overflow-hidden bg-[#f8fafc]">
      <DestinationHero
        country={country}
        countryName={
          countryName
        }
        image={safeImage}
        flag={flag}
        seo={seo}
      />

      <DestinationQuickInfo
        country={country}
      />

      <DestinationAbout
        country={country}
        countryName={
          countryName
        }
        image={safeImage}
      />

      <DestinationBenefits
        countryName={
          countryName
        }
        highlights={
          highlights
        }
      />

      <DestinationUniversities
        countryId={
          countryId
        }
        countryName={
          countryName
        }
        universities={
          universities
        }
        universityImagePath={
          universityImagePath
        }
      />

      <DestinationCTA
        countryName={
          countryName
        }
      />

      <section
        aria-label={`Frequently asked questions about studying in ${countryName}`}
        className="bg-white"
      >
        <DestinationFAQ
  countryName={countryName}
/>
      </section>
    </main>
  );
}

/* =========================================================
   QUICK INFO
========================================================= */

function DestinationQuickInfo({
  country,
}) {
  const currencyName =
    safeText(
      country?.currency
    );

  const currencySymbol =
    safeText(
      country?.currency_symbol ??
        country?.currencySymbol
    );

  const currency = [
    currencySymbol,
    currencyName,
  ]
    .filter(Boolean)
    .join(" ");

  const items = [
    {
      icon: University,
      label: "Capital",
      value: safeText(
        country?.capital,
        "N/A"
      ),
    },

    {
      icon: Languages,
      label: "Language",
      value: safeText(
        country?.language ??
          country
            ?.official_language,
        "N/A"
      ),
    },

    {
      icon: Banknote,
      label: "Currency",
      value:
        currency || "N/A",
    },

    {
      icon: Phone,
      label: "Dialling Code",
      value: safeText(
        country?.diallingcode ??
          country?.dialling_code ??
          country?.phone_code,
        "N/A"
      ),
    },

    {
      icon: Thermometer,
      label: "Temperature",
      value: safeText(
        country?.temperature ??
          country?.climate,
        "N/A"
      ),
    },

    {
      icon: Earth,
      label: "Continent",
      value: safeText(
        country?.continent,
        "N/A"
      ),
    },
  ];

  return (
    <section
      aria-label="Destination information"
      className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {items.map(
          ({
            icon: Icon,
            label,
            value,
          }) => (
            <article
              key={label}
              className="group rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
            >
              <span className="mx-auto grid size-11 place-content-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                <Icon
                  size={19}
                  aria-hidden="true"
                />
              </span>

              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                {label}
              </p>

              <p className="mt-1 break-words text-sm font-black text-darkPrimary">
                {value}
              </p>
            </article>
          )
        )}
      </div>
    </section>
  );
}

/* =========================================================
   ABOUT
========================================================= */

function DestinationAbout({
  country,
  countryName,
  image,
}) {
  const description =
    safeText(
      country?.description ??
        country?.short_description ??
        country?.details ??
        country?.content,
      `Explore education, lifestyle and career opportunities in ${countryName}.`
    );

  return (
    <section
      aria-labelledby="destination-about-heading"
      className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
    >
      <div className="grid overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.07)] lg:grid-cols-[1.15fr_0.85fr]">
        <article className="p-6 sm:p-8 lg:p-10">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">
            Destination Overview
          </p>

          <h2
            id="destination-about-heading"
            className="mt-3 text-3xl font-black tracking-tight text-darkPrimary sm:text-4xl"
          >
            About {countryName}
          </h2>

          <div className="mt-4 flex gap-2">
            <span className="h-1 w-12 rounded-full bg-primary" />
            <span className="h-1 w-6 rounded-full bg-secondary" />
            <span className="h-1 w-3 rounded-full bg-logoYellow" />
          </div>

          <p className="mt-6 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            {description}
          </p>
        </article>

        <div className="relative min-h-[340px] sm:min-h-[420px]">
          <Image
            src={image}
            alt={`Study and student life in ${countryName}`}
            fill
            sizes="
              (max-width: 1023px) 100vw,
              40vw
            "
            className="object-cover"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent"
          />

          <p className="absolute inset-x-6 bottom-6 text-base font-semibold leading-7 text-white sm:inset-x-8 sm:bottom-8 sm:text-lg">
            Discover education,
            international exposure and
            career opportunities in{" "}
            {countryName}.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   BENEFITS
========================================================= */

function DestinationBenefits({
  countryName,
  highlights = [],
}) {
  if (
    !Array.isArray(highlights) ||
    highlights.length === 0
  ) {
    return null;
  }

  return (
    <section
      aria-labelledby="destination-benefits-heading"
      className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
    >
      <div className="rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)] sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">
          Destination Benefits
        </p>

        <h2
          id="destination-benefits-heading"
          className="mt-3 text-2xl font-black text-darkPrimary sm:text-3xl"
        >
          Why Choose{" "}
          {countryName}?
        </h2>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(
            (item) => (
              <article
                key={item.id}
                className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-white hover:shadow-md"
              >
                <span className="grid size-9 shrink-0 place-content-center rounded-full bg-primary text-white transition group-hover:bg-darkPrimary">
                  <Check
                    size={16}
                    aria-hidden="true"
                  />
                </span>

                <p className="pt-1 text-sm font-semibold leading-6 text-slate-700">
                  {item.text}
                </p>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CTA
========================================================= */

function DestinationCTA({
  countryName,
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-secondary via-[#075891] to-[#07477f] p-7 text-white shadow-[0_18px_45px_rgba(4,102,175,0.20)] sm:p-9">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:18px_18px]"
        />

        <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-white/70">
              Start Your Journey
            </p>

            <h2 className="mt-3 text-2xl font-black sm:text-3xl">
              Ready to Study in{" "}
              {countryName}?
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
              Get guidance for university
              selection, eligibility,
              admissions, documentation and
              student visa preparation.
            </p>
          </div>

          <Link
            href="/contact-us"
            className="group inline-flex min-h-13 shrink-0 items-center justify-center gap-3 rounded-xl bg-white px-6 py-3 text-sm font-bold text-darkPrimary shadow-lg transition hover:-translate-y-1 hover:bg-logoYellow"
          >
            Get Free Counselling

            <ArrowRight
              size={17}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}