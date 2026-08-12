"use client";

import { useState } from "react";
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

const OTP_SESSION_KEY = "medcity-otp-session";

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

export default function LoginRoutePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formError, setFormError] = useState("");

  const [
    sendLoginOtp,
    {
      isLoading,
      reset: resetSendOtp,
    },
  ] = useSendLoginOtpMutation();

  async function handleLogin({ email }) {
    const normalizedEmail = String(email ?? "")
      .trim()
      .toLowerCase();

    setFormError("");
    resetSendOtp();

    try {
      const response = await sendLoginOtp({
        email: normalizedEmail,
      }).unwrap();

      if (response?.status !== true) {
        throw new Error(
          response?.msg ||
          response?.message ||
          "Unable to send OTP.",
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
        }),
      );

      window.sessionStorage.setItem(
        OTP_SESSION_KEY,
        JSON.stringify({
          uid,
          email: normalizedEmail,
        }),
      );

      await Swal.fire({
        icon: "success",
        title: "OTP Sent",
        text: `A verification code was sent to ${normalizedEmail}.`,
        timer: 1100,
        showConfirmButton: false,
      });

      router.push("/verify-otp");
    } catch (error) {
      const message = getErrorMessage(error);

      setFormError(message);

      await Swal.fire({
        icon: "error",
        title: "Unable to send OTP",
        text: message,
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