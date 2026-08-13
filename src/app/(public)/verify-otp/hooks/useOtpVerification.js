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

import {
    useRouter,
} from "next/navigation";

import Swal from "sweetalert2";

import {
    useVerifyLoginOtpMutation,
} from "@/lib/services/loginApi";

import {
    restoreOtpSession,
    setCredentials,
} from "@/lib/redux/slices/authSlice";

/* =========================================================
   CONSTANTS
========================================================= */

const EMPTY_OTP = [
    "",
    "",
    "",
    "",
];

const OTP_SESSION_KEY =
    "medcity-otp-session";

/* =========================================================
   HELPERS
========================================================= */

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

/* =========================================================
   HOOK
========================================================= */

export default function useOtpVerification() {
    const router =
        useRouter();

    const dispatch =
        useDispatch();

    const inputs =
        useRef([]);

    /* =====================================================
       REDUX AUTH DATA
    ===================================================== */

    const {
        uid,
        email,
        otpRequested,
        isLoggedIn,
    } = useSelector(
        (state) =>
            state.auth
    );

    /* =====================================================
       OTP API
    ===================================================== */

    const [
        verifyLoginOtp,
        {
            isLoading,
            reset:
                resetVerification,
        },
    ] =
        useVerifyLoginOtpMutation();

    /* =====================================================
       LOCAL STATE
    ===================================================== */

    const [
        otp,
        setOtp,
    ] = useState([
        ...EMPTY_OTP,
    ]);

    const [
        error,
        setError,
    ] = useState("");

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

    /* =====================================================
       RESTORE OTP SESSION
    ===================================================== */

    useEffect(() => {
        /*
         * Redux already has email.
         * Nothing to restore.
         */
        if (email) {
            setSessionChecked(
                true
            );

            return;
        }

        const storedValue =
            window.sessionStorage.getItem(
                OTP_SESSION_KEY
            );

        if (!storedValue) {
            setSessionChecked(
                true
            );

            return;
        }

        try {
            const storedSession =
                JSON.parse(
                    storedValue
                );

            const storedEmail =
                String(
                    storedSession
                        ?.email ||
                        ""
                )
                    .trim()
                    .toLowerCase();

            const storedUid =
                storedSession
                    ?.uid ??
                null;

            if (storedEmail) {
                dispatch(
                    restoreOtpSession({
                        email:
                            storedEmail,

                        uid:
                            storedUid,
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
            setSessionChecked(
                true
            );
        }
    }, [
        dispatch,
        email,
    ]);

    /* =====================================================
       VERIFY PAGE GUARD
    ===================================================== */

    useEffect(() => {
        if (
            !sessionChecked ||
            redirecting
        ) {
            return;
        }

        /*
         * Email exists:
         * user is allowed to remain
         * on OTP screen.
         */
        if (email) {
            requestAnimationFrame(
                () => {
                    inputs.current[
                        0
                    ]?.focus();
                }
            );

            return;
        }

        /*
         * No email / OTP session.
         */
        router.replace(
            "/login"
        );
    }, [
        sessionChecked,
        redirecting,
        email,
        router,
    ]);

    /* =====================================================
       INPUT REF
    ===================================================== */

    function setInputRef(
        index,
        element
    ) {
        inputs.current[
            index
        ] = element;
    }

    /* =====================================================
       CLEAR ERROR
    ===================================================== */

    function clearError() {
        setError("");

        resetVerification?.();
    }

    /* =====================================================
       OTP CHANGE
    ===================================================== */

    function handleChange(
        value,
        index
    ) {
        const digit =
            String(value)
                .replace(
                    /\D/g,
                    ""
                )
                .slice(-1);

        clearError();

        setOtp(
            (current) => {
                const next = [
                    ...current,
                ];

                next[index] =
                    digit;

                return next;
            }
        );

        if (
            digit &&
            index <
                EMPTY_OTP.length -
                    1
        ) {
            inputs.current[
                index + 1
            ]?.focus();
        }
    }

    /* =====================================================
       KEYBOARD
    ===================================================== */

    function handleKeyDown(
        event,
        index
    ) {
        if (
            event.key ===
                "Backspace" &&
            otp[index]
        ) {
            event.preventDefault();

            setOtp(
                (current) => {
                    const next = [
                        ...current,
                    ];

                    next[index] =
                        "";

                    return next;
                }
            );

            return;
        }

        if (
            event.key ===
                "Backspace" &&
            !otp[index] &&
            index > 0
        ) {
            event.preventDefault();

            setOtp(
                (current) => {
                    const next = [
                        ...current,
                    ];

                    next[
                        index - 1
                    ] = "";

                    return next;
                }
            );

            inputs.current[
                index - 1
            ]?.focus();

            return;
        }

        if (
            event.key ===
                "ArrowLeft" &&
            index > 0
        ) {
            event.preventDefault();

            inputs.current[
                index - 1
            ]?.focus();

            return;
        }

        if (
            event.key ===
                "ArrowRight" &&
            index <
                EMPTY_OTP.length -
                    1
        ) {
            event.preventDefault();

            inputs.current[
                index + 1
            ]?.focus();
        }
    }

    /* =====================================================
       PASTE OTP
    ===================================================== */

    function handlePaste(event) {
        event.preventDefault();

        const pasted =
            event.clipboardData
                .getData("text")
                .replace(
                    /\D/g,
                    ""
                )
                .slice(
                    0,
                    EMPTY_OTP.length
                );

        if (!pasted) {
            return;
        }

        const next = [
            ...EMPTY_OTP,
        ];

        pasted
            .split("")
            .forEach(
                (
                    digit,
                    index
                ) => {
                    next[index] =
                        digit;
                }
            );

        setOtp(next);

        clearError();

        const focusIndex =
            Math.min(
                pasted.length,
                EMPTY_OTP.length
            ) - 1;

        requestAnimationFrame(
            () => {
                inputs.current[
                    Math.max(
                        focusIndex,
                        0
                    )
                ]?.focus();
            }
        );
    }

    /* =====================================================
       PROFILE STATUS
    ===================================================== */

    async function getProfileStatus() {
        const response =
            await fetch(
                "/api/dashboard/student/profile/profile-status",
                {
                    method:
                        "GET",

                    credentials:
                        "include",

                    cache:
                        "no-store",
                }
            );

        const data =
            await response
                .json()
                .catch(
                    () => null
                );

        console.log(
            "PROFILE STATUS RESPONSE:",
            data
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

    /* =====================================================
       REDIRECT AFTER OTP
    ===================================================== */

    async function redirectAfterVerification() {
        try {
            setRedirecting(
                true
            );

            setRedirectMessage(
                "Checking your profile..."
            );

            const data =
                await getProfileStatus();

            /*
             * profile-status route should
             * return stage at top level.
             */
            const stage =
                String(
                    data?.stage ||
                    data?.profile
                        ?.stage ||
                    ""
                )
                    .trim()
                    .toLowerCase();

            console.log(
                "PROFILE STAGE:",
                stage
            );

            /* =========================
               COMPLETED
            ========================= */

            if (
                stage ===
                "completed"
            ) {
                setRedirectMessage(
                    "Opening your dashboard..."
                );

                router.replace(
                    "/dashboard/students"
                );

                return;
            }

            /* =========================
               NOT COMPLETED
            ========================= */

            setRedirectMessage(
                "Opening profile setup..."
            );

            router.replace(
                "/register-user-profile"
            );
        } catch (
            profileError
        ) {
            console.error(
                "Profile status check failed:",
                profileError
            );

            setRedirecting(
                false
            );

            setRedirectMessage(
                ""
            );

            setError(
                profileError
                    ?.message ||
                    "Unable to check your profile."
            );
        }
    }

    /* =====================================================
       SUBMIT OTP
    ===================================================== */

    async function handleSubmit(
        event
    ) {
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
            !/^\d+$/.test(
                enteredOtp
            )
        ) {
            setError(
                `Please enter the complete ${EMPTY_OTP.length}-digit OTP.`
            );

            return;
        }

        setError("");

        try {
            /* =========================
               VERIFY OTP
            ========================= */

            const response =
                await verifyLoginOtp({
                    email,
                    otp:
                        enteredOtp,
                }).unwrap();

            console.log(
                "OTP VERIFY RESPONSE:",
                response
            );

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

            /* =========================
               VERIFY SESSION COOKIE
            ========================= */

            const sessionResponse =
                await fetch(
                    "/api/auth/session",
                    {
                        method:
                            "GET",

                        credentials:
                            "include",

                        cache:
                            "no-store",
                    }
                );

            const sessionData =
                await sessionResponse
                    .json()
                    .catch(
                        () => null
                    );

            console.log(
                "SESSION RESPONSE:",
                sessionData
            );

            if (
                !sessionResponse.ok ||
                sessionData
                    ?.authenticated !==
                    true
            ) {
                throw new Error(
                    "OTP was verified, but the login session could not be created."
                );
            }

            /* =========================
               USER INFORMATION
            ========================= */

            const responseData =
                response?.data ||
                {};

            const responseUser =
                response?.user ||
                responseData
                    ?.user ||
                {};

            const sessionUser =
                sessionData?.user ||
                {};

            const verifiedUid =
                sessionUser
                    ?.uid ??
                responseUser
                    ?.uid ??
                response?.uid ??
                responseData
                    ?.uid ??
                uid ??
                null;

            const verifiedEmail =
                String(
                    sessionUser
                        ?.email ??
                    responseUser
                        ?.email ??
                    response
                        ?.email ??
                    responseData
                        ?.email ??
                    email
                )
                    .trim()
                    .toLowerCase();

            const verifiedName =
                sessionUser
                    ?.name ??
                responseUser
                    ?.name ??
                response?.name ??
                responseData
                    ?.name ??
                "";

            /* =========================
               CLIENT AUTH STATE
            ========================= */

            dispatch(
                setCredentials({
                    user: {
                        uid:
                            verifiedUid,

                        email:
                            verifiedEmail,

                        name:
                            verifiedName,
                    },

                    uid:
                        verifiedUid,

                    email:
                        verifiedEmail,
                })
            );

            /* =========================
               CLEAR TEMP OTP DATA
            ========================= */

            window.sessionStorage.removeItem(
                OTP_SESSION_KEY
            );

            window.sessionStorage.removeItem(
                "loginRedirectType"
            );

            /* =========================
               PROFILE CHECK
            ========================= */

            await redirectAfterVerification();

            return;
        } catch (
            requestError
        ) {
            console.error(
                "OTP verification failed:",
                requestError
            );

            setRedirecting(
                false
            );

            setRedirectMessage(
                ""
            );

            setError(
                getErrorMessage(
                    requestError
                )
            );

            setOtp([
                ...EMPTY_OTP,
            ]);

            requestAnimationFrame(
                () => {
                    inputs.current[
                        0
                    ]?.focus();
                }
            );
        }
    }

    /* =====================================================
       DIFFERENT EMAIL
    ===================================================== */

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

        window.sessionStorage.removeItem(
            "loginRedirectType"
        );

        setOtp([
            ...EMPTY_OTP,
        ]);

        setError("");

        setRedirectMessage(
            ""
        );

        router.replace(
            "/login"
        );
    }

    /* =====================================================
       RETURN
    ===================================================== */

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