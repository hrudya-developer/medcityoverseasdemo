"use client";

import {
    CalendarDays,
    Mail,
    MapPin,
    Phone,
    User,
    Users,
} from "lucide-react";

import ProfileItem from "./ProfileItem";

export default function ProfileGrid({
    name,
    email,
    dob,
    mobile,
    gender,
    address,
}) {
    return (
        <div
            className="
                bg-gradient-to-b
                from-slate-50/80
                to-white
                p-5
                sm:p-7
                lg:p-8
            "
        >
            {/* Section heading */}
            <div className="mb-5">
                <h3
                    className="
                        text-[11px]
                        font-black
                        uppercase
                        tracking-[0.14em]
                        text-[#631A33]
                    "
                >
                    Personal Information
                </h3>

                <p
                    className="
                        mt-1
                        text-xs
                        font-medium
                        text-slate-400
                    "
                >
                    Your registered personal and contact details
                </p>
            </div>

            {/* Details grid */}
            <div
                className="
                    grid
                    grid-cols-1
                    gap-3.5
                    sm:grid-cols-2
                "
            >
                <ProfileItem
                    icon={User}
                    label="Full Name"
                    value={name}
                />

                <ProfileItem
                    icon={Mail}
                    label="Email Address"
                    value={email}
                />

                <ProfileItem
                    icon={CalendarDays}
                    label="Date of Birth"
                    value={dob}
                />

                <ProfileItem
                    icon={Phone}
                    label="Contact Number"
                    value={mobile}
                />

                <ProfileItem
                    icon={Users}
                    label="Gender"
                    value={gender}
                />

                <ProfileItem
                    icon={MapPin}
                    label="Address"
                    value={address}
                />
            </div>
        </div>
    );
}