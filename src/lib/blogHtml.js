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
    th: ["colspan", "rowspan"],
    td: ["colspan", "rowspan"],
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
  // Keep a space between blocks so "Intro.</p><h2>Next" doesn't run together.
  const spaced = String(value ?? "").replace(
    /<(\/?)(p|h[1-6]|li|ul|ol|td|th|tr|div|br|blockquote|table)\b/gi,
    " <$1$2"
  );

  return sanitizeHtml(spaced, {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

/** "6 min read" at about 200 words a minute. */
export function readingTime(value) {
  const words = blogPlainText(value).split(" ").filter(Boolean).length;

  return `${Math.max(1, Math.round(words / 200))} min read`;
}

/* =========================================================
   OLDER POSTS WRITTEN AS PLAIN TEXT

   Some posts from the old admin are plain text: blank lines between
   paragraphs, "- " at the start of bullet lines, a bold line on its own
   as a section title, with a few inline <strong>/<a> tags. Turn that
   into real HTML so it shows as paragraphs, lists and headings.
========================================================= */

const BLOCK_TAG = /<(p|h[1-6]|ul|ol|li|div|table|blockquote|br|section|article)\b/i;

const BULLET = /^\s*(?:[-•*–]\s+)(.*)$/;
const NUMBERED = /^\s*\d{1,2}[.)]\s+(.*)$/;

function isHeadingLine(line) {
  const text = line.trim();
  const bold = /^<(strong|b)>([\s\S]*)<\/\1>\s*:?$/i.exec(text);

  if (bold) {
    return bold[2].replace(/:\s*$/, "").trim();
  }

  return "";
}

export function legacyTextToHtml(text) {
  const blocks = String(text ?? "")
    .replace(/\r\n?/g, "\n")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  const html = [];

  for (const block of blocks) {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    let paragraph = [];
    let list = null;

    const flushParagraph = () => {
      if (paragraph.length) {
        html.push(`<p>${paragraph.join("<br>")}</p>`);
        paragraph = [];
      }
    };

    const flushList = () => {
      if (list) {
        html.push(`<${list.tag}>${list.items.map((item) => `<li>${item}</li>`).join("")}</${list.tag}>`);
        list = null;
      }
    };

    // A short line standing alone (no full stop, not the opening line)
    // is a subheading in these posts, e.g. "Who may qualify for an
    // exemption?" or "Changes to applying for a Student visa".
    const plain = lines.length === 1 ? lines[0].replace(/<[^>]+>/g, "").trim() : "";
    const isSubheading =
      plain &&
      html.length > 0 &&
      plain.length <= 100 &&
      plain.split(/\s+/).length <= 14 &&
      !/[.,;:]$/.test(plain) &&
      !BULLET.test(plain) &&
      !NUMBERED.test(plain) &&
      !isHeadingLine(lines[0]);

    if (isSubheading) {
      html.push(`<h3>${lines[0]}</h3>`);
      continue;
    }

    for (const line of lines) {
      const heading = lines.length === 1 ? isHeadingLine(line) : "";
      const bullet = BULLET.exec(line);
      const numbered = NUMBERED.exec(line);

      if (heading) {
        flushParagraph();
        flushList();
        html.push(`<h2>${heading}</h2>`);
      } else if (bullet || numbered) {
        flushParagraph();

        const tag = bullet ? "ul" : "ol";

        if (list && list.tag !== tag) {
          flushList();
        }

        list = list ?? { tag, items: [] };
        list.items.push((bullet ?? numbered)[1]);
      } else {
        flushList();
        paragraph.push(line);
      }
    }

    flushParagraph();
    flushList();
  }

  return html.join("\n");
}

function headingId(text, used) {
  const base =
    String(text)
      .toLowerCase()
      .replace(/&[a-z#0-9]+;/g, " ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "section";

  let id = base;
  let counter = 2;

  while (used.has(id)) {
    id = `${base}-${counter}`;
    counter += 1;
  }

  used.add(id);

  return id;
}

/**
 * Turn a stored post body into clean, safe HTML for the page and the
 * editor:
 *   - plain-text posts become paragraphs, lists and headings;
 *   - an H1 inside the body becomes an H2 (the title is the page's H1);
 *   - H2 and H3 get ids, and are returned as `headings` for a table of
 *     contents.
 */
export function normalizeBlogHtml(value) {
  const raw = String(value ?? "");
  const source = BLOCK_TAG.test(raw) ? raw : legacyTextToHtml(raw);

  let html = sanitizeBlogHtml(source)
    // Older posts repeat the title as an H1 at the very top; the page
    // already shows it, so drop that one.
    .replace(/^\s*<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>\s*/i, "")
    .replace(/<h1(\s[^>]*)?>/gi, "<h2>")
    .replace(/<\/h1>/gi, "</h2>");

  const used = new Set();
  const headings = [];

  html = html.replace(/<(h2|h3)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi, (_match, tag, inner) => {
    const text = blogPlainText(inner);

    if (!text) {
      return "";
    }

    const id = headingId(text, used);

    headings.push({ level: Number(tag[1]), id, text });

    return `<${tag} id="${id}">${inner}</${tag}>`;
  });

  return { html, headings };
}

/* =========================================================
   FAQS (stored as JSON text in tb_blog_web.faqs)
========================================================= */

export function parseFaqs(value) {
  if (Array.isArray(value)) {
    return value;
  }

  try {
    const parsed = JSON.parse(String(value ?? "") || "[]");

    return Array.isArray(parsed)
      ? parsed
          .map((item) => ({
            question: String(item?.question ?? "").trim(),
            answer: String(item?.answer ?? "").trim(),
          }))
          .filter((item) => item.question && item.answer)
      : [];
  } catch {
    return [];
  }
}

/* =========================================================
   GALLERY (stored as JSON text in tb_blog_web.gallery)
========================================================= */

export function parseGallery(value) {
  try {
    const parsed = Array.isArray(value) ? value : JSON.parse(String(value ?? "") || "[]");

    return Array.isArray(parsed)
      ? parsed
          .map((item) => ({
            src: String(item?.src ?? "").trim(),
            alt: String(item?.alt ?? "").trim(),
          }))
          .filter((item) => item.src)
      : [];
  } catch {
    return [];
  }
}
