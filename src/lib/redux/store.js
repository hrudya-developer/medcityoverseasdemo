import {
    configureStore,
} from "@reduxjs/toolkit";

import {
    setupListeners,
} from "@reduxjs/toolkit/query";

import {
    searchApi,
} from "@/lib/services/searchApi";

import {
    germanProgramsApi,
} from "@/lib/services/germanProgramsApi";

import {
    testimonialsApi,
} from "@/lib/services/testimonialsApi";

import {
    loginApi,
} from "@/lib/services/loginApi";

import authReducer from "@/lib/redux/slices/authSlice";

export const makeStore = () => {
    const store =
        configureStore({
            reducer: {
                auth:
                    authReducer,

                [searchApi.reducerPath]:
                    searchApi.reducer,

                [germanProgramsApi.reducerPath]:
                    germanProgramsApi.reducer,

                [testimonialsApi.reducerPath]:
                    testimonialsApi.reducer,

                [loginApi.reducerPath]:
                    loginApi.reducer,
            },

            middleware:
                (
                    getDefaultMiddleware
                ) =>
                    getDefaultMiddleware()
                        .concat(
                            searchApi.middleware,
                            germanProgramsApi.middleware,
                            testimonialsApi.middleware,
                            loginApi.middleware
                        ),

            devTools:
                process.env.NODE_ENV !==
                "production",
        });

    setupListeners(
        store.dispatch
    );

    return store;
};