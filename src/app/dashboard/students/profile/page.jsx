"use client";

import {
    useEffect,
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
        error,
        setError,
    ] = useState("");

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        try {
            setLoading(true);
            setError("");

            const response =
                await fetch(
                    "/api/student/profile",
                    {
                        method: "GET",

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
                "PROFILE API RESPONSE:",
                data
            );

            if (!response.ok) {
                throw new Error(
                    data?.msg ||
                        data?.message ||
                        "Unable to load profile."
                );
            }

            /*
             * API response:
             *
             * {
             *   status: true,
             *   data: [
             *      {...profile}
             *   ]
             * }
             */

            const profileData =
                Array.isArray(
                    data?.data
                )
                    ? data.data[0]
                    : data?.data ??
                      data?.profile ??
                      null;

            if (!profileData) {
                throw new Error(
                    "Profile information was not found."
                );
            }

            console.log(
                "PROFILE DATA:",
                profileData
            );

            setProfile(
                profileData
            );
        } catch (error) {
            console.error(
                "Profile loading failed:",
                error
            );

            setError(
                error?.message ||
                    "Unable to load profile."
            );
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <ProfileLoading />
        );
    }

    if (error) {
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
                    onClick={
                        loadProfile
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

    return (
        <ProfileDetails
        profile={profile}
        onUpdated={loadProfile}
    />
    );
}