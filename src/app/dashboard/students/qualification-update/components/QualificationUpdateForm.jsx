"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import Swal from "sweetalert2";

import HighestQualificationSelector from "./HighestQualificationSelector";
import QualificationActions from "./QualificationActions";
import QualificationInput from "./QualificationInput";
import QualificationRadioGroup from "./QualificationRadioGroup";
import QualificationSection from "./QualificationSection";
import QualificationSelect from "./QualificationSelect";

import {
    buildQualificationPayload,
    getInitialQualificationForm,
    getQualificationVisibility,
    TENTH_SYLLABUS_OPTIONS,
    TWELFTH_STREAM_OPTIONS,
    validateQualification,
} from "../qualificationUtils";


export default function QualificationUpdateForm({
    uid,
    profile = null,
    onClose,
    onUpdated,
    successMessage,
}) {
    const [
        form,
        setForm,
    ] = useState(() => ({
        ...getInitialQualificationForm(
            profile
        ),

        /*
         * IMPORTANT:
         *
         * Stored inputs remain available,
         * but initially no highest
         * qualification is selected.
         */
        highest: "",
    }));

    const [
        errors,
        setErrors,
    ] = useState({});

    const [
        saving,
        setSaving,
    ] = useState(false);


    const studentUid =
        uid ??
        profile?.uid ??
        profile?.id ??
        null;


    /*
    |--------------------------------------------------------------------------
    | Reload stored values when modal/profile changes
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const initial =
            getInitialQualificationForm(
                profile
            );

        setForm({
            ...initial,

            /*
             * None selected initially.
             */
            highest: "",
        });

        setErrors({});
    }, [profile]);


    /*
    |--------------------------------------------------------------------------
    | Visibility
    |--------------------------------------------------------------------------
    */

    const visibility =
        useMemo(
            () =>
                getQualificationVisibility(
                    form.highest
                ),
            [
                form.highest,
            ]
        );


    /*
    |--------------------------------------------------------------------------
    | Normal field changes
    |--------------------------------------------------------------------------
    */

    function updateField(
        field,
        value
    ) {
        setForm(
            (previous) => ({
                ...previous,
                [field]: value,
            })
        );

        setErrors(
            (previous) => ({
                ...previous,
                [field]: "",
            })
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Highest qualification
    |--------------------------------------------------------------------------
    |
    | Do NOT clear Degree / PG fields here.
    |
    | Existing stored values remain in memory
    | while user switches between radio buttons.
    |
    */

    function handleHighestChange(
        value
    ) {
        setForm(
            (previous) => ({
                ...previous,
                highest: value,
            })
        );

        setErrors(
            (previous) => ({
                ...previous,
                highest: "",
            })
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    async function handleSubmit(
        event
    ) {
        event.preventDefault();

        if (!studentUid) {
            await showAlert({
                icon: "error",

                title:
                    "Unable to Update",

                text:
                    "Student ID is missing.",
            });

            return;
        }


        const nextErrors =
            validateQualification(
                form,
                visibility
            );


        if (
            Object.keys(
                nextErrors
            ).length > 0
        ) {
            setErrors(
                nextErrors
            );

            await showAlert({
                icon: "warning",

                title:
                    "Complete Required Fields",

                text:
                    "Please complete all required qualification details.",
            });

            return;
        }


        try {
            setSaving(true);


            const payload =
                buildQualificationPayload(
                    form,
                    studentUid
                );


            console.log(
                "QUALIFICATION UPDATE PAYLOAD:",
                payload
            );


            const response =
                await fetch(
                    "/api/dashboard/student/qualification-update",
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
                "QUALIFICATION UPDATE RESPONSE:",
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
                        "Unable to update qualification."
                );
            }


            /*
             * Stop spinner first.
             */
            setSaving(false);


            /*
             * Show success alert.
             */
            await showAlert({
                icon: "success",

                title:
                    "Qualification Updated",

                text:
                    successMessage ||
                    result?.msg ||
                    "Your qualification details have been updated successfully.",

                confirmButtonText:
                    "OK",
            });


            /*
             * Refresh parent.
             */
            onUpdated?.(
                payload
            );


            /*
             * Close modal.
             */
            onClose?.();

        } catch (error) {
            console.error(
                "Qualification update error:",
                error
            );


            setSaving(false);


            await showAlert({
                icon: "error",

                title:
                    "Update Failed",

                text:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong while updating qualification.",
            });
        }
    }


    return (
        <form
            onSubmit={
                handleSubmit
            }
            className="
                overflow-y-auto
                bg-gradient-to-br
                from-pink-50
                via-white
                to-blue-50
                px-5
                py-6

                sm:px-7
            "
        >
            <div className="space-y-6">

                {/* Highest Qualification */}

                <QualificationSection
                    title="Highest Qualification"
                >
                    <HighestQualificationSelector
                        value={
                            form.highest
                        }
                        onChange={
                            handleHighestChange
                        }
                        error={
                            errors.highest
                        }
                    />
                </QualificationSection>


                {/* 10th */}

                {visibility.showTenth && (
                    <QualificationSection
                        title="Tenth Level"
                    >
                        <QualificationRadioGroup
                            name="tenth_syllabus"
                            value={
                                form.tenth_syllabus
                            }
                            options={
                                TENTH_SYLLABUS_OPTIONS
                            }
                            onChange={(value) =>
                                updateField(
                                    "tenth_syllabus",
                                    value
                                )
                            }
                            error={
                                errors.tenth_syllabus
                            }
                        />


                        <QualificationInput
                            label="Overall %"
                            value={
                                form.tenth_overall
                            }
                            placeholder="Enter percentage"
                            onChange={(value) =>
                                updateField(
                                    "tenth_overall",
                                    value
                                )
                            }
                            error={
                                errors.tenth_overall
                            }
                        />
                    </QualificationSection>
                )}


                {/* +2 / Twelfth */}

                {visibility.showTwelfth && (
                    <QualificationSection
                        title="Twelfth Level"
                    >
                        <div
                            className="
                                grid
                                gap-5

                                lg:grid-cols-3
                            "
                        >

                            {/* Only this stream is dropdown */}

                            <QualificationSelect
                                label="Stream"
                                value={
                                    form.twelth_stream
                                }
                                placeholder="Select stream"
                                options={
                                    TWELFTH_STREAM_OPTIONS
                                }
                                onChange={(value) =>
                                    updateField(
                                        "twelth_stream",
                                        value
                                    )
                                }
                                error={
                                    errors.twelth_stream
                                }
                            />


                            <QualificationInput
                                label="Overall %"
                                value={
                                    form.twelth_overall
                                }
                                placeholder="Enter percentage"
                                onChange={(value) =>
                                    updateField(
                                        "twelth_overall",
                                        value
                                    )
                                }
                                error={
                                    errors.twelth_overall
                                }
                            />


                            <QualificationInput
                                label="English %"
                                value={
                                    form.twelth_english
                                }
                                placeholder="Enter English percentage"
                                onChange={(value) =>
                                    updateField(
                                        "twelth_english",
                                        value
                                    )
                                }
                                error={
                                    errors.twelth_english
                                }
                            />
                        </div>
                    </QualificationSection>
                )}


                {/* Degree */}

                {visibility.showDegree && (
                    <QualificationSection
                        title="Degree Level"
                    >
                        <div
                            className="
                                grid
                                gap-5

                                lg:grid-cols-3
                            "
                        >
                            <QualificationInput
                                label="Subject / Stream"
                                value={
                                    form.degree_stream
                                }
                                placeholder="Enter degree subject"
                                onChange={(value) =>
                                    updateField(
                                        "degree_stream",
                                        value
                                    )
                                }
                                error={
                                    errors.degree_stream
                                }
                            />


                            <QualificationInput
                                label="Overall %"
                                value={
                                    form.degree_overall
                                }
                                placeholder="Enter percentage"
                                onChange={(value) =>
                                    updateField(
                                        "degree_overall",
                                        value
                                    )
                                }
                                error={
                                    errors.degree_overall
                                }
                            />


                            <QualificationInput
                                label="English %"
                                value={
                                    form.degree_english
                                }
                                placeholder="Enter English percentage"
                                onChange={(value) =>
                                    updateField(
                                        "degree_english",
                                        value
                                    )
                                }
                                error={
                                    errors.degree_english
                                }
                            />
                        </div>
                    </QualificationSection>
                )}


                {/* Masters */}

                {visibility.showPG && (
                    <QualificationSection
                        title="Masters Level"
                    >
                        <div
                            className="
                                grid
                                gap-5

                                lg:grid-cols-3
                            "
                        >
                            <QualificationInput
                                label="Subject / Stream"
                                value={
                                    form.pg_stream
                                }
                                placeholder="Enter Masters stream"
                                onChange={(value) =>
                                    updateField(
                                        "pg_stream",
                                        value
                                    )
                                }
                                error={
                                    errors.pg_stream
                                }
                            />


                            <QualificationInput
                                label="Overall %"
                                value={
                                    form.pg_overall
                                }
                                placeholder="Enter percentage"
                                onChange={(value) =>
                                    updateField(
                                        "pg_overall",
                                        value
                                    )
                                }
                                error={
                                    errors.pg_overall
                                }
                            />


                            <QualificationInput
                                label="English %"
                                value={
                                    form.pg_english
                                }
                                placeholder="Enter English percentage"
                                onChange={(value) =>
                                    updateField(
                                        "pg_english",
                                        value
                                    )
                                }
                                error={
                                    errors.pg_english
                                }
                            />
                        </div>
                    </QualificationSection>
                )}


                {/* IELTS */}

                {visibility.showIELTS && (
                    <QualificationSection
                        title="IELTS Score"
                    >
                        <QualificationInput
                            label="Overall Score"
                            value={
                                form.ielts_overall
                            }
                            placeholder="Enter overall score"
                            onChange={(value) =>
                                updateField(
                                    "ielts_overall",
                                    value
                                )
                            }
                            error={
                                errors.ielts_overall
                            }
                        />


                        <div
                            className="
                                grid
                                gap-5

                                sm:grid-cols-2
                                lg:grid-cols-4
                            "
                        >
                            <QualificationInput
                                label="Listening"
                                value={
                                    form.ielts_l
                                }
                                placeholder="Listening"
                                onChange={(value) =>
                                    updateField(
                                        "ielts_l",
                                        value
                                    )
                                }
                                error={
                                    errors.ielts_l
                                }
                            />


                            <QualificationInput
                                label="Reading"
                                value={
                                    form.ielts_r
                                }
                                placeholder="Reading"
                                onChange={(value) =>
                                    updateField(
                                        "ielts_r",
                                        value
                                    )
                                }
                                error={
                                    errors.ielts_r
                                }
                            />


                            <QualificationInput
                                label="Writing"
                                value={
                                    form.ielts_w
                                }
                                placeholder="Writing"
                                onChange={(value) =>
                                    updateField(
                                        "ielts_w",
                                        value
                                    )
                                }
                                error={
                                    errors.ielts_w
                                }
                            />


                            <QualificationInput
                                label="Speaking"
                                value={
                                    form.ielts_s
                                }
                                placeholder="Speaking"
                                onChange={(value) =>
                                    updateField(
                                        "ielts_s",
                                        value
                                    )
                                }
                                error={
                                    errors.ielts_s
                                }
                            />
                        </div>
                    </QualificationSection>
                )}
            </div>


            <QualificationActions
                saving={
                    saving
                }
                onCancel={
                    onClose
                }
            />
        </form>
    );
}


async function showAlert(
    options
) {
    return Swal.fire({
        confirmButtonColor:
            "#c01f53",

        ...options,

        didOpen: () => {
            const container =
                document.querySelector(
                    ".swal2-container"
                );

            if (container) {
                container.style.zIndex =
                    "20000";
            }
        },
    });
}