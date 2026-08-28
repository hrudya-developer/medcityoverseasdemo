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

import CourseFilters from "./CourseFilters";
import CourseResults from "./CourseResults";
import { createSlug } from "@/lib/slug";

export default function CourseFinder() {
  const uid = 0;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlKeyword =
    searchParams.get("q") || "";

  const countryParam =
    searchParams.get("country") || "";

  const universityParam =
    searchParams.get("university") || "";

  const courseParam =
    searchParams.get("course") || "";

  const intake =
    searchParams.get("intake") || "";

  const selectedType =
    searchParams.get("type") || "";

  const selectedId =
    searchParams.get("selectedId") || "";

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

  const [courses, setCourses] =
    useState([]);

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
            if (!value.length) {
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

  /*
   * DESTINATIONS
   */
  const {
    data: destinations = [],
    isLoading:
      destinationsLoading,
  } =
    useGetDestinationsQuery(uid);

  const countryId = useMemo(() => {
    if (!countryParam) return "";
    if (/^\d+$/.test(countryParam)) return countryParam;
    const found = destinations.find(
      (item) =>
        createSlug(item?.name ?? item?.country ?? item?.destination ?? "") ===
        countryParam
    );
    return found ? String(found.id ?? found.d_id ?? "") : "";
  }, [countryParam, destinations]);

  /*
   * UNIVERSITIES
   */
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

  const universityId = useMemo(() => {
    if (!universityParam) return "";
    if (/^\d+$/.test(universityParam)) return universityParam;
    const found = universities.find(
      (item) =>
        createSlug(item?.name ?? item?.university ?? "") === universityParam
    );
    return found ? String(found.id ?? found.u_id ?? "") : "";
  }, [universityParam, universities]);

  /*
   * COURSES
   */
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

  const courseId = useMemo(() => {
    if (!courseParam) return "";
    if (/^\d+$/.test(courseParam)) return courseParam;
    const found = mainCourses.find(
      (item) =>
        createSlug(item?.name ?? item?.course ?? item?.course_name ?? "") ===
        courseParam
    );
    return found ? String(found.id ?? found.c_id ?? "") : "";
  }, [courseParam, mainCourses]);

  /*
   * SEARCH
   */
  const [
    searchCourses,
    {
      isFetching: loading,
      error,
    },
  ] = useLazySearchCoursesQuery();

  /*
   * COUNTRY OPTIONS
   */
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

  /*
   * UNIVERSITY OPTIONS
   */
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

  /*
   * COURSE OPTIONS
   */
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

  /*
   * CHECK IF ANY SEARCH EXISTS
   */
  const hasSearch = Boolean(
    urlKeyword ||
      countryId ||
      universityId ||
      courseId ||
      intake ||
      levels.length ||
      selectedId
  );

  /*
   * EXECUTE SEARCH
   */
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
      } catch (searchError) {
        console.error(
          "Course search failed:",
          searchError
        );

        setCourses([]);
      }
    }, [
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

  useEffect(() => {
    executeSearch();
  }, [executeSearch]);

  /*
   * COUNTRY
   */
  const handleCountryChange = (
    value
  ) => {
    const selectedItem = destinations.find(
      (item) => String(item?.id ?? item?.d_id ?? "") === String(value)
    );
    const slug = selectedItem
      ? createSlug(selectedItem.name ?? selectedItem.country ?? selectedItem.destination)
      : value;

    updateUrl({
      country: slug,
      university: "",
      course: "",
      type: "",
      selectedId: "",
    });
  };

  /*
   * UNIVERSITY
   */
  const handleUniversityChange = (
    value
  ) => {
    const selectedItem = universities.find(
      (item) => String(item?.id ?? item?.u_id ?? "") === String(value)
    );
    const slug = selectedItem
      ? createSlug(selectedItem.name ?? selectedItem.university)
      : value;

    updateUrl({
      university: slug,
      course: "",
      type: "",
      selectedId: "",
    });
  };

  /*
   * COURSE
   */
  const handleCourseChange = (
    value
  ) => {
    const selectedItem = mainCourses.find(
      (item) => String(item?.id ?? item?.c_id ?? "") === String(value)
    );
    const slug = selectedItem
      ? createSlug(selectedItem.name ?? selectedItem.course ?? selectedItem.course_name)
      : value;

    updateUrl({
      course: slug,
      type: "",
      selectedId: "",
    });
  };

  /*
   * INTAKE
   */
  const handleIntakeChange = (
    value
  ) => {
    updateUrl({
      intake: value,
    });
  };

  /*
   * LEVEL
   */
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
    });
  };

  /*
   * CLEAR
   */
  const clearAll = () => {
    setCourses([]);

    router.replace(pathname, {
      scroll: false,
    });
  };

  return (
    <section
      className="
        mx-auto
        w-full
        max-w-[1500px]
        px-4
        py-10
        sm:px-6
        lg:px-8
      "
    >
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