import Link from "next/link";

import {
    ArrowLeft,
    BookOpen,
    Sparkles,
} from "lucide-react";

export default function CourseResultsHeader({
    courseCount,
    hasMore,
}) {
    return (
        <header
            className="
        relative overflow-hidden
        border-b border-primary/10
        bg-white
      "
        >
            <div
                aria-hidden="true"
                className="
          absolute -left-24 -top-24
          size-72 rounded-full
          bg-primary/10 blur-3xl
        "
            />

            <div
                aria-hidden="true"
                className="
          absolute -right-24 top-0
          size-72 rounded-full
          bg-secondary/10 blur-3xl
        "
            />

            <div
                className="
          relative mx-auto max-w-7xl
          px-4 py-12
          sm:px-6 sm:py-14
          lg:px-8
        "
            >
                <Link
                    href="/"
                    className="
            inline-flex items-center gap-2
            text-sm font-semibold
            text-slate-600
            transition
            hover:text-primary
          "
                >
                    <ArrowLeft size={16} />
                    Back to course search
                </Link>

                <div
                    className="
            mt-7 flex flex-col gap-5
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
                >
                    <div>
                        <div
                            className="
                inline-flex items-center gap-2
                rounded-full
                border border-primary/15
                bg-primary/5
                px-4 py-2
                text-xs font-extrabold
                uppercase tracking-[0.14em]
                text-primary
              "
                        >
                            <Sparkles size={15} />
                            Explore your options
                        </div>

                        <h1
                            className="
                mt-4 text-3xl font-black
                tracking-[-0.03em]
                text-darkPrimary
                sm:text-4xl lg:text-5xl
              "
                        >
                            Course Search{" "}
                            <span className="text-primary">
                                Results
                            </span>
                        </h1>

                        <p
                            className="
                mt-4 max-w-2xl
                text-sm leading-7
                text-slate-600
                sm:text-base
              "
                        >
                            Explore matching courses and
                            compare programs for your study
                            abroad journey.
                        </p>
                    </div>

                    {courseCount > 0 && (
                        <div
                            className="
                flex w-fit items-center gap-3
                rounded-2xl
                border border-slate-200
                bg-white px-5 py-4
                shadow-sm
              "
                        >
                            <span
                                className="
                  grid size-11
                  place-content-center
                  rounded-xl
                  bg-primary/10 text-primary
                "
                            >
                                <BookOpen size={22} />
                            </span>

                            <div>
                                <p className="text-2xl font-black text-darkPrimary">
                                    {courseCount}
                                    {hasMore ? "+" : ""}
                                </p>

                                <p className="text-xs font-semibold text-slate-500">
                                    Courses loaded
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}