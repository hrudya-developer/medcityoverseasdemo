"use client";

import {
  ArrowRight,
  Clock,
  GraduationCap,
  MapPin,
  Wallet,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { createSlug } from "@/lib/slug";

/* =========================================================
   INFO
   ========================================================= */

function Info({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="mb-2 flex items-center gap-2">
        <div className="grid h-7 w-7 place-items-center rounded-lg bg-white text-[#c01f53]">
          <Icon size={13} />
        </div>

        <span className="text-[9px] font-black uppercase tracking-[0.06em] text-slate-400">
          {label}
        </span>
      </div>

      <p
        className="truncate text-xs font-bold text-slate-800"
        title={String(value || "N/A")}
      >
        {value || "N/A"}
      </p>
    </div>
  );
}

/* =========================================================
   CLEAN COURSE TITLE

   ONLY removes duration when it appears at the END.

   Examples:

   M.Sc Robotics Engineering 18 Months
   -> M.Sc Robotics Engineering

   MBA International Business - 2 Years
   -> MBA International Business

   Bachelor of Commerce/Bachelor of Laws
   -> unchanged
   ========================================================= */

function cleanCourseName(value = "") {
  let name = String(value)
    .replace(/\s+/g, " ")
    .trim();

  if (!name) {
    return "";
  }

  name = name
    // 18 months / 24 Months / 1 year / 2 Years
    .replace(
      /\s*[-–—,|]?\s*\d+(?:\.\d+)?\s*(?:months?|years?)\s*$/i,
      ""
    )

    // 1.5 years
    .replace(
      /\s*[-–—,|]?\s*\d+(?:\.\d+)?\s*(?:yrs?|mos?)\s*$/i,
      ""
    )

    // 4 semesters
    .replace(
      /\s*[-–—,|]?\s*\d+\s*semesters?\s*$/i,
      ""
    )

    // Full Time / Part Time at end
    .replace(
      /\s*[-–—,|]?\s*(?:full[\s-]?time|part[\s-]?time)\s*$/i,
      ""
    )
    .trim();

  return name;
}

/* =========================================================
   GET COURSE NAME

   IMPORTANT:
   course comes FIRST.

   Your API course-result objects mainly use
   `course` for the actual course/program title.
   ========================================================= */

function getCourseName(course) {
  const rawName =
    course?.course ??
    course?.course_name ??
    course?.program_name ??
    course?.program ??
    course?.title ??
    course?.name ??
    course?.label ??
    "";

  const cleaned =
    cleanCourseName(
      rawName
    );

  return (
    cleaned ||
    "Course"
  );
}

/* =========================================================
   COURSE ID

   Prefer university-course-specific IDs first.
   ========================================================= */

function getCourseId(course) {
  const value =
    course?.uc_id ??
    course?.university_course_id ??
    course?.universityCourseId ??
    course?.course_id ??
    course?.courseId ??
    course?.c_id ??
    course?.selectedId ??
    course?.selected_id ??
    course?.id ??
    "";

  return String(value).trim();
}

/* =========================================================
   COMPONENT
   ========================================================= */

export default function CourseCard({
  course,
}) {
  const router =
    useRouter();

  /* =======================================================
     COURSE NAME
     ======================================================= */

  const name =
    getCourseName(
      course
    );

  /* =======================================================
     UNIVERSITY
     ======================================================= */

  const university =
    course?.university ??
    course?.university_name ??
    course?.u_name ??
    course?.universityName ??
    "University";

  /* =======================================================
     COUNTRY
     ======================================================= */

  const country =
    course?.country ??
    course?.country_name ??
    course?.destination ??
    course?.destination_name ??
    "";

  /* =======================================================
     LEVEL
     ======================================================= */

  const level =
    course?.level ??
    course?.course_level ??
    course?.study_level ??
    course?.qualification ??
    "N/A";

  /* =======================================================
     DURATION

     Duration remains visible on the card.
     It is removed only from the URL/title if the API
     accidentally included it inside `course`.
     ======================================================= */

  const duration =
    course?.duration ??
    course?.course_duration ??
    "N/A";

  /* =======================================================
     FEES
     ======================================================= */

  const feesValue =
    course?.fees ??
    course?.tuition_fee ??
    course?.tuitionFee ??
    "";

  const currency =
    course?.currency ??
    course?.currency_symbol ??
    course?.currencySymbol ??
    "";

  const fees =
    feesValue !== "" &&
      feesValue !== null &&
      feesValue !== undefined
      ? `${currency} ${feesValue}`.trim()
      : "N/A";

  /* =======================================================
     ID + SLUG
     ======================================================= */

  const courseId =
    getCourseId(
      course
    );

  /*
   * URL comes ONLY from the cleaned actual course name.
   */
  const courseSlug =
    createSlug(
      name
    );

  /* =======================================================
     VIEW DETAILS
     ======================================================= */

  const handleViewCourse = () => {
    if (
      !courseSlug
    ) {
      console.error(
        "COURSE SLUG MISSING:",
        course
      );

      return;
    }

    /*
     * Useful while verifying API fields.
     */
    console.log(
      "PUBLIC COURSE CLICK:",
      {
        displayedName:
          name,

        rawCourse:
          course?.course,

        courseName:
          course?.course_name,

        programName:
          course?.program_name,

        courseId,

        courseSlug,

        fullCourse:
          course,
      }
    );

    /*
     * Save ID internally.
     *
     * ID will NOT be visible in URL.
     */
    try {
      sessionStorage.setItem(
        `public-course:${courseSlug}`,
        JSON.stringify({
          id:
            courseId,

          slug:
            courseSlug,

          name,

          university,

          country,

          course,

          createdAt:
            Date.now(),
        })
      );
    } catch (error) {
      console.error(
        "Unable to save course mapping:",
        error
      );
    }

    router.push(
      `/courses/${courseSlug}`
    );
  };

  /* =======================================================
     UI
     ======================================================= */

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        rounded-[24px]
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#c01f53]/20
        hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]
      "
    >
      {/* TOP */}

      <div className="flex gap-4">
        <div
          className="
            grid
            h-12
            w-12
            shrink-0
            place-items-center
            rounded-2xl
            bg-gradient-to-br
            from-[#c01f53]
            to-[#631A33]
            text-white
            shadow-[0_8px_20px_rgba(192,31,83,0.22)]
          "
        >
          <GraduationCap
            size={21}
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.08em] text-[#c01f53]">
            {level}
          </p>

          <h3
            className="mt-1 text-base font-black leading-6 text-slate-900"
            title={name}
          >
            {name}
          </h3>

          <p
            className="mt-1 text-sm font-medium text-slate-500"
            title={university}
          >
            {university}
          </p>

          {country && (
            <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
              <MapPin
                size={12}
                className="shrink-0"
              />

              <span>
                {country}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* COURSE INFORMATION */}

      <div className="mt-5 grid grid-cols-3 gap-2">
        <Info
          icon={
            GraduationCap
          }
          label="Level"
          value={level}
        />

        <Info
          icon={Clock}
          label="Duration"
          value={
            duration
          }
        />

        <Info
          icon={Wallet}
          label="Fees"
          value={fees}
        />
      </div>

      {/* BUTTON */}

      <div className="mt-auto pt-5">
        <button
          type="button"
          onClick={
            handleViewCourse
          }
          disabled={
            !courseSlug
          }
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#c01f53]
            px-4
            py-3
            text-sm
            font-extrabold
            text-white
            shadow-[0_8px_20px_rgba(192,31,83,0.18)]
            transition-all
            duration-300

            hover:-translate-y-0.5
            hover:bg-[#a71947]
            hover:shadow-[0_12px_24px_rgba(192,31,83,0.24)]

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          View Course Details

          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </article>
  );
}