import { callLegacy } from "@/lib/legacy";

import Link from "next/link";

import StudyAbroadBlogClient from "./StudyAbroadBlogClient";
import { blogFaqs } from "./blogsFaqData";
import OfficialSources from "@/components/seo/OfficialSources";
import PageSchema from "@/components/seo/PageSchema";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";
import { blogPublicSlug } from "@/lib/blogSlug";
import { STUDY_ABROAD_SOURCES } from "@/lib/officialSources";
import { applySeoOverrides, withPageSeoFaqs } from "@/lib/pageSeo";
import { faqPageNode, jsonLdString, latestDate, ORG_ID } from "@/lib/seoSchema";

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

// Update when this page's own text is reviewed.
const TEMPLATE_UPDATED = "2026-10-24";

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

  const published = initialBlogs.blogs;
  const latest = published[0];
  const dateModified = latestDate(
    TEMPLATE_UPDATED,
    ...published.slice(0, 20).map((blog) => blog.updated_at)
  );

  const blogNode = {
    "@type": "Blog",
    "@id": `${PAGE_URL}#blog`,
    name: "Medcity Overseas study abroad blog",
    url: PAGE_URL,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
    blogPost: published.slice(0, 10).map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      url: `${SITE_URL}/blog-details/${blogPublicSlug(blog)}`,
    })),
  };

  const faqSchema = await withPageSeoFaqs({
    "@context": "https://schema.org",
    ...faqPageNode(PAGE_PATH, blogFaqs),
  });

  return (
    <>
      <PageSchema
        path={PAGE_PATH}
        type="CollectionPage"
        name={`${PAGE_TITLE} | Medcity Overseas`}
        description={PAGE_DESCRIPTION}
        dateModified={dateModified}
        image={OG_IMAGE}
        mainEntity={{ "@id": `${PAGE_URL}#blog` }}
        entities={[blogNode]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blogs", path: PAGE_PATH },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(faqSchema) }}
      />

      <StudyAbroadBlogClient
        initialBlogs={initialBlogs}
        intro={
          <QuickAnswer updated={dateModified} className="pb-10 pt-8">
            {published.length > 0
              ? `The Medcity Overseas blog has ${published.length} ${published.length === 1 ? "article" : "articles"} for students planning to study abroad, on student visas, scholarships, university admissions, destinations and courses. The latest is "${latest.title}". Rules change, so check the official sources below before you apply.`
              : "The Medcity Overseas blog publishes guides for students planning to study abroad, on student visas, scholarships, university admissions, destinations and courses."}
          </QuickAnswer>
        }
        beforeFaq={
          <QuestionAnswer
            className="pb-6"
            eyebrow="About the blog"
            question="What does the Medcity Overseas study abroad blog cover?"
            answer="The blog explains the steps of studying abroad for students from Kerala and the rest of India: choosing a country and course, university applications, student visas, scholarships, English and German language tests, nursing careers abroad and student life. Rules change often, so check the official sources linked in each article before you apply."
            points={[
              { title: "Destinations", text: "studying in Germany, the UK, Ireland, Canada, Australia and more." },
              { title: "Applications and visas", text: "documents, admission steps and student visa rules." },
              { title: "Language tests", text: "IELTS, OET and German exams such as Goethe and telc." },
              { title: "Careers", text: "nursing pathways and work after your studies." },
            ]}
          />
        }
        afterFaq={
          <>
            <OfficialSources className="pb-10" links={STUDY_ABROAD_SOURCES} />

            <p className="mx-auto max-w-5xl px-4 pb-16 text-sm leading-7 text-slate-600 sm:px-6 lg:px-8">
              Ready to plan your move? Compare{" "}
              <Link href="/destinations" className="font-bold text-primary hover:underline">
                study destinations
              </Link>
              , search the{" "}
              <Link href="/courses" className="font-bold text-primary hover:underline">
                course finder
              </Link>
              , browse{" "}
              <Link href="/universities" className="font-bold text-primary hover:underline">
                universities abroad
              </Link>{" "}
              or{" "}
              <Link href="/contact-us" className="font-bold text-primary hover:underline">
                contact Medcity Overseas
              </Link>{" "}
              for free counselling.
            </p>
          </>
        }
      />
    </>
  );
}

// Search details edited in the admin apply on top of these.
export async function generateMetadata() {
  return applySeoOverrides(pageMetadata);
}
