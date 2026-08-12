import BlogCard from "./BlogCard";

export default function BlogGrid({
    blogs,
    imagePath,
}) {
    return (
        <div className="grid items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map(
                (blog, index) => (
                    <BlogCard
                        key={
                            blog?.id ||
                            blog?.blog_id ||
                            `blog-${index + 1}`
                        }
                        blog={blog}
                        index={index}
                        imagePath={
                            imagePath
                        }
                    />
                )
            )}
        </div>
    );
}