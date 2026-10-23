import Link from "next/link";

import { listBlogs } from "@/lib/blogAdmin";
import { blogPublicSlug } from "@/lib/blogSlug";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage({ searchParams }) {
    const { saved, deleted } = await searchParams;
    const blogs = await listBlogs();

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-2xl font-bold">Blog posts</h1>

                <Link
                    href="/admin/blogs/new"
                    className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white"
                >
                    New post
                </Link>
            </div>

            {saved && <p className="mt-4 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-800">Saved.</p>}
            {deleted && <p className="mt-4 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-800">Deleted.</p>}

            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                        <tr>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>

                    <tbody>
                        {blogs.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-6 text-slate-500">
                                    No posts yet.
                                </td>
                            </tr>
                        )}

                        {blogs.map((blog) => {
                            const isDraft = blog.status === "0";

                            return (
                                <tr key={blog.id} className="border-t border-slate-100">
                                    <td className="px-4 py-3 font-semibold">{blog.title}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">{blog.date}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                isDraft ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                                            }`}
                                        >
                                            {isDraft ? "Draft" : "Published"}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 text-right">
                                        {!isDraft && (
                                            <a
                                                href={`/blog-details/${blogPublicSlug(blog)}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="mr-4 text-slate-500 hover:text-slate-900"
                                            >
                                                View
                                            </a>
                                        )}
                                        <Link href={`/admin/blogs/${blog.id}`} className="font-semibold text-blue-700">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
