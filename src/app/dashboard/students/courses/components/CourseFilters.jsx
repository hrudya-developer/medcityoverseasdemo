"use client";

import {
  MapPin,
  Landmark,
  BookOpen,
  Calendar,
  SlidersHorizontal,
} from "lucide-react";

import FilterSelect from "./FilterSelect";

const LEVELS = [
  "Undergraduate",
  "Postgraduate",
  "Masters",
  "PhD",
  "Diploma",
  "Certificate",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CourseFilters({
  countryId,
  universityId,
  courseId,
  intake,
  levels,

  countryOptions,
  universityOptions,
  courseOptions,

  destinationsLoading,
  universitiesLoading,
  mainCoursesLoading,

  onCountryChange,
  onUniversityChange,
  onCourseChange,
  onIntakeChange,
  onToggleLevel,
  onClear,
}) {
  const monthOptions = MONTHS.map((month) => ({
    value: month,
    label: month,
  }));

  return (
    <aside
      className="
        relative
        w-full
        max-w-full
        overflow-visible
        rounded-[24px]
        border
        border-slate-200/80
        bg-white
        shadow-sm

        lg:sticky
        lg:top-24
        lg:flex
        lg:h-[calc(100vh-120px)]
        lg:flex-col
        lg:overflow-hidden
        lg:rounded-[28px]
      "
    >
      {/* =====================================================
          MOBILE + TABLET
          ===================================================== */}
      <div
        className="
          relative
          z-30
          overflow-visible
          p-4

          lg:hidden
        "
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-[#c01f53]/10
                text-[#c01f53]
              "
            >
              <SlidersHorizontal size={14} />
            </span>

            <h2 className="truncate text-xs font-black uppercase tracking-wider text-slate-800">
              Filter By
            </h2>
          </div>

          <button
            type="button"
            onClick={onClear}
            className="
              shrink-0
              text-[11px]
              font-bold
              text-[#c01f53]
              transition
              hover:text-[#631A33]
              hover:underline
            "
          >
            Reset All
          </button>
        </div>

        {/* Filters */}
        <div
          className="
            grid
            grid-cols-1
            gap-2.5

            sm:grid-cols-2
          "
        >
          {/* Country */}
          <MobileSelectWrapper
            icon={<MapPin size={14} />}
            zIndex="z-[80]"
          >
            <FilterSelect
              value={countryId}
              onChange={onCountryChange}
              placeholder={destinationsLoading ? "Loading..." : "Country"}
              options={countryOptions}
            />
          </MobileSelectWrapper>

          {/* University */}
          <MobileSelectWrapper
            icon={<Landmark size={14} />}
            zIndex="z-[70]"
          >
            <FilterSelect
              value={universityId}
              onChange={onUniversityChange}
              placeholder={
                universitiesLoading ? "Loading..." : "University"
              }
              options={universityOptions}
              disabled={!countryId}
            />
          </MobileSelectWrapper>

          {/* Study Area */}
          <MobileSelectWrapper
            icon={<BookOpen size={14} />}
            zIndex="z-[60]"
          >
            <FilterSelect
              value={courseId}
              onChange={onCourseChange}
              placeholder={
                mainCoursesLoading ? "Loading..." : "Study Area"
              }
              options={courseOptions}
              disabled={!universityId}
            />
          </MobileSelectWrapper>

          {/* Intake */}
          <MobileSelectWrapper
            icon={<Calendar size={14} />}
            zIndex="z-[50]"
          >
            <FilterSelect
              value={intake}
              onChange={onIntakeChange}
              placeholder="Intake"
              options={monthOptions}
            />
          </MobileSelectWrapper>
        </div>

        {/* Study Level */}
        <div className="relative z-10 mt-4">
          <p className="mb-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
            Study Level
          </p>

          <div className="flex flex-wrap gap-2">
            {LEVELS.map((level) => {
              const checked = levels.includes(level);

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => onToggleLevel(level)}
                  className={`
                    min-h-8
                    rounded-full
                    border
                    px-3
                    py-1.5
                    text-[11px]
                    font-bold
                    transition-all
                    duration-200

                    ${checked
                      ? `
                          border-[#c01f53]
                          bg-[#c01f53]
                          text-white
                          shadow-sm
                          shadow-[#c01f53]/20
                        `
                      : `
                          border-slate-200
                          bg-white
                          text-slate-600
                          hover:border-slate-300
                          hover:bg-slate-50
                        `
                    }
                  `}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================
          DESKTOP
          ===================================================== */}
      <div className="hidden h-full min-h-0 flex-col lg:flex">
        {/* Header */}
        <div
          className="
            flex
            h-[68px]
            shrink-0
            items-center
            justify-between
            border-b
            border-slate-100
            px-5
          "
        >
          <div className="flex items-center gap-2.5">
            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-xl
                bg-[#c01f53]/10
                text-[#c01f53]
              "
            >
              <SlidersHorizontal size={15} />
            </span>

            <h2 className="text-lg font-black text-slate-950">
              Filters
            </h2>
          </div>

          <button
            type="button"
            onClick={onClear}
            className="
              text-xs
              font-bold
              text-[#c01f53]
              transition
              hover:text-[#631A33]
              hover:underline
            "
          >
            Clear All
          </button>
        </div>

        {/* Desktop scroll */}
        <div
          className="
            custom-scrollbar
            min-h-0
            flex-1
            overflow-y-auto
            overflow-x-visible
            px-5
            py-5
          "
        >
          <div className="space-y-6">
            <DesktopFilter label="Country">
              <FilterSelect
                value={countryId}
                onChange={onCountryChange}
                placeholder={
                  destinationsLoading
                    ? "Loading..."
                    : "Select Country"
                }
                options={countryOptions}
              />
            </DesktopFilter>

            <DesktopFilter label="University">
              <FilterSelect
                value={universityId}
                onChange={onUniversityChange}
                placeholder={
                  universitiesLoading
                    ? "Loading..."
                    : "Select University"
                }
                options={universityOptions}
                disabled={!countryId}
              />
            </DesktopFilter>

            <DesktopFilter label="Study Area">
              <FilterSelect
                value={courseId}
                onChange={onCourseChange}
                placeholder={
                  mainCoursesLoading
                    ? "Loading..."
                    : "Select Study Area"
                }
                options={courseOptions}
                disabled={!universityId}
              />
            </DesktopFilter>

            <DesktopFilter label="Intake">
              <FilterSelect
                value={intake}
                onChange={onIntakeChange}
                placeholder="All Intakes"
                options={monthOptions}
              />
            </DesktopFilter>

            {/* Levels */}
            <div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                Study Level
              </p>

              <div className="space-y-1">
                {LEVELS.map((level) => {
                  const checked = levels.includes(level);

                  return (
                    <label
                      key={level}
                      className={`
                        flex
                        cursor-pointer
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        transition
                        duration-200

                        ${checked
                          ? `
                              bg-[#c01f53]/5
                              font-bold
                              text-[#c01f53]
                            `
                          : `
                              text-slate-600
                              hover:bg-slate-50
                            `
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleLevel(level)}
                        className="h-4 w-4 accent-[#c01f53]"
                      />

                      <span>{level}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ==========================================================
   MOBILE FILTER WRAPPER
   ========================================================== */

function MobileSelectWrapper({
  icon,
  children,
  zIndex = "z-20",
}) {
  return (
    <div
      className={`
        relative
        ${zIndex}
        min-w-0
        overflow-visible
      `}
    >
      <span
        className="
          pointer-events-none
          absolute
          left-3
          top-1/2
          z-20
          -translate-y-1/2
          text-slate-400
        "
      >
        {icon}
      </span>

      <div
        className="
          min-w-0
          w-full

          [&>div>button]:h-10
          [&>div>button]:w-full
          [&>div>button]:rounded-xl
          [&>div>button]:pl-9
          [&>div>button]:pr-3
          [&>div>button]:text-xs
          [&>div>button]:shadow-sm
        "
      >
        {children}
      </div>
    </div>
  );
}

/* ==========================================================
   DESKTOP FILTER WRAPPER
   ========================================================== */

function DesktopFilter({ label, children }) {
  return (
    <div className="relative space-y-1.5">
      <span
        className="
          block
          text-[10px]
          font-black
          uppercase
          tracking-wider
          text-slate-400
        "
      >
        {label}
      </span>

      {children}
    </div>
  );
}