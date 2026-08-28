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

  if (!sessionChecked) {
    return (
      <LoadingScreen text="Preparing verification..." />
    );
  }

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