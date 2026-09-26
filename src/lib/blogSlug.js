// src/lib/blogSlug.js

export function createBlogSlug(
    title
  ) {
    const slug =
      String(
        title ||
          "blog"
      )
        .toLowerCase()
        .trim()
        .replace(
          /&/g,
          " and "
        )
        .replace(
          /['’]/g,
          ""
        )
        .replace(
          /[^a-z0-9]+/g,
          "-"
        )
        .replace(
          /^-+|-+$/g,
          ""
        );
  
    return (
      slug ||
      "blog"
    );
  }