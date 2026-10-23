import { callLegacy } from "@/lib/legacy";

import StudyAbroadBlogClient from "./StudyAbroadBlogClient";
import { applySeoOverrides } from "@/lib/pageSeo";

export const dynamic = "force-dynamic";

const SITE_URL =
  "https://medcityoverseas.com";

const PAGE_PATH =
  "/blogs";

const PAGE_URL =
  `${SITE_URL}${PAGE_PATH}`;

const OG_IMAGE =
  `${SITE_URL}/og-images/study-abroad-blog-og.webp`;

const PAGE_TITLE =
  "Study Abroad Blogs, Visa Tips & Student Guides";

const PAGE_DESCRIPTION =
  "Read expert study abroad blogs covering student visas, scholarships, university admissions, destinations, courses and international student experiences.";

/* =========================================================
   METADATA
========================================================= */

const pageMetadata = {
  title:
    PAGE_TITLE,

  description:
    PAGE_DESCRIPTION,

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
    canonical:
      PAGE_PATH,
  },

  openGraph: {
    title:
      PAGE_TITLE,

    description:
      PAGE_DESCRIPTION,

    url:
      PAGE_URL,

    siteName:
      "Medcity Study Abroad",

    type:
      "website",

    locale:
      "en_IN",

    images: [
      {
        url:
          OG_IMAGE,

        width:
          1200,

        height:
          630,

        alt:
          "Medcity Study Abroad Blogs",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      PAGE_TITLE,

    description:
      PAGE_DESCRIPTION,

    images: [
      OG_IMAGE,
    ],
  },

  robots: {
    index:
      true,

    follow:
      true,

    googleBot: {
      index:
        true,

      follow:
        true,

      "max-image-preview":
        "large",

      "max-snippet":
        -1,

      "max-video-preview":
        -1,
    },
  },
};

/* =========================================================
   STRUCTURED DATA
========================================================= */

const structuredData = {
  "@context":
    "https://schema.org",

  "@type":
    "Blog",

  "@id":
    `${PAGE_URL}#blog`,

  name:
    PAGE_TITLE,

  description:
    PAGE_DESCRIPTION,

  url:
    PAGE_URL,

  inLanguage:
    "en-IN",

  publisher: {
    "@type":
      "Organization",

    name:
      "Medcity Study Abroad",

    url:
      SITE_URL,
  },
};

function serializeJsonLd(
  data
) {
  return JSON.stringify(
    data
  ).replace(
    /</g,
    "\\u003c"
  );
}

/* =========================================================
   PAGE
========================================================= */

export default async function StudyAbroadBlogPage() {
  // Rendered on the server so the list (and its links) are in the page
  // Google reads, not loaded afterwards in the browser.
  const result = await callLegacy("getWebBlogs", {});

  const initialBlogs = {
    // Cards only need the start of each post for their excerpt.
    blogs: (Array.isArray(result?.blog) ? result.blog : []).map(
      ({ blog, faqs, gallery, old_slugs, ip, ...card }) => ({
        ...card,
        blog: String(blog ?? "").slice(0, 1500),
      })
    ),
    imagePath: result?.blog_image_path ?? "",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeJsonLd(
              structuredData
            ),
        }}
      />

      <StudyAbroadBlogClient initialBlogs={initialBlogs} />
    </>
  );
}

// Search details edited in the admin apply on top of these.
export async function generateMetadata() {
  return applySeoOverrides(pageMetadata);
}
