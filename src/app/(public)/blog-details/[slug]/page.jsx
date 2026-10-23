import { cache } from "react";

import {
  notFound,
  redirect,
} from "next/navigation";

import {
  createBlogSlug,
} from "@/lib/blogSlug";

import BlogDetailsHero from "./components/BlogDetailsHero";
import BlogDetailsContent from "./components/BlogDetailsContent";
import BranchesInfo from "../../branches/components/BranchesInfo";
import {
  getBranchInfoForBlogTitle,
} from "../../branches/data/branchesInfo";

/* =========================================================
   CONFIG
========================================================= */

const SITE_URL =
  "https://medcityoverseas.com";

const API_BASE_URL =
  "https://overseas.technocitysolutions.com/public/api";

const BLOG_LIST_API_URL =
  `${API_BASE_URL}/getWebBlogs`;

const BLOG_DETAIL_API_URL =
  `${API_BASE_URL}/getWebBlogDetail`;

const API_KEY =
  process.env.OVERSEAS_API_KEY;

export const dynamic =
  "force-dynamic";

/**
 * decodeURIComponent throws on malformed input such as "%E0".
 * Treat that as "no such blog" (404) instead of a 500.
 */
function safeDecode(value) {
  try {
    return decodeURIComponent(String(value));
  } catch {
    return "";
  }
}

/* =========================================================
   FETCH ALL BLOGS

   Used only for:
   slug -> blog -> internal id
========================================================= */

async function fetchAllBlogs() {
  try {
    if (!API_KEY) {
      console.error(
        "OVERSEAS_API_KEY is missing."
      );

      return [];
    }

    const formData =
      new FormData();

    formData.append(
      "api",
      API_KEY
    );

    const response =
      await fetch(
        BLOG_LIST_API_URL,
        {
          method: "POST",

          body:
            formData,

          cache:
            "no-store",

          headers: {
            Accept:
              "application/json",
          },
        }
      );

    if (!response.ok) {
      const errorText =
        await response
          .text()
          .catch(
            () => ""
          );

      console.error(
        "Blog list API failed:",
        response.status,
        errorText
      );

      return [];
    }

    const result =
      await response.json();

    if (
      Array.isArray(
        result?.blogs
      )
    ) {
      return result.blogs;
    }

    if (
      Array.isArray(
        result?.data
      )
    ) {
      return result.data;
    }

    if (
      Array.isArray(
        result?.blog
      )
    ) {
      return result.blog;
    }

    return [];
  } catch (error) {
    console.error(
      "Blog list fetch error:",
      error
    );

    return [];
  }
}

/* =========================================================
   FIND BLOG FROM CLEAN SLUG

   Public URL:
   /blog-details/study-abroad-in-germany

   ID remains internal.
========================================================= */

// Memoised per request: generateMetadata and the page share one
// set of backend calls instead of fetching everything twice.
const getAllBlogs = cache(fetchAllBlogs);

async function getBlogBySlug(
  slug
) {
  if (!slug) {
    return null;
  }

  const blogs =
    await getAllBlogs();

  if (
    !Array.isArray(
      blogs
    ) ||
    blogs.length === 0
  ) {
    return null;
  }

  const normalizedSlug =
    safeDecode(slug)
      .toLowerCase()
      .trim();

  const matchedBlog =
    blogs.find(
      (item) => {
        const itemSlug =
          createBlogSlug(
            item?.title
          );

        return (
          itemSlug ===
          normalizedSlug
        );
      }
    );

  return (
    matchedBlog ||
    null
  );
}

/* =========================================================
   GET BLOG DETAILS

   Full object returned by getWebBlogDetail.

   Expected fields can include:

   id
   title
   blog
   duration
   date
   image_land
   image_prt
   status
   ip
   created_date

   subheading1
   subheading2
   subheading3

   subtext1
   subtext2
   subtext3

   alt_text1
   alt_text2

   link
========================================================= */

async function fetchBlogDetails(
  id
) {
  try {
    if (
      !id ||
      !API_KEY
    ) {
      return null;
    }

    const formData =
      new FormData();

    formData.append(
      "api",
      API_KEY
    );

    formData.append(
      "id",
      String(id)
    );

    const response =
      await fetch(
        BLOG_DETAIL_API_URL,
        {
          method: "POST",

          body:
            formData,

          cache:
            "no-store",

          headers: {
            Accept:
              "application/json",
          },
        }
      );

    if (!response.ok) {
      const errorText =
        await response
          .text()
          .catch(
            () => ""
          );

      console.error(
        "Blog detail API failed:",
        response.status,
        errorText
      );

      return null;
    }

    const result =
      await response.json();

    /*
     * Preserve the COMPLETE backend blog object.
     * Do not map selected fields here.
     */
    const blog =
      Array.isArray(
        result?.blog
      )
        ? result.blog[0] ??
          null
        : result?.blog &&
            typeof result.blog ===
              "object"
          ? result.blog
          : null;

    if (!blog) {
      return null;
    }

    const imagePath =
      typeof result?.blog_image_path ===
      "string"
        ? result.blog_image_path
        : "";

    return {
      blog,
      imagePath,
    };
  } catch (error) {
    console.error(
      "Blog detail fetch error:",
      error
    );

    return null;
  }
}

const getBlogDetails = cache(fetchBlogDetails);

/* =========================================================
   STRIP HTML
========================================================= */

function stripHtml(
  value = ""
) {
  return String(
    value || ""
  )
    .replace(
      /<[^>]*>/g,
      " "
    )
    .replace(
      /&nbsp;/gi,
      " "
    )
    .replace(
      /&amp;/gi,
      "&"
    )
    .replace(
      /&quot;/gi,
      '"'
    )
    .replace(
      /&#39;/gi,
      "'"
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();
}

/* =========================================================
   META DESCRIPTION

   Main blog content first.

   Falls back to additional section text when required.
========================================================= */

function createDescription(
  blog
) {
  const content =
    blog?.blog ||
    blog?.subtext1 ||
    blog?.subtext2 ||
    blog?.subtext3 ||
    "";

  const description =
    stripHtml(
      content
    );

  if (description) {
    return description.slice(
      0,
      160
    );
  }

  return (
    blog?.title
      ? `Read ${blog.title} from Medcity Study Abroad.`
      : "Read study abroad guides, student visa information and overseas education insights from Medcity Study Abroad."
  );
}

/* =========================================================
   IMAGE URL
========================================================= */

function createImageUrl(
  imagePath,
  imageName
) {
  if (!imageName) {
    return "";
  }

  const image =
    String(
      imageName
    ).trim();

  if (
    image.startsWith(
      "http://"
    ) ||
    image.startsWith(
      "https://"
    )
  ) {
    return image;
  }

  if (!imagePath) {
    return "";
  }

  const base =
    String(
      imagePath
    ).replace(
      /\/+$/,
      ""
    );

  const file =
    image.replace(
      /^\/+/,
      ""
    );

  return `${base}/${file}`;
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}) {
  const {
    slug,
  } = await params;

  if (!slug) {
    return {
      title:
        "Blog Not Found | Medcity Study Abroad",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  /* ---------------------------
     FIND BLOG FROM CLEAN SLUG
  --------------------------- */

  const listBlog =
    await getBlogBySlug(
      slug
    );

  if (!listBlog?.id) {
    return {
      title:
        "Blog Not Found | Medcity Study Abroad",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  /* ---------------------------
     GET COMPLETE BLOG
  --------------------------- */

  const result =
    await getBlogDetails(
      listBlog.id
    );

  const blog =
    result?.blog;

  if (!blog) {
    return {
      title:
        "Blog Not Found | Medcity Study Abroad",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    blog?.title ||
    "Study Abroad Blog";

  const description =
    createDescription(
      blog
    );

  const canonicalSlug =
    createBlogSlug(
      title
    );

  const pageUrl =
    `${SITE_URL}/blog-details/${canonicalSlug}`;

  const imageUrl =
    createImageUrl(
      result?.imagePath,
      blog?.image_land ||
        blog?.image_prt
    );

  const imageAlt =
    blog?.alt_text1 ||
    blog?.alt_text2 ||
    title;

  return {
    title:
      `${title} | Medcity Study Abroad`,

    description,

    alternates: {
      canonical:
        `/blog-details/${canonicalSlug}`,
    },

    openGraph: {
      title,

      description,

      url:
        pageUrl,

      siteName:
        "Medcity Study Abroad",

      type:
        "article",

      locale:
        "en_IN",

      images:
        imageUrl
          ? [
              {
                url:
                  imageUrl,

                width:
                  1200,

                height:
                  630,

                alt:
                  imageAlt,
              },
            ]
          : [],
    },

    twitter: {
      card:
        "summary_large_image",

      title,

      description,

      images:
        imageUrl
          ? [
              imageUrl,
            ]
          : [],
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,

        "max-image-preview":
          "large",

        "max-snippet":
          -1,

        "max-video-preview":
          -1,
      },
    },
  };
}

/* =========================================================
   JSON-LD
========================================================= */

function createStructuredData({
  blog,
  pageUrl,
  imageUrl,
}) {
  return {
    "@context":
      "https://schema.org",

    "@type":
      "BlogPosting",

    "@id":
      `${pageUrl}#article`,

    headline:
      blog?.title ||
      "Study Abroad Blog",

    description:
      createDescription(
        blog
      ),

    url:
      pageUrl,

    mainEntityOfPage: {
      "@type":
        "WebPage",

      "@id":
        pageUrl,
    },

    image:
      imageUrl
        ? [
            imageUrl,
          ]
        : undefined,

    publisher: {
      "@type":
        "Organization",

      name:
        "Medcity Study Abroad",

      url:
        SITE_URL,
    },

    inLanguage:
      "en-IN",
  };
}

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

export default async function BlogDetailsPage({
  params,
}) {
  const {
    slug,
  } = await params;

  if (!slug) {
    notFound();
  }

  /* =====================================================
     1. RESOLVE CLEAN SLUG -> INTERNAL BLOG ID
  ===================================================== */

  const listBlog =
    await getBlogBySlug(
      slug
    );

  if (!listBlog?.id) {
    notFound();
  }

  /* =====================================================
     2. GET COMPLETE BLOG OBJECT
  ===================================================== */

  const result =
    await getBlogDetails(
      listBlog.id
    );

  if (
    !result?.blog
  ) {
    notFound();
  }

  const blog =
    result.blog;

  const branchInfo =
    getBranchInfoForBlogTitle(
      blog?.title
    );

  /* =====================================================
     3. CANONICAL CLEAN SLUG
  ===================================================== */

  const canonicalSlug =
    createBlogSlug(
      blog?.title
    );

  if (!canonicalSlug) {
    notFound();
  }

  /* =====================================================
     4. REDIRECT OLD / WRONG URL

     Correct:
     /blog-details/study-abroad-in-germany

     Not:
     /blog-details/study-abroad-in-germany-8
  ===================================================== */

  const currentSlug =
    safeDecode(slug)
      .toLowerCase()
      .trim();

  if (
    currentSlug !==
    canonicalSlug
  ) {
    redirect(
      `/blog-details/${canonicalSlug}`
    );
  }

  /* =====================================================
     5. STRUCTURED DATA
  ===================================================== */

  const pageUrl =
    `${SITE_URL}/blog-details/${canonicalSlug}`;

  const imageUrl =
    createImageUrl(
      result.imagePath,
      blog?.image_land ||
        blog?.image_prt
    );

  const structuredData =
    createStructuredData({
      blog,
      pageUrl,
      imageUrl,
    });

  /* =====================================================
     6. PAGE
  ===================================================== */

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeJsonLd(
              structuredData
            ),
        }}
      />

      <BlogDetailsHero
        blog={blog}
        imagePath={
          result.imagePath
        }
      />

      {branchInfo ? (
        <BranchesInfo
          branch={branchInfo}
        />
      ) : (
        <BlogDetailsContent
          blog={blog}
        />
      )}
    </main>
  );
}