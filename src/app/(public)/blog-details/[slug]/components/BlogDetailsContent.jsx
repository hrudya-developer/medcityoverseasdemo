import sanitizeHtml from "sanitize-html";

import {
  BookOpenText,
  CalendarDays,
  Clock3,
  ExternalLink,
} from "lucide-react";

function hasValue(
  value
) {
  return Boolean(
    String(
      value ?? ""
    ).trim()
  );
}

/**
 * Blog HTML comes from the backend. Allow ordinary article markup
 * only, so a script, event handler or javascript: link stored in a
 * blog can never run on medcityoverseas.com.
 */
const SANITIZE_OPTIONS = {
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

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatContent(
  content
) {
  if (!content) {
    return "";
  }

  const value =
    String(content);

  if (
    value.includes("<p") ||
    value.includes("<br") ||
    value.includes("<ul") ||
    value.includes("<ol")
  ) {
    return sanitizeHtml(value, SANITIZE_OPTIONS);
  }

  // Plain text: escape it, then turn line breaks into paragraphs.
  return escapeHtml(value)
    .split(
      /\n\s*\n/
    )
    .map(
      (paragraph) =>
        `<p>${paragraph.replace(
          /\n/g,
          "<br />"
        )}</p>`
    )
    .join("");
}

function AdditionalSection({
  heading,
  content,
  number,
}) {
  if (
    !hasValue(heading) &&
    !hasValue(content)
  ) {
    return null;
  }

  return (
    <section
      className="
        border-t
        border-slate-100
        pt-8
      "
    >
      {heading && (
        <div
          className="
            mb-4
            flex
            items-start
            gap-3
          "
        >
          <span
            className="
              mt-1
              grid
              h-7
              w-7
              shrink-0
              place-items-center
              rounded-lg
              bg-primary/10
              text-xs
              font-black
              text-primary
            "
          >
            {number}
          </span>

          <h2
            className="
              text-xl
              font-black
              leading-snug
              text-secondary
              sm:text-2xl
            "
          >
            {heading}
          </h2>
        </div>
      )}

      {content && (
        <article
          className="
            prose
            prose-slate
            max-w-none

            prose-p:text-base
            prose-p:leading-8
            prose-p:text-slate-600

            prose-a:font-bold
            prose-a:text-primary

            prose-strong:text-slate-900

            prose-ul:text-slate-600
            prose-ol:text-slate-600
          "
          dangerouslySetInnerHTML={{
            __html:
              formatContent(
                content
              ),
          }}
        />
      )}
    </section>
  );
}

export default function BlogDetailsContent({
  blog,
}) {
  if (!blog) {
    return null;
  }

  const content =
    blog?.blog || "";

  const hasAdditionalContent =
    hasValue(
      blog?.subheading1
    ) ||
    hasValue(
      blog?.subtext1
    ) ||
    hasValue(
      blog?.subheading2
    ) ||
    hasValue(
      blog?.subtext2
    ) ||
    hasValue(
      blog?.subheading3
    ) ||
    hasValue(
      blog?.subtext3
    );

  return (
    <section
      className="
        bg-white
        py-12
        sm:py-16
        lg:py-20
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            rounded-[30px]
            border
            border-slate-200
            bg-white
            p-6
            shadow-[0_15px_50px_rgba(15,23,42,0.06)]
            sm:p-8
            lg:p-10
          "
        >
          {/* META */}

          <div
            className="
              mb-8
              flex
              flex-wrap
              items-center
              gap-4
              border-b
              border-slate-100
              pb-6
            "
          >
            <div
              className="
                grid
                h-11
                w-11
                place-items-center
                rounded-xl
                bg-primary/10
                text-primary
              "
            >
              <BookOpenText
                size={21}
              />
            </div>

            <div
              className="
                flex
                flex-wrap
                gap-4
                text-sm
                font-semibold
                text-slate-500
              "
            >
              {blog?.date && (
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <CalendarDays
                    size={16}
                    className="text-primary"
                  />

                  {blog.date}
                </div>
              )}

              {blog?.duration && (
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Clock3
                    size={16}
                    className="text-primary"
                  />

                  {blog.duration}
                </div>
              )}
            </div>
          </div>

          {/* MAIN BLOG CONTENT */}

          {content ? (
            <article
              className="
                prose
                prose-slate
                max-w-none

                prose-headings:font-black
                prose-headings:text-secondary

                prose-p:text-base
                prose-p:leading-8
                prose-p:text-slate-600

                prose-a:font-bold
                prose-a:text-primary

                prose-strong:text-slate-900

                prose-img:rounded-2xl
              "
              dangerouslySetInnerHTML={{
                __html:
                  formatContent(
                    content
                  ),
              }}
            />
          ) : (
            <p className="text-slate-500">
              No main blog content is available.
            </p>
          )}

          {/* ADDITIONAL CONTENT */}

          {hasAdditionalContent && (
            <div
              className="
                mt-10
                space-y-8
              "
            >
              <AdditionalSection
                number="1"
                heading={
                  blog?.subheading1
                }
                content={
                  blog?.subtext1
                }
              />

              <AdditionalSection
                number="2"
                heading={
                  blog?.subheading2
                }
                content={
                  blog?.subtext2
                }
              />

              <AdditionalSection
                number="3"
                heading={
                  blog?.subheading3
                }
                content={
                  blog?.subtext3
                }
              />
            </div>
          )}

          {/* REFERENCE LINK */}

          {blog?.link && (
            <div
              className="
                mt-10
                border-t
                border-slate-100
                pt-8
              "
            >
              <a
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-primary
                  px-5
                  py-3
                  text-sm
                  font-extrabold
                  text-white
                  shadow-md
                  transition
                  hover:-translate-y-0.5
                  hover:bg-darkPrimary
                "
              >
                Read More

                <ExternalLink
                  size={16}
                />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}