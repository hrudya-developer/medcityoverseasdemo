import AboutHero from "./components/AboutHero";
import AboutStats from "./components/AboutStats";
import ChairmanSection from "./components/ChairmanSection";
import CoreValues from "./components/CoreValues";
import StorySection from "./components/StorySection";
import AboutFAQ from "./components/AboutFAQ";

const SITE_URL = "https://medcityoverseas.com";

export const metadata = {
  title: {
    absolute:
      "About Medcity Overseas | Study Abroad Consultants in Kerala",
  },

  description:
    "Learn about Medcity Overseas, a trusted study abroad consultancy in Kerala offering expert guidance for university admissions, course selection, scholarships, student visas, language training and overseas education.",

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
      "Discover Medcity Overseas, our journey, leadership, values and commitment to helping students pursue international education opportunities.",
    images: [
      {
        url: "/og-images/about-us.webp",
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
      "Learn about Medcity Overseas, our journey, leadership, values and student-focused approach to international education.",
    images: ["/og-images/about-us.webp"],
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

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about-us/#webpage`,
  url: `${SITE_URL}/about-us`,
  name:
    "About Medcity Overseas | Study Abroad Consultants in Kerala",

  description:
    "Learn about Medcity Overseas, its journey, leadership, values and study abroad counselling services in Kerala.",

  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },

  about: {
    "@id": `${SITE_URL}/#organization`,
  },

  breadcrumb: {
    "@id": `${SITE_URL}/about-us/#breadcrumb`,
  },

  inLanguage: "en-IN",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${SITE_URL}/about-us/#breadcrumb`,

  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About Medcity Overseas",
      item: `${SITE_URL}/about-us`,
    },
  ],
};

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            aboutPageJsonLd
          ).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd
          ).replace(/</g, "\\u003c"),
        }}
      />

      <div className="overflow-hidden bg-white">
        <AboutHero />
        <AboutStats />
        <StorySection />
        <ChairmanSection />
        <CoreValues />
        <AboutFAQ />
      </div>
    </>
  );
}