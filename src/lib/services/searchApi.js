import {
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const searchApi = createApi({
    reducerPath: "searchApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",

        prepareHeaders: (headers) => {
            headers.set(
                "Accept",
                "application/json"
            );

            return headers;
        },
    }),

    keepUnusedDataFor: 300,

    endpoints: (builder) => ({
        getDestinations: builder.query({
            query: (uid = 0) => ({
                url: "search/destinations",
                params: {
                    uid,
                },
            }),

            transformResponse: (response) =>
                Array.isArray(
                    response?.destinations
                )
                    ? response.destinations
                    : [],
        }),

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
                Array.isArray(
                    response?.universities
                )
                    ? response.universities
                    : [],
        }),

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
                Array.isArray(
                    response?.courses
                )
                    ? response.courses
                    : [],
        }),

        getPopularCourses: builder.query({
            query: (uid = 0) => ({
                url: "popular-courses",

                params: {
                    uid,
                },
            }),

            transformResponse: (response) => ({
                courses:
                    Array.isArray(
                        response?.courses
                    )
                        ? response.courses
                        : [],

                imagePath:
                    response?.imagePath || "",
            }),
        }),

        getAllDestinations: builder.query({
            query: (uid = 0) => ({
                url: "all-destinations",
                method: "POST",

                body: {
                    uid,
                },
            }),

            transformResponse: (response) => ({
                destinations:
                    Array.isArray(
                        response?.destinations
                    )
                        ? response.destinations
                        : [],

                imagePath:
                    response?.imagePath || "",
            }),

            transformErrorResponse: (response) => ({
                status: response?.status,

                message:
                    response?.data?.message ||
                    "Unable to load destinations.",
            }),
        }),

        searchCourses: builder.query({
            query: ({
                countryId,
                universityId,
                courseId,
                uid = 0,
                offset = 0,
            }) => ({
                url: "search/courses",

                params: {
                    countryId,
                    universityId,
                    courseId,
                    uid,
                    offset,
                },
            }),
        }),

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
    useGetUniversitiesQuery,
    useGetMainCoursesQuery,
    useGetPopularCoursesQuery,
    useLazySearchCoursesQuery,
    useGetCourseDetailsQuery,
    useGetAllDestinationsQuery,
} = searchApi;