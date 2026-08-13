"use client";

import {
    AlertCircle,
    CheckCircle2,
    Info,
} from "lucide-react";

export default function VerificationMessage({
    type = "error",
    message,
}) {
    if (!message) {
        return null;
    }

    const config = {
        error: {
            icon:
                AlertCircle,

            classes:
                "border-red-400/25 bg-red-500/10 text-red-200",
        },

        success: {
            icon:
                CheckCircle2,

            classes:
                "border-emerald-400/25 bg-emerald-500/10 text-emerald-200",
        },

        info: {
            icon:
                Info,

            classes:
                "border-blue-400/25 bg-blue-500/10 text-blue-200",
        },
    };

    const current =
        config[type] ??
        config.error;

    const Icon =
        current.icon;

    return (
        <div
            role={
                type === "error"
                    ? "alert"
                    : "status"
            }
            className={`
                mb-5

                flex
                items-start

                gap-3

                rounded-xl

                border

                px-4
                py-3

                text-sm

                ${current.classes}
            `}
        >
            <Icon
                size={17}
                className="mt-0.5 shrink-0"
            />

            <p className="leading-5">
                {message}
            </p>
        </div>
    );
}