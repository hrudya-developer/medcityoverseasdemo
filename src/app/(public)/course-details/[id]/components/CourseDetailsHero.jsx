"use client";

import {
  useEffect,
  useState,
} from "react";

import heroBg from "@/assets/university-course-details.png";

import {
  GraduationCap,
  MapPin,
  MoveRight,
} from "lucide-react";

export default function CourseDetailsHero({
  details,
  onApply,
}) {
  const [
    logoError,
    setLogoError,
  ] = useState(false);

  const {
    courseTitle = "Course Details",
    universityName = "University",
    universityLogoUrl = "",
    locationName = "",
    level = "Course",
  } = details ?? {};

  /*
   * Try loading the logo again when
   * the selected university changes.
   */
  useEffect(() => {
    setLogoError(false);
  }, [universityLogoUrl]);

  const handleApply = () => {
    if (
      typeof onApply === "function"
    ) {
      onApply();
    }
  };

  return (
    <section
      className="relative min-h-[400px] w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          `url(${heroBg.src})`,
      }}
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-primary/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-0 size-96 rounded-full bg-secondary/10 blur-3xl"
      />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[420px] w-full max-w-[1600px] items-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-3 rounded-full bg-logoYellow px-4 py-2 text-xs font-bold text-black shadow-lg sm:text-sm">
              <GraduationCap
                size={20}
                aria-hidden="true"
              />

              <span>{level}</span>
            </div>

            <button
              type="button"
              onClick={handleApply}
              className="inline-flex items-center gap-2 rounded-full bg-darkPrimary px-5 py-2 text-xs font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:text-sm"
            >
              Apply Now

              <MoveRight
                size={18}
                aria-hidden="true"
              />
            </button>
          </div>

          <h1 className="mt-8 max-w-3xl text-2xl font-extrabold leading-tight text-slate-950 sm:text-3xl lg:text-5xl">
            {courseTitle}
          </h1>

          <div
            aria-hidden="true"
            className="mt-5 h-1 w-20 rounded-full bg-primary"
          />

          <div className="mb-8 mt-6 flex max-w-2xl items-center gap-4 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
            {universityLogoUrl &&
            !logoError ? (
              <img
                src={universityLogoUrl}
                alt={`${universityName} logo`}
                className="size-16 shrink-0 rounded-xl border border-slate-100 bg-white object-contain p-2 shadow-md"
                onError={() =>
                  setLogoError(true)
                }
              />
            ) : (
              <div className="grid size-16 shrink-0 place-content-center rounded-xl bg-darkPrimary text-white shadow-lg">
                <GraduationCap
                  size={30}
                  aria-hidden="true"
                />
              </div>
            )}

            <div className="min-w-0">
              <p className="text-xs font-extrabold uppercase tracking-wider text-primary">
                University
              </p>

              <h2 className="mt-1 break-words text-base font-extrabold text-darkPrimary sm:text-lg">
                {universityName}
              </h2>

              {locationName && (
                <p className="mt-1 flex items-center gap-2 text-sm font-medium text-secondary">
                  <MapPin
                    size={15}
                    className="shrink-0"
                    aria-hidden="true"
                  />

                  <span>
                    {locationName}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}