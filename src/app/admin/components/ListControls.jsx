import Link from "next/link";

import { PAGE_SIZE } from "@/lib/adminLists";

/** Search box and previous/next links for the admin lists. */
export default function ListControls({ basePath, page, total, q, placeholder }) {
    const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    const href = (target) => {
        const params = new URLSearchParams();

        if (q) {
            params.set("q", q);
        }

        if (target > 1) {
            params.set("page", String(target));
        }

        const text = params.toString();

        return text ? `${basePath}?${text}` : basePath;
    };

    return (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <form action={basePath} className="flex gap-2">
                <input
                    type="search"
                    name="q"
                    defaultValue={q}
                    placeholder={placeholder}
                    className="w-64 max-w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                />
                <button type="submit" className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white">
                    Search
                </button>
            </form>

            <div className="flex items-center gap-3 text-sm text-slate-600">
                <span>
                    {total} in total, page {page} of {pages}
                </span>
                {page > 1 && (
                    <Link href={href(page - 1)} className="font-semibold text-blue-700">
                        Previous
                    </Link>
                )}
                {page < pages && (
                    <Link href={href(page + 1)} className="font-semibold text-blue-700">
                        Next
                    </Link>
                )}
            </div>
        </div>
    );
}
