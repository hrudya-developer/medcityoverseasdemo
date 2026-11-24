
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  Globe2,
  Clock3,
  GraduationCap,
  Layers3,
} from "lucide-react";

import { getCourseAreaSummaries } from "@/lib/courseAreaSummary";

const NOT_RECORDED = "Not recorded";

export default async function CourseAreasTable({
  title = "Course areas at a glance",
  className = "",
}) {
  const rows = (await getCourseAreaSummaries()).filter(
    (row) => row.courses > 0
  );

  if (!rows.length) {
    return null;
  }

  const count = (value) =>
    (Number(value) || 0).toLocaleString("en-IN");

  const courseHref = (name) =>
    `/courses?q=${encodeURIComponent(name)}`;

  return (
    <section
      className={`relative mx-auto w-full max-w-7xl bg-orange-50/70 mb-8 rounded-3xl px-10 py-10 ${className}`}
    >
      {/* SECTION HEADING */}
      <div className="mb-8 sm:mb-10">
        <div className="mb-5 flex items-center gap-2">
          <span className="h-1.5 w-10 rounded-full bg-primary" />
          <span className="h-1.5 w-4 rounded-full bg-logoYellow" />
        </div>

        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-pink-200/60 sm:h-14 sm:w-14">
            <GraduationCap size={27} strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary sm:text-xs">
              Explore academic opportunities
            </p>

            <h2 className="text-2xl font-black tracking-tight text-[#0B1E46] sm:text-3xl lg:text-4xl">
              {title}
            </h2>
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          Counted from the courses currently listed on Medcity
          Overseas. Durations are the most common one among the
          listed courses in each area; check each course page
          for its own.
        </p>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_65px_-35px_rgba(11,30,70,0.25)] md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead className="table-header-group">
  <tr className="bg-darkPrimary text-white">
    <th
      scope="col"
      className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider"
    >
      <div className="flex items-center gap-2">
        {/* <BookOpen size={17} /> */}
        Course Area
      </div>
    </th>

    <th
      scope="col"
      className="px-5 py-5 text-center text-xs font-bold uppercase tracking-wider"
    >
      <div className="flex items-center justify-center gap-2">
        {/* <Layers3 size={17} /> */}
        Courses
      </div>
    </th>

    <th
      scope="col"
      className="px-5 py-5 text-center text-xs font-bold uppercase tracking-wider"
    >
      <div className="flex items-center justify-center gap-2">
        {/* <Building2 size={17} /> */}
        Universities
      </div>
    </th>

    <th
      scope="col"
      className="px-5 py-5 text-center text-xs font-bold uppercase tracking-wider"
    >
      <div className="flex items-center justify-center gap-2">
        {/* <Globe2 size={17} /> */}
        Countries
      </div>
    </th>

    <th
      scope="col"
      className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider"
    >
      <div className="flex items-center gap-2">
        {/* <Clock3 size={17} /> */}
        Most Common Duration
      </div>
    </th>
  </tr>
</thead>

            <tbody className="divide-y divide-slate-100">
              {rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`group transition-all duration-200 hover:bg-[#FFF5F8] ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-[#F8FAFD]"
                  }`}
                >
                  {/* COURSE AREA */}
                  <th scope="row" className="px-6 py-5">
                    <Link
                      href={courseHref(row.name)}
                      className="flex items-center gap-3"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F5] text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <BookOpen size={19} />
                      </span>

                      <span className="min-w-0 font-bold leading-6 text-[#0B1E46] transition-colors group-hover:text-primary">
                        {row.name}
                      </span>

                      <ArrowUpRight
                        size={17}
                        className="shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </th>

                  {/* COURSES */}
                  <td className="px-5 py-5 text-center">
                    <span className="inline-flex min-w-[68px] justify-center rounded-xl bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700">
                      {count(row.courses)}
                    </span>
                  </td>

                  {/* UNIVERSITIES */}
                  <td className="px-5 py-5 text-center">
                    <span className="inline-flex min-w-[68px] justify-center rounded-xl bg-violet-50 px-3 py-2 text-sm font-bold text-violet-700">
                      {count(row.universities)}
                    </span>
                  </td>

                  {/* COUNTRIES */}
                  <td className="px-5 py-5 text-center">
                    <span className="inline-flex min-w-[60px] justify-center rounded-xl bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">
                      {count(row.countries)}
                    </span>
                  </td>

                  {/* DURATION */}
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
                      <Clock3
                        size={15}
                        className="shrink-0 text-slate-400"
                      />
                      {row.duration ?? NOT_RECORDED}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE CARDS */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {rows.map((row) => (
          <article
            key={row.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_-15px_rgba(11,30,70,0.2)]"
          >
            {/* CARD HEADER */}
            <div className="border-b border-slate-100 p-4 sm:p-5">
              <Link
                href={courseHref(row.name)}
                className="flex items-center gap-3"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F5] text-primary">
                  <BookOpen size={20} />
                </span>

                <span className="min-w-0 flex-1 text-sm font-extrabold leading-6 text-[#0B1E46] sm:text-base">
                  {row.name}
                </span>

                <ArrowUpRight
                  size={19}
                  className="shrink-0 text-primary"
                />
              </Link>
            </div>

            {/* CARD STATISTICS */}
            <div className="grid grid-cols-3 gap-2 p-4 sm:gap-3 sm:p-5">
              <div className="min-w-0 rounded-xl bg-blue-50 p-3 text-center">
                <Layers3
                  size={18}
                  className="mx-auto mb-2 text-blue-600"
                />
                <p className="break-words text-lg font-black text-blue-800 sm:text-xl">
                  {count(row.courses)}
                </p>
                <p className="mt-1 text-[10px] font-medium text-slate-500 sm:text-xs">
                  Courses
                </p>
              </div>

              <div className="min-w-0 rounded-xl bg-violet-50 p-3 text-center">
                <Building2
                  size={18}
                  className="mx-auto mb-2 text-violet-600"
                />
                <p className="break-words text-lg font-black text-violet-800 sm:text-xl">
                  {count(row.universities)}
                </p>
                <p className="mt-1 text-[10px] font-medium text-slate-500 sm:text-xs">
                  Universities
                </p>
              </div>

              <div className="min-w-0 rounded-xl bg-emerald-50 p-3 text-center">
                <Globe2
                  size={18}
                  className="mx-auto mb-2 text-emerald-600"
                />
                <p className="break-words text-lg font-black text-emerald-800 sm:text-xl">
                  {count(row.countries)}
                </p>
                <p className="mt-1 text-[10px] font-medium text-slate-500 sm:text-xs">
                  Countries
                </p>
              </div>
            </div>

            {/* DURATION */}
            <div className="mx-4 mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 px-4 py-3 sm:mx-5 sm:mb-5">
              <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Clock3 size={16} />
                Most common duration
              </span>

              <span className="text-right text-xs font-bold text-[#0B1E46] sm:text-sm">
                {row.duration ?? NOT_RECORDED}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
