import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ImageOff,
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
    blog?.id
      ? createBlogSlug(
          title,
          blog.id
        )
      : "";

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[26px]
        border
        border-slate-200/80
        bg-white
        shadow-[0_12px_38px_rgba(15,23,42,0.08)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_22px_50px_rgba(15,23,42,0.12)]
      "
    >
      {/* IMAGE */}

      {image ? (
        <div className="relative h-[230px] overflow-hidden bg-slate-100">
          <Image
            src={image}
            alt={title}
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
      ) : (
        <div
          className="
            grid
            h-[230px]
            place-content-center
            bg-gradient-to-br
            from-pink-50
            to-slate-100
          "
        >
          <ImageOff
            size={38}
            className="text-primary"
          />
        </div>
      )}

      {/* CONTENT */}

      <div className="flex flex-1 flex-col p-6">
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

        {slug && (
          <div className="mt-auto pt-6">
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
        )}
      </div>
    </article>
  );
}