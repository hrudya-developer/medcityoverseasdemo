import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Clock3,
} from "lucide-react";

import {
  createBlogSlug,
} from "@/lib/blogSlug";

function getBlogTitle(
  blog,
  index
) {
  return (
    blog?.title ||
    `Study Abroad Blog ${index + 1}`
  );
}

function getBlogImage(
  blog,
  imagePath
) {
  const imageName =
    blog?.image_land ||
    blog?.image_prt ||
    blog?.image ||
    "";

  if (!imageName) {
    return "";
  }

  const imageValue =
    String(imageName).trim();

  if (
    imageValue.startsWith("http://") ||
    imageValue.startsWith("https://")
  ) {
    return imageValue;
  }

  const basePath =
    String(
      imagePath || ""
    ).replace(
      /\/+$/,
      ""
    );

  const fileName =
    imageValue.replace(
      /^\/+/,
      ""
    );

  return basePath
    ? `${basePath}/${fileName}`
    : "";
}

function stripHtml(
  value = ""
) {
  return String(value)
    .replace(
      /<[^>]*>/g,
      " "
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();
}

export default function BlogCard({
  blog,
  index,
  imagePath,
}) {
  if (!blog) {
    return null;
  }

  const title =
    getBlogTitle(
      blog,
      index
    );

  const image =
    getBlogImage(
      blog,
      imagePath
    );

  const slug =
    createBlogSlug(
      title
    );

  const excerpt =
    stripHtml(
      blog?.blog ||
      blog?.subtext1 ||
      ""
    );

  const imageAlt =
    blog?.alt_text1 ||
    title;

  return (
    <article
      className={`
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[26px]
        border
        border-slate-200/80
        shadow-[0_12px_38px_rgba(15,23,42,0.08)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_22px_50px_rgba(15,23,42,0.12)]
        ${image
          ? "bg-white"
          : "border-t-4 border-t-primary bg-gradient-to-br from-rose-50/80 via-white to-sky-50/70"}
      `}
    >
      {image && (
        <div
          className="
            relative
            h-[230px]
            overflow-hidden
            bg-slate-100
          "
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority={
              index === 0
            }
            unoptimized
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              33vw
            "
            className="
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />
        </div>
      )}

      <div
        className="
          flex
          flex-1
          flex-col
          p-6
          sm:p-7
        "
      >
        {!image && (
          <div className="mb-5 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/15">
              <BookOpenText size={21} strokeWidth={1.8} />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary">
              Study Abroad Insights
            </span>
          </div>
        )}

        {(blog?.date ||
          blog?.duration) && (
          <div
            className="
              mb-3
              flex
              flex-wrap
              items-center
              gap-4
              text-xs
              font-semibold
              text-slate-400
            "
          >
            {blog?.date && (
              <div
                className="
                  flex
                  items-center
                  gap-1.5
                "
              >
                <CalendarDays
                  size={14}
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
                  gap-1.5
                "
              >
                <Clock3
                  size={14}
                  className="text-primary"
                />

                {blog.duration}
              </div>
            )}
          </div>
        )}

        <h2
          className="
            line-clamp-2
            text-xl
            font-extrabold
            leading-7
            text-secondary
          "
        >
          {title}
        </h2>

        {excerpt && (
          <p
            className="
              mt-3
              line-clamp-3
              text-sm
              leading-6
              text-slate-500
            "
          >
            {excerpt}
          </p>
        )}

        <div
          className="
            mt-auto
            pt-6
          "
        >
          <Link
            href={`/blog-details/${slug}`}
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

            <ArrowRight
              size={17}
            />
          </Link>
        </div>
      </div>
    </article>
  );
}