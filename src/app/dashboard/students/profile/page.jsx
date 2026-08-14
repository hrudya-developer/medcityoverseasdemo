"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import ProfileDetails from "./components/ProfileDetails";
import ProfileLoading from "./components/ProfileLoading";

export default function ProfilePage() {
    const [
        profile,
        setProfile,
    ] = useState(null);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        refreshing,
        setRefreshing,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState("");

    const mountedRef =
        useRef(true);

    /*
    |--------------------------------------------------------------------------
    | GET LOGGED-IN STUDENT UID
    |--------------------------------------------------------------------------
    */

    const getStudentUid =
        useCallback(
            async () => {
                const response =
                    await fetch(
                        "/api/auth/session",
                        {
                            method: "GET",

                            credentials:
                                "include",

                            cache:
                                "no-store",
                        }
                    );

                const result =
                    await response
                        .json()
                        .catch(
                            () =>
                                null
                        );

                console.log(
                    "PROFILE SESSION RESPONSE:",
                    result
                );

                if (
                    !response.ok ||
                    result?.authenticated !==
                        true
                ) {
                    throw new Error(
                        result?.message ||
                            result?.msg ||
                            "Login session not found."
                    );
                }

                const uid =
                    result?.user
                        ?.uid ??
                    result?.user
                        ?.id ??
                    result?.uid ??
                    null;

                if (!uid) {
                    throw new Error(
                        "Student ID not found."
                    );
                }

                return String(
                    uid
                );
            },
            []
        );

    /*
    |--------------------------------------------------------------------------
    | FETCH PROFILE
    |--------------------------------------------------------------------------
    |
    | This uses the SAME profile/details route
    | that CourseCard uses.
    |
    | So personal information + qualification
    | information come from the same source.
    |
    */

    const fetchProfile =
        useCallback(
            async () => {
                const uid =
                    await getStudentUid();

                const response =
                    await fetch(
                        "/api/dashboard/student/profile/details",
                        {
                            method:
                                "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body:
                                JSON.stringify({
                                    uid,
                                }),

                            credentials:
                                "include",

                            cache:
                                "no-store",
                        }
                    );

                const result =
                    await response
                        .json()
                        .catch(
                            () =>
                                null
                        );

                console.log(
                    "PROFILE DETAILS RESPONSE:",
                    result
                );

                if (
                    !response.ok ||
                    result?.status !==
                        true
                ) {
                    throw new Error(
                        result?.msg ||
                            result?.message ||
                            "Unable to load profile."
                    );
                }

                if (
                    !result?.profile ||
                    typeof result
                        .profile !==
                        "object"
                ) {
                    throw new Error(
                        "Profile information was not found."
                    );
                }

                console.log(
                    "PROFILE DETAILS DATA:",
                    result.profile
                );

                console.log(
                    "PROFILE QUALIFICATION DATA:",
                    {
                        highest:
                            result.profile
                                ?.highest,

                        tenth_syllabus:
                            result.profile
                                ?.tenth_syllabus,

                        tenth_overall:
                            result.profile
                                ?.tenth_overall,

                        twelth_stream:
                            result.profile
                                ?.twelth_stream,

                        twelth_overall:
                            result.profile
                                ?.twelth_overall,

                        twelth_english:
                            result.profile
                                ?.twelth_english,

                        degree_stream:
                            result.profile
                                ?.degree_stream,

                        degree_overall:
                            result.profile
                                ?.degree_overall,

                        degree_english:
                            result.profile
                                ?.degree_english,

                        pg_stream:
                            result.profile
                                ?.pg_stream,

                        pg_overall:
                            result.profile
                                ?.pg_overall,

                        pg_english:
                            result.profile
                                ?.pg_english,

                        ielts_overall:
                            result.profile
                                ?.ielts_overall,

                        ielts_l:
                            result.profile
                                ?.ielts_l,

                        ielts_r:
                            result.profile
                                ?.ielts_r,

                        ielts_w:
                            result.profile
                                ?.ielts_w,

                        ielts_s:
                            result.profile
                                ?.ielts_s,

                        qualificationComplete:
                            result?.qualificationComplete,
                    }
                );

                return result.profile;
            },
            [
                getStudentUid,
            ]
        );

    /*
    |--------------------------------------------------------------------------
    | INITIAL LOAD / MANUAL REFRESH
    |--------------------------------------------------------------------------
    */

    const loadProfile =
        useCallback(
            async ({
                background = false,
            } = {}) => {
                try {
                    if (
                        background
                    ) {
                        setRefreshing(
                            true
                        );
                    } else {
                        setLoading(
                            true
                        );
                    }

                    setError("");

                    const profileData =
                        await fetchProfile();

                    if (
                        !mountedRef.current
                    ) {
                        return;
                    }

                    setProfile(
                        profileData
                    );
                } catch (error) {
                    console.error(
                        "Profile loading failed:",
                        error
                    );

                    if (
                        !mountedRef.current
                    ) {
                        return;
                    }

                    /*
                     * Keep existing profile visible
                     * during a background refresh failure.
                     */
                    if (
                        !background
                    ) {
                        setProfile(
                            null
                        );
                    }

                    setError(
                        error instanceof
                        Error
                            ? error.message
                            : "Unable to load profile."
                    );
                } finally {
                    if (
                        !mountedRef.current
                    ) {
                        return;
                    }

                    setLoading(
                        false
                    );

                    setRefreshing(
                        false
                    );
                }
            },
            [
                fetchProfile,
            ]
        );

    /*
    |--------------------------------------------------------------------------
    | MOUNT / UNMOUNT
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        mountedRef.current =
            true;

        loadProfile();

        return () => {
            mountedRef.current =
                false;
        };
    }, [
        loadProfile,
    ]);

    /*
    |--------------------------------------------------------------------------
    | QUALIFICATION UPDATED EVENT
    |--------------------------------------------------------------------------
    |
    | QualificationGateModal dispatches:
    |
    | studentQualificationUpdated
    |
    | Re-fetch fresh profile without replacing
    | the page with the loading skeleton.
    |
    */

    useEffect(() => {
        const handleUpdated =
            () => {
                loadProfile({
                    background:
                        true,
                });
            };

        window.addEventListener(
            "studentQualificationUpdated",
            handleUpdated
        );

        return () => {
            window.removeEventListener(
                "studentQualificationUpdated",
                handleUpdated
            );
        };
    }, [
        loadProfile,
    ]);

    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (
        loading &&
        !profile
    ) {
        return (
            <ProfileLoading />
        );
    }

    /*
    |--------------------------------------------------------------------------
    | INITIAL LOAD ERROR
    |--------------------------------------------------------------------------
    */

    if (
        error &&
        !profile
    ) {
        return (
            <div
                className="
                    rounded-2xl
                    border
                    border-red-100
                    bg-red-50
                    p-5
                "
            >
                <p
                    className="
                        text-sm
                        font-bold
                        text-red-700
                    "
                >
                    {error}
                </p>

                <button
                    type="button"
                    onClick={() =>
                        loadProfile()
                    }
                    className="
                        mt-4
                        rounded-xl
                        bg-[#c01f53]
                        px-4
                        py-2.5
                        text-sm
                        font-bold
                        text-white
                        transition

                        hover:bg-[#a91e4c]
                    "
                >
                    Try Again
                </button>
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | PROFILE
    |--------------------------------------------------------------------------
    */

    return (
        <div className="space-y-3">
            {refreshing && (
                <div
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-100
                        bg-white
                        px-4
                        py-2
                        text-xs
                        font-bold
                        text-slate-500
                        shadow-sm
                    "
                >
                    <span
                        className="
                            h-3.5
                            w-3.5
                            animate-spin
                            rounded-full
                            border-2
                            border-slate-300
                            border-t-[#c01f53]
                        "
                    />

                    Refreshing profile...
                </div>
            )}

            {error &&
                profile && (
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-3
                            rounded-xl
                            border
                            border-amber-100
                            bg-amber-50
                            px-4
                            py-3
                        "
                    >
                        <p className="text-xs font-bold text-amber-700">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                loadProfile({
                                    background:
                                        true,
                                })
                            }
                            className="
                                shrink-0
                                rounded-lg
                                bg-white
                                px-3
                                py-1.5
                                text-xs
                                font-bold
                                text-amber-700
                                shadow-sm
                            "
                        >
                            Retry
                        </button>
                    </div>
                )}

            <ProfileDetails
                profile={
                    profile
                }
                onUpdated={async () => {
                    /*
                     * Personal profile update.
                     *
                     * Fetch again from backend
                     * without removing current UI.
                     */
                    await loadProfile({
                        background:
                            true,
                    });
                }}
            />
        </div>
    );
}