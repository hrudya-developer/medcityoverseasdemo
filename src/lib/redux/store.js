import {
    configureStore,
} from "@reduxjs/toolkit";

import {
    searchApi,
} from "@/lib/services/searchApi";

import {
    germanProgramsApi,
} from "@/lib/services/germanProgramsApi";

import {
    testimonialsApi,
} from "@/lib/services/testimonialsApi";

export const makeStore = () =>
    configureStore({
        reducer: {
            [searchApi.reducerPath]:
                searchApi.reducer,

            [germanProgramsApi.reducerPath]:
                germanProgramsApi.reducer,

            [testimonialsApi.reducerPath]:
                testimonialsApi.reducer,
        },

        middleware: (
            getDefaultMiddleware
        ) =>
            getDefaultMiddleware().concat(
                searchApi.middleware,
                germanProgramsApi.middleware,
                testimonialsApi.middleware
            ),

        devTools:
            process.env.NODE_ENV !==
            "production",
    });