
import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  ArrowLeft,
  BriefcaseMedical,
  GraduationCap,
  Coins,
  UsersRound,
  CheckCircle2,
  Download,
  Globe2,
  ClipboardCheck,
  Plane,
} from "lucide-react";
import MastersRouteSection from "./components/master-route/MastersRouteSection";
import MScRouteSection from "./components/msc-route/MScRouteSection";
import RegistrationPathway from "./components/registration-pathway/RegistrationPathway";
import PaymentPlanSection from "./components/payment-plan/PaymentPlanSection";
import MedcityServicesSection from "./components/medcity-services/MedcityServicesSection";
import EligibilitySection from "./components/eligibility/EligibilitySection";
import PlacementBrochure from "./components/placement-brochure/PlacementBrochure";
import PlacementContactDetails from "./components/placement-contact-details/PlacementContactDetails";
import PlacementRegistrationSection from "./components/placement-registration-form/PlacementRegistrationSection";


export const metadata = {
  title:
    "UK Nursing Placement Assistance | Medcity Overseas",
  description:
    "Explore the MSc Mental Health Nursing and Leadership pathway in the UK with Medcity Overseas. Get guidance on eligibility, university admissions and nursing registration.",
};

const highlights = [
  {
    icon: GraduationCap,
    title: "1 Year",
    subtitle: "Pre-registration MSc",
  },
  {
    icon: Coins,
    title: "₹10,00,000*",
    subtitle: "Scholarship",
  },
  {
    icon: UsersRound,
    title: "BSc Nursing Freshers",
    subtitle: "Can apply",
  },
];

const services = [
  {
    icon: GraduationCap,
    title: "University Admission Guidance",
    description:
      "Get assistance with selecting suitable universities, preparing applications and understanding admission requirements.",
  },
  {
    icon: ClipboardCheck,
    title: "Eligibility Assessment",
    description:
      "Understand academic qualifications, English language requirements and programme-specific eligibility criteria.",
  },
  {
    icon: BriefcaseMedical,
    title: "Nursing Career Guidance",
    description:
      "Explore nursing career pathways and understand the steps involved in working towards professional registration in the UK.",
  },
  {
    icon: Plane,
    title: "Pre-Departure Assistance",
    description:
      "Receive guidance on documentation, travel preparation and planning your transition to the United Kingdom.",
  },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fffafd] via-white to-[#fde4f3]">
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-pink-200/40 blur-[100px]" />

      <div className="mx-auto max-w-[1500px] px-5 pb-12 pt-10 sm:px-10 lg:px-14 lg:pb-20 lg:pt-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#b31c60] transition hover:gap-3"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Left content */}
          <div className="relative z-10 text-center lg:text-left">
            <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-3 text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#bb176d] sm:px-6 sm:text-xs">
              <BriefcaseMedical size={18} className="shrink-0" />
              Placement Assistance Programme
            </div>

            <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.2em] text-[#d21b79] sm:text-sm">
              MSc Nursing Pathway · United Kingdom
            </p>

            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black leading-[1.08] tracking-[-0.055em] text-[#101638]">
              Work as a Nurse
              <span className="block bg-gradient-to-r from-[#f01473] via-[#cf148d] to-[#9a14b5] bg-clip-text text-transparent">
                in the UK
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-[620px] text-sm leading-7 text-[#5b6b86] sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">
              Explore the MSc in Mental Health Nursing
              &amp; Leadership and receive guidance on
              university admissions, eligibility and
              the steps towards UK nursing registration
              and career opportunities.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="/contact-us"
                className="group inline-flex min-h-[54px] items-center justify-center gap-4 rounded-xl bg-gradient-to-r from-primary to-secondary px-7 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(214,20,120,0.2)] transition hover:-translate-y-1 sm:px-9 sm:text-base"
              >
                Check Eligibility
                <ArrowRight
                  size={19}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

             
<a
  href="/assets/Medcity-UK-Nursing-MSc-Brochure_9.pdf"
  download="Medcity-UK-Nursing-MSc-Brochure.pdf"
  className="
    inline-flex min-h-[54px]
    items-center justify-center
    gap-3 rounded-xl
    border-[1.5px] border-[#e31884]
    bg-white px-7 py-3
    text-sm font-bold text-[#971178]
    shadow-sm
    transition-all duration-300
    hover:-translate-y-1
    hover:bg-pink-50
    hover:shadow-[0_12px_30px_rgba(192,31,83,0.12)]
    sm:px-9 sm:text-base
  "
>
  <Download size={19} />
  Get the Brochure
</a>

            </div>
          </div>

          {/* Right image */}
          <div className="relative mx-auto w-full max-w-[700px]">
            <div className="absolute -right-5 -top-5 h-[85%] w-[85%] rounded-full bg-gradient-to-br from-fuchsia-200/60 to-pink-300/30 blur-2xl" />

            <div className="relative aspect-[1.15] overflow-hidden rounded-[28px] border-4 border-white bg-[#f7d9e8] shadow-[0_24px_70px_rgba(90,30,75,0.15)] sm:rounded-[38px] lg:aspect-[0.98]">
              <Image
                src="/assets/placement-assistance-nurse.webp"
                alt="Nurse exploring career opportunities in the United Kingdom"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 48vw"
                className="object-cover object-center"
              />
            </div>

            <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md sm:bottom-8 sm:left-8">
              <Globe2 size={22} className="text-[#c01f53]" />
              <div>
                <p className="text-xs font-extrabold text-[#101638] sm:text-sm">
                  United Kingdom
                </p>
                <p className="text-[11px] text-slate-500">
                  Nursing Career Pathway
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Programme highlights */}
        <div className="relative z-20 mt-12 grid overflow-hidden rounded-[26px] border border-pink-100 bg-white shadow-[0_20px_55px_rgba(90,30,75,0.08)] sm:grid-cols-3">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex items-center gap-4 px-5 py-6 sm:px-4 lg:px-8 ${
                  index > 0
                    ? "border-t border-pink-100 sm:border-l sm:border-t-0"
                    : ""
                }`}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fce8f4] text-[#d8197a]">
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="text-lg font-extrabold leading-tight text-[#101638] lg:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#66718c]">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-center text-xs text-slate-500 sm:text-sm">
          *Up to ₹10,00,000, subject to university eligibility criteria.
        </p>
      </div>
    </section>
  );
}



export default function PlacementAssistanceNursingPage() {
  return (
    <main>
      
      <HeroSection />
      <MastersRouteSection />
      <MScRouteSection />
     <RegistrationPathway />
     <PaymentPlanSection />
     <MedcityServicesSection />
     <EligibilitySection />
      <PlacementBrochure />
      <PlacementContactDetails />
       <PlacementRegistrationSection />
    </main>
  );
}
