import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

/* =========================================================
   NORMALIZE SEARCH RESPONSE
   ========================================================= */

const normalizeSearchResponse = (
  response
) => ({
  courses: Array.isArray(
    response?.courses
  )
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

/* =========================================================
   SEARCH API
   ========================================================= */

export const searchApi =
  createApi({
    reducerPath: "searchApi",

    baseQuery:
      fetchBaseQuery({
        baseUrl: "/api/",

        prepareHeaders: (
          headers
        ) => {
          headers.set(
            "Accept",
            "application/json"
          );

          return headers;
        },
      }),

    keepUnusedDataFor: 300,

    endpoints: (
      builder
    ) => ({
      /* =====================================================
         DESTINATIONS
         ===================================================== */

      getDestinations:
        builder.query({
          query: (
            uid = 0
          ) => ({
            url:
              "search/destinations",

            params: {
              uid,
            },
          }),

          transformResponse: (
            response
          ) =>
            Array.isArray(
              response?.destinations
            )
              ? response.destinations
              : [],
        }),

      getAllDestinations:
        builder.query({
          query: (
            uid = 0
          ) => ({
            url:
              "all-destinations",

            method:
              "POST",

            body: {
              uid,
            },
          }),
        }),

      /* =====================================================
         UNIVERSITIES
         ===================================================== */

      getUniversities:
        builder.query({
          query: ({
            countryId,
            uid = 0,
          }) => ({
            url:
              "search/universities",

            params: {
              countryId,
              uid,
            },
          }),

          transformResponse: (
            response
          ) =>
            Array.isArray(
              response?.universities
            )
              ? response.universities
              : [],
        }),

      /* =====================================================
         MAIN COURSES
         ===================================================== */

      getMainCourses:
        builder.query({
          query: ({
            universityId,
            uid = 0,
          }) => ({
            url:
              "search/main-courses",

            params: {
              universityId,
              uid,
            },
          }),

          transformResponse: (
            response
          ) =>
            Array.isArray(
              response?.courses
            )
              ? response.courses
              : [],
        }),

      /* =====================================================
         POPULAR COURSES
         ===================================================== */

      getPopularCourses:
        builder.query({
          query: (
            uid = 0
          ) => ({
            url:
              "popular-courses",

            params: {
              uid,
            },
          }),
        }),

      /* =====================================================
         SEARCH SUGGESTIONS
         ===================================================== */

      searchSuggestions:
        builder.query({
          query: (
            keyword
          ) => ({
            url:
              "search/suggestions",

            params: {
              keyword:
                keyword?.trim() ||
                "",
            },
          }),

          transformResponse: (
            response
          ) =>
            Array.isArray(
              response?.suggestions
            )
              ? response.suggestions
              : [],
        }),

      /* =====================================================
         COURSE SEARCH
         ===================================================== */

      searchCourses:
        builder.query({
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
            url:
              "search/keyword-search",

            params: {
              uid,
              offset,

              ...(keyword.trim() && {
                keyword:
                  keyword.trim(),
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

              ...(Array.isArray(
                levels
              ) &&
                levels.length >
                  0 && {
                  levels:
                    levels.join(
                      ","
                    ),
                }),
            },
          }),

          transformResponse:
            normalizeSearchResponse,

          transformErrorResponse: (
            response
          ) => ({
            status:
              response?.status,

            message:
              response?.data
                ?.message ||
              "Unable to search courses.",
          }),
        }),

      /* =====================================================
         EXISTING COURSE DETAILS
         
         IMPORTANT:
         Keep this unchanged.
         Other pages may already depend on it.
         ===================================================== */

      getCourseDetails:
        builder.query({
          query: ({
            courseId,
            uid = 0,
          }) => ({
            url:
              "search/course-details",

            params: {
              courseId,
              uid,
            },
          }),

          transformResponse: (
            response
          ) =>
            response?.course ||
            null,
        }),

      /* =====================================================
         PUBLIC COURSE DETAILS BY SLUG

         Used only for:

         /courses/[slug]

         Example:
         /courses/ba-in-international-relations

         Browser sees only slug.

         Public API route internally:
         slug -> real course ID -> getCoursedetails

         uid is always 0 because this is public.
         ===================================================== */

         getPublicCourseDetails:
         builder.query({
           query: ({
             slug,
           }) => ({
             url:
               "search/course-details-public",
       
             params: {
               courseId:
                 slug,
       
               uid: 0,
             },
           }),
       
           transformResponse: (
             response
           ) =>
             response ||
             null,
       
           transformErrorResponse: (
             response
           ) => ({
             status:
               response?.status,
       
             message:
               response?.data
                 ?.message ||
               response?.data
                 ?.error ||
               "Unable to load course details.",
           }),
         }),
    }),
  });

/* =========================================================
   HOOKS
   ========================================================= */

export const {
  useGetDestinationsQuery,

  useGetAllDestinationsQuery,

  useGetUniversitiesQuery,

  useGetMainCoursesQuery,

  useGetPopularCoursesQuery,

  useLazySearchSuggestionsQuery,

  useLazySearchCoursesQuery,

  /*
   * EXISTING.
   * Keep for dashboard / older pages.
   */
  useGetCourseDetailsQuery,

  /*
   * NEW.
   * Use only for public /courses/[slug].
   */
  useGetPublicCourseDetailsQuery,
} = searchApi;