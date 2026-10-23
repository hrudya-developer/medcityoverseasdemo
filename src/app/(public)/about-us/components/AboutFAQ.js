"use client";

import { useState } from "react";
import {
  ChevronDown,
  CircleHelp,
  GraduationCap,
} from "lucide-react";

import { aboutFaqs as faqs } from "../aboutFaqData";

export default function AboutFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(
      openIndex === index
        ? null
        : index
    );
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <div className="mb-4 flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-[#c01f53]/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#c01f53]">
              <CircleHelp size={15} />

              About Medcity
            </div>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Frequently Asked{" "}
            <span className="text-[#c01f53]">
              Questions
            </span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
            Learn more about Medcity Overseas and how
            we support students throughout their study
            abroad journey.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen =
              openIndex === index;

            return (
              <div
                key={faq.question}
                className={`
                  overflow-hidden
                  rounded-2xl
                  border
                  bg-white
                  transition-all
                  duration-300

                  ${
                    isOpen
                      ? "border-[#c01f53]/25 shadow-[0_12px_35px_rgba(15,23,42,0.08)]"
                      : "border-slate-200 hover:border-[#c01f53]/20"
                  }
                `}
              >
                <button
                  type="button"
                  onClick={() =>
                    toggleFAQ(index)
                  }
                  aria-expanded={isOpen}
                  className="
                    flex
                    w-full
                    items-center
                    gap-4
                    px-5
                    py-5
                    text-left
                    sm:px-6
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
                          ? "bg-[#c01f53] text-white"
                          : "bg-[#c01f53]/8 text-[#c01f53]"
                      }
                    `}
                  >
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  {/* Question */}
                  <span className="flex-1 text-sm font-extrabold leading-6 text-slate-900 sm:text-base">
                    {faq.question}
                  </span>

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
                          ? "rotate-180 bg-[#c01f53] text-white"
                          : "bg-slate-100 text-slate-500"
                      }
                    `}
                  >
                    <ChevronDown
                      size={17}
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
                    <div className="px-5 pb-6 sm:px-6">
                      <div className="ml-14 border-t border-slate-100 pt-4">
                        <p className="text-sm leading-7 text-slate-600 sm:text-[15px]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom message */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-slate-500">
          <GraduationCap
            size={17}
            className="text-[#c01f53]"
          />

          Have more questions? Our study abroad
          counsellors are here to help.
        </div>
      </div>
    </section>
  );
}