import {
    BookOpenText,
    CalendarDays,
    Clock3,
  } from "lucide-react";
  
  export default function BlogDetailsContent({
    blog,
  }) {
    if (!blog) {
      return null;
    }
  
    const content =
      blog?.blog || "";
  
    return (
      <section
        className="
          bg-white
          py-12
          sm:py-16
          lg:py-20
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              rounded-[30px]
              border
              border-slate-200
              bg-white
              p-6
              shadow-[0_15px_50px_rgba(15,23,42,0.06)]
              sm:p-8
              lg:p-10
            "
          >
            {/* META */}
  
            <div
              className="
                mb-8
                flex
                flex-wrap
                items-center
                gap-4
                border-b
                border-slate-100
                pb-6
              "
            >
              <div
                className="
                  grid
                  h-11
                  w-11
                  place-items-center
                  rounded-xl
                  bg-primary/10
                  text-primary
                "
              >
                <BookOpenText
                  size={21}
                />
              </div>
  
              <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-500">
                {blog?.date && (
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={16}
                      className="text-primary"
                    />
  
                    {blog.date}
                  </div>
                )}
  
                {blog?.duration && (
                  <div className="flex items-center gap-2">
                    <Clock3
                      size={16}
                      className="text-primary"
                    />
  
                    {blog.duration}
                  </div>
                )}
              </div>
            </div>
  
            {/* FULL CONTENT */}
  
            {content ? (
              <article
                className="
                  prose
                  prose-slate
                  max-w-none
  
                  prose-headings:font-black
                  prose-headings:text-secondary
  
                  prose-p:text-base
                  prose-p:leading-8
                  prose-p:text-slate-600
  
                  prose-a:font-bold
                  prose-a:text-primary
  
                  prose-strong:text-slate-900
  
                  prose-img:rounded-2xl
                "
                dangerouslySetInnerHTML={{
                  __html:
                    content,
                }}
              />
            ) : (
              <p className="text-slate-500">
                No blog content is available.
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }