"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

const ITEMS_PER_PAGE = 6;

export default function useBlogs(initial = null) {
  const [
    blogs,
    setBlogs,
  ] = useState(initial?.blogs ?? []);

  const [
    imagePath,
    setImagePath,
  ] = useState(initial?.imagePath ?? "");

  const [
    loading,
    setLoading,
  ] = useState(!initial);

  const [
    error,
    setError,
  ] = useState("");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  /* =========================================================
     LOAD BLOGS
  ========================================================= */

  useEffect(() => {
    // The server already sent the list with the page.
    if (initial) {
      return undefined;
    }

    const controller =
      new AbortController();

    async function fetchBlogs() {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(
            "/api/blogs",
            {
              method: "GET",

              cache:
                "no-store",

              signal:
                controller.signal,

              headers: {
                Accept:
                  "application/json",
              },
            }
          );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Unable to load blogs."
          );
        }

        const blogList =
          Array.isArray(
            result?.blogs
          )
            ? result.blogs
            : [];

        setBlogs(
          blogList
        );

        setImagePath(
          typeof result?.imagePath ===
            "string"
            ? result.imagePath
            : ""
        );

        setCurrentPage(1);
      } catch (
        requestError
      ) {
        if (
          requestError?.name ===
          "AbortError"
        ) {
          return;
        }

        console.error(
          "Blog fetch error:",
          requestError
        );

        setError(
          requestError?.message ||
            "Unable to load blogs."
        );
      } finally {
        if (
          !controller
            .signal.aborted
        ) {
          setLoading(false);
        }
      }
    }

    fetchBlogs();

    return () => {
      controller.abort();
    };
  }, []);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        blogs.length /
          ITEMS_PER_PAGE
      )
    );

  const paginatedBlogs =
    useMemo(() => {
      const startIndex =
        (currentPage - 1) *
        ITEMS_PER_PAGE;

      const endIndex =
        startIndex +
        ITEMS_PER_PAGE;

      return blogs.slice(
        startIndex,
        endIndex
      );
    }, [
      blogs,
      currentPage,
    ]);

  const goToPage = (
    page
  ) => {
    const safePage =
      Math.min(
        Math.max(
          page,
          1
        ),
        totalPages
      );

    setCurrentPage(
      safePage
    );

    window.scrollTo({
      top: 0,
      behavior:
        "smooth",
    });
  };

  const nextPage = () => {
    goToPage(
      currentPage + 1
    );
  };

  const previousPage =
    () => {
      goToPage(
        currentPage - 1
      );
    };

  return {
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
  };
}