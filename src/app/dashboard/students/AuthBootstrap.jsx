"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    useDispatch,
} from "react-redux";

import {
    useRouter,
} from "next/navigation";

import {
    logout,
    setCredentials,
    markHydrated,
} from "@/lib/redux/slices/authSlice";

export default function AuthBootstrap({
    children,
}) {
    const dispatch =
        useDispatch();

    const router =
        useRouter();

    const [
        ready,
        setReady,
    ] = useState(false);

    useEffect(() => {
        let active =
            true;

        async function restoreSession() {
            try {
                const response =
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

                const data =
                    await response
                        .json()
                        .catch(
                            () => null
                        );

                if (!active) {
                    return;
                }

                if (
                    !response.ok ||
                    data
                        ?.authenticated !==
                        true ||
                    !data?.user
                ) {
                    dispatch(
                        logout()
                    );

                    router.replace(
                        "/login"
                    );

                    return;
                }

                dispatch(
                    setCredentials({
                        user:
                            data.user,

                        uid:
                            data.user
                                ?.uid,

                        email:
                            data.user
                                ?.email,
                    })
                );

                setReady(
                    true
                );
            } catch (error) {
                console.error(
                    "Session restore failed:",
                    error
                );

                if (!active) {
                    return;
                }

                dispatch(
                    logout()
                );

                dispatch(
                    markHydrated()
                );

                router.replace(
                    "/login"
                );
            }
        }

        restoreSession();

        return () => {
            active =
                false;
        };
    }, [
        dispatch,
        router,
    ]);

    if (!ready) {
        return (
            <div className="grid min-h-screen place-items-center bg-[#f6f7fb]">
                <div
                    className="
                        flex
                        items-center
                        gap-3

                        rounded-2xl

                        border
                        border-slate-200

                        bg-white

                        px-5
                        py-4

                        text-sm
                        font-semibold

                        text-slate-600

                        shadow-lg
                    "
                >
                    <span
                        className="
                            h-5
                            w-5

                            animate-spin

                            rounded-full

                            border-2
                            border-slate-200

                            border-t-[#c01f53]
                        "
                    />

                    Loading your account...
                </div>
            </div>
        );
    }

    return children;
}