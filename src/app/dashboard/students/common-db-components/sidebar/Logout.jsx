"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
    LogOut,
    ShieldCheck,
} from "lucide-react";

import {
    logout,
} from "@/lib/redux/slices/authSlice";

const AUTH_STORAGE_KEY =
    "medcity-auth";

const OTP_SESSION_KEY =
    "medcity-otp-session";

export default function LogoutButton() {
    const dispatch =
        useDispatch();

    const router =
        useRouter();

    const [
        isLoggingOut,
        setIsLoggingOut,
    ] = useState(false);

    async function handleLogout() {
        if (isLoggingOut) {
            return;
        }

        /*
         * Ask before logging out.
         */
        const result =
            await Swal.fire({
                icon: "question",
                title: "Ready to leave?",
                text: "Your current session will be securely closed.",

                showCancelButton: true,

                confirmButtonText:
                    "Yes, log me out",

                cancelButtonText:
                    "Stay logged in",

                confirmButtonColor:
                    "#c01f53",

                cancelButtonColor:
                    "#475569",

                reverseButtons: true,

                customClass: {
                    popup:
                        "rounded-[24px]",

                    confirmButton:
                        "rounded-xl px-5 py-2.5 font-semibold",

                    cancelButton:
                        "rounded-xl px-5 py-2.5 font-semibold",
                },
            });

        if (!result.isConfirmed) {
            return;
        }

        setIsLoggingOut(true);

        try {
            /*
             * Remove server-side
             * httpOnly session cookie.
             */
            try {
                const response =
                    await fetch(
                        "/api/auth/logout",
                        {
                            method:
                                "POST",

                            credentials:
                                "include",

                            cache:
                                "no-store",
                        }
                    );

                if (!response.ok) {
                    console.warn(
                        "Logout API returned:",
                        response.status
                    );
                }
            } catch (apiError) {
                /*
                 * Continue clearing local
                 * authentication even if
                 * API logout fails.
                 */
                console.warn(
                    "Logout API failed:",
                    apiError
                );
            }

            /*
             * Reset Redux authentication.
             */
            dispatch(logout());

            /*
             * Remove persisted
             * authentication/session data.
             */
            try {
                window.localStorage.removeItem(
                    AUTH_STORAGE_KEY
                );

                window.sessionStorage.removeItem(
                    OTP_SESSION_KEY
                );

                window.sessionStorage.removeItem(
                    "loginRedirectType"
                );
            } catch (storageError) {
                console.error(
                    "Unable to clear auth storage:",
                    storageError
                );
            }

            /*
             * Move away from dashboard
             * immediately.
             */
            router.replace("/login");

            /*
             * Success message.
             *
             * IMPORTANT:
             * Do NOT await this alert.
             * It closes automatically.
             */
            Swal.fire({
                icon: "success",

                title:
                    "Successfully Logged Out!",

                text:
                    "Your session has been closed securely.",

                timer: 1600,

                timerProgressBar:
                    true,

                showConfirmButton:
                    false,

                allowOutsideClick:
                    false,

                allowEscapeKey:
                    false,

                customClass: {
                    popup:
                        "rounded-[24px]",
                },

                didOpen: () => {
                    Swal.showLoading();

                    /*
                     * Hide the SweetAlert
                     * loading spinner because
                     * we only want the timer.
                     */
                    const loader =
                        Swal.getLoader();

                    if (loader) {
                        loader.style.display =
                            "none";
                    }
                },
            });

        } catch (error) {
            console.error(
                "Logout failed:",
                error
            );

            setIsLoggingOut(false);

            await Swal.fire({
                icon: "error",

                title:
                    "Logout Failed",

                text:
                    "Unable to logout. Please try again.",

                confirmButtonText:
                    "OK",

                confirmButtonColor:
                    "#c01f53",
            });
        }
    }

    return (
        <div
            className="
                relative

                shrink-0

                border-t
                border-white/[0.07]

                bg-black/[0.08]

                p-3

                backdrop-blur-2xl

                md:p-2.5

                xl:p-4
            "
        >
            {/* Background glow */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none

                    absolute

                    -bottom-16
                    left-1/2

                    h-28
                    w-44

                    -translate-x-1/2

                    rounded-full

                    bg-[#c01f53]/20

                    blur-[55px]

                    xl:w-52
                "
            />

            <button
                type="button"
                onClick={
                    handleLogout
                }
                disabled={
                    isLoggingOut
                }
                aria-label="Logout"
                title="Logout"
                className="
                    group

                    relative

                    flex
                    w-full
                    items-center

                    overflow-hidden

                    rounded-[18px]

                    border
                    border-white/[0.10]

                    bg-white/[0.055]

                    text-white/70

                    shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.20)]

                    backdrop-blur-xl

                    transition-all
                    duration-300

                    hover:-translate-y-0.5

                    hover:border-[#ff8aad]/25

                    hover:bg-[linear-gradient(135deg,rgba(192,31,83,0.18),rgba(255,255,255,0.055))]

                    hover:text-white

                    hover:shadow-[0_16px_35px_rgba(192,31,83,0.18),inset_0_1px_0_rgba(255,255,255,0.10)]

                    active:translate-y-0
                    active:scale-[0.985]

                    disabled:pointer-events-none
                    disabled:opacity-50

                    md:justify-center
                    md:p-2

                    xl:justify-start
                    xl:gap-3
                    xl:px-3
                    xl:py-3
                "
            >
                {/* Moving shine */}
                <span
                    aria-hidden="true"
                    className="
                        pointer-events-none

                        absolute

                        -left-[70%]
                        top-0

                        h-full
                        w-[45%]

                        skew-x-[-20deg]

                        bg-gradient-to-r
                        from-transparent
                        via-white/[0.10]
                        to-transparent

                        transition-all
                        duration-700

                        group-hover:left-[130%]
                    "
                />

                {/* Icon */}
                <span
                    className="
                        relative

                        grid
                        h-10
                        w-10

                        shrink-0

                        place-items-center

                        rounded-[14px]

                        border
                        border-white/[0.08]

                        bg-black/[0.16]

                        text-[#ff8eb1]

                        shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_7px_18px_rgba(0,0,0,0.18)]

                        transition-all
                        duration-300

                        group-hover:border-[#ff9dbc]/25

                        group-hover:bg-[#c01f53]/20

                        group-hover:text-white

                        group-hover:shadow-[0_0_25px_rgba(192,31,83,0.25)]

                        md:h-11
                        md:w-11

                        xl:h-10
                        xl:w-10
                    "
                >
                    {isLoggingOut ? (
                        <span
                            className="
                                h-4
                                w-4

                                animate-spin

                                rounded-full

                                border-2
                                border-white/25
                                border-t-white
                            "
                        />
                    ) : (
                        <LogOut
                            size={18}
                        />
                    )}
                </span>

                {/* Text */}
                <span
                    className="
                        relative

                        min-w-0
                        flex-1

                        text-left

                        md:hidden

                        xl:block
                    "
                >
                    <span
                        className="
                            block

                            text-[13px]

                            font-bold

                            tracking-[-0.01em]

                            text-white/90
                        "
                    >
                        {isLoggingOut
                            ? "Logging out..."
                            : "Sign out"}
                    </span>

                    <span
                        className="
                            mt-0.5

                            flex
                            items-center
                            gap-1.5

                            text-[9px]

                            font-medium

                            text-white/35
                        "
                    >
                        <ShieldCheck
                            size={11}
                            className="text-emerald-400/80"
                        />

                        Securely end session
                    </span>
                </span>

                {/* Right icon */}
                <span
                    aria-hidden="true"
                    className="
                        relative

                        hidden

                        h-7
                        w-7

                        place-items-center

                        rounded-lg

                        bg-white/[0.05]

                        text-white/35

                        transition-all

                        group-hover:bg-[#c01f53]/15
                        group-hover:text-[#ff9dbd]

                        xl:grid
                    "
                >
                    <LogOut
                        size={13}
                    />
                </span>
            </button>
        </div>
    );
}