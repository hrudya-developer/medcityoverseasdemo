"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

const INITIAL_VISIBLE = 6;
const LOAD_COUNT = 3;

export default function useBlogs() {
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

    const [
        visibleCount,
        setVisibleCount,
    ] = useState(INITIAL_VISIBLE);

    useEffect(() => {
        const controller =
            new AbortController();

        async function fetchBlogs() {
            try {
                setLoading(true);
                setError("");

                const response =
                    await fetch(
                        "/api/blogs?uid=0",
                        {
                            method: "GET",
                            cache: "no-store",
                            signal:
                                controller.signal,
                            headers: {
                                Accept:
                                    "application/json",
                            },
                        }
                    );

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
                    typeof result?.imagePath ===
                        "string"
                        ? result.imagePath
                        : ""
                );

                setVisibleCount(
                    INITIAL_VISIBLE
                );
            } catch (requestError) {
                if (
                    requestError?.name ===
                    "AbortError"
                ) {
                    return;
                }

                setError(
                    requestError?.message ||
                    "Unable to load blogs."
                );
            } finally {
                if (
                    !controller.signal
                        .aborted
                ) {
                    setLoading(false);
                }
            }
        }

        void fetchBlogs();

        return () => {
            controller.abort();
        };
    }, []);

    const visibleBlogs = useMemo(
        () =>
            blogs.slice(
                0,
                visibleCount
            ),
        [
            blogs,
            visibleCount,
        ]
    );

    const hasMore =
        visibleCount < blogs.length;

    const canShowLess =
        visibleCount >
        INITIAL_VISIBLE;

    const showMore = () => {
        setVisibleCount(
            (current) =>
                Math.min(
                    current +
                    LOAD_COUNT,
                    blogs.length
                )
        );
    };

    const showLess = () => {
        setVisibleCount(
            (current) =>
                Math.max(
                    current -
                    LOAD_COUNT,
                    INITIAL_VISIBLE
                )
        );
    };

    return {
        blogs,
        visibleBlogs,
        imagePath,
        loading,
        error,
        hasMore,
        canShowLess,
        showMore,
        showLess,
    };
}