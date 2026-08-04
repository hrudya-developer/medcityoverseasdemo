"use client";

import {
    useEffect,
    useState,
} from "react";

import Image from "next/image";

import {
    ArrowRight,
    ImageOff,
} from "lucide-react";

import { GrBlog } from "react-icons/gr";

import FAQ from "@/components/home/FAQ/FAQ";

const FALLBACK_IMAGE =
    "/images/blog-placeholder.webp";

const getBlogId = (
    blog,
    index
) =>
    blog?.id ||
    blog?.blog_id ||
    `blog-${index + 1}`;

const getBlogTitle = (
    blog,
    index
) =>
    blog?.title ||
    blog?.blog_title ||
    `Study Abroad Blog ${index + 1
    }`;

const getBlogImage = (
    blog,
    imagePath
) => {
    const imageName =
        blog?.image ||
        blog?.thumbnail ||
        blog?.featured_image ||
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
        ).replace(/\/+$/, "");

    const filePath =
        imageValue.replace(
            /^\/+/,
            ""
        );

    return basePath
        ? `${basePath}/${filePath}`
        : "";
};

export default function StudyAbroadBlogClient() {
    const [blogs, setBlogs] =
        useState([]);

    const [
        imagePath,
        setImagePath,
    ] = useState("");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        const controller =
            new AbortController();

        const fetchBlogs =
            async () => {
                try {
                    setLoading(true);
                    setError("");

                    const response =
                        await fetch(
                            "/api/blogs?uid=0",
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
                            "Blog route returned a non-JSON response."
                        );
                    }

                    const result =
                        await response.json();

                    if (!response.ok) {
                        throw new Error(
                            result?.message ||
                            "Unable to load blogs."
                        );
                    }

                    setBlogs(
                        Array.isArray(
                            result?.blogs
                        )
                            ? result.blogs
                            : []
                    );

                    setImagePath(
                        result?.imagePath ||
                        ""
                    );
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
                        "Blog request failed:",
                        requestError
                    );

                    setError(
                        requestError?.message ||
                        "Unable to load blogs at the moment."
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

        fetchBlogs();

        return () =>
            controller.abort();
    }, []);

    return (
        <main className="bg-white">
            <section
                aria-labelledby="study-abroad-blog-heading"
                className="
                    relative mx-auto
                    max-w-7xl
                    overflow-hidden
                    bg-[url('/assets/mapBg.png')]
                    bg-right-top
                    bg-no-repeat
                    px-4 py-14
                    md:px-10
                    lg:px-20
                    lg:py-20
                "
            >
                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute -left-24
                        top-20 size-72
                        rounded-full
                        bg-primary/10
                        blur-3xl
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute -right-24
                        bottom-20 size-72
                        rounded-full
                        bg-secondary/10
                        blur-3xl
                    "
                />

                <div className="relative">
                    <BlogHeader />

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
                        blogs.length ===
                        0 && (
                            <EmptyState />
                        )}

                    {!loading &&
                        !error &&
                        blogs.length >
                        0 && (
                            <div
                                className="
                                    grid
                                    items-stretch
                                    gap-7
                                    sm:grid-cols-2
                                    lg:grid-cols-3
                                "
                            >
                                {blogs.map(
                                    (
                                        blog,
                                        index
                                    ) => (
                                        <BlogCard
                                            key={getBlogId(
                                                blog,
                                                index
                                            )}
                                            blog={
                                                blog
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
                        )}
                </div>

                <div className="mt-16">
                    <FAQ />
                </div>
            </section>
        </main>
    );
}

function BlogHeader() {
    return (
        <header
            className="
                mx-auto mb-12
                max-w-3xl
                text-center
            "
        >
            <span
                aria-hidden="true"
                className="
                    mx-auto grid size-16
                    place-content-center
                    rounded-full
                    bg-red-50
                    text-primary
                    shadow-xl
                "
            >
                <GrBlog className="size-8" />
            </span>

            <p
                className="
                    mt-6 text-sm
                    font-extrabold
                    uppercase
                    tracking-[0.18em]
                    text-primary
                "
            >
                Stay Updated
            </p>

            <h1
                id="study-abroad-blog-heading"
                className="
                    mt-3 text-4xl
                    font-extrabold
                    leading-tight
                    text-secondary
                    md:text-5xl
                "
            >
                Latest{" "}
                <span className="text-primary">
                    Study Abroad Blogs
                </span>
            </h1>

            <div
                aria-hidden="true"
                className="
                    mt-6 flex
                    justify-center gap-2
                "
            >
                <span className="h-1 w-14 rounded-full bg-primary" />
                <span className="h-1 w-14 rounded-full bg-secondary" />
            </div>

            <p
                className="
                    mx-auto mt-6
                    max-w-3xl
                    text-base leading-8
                    text-slate-600
                    md:text-lg
                "
            >
                Stay informed with expert advice,
                visa guidance, scholarship updates,
                student experiences and
                destination-specific insights for
                your international education
                journey.
            </p>
        </header>
    );
}

function BlogCard({
    blog,
    index,
    imagePath,
}) {
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

    return (
        <article
            itemScope
            itemType="https://schema.org/BlogPosting"
            className="
                group flex h-full
                flex-col overflow-hidden
                rounded-[26px]
                border border-slate-200/80
                bg-white
                shadow-[0_12px_38px_rgba(15,23,42,0.08)]
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-primary/20
                hover:shadow-[0_24px_55px_rgba(192,31,83,0.14)]
            "
        >
            {image ? (
                <div
                    className="
                        relative h-56
                        overflow-hidden
                        bg-slate-100
                    "
                >
                    <Image
                        itemProp="image"
                        src={image}
                        alt={`${title} study abroad blog`}
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
                <BlogImageFallback />
            )}

            <div
                className="
                    flex flex-1
                    flex-col p-6
                "
            >
                {blog?.date && (
                    <time
                        itemProp="datePublished"
                        dateTime={
                            blog.date
                        }
                        className="
                            text-sm
                            font-semibold
                            text-primary
                        "
                    >
                        {blog.date}
                    </time>
                )}

                <h2
                    itemProp="headline"
                    className="
                        mt-2 line-clamp-2
                        text-xl
                        font-extrabold
                        leading-7
                        text-secondary
                    "
                >
                    {title}
                </h2>

                {blog?.description && (
                    <p
                        itemProp="description"
                        className="
                            mt-3 line-clamp-3
                            text-sm leading-7
                            text-slate-600
                        "
                    >
                        {
                            blog.description
                        }
                    </p>
                )}

                {blog?.link && (
                    <a
                        href={blog.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Read ${title}`}
                        className="
                            group/button
                            mt-auto
                            inline-flex
                            items-center
                            justify-between
                            gap-3 pt-6
                            text-sm font-bold
                            text-primary
                            transition
                            hover:text-darkPrimary
                        "
                    >
                        Read Article

                        <ArrowRight
                            size={17}
                            aria-hidden="true"
                            className="
                                transition-transform
                                group-hover/button:translate-x-1
                            "
                        />
                    </a>
                )}
            </div>
        </article>
    );
}

function BlogImageFallback() {
    return (
        <div
            className="
                grid h-56
                place-content-center
                bg-gradient-to-br
                from-pink-50
                to-slate-100
            "
        >
            <ImageOff
                size={36}
                className="text-primary"
                aria-hidden="true"
            />
        </div>
    );
}

function LoadingState() {
    return (
        <div
            role="status"
            aria-live="polite"
            className="
                py-16 text-center
                font-semibold
                text-slate-600
            "
        >
            Loading blogs...
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
                rounded-3xl
                border border-red-100
                bg-red-50
                px-6 py-12
                text-center
                font-semibold
                text-red-600
            "
        >
            {message}
        </div>
    );
}

function EmptyState() {
    return (
        <div
            className="
                rounded-3xl
                border border-slate-200
                bg-white
                px-6 py-12
                text-center
                font-semibold
                text-slate-500
            "
        >
            No blogs are currently available.
        </div>
    );
}