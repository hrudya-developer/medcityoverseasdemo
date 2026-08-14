"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    Award,
    BarChart3,
    ClipboardList,
    GraduationCap,
    Target,
    X,
} from "lucide-react";

import QualificationUpdateForm from "./QualificationUpdateForm";

export default function QualificationGateModal({
    open,
    uid,
    onClose,
    onUpdated,
}) {
    const [
        showForm,
        setShowForm,
    ] = useState(false);

    useEffect(() => {
        if (!open) {
            setShowForm(false);
            return;
        }

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow =
            "hidden";

        return () => {
            document.body.style.overflow =
                previousOverflow;
        };
    }, [open]);

    if (!open) {
        return null;
    }

    function handleCloseGate() {
        setShowForm(false);
        onClose?.();
    }

    function handleFormBack() {
        setShowForm(false);
    }

    function handleQualificationUpdated(
        payload
    ) {
        setShowForm(false);

        onUpdated?.(
            payload
        );
    }

    /*
     * Step 2:
     * Qualification form
     */
    if (showForm) {
        return (
            <div
                className="
                    fixed
                    inset-0
                    z-[9999]
                    flex
                    items-center
                    justify-center
                    bg-black/80
                    px-4
                    py-6
                    backdrop-blur-sm
                "
            >
                <div
                    className="
                        relative
                        flex
                        max-h-[92vh]
                        w-full
                        max-w-4xl
                        flex-col
                        overflow-hidden
                        rounded-3xl
                        bg-white
                        shadow-2xl
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            border-b
                            border-slate-100
                            bg-white
                            px-5
                            py-4

                            sm:px-6
                        "
                    >
                        <button
                            type="button"
                            onClick={
                                handleFormBack
                            }
                            aria-label="Back"
                            className="
                                grid
                                h-9
                                w-9
                                shrink-0
                                place-items-center
                                rounded-full
                                bg-slate-100
                                text-darkPrimary
                                transition

                                hover:bg-primary
                                hover:text-white
                            "
                        >
                            ←
                        </button>

                        <div className="min-w-0">
                            <h2 className="font-black text-slate-900">
                                Update Qualifications
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Select your highest qualification first.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={
                                handleCloseGate
                            }
                            aria-label="Close"
                            className="
                                ml-auto
                                grid
                                h-9
                                w-9
                                shrink-0
                                place-items-center
                                rounded-full
                                bg-primary
                                text-white
                                transition

                                hover:bg-darkPrimary
                            "
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <QualificationUpdateForm
                        uid={uid}
                        profile={null}
                        forceBlank
                        onClose={
                            handleFormBack
                        }
                        onUpdated={
                            handleQualificationUpdated
                        }
                        successMessage="You have updated your qualification successfully. Now you may apply for this course."
                    />
                </div>
            </div>
        );
    }

    /*
     * Step 1:
     * Qualification gate intro
     */
    return (
        <div
            className="
                fixed
                inset-0
                z-[9999]
                flex
                items-center
                justify-center
                bg-black/80
                px-4
                py-6
                backdrop-blur-sm
            "
        >
            <div
                className="
                    relative
                    w-full
                    max-w-5xl
                    overflow-hidden
                    rounded-3xl
                    bg-white
                    shadow-2xl
                "
            >
                <button
                    type="button"
                    onClick={
                        handleCloseGate
                    }
                    aria-label="Close"
                    className="
                        absolute
                        right-4
                        top-4
                        z-10
                        grid
                        h-10
                        w-10
                        place-items-center
                        rounded-full
                        bg-primary
                        text-white
                        transition

                        hover:bg-darkPrimary
                    "
                >
                    <X size={20} />
                </button>

                <div className="p-6 sm:p-8 lg:p-10">
                    <div className="flex items-center gap-4 pr-12">
                        <div
                            className="
                                grid
                                h-16
                                w-16
                                shrink-0
                                place-items-center
                                rounded-2xl
                                bg-slate-100
                                text-primary
                            "
                        >
                            <GraduationCap
                                size={32}
                            />
                        </div>

                        <div>
                            <h2 className="text-xl font-black text-slate-900">
                                UPDATE{" "}
                                <span className="text-primary">
                                    QUALIFICATIONS
                                </span>
                            </h2>

                            <div className="mt-3 h-1 w-24 rounded-full bg-primary" />
                        </div>
                    </div>

                    <p className="mt-6 text-sm leading-6 text-slate-600">
                        Complete your qualification
                        details before applying for a
                        course. This helps us determine
                        eligibility and recommend suitable
                        opportunities.
                    </p>

                    <div
                        className="
                            mt-8
                            grid
                            gap-4

                            sm:grid-cols-2
                            lg:grid-cols-4
                        "
                    >
                        <Feature
                            icon={
                                <ClipboardList
                                    size={22}
                                />
                            }
                            title="Personalized Analysis"
                        />

                        <Feature
                            icon={
                                <BarChart3
                                    size={22}
                                />
                            }
                            title="Better Shortlisting"
                        />

                        <Feature
                            icon={
                                <Target
                                    size={22}
                                />
                            }
                            title="Higher Success Rate"
                        />

                        <Feature
                            icon={
                                <Award
                                    size={22}
                                />
                            }
                            title="Expert Guidance"
                        />
                    </div>
                </div>

                <div
                    className="
                        grid
                        gap-4
                        border-t
                        border-slate-100
                        bg-slate-50
                        p-5

                        sm:grid-cols-2
                        sm:p-7
                    "
                >
                    <button
                        type="button"
                        onClick={() =>
                            setShowForm(true)
                        }
                        disabled={
                            !uid
                        }
                        className="
                            rounded-xl
                            bg-darkPrimary
                            px-4
                            py-3
                            text-sm
                            font-bold
                            text-white
                            transition

                            hover:bg-primary

                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        UPDATE NOW →
                    </button>

                    <button
                        type="button"
                        onClick={
                            handleCloseGate
                        }
                        className="
                            rounded-xl
                            border
                            border-darkPrimary
                            bg-white
                            px-4
                            py-3
                            text-sm
                            font-bold
                            text-darkPrimary
                            transition

                            hover:border-primary
                            hover:text-primary
                        "
                    >
                        MAYBE LATER
                    </button>
                </div>
            </div>
        </div>
    );
}

function Feature({
    icon,
    title,
}) {
    return (
        <div
            className="
                rounded-2xl
                border
                border-slate-100
                bg-white
                p-4
                shadow-sm
            "
        >
            <div
                className="
                    mb-3
                    grid
                    h-11
                    w-11
                    place-items-center
                    rounded-xl
                    bg-primary
                    text-white
                "
            >
                {icon}
            </div>

            <h3 className="text-sm font-bold text-slate-900">
                {title}
            </h3>
        </div>
    );
}