"use client";

import BlogFAQ from "./components/BlogFAQ";
import BlogGrid from "./components/BlogGrid";
import BlogHeader from "./components/BlogHeader";
import BlogPagination from "./components/BlogPagination";

import useBlogs from "./hooks/useBlogs";

// intro, beforeFaq and afterFaq are server-rendered sections from page.jsx.
export default function StudyAbroadBlogClient({
  initialBlogs = null,
  intro = null,
  beforeFaq = null,
  afterFaq = null,
}) {
  const {
    blogs,
    paginatedBlogs,
    imagePath,

    loading,
    error,

    currentPage,
    totalPages,

    goToPage,
    nextPage,
    previousPage,
  } = useBlogs(initialBlogs);

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}

      <section className="px-4 pt-5 sm:px-6 lg:px-8">
        <BlogHeader />
      </section>

      {intro}

      {/* BLOGS */}

      <section
        className="
          mx-auto
          w-full
          max-w-[1450px]
          px-4
          pb-16
          sm:px-6
          lg:px-8
        "
      >
        {loading && (
          <div className="py-20 text-center">
            <div
              className="
                mx-auto
                h-10
                w-10
                animate-spin
                rounded-full
                border-4
                border-primary/20
                border-t-primary
              "
            />

            <p className="mt-4 font-semibold text-slate-500">
              Loading blogs...
            </p>
          </div>
        )}

        {!loading &&
          error && (
            <div className="rounded-3xl bg-red-50 px-6 py-14 text-center">
              <p className="font-semibold text-red-600">
                {error}
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          blogs.length ===
            0 && (
            <div className="rounded-3xl bg-slate-50 px-6 py-14 text-center">
              <p className="font-semibold text-slate-500">
                No blogs are
                currently
                available.
              </p>
            </div>
          )}

        {!loading &&
          !error &&
          blogs.length >
            0 && (
            <>
              <BlogGrid
                blogs={
                  paginatedBlogs
                }
                imagePath={
                  imagePath
                }
              />

              <BlogPagination
                currentPage={
                  currentPage
                }
                totalPages={
                  totalPages
                }
                onPageChange={
                  goToPage
                }
                onPrevious={
                  previousPage
                }
                onNext={
                  nextPage
                }
              />
            </>
          )}
      </section>

      {beforeFaq}

      <BlogFAQ />

      {afterFaq}
    </div>
  );
}