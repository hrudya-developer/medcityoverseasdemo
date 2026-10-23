import { imagePath, today } from "@/lib/legacy/util";

import BlogForm from "../../../components/BlogForm";

export const dynamic = "force-dynamic";

export default function NewBlogPage() {
    return (
        <>
            <h1 className="text-2xl font-bold">New post</h1>
            <BlogForm initial={{ date: today(), status: "1" }} oldImageBase={imagePath("blog/")} />
        </>
    );
}
