"use client";

import { useState } from "react";
import {
    ArrowUpRight,
  ChevronDown,
  HelpCircle,
  MapPin,
} from "lucide-react";

const branchFaqs = [
  {
    question:
      "Where are Medcity Overseas branches located in Kerala?",
    answer:
      "Medcity Overseas has study abroad counselling centers across Kerala, including Kannur, Kozhikode, Kochi, Kottayam, Thrissur, Kollam, Thiruvananthapuram, Thiruvalla, Pala, Thodupuzha, Kattappana, Mavelikkara, Muvattupuzha, Kothamangalam and other locations. You can use the branch directory above to find contact details for a nearby center.",
  },
  {
    question:
      "How can I find the nearest Medcity Overseas branch?",
    answer:
      "Browse the Medcity Overseas branch directory on this page to find a nearby study abroad counselling center. Each branch card provides its address, phone number and email address. Where available, you can also use the map link for directions.",
  },
  {
    question:
      "What services are available at Medcity Overseas branches?",
    answer:
      "Services may include study abroad counselling, course and university selection, overseas university application support, documentation guidance, student visa guidance and language or test preparation support. Available services can vary by branch, so contact your preferred center for current details.",
  },
  {
    question:
      "Can I get study abroad counselling at a Medcity Overseas branch?",
    answer:
      "Yes. Students can visit a Medcity Overseas branch to discuss their study abroad plans, academic background, preferred destination, course interests and application requirements. The counselling team can help students understand suitable study options and the general application process.",
  },
  {
    question:
      "Which countries can I get study abroad guidance for?",
    answer:
      "Medcity Overseas provides guidance for students exploring international study opportunities across multiple destinations. Available universities, courses, admission requirements and application options depend on the chosen country, institution and program.",
  },
  {
    question:
      "Can Medcity Overseas branches help with university applications?",
    answer:
      "Yes. Study abroad counselling services can include assistance with shortlisting universities and courses, understanding eligibility requirements, preparing application documents and following the university application process.",
  },
  {
    question:
      "Can I get student visa guidance at Medcity Overseas branches?",
    answer:
      "Students can receive general guidance about the student visa process, documentation and application preparation at Medcity Overseas branches. Visa requirements vary by country and may change, so applicants should always verify current requirements with the relevant immigration authority.",
  },
  {
    question:
      "Do Medcity Overseas branches provide IELTS, PTE, OET and German language training?",
    answer:
      "Selected Medcity centers provide language and test preparation services such as IELTS, PTE, OET and German language training. Course availability may differ between locations, so contact the nearest branch to confirm the programs currently offered.",
  },
  {
    question:
      "Do I need an appointment to visit a Medcity Overseas branch?",
    answer:
      "You can contact your preferred Medcity Overseas branch before visiting to confirm its current counselling availability and arrange an appointment when necessary. Branch phone numbers and email addresses are available in the directory above.",
  },
  {
    question:
      "Can I contact a Medcity Overseas branch directly?",
    answer:
      "Yes. Each branch listing on this page includes available contact information such as phone numbers, email addresses and branch location details, making it easy to contact the center most convenient for you.",
  },
];

export default function BranchesFAQ() {
  const [openIndex, setOpenIndex] =
    useState(null);

  const handleToggle = (index) => {
    setOpenIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <section
      id="branches-faq"
      aria-labelledby="branches-faq-heading"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-primary/[0.06] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-secondary/[0.06] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <header className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/10 bg-primary/10 text-primary shadow-sm">
            <HelpCircle
              className="h-7 w-7"
              aria-hidden="true"
            />
          </div>

          <p className="mt-5 text-sm font-extrabold uppercase tracking-[0.18em] text-primary">
            Branch FAQs
          </p>

          <h2
            id="branches-faq-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-darkPrimary sm:text-4xl lg:text-5xl"
          >
            Frequently Asked Questions About
            Our Study Abroad Branches
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Find answers about Medcity Overseas
            branch locations, study abroad
            counselling, university applications,
            student visa guidance and language
            training across Kerala.
          </p>
        </header>

        {/* Location highlight */}
        <div className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
          <MapPin
            className="h-4 w-4 text-primary"
            aria-hidden="true"
          />

          Study abroad counselling centers
          across Kerala
        </div>

        {/* FAQ Grid */}
        <div className="mt-12 grid items-start gap-4 lg:grid-cols-2">
          {branchFaqs.map((faq, index) => {
            const isOpen =
              openIndex === index;

            const questionId =
              `branches-faq-question-${index}`;

            const answerId =
              `branches-faq-answer-${index}`;

            return (
              <article
                key={faq.question}
                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                  isOpen
                    ? "border-primary/25 shadow-[0_18px_45px_rgba(99,26,51,0.10)]"
                    : "border-slate-200 shadow-[0_8px_25px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_14px_35px_rgba(15,23,42,0.08)]"
                }`}
              >
                <h3>
                  <button
                    id={questionId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() =>
                      handleToggle(index)
                    }
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="text-base font-extrabold leading-7 text-slate-900 sm:text-lg">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                        isOpen
                          ? "bg-primary text-white shadow-md"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${
                          isOpen
                            ? "rotate-180"
                            : ""
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </h3>

                {/* Answer */}
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mx-5 border-t border-slate-100 sm:mx-6" />

                    <p className="px-5 pb-6 pt-4 text-sm leading-7 text-slate-600 sm:px-6 sm:text-base sm:leading-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Supporting SEO text */}
        <div className="relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-[32px] bg-gradient-to-br from-darkPrimary via-[#8f2047] to-primary px-6 py-10 text-center shadow-[0_24px_70px_rgba(99,26,51,0.22)] sm:px-10 sm:py-12 lg:px-16">
  
  {/* Background glow */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl"
  />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-pink-300/20 blur-3xl"
  />

  {/* Grid pattern */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 opacity-[0.08]"
    style={{
      backgroundImage: `
        linear-gradient(to right, white 1px, transparent 1px),
        linear-gradient(to bottom, white 1px, transparent 1px)
      `,
      backgroundSize: "32px 32px",
    }}
  />

  {/* Decorative circle */}
  <div
    aria-hidden="true"
    className="absolute right-10 top-8 hidden h-20 w-20 rounded-full border border-white/10 lg:block"
  />

  {/* Content */}
  <div className="relative z-10 mx-auto max-w-3xl">

    {/* Badge */}
    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-sm">
      <MapPin
        className="h-6 w-6"
        aria-hidden="true"
      />
    </div>

    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-pink-200 sm:text-sm">
      Find Your Nearest Branch
    </p>

    <h3 className="mt-3 text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
      Looking for a Study Abroad
      <span className="text-pink-200">
        {" "}Consultant Near You?
      </span>
    </h3>

    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
      Explore our branch directory to find a
      Medcity Overseas study abroad counselling
      center near you. Get guidance for university
      applications, course selection, student visas
      and language training programs.
    </p>

    {/* CTA */}
    <div className="mt-7 flex justify-center">
      <a
        href="#medcity-study-abroad-branches"
        className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-darkPrimary shadow-[0_12px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)]"
      >
        <MapPin
          className="h-4 w-4 text-primary"
          aria-hidden="true"
        />

        Find Your Nearest Branch

        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </a>
    </div>
  </div>
</div>
      </div>
    </section>
  );
}