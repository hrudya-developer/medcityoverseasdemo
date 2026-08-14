"use client";

import {
    useEffect,
} from "react";

import {
    X,
} from "lucide-react";

import QualificationUpdateForm from "./QualificationUpdateForm";


export default function QualificationUpdateModal({
    open,
    profile,
    onClose,
    onUpdated,
}) {
    useEffect(() => {
        if (!open) {
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


    return (
        <div
            className="
                fixed
                inset-0
                z-[9999]
                flex
                items-center
                justify-center
                bg-black/70
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
                        border-b
                        border-slate-100
                        bg-white
                        px-6
                        py-4
                    "
                >
                    <div>
                        <h2 className="text-lg font-black text-slate-900">
                            Update Qualifications
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Update your academic
                            and language details.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        aria-label="Close"
                        className="
                            ml-auto
                            grid
                            h-9
                            w-9
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
                    profile={
                        profile
                    }
                    onClose={
                        onClose
                    }
                    onUpdated={
                        onUpdated
                    }
                    successMessage="Your qualification details have been updated successfully."
                />
            </div>
        </div>
    );
}