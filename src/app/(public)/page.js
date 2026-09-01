import OurBranches from "@/components/home/branches-section/OurBranches";
import Carousel from "@/components/home/carousel/Carousel";
import DepartureStoriesSection from "@/components/home/departure-videos/DepartureStoriesSection";
import DestinationsSection from "@/components/home/destinations/DestinationsSection";
import FAQ from "@/components/home/FAQ/FAQ";

import {
  faqSchema,
} from "@/components/home/FAQ/faqData";
import CounsellingSection from "@/components/home/free-counselling/CounsellingSection";
import GermanCoursesLayout from "@/components/home/german-courses/GermanCoursesLayout";
import MobileApp from "@/components/home/mobile-app/MobileApp";
import SearchSection from "@/components/home/searchSection/SearchSection";
import ProgramsSection from "@/components/home/services/programs/ProgramsSection";
import ServicesSection from "@/components/home/services/ServicesSection";
import EssentialServices from "@/components/home/students-essential-services/EssentialServices";
import SASteps from "@/components/home/study-abroad-steps/SASteps";
import TestimonialSection from "@/components/home/testimonials/TestimonialSection";
import UniversityPartners from "@/components/home/university-partners/UniversityPartners";

/* =========================================================
   SITE CONSTANTS
========================================================= */

const SITE_URL = "https://medcityoverseas.com";

const SITE_NAME = "Medcity Overseas";

const LEGAL_NAME =
  "Medcity International Overseas Corporation";

const COMPANY_EMAIL = "info@mioc.in";

const COMPANY_PHONE = "+919072982555";

const HOME_OG_IMAGE =
  `${SITE_URL}/og-images/home.webp`;

/* =========================================================
   SEO CONTENT
========================================================= */

const HOME_TITLE =
  "Study Abroad Consultants in Kerala | Medcity Overseas";

const HOME_DESCRIPTION =
  "Medcity Overseas is a study abroad consultancy in Kerala offering expert counselling, university admission support, student visa assistance, scholarship guidance, German language training and Ausbildung guidance.";

/* =========================================================
   PAGE METADATA
========================================================= */

export const metadata = {
  title: {
    absolute: HOME_TITLE,
  },

  description: HOME_DESCRIPTION,

  keywords: [
    "study abroad consultants in Kerala",
    "study abroad consultancy Kerala",
    "overseas education consultants Kerala",
    "study abroad consultants",
    "overseas education consultants",
    "study abroad counselling Kerala",
    "study abroad counselling",
    "university admission consultants",
    "student visa consultants Kerala",
    "student visa assistance",
    "study abroad scholarships",
    "study in Germany",
    "study in UK",
    "study in Canada",
    "study in Australia",
    "study in Ireland",
    "study in New Zealand",
    "German language courses Kerala",
    "Ausbildung Germany",
    "Ausbildung consultants Kerala",
    "Medcity Overseas",
    "Medcity Study Abroad",
  ],

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",

    url: SITE_URL,

    siteName: SITE_NAME,

    title: HOME_TITLE,

    description: HOME_DESCRIPTION,

    images: [
      {
        url: HOME_OG_IMAGE,
        width: 1200,
        height: 630,
        alt:
          "Medcity Overseas study abroad consultants in Kerala",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: HOME_TITLE,

    description: HOME_DESCRIPTION,

    images: [HOME_OG_IMAGE],
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

/* =========================================================
   ORGANIZATION SCHEMA

   This is the canonical organization entity used throughout
   the website. Other page schemas should reference:

   https://medcityoverseas.com/#organization
========================================================= */

const organizationJsonLd = {
  "@context": "https://schema.org",

  "@type": "EducationalOrganization",

  "@id": `${SITE_URL}/#organization`,

  name: LEGAL_NAME,

  alternateName: [
    "Medcity Overseas",
    "Medcity Study Abroad",
  ],

  url: SITE_URL,

  email: COMPANY_EMAIL,

  telephone: COMPANY_PHONE,

  logo: {
    "@type": "ImageObject",

    "@id": `${SITE_URL}/#logo`,

    url: `${SITE_URL}/logo.png`,

    contentUrl: `${SITE_URL}/logo.png`,

    width: 512,

    height: 512,

    caption: SITE_NAME,
  },

  image: {
    "@type": "ImageObject",

    url: HOME_OG_IMAGE,

    width: 1200,

    height: 630,
  },

  description:
    "Medcity International Overseas Corporation, operating as Medcity Overseas, provides study abroad counselling, university admissions guidance, scholarship guidance, student visa assistance, German language training and overseas education support.",

  areaServed: {
    "@type": "Country",
    name: "India",
  },

  contactPoint: [
    {
      "@type": "ContactPoint",

      telephone: COMPANY_PHONE,

      email: COMPANY_EMAIL,

      contactType: "customer service",

      areaServed: "IN",

      availableLanguage: [
        "English",
        "Malayalam",
      ],
    },
  ],

  sameAs: [
    "https://play.google.com/store/apps/details?id=com.medcity.overseas",
  ],

  hasOfferCatalog: {
    "@type": "OfferCatalog",

    name: "Study Abroad Services",

    itemListElement: [
      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",

          name: "Study Abroad Counselling",

          serviceType:
            "Study Abroad Counselling",

          provider: {
            "@id":
              `${SITE_URL}/#organization`,
          },

          areaServed: {
            "@type": "Country",
            name: "India",
          },
        },
      },

      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",

          name:
            "University Admissions Guidance",

          serviceType:
            "University Admissions Guidance",

          provider: {
            "@id":
              `${SITE_URL}/#organization`,
          },
        },
      },

      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",

          name:
            "Student Visa Assistance",

          serviceType:
            "Student Visa Assistance",

          provider: {
            "@id":
              `${SITE_URL}/#organization`,
          },
        },
      },

      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",

          name:
            "Scholarship Guidance",

          serviceType:
            "Study Abroad Scholarship Guidance",

          provider: {
            "@id":
              `${SITE_URL}/#organization`,
          },
        },
      },

      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",

          name:
            "German Language Training",

          serviceType:
            "German Language Training",

          provider: {
            "@id":
              `${SITE_URL}/#organization`,
          },
        },
      },

      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",

          name:
            "Ausbildung Guidance",

          serviceType:
            "Ausbildung Program Guidance",

          provider: {
            "@id":
              `${SITE_URL}/#organization`,
          },
        },
      },
    ],
  },
};

/* =========================================================
   WEBSITE SCHEMA
========================================================= */

const websiteJsonLd = {
  "@context": "https://schema.org",

  "@type": "WebSite",

  "@id": `${SITE_URL}/#website`,

  url: SITE_URL,

  name: SITE_NAME,

  alternateName: [
    "Medcity Study Abroad",
    LEGAL_NAME,
  ],

  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },

  inLanguage: "en-IN",
};

/* =========================================================
   HOMEPAGE SCHEMA
========================================================= */

const webPageJsonLd = {
  "@context": "https://schema.org",

  "@type": "WebPage",

  "@id": `${SITE_URL}/#webpage`,

  url: SITE_URL,

  name: HOME_TITLE,

  description: HOME_DESCRIPTION,

  inLanguage: "en-IN",

  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },

  about: {
    "@id": `${SITE_URL}/#organization`,
  },

  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },

  primaryImageOfPage: {
    "@type": "ImageObject",

    url: HOME_OG_IMAGE,

    width: 1200,

    height: 630,
  },
};

/* =========================================================
   JSON-LD SERIALIZER
========================================================= */

function serializeJsonLd(data) {
  return JSON.stringify(data).replace(
    /</g,
    "\\u003c"
  );
}

/* =========================================================
   HOMEPAGE
========================================================= */

export default function Home() {
  return (
    <>
      {/* ===================================================
          ORGANIZATION SCHEMA
      =================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            organizationJsonLd
          ),
        }}
      />

      {/* ===================================================
          WEBSITE SCHEMA
      =================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            websiteJsonLd
          ),
        }}
      />

      {/* ===================================================
          HOMEPAGE SCHEMA
      =================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            webPageJsonLd
          ),
        }}
      />

      {/* ===================================================
          FAQ SCHEMA
      =================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            faqSchema
          ),
        }}
      />

      {/* ===================================================
          HOMEPAGE CONTENT
      =================================================== */}

      <Carousel />

      <SearchSection />

      <ServicesSection />

      <ProgramsSection />

      <DestinationsSection />

      <DepartureStoriesSection />

      <UniversityPartners />

      <MobileApp />

      <GermanCoursesLayout />

      <EssentialServices />

      <SASteps />

      <TestimonialSection />

      <CounsellingSection />

      <OurBranches />

      <FAQ />
    </>
  );
}