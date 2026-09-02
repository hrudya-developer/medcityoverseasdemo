"use client";

import {
    BookOpen,
} from "lucide-react";

export default function UniversityCoursesEmpty({
    title =
        "No courses found",
    description =
        "No courses are currently available under this study area.",
}) {
    return (
        <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                <BookOpen className="size-7" />
            </div>

            <h3 className="mt-4 text-xl font-black text-darkPrimary">
                {
                    title
                }
            </h3>

            <p className="mx-auto mt-2 max-w-md leading-7 text-slate-500">
                {
                    description
                }
            </p>
        </div>
    );
}