"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import ProfileHeader from "./ProfileHeader";
import AddressField from "./AddressField";
import ContactField from "./ContactField";
import DobField from "./DobField";
import GenderField from "./GenderField";
import PersonalFields from "./PersonalFields";
import SubmitButton from "./SubmitButton";
import TermsField from "./TermsField";

const INITIAL_FORM = {
    name: "",
    dob: "",
    mobile: "",
    country: "in",
    code: "91",
    gender: "",
    address: "",
    acceptedTerms: false,
};

export default function RegisterProfileForm({
    email,
}) {
    const router =
        useRouter();

    const [form, setForm] =
        useState(INITIAL_FORM);

    const [loading, setLoading] =
        useState(false);

    function updateField(
        name,
        value
    ) {
        setForm(
            (current) => ({
                ...current,
                [name]: value,
            })
        );
    }

    async function showWarning(
        title,
        text
    ) {
        await Swal.fire({
            icon: "warning",
            title,
            text,
            confirmButtonColor:
                "#c01f53",
        });
    }

    async function handleSubmit(
        event
    ) {
        event.preventDefault();

        if (loading) {
            return;
        }

        const name =
            form.name.trim();

        const address =
            form.address.trim();

        if (name.length < 3) {
            await showWarning(
                "Invalid Name",
                "Please enter your full name."
            );

            return;
        }

        if (!form.dob) {
            await showWarning(
                "Date of Birth Required",
                "Please select your date of birth."
            );

            return;
        }

        if (!form.mobile) {
            await showWarning(
                "Contact Number Required",
                "Please enter your contact number."
            );

            return;
        }

        if (!form.gender) {
            await showWarning(
                "Gender Required",
                "Please select your gender."
            );

            return;
        }

        if (address.length < 5) {
            await showWarning(
                "Address Required",
                "Please enter your complete address."
            );

            return;
        }

        if (!form.acceptedTerms) {
            await showWarning(
                "Accept Terms",
                "Please accept the terms and conditions."
            );

            return;
        }

        const payload = {
            name,

            mobile:
                form.mobile,

            country:
                form.country,

            code:
                form.code,

            gender:
                form.gender,

            dob:
                form.dob,

            address,
        };

        try {
            setLoading(true);

            const response =
                await fetch(
                    "/api/student/register-profile",
                    {
                        method:
                            "POST",

                        credentials:
                            "include",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify(
                                payload
                            ),
                    }
                );

            const data =
                await response
                    .json()
                    .catch(
                        () => null
                    );

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    data?.msg ||
                    "Unable to create profile."
                );
            }

            if (
                data?.status === false
            ) {
                throw new Error(
                    data?.message ||
                    data?.msg ||
                    "Unable to create profile."
                );
            }

            await Swal.fire({
                icon: "success",

                title:
                    "Profile Created!",

                text:
                    "Your student profile has been saved successfully.",

                timer: 1000,

                timerProgressBar:
                    true,

                showConfirmButton:
                    false,
            });

            router.replace(
                "/dashboard/students"
            );

            router.refresh();
        } catch (error) {
            console.error(
                "Profile registration failed:",
                error
            );

            await Swal.fire({
                icon: "error",

                title:
                    "Unable to Continue",

                text:
                    error?.message ||
                    "Something went wrong. Please try again.",

                confirmButtonColor:
                    "#c01f53",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <section
            className="
                overflow-hidden
                rounded-[28px]
                border
                border-slate-200/70
                bg-white
                shadow-[0_24px_70px_rgba(15,23,42,0.10)]

                lg:grid
                lg:grid-cols-[0.82fr_1.18fr]
            "
        >
            <ProfileHeader
                email={email}
            />

            <div
                className="
                    bg-white
                    px-5
                    py-6

                    sm:px-7
                    sm:py-7

                    lg:px-8
                    lg:py-8

                    xl:px-10
                "
            >
                <div className="mb-5">
                    <p
                        className="
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.14em]
                            text-[#c01f53]
                        "
                    >
                        Personal Details
                    </p>

                    <h2
                        className="
                            mt-1
                            text-2xl
                            font-black
                            tracking-[-0.035em]
                            text-slate-950
                        "
                    >
                        Tell us about yourself
                    </h2>

                    <p
                        className="
                            mt-1.5
                            text-xs
                            leading-5
                            text-slate-500
                        "
                    >
                        Please provide accurate
                        details to complete your
                        student account.
                    </p>
                </div>

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="space-y-4"
                >
                    <PersonalFields
                        form={form}
                        email={email}
                        onChange={
                            updateField
                        }
                    />

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-4

                            sm:grid-cols-2
                        "
                    >
                        <DobField
                            value={
                                form.dob
                            }
                            onChange={(
                                value
                            ) =>
                                updateField(
                                    "dob",
                                    value
                                )
                            }
                        />

                        <ContactField
                            form={form}
                            onChange={
                                updateField
                            }
                        />
                    </div>

                    <GenderField
                        value={
                            form.gender
                        }
                        onChange={(
                            value
                        ) =>
                            updateField(
                                "gender",
                                value
                            )
                        }
                    />

                    <AddressField
                        value={
                            form.address
                        }
                        onChange={(
                            value
                        ) =>
                            updateField(
                                "address",
                                value
                            )
                        }
                    />

                    <TermsField
                        checked={
                            form.acceptedTerms
                        }
                        onChange={(
                            value
                        ) =>
                            updateField(
                                "acceptedTerms",
                                value
                            )
                        }
                    />

                    <SubmitButton
                        loading={
                            loading
                        }
                    />
                </form>
            </div>
        </section>
    );
}