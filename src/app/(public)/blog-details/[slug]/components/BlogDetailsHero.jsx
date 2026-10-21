import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Sparkles,
} from "lucide-react";

/* =========================================================
   IMAGE URL
========================================================= */

function getImageUrl(
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
    String(
      imageName
    ).trim();

  if (
    imageValue.startsWith(
      "http://"
    ) ||
    imageValue.startsWith(
      "https://"
    )
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

/* =========================================================
   BLOG DETAILS HERO
========================================================= */

export default function BlogDetailsHero({
  blog,
  imagePath,
}) {
  if (!blog) {
    return null;
  }

  const title =
    blog?.title ||
    "Study Abroad Blog";

  const image =
    getImageUrl(
      blog,
      imagePath
    );

  /*
   * alt_text1 belongs to the landscape/main image.
   * Fall back to title if old blogs do not have alt_text1.
   */
  const imageAlt =
    blog?.alt_text1 ||
    title ||
    "Study abroad blog image";

  return (
    <section
      className={`
        relative
        overflow-hidden
        bg-white
        py-10
        sm:py-14
        lg:py-16
      `}
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_15%_20%,rgba(220,38,127,0.10),transparent_32%),radial-gradient(circle_at_90%_80%,rgba(37,99,235,0.10),transparent_34%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]
          [background-size:38px_38px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-32
          top-10
          h-[360px]
          w-[360px]
          rounded-full
          bg-primary/10
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-0
          h-[380px]
          w-[380px]
          rounded-full
          bg-secondary/10
          blur-[130px]
        "
      />

      {/* =====================================================
          CONTAINER
      ===================================================== */}

      <div
        className={`
          relative
          z-10
          mx-auto
          w-full
          px-4
          sm:px-6
          lg:px-8
          ${
            image
              ? "grid max-w-[1400px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14"
              : "max-w-4xl text-center"
          }
        `}
      >
        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <div
          className={
            image
              ? ""
              : "mx-auto flex flex-col items-center text-center"
          }
        >
          {/* BACK */}

          <Link
            href="/blogs"
            className="
              group
              mb-7
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-slate-200
              bg-white/90
              px-4
              py-2.5
              text-sm
              font-bold
              text-slate-700
              shadow-[0_6px_20px_rgba(15,23,42,0.06)]
              backdrop-blur
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-primary/30
              hover:text-primary
              hover:shadow-[0_10px_26px_rgba(15,23,42,0.10)]
            "
          >
            <ArrowLeft
              size={16}
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            />

            Back to Blogs
          </Link>

          {/* BADGE */}

          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-primary/15
              bg-primary/8
              px-4
              py-2
              text-xs
              font-black
              uppercase
              tracking-[0.14em]
              text-primary
            "
          >
            <Sparkles
              size={14}
            />

            Study Abroad Blog
          </div>

          {/* TITLE */}

          <h1
            className={`
              font-black
              leading-[1.14]
              tracking-[-0.025em]
              text-secondary
              text-3xl
              sm:text-4xl
              lg:text-[46px]
              xl:text-[52px]
              ${
                image
                  ? "max-w-3xl text-left"
                  : "max-w-3xl text-center"
              }
            `}
          >
            {title}
          </h1>

          {/* LINE */}

          <div
            className={`
              mt-6
              h-1.5
              w-24
              rounded-full
              bg-gradient-to-r
              from-primary
              to-secondary
              ${image ? "" : "mx-auto"}
            `}
          />

          {/* META */}

          <div
            className={`
              mt-7
              flex
              flex-wrap
              items-center
              gap-3
              ${image ? "" : "justify-center"}
            `}
          >
            {blog?.date && (
              <div
                className="
                  inline-flex
                  items-center
                  gap-2.5
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  font-bold
                  text-slate-600
                  shadow-sm
                "
              >
                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-primary/10
                    text-primary
                  "
                >
                  <CalendarDays
                    size={16}
                  />
                </span>

                <span>
                  {blog.date}
                </span>
              </div>
            )}

            {blog?.duration && (
              <div
                className="
                  inline-flex
                  items-center
                  gap-2.5
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  font-bold
                  text-slate-600
                  shadow-sm
                "
              >
                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-secondary/10
                    text-secondary
                  "
                >
                  <Clock3
                    size={16}
                  />
                </span>

                <span>
                  {blog.duration}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ===================================================
            RIGHT IMAGE (Only if image exists)
        =================================================== */}

        {image && (
          <div
            className="
              relative
              mx-auto
              w-full
              max-w-[720px]
            "
          >
            {/* GLOW */}

            <div
              aria-hidden="true"
              className="
                absolute
                -inset-4
                rounded-[38px]
                bg-gradient-to-br
                from-primary/15
                via-transparent
                to-secondary/15
                blur-2xl
              "
            />

            {/* DECORATION */}

            <div
              aria-hidden="true"
              className="
                absolute
                -right-5
                -top-5
                hidden
                h-20
                w-20
                rounded-3xl
                border
                border-white/70
                bg-white/60
                shadow-lg
                backdrop-blur-md
                lg:block
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute
                -bottom-6
                -left-6
                hidden
                h-24
                w-24
                rounded-[28px]
                bg-primary/10
                lg:block
              "
            />

            {/* IMAGE */}

            <div
              className="
                relative
                aspect-[16/10]
                overflow-hidden
                rounded-[32px]
                border
                border-white/80
                bg-slate-100
                shadow-[0_30px_80px_rgba(15,23,42,0.16)]
              "
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                unoptimized
                sizes="
                  (max-width: 1024px) 100vw,
                  55vw
                "
                className="
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-[1.02]
                "
              />

              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-slate-950/15
                  via-transparent
                  to-transparent
                "
              />

              <div
                aria-hidden="true"
                className="
                  absolute
                  left-0
                  top-0
                  h-24
                  w-full
                  bg-gradient-to-b
                  from-white/15
                  to-transparent
                "
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
