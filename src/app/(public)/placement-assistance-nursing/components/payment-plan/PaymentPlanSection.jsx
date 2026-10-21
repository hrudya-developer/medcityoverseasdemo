
import TuitionBanner from "./TuitionBanner";
import PaymentCard from "./PaymentCard";
import FinancialRequirements from "./FinancialRequirements";

import { paymentInstallments } from "./paymentData";

export default function PaymentPlanSection() {
  return (
    <section
      id="payment-plan"
      aria-labelledby="payment-plan-title"
      className="
        relative isolate
        w-full overflow-hidden
        bg-gradient-to-br
        from-[#fff8fb]
        via-[#fcfaff]
        to-[#f7f8ff]
        py-14
        sm:py-20
        lg:py-24
      "
    >
      {/* Soft background glows */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -left-40 -top-40
          h-[500px] w-[500px]
          rounded-full
          bg-[#fce1ed]/50
          blur-[110px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-40 top-[20%]
          h-[500px] w-[500px]
          rounded-full
          bg-[#eae4ff]/45
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-[-200px] left-[25%]
          h-[450px] w-[600px]
          rounded-full
          bg-[#ffe9f3]/35
          blur-[130px]
        "
      />

      {/* Main container */}
      <div
        className="
          relative z-10
          mx-auto w-full
          max-w-[1480px]
          px-5
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        {/* Section heading */}
        <div className="mb-10 max-w-[850px]">
          <span
            className="
              inline-flex items-center
              rounded-lg
              bg-[#f7ec22]
              px-5 py-2.5
              text-xs font-extrabold
              uppercase tracking-[0.2em]
              text-[#631a33]
              sm:text-sm
            "
          >
            Investment
          </span>

          <h2
            id="payment-plan-title"
            className="
              mt-5
              text-3xl sm:text-4xl md:text-5xl font-black
              leading-[1.12]
              tracking-[-0.045em]
              text-[#111638]
            "
          >
            Payment Plan &{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#e91e63]
                to-[#a620b5]
                bg-clip-text
                text-transparent
              "
            >
              Costs
            </span>
          </h2>

          <div
            className="
              mt-4 h-1 w-14
              rounded-full bg-[#c01f53]
            "
          />

          <p
            className="
              mt-4 max-w-[700px]
              text-sm leading-7
              text-[#657087]
              sm:text-base
              sm:leading-8
            "
          >
            A transparent breakdown of costs to help you
            confidently plan your nursing education journey
            in the United Kingdom.
          </p>
        </div>

        {/* Tuition banner */}
        <TuitionBanner />

        {/* Payment cards */}
        <div
          className="
            mt-6 grid
            grid-cols-1 gap-5
            md:grid-cols-2
            lg:grid-cols-3
            lg:gap-6
          "
        >
          {paymentInstallments.map((item) => (
            <PaymentCard
              key={item.id}
              item={item}
            />
          ))}
        </div>

        {/* Financial requirements */}
        <div className="mt-7">
          <FinancialRequirements />
        </div>

        {/* Disclaimer */}
        <p
          className="
            mt-5 text-center
            text-xs leading-6
            text-[#7a8092]
            sm:text-sm
          "
        >
          *All amounts are indicative and subject to
          university, visa and government fee updates.
          Please confirm current costs before making payments.
        </p>
      </div>
    </section>
  );
}
