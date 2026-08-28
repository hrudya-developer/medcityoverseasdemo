"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  BookOpen,
  Landmark,
  Search,
  X,
} from "lucide-react";

import {
  useLazySearchSuggestionsQuery,
} from "@/lib/services/searchApi";

export default function CourseHero({
  keyword,
  setKeyword,
  onSearch,
  onSuggestionSelect,
  onClear,
  loading,
}) {
  const [
    suggestions,
    setSuggestions,
  ] = useState([]);

  const [
    open,
    setOpen,
  ] = useState(false);

  const ref =
    useRef(null);

  const [
    loadSuggestions,
    {
      isFetching:
        suggestionsLoading,
    },
  ] =
    useLazySearchSuggestionsQuery();

  useEffect(() => {
    const value =
      keyword.trim();

    if (
      value.length < 2
    ) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    const timer =
      setTimeout(
        async () => {
          try {
            const result =
              await loadSuggestions(
                value
              ).unwrap();

            setSuggestions(
              result
            );

            setOpen(true);
          } catch {
            setSuggestions(
              []
            );
          }
        },
        500
      );

    return () =>
      clearTimeout(timer);
  }, [
    keyword,
    loadSuggestions,
  ]);

  useEffect(() => {
    function close(
      event
    ) {
      if (
        ref.current &&
        !ref.current.contains(
          event.target
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      close
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        close
      );
  }, []);

  const submit = (
    event
  ) => {
    event.preventDefault();

    setOpen(false);

    onSearch();
  };

  return (
    <div className="relative z-30 rounded-[28px] border border-slate-100 shadow-sm">
      {/* CLIPPED HERO BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#fff1f5] via-white to-[#eef7ff]" />
  
        {/* GRID PATTERN */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" />
  
        {/* GLOWS */}
        <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#c01f53]/10 blur-3xl" />
  
        <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[#0466AF]/10 blur-3xl" />
      </div>
  
      {/* CONTENT */}
      <div className="relative z-10 flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-7">
        {/* LEFT */}
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#c01f53]">
            Explore Programs
          </p>
  
          <h1 className="mt-2 text-3xl font-black text-slate-950">
            Find a Course
          </h1>
  
          <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
            Search by course or university, or use the filters to narrow your
            results.
          </p>
        </div>
  
        {/* SEARCH */}
        <form
          ref={ref}
          onSubmit={submit}
          className="relative z-50 w-full max-w-xl"
        >
          <div className="flex h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 pl-4 shadow-sm transition focus-within:border-[#c01f53] focus-within:ring-4 focus-within:ring-[#c01f53]/5">
            <Search
              size={17}
              className="shrink-0 text-slate-400"
            />
  
            <input
              value={keyword}
              onChange={(event) =>
                setKeyword(event.target.value)
              }
              onFocus={() => {
                if (suggestions.length > 0) {
                  setOpen(true);
                }
              }}
              placeholder="find a course..."
              className="min-w-0 flex-1 bg-transparent px-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
  
            {keyword && (
              <button
                type="button"
                onClick={() => {
                  setKeyword("");
                  setSuggestions([]);
                  setOpen(false);
                  if (onClear) onClear();
                }}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-[#c01f53]"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
  
            <button
              type="submit"
              disabled={
                loading ||
                keyword.trim().length < 2
              }
              className="h-9 shrink-0 rounded-xl bg-[#c01f53] px-5 text-sm font-bold text-white transition hover:bg-[#631A33] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
  
          {/* SUGGESTIONS */}
          {open && (
            <div
              className="
                custom-scrollbar
                absolute
                left-0
                right-0
                top-[calc(100%+8px)]
                z-[999]
                max-h-[320px]
                overflow-y-auto
                rounded-2xl
                border border-slate-200
                bg-white
                p-2
                shadow-[0_20px_60px_rgba(15,23,42,0.20)]
              "
            >
              {suggestionsLoading ? (
                <div className="p-5 text-center">
                  <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-[#c01f53]" />
  
                  <p className="mt-2 text-xs font-medium text-slate-400">
                    Searching...
                  </p>
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((item) => (
                  <button
                    key={`${item.type}-${item.id}`}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onSuggestionSelect(item);
                    }}
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-50"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#c01f53]/10 text-[#c01f53]">
                      {item.type === "university" ? (
                        <Landmark size={17} />
                      ) : (
                        <BookOpen size={17} />
                      )}
                    </span>
  
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-slate-800">
                        {item.label}
                      </span>
  
                      {item.university && (
                        <span className="mt-0.5 block truncate text-xs text-slate-400">
                          {item.university}
                        </span>
                      )}
  
                      {item.country && (
                        <span className="mt-0.5 block truncate text-[11px] text-slate-400">
                          {item.country}
                        </span>
                      )}
                    </span>
  
                    <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[9px] font-black uppercase tracking-wide text-slate-500">
                      {item.type}
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-5 text-center">
                  <p className="text-sm font-semibold text-slate-500">
                    No suggestions found
                  </p>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}