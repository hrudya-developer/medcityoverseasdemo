import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  uid: null,
  email: "",
  rememberMe: false,
  otpRequested: false,
  isLoggedIn: false,
  hydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload ?? "";
    },

    setRememberMe: (state, action) => {
      state.rememberMe = Boolean(action.payload);
    },

    setOtpSession: (state, action) => {
      state.uid = action.payload?.uid ?? null;
      state.email = action.payload?.email ?? state.email;
      state.otpRequested = true;
    },

    restoreOtpSession: (state, action) => {
      state.uid = action.payload?.uid ?? null;
      state.email = action.payload?.email ?? "";
      state.otpRequested = Boolean(action.payload?.email);
      state.hydrated = true;
    },

    setCredentials: (state, action) => {
      const payload = action.payload ?? {};

      state.user = payload.user ?? null;
      state.token = payload.token ?? null;

      state.uid =
        payload.user?.uid ??
        payload.uid ??
        state.uid;

      state.email =
        payload.user?.email ??
        payload.email ??
        state.email;

      state.isLoggedIn = true;
      state.otpRequested = false;
    },

    restoreAuth: (state, action) => {
      Object.assign(state, action.payload ?? {}, {
        hydrated: true,
      });
    },

    markHydrated: (state) => {
      state.hydrated = true;
    },

    logout: () => ({
      ...initialState,
      hydrated: true,
    }),
  },
});

export const {
  setEmail,
  setRememberMe,
  setOtpSession,
  restoreOtpSession,
  setCredentials,
  restoreAuth,
  markHydrated,
  logout,
} = authSlice.actions;

export default authSlice.reducer;