"use client";

import FAQ from "@/components/home/FAQ/FAQ";

import BlogControls from "./components/BlogControls";
import BlogGrid from "./components/BlogGrid";
import useBlogs from "./hooks/useBlogs";
import BlogHeader from "./components/BlogHeader";
import BlogFAQ from "./components/BlogFAQ";
export default function StudyAbroadBlogClient() {
    const {
        blogs,
        visibleBlogs,
        imagePath,
        loading,
        error,
        hasMore,
        canShowLess,
        showMore,
        showLess,
    } = useBlogs();

    return (
        <main className="bg-white">
            <section className="relative mx-auto max-w-9xl overflow-hidden">
                <div className="relative">
                    <BlogHeader />

                    {loading && (
                        <p className="py-16 text-center font-semibold text-slate-600">
                            Loading blogs...
                        </p>
                    )}

                    {!loading &&
                        error && (
                            <p className="rounded-3xl bg-red-50 px-6 py-12 text-center font-semibold text-red-600">
                                {error}
                            </p>
                        )}

                    {!loading &&
                        !error &&
                        blogs.length ===
                        0 && (
                            <p className="rounded-3xl bg-white px-6 py-12 text-center font-semibold text-slate-500">
                                No blogs are
                                currently
                                available.
                            </p>
                        )}

                    {!loading &&
                        !error &&
                        blogs.length >
                        0 && (
                            <>
                                <BlogGrid
                                    blogs={
                                        visibleBlogs
                                    }
                                    imagePath={
                                        imagePath
                                    }
                                />

                                <BlogControls
                                    hasMore={
                                        hasMore
                                    }
                                    canShowLess={
                                        canShowLess
                                    }
                                    onShowMore={
                                        showMore
                                    }
                                    onShowLess={
                                        showLess
                                    }
                                />
                            </>
                        )}
                </div>
            </section>

            <BlogFAQ />
        </main>
    );
}