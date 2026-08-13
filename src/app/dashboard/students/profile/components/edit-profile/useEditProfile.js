"use client";

import {
    useEffect,
    useState,
} from "react";

import Swal from "sweetalert2";

import {
    createEditForm,
    validateEditForm,
} from "./editProfileUtils";

const EMPTY_FORM = {
    uid: "",
    name: "",
    email: "",
    mobile: "",
    code: "91",
    country: "India",
    countryIso: "in",
    address: "",
    gender: "",
    dob: "",
};

export default function useEditProfile({
    open,
    profile,
    onUpdated,
}) {
    const [form, setForm] =
        useState(EMPTY_FORM);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {
        if (!open || !profile) {
            return;
        }

        const nextForm =
            createEditForm(profile);

        console.log(
            "EDIT FORM INITIAL DATA:",
            nextForm
        );

        setForm(nextForm);
    }, [open, profile]);

    function updateField(
        field,
        value
    ) {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    }

    async function submit() {
        if (
            !validateEditForm(form)
        ) {
            console.log(
                "MISSING FORM DATA:",
                form
            );

            await Swal.fire({
                icon: "error",
                title: "Update Failed",
                text:
                    "Required profile information is missing.",
                confirmButtonColor:
                    "#c01f53",
            });

            return;
        }

        try {
            setLoading(true);

            const payload = {
                uid: form.uid,
                name: form.name.trim(),

                mobile:
                    form.mobile
                        .replace(
                            /\D/g,
                            ""
                        ),

                code:
                    form.code
                        .replace(
                            /\D/g,
                            ""
                        ),

                country:
                    form.country.trim(),

                address:
                    form.address.trim(),

                gender:
                    form.gender
                        .trim()
                        .toLowerCase(),

                dob:
                    form.dob.trim(),
            };

            console.log(
                "UPDATE PAYLOAD:",
                payload
            );

            const response =
                await fetch(
                    "/api/dashboard/student/profile/edit-profile",
                    {
                        method:
                            "POST",

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

            const result =
                await response.json();

            console.log(
                "UPDATE RESPONSE:",
                result
            );

            if (
                !response.ok ||
                result?.status ===
                    false
            ) {
                throw new Error(
                    result?.message ||
                    result?.msg ||
                    "Unable to update profile."
                );
            }

            await Swal.fire({
                icon: "success",
                title:
                    "Profile Updated",
                text:
                    result?.msg ||
                    "Profile updated successfully.",
                confirmButtonColor:
                    "#c01f53",
            });

            await onUpdated?.();

        } catch (error) {
            console.error(
                "Profile update failed:",
                error
            );

            await Swal.fire({
                icon: "error",
                title: "Update Failed",
                text:
                    error?.message ||
                    "Unable to update profile.",
                confirmButtonColor:
                    "#c01f53",
            });
        } finally {
            setLoading(false);
        }
    }

    return {
        form,
        loading,
        updateField,
        submit,
    };
}