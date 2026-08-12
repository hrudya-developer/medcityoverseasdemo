"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Image from "next/image";

import cn from "@/lib/cn";

import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ImageOff,
} from "lucide-react";

import FAQ from "@/components/home/FAQ/FAQ";

import CommunityHero from "./components/CommunityHero";

function getPostId(post, index) {
  return (
    post?.id ||
    post?.post_id ||
    post?._id ||
    `post-${index + 1}`
  );
}

function getPlainText(value) {
  return String(value || "")
    .replace(
      /<script[^>]*>[\s\S]*?<\/script>/gi,
      " "
    )
    .replace(
      /<style[^>]*>[\s\S]*?<\/style>/gi,
      " "
    )
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function getPostText(post) {
  return getPlainText(
    post?.post ||
    post?.description ||
    post?.content ||
    ""
  );
}

function getPostTitle(post, index) {
  const title =
    post?.title ||
    post?.post_title ||
    "";

  if (String(title).trim()) {
    return getPlainText(title);
  }

  const postText = getPostText(post);

  if (postText) {
    return postText.length > 65
      ? `${postText
        .slice(0, 65)
        .trim()}…`
      : postText;
  }

  return `Community Update ${index + 1}`;
}

function getPostImage(
  post,
  imagePath
) {
  const imageName =
    post?.attach ||
    post?.image ||
    post?.thumbnail ||
    post?.featured_image ||
    "";

  if (!imageName) {
    return "";
  }

  const normalizedImage =
    String(imageName).trim();

  if (
    normalizedImage.startsWith(
      "http://"
    ) ||
    normalizedImage.startsWith(
      "https://"
    )
  ) {
    return normalizedImage;
  }

  const normalizedBasePath =
    String(imagePath || "").replace(
      /\/+$/,
      ""
    );

  const normalizedFile =
    normalizedImage.replace(
      /^\/+/,
      ""
    );

  if (!normalizedBasePath) {
    return "";
  }

  return `${normalizedBasePath}/${normalizedFile}`;
}

function getPublishedDate(post) {
  const value =
    post?.published_at ||
    post?.publishedAt ||
    post?.created_at ||
    post?.createdAt ||
    post?.date ||
    "";

  if (!value) {
    return null;
  }

  const date = new Date(value);

  return Number.isNaN(
    date.getTime()
  )
    ? null
    : date;
}

function formatDate(date) {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(date);
}

function parseNextOffset(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const parsedValue =
    Number(value);

  return Number.isFinite(
    parsedValue
  )
    ? parsedValue
    : null;
}

export default function CommunityPostsClient() {
  const [posts, setPosts] =
    useState([]);

  const [
    imagePath,
    setImagePath,
  ] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const [offsets, setOffsets] =
    useState([0]);

  const [
    nextOffset,
    setNextOffset,
  ] = useState(null);

  const postsSectionRef =
    useRef(null);

  const pageNumbers =
    useMemo(
      () =>
        offsets
          .map(
            (
              offset,
              index
            ) =>
              offset !==
                undefined
                ? index +
                1
                : null
          )
          .filter(Boolean),
      [offsets]
    );

  useEffect(() => {
    const offset =
      offsets[
      currentPage - 1
      ];

    if (
      offset === null ||
      offset === undefined
    ) {
      setPosts([]);
      setLoading(false);
      setError(
        "This community posts page is not available."
      );

      return undefined;
    }

    const controller =
      new AbortController();

    const fetchPosts =
      async () => {
        try {
          setLoading(true);
          setError("");

          const params =
            new URLSearchParams(
              {
                uid: "0",
                offset:
                  String(
                    offset
                  ),
              }
            );

          const response =
            await fetch(
              `/api/community-posts?${params.toString()}`,
              {
                method:
                  "GET",
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

          const contentType =
            response.headers.get(
              "content-type"
            ) || "";

          if (
            !contentType.includes(
              "application/json"
            )
          ) {
            throw new Error(
              "The community posts service returned an invalid response."
            );
          }

          const result =
            await response.json();

          if (
            !response.ok
          ) {
            throw new Error(
              result?.message ||
              "Unable to load community posts."
            );
          }

          const receivedPosts =
            Array.isArray(
              result?.posts
            )
              ? result.posts
              : [];

          const receivedImagePath =
            typeof result?.imagePath ===
              "string"
              ? result.imagePath
              : "";

          const receivedNextOffset =
            parseNextOffset(
              result?.nextOffset
            );

          setPosts(
            receivedPosts
          );

          setImagePath(
            receivedImagePath
          );

          setNextOffset(
            receivedNextOffset
          );

          if (
            receivedNextOffset !==
            null
          ) {
            setOffsets(
              (
                previous
              ) => {
                const nextPageIndex =
                  currentPage;

                if (
                  previous[
                  nextPageIndex
                  ] ===
                  receivedNextOffset
                ) {
                  return previous;
                }

                const updatedOffsets =
                  [
                    ...previous,
                  ];

                updatedOffsets[
                  nextPageIndex
                ] =
                  receivedNextOffset;

                return updatedOffsets;
              }
            );
          }

          if (
            receivedPosts.length ===
            0
          ) {
            setError(
              "No community posts are available on this page."
            );
          }
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
            "Community posts request failed:",
            requestError
          );

          setPosts([]);
          setNextOffset(
            null
          );

          setError(
            requestError?.message ||
            "Failed to load community posts."
          );
        } finally {
          if (
            !controller
              .signal
              .aborted
          ) {
            setLoading(
              false
            );
          }
        }
      };

    void fetchPosts();

    return () => {
      controller.abort();
    };
  }, [
    currentPage,
    offsets,
  ]);

  const scrollToPosts = () => {
    window.setTimeout(() => {
      postsSectionRef.current?.scrollIntoView(
        {
          behavior:
            "smooth",
          block: "start",
        }
      );
    }, 50);
  };

  const changePage = (page) => {
    if (
      page < 1 ||
      page === currentPage ||
      loading
    ) {
      return;
    }

    if (
      page > 1 &&
      offsets[page - 1] ===
      undefined
    ) {
      return;
    }

    setCurrentPage(page);
    scrollToPosts();
  };

  const goPrevious = () => {
    if (
      currentPage > 1 &&
      !loading
    ) {
      changePage(
        currentPage - 1
      );
    }
  };

  const goNext = () => {
    if (
      nextOffset === null ||
      posts.length === 0 ||
      loading
    ) {
      return;
    }

    const nextPage =
      currentPage + 1;

    setOffsets(
      (previous) => {
        const updatedOffsets =
          [...previous];

        updatedOffsets[
          nextPage - 1
        ] = nextOffset;

        return updatedOffsets;
      }
    );

    setCurrentPage(nextPage);
    scrollToPosts();
  };

  return (
    <main className="bg-[#f7f9fc]">
      <CommunityHero />

      <section
        ref={postsSectionRef}
        aria-labelledby="community-list-heading"
        className="min-h-screen scroll-mt-28 px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <header className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Community
              Updates
            </p>

            <h1
              id="community-list-heading"
              className="mt-3 text-3xl font-extrabold text-secondary md:text-4xl"
            >
              Latest Stories
              and{" "}
              <span className="text-primary">
                Opportunities
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Read
              announcements,
              opportunities and
              inspiring updates
              from our student
              community.
            </p>
          </header>

          {loading && (
            <LoadingState />
          )}

          {!loading &&
            error && (
              <ErrorState
                message={
                  error
                }
              />
            )}

          {!loading &&
            !error &&
            posts.length ===
            0 && (
              <EmptyState />
            )}

          {!loading &&
            !error &&
            posts.length >
            0 && (
              <>
                <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {posts.map(
                    (
                      post,
                      index
                    ) => (
                      <CommunityPostCard
                        key={getPostId(
                          post,
                          index
                        )}
                        post={
                          post
                        }
                        index={
                          index
                        }
                        imagePath={
                          imagePath
                        }
                      />
                    )
                  )}
                </div>

                <CommunityPagination
                  currentPage={
                    currentPage
                  }
                  pages={
                    pageNumbers
                  }
                  canGoNext={
                    nextOffset !==
                    null &&
                    posts.length >
                    0
                  }
                  loading={
                    loading
                  }
                  onPrevious={
                    goPrevious
                  }
                  onNext={
                    goNext
                  }
                  onPageChange={
                    changePage
                  }
                />
              </>
            )}
        </div>
      </section>

      <FAQ />
    </main>
  );
}

function CommunityPostCard({
  post,
  index,
  imagePath,
}) {
  const postTitle =
    getPostTitle(
      post,
      index
    );

  const postText =
    getPostText(post);

  const postImage =
    getPostImage(
      post,
      imagePath
    );

  const postLink =
    String(
      post?.link ||
      post?.url ||
      ""
    ).trim();

  const publishedDate =
    getPublishedDate(post);

  const hasText =
    Boolean(postText);

  const hasLink =
    Boolean(postLink);

  return (
    <article
      id={`community-post-${getPostId(
        post,
        index
      )}`}
      itemScope
      itemType="https://schema.org/SocialMediaPosting"
      className="group flex w-full flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_20px_45px_rgba(192,31,83,0.14)]"
    >
      {postImage ? (
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px] bg-slate-100">
          <Image
            itemProp="image"
            src={postImage}
            alt={`${postTitle} community update`}
            fill
            priority={
              index === 0
            }
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-contain transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </div>
      ) : (
        <PostImageFallback />
      )}

      {(hasText ||
        hasLink ||
        publishedDate) && (
          <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Community
              Update
            </p>

            {publishedDate && (
              <time
                itemProp="datePublished"
                dateTime={publishedDate.toISOString()}
                className="mt-2 text-xs font-semibold text-slate-500"
              >
                {formatDate(
                  publishedDate
                )}
              </time>
            )}

            {hasText && (
              <>
                <h2
                  itemProp="headline"
                  className="mt-2 line-clamp-2 text-lg font-extrabold leading-7 text-slate-900"
                >
                  {
                    postTitle
                  }
                </h2>

                <p
                  itemProp="articleBody"
                  className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600"
                >
                  {
                    postText
                  }
                </p>
              </>
            )}

            {hasLink && (
              <a
                itemProp="url"
                href={
                  postLink
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read more about ${postTitle}`}
                className="mt-5 inline-flex items-center justify-between gap-3 rounded-xl bg-darkPrimary px-4 py-3 text-sm font-bold text-white transition-all hover:bg-primary"
              >
                <span>
                  Read More
                </span>

                <ExternalLink
                  size={
                    16
                  }
                  aria-hidden="true"
                />
              </a>
            )}
          </div>
        )}
    </article>
  );
}

function PostImageFallback() {
  return (
    <div className="grid min-h-[320px] place-content-center rounded-[16px] bg-gradient-to-br from-pink-50 to-slate-100">
      <div className="grid size-20 place-content-center rounded-3xl bg-white text-primary shadow-md">
        <ImageOff
          size={34}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function CommunityPagination({
  currentPage,
  pages,
  canGoNext,
  loading,
  onPrevious,
  onNext,
  onPageChange,
}) {
  return (
    <nav
      aria-label="Community posts pagination"
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={
          currentPage ===
          1 ||
          loading
        }
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#081c47] shadow-sm transition hover:border-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowLeft
          size={16}
          aria-hidden="true"
        />

        Previous
      </button>

      {pages.map(
        (page) => (
          <button
            type="button"
            key={
              page
            }
            onClick={() =>
              onPageChange(
                page
              )
            }
            disabled={
              loading
            }
            aria-label={`Go to community posts page ${page}`}
            aria-current={
              currentPage ===
                page
                ? "page"
                : undefined
            }
            className={cn(`grid size-10 place-content-center rounded-xl text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${currentPage ===
                page
                ? "bg-darkPrimary text-white shadow-lg shadow-primary/20"
                : "border border-slate-200 bg-white text-[#081c47] hover:border-primary/30 hover:text-primary"
              }`)}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        onClick={onNext}
        disabled={
          !canGoNext ||
          loading
        }
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#081c47] shadow-sm transition hover:border-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next

        <ArrowRight
          size={16}
          aria-hidden="true"
        />
      </button>
    </nav>
  );
}

function LoadingState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto max-w-md rounded-3xl bg-white px-6 py-16 text-center shadow-sm"
    >
      <div
        aria-hidden="true"
        className="mx-auto size-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary"
      />

      <p className="mt-4 font-semibold text-slate-600">
        Loading community
        posts...
      </p>
    </div>
  );
}

function ErrorState({
  message,
}) {
  return (
    <div
      role="alert"
      className="mx-auto max-w-xl rounded-3xl border border-red-100 bg-red-50 px-6 py-14 text-center font-semibold text-red-600"
    >
      {message}
    </div>
  );
}

function EmptyState() {
  return (
    <div
      role="status"
      className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center font-semibold text-slate-500"
    >
      No community posts are
      currently available.
    </div>
  );
}