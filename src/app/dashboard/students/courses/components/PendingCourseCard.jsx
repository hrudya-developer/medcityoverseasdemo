"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  GraduationCap,
  MapPin,
  X,
} from "lucide-react";

export default function PendingCourseCard() {
  const router = useRouter();

  const [pending, setPending] =
    useState(null);

  useEffect(() => {
    try {
      const stored =
        sessionStorage.getItem(
          "pendingApplyCourse"
        );

      if (!stored) return;

      setPending(JSON.parse(stored));
    } catch (error) {
      console.error(
        "Unable to read pending course:",
        error
      );

      sessionStorage.removeItem(
        "pendingApplyCourse"
      );

      sessionStorage.removeItem(
        "loginRedirectType"
      );
    }
  }, []);

  const clearPendingCourse = () => {
    sessionStorage.removeItem(
      "pendingApplyCourse"
    );

    sessionStorage.removeItem(
      "loginRedirectType"
    );

    setPending(null);
  };

  if (!pending) {
    return null;
  }

  const course = pending.course ?? {};

  const courseTitle =
    course?.course_name ??
    course?.course ??
    course?.name ??
    course?.title ??
    "Selected course";

  const universityName =
    course?.university_name ??
    course?.university ??
    course?.u_name ??
    "University";

  const location =
    course?.country_name ??
    course?.country ??
    course?.location ??
    "";

  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.04] shadow-sm">
      <div className="flex items-center justify-between border-b border-primary/10 px-5 py-4">
        <div className="flex items-center gap-2 text-primary">
          <GraduationCap
            size={20}
            aria-hidden="true"
          />

          <h2 className="font-black">
            Your selected course
          </h2>
        </div>

        <button
          type="button"
          onClick={clearPendingCourse}
          aria-label="Remove selected course"
          className="grid size-9 place-content-center rounded-full text-slate-500 transition hover:bg-white hover:text-primary"
        >
          <X
            size={18}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-black text-slate-950">
          {courseTitle}
        </h3>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <Building2
              size={17}
              className="text-primary"
            />

            {universityName}
          </span>

          {location && (
            <span className="flex items-center gap-2">
              <MapPin
                size={17}
                className="text-primary"
              />

              {location}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() =>
            router.push(
              `/course-details/${pending.courseId}`
            )
          }
          className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-darkPrimary"
        >
          View course details
        </button>
      </div>
    </section>
  );
}