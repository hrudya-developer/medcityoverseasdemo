import AboutHero from "./components/AboutHero";
import AboutStats from "./components/AboutStats";
import StorySection from "./components/StorySection";
import ChairmanSection from "./components/ChairmanSection";
import AboutTeamMembers from "./components/AboutTeamMembers";
import CoreValues from "./components/CoreValues";
import AboutFAQ from "./components/AboutFAQ";
import Link from "next/link";
import { aboutFaqs } from "./aboutFaqData";
import { centers } from "@/app/(public)/branches/data/centersData";
import OfficialSources from "@/components/seo/OfficialSources";
import PageSchema from "@/components/seo/PageSchema";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";
import { STUDY_ABROAD_SOURCES } from "@/lib/officialSources";
import { applySeoOverrides, withPageSeoFaqs } from "@/lib/pageSeo";
import { faqPageNode, jsonLdString, ORG_ID } from "@/lib/seoSchema";

const SITE_URL = "https://medcityoverseas.com";
const ABOUT_URL = `${SITE_URL}/about-us`;
const ABOUT_OG_IMAGE = `${SITE_URL}/og-images/about-us.webp`;

const PAGE_TITLE =
  "About Medcity Overseas | Study Abroad Consultants in Kerala";

const PAGE_DESCRIPTION =
  "Medcity Overseas is a study abroad consultancy in Kerala guiding students on universities, courses, scholarships, student visas and pre-departure plans.";

// Update when this page's text is reviewed.
const TEMPLATE_UPDATED = "2026-10-24";

const pageMetadata = {
  title: {
    absolute:
      "About Medcity Overseas | Study Abroad Consultants in Kerala",
  },

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: "/about-us",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/about-us",
    siteName: "Medcity Overseas",
    title:
      "About Medcity Overseas | Study Abroad Consultants in Kerala",
    description:
      "Discover Medcity Overseas, our journey, leadership, values and commitment to helping students pursue international education opportunities with personalised study abroad guidance.",
    images: [
      {
        url: ABOUT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt:
          "Medcity Overseas study abroad consultants in Kerala",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "About Medcity Overseas | Study Abroad Consultants in Kerala",
    description:
      "Learn about Medcity Overseas, our leadership, values and student-focused approach to international education and study abroad guidance.",
    images: [ABOUT_OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const branchCities = [...new Set(centers.map((center) => center.city).filter(Boolean))];

export default async function AboutUsPage() {
  const faqSchema = await withPageSeoFaqs({
    "@context": "https://schema.org",
    ...faqPageNode("/about-us", aboutFaqs),
  });

  return (
    <>
      <PageSchema
        path="/about-us"
        type="AboutPage"
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        dateModified={TEMPLATE_UPDATED}
        image={ABOUT_OG_IMAGE}
        about={{ "@id": ORG_ID }}
        mainEntity={{ "@id": ORG_ID }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About Medcity Overseas", path: "/about-us" },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(faqSchema) }}
      />

      <div className="overflow-hidden bg-white">
        <AboutHero />

        <AboutStats />

        <QuickAnswer updated={TEMPLATE_UPDATED} className="pt-12">
          {`Medcity Overseas (Medcity International Overseas Corporation) is a study abroad consultancy in Kerala. Its counsellors help students choose a country, course and university, apply, prepare for student visas and get ready to leave, from ${centers.length} Medcity branches in ${branchCities.length} towns across Kerala and Mangalore.`}
        </QuickAnswer>

        <StorySection />

        <QuestionAnswer
          className="py-14"
          eyebrow="What we do"
          question="What does Medcity Overseas do for students?"
          answer="Medcity Overseas guides students from the first counselling session to departure. Counsellors help you compare countries, courses and universities, prepare and submit applications, find scholarships and apply for a student visa. German classes are available at Medcity International Academy. Visa decisions are made by each country's embassy or immigration authority, not by Medcity."
          points={[
            <><Link href="/destinations" className="font-bold text-slate-900 hover:text-primary hover:underline">Choosing a country</Link>: compare study destinations.</>,
            <><Link href="/courses" className="font-bold text-slate-900 hover:text-primary hover:underline">Courses and universities</Link>: shortlist options that fit your profile.</>,
            <><Link href="/study-in-germany" className="font-bold text-slate-900 hover:text-primary hover:underline">Ausbildung and study in Germany</Link>: programmes and routes to Germany.</>,
            <><a href="https://medcityacademy.com/" target="_blank" rel="noopener" className="font-bold text-slate-900 hover:text-primary hover:underline">German classes</a>: available at Medcity International Academy.</>,
            <><Link href="/add-on-services" className="font-bold text-slate-900 hover:text-primary hover:underline">Add-on services</Link>: help with loans, travel and more.</>,
          ]}
        />

        <ChairmanSection />

        <AboutTeamMembers />

        <CoreValues />

        <AboutFAQ />

        <OfficialSources
          className="pb-12"
          links={STUDY_ABROAD_SOURCES}
          intro="Student visa rules are set by each country's government. Check the latest details on these official websites before you apply."
        />

        <p className="mx-auto max-w-5xl px-4 pb-16 text-sm leading-7 text-slate-600 sm:px-6 lg:px-8">
          Talk to a counsellor at your{" "}
          <Link href="/branches" className="font-bold text-primary hover:underline">
            nearest Medcity branch
          </Link>
          , read what{" "}
          <Link href="/all-testimonials" className="font-bold text-primary hover:underline">
            our students say
          </Link>{" "}
          or{" "}
          <Link href="/contact-us" className="font-bold text-primary hover:underline">
            contact Medcity Overseas
          </Link>
          .
        </p>
      </div>
    </>
  );
}

// Search details edited in the admin apply on top of these.
export async function generateMetadata() {
  return applySeoOverrides(pageMetadata);
}
