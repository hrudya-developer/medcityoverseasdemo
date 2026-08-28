"use client";

import { useState } from "react";

import {
  ChevronDown,
  CircleHelp,
  Headphones,
} from "lucide-react";

const faqs = [
  {
    question:
      "How can I contact Medcity Study Abroad?",
    answer:
      "You can contact Medcity Study Abroad by phone, email, through the enquiry form on our website, or by visiting one of our branches. Our team can help you with your study abroad questions and next steps.",
  },
  {
    question:
      "Can I contact Medcity Study Abroad for free counselling?",
    answer:
      "Yes. You can contact our team to discuss your study abroad plans and get guidance on suitable courses, universities and destinations based on your academic profile and preferences.",
  },
  {
    question:
      "What information should I provide when contacting a counsellor?",
    answer:
      "It is helpful to share your academic background, preferred country, course interests, budget, English language test status and intended intake. This information helps our counsellors understand your requirements and provide relevant guidance.",
  },
  {
    question:
      "Can I contact Medcity Study Abroad for application and visa assistance?",
    answer:
      "Yes. Our team can provide guidance related to university applications, documentation and student visa preparation as part of your study abroad journey.",
  },
  {
    question:
      "Can I visit a Medcity Study Abroad branch for counselling?",
    answer:
      "Yes. Students can visit a Medcity Study Abroad branch for assistance. You can check the official branches information or contact our team to find a convenient location before your visit.",
  },
  {
    question:
      "Can parents contact Medcity Study Abroad about a student's overseas education?",
    answer:
      "Yes. Parents and students can contact our team to discuss study destinations, universities, courses, estimated costs, application procedures and other important aspects of planning an overseas education.",
  },
];

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
          {String(index + 1).padStart(2, "0")}
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

export default function ContactFAQ() {
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
    faqs.slice(0, 3);

  const rightFaqs =
    faqs.slice(3, 6);

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* Background */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/[0.05] blur-3xl" />

        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-secondary/[0.05] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}

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
              <CircleHelp size={15} />

              Contact & Support
            </div>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Contact{" "}
            <span className="text-primary">
              FAQs
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Find answers about contacting
            Medcity Study Abroad, counselling,
            applications, visa assistance and
            visiting our branches.
          </p>
        </header>

        {/* Mobile - 1 column */}

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

        {/* Desktop - 3 left + 3 right */}

        <div className="hidden md:grid md:grid-cols-2 md:items-start md:gap-5 lg:gap-7">
          {/* Left */}

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
                    handleToggle(index)
                  }
                />
              )
            )}
          </div>

          {/* Right */}

          <div className="space-y-4">
            {rightFaqs.map(
              (faq, index) => {
                const actualIndex =
                  index + 3;

                return (
                  <FAQItem
                    key={faq.question}
                    faq={faq}
                    index={actualIndex}
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

        {/* Bottom */}

        <div className="mt-9 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-slate-500">
          <Headphones
            size={18}
            className="text-primary"
          />

          <span>
            Have more questions? Connect with
            our study abroad team for
            personalised guidance.
          </span>
        </div>
      </div>
    </section>
  );
}