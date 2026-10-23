"use client";

import { useState } from "react";

import {
  ChevronDown,
  HelpCircle,
} from "lucide-react";

import { createDestinationFaqs as createFaqs } from "../lib/destinationFaqs";

export default function DestinationFAQ({
  countryName = "your preferred destination",
}) {
  const [openIndex, setOpenIndex] =
    useState(null);

  const faqs =
    createFaqs(countryName);

  const handleToggle = (index) => {
    setOpenIndex((current) =>
      current === index
        ? null
        : index
    );
  };

  return (
    <section
      id="destination-faq"
      aria-labelledby="destination-faq-heading"
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#fffafd] to-[#f3f8ff] px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/[0.06] blur-3xl" />

        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-secondary/[0.06] blur-3xl" />

        <div className="absolute left-6 top-12 h-36 w-36 opacity-[0.14] [background-image:radial-gradient(#c01f53_1px,transparent_1px)] [background-size:14px_14px]" />

        <div className="absolute bottom-12 right-6 h-40 w-40 opacity-[0.12] [background-image:radial-gradient(#0466af_1px,transparent_1px)] [background-size:15px_15px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <header className="mx-auto max-w-3xl text-center">
          <div className="mx-auto grid size-14 place-content-center rounded-2xl bg-primary/10 text-primary shadow-sm">
            <HelpCircle
              size={26}
              aria-hidden="true"
            />
          </div>

          <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-primary">
            Study Abroad FAQs
          </p>

          <h2
            id="destination-faq-heading"
            className="mt-3 text-3xl font-black tracking-tight text-darkPrimary sm:text-4xl lg:text-5xl"
          >
            Frequently Asked Questions About{" "}
            <span className="text-primary">
              Studying in {countryName}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            Find answers to common questions
            about eligibility, courses,
            universities, costs, scholarships,
            applications and student visa
            preparation for {countryName}.
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-5 flex items-center justify-center gap-2"
          >
            <span className="h-1 w-12 rounded-full bg-primary" />
            <span className="h-1 w-6 rounded-full bg-secondary" />
            <span className="h-1 w-3 rounded-full bg-logoYellow" />
          </div>
        </header>

        {/* FAQ Grid */}
        <div className="mt-12 grid items-start gap-4 lg:grid-cols-2">
          {faqs.map(
            (faq, index) => {
              const isOpen =
                openIndex === index;

              const buttonId =
                `destination-faq-question-${index}`;

              const panelId =
                `destination-faq-answer-${index}`;

              return (
                <article
                  key={faq.question}
                  className={`
                    overflow-hidden
                    rounded-2xl
                    border
                    bg-white
                    shadow-[0_10px_35px_rgba(15,23,42,0.05)]
                    transition-all
                    duration-300
                    ${
                      isOpen
                        ? "border-primary/25 shadow-[0_18px_45px_rgba(192,31,83,0.10)]"
                        : "border-slate-200 hover:border-primary/20 hover:shadow-lg"
                    }
                  `}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={
                        isOpen
                      }
                      aria-controls={
                        panelId
                      }
                      onClick={() =>
                        handleToggle(
                          index
                        )
                      }
                      className="flex w-full items-start justify-between gap-5 px-5 py-5 text-left sm:px-6"
                    >
                      <span className="flex gap-3">
                        <span
                          className={`
                            mt-0.5
                            grid
                            size-8
                            shrink-0
                            place-content-center
                            rounded-xl
                            text-xs
                            font-black
                            transition-colors
                            ${
                              isOpen
                                ? "bg-primary text-white"
                                : "bg-primary/10 text-primary"
                            }
                          `}
                        >
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <span className="text-base font-extrabold leading-7 text-slate-900 sm:text-[17px]">
                          {
                            faq.question
                          }
                        </span>
                      </span>

                      <span
                        className={`
                          grid
                          size-10
                          shrink-0
                          place-content-center
                          rounded-xl
                          transition-all
                          duration-300
                          ${
                            isOpen
                              ? "bg-primary text-white"
                              : "bg-primary/10 text-primary"
                          }
                        `}
                      >
                        <ChevronDown
                          size={19}
                          aria-hidden="true"
                          className={`
                            transition-transform
                            duration-300
                            ${
                              isOpen
                                ? "rotate-180"
                                : ""
                            }
                          `}
                        />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={
                      buttonId
                    }
                    className={`
                      grid
                      transition-all
                      duration-300
                      ${
                        isOpen
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]"
                      }
                    `}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-slate-100 px-5 pb-6 pt-5 sm:px-6">
                        <p className="text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-8">
                          {
                            faq.answer
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}