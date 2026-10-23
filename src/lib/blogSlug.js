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
/**
 * The post's web address: the fixed address saved in the admin when
 * there is one, otherwise the one worked out from the title (older
 * posts). Saving a post in the admin fixes its address, so editing
 * the title later no longer changes the link.
 */
export function blogPublicSlug(blog) {
  const saved = String(blog?.slug ?? "").trim().toLowerCase();

  return saved || createBlogSlug(blog?.title);
}
