import BlogCard from "./BlogCard";

export default function BlogGrid({
  blogs = [],
  imagePath = "",
}) {
  if (
    !Array.isArray(blogs) ||
    blogs.length === 0
  ) {
    return null;
  }

  return (
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
            key={
              blog?.id ||
              `blog-${index}`
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