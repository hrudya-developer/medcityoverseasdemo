"use client";

import { useState } from "react";

import {
  ChevronDown,
  CircleHelp,
  Newspaper,
} from "lucide-react";

const faqs = [
  {
    question:
      "What topics are covered in the Medcity Study Abroad blog?",
    answer:
      "Our blog covers study abroad destinations, universities, courses, student visas, scholarships, applications, accommodation, student life, career opportunities and other useful topics for students planning to study overseas.",
  },
  {
    question:
      "Can the blog help me choose a study destination?",
    answer:
      "Yes. Our destination-focused articles can help you understand study options, universities, courses, living conditions and other important factors to consider when comparing countries.",
  },
  {
    question:
      "Can I find visa and application guidance in the blog?",
    answer:
      "Yes. We publish articles related to university applications, documentation, student visas and other important stages of the study abroad process. Requirements can change, so students should also verify current information before applying.",
  },
  {
    question:
      "Does the blog include information about scholarships?",
    answer:
      "Yes. Our blog may feature scholarship opportunities, funding guidance and general information about financial support available to international students. Eligibility varies by university, course and destination.",
  },
  {
    question:
      "How often should I check the blog for study abroad updates?",
    answer:
      "It is useful to check regularly because admission requirements, visa procedures, scholarships, intakes and other study abroad information may change over time.",
  },
  {
    question:
      "Can Medcity Study Abroad help me after I read a blog article?",
    answer:
      "Yes. If you need personalised guidance after reading an article, our counsellors can help you explore suitable courses, universities and destinations based on your academic profile and study goals.",
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

        <h3 className="min-w-0 flex-1 text-sm font-extrabold leading-6 text-slate-900 sm:text-[15px]">
          {faq.question}
        </h3>

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

export default function BlogFAQ() {
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/[0.05] blur-3xl" />

        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-secondary/[0.05] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

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

              Study Abroad Blog
            </div>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Blog{" "}
            <span className="text-primary">
              FAQs
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Find answers about our study abroad
            articles, destination guides, visa
            information, scholarships and student
            resources.
          </p>
        </header>

        {/* Mobile */}
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

        {/* Desktop / Tablet */}
        <div className="hidden md:grid md:grid-cols-2 md:items-start md:gap-5 lg:gap-7">
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

        <div className="mt-9 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-slate-500">
          <Newspaper
            size={18}
            className="text-primary"
          />

          <span>
            Explore the latest study abroad
            guides, tips and student resources
            from Medcity Study Abroad.
          </span>
        </div>
      </div>
    </section>
  );
}