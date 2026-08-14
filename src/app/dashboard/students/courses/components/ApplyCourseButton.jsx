"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    CheckCircle2,
} from "lucide-react";

import Swal from "sweetalert2";

import {
    applyCourse,
} from "../services/courseActions";

import QualificationGateModal from "../../qualification-update/components/QualificationGateModal";


export default function ApplyCourseButton({
    course,
    initiallyApplied = false,
}) {
    const [
        applying,
        setApplying,
    ] = useState(false);

    const [
        checkingQualification,
        setCheckingQualification,
    ] = useState(false);

    const [
        applied,
        setApplied,
    ] = useState(
        initiallyApplied
    );

    const [
        qualificationOpen,
        setQualificationOpen,
    ] = useState(false);

    const [
        qualificationUid,
        setQualificationUid,
    ] = useState(null);


    /*
    |--------------------------------------------------------------------------
    | COURSE ID
    |--------------------------------------------------------------------------
    */

    const applicationCourseId =
        course?.id ??
        course?.course_id ??
        course?.uc_id ??
        course?.c_id ??
        null;


    const hasValidCourseId =
        applicationCourseId !==
            null &&
        applicationCourseId !==
            undefined &&
        String(
            applicationCourseId
        ).trim() !== "";


    /*
    |--------------------------------------------------------------------------
    | SYNC PARENT APPLIED STATE
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (
            initiallyApplied
        ) {
            setApplied(
                true
            );
        }
    }, [initiallyApplied]);


    /*
    |--------------------------------------------------------------------------
    | CHECK IF COURSE WAS ALREADY APPLIED
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (
            initiallyApplied ||
            !hasValidCourseId
        ) {
            return;
        }


        let cancelled =
            false;


        async function checkAppliedStatus() {
            try {
                const response =
                    await fetch(
                        "/api/dashboard/student/my-applications",
                        {
                            method:
                                "POST",

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


                if (
                    !response.ok ||
                    result?.status !==
                        true ||
                    !Array.isArray(
                        result?.data
                    )
                ) {
                    return;
                }


                const alreadyApplied =
                    result.data.some(
                        (
                            application
                        ) => {
                            const appliedCourseId =
                                application
                                    ?.c_id ??
                                application
                                    ?.course_id ??
                                application
                                    ?.uc_id ??
                                null;


                            if (
                                appliedCourseId ===
                                    null ||
                                appliedCourseId ===
                                    undefined
                            ) {
                                return false;
                            }


                            return (
                                String(
                                    appliedCourseId
                                ) ===
                                String(
                                    applicationCourseId
                                )
                            );
                        }
                    );


                if (
                    !cancelled &&
                    alreadyApplied
                ) {
                    setApplied(
                        true
                    );
                }

            } catch (error) {
                console.error(
                    "CHECK APPLIED STATUS ERROR:",
                    error
                );
            }
        }


        checkAppliedStatus();


        return () => {
            cancelled =
                true;
        };

    }, [
        applicationCourseId,
        hasValidCourseId,
        initiallyApplied,
    ]);


    /*
    |--------------------------------------------------------------------------
    | GET SESSION
    |--------------------------------------------------------------------------
    */

    async function getAuthenticatedStudent() {
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


        const result =
            await response
                .json()
                .catch(
                    () =>
                        null
                );


        if (
            !response.ok ||
            result?.authenticated !==
                true
        ) {
            throw new Error(
                "Your login session has expired. Please login again."
            );
        }


        const uid =
            result?.user?.uid ??
            result?.user?.id ??
            null;


        if (!uid) {
            throw new Error(
                "Student ID could not be found."
            );
        }


        return String(
            uid
        );
    }


    /*
    |--------------------------------------------------------------------------
    | CHECK QUALIFICATION
    |--------------------------------------------------------------------------
    */

    async function getLatestProfile(
        uid
    ) {
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

                    credentials:
                        "include",

                    cache:
                        "no-store",

                    body:
                        JSON.stringify({
                            uid:
                                String(
                                    uid
                                ),
                        }),
                }
            );


        const result =
            await response
                .json()
                .catch(
                    () =>
                        null
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


        return (
            result
                ?.qualificationComplete ===
            true
        );
    }


    /*
    |--------------------------------------------------------------------------
    | SUBMIT APPLICATION
    |--------------------------------------------------------------------------
    */

    async function submitApplication() {
        if (
            !hasValidCourseId
        ) {
            return;
        }


        try {
            setApplying(
                true
            );


            console.log(
                "APPLY COURSE DEBUG:",
                {
                    selectedId:
                        applicationCourseId,

                    id:
                        course?.id,

                    c_id:
                        course?.c_id,

                    course_id:
                        course?.course_id,

                    uc_id:
                        course?.uc_id,

                    course:
                        course?.course ??
                        course?.course_name ??
                        course?.name,
                }
            );


            const result =
                await applyCourse(
                    applicationCourseId
                );


            console.log(
                "APPLY RESULT:",
                result
            );


            /*
             * IMPORTANT:
             *
             * Immediately:
             *
             * Apply Now
             *     ↓
             * Applied
             *
             * Button also becomes disabled.
             */
            setApplied(
                true
            );


            window.dispatchEvent(
                new CustomEvent(
                    "studentApplicationUpdated",
                    {
                        detail: {
                            courseId:
                                String(
                                    applicationCourseId
                                ),
                        },
                    }
                )
            );


            await Swal.fire({
                icon:
                    "success",

                title:
                    "Application Submitted!",

                text:
                    result?.msg ||
                    result?.message ||
                    "You have successfully applied for this course.",

                confirmButtonText:
                    "OK",

                confirmButtonColor:
                    "#c01f53",
            });

        } catch (error) {
            console.error(
                "COURSE APPLICATION ERROR:",
                error
            );


            await Swal.fire({
                icon:
                    "error",

                title:
                    "Application Failed",

                text:
                    error instanceof
                    Error
                        ? error.message
                        : "Unable to apply for this course.",

                confirmButtonColor:
                    "#c01f53",
            });

        } finally {
            setApplying(
                false
            );
        }
    }


    /*
    |--------------------------------------------------------------------------
    | APPLY CLICK
    |--------------------------------------------------------------------------
    */

    async function handleApply() {
        if (
            applying ||
            checkingQualification ||
            applied ||
            !hasValidCourseId
        ) {
            return;
        }


        try {
            setCheckingQualification(
                true
            );


            const uid =
                await getAuthenticatedStudent();


            const qualificationComplete =
                await getLatestProfile(
                    uid
                );


            if (
                qualificationComplete !==
                true
            ) {
                setQualificationUid(
                    uid
                );

                setQualificationOpen(
                    true
                );

                return;
            }


            await submitApplication();

        } catch (error) {
            console.error(
                "APPLY VALIDATION ERROR:",
                error
            );


            await Swal.fire({
                icon:
                    "error",

                title:
                    "Unable to Apply",

                text:
                    error instanceof
                    Error
                        ? error.message
                        : "Unable to verify your qualification.",

                confirmButtonColor:
                    "#c01f53",
            });

        } finally {
            setCheckingQualification(
                false
            );
        }
    }


    /*
    |--------------------------------------------------------------------------
    | QUALIFICATION UPDATED
    |--------------------------------------------------------------------------
    */

    async function handleQualificationUpdated() {
        setQualificationOpen(
            false
        );


        await Swal.fire({
            icon:
                "success",

            title:
                "Qualification Updated",

            text:
                "Your qualification has been updated successfully. You can now apply for this course.",

            confirmButtonText:
                "OK",

            confirmButtonColor:
                "#c01f53",
        });
    }


    /*
    |--------------------------------------------------------------------------
    | UI
    |--------------------------------------------------------------------------
    */

    return (
        <>
            <button
                type="button"

                onClick={
                    handleApply
                }

                disabled={
                    applying ||
                    checkingQualification ||
                    applied ||
                    !hasValidCourseId
                }

                className={`
                    inline-flex
                    h-11
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    px-4
                    text-sm
                    font-black
                    transition-all
                    duration-200

                    ${
                        applied
                            ? `
                                border
                                border-emerald-200
                                bg-emerald-50
                                text-emerald-700
                            `
                            : `
                                bg-gradient-to-r
                                from-[#c01f53]
                                to-[#8f153e]
                                text-white
                                shadow-[0_10px_24px_rgba(192,31,83,0.20)]

                                hover:-translate-y-0.5
                                hover:shadow-[0_14px_30px_rgba(192,31,83,0.28)]
                            `
                    }

                    disabled:cursor-not-allowed
                    disabled:opacity-80
                `}
            >
                {checkingQualification ? (
                    <>
                        <Spinner />

                        Checking...
                    </>
                ) : applying ? (
                    <>
                        <Spinner />

                        Applying...
                    </>
                ) : applied ? (
                    <>
                        <CheckCircle2
                            size={16}
                        />

                        Applied
                    </>
                ) : (
                    "Apply Now"
                )}
            </button>


            <QualificationGateModal
                open={
                    qualificationOpen
                }

                uid={
                    qualificationUid
                }

                onClose={() =>
                    setQualificationOpen(
                        false
                    )
                }

                onUpdated={
                    handleQualificationUpdated
                }
            />
        </>
    );
}


function Spinner() {
    return (
        <span
            className="
                h-4
                w-4
                animate-spin
                rounded-full
                border-2
                border-white/40
                border-t-white
            "
        />
    );
}