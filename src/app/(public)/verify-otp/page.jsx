"use client";

import OtpCard from "./components/OtpCard";
import LoadingScreen from "./components/LoadingScreen";

import useOtpVerification from "./hooks/useOtpVerification";

export default function VerifyOtpPage() {
    const otp =
        useOtpVerification();

    if (!otp.sessionChecked) {
        return (
            <LoadingScreen
                text="Preparing verification..."
            />
        );
    }

    if (otp.redirecting) {
        return (
            <LoadingScreen
                text={
                    otp.redirectMessage ||
                    "Preparing your account..."
                }
            />
        );
    }

    if (!otp.email) {
        return (
            <LoadingScreen
                text="Returning to login..."
            />
        );
    }

    return (
        <OtpCard
            email={otp.email}
            otp={otp.otp}
            error={otp.error}
            loading={otp.isLoading}
            redirecting={
                otp.redirecting
            }
            setInputRef={
                otp.setInputRef
            }
            onChange={
                otp.handleChange
            }
            onKeyDown={
                otp.handleKeyDown
            }
            onPaste={
                otp.handlePaste
            }
            onSubmit={
                otp.handleSubmit
            }
            onDifferentEmail={
                otp.handleDifferentEmail
            }
        />
    );
}