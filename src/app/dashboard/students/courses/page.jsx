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
  const searchParams = useSearchParams();

  // ==========================================
  // READ STATE FROM URL
  // ==========================================

  const urlKeyword =
    searchParams.get("q") || "";

  const countryId =
    searchParams.get("country") || "";

  const universityId =
    searchParams.get("university") || "";

  const courseId =
    searchParams.get("course") || "";

  const intake =
    searchParams.get("intake") || "";

  const levels = useMemo(() => {
    const value =
      searchParams.get("levels") || "";

    return value
      ? value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
      : [];
  }, [searchParams]);

  const selectedType =
    searchParams.get("type") || "";

  const selectedId =
    searchParams.get("selectedId") || "";

  // Input is local UI state.
  // Submitted search remains in URL.
  const [keyword, setKeyword] =
    useState(urlKeyword);

  useEffect(() => {
    setKeyword(urlKeyword);
  }, [urlKeyword]);

  // ==========================================
  // UPDATE URL
  // ==========================================

  const updateUrl = useCallback(
    (updates = {}) => {
      const params =
        new URLSearchParams(
          searchParams.toString()
        );

      Object.entries(updates).forEach(
        ([key, value]) => {
          if (
            value === "" ||
            value === null ||
            value === undefined
          ) {
            params.delete(key);
            return;
          }

          if (Array.isArray(value)) {
            if (value.length === 0) {
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

      const query = params.toString();

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

  // ==========================================
  // DESTINATIONS
  // ==========================================

  const {
    data: destinations = [],
    isLoading: destinationsLoading,
  } = useGetDestinationsQuery(uid);

  // ==========================================
  // UNIVERSITIES
  // ==========================================

  const {
    data: universities = [],
    isLoading: universitiesLoading,
  } = useGetUniversitiesQuery(
    {
      countryId,
      uid,
    },
    {
      skip: !countryId,
    }
  );

  // ==========================================
  // MAIN COURSES
  // ==========================================

  const {
    data: mainCourses = [],
    isLoading: mainCoursesLoading,
  } = useGetMainCoursesQuery(
    {
      universityId,
      uid,
    },
    {
      skip: !universityId,
    }
  );

  // ==========================================
  // SEARCH
  // ==========================================

  const [
    searchCourses,
    {
      isFetching: loading,
      error,
    },
  ] = useLazySearchCoursesQuery();

  const [courses, setCourses] =
    useState([]);

  // ==========================================
  // OPTIONS
  // ==========================================

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

  // ==========================================
  // DETERMINE IF SEARCH EXISTS
  // ==========================================

  const hasSearch =
    Boolean(
      urlKeyword ||
      countryId ||
      universityId ||
      courseId ||
      intake ||
      levels.length ||
      selectedId
    );

  // ==========================================
  // EXECUTE SEARCH
  // ==========================================

  const executeSearch =
    useCallback(async () => {
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
      } catch (err) {
        console.error(
          "Course search failed:",
          err
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
      searchCourses,
    ]);

  // ==========================================
  // AUTO SEARCH FROM URL
  // ==========================================

  useEffect(() => {
    executeSearch();
  }, [executeSearch]);

  // ==========================================
  // HERO SEARCH
  // ==========================================

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
    });
  };

  // ==========================================
  // SUGGESTION SELECT
  // ==========================================

  const handleSuggestion = (
    item
  ) => {
    if (!item) return;

    const label =
      item?.label || "";

    setKeyword(label);

    updateUrl({
      q: label,

      type:
        item?.type || "",

      selectedId:
        item?.id || "",
    });
  };

  // ==========================================
  // COUNTRY
  // ==========================================

  const handleCountryChange = (
    value
  ) => {
    updateUrl({
      country: value,

      university: "",
      course: "",

      type: "",
      selectedId: "",
    });
  };

  // ==========================================
  // UNIVERSITY
  // ==========================================

  const handleUniversityChange = (
    value
  ) => {
    updateUrl({
      university: value,

      course: "",

      type: "",
      selectedId: "",
    });
  };

  // ==========================================
  // COURSE
  // ==========================================

  const handleCourseChange = (
    value
  ) => {
    updateUrl({
      course: value,

      type: "",
      selectedId: "",
    });
  };

  // ==========================================
  // INTAKE
  // ==========================================

  const handleIntakeChange = (
    value
  ) => {
    updateUrl({
      intake: value,
    });
  };

  // ==========================================
  // LEVEL
  // ==========================================

  const toggleLevel = (
    level
  ) => {
    const nextLevels =
      levels.includes(level)
        ? levels.filter(
          (item) =>
            item !== level
        )
        : [
          ...levels,
          level,
        ];

    updateUrl({
      levels: nextLevels,
    });
  };

  // ==========================================
  // CLEAR HERO
  // ==========================================

  const clearHeroSearch = () => {
    setKeyword("");

    updateUrl({
      q: "",
      type: "",
      selectedId: "",
    });
  };

  // ==========================================
  // CLEAR ALL
  // ==========================================

  const clearAll = () => {
    setKeyword("");

    router.replace(
      pathname,
      {
        scroll: false,
      }
    );

    setCourses([]);
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <section className="space-y-6">
      <CourseHero
        keyword={keyword}

        setKeyword={
          setKeyword
        }

        onSearch={
          handleSearch
        }

        onSuggestionSelect={
          handleSuggestion
        }

        onClear={
          clearHeroSearch
        }

        loading={
          loading
        }
      />

      <div
        className="
          grid
          grid-cols-1
          min-w-0
          w-full
          items-start
          gap-6
          lg:grid-cols-[270px_minmax(0,1fr)]
          xl:grid-cols-[300px_minmax(0,1fr)]
        "
      >
        <CourseFilters
          countryId={
            countryId
          }

          universityId={
            universityId
          }

          courseId={
            courseId
          }

          intake={
            intake
          }

          levels={
            levels
          }

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

          onClear={
            clearAll
          }
        />

        <CourseResults
          courses={
            courses
          }

          loading={
            loading
          }

          error={
            error
          }

          keyword={
            urlKeyword
          }
        />
      </div>
    </section>
  );
}