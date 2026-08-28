"use client";

import { useState } from "react";
import {
  ChevronDown,
  CircleHelp,
  Globe2,
} from "lucide-react";

/* =========================================================
   FAQ DATA
========================================================= */

const faqs = [
  {
    question:
      "Which countries can I study in through Medcity Overseas?",
    answer:
      "Medcity Overseas helps students explore study opportunities in popular destinations such as Germany, the UK, Canada, Australia, Ireland, New Zealand and other international study destinations.",
  },
  {
    question:
      "How do I choose the right study destination?",
    answer:
      "The right destination depends on your preferred course, academic profile, budget, career goals, language requirements, lifestyle preferences and future plans. Our counsellors can help you compare suitable options.",
  },
  {
    question:
      "Which country is best for international students?",
    answer:
      "There is no single best destination for every student. Countries differ in tuition fees, course options, university choices, entry requirements, living costs and post-study opportunities. The best option depends on your individual goals and profile.",
  },
  {
    question:
      "Can Medcity Overseas help me compare different countries?",
    answer:
      "Yes. We can help you compare study destinations based on universities, available courses, tuition fees, living costs, admission requirements and other important factors before you make a decision.",
  },
  {
    question:
      "What documents are usually required to study abroad?",
    answer:
      "Common documents may include academic certificates, transcripts, passport, English language test results, statement of purpose, recommendation letters and financial documents. Exact requirements vary by destination, university and course.",
  },
  {
    question:
      "Do study abroad destinations have different English language requirements?",
    answer:
      "Yes. English language requirements can vary by country, university and course. Institutions may accept IELTS, TOEFL, PTE or other approved qualifications, depending on their admission policies.",
  },
  {
    question:
      "When should I start planning for my preferred study destination?",
    answer:
      "It is generally better to start several months before your preferred intake so you have enough time for course selection, university applications, language tests, documentation, financial planning and visa processing.",
  },
  {
    question:
      "How can Medcity Overseas help me study in my preferred country?",
    answer:
      "Medcity Overseas can help you understand available study options, shortlist suitable universities and courses, review general eligibility, prepare applications, understand documentation requirements and receive guidance for the student visa and pre-departure process.",
  },
];

/* =========================================================
   FAQ ITEM
========================================================= */

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}) {
  return (
    <article
      className={`
        overflow-hidden
        rounded-2xl
        border
        bg-white
        transition-all
        duration-300

        ${
          isOpen
            ? "border-primary/30 shadow-[0_12px_35px_rgba(15,23,42,0.08)]"
            : "border-slate-200 hover:border-primary/25"
        }
      `}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="
          flex
          w-full
          items-center
          gap-3
          px-4
          py-4
          text-left
          sm:gap-4
          sm:px-5
          sm:py-5
        "
      >
        {/* Number */}

        <div
          className={`
            grid
            h-10
            w-10
            shrink-0
            place-items-center
            rounded-xl
            text-xs
            font-black
            transition-all
            duration-300

            ${
              isOpen
                ? "bg-primary text-white"
                : "bg-primary/10 text-primary"
            }
          `}
        >
          {String(index + 1).padStart(
            2,
            "0"
          )}
        </div>

        {/* Question */}

        <h3 className="min-w-0 flex-1 text-sm font-extrabold leading-6 text-slate-900 sm:text-[15px]">
          {faq.question}
        </h3>

        {/* Arrow */}

        <div
          className={`
            grid
            h-9
            w-9
            shrink-0
            place-items-center
            rounded-full
            transition-all
            duration-300

            ${
              isOpen
                ? "rotate-180 bg-primary text-white"
                : "bg-slate-100 text-slate-500"
            }
          `}
        >
          <ChevronDown
            size={17}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Answer */}

      <div
        className={`
          grid
          transition-all
          duration-300

          ${
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-5 sm:px-5">
            <div className="ml-[52px] border-t border-slate-100 pt-4 sm:ml-14">
              <p className="text-sm leading-7 text-slate-600">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   DESTINATIONS FAQ
========================================================= */

export default function DestinationsFAQ() {
  const [openIndex, setOpenIndex] =
    useState(null);

  const handleToggle = (index) => {
    setOpenIndex((current) =>
      current === index
        ? null
        : index
    );
  };

  const leftFaqs =
    faqs.slice(0, 4);

  const rightFaqs =
    faqs.slice(4, 8);

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* Background decoration */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/[0.05] blur-3xl" />

        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-secondary/[0.05] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================================================
            HEADING
        ================================================= */}

        <header className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
          <div className="mb-4 flex justify-center">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-primary/10
                px-4
                py-2
                text-xs
                font-extrabold
                uppercase
                tracking-[0.12em]
                text-primary
              "
            >
              <CircleHelp
                size={15}
              />

              Study Destinations
            </div>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Frequently Asked{" "}
            <span className="text-primary">
              Questions
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Find answers to common
            questions about choosing a
            study destination, applications,
            eligibility, language
            requirements and planning your
            studies abroad.
          </p>
        </header>

        {/* ================================================
            MOBILE
            1 COLUMN
        ================================================= */}

        <div className="space-y-3 md:hidden">
          {faqs.map(
            (faq, index) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                index={index}
                isOpen={
                  openIndex === index
                }
                onToggle={() =>
                  handleToggle(index)
                }
              />
            )
          )}
        </div>

        {/* ================================================
            TABLET / DESKTOP
            4 LEFT + 4 RIGHT
        ================================================= */}

        <div className="hidden md:grid md:grid-cols-2 md:items-start md:gap-5 lg:gap-7">

          {/* LEFT */}

          <div className="space-y-4">
            {leftFaqs.map(
              (faq, index) => (
                <FAQItem
                  key={faq.question}
                  faq={faq}
                  index={index}
                  isOpen={
                    openIndex === index
                  }
                  onToggle={() =>
                    handleToggle(
                      index
                    )
                  }
                />
              )
            )}
          </div>

          {/* RIGHT */}

          <div className="space-y-4">
            {rightFaqs.map(
              (faq, index) => {
                const actualIndex =
                  index + 4;

                return (
                  <FAQItem
                    key={faq.question}
                    faq={faq}
                    index={
                      actualIndex
                    }
                    isOpen={
                      openIndex ===
                      actualIndex
                    }
                    onToggle={() =>
                      handleToggle(
                        actualIndex
                      )
                    }
                  />
                );
              }
            )}
          </div>
        </div>

        {/* Bottom text */}

        <div className="mt-9 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-slate-500">
          <Globe2
            size={18}
            className="text-primary"
          />

          <span>
            Explore your study abroad
            options and find the destination
            that fits your academic and
            career goals.
          </span>
        </div>
      </div>
    </section>
  );
}