"use client";

import { useState } from "react";
import {
  ChevronDown,
  CircleHelp,
  GraduationCap,
} from "lucide-react";

const faqs = [
  {
    question:
      "What are the most popular courses for studying abroad?",
    answer:
      "Popular study abroad options often include Nursing, Medicine, Engineering, Business, Computer Science, Data Science, Hospitality, Health Sciences and other career-focused programs. The best course depends on your academic background and future goals.",
  },
  {
    question:
      "How do I choose the right study abroad course?",
    answer:
      "You should consider your previous education, interests, career goals, preferred destination, course duration, tuition fees, entry requirements and future opportunities before choosing a program.",
  },
  {
    question:
      "Can Medcity Overseas help me compare different courses?",
    answer:
      "Yes. Medcity Overseas can help you compare courses based on universities, destinations, eligibility, duration, tuition fees, intakes and other important factors so you can make a better-informed decision.",
  },
  {
    question:
      "What are the eligibility requirements for studying abroad?",
    answer:
      "Eligibility requirements vary depending on the university, country and course. They may include academic qualifications, minimum grades, English language requirements and course-specific prerequisites.",
  },
  {
    question:
      "How much does it cost to study a popular course abroad?",
    answer:
      "Tuition fees vary significantly depending on the course, university and destination. You should also consider living expenses, visa costs, insurance and other expenses when planning your study abroad budget.",
  },
  {
    question:
      "What intake should I choose for my course?",
    answer:
      "Available intakes depend on the destination, university and program. Common intakes include January, February, May, September and October, although some universities offer additional or year-round intakes.",
  },
  {
    question:
      "Can I apply for scholarships for popular study abroad courses?",
    answer:
      "Scholarship opportunities may be available depending on the university, destination, academic profile and chosen course. Medcity Overseas can help you explore relevant scholarship options during your application process.",
  },
  {
    question:
      "How can I apply for a course through Medcity Overseas?",
    answer:
      "You can begin by selecting a suitable course and contacting Medcity Overseas. Our team can guide you through university shortlisting, eligibility checks, application preparation, documentation and the next stages of your study abroad journey.",
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
          {String(index + 1).padStart(
            2,
            "0"
          )}
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

export default function PopularCoursesFAQ() {
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
              <CircleHelp
                size={15}
              />

              Popular Courses
            </div>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Frequently Asked{" "}
            <span className="text-primary">
              Questions
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Find answers about popular study
            abroad courses, eligibility,
            tuition fees, intakes,
            scholarships and applications.
          </p>
        </header>

        {/* Mobile: single column */}

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

        {/* Desktop: 4 left + 4 right */}

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

        <div className="mt-9 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-slate-500">
          <GraduationCap
            size={18}
            className="text-primary"
          />

          <span>
            Explore courses and find a
            program that matches your
            academic and career goals.
          </span>
        </div>
      </div>
    </section>
  );
}