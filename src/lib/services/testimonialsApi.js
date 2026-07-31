import {
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const testimonialsApi =
    createApi({
        reducerPath:
            "testimonialsApi",

        baseQuery: fetchBaseQuery({
            baseUrl: "/api",

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

        endpoints: (builder) => ({
            getTestimonials:
                builder.query({
                    query: () => ({
                        url: "/testimonials",
                        method: "GET",
                    }),

                    transformResponse: (
                        response
                    ) =>
                        Array.isArray(
                            response
                                ?.testimonials
                        )
                            ? response.testimonials
                            : [],

                    transformErrorResponse: (
                        response
                    ) => ({
                        status:
                            response?.status,

                        message:
                            response?.data
                                ?.message ||
                            "Unable to load testimonials.",
                    }),
                }),
        }),
    });

export const {
    useGetTestimonialsQuery,
} = testimonialsApi;