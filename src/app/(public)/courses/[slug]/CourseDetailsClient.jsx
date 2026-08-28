"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useGetCourseDetailsQuery,
  useGetPublicCourseDetailsQuery,
} from "@/lib/services/searchApi";

import FAQ from "@/components/home/FAQ/FAQ";

import CourseBenefits from "./components/CourseBenefits";
import CourseDetailsError from "./components/CourseDetailsError";
import CourseDetailsGrid from "./components/CourseDetailsGrid";
import CourseDetailsHero from "./components/CourseDetailsHero";
import CourseDetailsSkeleton from "./components/CourseDetailsSkeleton";
import CourseQuickFacts from "./components/CourseQuickFacts";
import EnglishRequirements from "./components/EnglishRequirements";

import {
  formatCourseDetails,
} from "./utils/courseDetailsHelpers";
import CourseDetailsFAQ from "./components/CourseDetailsFAQ";

function getCourseId(course) {
  const value =
    course?.id ??
    course?.course_id ??
    course?.uc_id ??
    course?.c_id ??
    course?.selectedId ??
    course?.selected_id ??
    course?.university_course_id ??
    course?.courseId ??
    "";

  return String(value).trim();
}

export default function CourseDetailsClient({
  slug,
}) {
  const router = useRouter();

  const [
    storedCourseId,
    setStoredCourseId,
  ] = useState("");

  const [
    storageChecked,
    setStorageChecked,
  ] = useState(false);

  /**
   * Read hidden slug -> ID mapping.
   *
   * ID stays internal.
   * It never appears in browser URL.
   */
  useEffect(() => {
    if (!slug) {
      setStorageChecked(true);
      return;
    }

    try {
      const raw =
        sessionStorage.getItem(
          `public-course:${slug}`
        );

      if (!raw) {
        setStorageChecked(true);
        return;
      }

      const parsed =
        JSON.parse(raw);

      const id =
        parsed?.id
          ? String(
            parsed.id
          ).trim()
          : "";

      if (id) {
        setStoredCourseId(
          id
        );
      }
    } catch (error) {
      console.error(
        "Unable to read stored course:",
        error
      );

      /**
       * Remove corrupt data.
       */
      try {
        sessionStorage.removeItem(
          `public-course:${slug}`
        );
      } catch {
        // ignore
      }
    } finally {
      setStorageChecked(
        true
      );
    }
  }, [slug]);

  /**
   * METHOD 1
   *
   * Exact ID lookup.
   *
   * This is normally used when the
   * visitor clicked the course card.
   */
  const {
    data: courseFromId,

    isLoading: idLoading,
    isFetching: idFetching,

    isError: idIsError,

    error: idError,

    refetch: refetchById,
  } = useGetCourseDetailsQuery(
    {
      courseId:
        storedCourseId,

      /**
       * PUBLIC PAGE
       */
      uid: 0,
    },
    {
      skip:
        !storageChecked ||
        !storedCourseId,
    }
  );

  /**
   * METHOD 2
   *
   * Slug resolver.
   *
   * Used when:
   *
   * - direct URL is opened
   * - Google opens page
   * - user shares URL
   * - new browser
   * - no sessionStorage
   * - stored ID request failed
   */
  const shouldUseSlug =
    storageChecked &&
    Boolean(slug) &&
    (
      !storedCourseId ||
      (
        storedCourseId &&
        idIsError &&
        !courseFromId
      )
    );

  const {
    data: courseFromSlug,

    isLoading: slugLoading,
    isFetching: slugFetching,

    isError: slugIsError,

    error: slugError,

    refetch: refetchBySlug,
  } =
    useGetPublicCourseDetailsQuery(
      {
        slug,
      },
      {
        skip:
          !shouldUseSlug,
      }
    );

  /**
   * Prefer exact-ID result.
   */
  const selectedCourse =
    courseFromId ??
    courseFromSlug ??
    null;

  const loading =
    !storageChecked ||
    idLoading ||
    idFetching ||
    (
      shouldUseSlug &&
      (
        slugLoading ||
        slugFetching
      )
    );

  if (loading) {
    return (
      <CourseDetailsSkeleton />
    );
  }

  if (!selectedCourse) {
    const currentError =
      slugIsError
        ? slugError
        : idError;

    const handleRetry = () => {
      if (
        storedCourseId &&
        !idIsError
      ) {
        refetchById();
        return;
      }

      if (shouldUseSlug) {
        refetchBySlug();
        return;
      }

      router.refresh();
    };

    return (
      <CourseDetailsError
        message={
          currentError?.data
            ?.message ||
          currentError?.data
            ?.error ||
          currentError?.message ||
          "Course details could not be loaded."
        }
        onRetry={
          handleRetry
        }
        onBack={() =>
          router.push(
            "/courses"
          )
        }
      />
    );
  }

  const details =
    formatCourseDetails(
      selectedCourse
    );

  const actualCourseId =
    getCourseId(
      selectedCourse
    ) ||
    storedCourseId;

  const handleApply = () => {
    const pendingData = {
      course:
        selectedCourse,

      courseId:
        actualCourseId,

      /**
       * Public SEO URL
       */
      courseSlug:
        slug,

      universityId:
        selectedCourse?.u_id ??
        selectedCourse?.university_id ??
        "",

      countryId:
        selectedCourse?.d_id ??
        selectedCourse?.country_id ??
        "",

      createdAt:
        Date.now(),
    };

    sessionStorage.setItem(
      "pendingApplyCourse",
      JSON.stringify(
        pendingData
      )
    );

    sessionStorage.setItem(
      "loginRedirectType",
      "applyCourse"
    );

    router.push(
      "/login?intent=applyCourse"
    );
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <CourseDetailsHero
        details={details}
        onApply={
          handleApply
        }
      />

      <CourseQuickFacts
        duration={
          details.duration
        }
        level={
          details.level
        }
        intakes={
          details.intakes
        }
        intakesRaw={
          details.intakesRaw
        }
      />

      <CourseDetailsGrid
        details={
          details
        }
      />

      <EnglishRequirements
        course={
          selectedCourse
        }
      />

      <CourseBenefits
        country={
          details.country
        }
        intakes={
          details.intakes
        }
        universityName={
          details.universityName
        }
      />

      <CourseDetailsFAQ
        course={selectedCourse}
        courseSlug={slug}
      />
    </main>
  );
}