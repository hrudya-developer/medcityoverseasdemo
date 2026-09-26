import {
    notFound,
    redirect,
  } from "next/navigation";
  
  import {
    createBlogSlug,
  } from "@/lib/blogSlug";
  
  import BlogDetailsHero from "./components/BlogDetailsHero";
  import BlogDetailsContent from "./components/BlogDetailsContent";
  
  /* =========================================================
     CONFIG
  ========================================================= */
  
  const SITE_URL =
    "https://medcityoverseas.com";
  
  const BLOG_LIST_API_URL =
    "http://overseas.technocitysolutions.com/public/api/getWebBlogs";
  
  const BLOG_DETAIL_API_URL =
    "http://overseas.technocitysolutions.com/public/api/getWebBlogDetail";
  
  const API_KEY =
    process.env.OVERSEAS_API_KEY;
  
  /* =========================================================
     GET ALL BLOGS
  
     Used only to resolve:
     slug -> blog -> id
  
     The ID remains internal.
  ========================================================= */
  
  async function getAllBlogs() {
    try {
      if (!API_KEY) {
        console.error(
          "OVERSEAS_API_KEY is missing"
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
  
            next: {
              revalidate: 3600,
            },
  
            headers: {
              Accept:
                "application/json",
            },
          }
        );
  
      if (!response.ok) {
        console.error(
          "Blog list API failed:",
          response.status
        );
  
        return [];
      }
  
      const result =
        await response.json();
  
      /*
        Supports common response shapes:
  
        {
          blogs: [...]
        }
  
        or
  
        {
          data: [...]
        }
  
        or
  
        {
          blog: [...]
        }
      */
  
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
     FIND BLOG USING CLEAN SLUG
  
     Example:
  
     URL:
     /blog-details/study-abroad-in-germany
  
     Blog:
     {
       id: 8,
       title: "Study Abroad in Germany"
     }
  
     ID 8 is found internally.
  ========================================================= */
  
  async function getBlogBySlug(
    slug
  ) {
    const blogs =
      await getAllBlogs();
  
    if (
      !Array.isArray(blogs) ||
      !slug
    ) {
      return null;
    }
  
    const normalizedSlug =
      String(slug)
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
  
     ID is used internally only.
  ========================================================= */
  
  async function getBlogDetails(
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
        console.error(
          "Blog detail API failed:",
          response.status
        );
  
        return null;
      }
  
      const result =
        await response.json();
  
      /*
        Expected:
  
        {
          blog_image_path: "...",
  
          blog: [
            {
              id: 8,
              title: "...",
              blog: "...",
              image_land: "...",
              image_prt: "...",
              date: "...",
              duration: "...",
              status: "1"
            }
          ]
        }
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
  
  /* =========================================================
     CREATE META DESCRIPTION
  ========================================================= */
  
  function createDescription(
    content
  ) {
    return String(
      content || ""
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
      .trim()
      .slice(
        0,
        160
      );
  }
  
  /* =========================================================
     BUILD IMAGE URL
  ========================================================= */
  
  function createImageUrl(
    imagePath,
    imageName
  ) {
    if (
      !imagePath ||
      !imageName
    ) {
      return "";
    }
  
    const base =
      String(
        imagePath
      ).replace(
        /\/+$/,
        ""
      );
  
    const image =
      String(
        imageName
      ).replace(
        /^\/+/,
        ""
      );
  
    return `${base}/${image}`;
  }
  
  /* =========================================================
     SEO METADATA
  ========================================================= */
  
  export async function generateMetadata({
    params,
  }) {
    const {
      slug,
    } = await params;
  
    /* ---------------------------------------------------------
       Find blog from clean slug
    --------------------------------------------------------- */
  
    const listBlog =
      await getBlogBySlug(
        slug
      );
  
    if (
      !listBlog?.id
    ) {
      return {
        title:
          "Blog Not Found | Medcity Study Abroad",
  
        robots: {
          index: false,
          follow: false,
        },
      };
    }
  
    /* ---------------------------------------------------------
       Fetch full blog using internal ID
    --------------------------------------------------------- */
  
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
        blog?.blog
      );
  
    /*
      IMPORTANT:
      Only title is used.
  
      No ID appended.
    */
  
    const canonicalSlug =
      createBlogSlug(
        title
      );
  
    const pageUrl =
      `${SITE_URL}/blog-details/${canonicalSlug}`;
  
    const imageUrl =
      createImageUrl(
        result?.imagePath,
        blog?.image_land
      );
  
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
  
        images:
          imageUrl
            ? [
                {
                  url:
                    imageUrl,
  
                  alt:
                    title,
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
      },
    };
  }
  
  /* =========================================================
     BLOG DETAILS PAGE
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
       STEP 1
       FIND BLOG FROM CLEAN SLUG
  
       Example:
  
       /blog-details/study-abroad-in-germany
  
       finds:
  
       {
         id: 8,
         title: "Study Abroad in Germany"
       }
    ===================================================== */
  
    const listBlog =
      await getBlogBySlug(
        slug
      );
  
    if (
      !listBlog?.id
    ) {
      notFound();
    }
  
    /* =====================================================
       STEP 2
       USE ID INTERNALLY
  
       ID IS NOT IN THE URL
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
  
    /* =====================================================
       STEP 3
       CREATE CLEAN CANONICAL SLUG
    ===================================================== */
  
    const canonicalSlug =
      createBlogSlug(
        blog?.title
      );
  
    if (
      !canonicalSlug
    ) {
      notFound();
    }
  
    /* =====================================================
       STEP 4
       REDIRECT WRONG / OLD SLUG
  
       Correct:
       /blog-details/study-abroad-in-germany
  
       No:
       /blog-details/study-abroad-in-germany-8
    ===================================================== */
  
    if (
      slug !==
      canonicalSlug
    ) {
      redirect(
        `/blog-details/${canonicalSlug}`
      );
    }
  
    /* =====================================================
       PAGE
    ===================================================== */
  
    return (
      <main className="min-h-screen bg-white">
        <BlogDetailsHero
          blog={
            blog
          }
          imagePath={
            result.imagePath
          }
        />
  
        <BlogDetailsContent
          blog={
            blog
          }
        />
      </main>
    );
  }