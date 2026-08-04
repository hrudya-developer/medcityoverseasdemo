"use client";

import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    ArrowLeft,
    ArrowRight,
    ExternalLink,
    ImageOff,
} from "lucide-react";

import CommunityHero from "./components/CommunityHero";
import FAQ from "@/components/home/FAQ/FAQ";

const getPostId = (
    post,
    index
) =>
    post?.id ||
    post?.post_id ||
    `post-${index + 1}`;

const getPostTitle = (
    post,
    index
) => {
    const title =
        post?.title ||
        post?.post_title ||
        "";

    if (String(title).trim()) {
        return String(
            title
        ).trim();
    }

    const text = String(
        post?.post || ""
    )
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    if (text) {
        return text.length > 65
            ? `${text
                .slice(0, 65)
                .trim()}…`
            : text;
    }

    return `Community Update ${index + 1
        }`;
};

const getPostImage = (
    post,
    imagePath
) => {
    const imageName =
        post?.attach ||
        post?.image ||
        post?.thumbnail ||
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
        String(
            imagePath || ""
        ).replace(/\/+$/, "");

    const normalizedFile =
        normalizedImage.replace(
            /^\/+/,
            ""
        );

    if (!normalizedBasePath) {
        return "";
    }

    return `${normalizedBasePath}/${normalizedFile}`;
};

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

    useEffect(() => {
        const controller =
            new AbortController();

        const fetchPosts =
            async () => {
                try {
                    setLoading(true);
                    setError("");

                    const offset =
                        offsets[
                        currentPage - 1
                        ] ?? 0;

                    const params =
                        new URLSearchParams({
                            uid: "0",
                            offset:
                                String(
                                    offset
                                ),
                        });

                    const response =
                        await fetch(
                            `/api/community-posts?${params.toString()}`,
                            {
                                signal:
                                    controller.signal,
                                cache:
                                    "no-store",
                            }
                        );

                    const contentType =
                        response.headers.get(
                            "content-type"
                        );

                    if (
                        !contentType?.includes(
                            "application/json"
                        )
                    ) {
                        throw new Error(
                            "Community route returned a non-JSON response."
                        );
                    }

                    const result =
                        await response.json();

                    if (!response.ok) {
                        throw new Error(
                            result?.message ||
                            "Unable to load posts."
                        );
                    }

                    const receivedPosts =
                        Array.isArray(
                            result?.posts
                        )
                            ? result.posts
                            : [];

                    setPosts(
                        receivedPosts
                    );

                    setImagePath(
                        result?.imagePath ||
                        ""
                    );

                    const parsedOffset =
                        result?.nextOffset !==
                            null &&
                            result?.nextOffset !==
                            undefined &&
                            result?.nextOffset !==
                            ""
                            ? Number(
                                result.nextOffset
                            )
                            : null;

                    if (
                        Number.isFinite(
                            parsedOffset
                        )
                    ) {
                        setNextOffset(
                            parsedOffset
                        );

                        setOffsets(
                            (
                                previous
                            ) =>
                                previous.includes(
                                    parsedOffset
                                )
                                    ? previous
                                    : [
                                        ...previous,
                                        parsedOffset,
                                    ]
                        );
                    } else {
                        setNextOffset(
                            null
                        );
                    }

                    if (
                        receivedPosts.length ===
                        0
                    ) {
                        setError(
                            "No community posts are currently available."
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
                    setNextOffset(null);

                    setError(
                        requestError?.message ||
                        "Failed to load community posts."
                    );
                } finally {
                    if (
                        !controller.signal
                            .aborted
                    ) {
                        setLoading(
                            false
                        );
                    }
                }
            };

        fetchPosts();

        return () =>
            controller.abort();
    }, [
        currentPage,
        offsets,
    ]);

    const pageNumbers =
        useMemo(
            () =>
                offsets.map(
                    (_, index) =>
                        index + 1
                ),
            [offsets]
        );

    const changePage = (page) => {
        if (
            page < 1 ||
            page === currentPage
        ) {
            return;
        }

        setCurrentPage(page);

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

    const goPrevious = () => {
        if (currentPage > 1) {
            changePage(
                currentPage - 1
            );
        }
    };

    const goNext = () => {
        if (
            nextOffset !== null &&
            posts.length > 0
        ) {
            changePage(
                currentPage + 1
            );
        }
    };

    return (
        <main className="bg-[#f7f9fc]">
            <CommunityHero />

            <section
                ref={postsSectionRef}
                aria-labelledby="community-list-heading"
                className="
                    min-h-screen
                    scroll-mt-28
                    px-4 py-14
                    sm:px-6
                    lg:px-8
                    lg:py-20
                "
            >
                <div className="mx-auto max-w-7xl">
                    <header
                        className="
                            mx-auto mb-12
                            max-w-3xl
                            text-center
                        "
                    >
                        <p
                            className="
                                text-sm font-bold
                                uppercase
                                tracking-[0.18em]
                                text-primary
                            "
                        >
                            Community Updates
                        </p>

                        <h2
                            id="community-list-heading"
                            className="
                                mt-3 text-3xl
                                font-extrabold
                                text-secondary
                                md:text-4xl
                            "
                        >
                            Latest Stories and{" "}
                            <span className="text-primary">
                                Opportunities
                            </span>
                        </h2>

                        <p
                            className="
                                mx-auto mt-4
                                max-w-2xl
                                text-base
                                leading-7
                                text-slate-600
                            "
                        >
                            Read announcements,
                            opportunities and inspiring
                            updates from our student
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
                        posts.length >
                        0 && (
                            <>
                                <div
                                    className="
                                        grid
                                        items-start
                                        gap-6
                                        md:grid-cols-2
                                        xl:grid-cols-3
                                    "
                                >
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

    const postImage =
        getPostImage(
            post,
            imagePath
        );

    const hasText =
        Boolean(
            String(
                post?.post || ""
            ).trim()
        );

    const hasLink =
        Boolean(
            String(
                post?.link || ""
            ).trim()
        );

    return (
        <article
            className="
                group flex w-full
                flex-col overflow-hidden
                rounded-[22px]
                border border-slate-200
                bg-white p-4
                shadow-[0_10px_30px_rgba(15,23,42,0.08)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary/20
                hover:shadow-[0_20px_45px_rgba(192,31,83,0.14)]
            "
        >
            {postImage ? (
                <div
                    className="
                        relative flex w-full
                        items-center justify-center
                        overflow-hidden
                        rounded-[16px]
                        bg-slate-100
                    "
                >
                    <img
                        src={postImage}
                        alt={`${postTitle} community poster`}
                        width="800"
                        height="1000"
                        loading={
                            index === 0
                                ? "eager"
                                : "lazy"
                        }
                        fetchPriority={
                            index === 0
                                ? "high"
                                : "auto"
                        }
                        decoding="async"
                        className="
                            block h-auto
                            max-h-[620px]
                            w-full
                            object-contain
                            transition-transform
                            duration-500
                            group-hover:scale-[1.01]
                        "
                    />
                </div>
            ) : (
                <PostImageFallback />
            )}

            {(hasText ||
                hasLink) && (
                    <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                        <p
                            className="
                            text-xs font-bold
                            uppercase
                            tracking-[0.14em]
                            text-primary
                        "
                        >
                            Community Update
                        </p>

                        {hasText && (
                            <>
                                <h3
                                    className="
                                    mt-2 line-clamp-2
                                    text-lg
                                    font-extrabold
                                    leading-7
                                    text-slate-900
                                "
                                >
                                    {postTitle}
                                </h3>

                                <p
                                    className="
                                    mt-3 line-clamp-4
                                    whitespace-pre-line
                                    text-sm leading-6
                                    text-slate-600
                                "
                                >
                                    {post.post}
                                </p>
                            </>
                        )}

                        {hasLink && (
                            <a
                                href={
                                    post.link
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Read more about ${postTitle}`}
                                className="
                                mt-5
                                inline-flex
                                items-center
                                justify-between
                                gap-3
                                rounded-xl
                                bg-darkPrimary
                                px-4 py-3
                                text-sm font-bold
                                text-white
                                transition-all
                                hover:bg-primary
                            "
                            >
                                <span>
                                    Read More
                                </span>

                                <ExternalLink
                                    size={16}
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
        <div
            className="
                grid min-h-[320px]
                place-content-center
                rounded-[16px]
                bg-gradient-to-br
                from-pink-50
                to-slate-100
            "
        >
            <div
                className="
                    grid size-20
                    place-content-center
                    rounded-3xl
                    bg-white
                    text-primary
                    shadow-md
                "
            >
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
    onPrevious,
    onNext,
    onPageChange,
}) {
    return (
        <nav
            aria-label="Community posts pagination"
            className="
                mt-12 flex
                flex-wrap
                items-center
                justify-center
                gap-2
            "
        >
            <button
                type="button"
                onClick={onPrevious}
                disabled={
                    currentPage === 1
                }
                className="
                    inline-flex
                    items-center gap-2
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4 py-2.5
                    text-sm font-semibold
                    text-[#081c47]
                    shadow-sm
                    transition
                    hover:border-primary/30
                    hover:text-primary
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                "
            >
                <ArrowLeft
                    size={16}
                    aria-hidden="true"
                />

                Previous
            </button>

            {pages.map((page) => (
                <button
                    type="button"
                    key={page}
                    onClick={() =>
                        onPageChange(
                            page
                        )
                    }
                    aria-label={`Go to community posts page ${page}`}
                    aria-current={
                        currentPage ===
                            page
                            ? "page"
                            : undefined
                    }
                    className={`
                        grid size-10
                        place-content-center
                        rounded-xl
                        text-sm font-semibold
                        transition
                        ${currentPage ===
                            page
                            ? "bg-darkPrimary text-white shadow-lg shadow-primary/20"
                            : "border border-slate-200 bg-white text-[#081c47] hover:border-primary/30 hover:text-primary"
                        }
                    `}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                onClick={onNext}
                disabled={!canGoNext}
                className="
                    inline-flex
                    items-center gap-2
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4 py-2.5
                    text-sm font-semibold
                    text-[#081c47]
                    shadow-sm
                    transition
                    hover:border-primary/30
                    hover:text-primary
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                "
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
            className="
                mx-auto max-w-md
                rounded-3xl
                bg-white px-6
                py-16 text-center
                shadow-sm
            "
        >
            <div
                className="
                    mx-auto size-10
                    animate-spin
                    rounded-full
                    border-4
                    border-primary/20
                    border-t-primary
                "
            />

            <p className="mt-4 font-semibold text-slate-600">
                Loading community posts...
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
            className="
                mx-auto max-w-xl
                rounded-3xl
                border border-red-100
                bg-red-50
                px-6 py-14
                text-center
                font-semibold
                text-red-600
            "
        >
            {message}
        </div>
    );
}