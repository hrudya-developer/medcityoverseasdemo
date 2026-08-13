"use client";

import {
    useState,
} from "react";

import ProfileHeader from "./ProfileHeader";
import ProfileGrid from "./ProfileGrid";
import ProfileUpdateModal from "./edit-profile/ProfileUpdateModal";

import {
    normalizeProfile,
} from "./profileUtils";

export default function ProfileDetails({
    profile,
    onUpdated,
}) {
    const [
        updateOpen,
        setUpdateOpen,
    ] = useState(false);

    const normalized =
        normalizeProfile(
            profile
        );

    return (
        <>
            <section
                className="
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-slate-200/70
                    bg-white
                    shadow-[0_20px_60px_rgba(15,23,42,0.07)]
                "
            >
                <ProfileHeader
                    {...normalized}
                    onUpdate={() =>
                        setUpdateOpen(
                            true
                        )
                    }
                />

                <ProfileGrid
                    name={
                        normalized.name
                    }
                    email={
                        normalized.email
                    }
                    dob={
                        normalized.dob
                    }
                    mobile={
                        normalized.mobile
                    }
                    gender={
                        normalized.gender
                    }
                    address={
                        normalized.address
                    }
                />
            </section>

            <ProfileUpdateModal
                open={updateOpen}
                onClose={() =>
                    setUpdateOpen(
                        false
                    )
                }
                profile={profile}
                onUpdated={async () => {
                    setUpdateOpen(
                        false
                    );

                    await onUpdated?.();
                }}
            />
        </>
    );
}