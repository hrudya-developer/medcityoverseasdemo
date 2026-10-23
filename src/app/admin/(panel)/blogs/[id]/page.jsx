import { notFound } from "next/navigation";

import { blogIsoDate, getBlog } from "@/lib/blogAdmin";
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
            <BlogForm
                id={blog.id}
                oldImageBase={imagePath("blog/")}
                initial={{
                    title: blog.title || "",
                    blog: blog.blog || "",
                    date: blogIsoDate(blog),
                    duration: blog.duration || "",
                    status: blog.status === "0" ? "0" : "1",
                    image: blog.image_land || blog.image_prt || "",
                    alt_text1: blog.alt_text1 || "",
                    link: blog.link || "",
                }}
            />
        </>
    );
}
