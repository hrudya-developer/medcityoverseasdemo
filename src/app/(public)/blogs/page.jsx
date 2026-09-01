import StudyAbroadBlogClient from "./StudyAbroadBlogClient";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_PATH = "/blogs";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE =
  `${SITE_URL}/og-images/study-abroad-blog-og.webp`;

const PAGE_TITLE =
  "Study Abroad Blogs, Visa Tips & Student Guides | Medcity";

const PAGE_DESCRIPTION =
  "Read expert study abroad blogs covering student visas, scholarships, university admissions, destinations, courses and international student experiences.";

export const metadata = {
  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  keywords: [
    "study abroad blogs",
    "student visa guidance",
    "study abroad scholarships",
    "international education blog",
    "overseas education tips",
    "study abroad destinations",
    "university admission guidance",
    "Medcity Study Abroad blog",
  ],

  alternates: {
    canonical: PAGE_PATH,
  },

  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "Medcity Study Abroad",
    type: "website",
    locale: "en_IN",

    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Medcity Study Abroad Blogs",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${PAGE_URL}#blog`,

  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  url: PAGE_URL,
  inLanguage: "en-IN",

  publisher: {
    "@type": "Organization",
    name: "Medcity Study Abroad",
    url: SITE_URL,
  },
};

function serializeJsonLd(data) {
  return JSON.stringify(data).replace(
    /</g,
    "\\u003c"
  );
}

export default function StudyAbroadBlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            structuredData
          ),
        }}
      />

      <StudyAbroadBlogClient />
    </>
  );
}