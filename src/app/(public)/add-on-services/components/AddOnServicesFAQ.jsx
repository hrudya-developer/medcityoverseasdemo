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
      "What add-on services does Medcity Study Abroad provide?",
    answer:
      "Medcity Study Abroad offers additional support services for students, including SOP preparation, education loan assistance, visa interview preparation, travel card assistance, international SIM assistance, flight ticket booking, free counselling and course advice.",
  },
  {
    question:
      "Can Medcity Study Abroad help me prepare my SOP?",
    answer:
      "Yes. We assist students in preparing a clear and compelling Statement of Purpose that presents their academic background, strengths, goals and aspirations effectively.",
  },
  {
    question:
      "Do you provide education loan assistance?",
    answer:
      "Yes. Medcity Study Abroad helps students understand the financial aspects of studying abroad and provides guidance for education loan applications and related documentation.",
  },
  {
    question:
      "Can you help me prepare for my visa interview?",
    answer:
      "Yes. Our visa interview preparation support is designed to help students understand the interview process, improve confidence and prepare for common questions they may face during the actual visa interview.",
  },
  {
    question:
      "Do you provide travel and communication support before departure?",
    answer:
      "Yes. We provide support services such as travel card assistance, international SIM assistance and flight ticket booking to help students prepare for their journey abroad.",
  },
  {
    question:
      "Can I get counselling and course advice before choosing a program?",
    answer:
      "Yes. Our counsellors provide personalized guidance to help students explore suitable countries, institutions and courses based on their academic profile, preferences and study abroad goals.",
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

export default function AddOnServicesFAQ() {
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

              Student Support
            </div>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Add-On Services{" "}
            <span className="text-primary">
              FAQs
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Find answers about our additional
            student support services, including
            SOP preparation, education loans,
            visa interview preparation, travel
            assistance and counselling.
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
          <Headphones
            size={18}
            className="text-primary"
          />

          <span>
            Need help with your study abroad
            journey? Our team is available to
            guide you through the next steps.
          </span>
        </div>
      </div>
    </section>
  );
}