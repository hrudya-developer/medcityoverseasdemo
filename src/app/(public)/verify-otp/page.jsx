"use client";

import OtpCard from "./components/OtpCard";
import LoadingScreen from "./components/LoadingScreen";
import useOtpVerification from "./hooks/useOtpVerification";

export default function VerifyOtpPage() {
  const {
    email,
    otp,
    error,
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
  } = useOtpVerification();

  /*
   * Wait while the hook restores
   * the email from sessionStorage.
   */
  if (!sessionChecked) {
    return (
      <LoadingScreen text="Preparing verification..." />
    );
  }

  /*
   * OTP was verified and the hook
   * is checking the profile before
   * redirecting.
   */
  if (redirecting) {
    return (
      <LoadingScreen
        text={
          redirectMessage ||
          "Preparing your account..."
        }
      />
    );
  }

  /*
   * No email means that the user
   * did not arrive from login.
   */
  if (!email) {
    return (
      <LoadingScreen text="Returning to login..." />
    );
  }

  return (
    <OtpCard
      email={email}
      otp={otp}
      error={error}
      loading={isLoading}
      redirecting={redirecting}
      setInputRef={setInputRef}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onSubmit={handleSubmit}
      onDifferentEmail={
        handleDifferentEmail
      }
    />
  );
}