import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/auth",
  credentials: "include",

  prepareHeaders: (headers) => {
    headers.set("accept", "application/json");
    return headers;
  },
});

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery,

  endpoints: (builder) => ({
    sendLoginOtp: builder.mutation({
      query: ({ email }) => ({
        url: "/send-otp",
        method: "POST",
        body: {
          email: email.trim().toLowerCase(),
        },
      }),
    }),

    verifyLoginOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/verify-otp",
        method: "POST",
        body: {
          email: email.trim().toLowerCase(),
          otp: String(otp).trim(),
        },
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSendLoginOtpMutation,
  useVerifyLoginOtpMutation,
  useLogoutUserMutation,
} = loginApi;