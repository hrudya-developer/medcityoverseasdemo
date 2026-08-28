"use client";

import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
} from "lucide-react";

const faqs = [
  {
    question:
      "Why should students from Kerala consider studying in Germany?",
    answer:
      "Germany offers a wide range of universities, applied sciences programs, vocational pathways and career-focused opportunities. Students from Kerala can explore options based on their academic background, language skills, preferred field of study and long-term career goals.",
  },
  {
    question:
      "What are the eligibility requirements to study in Germany from Kerala?",
    answer:
      "Eligibility depends on the university, program and level of study. Common requirements may include relevant academic qualifications, transcripts, language proficiency, a valid passport and program-specific documents. Some applicants may also need additional academic preparation depending on their previous qualification.",
  },
  {
    question:
      "Is German language compulsory to study in Germany?",
    answer:
      "Not always. Some university programs are taught in English, while others require German language proficiency. Ausbildung, nursing and several vocational pathways commonly require German language skills. The exact level depends on the institution, employer or program.",
  },
  {
    question:
      "What German language level is required for Ausbildung in Germany?",
    answer:
      "The required German language level varies by Ausbildung program and employer. Many vocational pathways expect applicants to have a working level of German, and some programs may require B1, B2 or another specified level. Applicants should verify the exact requirement before applying.",
  },
  {
    question:
      "What is Ausbildung in Germany?",
    answer:
      "Ausbildung is a vocational training pathway that combines practical workplace training with classroom-based learning. It is designed to help trainees develop occupation-specific skills while gaining practical experience in a professional environment.",
  },
  {
    question:
      "Can Indian students apply for Ausbildung in Germany?",
    answer:
      "Indian students may be eligible for Ausbildung depending on their educational qualifications, German language ability, age, chosen occupation and employer requirements. Eligibility can vary significantly between programs, so applicants should check the latest requirements for their preferred training pathway.",
  },
  {
    question:
      "Can students from Kerala study nursing in Germany?",
    answer:
      "Students and healthcare applicants from Kerala can explore nursing-related study and vocational pathways in Germany, subject to educational qualifications, German language requirements and any recognition or professional requirements that apply to the chosen route.",
  },
  {
    question:
      "What are the main intakes for studying in Germany?",
    answer:
      "Many German institutions offer winter and summer intakes, although application periods vary by university and course. Some vocational and Ausbildung programs follow different recruitment schedules, so students should check the specific deadlines for each program.",
  },
  {
    question:
      "How much does it cost to study in Germany from Kerala?",
    answer:
      "The total cost depends on the institution, course, city and lifestyle. Students should plan for tuition or semester-related charges where applicable, accommodation, food, health insurance, transportation, visa-related expenses and other personal costs.",
  },
  {
    question:
      "What documents are generally required to study in Germany?",
    answer:
      "Common documents may include academic certificates, transcripts, passport, language test results, statement of purpose, CV, admission-related documents and financial evidence. Exact requirements vary by university, program and visa process.",
  },
  {
    question:
      "Do I need a student visa to study in Germany?",
    answer:
      "Many international students from India require the appropriate German visa or residence permission for their study or training pathway. Requirements differ depending on the purpose and duration of stay, so applicants should verify the latest requirements through official German authorities.",
  },
  {
    question:
      "When should I start my Germany study application?",
    answer:
      "It is better to begin preparation well before the intended intake. Early planning gives students time to shortlist programs, prepare German or English language requirements, collect documents, submit applications and complete the visa process.",
  },
  {
    question:
      "What is Studienkolleg in Germany?",
    answer:
      "Studienkolleg is a preparatory pathway for some international students whose school qualifications do not directly meet German university entrance requirements. Whether it is required depends on the applicant's previous education and the admission rules of the institution.",
  },
  {
    question:
      "How can Germany education consultants in Kerala help students?",
    answer:
      "Education consultants can help students understand available study, Ausbildung and nursing pathways, shortlist suitable options, review general eligibility, prepare applications and understand the overall study abroad process. Final admission, visa and immigration requirements should always be verified with the relevant official authorities.",
  },
];

export default function StudyInGermanyFAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  const handleToggle = (index) => {
    setOpenIndex((current) =>
      current === index ? -1 : index
    );
  };

  return (
    <section
      id="study-in-germany-faq"
      aria-labelledby="study-in-germany-faq-heading"
      className="relative overflow-hidden bg-gradient-to-br from-white via-[#fff8fb] to-[#eef7ff] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"
      />

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
            Study in Germany FAQs
          </p>

          <h2
            id="study-in-germany-faq-heading"
            className="mt-3 text-3xl font-black tracking-tight text-darkPrimary sm:text-4xl lg:text-5xl"
          >
            Frequently Asked Questions About Studying in Germany
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Find answers to common questions about studying in
            Germany from Kerala, including eligibility, Ausbildung,
            nursing, language requirements, costs, applications and
            visa preparation.
          </p>
        </div>

        {/* FAQs */}
        <div className="mt-12 grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            const contentId =
              `germany-faq-answer-${index}`;

            const buttonId =
              `germany-faq-question-${index}`;

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