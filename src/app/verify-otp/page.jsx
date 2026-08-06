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
const OTP_SESSION_KEY = "medcity-otp-session";

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

function OtpIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="
        h-8 w-8 fill-none stroke-current
        stroke-[1.8]
        [stroke-linecap:round]
        [stroke-linejoin:round]
      "
        >
            <rect
                x="4"
                y="10"
                width="16"
                height="10"
                rx="2"
            />

            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            <path d="M12 14v2" />
        </svg>
    );
}

function LoadingScreen() {
    return (
        <main
            className="
        relative grid
        min-h-[calc(100dvh-140px)]
        place-items-center overflow-hidden
        bg-[#080611] px-4 text-white
      "
        >
            <div
                aria-hidden="true"
                className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_15%_20%,rgba(190,20,83,0.24),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(79,45,145,0.28),transparent_34%),linear-gradient(145deg,#080611,#11091d_52%,#080611)]
        "
            />

            <div
                className="
          relative z-10 flex items-center gap-3
          rounded-2xl border border-white/10
          bg-white/[0.07] px-5 py-4
          text-sm text-white/70
          shadow-[0_20px_55px_rgba(0,0,0,0.4)]
          backdrop-blur-xl
        "
            >
                <span
                    aria-hidden="true"
                    className="
            h-5 w-5 animate-spin rounded-full
            border-2 border-white/20
            border-t-pink-500
          "
                />

                Loading verification...
            </div>
        </main>
    );
}

export default function VerifyOtpPage() {
    const router = useRouter();
    const dispatch = useDispatch();

    const {
        uid,
        email,
        otpRequested,
        isLoggedIn,
    } = useSelector((state) => state.auth);

    const [
        verifyLoginOtp,
        {
            isLoading,
            reset: resetVerification,
        },
    ] = useVerifyLoginOtpMutation();

    const [otp, setOtp] = useState([
        ...EMPTY_OTP,
    ]);

    const [error, setError] = useState("");
    const [sessionChecked, setSessionChecked] =
        useState(false);

    const [redirecting, setRedirecting] =
        useState(false);

    const inputs = useRef([]);

    useEffect(() => {
        if (isLoggedIn) {
            setSessionChecked(true);
            return;
        }

        if (otpRequested && email) {
            setSessionChecked(true);
            return;
        }

        const storedValue =
            window.sessionStorage.getItem(
                OTP_SESSION_KEY,
            );

        if (!storedValue) {
            setSessionChecked(true);
            return;
        }

        try {
            const storedSession =
                JSON.parse(storedValue);

            const storedEmail = String(
                storedSession?.email ?? "",
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
                    }),
                );
            } else {
                window.sessionStorage.removeItem(
                    OTP_SESSION_KEY,
                );
            }
        } catch {
            window.sessionStorage.removeItem(
                OTP_SESSION_KEY,
            );
        } finally {
            setSessionChecked(true);
        }
    }, [
        dispatch,
        email,
        otpRequested,
        isLoggedIn,
    ]);

    useEffect(() => {
        if (!sessionChecked || redirecting) {
            return;
        }

        if (isLoggedIn) {
            router.replace(
                "/dashboard/students",
            );
            return;
        }

        if (!otpRequested || !email) {
            router.replace("/login");
            return;
        }

        requestAnimationFrame(() => {
            inputs.current[0]?.focus();
        });
    }, [
        sessionChecked,
        redirecting,
        isLoggedIn,
        otpRequested,
        email,
        router,
    ]);

    function clearVerificationError() {
        setError("");
        resetVerification();
    }

    function handleChange(value, index) {
        const digit = value
            .replace(/\D/g, "")
            .slice(-1);

        clearVerificationError();

        setOtp((currentOtp) => {
            const nextOtp = [...currentOtp];
            nextOtp[index] = digit;
            return nextOtp;
        });

        if (
            digit &&
            index < EMPTY_OTP.length - 1
        ) {
            inputs.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(event, index) {
        if (
            event.key === "Backspace" &&
            otp[index]
        ) {
            event.preventDefault();

            setOtp((currentOtp) => {
                const nextOtp = [...currentOtp];
                nextOtp[index] = "";
                return nextOtp;
            });

            return;
        }

        if (
            event.key === "Backspace" &&
            !otp[index] &&
            index > 0
        ) {
            event.preventDefault();

            setOtp((currentOtp) => {
                const nextOtp = [...currentOtp];
                nextOtp[index - 1] = "";
                return nextOtp;
            });

            inputs.current[index - 1]?.focus();
            return;
        }

        if (
            event.key === "ArrowLeft" &&
            index > 0
        ) {
            event.preventDefault();
            inputs.current[index - 1]?.focus();
        }

        if (
            event.key === "ArrowRight" &&
            index < EMPTY_OTP.length - 1
        ) {
            event.preventDefault();
            inputs.current[index + 1]?.focus();
        }
    }

    function handlePaste(event) {
        event.preventDefault();

        const pastedValue =
            event.clipboardData
                .getData("text")
                .replace(/\D/g, "")
                .slice(0, 4);

        if (!pastedValue) {
            return;
        }

        const nextOtp = [...EMPTY_OTP];

        pastedValue
            .split("")
            .forEach((digit, index) => {
                nextOtp[index] = digit;
            });

        setOtp(nextOtp);
        clearVerificationError();

        const focusIndex = Math.min(
            pastedValue.length,
            EMPTY_OTP.length - 1,
        );

        requestAnimationFrame(() => {
            inputs.current[focusIndex]?.focus();
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const enteredOtp = otp.join("");

        if (!email) {
            setError(
                "Email session is missing. Please request another OTP.",
            );
            return;
        }

        if (!/^\d{4}$/.test(enteredOtp)) {
            setError(
                "Enter the complete 4 digit OTP.",
            );
            return;
        }

        if (isLoading || redirecting) {
            return;
        }

        setError("");

        try {
            const response =
                await verifyLoginOtp({
                    email,
                    otp: enteredOtp,
                }).unwrap();

            if (response?.status !== true) {
                setError(
                    response?.msg ||
                    response?.message ||
                    "Invalid OTP.",
                );
                return;
            }

            const responseData =
                response?.data ?? {};

            const verifiedUid =
                response?.uid ??
                responseData?.uid ??
                uid ??
                null;

            const verifiedEmail = String(
                response?.email ??
                responseData?.email ??
                email,
            )
                .trim()
                .toLowerCase();

            const name =
                response?.name ??
                responseData?.name ??
                null;

            const token =
                response?.token ??
                responseData?.token ??
                null;

            setRedirecting(true);

            dispatch(
                setCredentials({
                    user: {
                        uid: verifiedUid,
                        email: verifiedEmail,
                        name,
                    },
                    uid: verifiedUid,
                    email: verifiedEmail,
                    token,
                }),
            );

            window.sessionStorage.removeItem(
                OTP_SESSION_KEY,
            );

            window.sessionStorage.removeItem(
                "loginRedirectType",
            );

            router.replace(
                "/dashboard/students",
            );
        } catch (requestError) {
            setRedirecting(false);

            setError(
                getErrorMessage(requestError),
            );

            setOtp([...EMPTY_OTP]);

            requestAnimationFrame(() => {
                inputs.current[0]?.focus();
            });
        }
    }

    function handleDifferentEmail() {
        if (isLoading || redirecting) {
            return;
        }

        window.sessionStorage.removeItem(
            OTP_SESSION_KEY,
        );

        setOtp([...EMPTY_OTP]);
        setError("");

        router.replace("/login");
    }

    if (!sessionChecked) {
        return <LoadingScreen />;
    }

    if (isLoggedIn || redirecting) {
        return (
            <main
                className="
          relative grid
          min-h-[calc(100dvh-140px)]
          place-items-center overflow-hidden
          bg-[#080611] px-4 text-white
        "
            >
                <div
                    aria-hidden="true"
                    className="
            pointer-events-none absolute inset-0
            bg-[radial-gradient(circle_at_15%_20%,rgba(190,20,83,0.24),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(79,45,145,0.28),transparent_34%),linear-gradient(145deg,#080611,#11091d_52%,#080611)]
          "
                />

                <div
                    className="
            relative z-10 flex items-center gap-3
            rounded-2xl border border-white/10
            bg-white/[0.07] px-5 py-4
            text-sm text-white/75
            shadow-[0_20px_55px_rgba(0,0,0,0.4)]
            backdrop-blur-xl
          "
                >
                    <span
                        aria-hidden="true"
                        className="
              h-5 w-5 animate-spin rounded-full
              border-2 border-white/20
              border-t-pink-500
            "
                    />

                    Opening your dashboard...
                </div>
            </main>
        );
    }

    if (!otpRequested || !email) {
        return null;
    }

    const otpComplete = otp.every(Boolean);

    return (
        <main
            className="
        relative isolate flex
        min-h-[calc(100dvh-140px)]
        items-center justify-center
        overflow-hidden bg-[#080611]
        px-4 py-8
        sm:px-6 sm:py-10
      "
        >
            <div
                aria-hidden="true"
                className="
          pointer-events-none absolute inset-0 -z-30
          bg-[radial-gradient(circle_at_15%_20%,rgba(190,20,83,0.24),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(79,45,145,0.28),transparent_34%),linear-gradient(145deg,#080611,#11091d_52%,#080611)]
        "
            />

            <div
                aria-hidden="true"
                className="
          login-grid-animation
          pointer-events-none absolute
          -inset-20 -z-20 opacity-35
          [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
          [background-size:42px_42px]
        "
            />

            <div
                aria-hidden="true"
                className="
          login-glow-one-animation
          pointer-events-none absolute
          -left-24 top-12 -z-10
          h-72 w-72 rounded-full
          bg-pink-600/20 blur-3xl
        "
            />

            <div
                aria-hidden="true"
                className="
          login-glow-two-animation
          pointer-events-none absolute
          -bottom-24 -right-20 -z-10
          h-80 w-80 rounded-full
          bg-purple-600/20 blur-3xl
        "
            />

            <section
                aria-labelledby="otp-title"
                className="
          relative z-10 w-full max-w-md
          overflow-hidden rounded-[28px]
          border border-white/15
          bg-white/[0.08]
          shadow-[0_0_45px_rgba(211,11,85,0.18),0_0_90px_rgba(124,58,237,0.14),0_35px_90px_rgba(0,0,0,0.55)]
          backdrop-blur-2xl
        "
            >
                <header
                    className="
            relative overflow-hidden
            border-b border-white/10
            bg-gradient-to-br
            from-[#bd1551]/90
            via-[#801342]/90
            to-[#35102e]/90
            px-6 py-8
            text-center text-white
            sm:px-8 sm:py-9
          "
                >
                    <div
                        aria-hidden="true"
                        className="
              absolute -bottom-16 -left-14
              h-40 w-40 rounded-full
              bg-white/10 blur-sm
            "
                    />

                    <div
                        aria-hidden="true"
                        className="
              absolute -right-12 -top-12
              h-36 w-36 rounded-full
              bg-violet-300/15 blur-sm
            "
                    />

                    <div className="relative z-10">
                        <div
                            className="
                mx-auto mb-5 grid
                h-16 w-16 place-items-center
                rounded-2xl border border-white/20
                bg-white/15 text-white
                shadow-[0_14px_35px_rgba(0,0,0,0.22)]
                backdrop-blur
              "
                        >
                            <OtpIcon />
                        </div>

                        <span
                            className="
                mb-2 inline-block
                bg-gradient-to-r
                from-amber-200
                via-pink-200
                to-violet-200
                bg-clip-text
                text-[0.7rem] font-bold
                uppercase tracking-[0.16em]
                text-transparent
              "
                        >
                            Secure verification
                        </span>

                        <h1
                            id="otp-title"
                            className="
                bg-gradient-to-r
                from-white
                via-[#ffe0eb]
                to-[#d6c7ff]
                bg-clip-text
                text-2xl font-black
                tracking-[-0.04em]
                text-transparent
                sm:text-3xl
              "
                        >
                            OTP Verification
                        </h1>

                        <p className="mt-3 text-sm text-white/70">
                            Enter the four-digit code sent to
                        </p>

                        <p
                            className="
                mt-1 break-all
                font-semibold text-amber-300
              "
                        >
                            {email}
                        </p>
                    </div>
                </header>

                <div className="px-5 py-7 sm:px-8 sm:py-8">
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <fieldset
                            disabled={isLoading || redirecting}
                        >
                            <legend className="sr-only">
                                Enter your four digit OTP
                            </legend>

                            <div
                                className="
                  mb-7 flex justify-center
                  gap-2 sm:gap-3
                "
                            >
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(element) => {
                                            inputs.current[index] =
                                                element;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        autoComplete={
                                            index === 0
                                                ? "one-time-code"
                                                : "off"
                                        }
                                        maxLength={1}
                                        value={digit}
                                        onChange={(event) =>
                                            handleChange(
                                                event.target.value,
                                                index,
                                            )
                                        }
                                        onKeyDown={(event) =>
                                            handleKeyDown(
                                                event,
                                                index,
                                            )
                                        }
                                        onPaste={handlePaste}
                                        aria-label={`OTP digit ${index + 1
                                            }`}
                                        className="
                      h-13 w-13 rounded-xl
                      border border-white/20
                      bg-black/20
                      text-center text-2xl
                      font-black text-white
                      caret-pink-400
                      outline-none transition
                      duration-200
                      hover:border-white/35
                      focus:-translate-y-0.5
                      focus:border-pink-500
                      focus:bg-black/30
                      focus:ring-4
                      focus:ring-pink-500/15
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      sm:h-14 sm:w-14
                    "
                                    />
                                ))}
                            </div>

                            {error ? (
                                <p
                                    role="alert"
                                    className="
                    mb-5 rounded-xl
                    border border-red-400/25
                    bg-red-500/10
                    px-4 py-3
                    text-center text-sm
                    text-red-200
                  "
                                >
                                    {error}
                                </p>
                            ) : null}

                            <button
                                type="submit"
                                disabled={
                                    isLoading ||
                                    redirecting ||
                                    !otpComplete
                                }
                                className="
                  flex min-h-12 w-full
                  items-center justify-center
                  rounded-xl
                  bg-gradient-to-r
                  from-[#d20b54]
                  via-[#b8094e]
                  to-[#8d0742]
                  px-5 py-3
                  text-sm font-bold text-white
                  shadow-[0_15px_35px_rgba(190,10,76,0.3)]
                  transition duration-200
                  hover:-translate-y-0.5
                  hover:brightness-110
                  hover:shadow-[0_20px_42px_rgba(190,10,76,0.4)]
                  disabled:cursor-not-allowed
                  disabled:opacity-55
                  disabled:hover:translate-y-0
                  disabled:hover:brightness-100
                "
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2.5">
                                        <span
                                            aria-hidden="true"
                                            className="
                        h-4 w-4 animate-spin
                        rounded-full border-2
                        border-white/30
                        border-t-white
                      "
                                        />

                                        Verifying...
                                    </span>
                                ) : (
                                    "Verify OTP"
                                )}
                            </button>
                        </fieldset>
                    </form>

                    <button
                        type="button"
                        onClick={handleDifferentEmail}
                        disabled={isLoading || redirecting}
                        className="
              mt-5 w-full text-center
              text-sm font-semibold
              text-white/55 transition
              hover:text-pink-400
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
                    >
                        Use a different email
                    </button>

                    <div
                        className="
              mt-5 flex items-center
              justify-center gap-2
              border-t border-white/10
              pt-4 text-xs text-white/40
            "
                    >
                        <span
                            aria-hidden="true"
                            className="
                h-2 w-2 rounded-full
                bg-emerald-400
                shadow-[0_0_8px_rgba(52,211,153,0.8)]
              "
                        />

                        Secure OTP verification
                    </div>
                </div>
            </section>
        </main>
    );
}