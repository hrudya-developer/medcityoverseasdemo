"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  useGetDestinationsQuery,
  useGetUniversitiesQuery,
  useGetMainCoursesQuery,
  useLazySearchCoursesQuery,
} from "@/lib/services/searchApi";

import CourseHero from "./components/CourseHero";
import CourseFilters from "./components/CourseFilters";
import CourseResults from "./components/CourseResults";

export default function FindCoursePage() {
  const uid = 0;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams =
    useSearchParams();

  // URL state
  const urlKeyword =
    searchParams.get("q") || "";

  const countryId =
    searchParams.get("country") ||
    "";

  const universityId =
    searchParams.get(
      "university"
    ) || "";

  const courseId =
    searchParams.get("course") ||
    "";

  const intake =
    searchParams.get("intake") ||
    "";

  const selectedType =
    searchParams.get("type") ||
    "";

  const selectedId =
    searchParams.get(
      "selectedId"
    ) || "";

  const showPendingCourse =
    searchParams.get("selected") ===
    "pending";

  const levels = useMemo(() => {
    const value =
      searchParams.get("levels") ||
      "";

    return value
      ? value
          .split(",")
          .map((item) =>
            item.trim()
          )
          .filter(Boolean)
      : [];
  }, [searchParams]);

  const [keyword, setKeyword] =
    useState(urlKeyword);

  const [courses, setCourses] =
    useState([]);

  useEffect(() => {
    setKeyword(urlKeyword);
  }, [urlKeyword]);

  // Update URL
  const updateUrl = useCallback(
    (updates = {}) => {
      const params =
        new URLSearchParams(
          searchParams.toString()
        );

      Object.entries(
        updates
      ).forEach(
        ([key, value]) => {
          if (
            value === "" ||
            value === null ||
            value === undefined
          ) {
            params.delete(key);
            return;
          }

          if (
            Array.isArray(value)
          ) {
            if (
              value.length === 0
            ) {
              params.delete(key);
            } else {
              params.set(
                key,
                value.join(",")
              );
            }

            return;
          }

          params.set(
            key,
            String(value)
          );
        }
      );

      const query =
        params.toString();

      router.replace(
        query
          ? `${pathname}?${query}`
          : pathname,
        {
          scroll: false,
        }
      );
    },
    [
      pathname,
      router,
      searchParams,
    ]
  );

  // Destinations
  const {
    data: destinations = [],
    isLoading:
      destinationsLoading,
  } =
    useGetDestinationsQuery(uid);

  // Universities
  const {
    data: universities = [],
    isLoading:
      universitiesLoading,
  } = useGetUniversitiesQuery(
    {
      countryId,
      uid,
    },
    {
      skip: !countryId,
    }
  );

  // Main courses
  const {
    data: mainCourses = [],
    isLoading:
      mainCoursesLoading,
  } = useGetMainCoursesQuery(
    {
      universityId,
      uid,
    },
    {
      skip: !universityId,
    }
  );

  // Search API
  const [
    searchCourses,
    {
      isFetching: loading,
      error,
    },
  ] = useLazySearchCoursesQuery();

  // Options
  const countryOptions =
    useMemo(() => {
      return destinations
        .map((item) => ({
          value: String(
            item?.id ??
              item?.d_id ??
              ""
          ),
          label:
            item?.name ??
            item?.country ??
            item?.destination ??
            "",
        }))
        .filter(
          (item) =>
            item.value &&
            item.label
        );
    }, [destinations]);

  const universityOptions =
    useMemo(() => {
      return universities
        .map((item) => ({
          value: String(
            item?.id ??
              item?.u_id ??
              ""
          ),
          label:
            item?.name ??
            item?.university ??
            "",
        }))
        .filter(
          (item) =>
            item.value &&
            item.label
        );
    }, [universities]);

  const courseOptions =
    useMemo(() => {
      return mainCourses
        .map((item) => ({
          value: String(
            item?.id ??
              item?.c_id ??
              ""
          ),
          label:
            item?.name ??
            item?.course ??
            item?.course_name ??
            "",
        }))
        .filter(
          (item) =>
            item.value &&
            item.label
        );
    }, [mainCourses]);

  const hasSearch = Boolean(
    urlKeyword ||
      countryId ||
      universityId ||
      courseId ||
      intake ||
      levels.length ||
      selectedId ||
      showPendingCourse
  );

  // Search or restore clicked course
  const executeSearch =
    useCallback(async () => {
      if (showPendingCourse) {
        try {
          const stored =
            sessionStorage.getItem(
              "pendingApplyCourse"
            );

          if (!stored) {
            setCourses([]);
            return;
          }

          const pending =
            JSON.parse(stored);

          if (pending?.course) {
            setCourses([
              pending.course,
            ]);
          } else {
            setCourses([]);
          }
        } catch (pendingError) {
          console.error(
            "Unable to restore selected course:",
            pendingError
          );

          setCourses([]);
        }

        return;
      }

      if (!hasSearch) {
        setCourses([]);
        return;
      }

      try {
        const response =
          await searchCourses({
            uid,
            keyword:
              urlKeyword,
            countryId,
            universityId,
            courseId,
            selectedType,
            selectedId,
            intake,
            levels,
            offset: 0,
          }).unwrap();

        setCourses(
          Array.isArray(
            response?.courses
          )
            ? response.courses
            : []
        );
      } catch (searchError) {
        console.error(
          "Course search failed:",
          searchError
        );

        setCourses([]);
      }
    }, [
      uid,
      urlKeyword,
      countryId,
      universityId,
      courseId,
      selectedType,
      selectedId,
      intake,
      levels,
      hasSearch,
      showPendingCourse,
      searchCourses,
    ]);

  useEffect(() => {
    executeSearch();
  }, [executeSearch]);

  // Keyword search
  const handleSearch = () => {
    const value =
      keyword.trim();

    if (value.length < 2) {
      return;
    }

    updateUrl({
      q: value,
      type: "",
      selectedId: "",
      selected: "",
    });
  };

  // Suggestion
  const handleSuggestion = (
    item
  ) => {
    if (!item) return;

    const label =
      item?.label || "";

    setKeyword(label);

    updateUrl({
      q: label,
      type: item?.type || "",
      selectedId:
        item?.id || "",
      selected: "",
    });
  };

  // Country filter
  const handleCountryChange = (
    value
  ) => {
    updateUrl({
      country: value,
      university: "",
      course: "",
      type: "",
      selectedId: "",
      selected: "",
    });
  };

  // University filter
  const handleUniversityChange = (
    value
  ) => {
    updateUrl({
      university: value,
      course: "",
      type: "",
      selectedId: "",
      selected: "",
    });
  };

  // Course filter
  const handleCourseChange = (
    value
  ) => {
    updateUrl({
      course: value,
      type: "",
      selectedId: "",
      selected: "",
    });
  };

  // Intake filter
  const handleIntakeChange = (
    value
  ) => {
    updateUrl({
      intake: value,
      selected: "",
    });
  };

  // Level filter
  const toggleLevel = (level) => {
    const nextLevels =
      levels.includes(level)
        ? levels.filter(
            (item) =>
              item !== level
          )
        : [...levels, level];

    updateUrl({
      levels: nextLevels,
      selected: "",
    });
  };

  // Clear hero keyword
  const clearHeroSearch = () => {
    setKeyword("");

    updateUrl({
      q: "",
      type: "",
      selectedId: "",
      selected: "",
    });
  };

  // Clear everything
  const clearAll = () => {
    setKeyword("");
    setCourses([]);

    router.replace(pathname, {
      scroll: false,
    });
  };

  return (
    <section className="min-w-0 space-y-6">
      <CourseHero
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={handleSearch}
        onSuggestionSelect={
          handleSuggestion
        }
        onClear={
          clearHeroSearch
        }
        loading={loading}
      />

      {showPendingCourse &&
        courses.length > 0 && (
          <div className="rounded-2xl border border-primary/20 bg-primary/[0.05] px-5 py-4">
            <p className="text-sm font-bold text-primary">
              This is the course you
              selected before signing
              in.
            </p>
          </div>
        )}

      <div
        className="
          grid
          min-w-0
          w-full
          grid-cols-1
          items-start
          gap-6

          lg:grid-cols-[270px_minmax(0,1fr)]

          xl:grid-cols-[300px_minmax(0,1fr)]
        "
      >
        <CourseFilters
          countryId={countryId}
          universityId={
            universityId
          }
          courseId={courseId}
          intake={intake}
          levels={levels}
          countryOptions={
            countryOptions
          }
          universityOptions={
            universityOptions
          }
          courseOptions={
            courseOptions
          }
          destinationsLoading={
            destinationsLoading
          }
          universitiesLoading={
            universitiesLoading
          }
          mainCoursesLoading={
            mainCoursesLoading
          }
          onCountryChange={
            handleCountryChange
          }
          onUniversityChange={
            handleUniversityChange
          }
          onCourseChange={
            handleCourseChange
          }
          onIntakeChange={
            handleIntakeChange
          }
          onToggleLevel={
            toggleLevel
          }
          onClear={clearAll}
        />

        <CourseResults
          courses={courses}
          loading={loading}
          error={error}
          keyword={urlKeyword}
        />
      </div>
    </section>
  );
}