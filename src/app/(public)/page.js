import OurBranches from "@/components/home/branches-section/OurBranches";
import Carousel from "@/components/home/carousel/Carousel";
import DepartureStoriesSection from "@/components/home/departure-videos/DepartureStoriesSection";
import DestinationsSection from "@/components/home/destinations/DestinationsSection";
import FAQ from "@/components/home/FAQ/FAQ";
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

const SITE_URL = "https://medcityoverseas.com";
const HOME_OG_IMAGE = `${SITE_URL}/images/og/home.jpg`;

export const metadata = {
  title: {
    absolute: "Study Abroad Consultants in Kerala | Medcity Overseas",
  },

  description:
    "Medcity Overseas provides expert study abroad counselling, university admission support, student visa assistance, scholarship guidance, German language training and Ausbildung guidance across Kerala.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Medcity Overseas",
    title: "Study Abroad Consultants in Kerala | Medcity Overseas",
    description:
      "Get expert guidance for studying in Germany, the UK, Canada, Australia, Ireland, New Zealand and other leading destinations.",
    images: [
      {
        url: HOME_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Medcity Overseas study abroad counselling services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Study Abroad Consultants in Kerala | Medcity Overseas",
    description:
      "Study abroad counselling, university admissions, visa assistance, German courses and Ausbildung guidance.",
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,

  name: "Medcity Overseas",
  alternateName: "Medcity Study Abroad",
  url: SITE_URL,

  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
    width: 512,
    height: 512,
  },

  image: HOME_OG_IMAGE,

  description:
    "Study abroad and overseas education consultancy providing counselling, university admissions guidance, scholarship guidance, student visa assistance and language training.",

  areaServed: {
    "@type": "Country",
    name: "India",
  },

  /*
   * Add only URLs that officially represent the same organization.
   * Add official Facebook, Instagram, LinkedIn and YouTube profiles here.
   */
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
          serviceType: "Study Abroad Counselling",
          provider: {
            "@id": `${SITE_URL}/#organization`,
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
          name: "University Admissions Guidance",
          serviceType: "University Admissions Guidance",
          provider: {
            "@id": `${SITE_URL}/#organization`,
          },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Student Visa Assistance",
          serviceType: "Student Visa Assistance",
          provider: {
            "@id": `${SITE_URL}/#organization`,
          },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "German Language Training",
          serviceType: "German Language Training",
          provider: {
            "@id": `${SITE_URL}/#organization`,
          },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ausbildung Guidance",
          serviceType: "Ausbildung Overseas Program Guidance",
          provider: {
            "@id": `${SITE_URL}/#organization`,
          },
        },
      },
    ],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,

  url: SITE_URL,
  name: "Medcity Overseas",
  alternateName: "Medcity Study Abroad",

  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },

  inLanguage: "en-IN",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      {/*
        Do not add another <main> here because RootLayout already
        provides <main id="main-content"> around this page.
      */}

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