"use client";

import {
  memo,
  useCallback,
  useMemo,
} from "react";

import { usePathname } from "next/navigation";

import {
  CalendarDays,
  Headphones,
  MessageCircleMore,
  Send,
} from "lucide-react";

import FAQRight from "./FAQRight";
import { faqItems } from "./faqData";
import Link from "next/link";

const SITE_URL = "https://medcityoverseas.com";
const COUNSELLING_SECTION_ID = "gfc_wrapper";

const normalizeSchemaText = (value) =>
  String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const FAQ = ({
  onCounsellingClick,
  onAppointmentClick,
}) => {
  const pathname = usePathname();

  const normalizedPath = useMemo(() => {
    if (!pathname || pathname === "/") {
      return "/";
    }

    return pathname.replace(/\/+$/, "");
  }, [pathname]);

  const pageUrl = useMemo(() => {
    return `${SITE_URL}${normalizedPath}`;
  }, [normalizedPath]);

  const faqStructuredData = useMemo(() => {
    const validFaqItems = faqItems.filter(
      (faq) =>
        normalizeSchemaText(faq?.question) &&
        normalizeSchemaText(faq?.answer)
    );

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      url: `${pageUrl}#faq`,
      mainEntity: validFaqItems.map((faq) => ({
        "@type": "Question",
        name: normalizeSchemaText(
          faq.question
        ),
        acceptedAnswer: {
          "@type": "Answer",
          text: normalizeSchemaText(
            faq.answer
          ),
        },
      })),
    };
  }, [pageUrl]);

  const safeFaqStructuredData = useMemo(
    () =>
      JSON.stringify(
        faqStructuredData
      ).replace(/</g, "\\u003c"),
    [faqStructuredData]
  );

  const scrollToCounselling =
    useCallback(
      (event) => {
        event?.preventDefault?.();

        if (onCounsellingClick) {
          onCounsellingClick(event);
          return;
        }

        const target =
          document.getElementById(
            COUNSELLING_SECTION_ID
          );

        if (!target) {
          return;
        }

        const stickyElements = [
          ...document.querySelectorAll(
            "header, nav"
          ),
        ].filter((element) => {
          const position =
            window.getComputedStyle(
              element
            ).position;

          return (
            position === "fixed" ||
            position === "sticky"
          );
        });

        const headerOffset =
          stickyElements.reduce(
            (total, element) =>
              total +
              element.getBoundingClientRect()
                .height,
            0
          );

        const targetTop =
          target.getBoundingClientRect()
            .top +
          window.scrollY -
          headerOffset -
          20;

        window.history.pushState(
          null,
          "",
          `#${COUNSELLING_SECTION_ID}`
        );

        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: "smooth",
        });
      },
      [onCounsellingClick]
    );

  const handleAppointment =
    useCallback(
      (event) => {
        if (onAppointmentClick) {
          onAppointmentClick(event);
          return;
        }

        scrollToCounselling(event);
      },
      [
        onAppointmentClick,
        scrollToCounselling,
      ]
    );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeFaqStructuredData,
        }}
      />

      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="relative isolate overflow-hidden bg-gradient-to-br from-[#fff9fc] via-white to-[#f5f8ff] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
        data-aos="fade-up"
      >
        {/* Background decorations */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div
            className="absolute -left-32 top-28 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          />

          <div
            className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
          />

          <div
            className="absolute left-5 top-24 h-28 w-28 opacity-20 [background-image:radial-gradient(#c01f53_2px,transparent_2px)] [background-size:15px_15px]"
          />

          <div
            className="absolute bottom-8 right-5 h-28 w-28 opacity-20 [background-image:radial-gradient(#0466AF_2px,transparent_2px)] [background-size:15px_15px]"
          />

          <div
            className="absolute inset-0 opacity-[0.025] [background-image:radial-gradient(#631A33_1px,transparent_1px)] [background-size:24px_24px]"
          />
        </div>

        <div className="mx-auto max-w-[1380px]">
          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.06] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-primary sm:text-sm"
            >
              <MessageCircleMore
                aria-hidden="true"
                className="h-4 w-4"
              />

              FAQs
            </div>

            <h2
              id="faq-heading"
              className="mt-5 font-nunito text-3xl font-extrabold leading-tight tracking-[-0.035em] text-darkPrimary sm:text-4xl lg:text-5xl"
            >
              Frequently Asked{" "}
              <span
                className="bg-gradient-to-r from-primary to-[#e72d6c] bg-clip-text text-transparent"
              >
                Questions
              </span>
            </h2>

            <p
              className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base"
            >
              Everything you need to know
              about studying abroad,
              university applications,
              visas and counselling.
            </p>
          </div>

          {/* FAQ list */}
          <div className="mt-10 sm:mt-12">
            <FAQRight items={faqItems} />
          </div>

          {/* Contact section */}
          <div
            className="mt-10 grid grid-cols-1 items-center gap-5 rounded-[26px] border border-white bg-white/85 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.09)] backdrop-blur-xl md:grid-cols-[1.2fr_0.8fr_0.8fr_auto] md:p-6"
          >
            <div className="flex items-center gap-4">
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"
              >
                <Headphones
                  aria-hidden="true"
                  className="h-7 w-7"
                />
              </span>

              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Still have questions?
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Our expert counsellors
                  are here to help you.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToCounselling}
              aria-label="Go to the free counselling form"
              className="flex items-center gap-3 border-t border-slate-200 pt-4 text-left transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:border-l md:border-t-0 md:pl-5 md:pt-0"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
              >
                <MessageCircleMore
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </span>

              <span>
                <span className="block text-sm font-extrabold text-slate-900">
                  Free 1:1 Counselling
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  Personalized guidance
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={handleAppointment}
              aria-label="Book a counselling appointment"
              className="flex items-center gap-3 border-t border-slate-200 pt-4 text-left transition-colors hover:text-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 md:border-l md:border-t-0 md:pl-5 md:pt-0"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600"
              >
                <CalendarDays
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </span>

              <span>
                <span className="block text-sm font-extrabold text-slate-900">
                  Book an Appointment
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  At your convenience
                </span>
              </span>
            </button>

            <Link href="/contact-us"
              aria-label="Talk to a Medcity study abroad expert"
              className="group inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-primary to-[#df2766] px-6 py-3 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(192,31,83,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(192,31,83,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <MessageCircleMore
                aria-hidden="true"
                className="h-5 w-5"
              />

              Talk to an Expert

              <Send
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(FAQ);