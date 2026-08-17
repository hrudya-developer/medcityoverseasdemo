"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { useRouter } from "next/navigation";

import {
  useVerifyLoginOtpMutation,
} from "@/lib/services/loginApi";

import {
  restoreOtpSession,
  setCredentials,
} from "@/lib/redux/slices/authSlice";

const EMPTY_OTP = ["", "", "", ""];

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
    "Unable to verify OTP. Please try again."
  );
}

function isSuccess(value) {
  return (
    value === true ||
    value === 1 ||
    value === "1" ||
    value === "true"
  );
}

async function readJsonResponse(
  response,
  fallbackMessage
) {
  const contentType =
    response.headers.get(
      "content-type"
    ) || "";

  if (
    !contentType.includes(
      "application/json"
    )
  ) {
    throw new Error(fallbackMessage);
  }

  return response.json();
}

export default function useOtpVerification() {
  const router = useRouter();
  const dispatch = useDispatch();
  const inputs = useRef([]);

  const {
    uid,
    email,
    otpRequested,
    isLoggedIn,
  } = useSelector(
    (state) => state.auth
  );

  const [
    verifyLoginOtp,
    {
      isLoading,
      reset: resetVerification,
    },
  ] = useVerifyLoginOtpMutation();

  const [otp, setOtp] =
    useState([...EMPTY_OTP]);

  const [error, setError] =
    useState("");

  const [
    sessionChecked,
    setSessionChecked,
  ] = useState(false);

  const [
    redirecting,
    setRedirecting,
  ] = useState(false);

  const [
    redirectMessage,
    setRedirectMessage,
  ] = useState("");

  /*
   * Restore OTP email after a page refresh.
   */
  useEffect(() => {
    if (email) {
      setSessionChecked(true);
      return;
    }

    const storedValue =
      window.sessionStorage.getItem(
        OTP_SESSION_KEY
      );

    if (!storedValue) {
      setSessionChecked(true);
      return;
    }

    try {
      const storedSession =
        JSON.parse(storedValue);

      const storedEmail = String(
        storedSession?.email || ""
      )
        .trim()
        .toLowerCase();

      const storedUid =
        storedSession?.uid ?? null;

      if (storedEmail) {
        dispatch(
          restoreOtpSession({
            email: storedEmail,
            uid: storedUid,
          })
        );
      }
    } catch (storageError) {
      console.error(
        "OTP session restore failed:",
        storageError
      );

      window.sessionStorage.removeItem(
        OTP_SESSION_KEY
      );
    } finally {
      setSessionChecked(true);
    }
  }, [dispatch, email]);

  /*
   * Prevent direct access to the OTP page.
   */
  useEffect(() => {
    if (
      !sessionChecked ||
      redirecting
    ) {
      return;
    }

    if (email) {
      requestAnimationFrame(() => {
        inputs.current[0]?.focus();
      });

      return;
    }

    router.replace("/login");
  }, [
    email,
    redirecting,
    router,
    sessionChecked,
  ]);

  function setInputRef(
    index,
    element
  ) {
    inputs.current[index] = element;
  }

  function clearError() {
    setError("");
    resetVerification?.();
  }

  function handleChange(
    value,
    index
  ) {
    const digit = String(value)
      .replace(/\D/g, "")
      .slice(-1);

    clearError();

    setOtp((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });

    if (
      digit &&
      index < EMPTY_OTP.length - 1
    ) {
      inputs.current[
        index + 1
      ]?.focus();
    }
  }

  function handleKeyDown(
    event,
    index
  ) {
    if (
      event.key === "Backspace" &&
      otp[index]
    ) {
      event.preventDefault();

      setOtp((current) => {
        const next = [...current];
        next[index] = "";
        return next;
      });

      return;
    }

    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      event.preventDefault();

      setOtp((current) => {
        const next = [...current];
        next[index - 1] = "";
        return next;
      });

      inputs.current[
        index - 1
      ]?.focus();

      return;
    }

    if (
      event.key === "ArrowLeft" &&
      index > 0
    ) {
      event.preventDefault();

      inputs.current[
        index - 1
      ]?.focus();

      return;
    }

    if (
      event.key === "ArrowRight" &&
      index < EMPTY_OTP.length - 1
    ) {
      event.preventDefault();

      inputs.current[
        index + 1
      ]?.focus();
    }
  }

  function handlePaste(event) {
    event.preventDefault();

    const pasted =
      event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, EMPTY_OTP.length);

    if (!pasted) return;

    const next = [...EMPTY_OTP];

    pasted
      .split("")
      .forEach((digit, index) => {
        next[index] = digit;
      });

    setOtp(next);
    clearError();

    const focusIndex =
      Math.min(
        pasted.length,
        EMPTY_OTP.length
      ) - 1;

    requestAnimationFrame(() => {
      inputs.current[
        Math.max(focusIndex, 0)
      ]?.focus();
    });
  }

  /*
   * Uses the profile-status route that
   * already exists in your project.
   */
  async function getProfileStatus() {
    const response = await fetch(
      "/api/dashboard/student/profile/profile-status",
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      }
    );

    const data =
      await readJsonResponse(
        response,
        "Profile-status API returned an invalid response."
      );

    if (!response.ok) {
      throw new Error(
        data?.msg ||
          data?.message ||
          "Unable to check your profile."
      );
    }

    return data;
  }

  async function redirectAfterOtpVerification() {
    const profileResult =
      await getProfileStatus();
  
    const pendingCourse =
      window.sessionStorage.getItem(
        "pendingApplyCourse"
      );
  
    const hasPendingCourse =
      Boolean(pendingCourse);
  
    /*
     * New user or incomplete profile:
     * complete profile first.
     */
    if (!profileResult?.completed) {
      router.replace(
        hasPendingCourse
          ? "/register-user-profile?next=course"
          : "/register-user-profile"
      );
  
      return;
    }
  
    /*
     * Existing user who clicked Apply Now:
     * open dashboard course tab.
     */
    if (hasPendingCourse) {
      router.replace(
        "/dashboard/students/courses?selected=pending"
      );
  
      return;
    }
  
    /*
     * Normal login:
     * open normal dashboard.
     */
    router.replace(
      "/dashboard/students"
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      isLoading ||
      redirecting
    ) {
      return;
    }

    const enteredOtp =
      otp.join("");

    if (!email) {
      setError(
        "Email session is missing. Please login again."
      );

      return;
    }

    if (
      enteredOtp.length !==
        EMPTY_OTP.length ||
      !/^\d+$/.test(enteredOtp)
    ) {
      setError(
        `Please enter the complete ${EMPTY_OTP.length}-digit OTP.`
      );

      return;
    }

    setError("");

    try {
      const response =
        await verifyLoginOtp({
          email,
          otp: enteredOtp,
        }).unwrap();

      if (
        !isSuccess(
          response?.status
        )
      ) {
        throw new Error(
          response?.msg ||
            response?.message ||
            "Invalid OTP."
        );
      }

      /*
       * Confirm that the verification
       * route created the session cookie.
       */
      const sessionResponse =
        await fetch(
          "/api/auth/session",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

      const sessionData =
        await readJsonResponse(
          sessionResponse,
          "Session API returned an invalid response."
        );

      if (
        !sessionResponse.ok ||
        sessionData
          ?.authenticated !== true
      ) {
        throw new Error(
          "OTP was verified, but the login session could not be created."
        );
      }

      const responseData =
        response?.data || {};

      const responseUser =
        response?.user ||
        responseData?.user ||
        {};

      const sessionUser =
        sessionData?.user || {};

      const verifiedUid =
        sessionUser?.uid ??
        responseUser?.uid ??
        response?.uid ??
        responseData?.uid ??
        uid ??
        null;

      const verifiedEmail = String(
        sessionUser?.email ??
          responseUser?.email ??
          response?.email ??
          responseData?.email ??
          email
      )
        .trim()
        .toLowerCase();

      const verifiedName =
        sessionUser?.name ??
        responseUser?.name ??
        response?.name ??
        responseData?.name ??
        "";

      dispatch(
        setCredentials({
          user: {
            uid: verifiedUid,
            email: verifiedEmail,
            name: verifiedName,
          },
          uid: verifiedUid,
          email: verifiedEmail,
        })
      );

      /*
       * Remove only temporary OTP data.
       * Do not remove the application
       * redirect information here.
       */
      window.sessionStorage.removeItem(
        OTP_SESSION_KEY
      );

      setRedirecting(true);

      setRedirectMessage(
        "Preparing your account..."
      );

      await redirectAfterOtpVerification();
    } catch (requestError) {
      console.error(
        "OTP verification failed:",
        requestError
      );

      setRedirecting(false);
      setRedirectMessage("");

      setError(
        getErrorMessage(
          requestError
        )
      );

      setOtp([...EMPTY_OTP]);

      requestAnimationFrame(() => {
        inputs.current[0]?.focus();
      });
    }
  }

  function handleDifferentEmail() {
    if (
      isLoading ||
      redirecting
    ) {
      return;
    }

    window.sessionStorage.removeItem(
      OTP_SESSION_KEY
    );

    /*
     * Keep pendingApplyCourse and
     * loginRedirectType so the selected
     * course survives another login.
     */
    setOtp([...EMPTY_OTP]);
    setError("");
    setRedirectMessage("");

    router.replace("/login");
  }

  return {
    email,
    otp,
    error,
    otpRequested,
    isLoggedIn,
    isLoading,
    sessionChecked,
    redirecting,
    redirectMessage,
    setInputRef,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleSubmit,
    handleDifferentEmail,
  };
}