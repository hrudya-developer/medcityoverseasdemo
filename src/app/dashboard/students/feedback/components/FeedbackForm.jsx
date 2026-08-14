"use client";

import {
    useState,
} from "react";

import {
    BookOpen,
    Loader2,
    Send,
} from "lucide-react";

import Swal from "sweetalert2";


const FEEDBACK_TYPES = [
    {
        label:
            "Feedback",
        value:
            "feedback",
    },
    {
        label:
            "Suggestions",
        value:
            "suggestion",
    },
    {
        label:
            "Issues",
        value:
            "issue",
    },
];


export default function FeedbackForm({
    onSubmitted,
}) {
    const [
        selectedType,
        setSelectedType,
    ] = useState(
        "feedback"
    );

    const [
        message,
        setMessage,
    ] = useState("");

    const [
        submitting,
        setSubmitting,
    ] = useState(false);


    async function handleSubmit(
        event
    ) {
        event.preventDefault();


        if (submitting) {
            return;
        }


        const trimmed =
            message.trim();


        if (!trimmed) {
            await Swal.fire({
                icon:
                    "warning",

                title:
                    "Message required",

                text:
                    "Please enter your feedback, suggestion, or issue.",

                confirmButtonColor:
                    "#c01f53",
            });

            return;
        }


        try {
            setSubmitting(
                true
            );


            const response =
                await fetch(
                    "/api/dashboard/student/feedback/add",
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
                                type:
                                    selectedType,

                                message:
                                    trimmed,
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
                        "Unable to submit feedback."
                );
            }


            setMessage("");

            setSelectedType(
                "feedback"
            );


            await Swal.fire({
                icon:
                    "success",

                title:
                    "Submitted",

                text:
                    result?.msg ||
                    "Your feedback was submitted successfully.",

                timer:
                    1800,

                showConfirmButton:
                    false,
            });


            await onSubmitted?.();

        } catch (error) {
            console.error(
                "FEEDBACK SUBMISSION ERROR:",
                error
            );


            await Swal.fire({
                icon:
                    "error",

                title:
                    "Submission Failed",

                text:
                    error instanceof
                    Error
                        ? error.message
                        : "Unable to submit feedback.",

                confirmButtonColor:
                    "#c01f53",
            });

        } finally {
            setSubmitting(
                false
            );
        }
    }


    return (
        <div
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-[0_20px_60px_rgba(15,23,42,0.08)]

                sm:p-7
                lg:p-9
            "
        >
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />


            <div className="relative z-10">

                <div className="mb-7 flex items-center justify-between gap-4">

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                hidden
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-gradient-to-br
                                from-primary
                                to-darkPrimary
                                text-white
                                shadow-lg

                                sm:flex
                            "
                        >
                            <BookOpen
                                size={21}
                            />
                        </div>


                        <div>
                            <h1 className="text-xl font-black text-slate-900 sm:text-2xl">
                                Share Your Feedback
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Your suggestions
                                help us improve
                                your experience.
                            </p>
                        </div>

                    </div>


                    <div className="hidden rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary sm:block">
                        We value your opinion
                    </div>

                </div>


                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="space-y-6"
                >
                    <fieldset
                        disabled={
                            submitting
                        }
                    >
                        <legend className="mb-3 text-sm font-bold text-slate-800">
                            What would you like to share?
                        </legend>


                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                            {FEEDBACK_TYPES.map(
                                (
                                    type
                                ) => {
                                    const selected =
                                        selectedType ===
                                        type.value;


                                    return (
                                        <label
                                            key={
                                                type.value
                                            }

                                            className={`
                                                flex
                                                cursor-pointer
                                                items-center
                                                gap-3
                                                rounded-xl
                                                border
                                                px-4
                                                py-3.5
                                                transition

                                                ${
                                                    selected
                                                        ? "border-primary bg-primary/5"
                                                        : "border-slate-200 bg-slate-50 hover:border-primary/40"
                                                }
                                            `}
                                        >
                                            <input
                                                type="radio"

                                                name="feedbackType"

                                                value={
                                                    type.value
                                                }

                                                checked={
                                                    selected
                                                }

                                                onChange={(
                                                    event
                                                ) =>
                                                    setSelectedType(
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                }

                                                className="sr-only"
                                            />


                                            <span
                                                className={`
                                                    flex
                                                    h-5
                                                    w-5
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    border-2

                                                    ${
                                                        selected
                                                            ? "border-primary bg-primary"
                                                            : "border-slate-400 bg-white"
                                                    }
                                                `}
                                            >
                                                {selected && (
                                                    <span className="h-2 w-2 rounded-full bg-white" />
                                                )}
                                            </span>


                                            <span
                                                className={
                                                    selected
                                                        ? "text-sm font-semibold text-primary"
                                                        : "text-sm font-semibold text-slate-700"
                                                }
                                            >
                                                {
                                                    type.label
                                                }
                                            </span>

                                        </label>
                                    );
                                }
                            )}

                        </div>
                    </fieldset>


                    <div>
                        <div className="mb-3 flex items-center justify-between">

                            <label
                                htmlFor="feedback-message"
                                className="text-sm font-bold text-slate-800"
                            >
                                Tell us more
                            </label>

                            <span className="text-xs text-slate-400">
                                {
                                    message.length
                                }
                                /500
                            </span>

                        </div>


                        <textarea
                            id="feedback-message"

                            value={
                                message
                            }

                            maxLength={
                                500
                            }

                            disabled={
                                submitting
                            }

                            onChange={(
                                event
                            ) =>
                                setMessage(
                                    event
                                        .target
                                        .value
                                )
                            }

                            placeholder="Write your feedback, suggestion or issue here..."

                            rows={
                                5
                            }

                            className="
                                min-h-[170px]
                                w-full
                                resize-y
                                rounded-2xl
                                border
                                border-slate-200
                                bg-slate-50
                                px-4
                                py-4
                                text-sm
                                leading-6
                                outline-none
                                transition

                                focus:border-primary/50
                                focus:bg-white
                                focus:ring-4
                                focus:ring-primary/10
                            "
                        />
                    </div>


                    <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

                        <p className="text-xs leading-relaxed text-slate-400 sm:max-w-sm">
                            Your feedback
                            will be reviewed
                            by our team and
                            used to improve
                            our services.
                        </p>


                        <button
                            type="submit"

                            disabled={
                                submitting ||
                                !message.trim()
                            }

                            className="
                                inline-flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-gradient-to-r
                                from-primary
                                to-darkPrimary
                                px-7
                                py-3.5
                                text-sm
                                font-bold
                                text-white
                                shadow-lg
                                transition

                                disabled:cursor-not-allowed
                                disabled:opacity-50

                                sm:w-auto
                                sm:min-w-[180px]
                            "
                        >
                            {submitting ? (
                                <>
                                    <Loader2
                                        size={17}
                                        className="animate-spin"
                                    />

                                    Submitting...
                                </>
                            ) : (
                                <>
                                    Submit Feedback

                                    <Send
                                        size={17}
                                    />
                                </>
                            )}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}