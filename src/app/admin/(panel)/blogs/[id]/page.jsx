import { notFound } from "next/navigation";

import { blogForEditor, getBlog } from "@/lib/blogAdmin";
import { imagePath } from "@/lib/legacy/util";

import BlogForm from "../../../components/BlogForm";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({ params }) {
    const { id } = await params;
    const blog = await getBlog(id);

    if (!blog) {
        notFound();
    }

    return (
        <>
            <h1 className="text-2xl font-bold">Edit post</h1>
            <BlogForm id={blog.id} oldImageBase={imagePath("blog/")} initial={blogForEditor(blog)} />
        </>
    );
}
