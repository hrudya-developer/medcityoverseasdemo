"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {
    setEmail,
    setOtpSession,
    setRememberMe,
} from "@/lib/redux/slices/authSlice";

import {
    useSendLoginOtpMutation,
} from "@/lib/services/loginApi";

const REMEMBERED_EMAIL_KEY = "medcity-login-email";
const OTP_SESSION_KEY = "medcity-otp-session";

function MailIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-full w-full fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
        >
            <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
            />

            <path d="m4 7 8 6 8-6" />
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-full w-full fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
        >
            <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-full w-full fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
        >
            <path d="M5 12h24" />
            <path d="m14 7 5 5-5 5" />
        </svg>
    );
}

function getApiErrorMessage(error) {
    return (
        error?.data?.msg ||
        error?.data?.message ||
        error?.data?.error ||
        error?.error ||
        "Unable to send OTP. Please try again."
    );
}

export default function LoginForm() {
    const router = useRouter();
    const dispatch = useDispatch();

    const { email, rememberMe } = useSelector(
        (state) => state.auth,
    );

    const [
        sendLoginOtp,
        {
            isLoading,
            error: apiError,
            reset: resetSendOtp,
        },
    ] = useSendLoginOtpMutation();

    const [localError, setLocalError] = useState("");

    useEffect(() => {
        const rememberedEmail =
            window.localStorage.getItem(
                REMEMBERED_EMAIL_KEY,
            );

        if (!rememberedEmail) {
            return;
        }

        dispatch(setEmail(rememberedEmail));
        dispatch(setRememberMe(true));
    }, [dispatch]);

    async function handleSubmit(event) {
        event.preventDefault();

        const normalizedEmail = String(email ?? "")
            .trim()
            .toLowerCase();

        if (!normalizedEmail) {
            setLocalError(
                "Please enter your email address.",
            );
            return;
        }

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                normalizedEmail,
            )
        ) {
            setLocalError(
                "Please enter a valid email address.",
            );
            return;
        }

        if (isLoading) {
            return;
        }

        setLocalError("");
        resetSendOtp();

        try {
            const response = await sendLoginOtp({
                email: normalizedEmail,
            }).unwrap();

            if (response?.status !== true) {
                setLocalError(
                    response?.msg ||
                    response?.message ||
                    "Unable to send OTP.",
                );
                return;
            }

            const responseUid =
                response?.uid ??
                response?.data?.uid ??
                null;

            dispatch(
                setOtpSession({
                    uid: responseUid,
                    email: normalizedEmail,
                }),
            );

            window.sessionStorage.setItem(
                OTP_SESSION_KEY,
                JSON.stringify({
                    uid: responseUid,
                    email: normalizedEmail,
                }),
            );

            if (rememberMe) {
                window.localStorage.setItem(
                    REMEMBERED_EMAIL_KEY,
                    normalizedEmail,
                );
            } else {
                window.localStorage.removeItem(
                    REMEMBERED_EMAIL_KEY,
                );
            }

            router.push("/verify-otp");
        } catch (requestError) {
            setLocalError(
                getApiErrorMessage(requestError),
            );
        }
    }

    const displayedError =
        localError ||
        (apiError
            ? getApiErrorMessage(apiError)
            : "");

    return (
        <section
            aria-labelledby="login-title"
            className="relative flex h-full min-h-[430px] min-w-0 flex-col overflow-hidden bg-[radial-gradient(circle_at_88%_8%,rgba(172,75,238,0.22),transparent_34%),radial-gradient(circle_at_8%_92%,rgba(220,9,84,0.16),transparent_36%),linear-gradient(145deg,#1b102d_0%,#0a0612_100%)] px-5 py-6 text-white sm:px-7 lg:min-h-0 lg:px-8 lg:py-7 xl:px-10"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-500/15 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-pink-600/15 blur-3xl"
            />

            <div className="relative z-10 mx-auto my-auto w-full max-w-[410px]">
                <header>
                    <span
                        className="mb-2 inline-block bg-gradient-to-r from-[#ff6298] via-[#f6a5ff] to-[#a99cff] bg-clip-text text-[0.76rem] font-bold uppercase tracking-[0.14em] text-transparent"
                    >
                        Student portal
                    </span>

                    <h1
                        id="login-title"
                        className="bg-gradient-to-r from-white via-[#ffd9e9] to-[#cbbcff] bg-clip-text text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.045em] text-transparent sm:text-[2.3rem] lg:text-[2.55rem]"
                    >
                        Welcome Back!
                    </h1>

                    <span
                        aria-hidden="true"
                        className="my-3 block h-[3px] w-11 rounded-full bg-gradient-to-r from-[#ff1769] via-[#e34acb] to-[#8c63ff] shadow-[0_0_18px_rgba(237,21,93,0.55)]"
                    />

                    <p className="max-w-[375px] text-[0.9rem] leading-6 text-white/60">
                        Sign in to continue your study abroad journey.
                    </p>
                </header>

                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="mt-5 grid gap-3.5"
                >
                    <label className="block">
                        <span
                            className="mb-1.5 block bg-gradient-to-r from-white to-[#e7d8ff] bg-clip-text text-[0.86rem] font-bold text-transparent"
                        >
                            Email Address
                        </span>

                        <span className="relative flex items-center">
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute left-3.5 z-10 h-[18px] w-[18px] text-[#f22670]"
                            >
                                <MailIcon />
                            </span>

                            <input
                                type="email"
                                name="email"
                                inputMode="email"
                                autoComplete="email"
                                placeholder="Enter your email"
                                value={email ?? ""}
                                onChange={(event) => {
                                    dispatch(
                                        setEmail(event.target.value),
                                    );

                                    if (localError) {
                                        setLocalError("");
                                    }

                                    if (apiError) {
                                        resetSendOtp();
                                    }
                                }}
                                disabled={isLoading}
                                aria-invalid={Boolean(
                                    displayedError,
                                )}
                                aria-describedby={
                                    displayedError
                                        ? "login-error"
                                        : undefined
                                }
                                className="h-11 w-full rounded-xl border border-white/15 bg-[rgba(8,7,22,0.55)] pl-11 pr-4 text-[0.88rem] text-white outline-none transition duration-200 placeholder:text-white/35 hover:border-white/25 focus:border-[#ed1b63] focus:bg-[rgba(8,7,22,0.75)] focus:shadow-[0_0_0_4px_rgba(237,27,99,0.12),0_10px_28px_rgba(0,0,0,0.2)] disabled:cursor-not-allowed disabled:opacity-60"
                            />
                        </span>
                    </label>

                    {displayedError ? (
                        <p
                            id="login-error"
                            role="alert"
                            className="rounded-lg border border-[rgba(255,75,135,0.3)] bg-[rgba(187,15,75,0.14)] px-3 py-2 text-[0.76rem] leading-5 text-[#ffafc6]"
                        >
                            {displayedError}
                        </p>
                    ) : null}

                    <label
                        className="flex cursor-pointer items-center gap-2.5 text-[0.84rem] text-white/70"
                    >
                        <input
                            type="checkbox"
                            checked={Boolean(rememberMe)}
                            onChange={(event) => {
                                const checked =
                                    event.target.checked;

                                dispatch(
                                    setRememberMe(checked),
                                );

                                if (!checked) {
                                    window.localStorage.removeItem(
                                        REMEMBERED_EMAIL_KEY,
                                    );
                                }
                            }}
                            className="h-4 w-4 cursor-pointer rounded accent-[#d50954]"
                        />

                        <span>Keep me logged in</span>
                    </label>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex h-11 w-full items-center justify-between rounded-xl bg-gradient-to-r from-[#e10859] via-[#c20756] to-[#8d0544] px-4 text-[0.88rem] font-extrabold text-white shadow-[0_10px_28px_rgba(203,9,80,0.32)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_16px_36px_rgba(203,9,80,0.46)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 disabled:hover:brightness-100"
                    >
                        <span>
                            {isLoading
                                ? "Sending OTP..."
                                : "Get OTP"}
                        </span>

                        {isLoading ? (
                            <span
                                aria-hidden="true"
                                className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                            />
                        ) : (
                            <span
                                aria-hidden="true"
                                className="h-[18px] w-[18px]"
                            >
                                <ArrowIcon />
                            </span>
                        )}
                    </button>
                </form>
            </div>

            <footer
                className="relative z-10 mx-auto mt-4 flex w-full max-w-[410px] items-center gap-2.5 border-t border-white/10 pt-3"
            >
                <span
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-[#ed1b62]"
                >
                    <ShieldIcon />
                </span>

                <div>
                    <strong
                        className="block bg-gradient-to-r from-white to-[#eadcff] bg-clip-text text-[0.76rem] font-semibold text-transparent"
                    >
                        Your data is safe with us.
                    </strong>

                    <small className="mt-0.5 block text-[0.67rem] leading-4 text-white/45">
                        We never share your information with anyone.
                    </small>
                </div>
            </footer>
        </section>
    );
}