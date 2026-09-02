"use client";

import {
    LoaderCircle,
} from "lucide-react";

export default function UniversityCoursesLoading({
    compact = false,
}) {
    if (compact) {
        return (
            <div className="mb-4 flex items-center gap-2 text-xs font-bold text-slate-400">
                <LoaderCircle className="size-3.5 animate-spin" />

                Updating courses...
            </div>
        );
    }

    return (
        <div className="grid min-h-[360px] place-items-center rounded-[28px] border border-slate-200 bg-white">
            <div className="text-center">
                <LoaderCircle className="mx-auto size-9 animate-spin text-primary" />

                <p className="mt-4 text-sm font-bold text-slate-500">
                    Loading courses...
                </p>
            </div>
        </div>
    );
}