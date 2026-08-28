"use client";

import {
    Building2,
    Search,
} from "lucide-react";

const UniversitiesHeader = ({
    countryName = "",
    universityCount = 0,
    searchTerm = "",
    onSearchChange,
}) => {
    return (
        <div
            className="flex flex-col gap-5 border-b border-slate-200 px-5 py-6 sm:px-7 lg:flex-row lg:items-center lg:justify-between"
        >
            <div>
                <div
                    className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-primary"
                >
                    <Building2
                        aria-hidden="true"
                        className="h-4 w-4"
                    />

                    Partner Universities
                </div>

                <h1
                    className="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-4xl"
                >
                    Universities in{" "}

                    <span className="text-primary">
                        {countryName ||
                            "your selected country"}
                    </span>
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                    {universityCount}{" "}
                    {universityCount === 1
                        ? "university"
                        : "universities"}{" "}
                    available
                </p>
            </div>

            <label className="relative block w-full lg:max-w-[360px]">
                <span className="sr-only">
                    Search universities
                </span>

                <Search
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                />

                <input
                    type="search"
                    value={searchTerm}
                    onChange={onSearchChange}
                    placeholder="Search universities"
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
            </label>
        </div>
    );
};

export default UniversitiesHeader;