import { configureStore } from "@reduxjs/toolkit";

import { searchApi } from "@/lib/services/searchApi";
import { germanProgramsApi } from "@/lib/services/germanProgramsApi";

export const makeStore = () =>
    configureStore({
        reducer: {
            [searchApi.reducerPath]: searchApi.reducer,
            [germanProgramsApi.reducerPath]:
                germanProgramsApi.reducer,
        },

        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                searchApi.middleware,
                germanProgramsApi.middleware
            ),

        devTools:
            process.env.NODE_ENV !== "production",
    });