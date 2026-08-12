import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const normalizeSearchResponse = (response) => ({
  courses: Array.isArray(response?.courses)
    ? response.courses
    : [],

  nextOffset:
    response?.nextOffset ??
    response?.nextoffset ??
    response?.next_offset ??
    null,

  total:
    response?.total ??
    response?.totalCount ??
    response?.total_count ??
    null,

  imagePath:
    response?.imagePath ??
    response?.image_path ??
    "",
});

export const searchApi = createApi({
  reducerPath: "searchApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",

    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),

  keepUnusedDataFor: 300,

  endpoints: (builder) => ({
    // ==========================================
    // DESTINATIONS
    // ==========================================

    getDestinations: builder.query({
      query: (uid = 0) => ({
        url: "search/destinations",
        params: { uid },
      }),

      transformResponse: (response) =>
        Array.isArray(response?.destinations)
          ? response.destinations
          : [],
    }),

    getAllDestinations: builder.query({
      query: (uid = 0) => ({
        url: "all-destinations",
        method: "POST",
        body: { uid },
      }),
    }),

    // ==========================================
    // UNIVERSITIES
    // ==========================================

    getUniversities: builder.query({
      query: ({
        countryId,
        uid = 0,
      }) => ({
        url: "search/universities",

        params: {
          countryId,
          uid,
        },
      }),

      transformResponse: (response) =>
        Array.isArray(response?.universities)
          ? response.universities
          : [],
    }),

    // ==========================================
    // MAIN COURSES
    // ==========================================

    getMainCourses: builder.query({
      query: ({
        universityId,
        uid = 0,
      }) => ({
        url: "search/main-courses",

        params: {
          universityId,
          uid,
        },
      }),

      transformResponse: (response) =>
        Array.isArray(response?.courses)
          ? response.courses
          : [],
    }),

    getPopularCourses: builder.query({
      query: (uid = 0) => ({
        url: "popular-courses",
        params: { uid },
      }),
    }),

    // ==========================================
    // SEARCH SUGGESTIONS
    // ==========================================

    searchSuggestions: builder.query({
      query: (keyword) => ({
        url: "search/suggestions",

        params: {
          keyword: keyword?.trim() || "",
        },
      }),

      transformResponse: (response) =>
        Array.isArray(response?.suggestions)
          ? response.suggestions
          : [],
    }),

    // ==========================================
    // COURSE SEARCH
    // ==========================================

    searchCourses: builder.query({
      query: ({
        uid = 0,

        keyword = "",

        countryId = "",
        universityId = "",
        courseId = "",

        selectedType = "",
        selectedId = "",

        intake = "",
        levels = [],

        offset = 0,
      }) => ({
        url: "search/keyword-search",

        params: {
          uid,
          offset,

          ...(keyword.trim() && {
            keyword: keyword.trim(),
          }),

          ...(countryId && {
            countryId,
          }),

          ...(universityId && {
            universityId,
          }),

          ...(courseId && {
            courseId,
          }),

          ...(selectedType && {
            selectedType,
          }),

          ...(selectedId && {
            selectedId,
          }),

          ...(intake && {
            intake,
          }),

          ...(Array.isArray(levels) &&
            levels.length > 0 && {
              levels: levels.join(","),
            }),
        },
      }),

      transformResponse: normalizeSearchResponse,

      transformErrorResponse: (response) => ({
        status: response?.status,

        message:
          response?.data?.message ||
          "Unable to search courses.",
      }),
    }),

    // ==========================================
    // COURSE DETAILS
    // ==========================================

    getCourseDetails: builder.query({
      query: ({
        courseId,
        uid = 0,
      }) => ({
        url: "search/course-details",

        params: {
          courseId,
          uid,
        },
      }),

      transformResponse: (response) =>
        response?.course || null,
    }),
  }),
});

export const {
  useGetDestinationsQuery,
  useGetAllDestinationsQuery,
  useGetUniversitiesQuery,
  useGetMainCoursesQuery,
  useGetPopularCoursesQuery,

  useLazySearchSuggestionsQuery,
  useLazySearchCoursesQuery,

  useGetCourseDetailsQuery,
} = searchApi;