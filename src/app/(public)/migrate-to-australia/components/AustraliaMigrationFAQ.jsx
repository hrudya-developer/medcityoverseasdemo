"use client";

import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  MapPin,
} from "lucide-react";

const faqs = [
  {
    question:
      "How can I migrate to Australia from Kerala?",
    answer:
      "There are different pathways to migrate to Australia depending on your occupation, qualifications, work experience, age, English language ability and other eligibility factors. Skilled migration options may include the Skilled Independent visa (subclass 189), Skilled Nominated visa (subclass 190), Skilled Work Regional visa (subclass 491) and eligible employer-sponsored pathways.",
  },
  {
    question:
      "What are the main skilled migration pathways to Australia?",
    answer:
      "Common skilled migration pathways include the Skilled Independent visa (subclass 189), Skilled Nominated visa (subclass 190) and Skilled Work Regional visa (subclass 491). Employer-sponsored and other migration pathways may also be available depending on an applicant's circumstances and current Australian immigration requirements.",
  },
  {
    question:
      "What is the Australia Skilled Independent visa subclass 189?",
    answer:
      "The Skilled Independent visa (subclass 189) is a points-tested skilled migration pathway for eligible invited workers. It generally does not require nomination by an Australian state or territory government. Applicants must satisfy the applicable eligibility and invitation requirements.",
  },
  {
    question:
      "What is the Skilled Nominated visa subclass 190?",
    answer:
      "The Skilled Nominated visa (subclass 190) is a points-tested skilled migration pathway that requires nomination by an Australian state or territory government. Nomination criteria and eligible occupations can vary between states and territories.",
  },
  {
    question:
      "What is the Skilled Work Regional visa subclass 491?",
    answer:
      "The Skilled Work Regional visa (subclass 491) is a provisional skilled visa for eligible applicants who are nominated by an Australian state or territory government or sponsored by an eligible family member, subject to the applicable requirements. It is designed for living and working in designated regional areas.",
  },
  {
    question:
      "What are the eligibility requirements for Australian skilled migration?",
    answer:
      "Eligibility depends on the visa pathway. Factors can include age, nominated occupation, qualifications, relevant work experience, English language proficiency, skills assessment, points score, health and character requirements, and state or territory nomination where applicable.",
  },
  {
    question:
      "How does the Australia skilled migration points system work?",
    answer:
      "Certain Australian skilled visas use a points-based system. Points may be awarded for factors such as age, English language ability, skilled employment experience, educational qualifications and other eligible criteria. Meeting a minimum threshold does not necessarily guarantee an invitation to apply.",
  },
  {
    question:
      "Do I need a skills assessment to migrate to Australia?",
    answer:
      "A suitable skills assessment is generally required for many skilled migration pathways. The relevant assessing authority and assessment requirements depend on your nominated occupation. Applicants should check the requirements applicable to their occupation and intended visa pathway.",
  },
  {
    question:
      "Do I need IELTS or another English test for Australia migration?",
    answer:
      "English language ability is an important requirement for many Australian skilled migration pathways. Depending on the visa and circumstances, applicants may be able to demonstrate their English ability through an accepted test such as IELTS, PTE Academic or another test recognized for the relevant immigration purpose.",
  },
  {
    question:
      "Can I migrate to Australia without a job offer?",
    answer:
      "Some Australian skilled migration pathways do not necessarily require an employer job offer. Other pathways, particularly employer-sponsored visas, depend on sponsorship or nomination by an eligible employer. The appropriate option depends on your profile and the current visa requirements.",
  },
  {
    question:
      "Can state nomination help me migrate to Australia?",
    answer:
      "State or territory nomination is relevant to certain skilled migration pathways, including subclasses 190 and 491. Each Australian state or territory can have its own occupation lists, eligibility criteria and nomination requirements, which may change over time.",
  },
  {
    question:
      "What are employer-sponsored migration pathways in Australia?",
    answer:
      "Employer-sponsored pathways allow eligible Australian employers to sponsor or nominate suitably skilled overseas workers where the relevant immigration requirements are satisfied. Eligibility depends on factors such as the visa pathway, occupation, employer, skills, experience and other applicable requirements.",
  },
  {
    question:
      "What documents may be required for Australia migration?",
    answer:
      "Documents vary by visa pathway but may include a valid passport, educational certificates, employment evidence, English language test results, skills assessment documents, identity records, health examinations, police or character documents and other evidence required for the particular application.",
  },
  {
    question:
      "How long does the Australia migration process take?",
    answer:
      "Processing times vary depending on the visa subclass, application circumstances, documentation, government processing priorities and other factors. Applicants should check the latest processing information published by the Australian Department of Home Affairs.",
  },
  {
    question:
      "How can Australia migration consultants in Kerala help?",
    answer:
      "Migration consultants can help applicants understand potential pathways, organize information, assess general eligibility and understand the steps involved in the migration process. Where Australian immigration assistance or representation is regulated, applicants should ensure that the person providing those services is appropriately authorized.",
  },
];

export default function AustraliaMigrationFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <section
      id="australia-migration-faq"
      aria-labelledby="australia-migration-faq-heading"
      className="relative overflow-hidden bg-gradient-to-br from-white via-[#fff9fb] to-[#eef7ff] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-secondary/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
            <HelpCircle
              size={27}
              aria-hidden="true"
            />
          </div>

          <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-primary">
            Australia Migration FAQs
          </p>

          <h2
            id="australia-migration-faq-heading"
            className="mt-3 text-3xl font-black tracking-tight text-darkPrimary sm:text-4xl lg:text-5xl"
          >
            Frequently Asked Questions About{" "}
            <span className="text-primary">
              Migrating to Australia
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Find answers to common questions about
            migrating to Australia from Kerala, including
            skilled migration, subclass 189, 190 and 491
            visas, eligibility, points, skills assessments
            and employer-sponsored pathways.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="mt-12 grid items-start gap-4 lg:grid-cols-2 lg:gap-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            const contentId =
              `australia-faq-answer-${index}`;

            const buttonId =
              `australia-faq-question-${index}`;

            return (
              <article
                key={faq.question}
                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                  isOpen
                    ? "border-primary/30 shadow-[0_18px_45px_rgba(99,26,51,0.12)]"
                    : "border-slate-200 shadow-[0_8px_25px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_14px_35px_rgba(15,23,42,0.08)]"
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
                    <span className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full transition-colors ${
                          isOpen
                            ? "bg-primary"
                            : "bg-slate-300"
                        }`}
                      />

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
                          ? "bg-primary text-white shadow-[0_8px_20px_rgba(192,31,83,0.20)]"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <ChevronDown
                        size={20}
                        aria-hidden="true"
                        className={`transition-transform duration-300 ${
                          isOpen
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mx-5 border-t border-slate-100 sm:mx-6" />

                    <div className="px-5 pb-6 pt-5 sm:px-6">
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

        {/* Bottom information */}
        <div className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-primary/10 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MapPin
              size={19}
              aria-hidden="true"
            />
          </div>

          <p className="text-sm leading-7 text-slate-600">
            Australian immigration requirements,
            occupation lists, state nomination criteria
            and visa rules may change. Always verify the
            latest requirements with the Australian
            Department of Home Affairs and other relevant
            official authorities before making an
            application.
          </p>
        </div>
      </div>
    </section>
  );
}