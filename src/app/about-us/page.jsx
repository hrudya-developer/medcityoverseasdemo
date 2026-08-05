import FAQ from "@/components/home/FAQ/FAQ";

import AboutHero from "./components/AboutHero";
import AboutStats from "./components/AboutStats";
import ChairmanSection from "./components/ChairmanSection";
import CoreValues from "./components/CoreValues";
import StorySection from "./components/StorySection";

const SITE_URL = "https://medcityoverseas.com";

export const metadata = {
  title: "About Us",

  description:
    "Learn about Medcity Overseas, our journey, leadership, values and commitment to helping students pursue higher education in Germany, the UK, Canada, Australia, Ireland and other global destinations.",

  alternates: {
    canonical: "/about-us",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/about-us",
    siteName: "Medcity Overseas",
    title: "About Medcity Overseas | Study Abroad Consultants",
    description:
      "Discover the story, leadership, values and student-focused mission of Medcity Overseas.",
    images: [
      {
        url: "/og-images/about-us.webp",
        width: 1200,
        height: 630,
        alt: "About Medcity Overseas",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Medcity Overseas | Study Abroad Consultants",
    description:
      "Discover the story, leadership, values and student-focused mission of Medcity Overseas.",
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
  name: "About Medcity Overseas",
  description:
    "Learn about Medcity Overseas, its journey, leadership, values and study abroad counselling services.",
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  about: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "en-IN",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
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
      name: "About Us",
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
          __html: JSON.stringify(aboutPageJsonLd).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <div className="overflow-hidden bg-white">
        <AboutHero />
        <AboutStats />
        <StorySection />
        <ChairmanSection />
        <CoreValues />
        <FAQ />
      </div>
    </>
  );
}