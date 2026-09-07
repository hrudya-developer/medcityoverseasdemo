import {
    ChevronDown,
    HelpCircle,
  } from "lucide-react";
  
  export default function BranchFAQ({
    center,
  }) {
    const faqs =
      Array.isArray(center?.faqs)
        ? center.faqs.filter(
            (faq) =>
              faq?.question &&
              faq?.answer
          )
        : [];
  
    if (!faqs.length) {
      return null;
    }
  
    const location =
      center?.seoLocation ||
      center?.city ||
      center?.district ||
      "";
  
    return (
      <section
        id="branch-faq"
        aria-labelledby="branch-faq-heading"
        className="
          relative
          overflow-hidden
          bg-white
          py-14
          sm:py-16
          lg:py-20
        "
      >
        {/* BACKGROUND */}
  
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
          "
        >
          <div
            className="
              absolute
              -left-32
              top-10
              h-72
              w-72
              rounded-full
              bg-primary/[0.05]
              blur-3xl
            "
          />
  
          <div
            className="
              absolute
              -right-32
              bottom-0
              h-80
              w-80
              rounded-full
              bg-secondary/[0.05]
              blur-3xl
            "
          />
  
          <div
            className="
              absolute
              inset-0
              opacity-[0.18]
              [background-image:radial-gradient(circle,rgba(4,102,175,0.15)_1px,transparent_1px)]
              [background-size:22px_22px]
            "
          />
        </div>
  
        <div
          className="
            relative
            z-10
            mx-auto
            w-full
            max-w-5xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* HEADING */}
  
          <div
            className="
              mx-auto
              mb-10
              max-w-2xl
              text-center
            "
          >
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-primary/10
                bg-primary/[0.05]
                px-4
                py-2
              "
            >
              <HelpCircle
                className="
                  h-4
                  w-4
                  text-primary
                "
                aria-hidden="true"
              />
  
              <span
                className="
                  text-[11px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-primary
                "
              >
                Frequently Asked Questions
              </span>
            </div>
  
            <h2
              id="branch-faq-heading"
              className="
                mt-5
                text-2xl
                font-black
                tracking-[-0.025em]
                text-darkPrimary
                sm:text-3xl
                md:text-4xl
              "
            >
              Study Abroad FAQs in{" "}
              <span className="text-primary">
                {location}
              </span>
            </h2>
  
            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                text-sm
                leading-7
                text-slate-600
                sm:text-[15px]
              "
            >
              Find answers to common
              questions about studying
              abroad and getting support
              from Medcity Overseas{" "}
              {location}.
            </p>
          </div>
  
          {/* FAQ LIST */}
  
          <div
            className="
              mx-auto
              flex
              max-w-4xl
              flex-col
              gap-3
            "
          >
            {faqs.map(
              (faq, index) => (
                <details
                  key={`${faq.question}-${index}`}
                  className="
                    group
                    overflow-hidden
                    rounded-[20px]
                    border
                    border-slate-200/80
                    bg-white
                    shadow-[0_8px_30px_rgba(15,23,42,0.04)]
                    transition-all
                    duration-300
  
                    open:border-primary/15
                    open:shadow-[0_14px_38px_rgba(192,31,83,0.07)]
                  "
                >
                  <summary
                    className="
                      flex
                      cursor-pointer
                      list-none
                      items-center
                      justify-between
                      gap-5
                      px-5
                      py-5
  
                      [&::-webkit-details-marker]:hidden
  
                      sm:px-6
                    "
                  >
                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-4
                      "
                    >
                      <span
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-primary/[0.07]
                          text-xs
                          font-black
                          text-primary
                        "
                      >
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>
  
                      <h3
                        className="
                          text-left
                          text-sm
                          font-extrabold
                          leading-6
                          text-darkPrimary
                          sm:text-[15px]
                        "
                      >
                        {faq.question}
                      </h3>
                    </div>
  
                    <span
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-primary/[0.07]
                        text-primary
                        transition-all
                        duration-300
  
                        group-open:bg-primary
                        group-open:text-white
                      "
                    >
                      <ChevronDown
                        className="
                          h-4
                          w-4
                          transition-transform
                          duration-300
  
                          group-open:rotate-180
                        "
                        aria-hidden="true"
                      />
                    </span>
                  </summary>
  
                  <div
                    className="
                      border-t
                      border-slate-100
                      px-5
                      py-5
                      sm:px-6
                    "
                  >
                    <p
                      className="
                        pl-[52px]
                        text-sm
                        leading-7
                        text-slate-600
                      "
                    >
                      {faq.answer}
                    </p>
                  </div>
                </details>
              )
            )}
          </div>
        </div>
      </section>
    );
  }