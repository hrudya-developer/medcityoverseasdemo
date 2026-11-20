
import {
  MessageCircle,
  Phone,
  Sparkles,
  GraduationCap,
  MapPin,
  Award,
  Users,
  CalendarDays,
  ArrowUpRight,
  Plane,
} from "lucide-react";

import { currentPagePath, getPageSeo } from "@/lib/pageSeo";
import { templateShowsQuickAnswer } from "@/lib/quickAnswerPaths";
import {
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  CONTACT_WHATSAPP,
  displayDate,
  isoDate,
} from "@/lib/seoSchema";

export default async function QuickAnswer({
  children,
  updated,
  phone = CONTACT_PHONE,
  phoneDisplay = CONTACT_PHONE_DISPLAY,
  whatsapp = CONTACT_WHATSAPP,
  showContact = true,
  className = "",
}) {
  // Existing SEO and admin functionality
  const path = await currentPagePath();

  const adminSummary =
    path && templateShowsQuickAnswer(path)
      ? (await getPageSeo(path))?.summary
      : "";

  const content = adminSummary || children;
  const updatedText = displayDate(updated);

  const paragraphs =
    typeof content === "string"
      ? content.split(/\n\s*\n/)
      : null;

  const features = [
    {
      icon: GraduationCap,
      value: "10,000+",
      label: "Students Guided",
      bg: "bg-[#fff0f5]",
      iconColor: "text-[#d41462]",
    },
    {
      icon: MapPin,
      value: "25+",
      label: "Study Destinations",
      bg: "bg-[#eaf7ff]",
      iconColor: "text-[#d41462]",
    },
    {
      icon: Award,
      value: "18",
      label: "Branches in South India",
      bg: "bg-[#fff7ec]",
      iconColor: "text-[#d41462]",
    },
    {
      icon: Users,
      value: "Expert",
      label: "Visa & Admission Support",
      bg: "bg-[#edf9f3]",
      iconColor: "text-[#d41462]",
    },
  ];

  return (
    <section
      aria-label="In short"
      className={`mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div
        className="
          relative isolate overflow-hidden
          rounded-[24px] sm:rounded-[32px]
          border border-pink-100/70
          bg-gradient-to-br
          from-[#f4f4f4]
          via-white
          to-[#f4f4f4]
          shadow-[0_18px_55px_rgba(22,39,72,0.08)]
        " data-aos="fade-left" data-aos-delay="100" data-aos-duration="800"
      >
        {/* Decorative background */}
        {/* <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -left-24 -top-24
            h-64 w-64 rounded-full
            bg-pink-100/50 blur-3xl
          "
        /> */}

        {/* <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -right-20 top-0
            h-72 w-72 rounded-full
            bg-sky-100/60 blur-3xl
          "
        /> */}

        {/* Main content */}
        <div
          className="
            relative z-10
            grid grid-cols-1
            gap-8
            p-5 sm:p-8
            lg:grid-cols-12
            lg:gap-10
            lg:p-10
            xl:p-12
          "
        >
          {/* Left summary */}
          <div className="min-w-0 lg:col-span-6 xl:col-span-6">
            <div
              className="
                inline-flex items-center gap-2
                rounded-full
                bg-[#fce8f0]
                px-4 py-2
                text-sm font-bold
                text-[#c81058]
              "
            >
              <Sparkles size={17} aria-hidden="true" />
              In Short
            </div>

            <h2
              className="
                mt-5
                text-2xl font-extrabold
                tracking-tight
                text-[#102c4e]
                sm:text-3xl
                xl:text-[38px]
                xl:leading-tight
              "
            >
              About{" "}
              <span className="text-[#d41462]">
                Medcity Overseas
              </span>
            </h2>

            <div
              aria-hidden="true"
              className="
                mt-4 h-1 w-20
                rounded-full bg-[#d41462]
              "
            />

            <div
              className="
                mt-6 space-y-4
                break-words
                text-[15px]
                leading-7
                text-slate-700
                sm:text-base
                sm:leading-8
                lg:text-[17px]
              "
            >
              {paragraphs
                ? paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                : content}
            </div>
          </div>

          {/* Right feature cards */}
          <div className="min-w-0 lg:col-span-6 xl:col-span-6">
            <div className="relative">
              <div
                className="
                  grid grid-cols-2
                  gap-3 sm:gap-4
                "
              >
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.label}
                      className={`
                        group flex min-w-0
                        flex-col items-center
                        justify-center
                        rounded-[20px]
                        border border-white/80
                        ${feature.bg}
                        px-3 py-5
                        text-center
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:shadow-lg
                        sm:min-h-[165px]
                        sm:rounded-[24px]
                        sm:p-6
                      `}
                    >
                      <div
                        className={`
                          mb-3
                          ${feature.iconColor}
                        `}
                      >
                        <Icon
                          size={30}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </div>

                      <p
                        className="
                          text-xl font-extrabold
                          text-[#102c4e]
                          sm:text-2xl
                          lg:text-[28px]
                        "
                      >
                        {feature.value}
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs font-medium
                          leading-5 text-slate-700
                          sm:text-sm
                        "
                      >
                        {feature.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Decorative travel element */}
              {/* <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute -top-5 right-4
                  hidden text-[#d41462]
                  sm:block
                "
              >
                <Plane
                  size={25}
                  className="rotate-[-25deg]"
                />
              </div> */}
            </div>
          </div>
        </div>

        {/* Contact footer */}
        {(showContact || updatedText) && (
          <div
            className="
              relative z-10
              mx-4 mb-4
              rounded-[20px]
              bg-gradient-to-r
              from-[#103e6b]
              via-[#102e52]
              to-[#0c2342]
              px-4 py-5
              text-white
              sm:mx-6 sm:mb-6
              sm:px-6
              lg:mx-10 lg:mb-8
              lg:px-8
            "
          >
            <div
              className="
                flex flex-col gap-5
                xl:flex-row
                xl:items-center
                xl:justify-between
              "
            >
              {showContact && (
                <div
                  className="
                    flex min-w-0
                    flex-col gap-3
                    sm:flex-row
                    sm:flex-wrap
                    sm:items-center
                    sm:gap-4
                  "
                >
                  <span
                    className="
                      text-sm font-semibold
                      sm:text-base
                    "
                  >
                    Talk to a counsellor:
                  </span>

                  <a
                    href={`tel:${phone}`}
                    className="
                      inline-flex w-fit
                      items-center gap-2
                      rounded-full
                      bg-white
                      px-4 py-2.5
                      text-sm font-bold
                      text-[#d41462]
                      transition-all duration-200
                      hover:bg-pink-50
                      hover:shadow-lg
                      focus-visible:outline
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-white
                      sm:px-5
                    "
                  >
                    <Phone
                      size={17}
                      aria-hidden="true"
                    />
                    {phoneDisplay}
                  </a>

                  {whatsapp && (
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex w-fit
                        items-center gap-2
                        rounded-full
                        bg-white
                        px-4 py-2.5
                        text-sm font-bold
                        text-[#128c4a]
                        transition-all duration-200
                        hover:bg-green-50
                        hover:shadow-lg
                        focus-visible:outline
                        focus-visible:outline-2
                        focus-visible:outline-offset-2
                        focus-visible:outline-white
                        sm:px-5
                      "
                    >
                      <MessageCircle
                        size={17}
                        aria-hidden="true"
                      />
                      WhatsApp
                      <ArrowUpRight
                        size={14}
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
              )}

              {updatedText && (
                <div
                  className="
                    flex min-w-0
                    items-start gap-2
                    border-t border-white/20
                    pt-4
                    text-xs text-white/80
                    sm:text-sm
                    xl:border-l
                    xl:border-t-0
                    xl:pl-6
                    xl:pt-0
                  "
                >
                  <CalendarDays
                    size={17}
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />

                  <p>
                    Last updated{" "}
                    <time dateTime={isoDate(updated)}>
                      {updatedText}
                    </time>{" "}
                    by Medcity Overseas
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
