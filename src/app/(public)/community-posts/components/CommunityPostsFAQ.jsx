"use client";

import { useState } from "react";

import {
  ChevronDown,
  CircleHelp,
  MessageCircleMore,
} from "lucide-react";

const faqs = [
  {
    question:
      "What are Community Posts on Medcity Study Abroad?",
    answer:
      "Community Posts are student-focused updates, experiences, tips and useful information related to studying abroad. They can help students learn from shared experiences and stay informed about different stages of the overseas education journey.",
  },
  {
    question:
      "What kind of topics can I find in Community Posts?",
    answer:
      "Community Posts may cover topics such as university life, study destinations, applications, student visas, accommodation, travel, scholarships, student experiences and practical tips for living and studying abroad.",
  },
  {
    question:
      "Can Community Posts help me understand student life abroad?",
    answer:
      "Yes. Community Posts can provide useful insights into student life, day-to-day experiences, challenges, opportunities and practical aspects of living in another country.",
  },
  {
    question:
      "Are Community Posts a substitute for professional counselling?",
    answer:
      "No. Community Posts are intended for general information and shared experiences. For decisions about courses, universities, applications, visas or eligibility, it is better to speak with a qualified study abroad counsellor.",
  },
  {
    question:
      "How can I find posts that are relevant to my study destination?",
    answer:
      "Browse the available Community Posts and look for topics related to your preferred country, university, course or study abroad stage. Relevant posts can help you understand common questions and student experiences.",
  },
  {
    question:
      "Can Medcity Study Abroad guide me after I read a Community Post?",
    answer:
      "Yes. If a Community Post raises questions about your own study plans, Medcity Study Abroad can provide personalised guidance based on your academic background, preferred destination, course interests and study goals.",
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

export default function CommunityPostsFAQ() {
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
              <CircleHelp
                size={15}
              />

              Community Posts
            </div>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Community Posts{" "}
            <span className="text-primary">
              FAQs
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Find answers about student
            experiences, study abroad tips,
            destination insights and how to
            use Community Posts during your
            overseas education journey.
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
          <MessageCircleMore
            size={18}
            className="text-primary"
          />

          <span>
            Explore student experiences,
            useful tips and study abroad
            insights from our community.
          </span>
        </div>
      </div>
    </section>
  );
}