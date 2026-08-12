"use client";

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

export default function FilterPanel({
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
  return (
    <aside className="rounded-[24px] border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24 lg:h-[calc(100vh-120px)]">
    {/* fixed header */}
    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
      <h2 className="text-xl font-black text-slate-950">
        Filters
      </h2>
  
      <button
        type="button"
        onClick={onClear}
        className="text-xs font-bold text-[#c01f53]"
      >
        Clear
      </button>
    </div>
  
    {/* scrollable content */}
    <div className="custom-scrollbar h-[calc(100%-69px)] overflow-y-auto px-5 py-4">
      <div className="space-y-5">
        <FilterSelect
          label="Country"
          value={countryId}
          onChange={onCountryChange}
          placeholder={
            destinationsLoading
              ? "Loading..."
              : "Select Country"
          }
          options={countryOptions}
          searchable
        />
  
        <FilterSelect
          label="University"
          value={universityId}
          onChange={onUniversityChange}
          placeholder={
            universitiesLoading
              ? "Loading..."
              : "Select University"
          }
          options={universityOptions}
          disabled={!countryId}
          searchable
        />
  
        <FilterSelect
          label="Study Area"
          value={courseId}
          onChange={onCourseChange}
          placeholder={
            mainCoursesLoading
              ? "Loading..."
              : "Select Study Area"
          }
          options={courseOptions}
          disabled={!universityId}
          searchable
        />
  
        <FilterSelect
          label="Intake"
          value={intake}
          onChange={onIntakeChange}
          placeholder="All Intakes"
          options={MONTHS.map((month) => ({
            value: month,
            label: month,
          }))}
        />
  
        <div>
          <p className="mb-3 text-[11px] font-black uppercase tracking-wide text-slate-500">
            Study Level
          </p>
  
          <div className="space-y-2">
            {LEVELS.map((level) => {
              const checked =
                levels.includes(level);
  
              return (
                <label
                  key={level}
                  className={`
                    flex cursor-pointer items-center
                    gap-3 rounded-lg px-2 py-2
                    text-sm transition
  
                    ${
                      checked
                        ? "bg-[#c01f53]/5 font-bold text-[#c01f53]"
                        : "text-slate-600 hover:bg-slate-50"
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      onToggleLevel(level)
                    }
                    className="h-4 w-4 accent-[#c01f53]"
                  />
  
                  {level}
                </label>
              );
            })}
          </div>
        </div>
  
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-medium leading-5 text-slate-500">
            Filters update the results automatically.
          </p>
        </div>
      </div>
    </div>
  </aside>
  );
}