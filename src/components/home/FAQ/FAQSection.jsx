"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  ChevronDown,
  CircleHelp,
  FileCheck2,
  GraduationCap,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import {
  faqItems,
  faqStats,
} from "./faqData";

const categoryIcons = {
  General: CircleHelp,
  Destinations: MapPin,
  "Courses & Universities": GraduationCap,
  "Applications & Visa": FileCheck2,
  "Financial Support": ShieldCheck,
  "Student Eligibility": BookOpenCheck,
  "Branches & Contact": Building2,
};

const FAQItem = ({
  faq,
  isOpen,
  onToggle,
}) => {
  const Icon = faq.icon;

  return (
    <article
      className={`
        overflow-hidden rounded-2xl border bg-white
        transition-all duration-300
        ${
          isOpen
            ? "border-primary/30 shadow-[0_18px_50px_rgba(192,31,83,0.10)]"
            : "border-slate-200 shadow-sm hover:border-primary/20 hover:shadow-md"
        }
      `}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${faq.id}`}
          className="
            flex w-full items-start justify-between
            gap-3 px-4 py-4 text-left
            sm:gap-4 sm:px-6 sm:py-5
          "
        >
          <span className="flex min-w-0 items-start gap-3 sm:gap-4">
            <span
              className={`
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl shadow-sm
                ${faq.iconClass}
              `}
            >
              <Icon
                className="h-5 w-5"
                aria-hidden="true"
              />
            </span>

            <span
              className="
                pt-1 text-sm font-bold leading-6
                text-slate-900
                sm:text-base sm:leading-7
                lg:text-lg
              "
            >
              {faq.question}
            </span>
          </span>

          <span
            className={`
              mt-0.5 flex h-9 w-9 shrink-0
              items-center justify-center rounded-full
              transition-all duration-300
              ${
                isOpen
                  ? "rotate-180 bg-primary text-white"
                  : "bg-slate-100 text-slate-600"
              }
            `}
          >
            <ChevronDown
              className="h-5 w-5"
              aria-hidden="true"
            />
          </span>
        </button>
      </h3>

      <div
        id={`faq-answer-${faq.id}`}
        className={`
          grid transition-all duration-300 ease-in-out
          ${
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="overflow-hidden">
          <div
            className="
              border-t border-slate-100
              px-4 pb-5 pt-4
              sm:px-6 sm:pb-6
            "
          >
            <p
              className="
                text-sm leading-7 text-slate-600
                sm:pl-14 sm:text-base sm:leading-8
              "
            >
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

const FAQStats = () => {
  return (
    <div
      className="
        mt-10 grid grid-cols-2 gap-3
        sm:gap-4 lg:grid-cols-4
      "
    >
      {faqStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="
              rounded-2xl border border-slate-200
              bg-white p-4 text-center
              shadow-sm transition duration-300
              hover:-translate-y-1 hover:shadow-lg
              sm:p-5
            "
          >
            <div
              className={`
                mx-auto flex h-11 w-11
                items-center justify-center
                rounded-xl bg-gradient-to-br
                text-white shadow-md
                ${stat.iconClass}
              `}
            >
              <Icon
                className="h-5 w-5"
                aria-hidden="true"
              />
            </div>

            <p
              className="
                mt-3 text-xl font-extrabold
                text-slate-950 sm:text-2xl
              "
            >
              {stat.value}
            </p>

            <p
              className="
                mt-1 text-xs font-semibold
                text-slate-500 sm:text-sm
              "
            >
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const FAQSection = () => {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [openFaqId, setOpenFaqId] =
    useState(null);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        faqItems.map(
          (faq) => faq.category
        )
      ),
    ];
  }, []);

  const filteredFaqs = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    return faqItems.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" ||
        faq.category === activeCategory;

      const matchesSearch =
        !normalizedSearch ||
        faq.question
          .toLowerCase()
          .includes(normalizedSearch) ||
        faq.answer
          .toLowerCase()
          .includes(normalizedSearch) ||
        faq.category
          .toLowerCase()
          .includes(normalizedSearch);

      return (
        matchesCategory && matchesSearch
      );
    });
  }, [activeCategory, searchTerm]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const handleCategoryChange = (
    category
  ) => {
    setActiveCategory(category);
    setOpenFaqId(null);
  };

 const resetFilters = () => {
  setSearchTerm("");
  setActiveCategory("All");
  setOpenFaqId(null);
};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            structuredData
          ),
        }}
      />

      <section
        id="frequently-asked-questions"
        className="
          relative overflow-hidden
          bg-gradient-to-b
          from-[#fff8fb] via-white to-[#f7faff]
          px-4 py-14
          sm:px-6 sm:py-18
          lg:px-8 lg:py-24
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -left-24 top-20 h-72 w-72
            rounded-full bg-primary/10 blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -right-24 bottom-20 h-80 w-80
            rounded-full bg-secondary/10 blur-3xl
          "
        />

        <div className="relative mx-auto max-w-[1450px]">
          <div className="mx-auto max-w-4xl text-center">
            <div
              className="
                mx-auto mb-5 inline-flex
                items-center gap-2 rounded-full
                border border-primary/15
                bg-white px-4 py-2
                text-xs font-extrabold uppercase
                tracking-[0.16em] text-primary
                shadow-sm
              "
            >
              <Sparkles className="h-4 w-4" />
              Study Abroad FAQs
            </div>

            <h2
              className="
                text-3xl font-extrabold
                leading-tight text-slate-950
                sm:text-4xl lg:text-5xl
              "
            >
              Your study abroad questions,{" "}
              <span className="text-primary">
                answered clearly
              </span>
            </h2>

            <p
              className="
                mx-auto mt-5 max-w-3xl
                text-sm leading-7 text-slate-600
                sm:text-base sm:leading-8
              "
            >
              Find answers about countries,
              universities, courses, applications,
              scholarships, visas and the services
              offered by MedCity Overseas.
            </p>
          </div>

          <FAQStats />

          <div className="mx-auto mt-10 max-w-2xl">
            <label
              htmlFor="faq-search"
              className="sr-only"
            >
              Search frequently asked questions
            </label>

            <div
              className="
                flex items-center gap-3
                rounded-2xl border border-slate-200
                bg-white p-2.5
                shadow-[0_14px_45px_rgba(15,23,42,0.08)]
                transition
                focus-within:border-primary/40
                focus-within:ring-4
                focus-within:ring-primary/10
              "
            >
              <span
                className="
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-xl bg-primary/10
                  text-primary
                "
              >
                <Search className="h-5 w-5" />
              </span>

              <input
                id="faq-search"
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
                placeholder="Search questions, countries, visa support..."
                className="
                  min-w-0 flex-1 bg-transparent
                  px-1 py-2 text-sm text-slate-900
                  outline-none
                  placeholder:text-slate-400
                  sm:text-base
                "
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() =>
                    setSearchTerm("")
                  }
                  className="
                    rounded-xl px-3 py-2
                    text-xs font-bold text-primary
                    transition hover:bg-primary/10
                  "
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div
            className="
              mt-7 flex gap-2 overflow-x-auto
              pb-3
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
              lg:flex-wrap lg:justify-center
              lg:overflow-visible
            "
          >
            {categories.map((category) => {
              const Icon =
                categoryIcons[category];

              const isActive =
                activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    handleCategoryChange(
                      category
                    )
                  }
                  className={`
                    flex shrink-0 items-center
                    gap-2 rounded-full border
                    px-4 py-2.5
                    text-xs font-bold
                    transition-all duration-300
                    sm:text-sm
                    ${
                      isActive
                        ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                        : "border-slate-200 bg-white text-slate-600 hover:border-primary/30 hover:text-primary"
                    }
                  `}
                >
                  {Icon && (
                    <Icon className="h-4 w-4" />
                  )}

                  {category}
                </button>
              );
            })}
          </div>

          <div className="mt-8 lg:mt-10">
            <div
              className="
                mb-5 flex items-center
                justify-between gap-4
              "
            >
              <p className="text-sm font-semibold text-slate-500">
                Showing{" "}
                <span className="text-slate-900">
                  {filteredFaqs.length}
                </span>{" "}
                {filteredFaqs.length === 1
                  ? "question"
                  : "questions"}
              </p>

              {activeCategory !== "All" && (
                <button
                  type="button"
                  onClick={() =>
                    handleCategoryChange("All")
                  }
                  className="
                    flex items-center gap-1
                    text-sm font-bold text-primary
                    transition hover:text-darkPrimary
                  "
                >
                  View all
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>

            {filteredFaqs.length > 0 ? (
              <div
                className="
                  grid items-start gap-4
                  lg:grid-cols-2 lg:gap-5
                "
              >
                {filteredFaqs.map((faq) => (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    isOpen={
                      openFaqId === faq.id
                    }
                    onToggle={() =>
                      setOpenFaqId((currentId) =>
                        currentId === faq.id
                          ? null
                          : faq.id
                      )
                    }
                  />
                ))}
              </div>
            ) : (
              <div
                className="
                  rounded-3xl border
                  border-dashed border-primary/25
                  bg-white px-6 py-14
                  text-center shadow-sm
                "
              >
                <div
                  className="
                    mx-auto flex h-16 w-16
                    items-center justify-center
                    rounded-2xl bg-primary/10
                    text-primary
                  "
                >
                  <Search className="h-7 w-7" />
                </div>

                <h3
                  className="
                    mt-5 text-xl font-extrabold
                    text-slate-900
                  "
                >
                  No matching questions found
                </h3>

                <p
                  className="
                    mx-auto mt-2 max-w-md
                    text-sm leading-7 text-slate-500
                  "
                >
                  Try a different keyword or
                  choose another FAQ category.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="
                    mt-6 rounded-xl bg-primary
                    px-5 py-3 text-sm font-bold
                    text-white transition
                    hover:bg-darkPrimary
                  "
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>

          <div
            className="
              relative mt-12 overflow-hidden
              rounded-[28px]
              bg-gradient-to-r
              from-darkPrimary via-primary
              to-[#d4386d]
              px-6 py-8 text-white
              shadow-[0_24px_70px_rgba(99,26,51,0.24)]
              sm:px-9
              lg:flex lg:items-center
              lg:justify-between lg:gap-10
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute -right-10 -top-16
                h-48 w-48 rounded-full
                border-[30px] border-white/10
              "
            />

            <div className="relative max-w-2xl">
              <p
                className="
                  text-xs font-bold uppercase
                  tracking-[0.18em] text-white/70
                "
              >
                Need personalised guidance?
              </p>

              <h3
                className="
                  mt-2 text-2xl font-extrabold
                  sm:text-3xl
                "
              >
                Still have questions about
                studying abroad?
              </h3>

              <p
                className="
                  mt-3 text-sm leading-7
                  text-white/80 sm:text-base
                "
              >
                Speak with the MedCity Overseas
                counselling team and receive
                guidance based on your profile,
                course and destination.
              </p>
            </div>

            <Link
              href="/contact-us"
              className="
                relative mt-6 inline-flex
                items-center justify-center gap-2
                rounded-xl bg-white
                px-6 py-3.5 text-sm font-extrabold
                text-primary shadow-lg
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-logoYellow
                hover:text-darkPrimary
                lg:mt-0 lg:shrink-0
              "
            >
              Contact Our Team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;