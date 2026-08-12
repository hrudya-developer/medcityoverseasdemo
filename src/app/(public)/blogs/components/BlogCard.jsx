import Image from "next/image";

import {
    ArrowRight,
    ImageOff,
} from "lucide-react";

const getBlogTitle = (
    blog,
    index
) =>
    blog?.title ||
    blog?.blog_title ||
    `Study Abroad Blog ${index + 1}`;

const getBlogDescription = (
    blog
) =>
    blog?.description ||
    blog?.excerpt ||
    blog?.summary ||
    blog?.blog ||
    "";

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
        String(imageName).trim();

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

export default function BlogCard({
    blog,
    index,
    imagePath,
}) {
    const title =
        getBlogTitle(
            blog,
            index
        );

    const description =
        getBlogDescription(blog);

    const image =
        getBlogImage(
            blog,
            imagePath
        );

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_12px_38px_rgba(15,23,42,0.08)]">
            {image ? (
                <div className="relative h-56 overflow-hidden bg-slate-100">
                    <Image
                        src={image}
                        alt={`${title} study abroad blog`}
                        fill
                        priority={
                            index === 0
                        }
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
            ) : (
                <div className="grid h-56 place-content-center bg-gradient-to-br from-pink-50 to-slate-100">
                    <ImageOff
                        size={36}
                        className="text-primary"
                    />
                </div>
            )}

            <div className="flex flex-1 flex-col p-6">
                {blog?.date && (
                    <time className="text-sm font-semibold text-primary">
                        {blog.date}
                    </time>
                )}

                <h2 className="mt-2 line-clamp-2 text-xl font-extrabold leading-7 text-secondary">
                    {title}
                </h2>

                {description && (
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                        {description}
                    </p>
                )}

                {blog?.link && (
                    <a
                        href={blog.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center justify-between gap-3 pt-6 text-sm font-bold text-primary"
                    >
                        Read Article

                        <ArrowRight
                            size={17}
                        />
                    </a>
                )}
            </div>
        </article>
    );
}