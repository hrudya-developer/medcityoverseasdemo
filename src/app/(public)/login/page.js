"use client";

import {
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import LoginPage from "./components/LoginPage";

import {
  useSendLoginOtpMutation,
} from "@/lib/services/loginApi";

import {
  setOtpSession,
} from "@/lib/redux/slices/authSlice";

const OTP_SESSION_KEY =
  "medcity-otp-session";

const PENDING_COURSE_KEY =
  "pendingApplyCourse";

const REDIRECT_TYPE_KEY =
  "loginRedirectType";

function getErrorMessage(error) {
  return (
    error?.data?.msg ||
    error?.data?.message ||
    error?.data?.error ||
    error?.error ||
    error?.message ||
    "Unable to send OTP. Please try again."
  );
}

/*
 * Determine whether the user entered
 * login through an Apply Now button.
 */
function synchronizeLoginIntent() {
  const searchParams =
    new URLSearchParams(
      window.location.search
    );

  const hasApplyIntent =
    searchParams.get("intent") ===
    "applyCourse";

  const pendingCourse =
    window.sessionStorage.getItem(
      PENDING_COURSE_KEY
    );

  /*
   * Preserve application flow only
   * when both the URL intent and
   * selected course are available.
   */
  if (
    hasApplyIntent &&
    pendingCourse
  ) {
    window.sessionStorage.setItem(
      REDIRECT_TYPE_KEY,
      "applyCourse"
    );

    return true;
  }

  /*
   * This is a normal login.
   * Remove an older pending course
   * so it cannot affect redirects.
   */
  window.sessionStorage.removeItem(
    PENDING_COURSE_KEY
  );

  window.sessionStorage.removeItem(
    REDIRECT_TYPE_KEY
  );

  return false;
}

export default function LoginRoutePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [
    formError,
    setFormError,
  ] = useState("");

  const [
    sendLoginOtp,
    {
      isLoading,
      reset: resetSendOtp,
    },
  ] = useSendLoginOtpMutation();

  /*
   * Clean stale application state when
   * the normal login page is opened.
   */
  useEffect(() => {
    synchronizeLoginIntent();
  }, []);

  async function handleLogin({
    email,
  }) {
    const normalizedEmail = String(
      email ?? ""
    )
      .trim()
      .toLowerCase();

    if (!normalizedEmail) {
      setFormError(
        "Please enter your email address."
      );

      return;
    }

    /*
     * Recheck immediately before sending
     * OTP in case the URL has changed.
     */
    synchronizeLoginIntent();

    setFormError("");
    resetSendOtp?.();

    try {
      const response =
        await sendLoginOtp({
          email: normalizedEmail,
        }).unwrap();

      if (
        response?.status !== true
      ) {
        throw new Error(
          response?.msg ||
            response?.message ||
            "Unable to send OTP."
        );
      }

      const uid =
        response?.uid ??
        response?.data?.uid ??
        null;

      dispatch(
        setOtpSession({
          uid,
          email: normalizedEmail,
        })
      );

      window.sessionStorage.setItem(
        OTP_SESSION_KEY,
        JSON.stringify({
          uid,
          email: normalizedEmail,
        })
      );

      await Swal.fire({
        icon: "success",
        title: "OTP Sent",
        text: `A verification code was sent to ${normalizedEmail}.`,
        timer: 1100,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      router.push("/verify-otp");
    } catch (error) {
      const message =
        getErrorMessage(error);

      setFormError(message);

      await Swal.fire({
        icon: "error",
        title: "Unable to Send OTP",
        text: message,
        confirmButtonColor:
          "#c01f53",
      });
    }
  }

  return (
    <LoginPage
      onSubmit={handleLogin}
      loading={isLoading}
      error={formError}
    />
  );
}