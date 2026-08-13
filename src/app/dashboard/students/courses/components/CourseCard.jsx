"use client";

import {
  useState,
} from "react";

import {
  CheckCircle2,
  Clock,
  GraduationCap,
  Heart,
  MapPin,
  Wallet,
} from "lucide-react";

import Swal from "sweetalert2";

import {
  applyCourse,
} from "../services/courseActions";


function Info({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="mb-2 flex items-center gap-2">
        <div
          className="
            grid
            h-7
            w-7
            place-items-center
            rounded-lg
            bg-white
            text-[#c01f53]
          "
        >
          <Icon size={13} />
        </div>

        <span
          className="
            text-[9px]
            font-black
            uppercase
            tracking-[0.06em]
            text-slate-400
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          truncate
          text-xs
          font-bold
          text-slate-800
        "
      >
        {value || "N/A"}
      </p>
    </div>
  );
}


function WishlistButton({
  active = false,
  onClick,
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        onClick={onClick}
        aria-label={
          active
            ? "Remove from wishlist"
            : "Add to wishlist"
        }
        className={`
          grid
          h-11
          w-11
          place-items-center
          rounded-xl
          border
          transition-all
          duration-200

          ${
            active
              ? "border-[#c01f53] bg-[#c01f53] text-white shadow-[0_8px_20px_rgba(192,31,83,0.20)]"
              : "border-slate-200 bg-white text-slate-500 hover:border-[#c01f53]/40 hover:bg-[#c01f53]/5 hover:text-[#c01f53]"
          }
        `}
      >
        <Heart
          size={18}
          className={
            active
              ? "fill-current"
              : ""
          }
        />
      </button>

      <div
        className="
          pointer-events-none
          absolute
          bottom-full
          right-0
          z-30
          mb-2
          whitespace-nowrap
          rounded-lg
          bg-slate-950
          px-2.5
          py-1.5
          text-[10px]
          font-bold
          text-white
          opacity-0
          shadow-lg
          transition
          duration-200

          group-hover:opacity-100
        "
      >
        {active
          ? "Remove from wishlist"
          : "Add to wishlist"}

        <div
          className="
            absolute
            right-4
            top-full
            h-0
            w-0
            border-x-[5px]
            border-t-[5px]
            border-x-transparent
            border-t-slate-950
          "
        />
      </div>
    </div>
  );
}


export default function CourseCard({
  course,
  onWishlist,
  wishlisted = false,
  initiallyApplied = false,
}) {
  const [
    applying,
    setApplying,
  ] = useState(false);

  const [
    applied,
    setApplied,
  ] = useState(
    initiallyApplied
  );


  const name =
    course?.course ??
    course?.course_name ??
    course?.name ??
    "Course";

  const university =
    course?.university ??
    course?.university_name ??
    "University";

  const country =
    course?.country ??
    course?.destination ??
    "";

  const level =
    course?.level ??
    "N/A";

  const duration =
    course?.duration ??
    "N/A";

  const fees =
    course?.fees
      ? `${course?.currency || ""} ${course.fees}`.trim()
      : "N/A";

  const courseId =
    course?.id ??
    course?.c_id ??
    course?.course_id ??
    null;


  async function handleApply() {
    if (
      applying ||
      applied
    ) {
      return;
    }

    if (
      courseId === null ||
      courseId === undefined ||
      String(
        courseId
      ).trim() === ""
    ) {
      console.error(
        "Course ID missing:",
        course
      );

      await Swal.fire({
        icon: "error",
        title:
          "Unable to Apply",
        text:
          "Course information is missing.",
        confirmButtonColor:
          "#c01f53",
      });

      return;
    }

    try {
      setApplying(true);

      const result =
        await applyCourse(
          courseId
        );

      /*
       * Application completed successfully.
       * Permanently change this card to
       * "Applied" for the current page load.
       */
      setApplied(true);

      await Swal.fire({
        icon: "success",

        title:
          "Application Submitted!",

        text:
          result?.msg ||
          result?.message ||
          "You have successfully applied for this course.",

        confirmButtonColor:
          "#c01f53",
      });
    } catch (error) {
      console.error(
        "Course application failed:",
        error
      );

      await Swal.fire({
        icon: "error",

        title:
          "Application Failed",

        text:
          error?.message ||
          "Unable to apply for this course.",

        confirmButtonColor:
          "#c01f53",
      });
    } finally {
      setApplying(false);
    }
  }


  return (
    <article
      className="
        group
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
          <p
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.08em]
              text-[#c01f53]
            "
          >
            {level}
          </p>

          <h3
            className="
              mt-1
              text-base
              font-black
              leading-6
              text-slate-900
            "
          >
            {name}
          </h3>

          <p
            className="
              mt-1
              text-sm
              font-medium
              text-slate-500
            "
          >
            {university}
          </p>

          {country && (
            <p
              className="
                mt-1
                flex
                items-center
                gap-1
                text-xs
                text-slate-400
              "
            >
              <MapPin size={12} />

              {country}
            </p>
          )}
        </div>
      </div>


      <div
        className="
          mt-5
          grid
          grid-cols-3
          gap-2
        "
      >
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
          value={duration}
        />

        <Info
          icon={Wallet}
          label="Fees"
          value={fees}
        />
      </div>


      <div
        className="
          mt-5
          flex
          items-center
          gap-3
        "
      >
        <button
          type="button"
          onClick={
            handleApply
          }
          disabled={
            applying ||
            applied ||
            !courseId
          }
          className={`
            inline-flex
            h-11
            flex-1
            items-center
            justify-center
            gap-2
            rounded-xl
            px-4
            text-sm
            font-black
            transition-all
            duration-200

            ${
              applied
                ? "cursor-not-allowed border border-emerald-200 bg-emerald-50 text-emerald-700"
                : "bg-gradient-to-r from-[#c01f53] to-[#8f153e] text-white shadow-[0_10px_24px_rgba(192,31,83,0.20)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(192,31,83,0.28)]"
            }

            disabled:cursor-not-allowed
          `}
        >
          {applying ? (
            <>
              <span
                className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-white/40
                  border-t-white
                "
              />

              Applying...
            </>
          ) : applied ? (
            <>
              <CheckCircle2
                size={16}
              />

              Applied
            </>
          ) : (
            "Apply Now"
          )}
        </button>


        <WishlistButton
          active={
            wishlisted
          }
          onClick={() =>
            onWishlist?.({
              course,
              courseId,
            })
          }
        />
      </div>
    </article>
  );
}