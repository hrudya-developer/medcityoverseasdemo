"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import FeedbackForm from "./FeedbackForm";
import FeedbackHistory from "./FeedbackHistory";


function parseApiDate(
    value
) {
    if (!value) {
        return null;
    }


    const date =
        new Date(
            String(value)
                .trim()
                .replace(
                    " ",
                    "T"
                )
        );


    return Number.isNaN(
        date.getTime()
    )
        ? null
        : date;
}


function normalizeType(
    value
) {
    const type =
        String(
            value ||
                "feedback"
        )
            .trim()
            .toLowerCase();


    if (
        type ===
        "suggestion"
    ) {
        return "Suggestion";
    }


    if (
        type ===
        "issue"
    ) {
        return "Issue";
    }


    return "Feedback";
}


function normalizeFeedback(
    item,
    index
) {
    const createdAt =
        item?.created_at ??
        item?.createdAt ??
        item?.submitted_at ??
        item?.date ??
        "";


    return {
        id:
            item?.id ??
            item?.feedback_id ??
            `feedback-${index}`,

        type:
            normalizeType(
                item?.type ??
                    item?.feedback_type ??
                    item?.problem
            ),

        message:
            String(
                item?.message ??
                    item?.feedback ??
                    item?.description ??
                    item?.comment ??
                    item?.problem ??
                    ""
            ).trim(),

        reply:
            String(
                item?.reply ??
                    ""
            ).trim(),

        created_at:
            createdAt,

        status:
            item?.status,
    };
}


export default function Feedback() {
    const [
        feedbacks,
        setFeedbacks,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState("");

    const [
        showAll,
        setShowAll,
    ] = useState(false);


    const loadFeedbacks =
        useCallback(
            async () => {
                try {
                    setLoading(
                        true
                    );

                    setError("");


                    const response =
                        await fetch(
                            "/api/dashboard/student/feedback/get",
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


                    console.log(
                        "FEEDBACK HISTORY:",
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
                                "Unable to load feedback history."
                        );
                    }


                    const data =
                        Array.isArray(
                            result?.data
                        )
                            ? result.data
                            : [];


                    const normalized =
                        data
                            .map(
                                normalizeFeedback
                            )
                            .filter(
                                (
                                    item
                                ) =>
                                    item.message
                            )
                            .sort(
                                (
                                    first,
                                    second
                                ) => {
                                    const firstDate =
                                        parseApiDate(
                                            first
                                                .created_at
                                        );

                                    const secondDate =
                                        parseApiDate(
                                            second
                                                .created_at
                                        );


                                    return (
                                        (secondDate?.getTime() ||
                                            0) -
                                        (firstDate?.getTime() ||
                                            0)
                                    );
                                }
                            );


                    setFeedbacks(
                        normalized
                    );

                } catch (error) {
                    console.error(
                        "FEEDBACK HISTORY ERROR:",
                        error
                    );


                    setFeedbacks(
                        []
                    );


                    setError(
                        error instanceof
                        Error
                            ? error.message
                            : "Unable to load feedback history."
                    );

                } finally {
                    setLoading(
                        false
                    );
                }
            },
            []
        );


    useEffect(() => {
        loadFeedbacks();
    }, [loadFeedbacks]);


    async function handleSubmitted() {
        setShowAll(
            false
        );

        await loadFeedbacks();
    }


    return (
        <section
            className="
                min-h-screen
                bg-slate-50
                px-3
                py-4

                sm:px-5
                lg:px-8
            "
        >
            <div className="mx-auto w-full max-w-[1280px]">
                <div className="grid grid-cols-1 gap-5">

                    <FeedbackForm
                        onSubmitted={
                            handleSubmitted
                        }
                    />


                    <FeedbackHistory
                        feedbacks={
                            feedbacks
                        }

                        loading={
                            loading
                        }

                        error={
                            error
                        }

                        showAll={
                            showAll
                        }

                        onRefresh={
                            loadFeedbacks
                        }

                        onToggleShowAll={() =>
                            setShowAll(
                                (
                                    value
                                ) =>
                                    !value
                            )
                        }
                    />

                </div>
            </div>
        </section>
    );
}