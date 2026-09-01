"use client";

import {
    Search,
    X,
} from "lucide-react";

export default function DestinationSearch({
    value = "",
    onChange,
    onClear,
    resultCount = 0,
}) {
    return (
        <div className="mx-auto mt-10 w-full max-w-2xl">
            <div
                className="
                    flex
                    min-h-[64px]
                    items-center
                    gap-3
                    rounded-[24px]
                    border
                    border-slate-200
                    bg-white
                    p-2
                    shadow-[0_14px_40px_rgba(15,23,42,0.08)]
                    transition-all
                    duration-300
                    focus-within:border-primary/30
                    focus-within:shadow-[0_20px_55px_rgba(192,31,83,0.12)]
                "
            >
                <span
                    className="
                        grid
                        size-12
                        shrink-0
                        place-items-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-primary
                        to-darkPrimary
                        text-white
                        shadow-lg
                        shadow-primary/20
                    "
                >
                    <Search
                        size={19}
                        aria-hidden="true"
                    />
                </span>

                <div className="min-w-0 flex-1">
                    <label
                        htmlFor="destination-search"
                        className="
                            block
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.15em]
                            text-primary
                        "
                    >
                        Search Destinations
                    </label>

                    <input
                        id="destination-search"
                        type="search"
                        value={value}
                        onChange={onChange}
                        autoComplete="off"
                        placeholder="Search Germany, UK, Australia..."
                        className="
                            mt-1
                            w-full
                            bg-transparent
                            text-sm
                            font-semibold
                            text-slate-800
                            outline-none
                            placeholder:font-normal
                            placeholder:text-slate-400
                            sm:text-base
                        "
                    />
                </div>

                {value && (
                    <button
                        type="button"
                        onClick={onClear}
                        aria-label="Clear destination search"
                        className="
                            grid
                            size-10
                            shrink-0
                            place-items-center
                            rounded-full
                            text-slate-400
                            transition
                            hover:bg-primary/5
                            hover:text-primary
                        "
                    >
                        <X
                            size={17}
                            aria-hidden="true"
                        />
                    </button>
                )}
            </div>

            {value.trim() && (
                <p className="mt-3 text-center text-xs font-semibold text-slate-400">
                    {resultCount}{" "}
                    {resultCount === 1
                        ? "destination"
                        : "destinations"}{" "}
                    found
                </p>
            )}
        </div>
    );
}