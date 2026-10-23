import sanitizeHtml from "sanitize-html";

/**
 * Blog HTML rules, shared by the public blog page and the admin editor.
 *
 * Only ordinary article markup is kept, so a script, event handler or
 * javascript: link stored in a blog can never run on medcityoverseas.com.
 * Relative image paths (/media/12) are allowed for images uploaded
 * through the admin.
 */
export const BLOG_SANITIZE_OPTIONS = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    "img",
    "h1",
    "h2",
    "span",
    "u",
  ]),
  allowedAttributes: {
    a: ["href", "name", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "loading"],
    "*": ["class", "id"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", {
      rel: "noopener noreferrer",
    }),
  },
};

export function sanitizeBlogHtml(value) {
  return sanitizeHtml(String(value ?? ""), BLOG_SANITIZE_OPTIONS);
}

/** Plain text of a blog body, for word counts and descriptions. */
export function blogPlainText(value) {
  return sanitizeHtml(String(value ?? ""), {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** "6 min read" at about 200 words a minute. */
export function readingTime(value) {
  const words = blogPlainText(value).split(" ").filter(Boolean).length;

  return `${Math.max(1, Math.round(words / 200))} min read`;
}
