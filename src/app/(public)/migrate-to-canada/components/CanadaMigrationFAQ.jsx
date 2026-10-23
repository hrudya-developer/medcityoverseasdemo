"use client";

import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
} from "lucide-react";

import { canadaFaqs as faqs } from "../canadaFaqData";

export default function StudyInCanadaFAQ() {
  const [openIndex, setOpenIndex] =
    useState(-1);

  const handleToggle = (index) => {
    setOpenIndex((current) =>
      current === index ? -1 : index
    );
  };

  return (
    <section
      id="canada-migration-faq"
      aria-labelledby="study-in-canada-faq-heading"
      className="relative overflow-hidden bg-gradient-to-br from-white via-[#fff9fb] to-[#eef7ff] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"
      />

      {/* Grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #631A33 1px, transparent 1px), linear-gradient(to bottom, #631A33 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_12px_30px_rgba(192,31,83,0.22)]">
            <HelpCircle
              size={27}
              aria-hidden="true"
            />
          </div>

          <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Study in Canada FAQs
          </p>

          <h2
            id="study-in-canada-faq-heading"
            className="mt-3 text-3xl font-black tracking-tight text-darkPrimary sm:text-4xl lg:text-5xl"
          >
            Frequently Asked Questions About
            Studying in Canada
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Find answers to common questions about
            studying in Canada from Kerala, including
            eligibility, courses, intakes, costs,
            applications and study permit preparation.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="mt-12 grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
          {faqs.map((faq, index) => {
            const isOpen =
              openIndex === index;

            const contentId =
              `canada-faq-answer-${index}`;

            const buttonId =
              `canada-faq-question-${index}`;

            return (
              <article
                key={faq.question}
                className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
                  isOpen
                    ? "border-primary/30 bg-white shadow-[0_18px_50px_rgba(192,31,83,0.12)]"
                    : "border-slate-200 bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_14px_38px_rgba(15,23,42,0.08)]"
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() =>
                      handleToggle(index)
                    }
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6 sm:py-6"
                  >
                    <span className="flex min-w-0 items-start gap-4">
                      <span
                        className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                          isOpen
                            ? "bg-primary text-white shadow-[0_8px_20px_rgba(192,31,83,0.22)]"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <Sparkles
                          size={18}
                          aria-hidden="true"
                        />
                      </span>

                      <span
                        className={`text-base font-extrabold leading-7 transition-colors sm:text-lg ${
                          isOpen
                            ? "text-darkPrimary"
                            : "text-slate-900"
                        }`}
                      >
                        {faq.question}
                      </span>
                    </span>

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 bg-primary text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      <ChevronDown
                        size={20}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mx-5 mb-5 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/[0.05] via-white to-secondary/[0.06] px-5 py-5 sm:mx-6 sm:mb-6">
                      <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}