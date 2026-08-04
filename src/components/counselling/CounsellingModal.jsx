"use client";

import {
    useEffect,
    useId,
} from "react";

import { createPortal } from "react-dom";
import { X } from "lucide-react";
import CounsellingIntro from "../home/free-counselling/CounsellingIntro";
import CounsellingForm from "../home/free-counselling/CounsellingForm";



export default function CounsellingModal({
    open,
    onClose,
}) {
    const titleId = useId();

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow =
            "hidden";

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose?.();
            }
        };

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            document.body.style.overflow =
                previousOverflow;

            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, [open, onClose]);

    if (!open) {
        return null;
    }

    return createPortal(
        <div
            role="presentation"
            className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-5"
        >
            <button
                type="button"
                aria-label="Close counselling form"
                onClick={onClose}
                className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-sm"
            />

            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="relative z-10 max-h-[94dvh] w-full max-w-[1380px] overflow-y-auto rounded-[30px] bg-[#f7f9fd] shadow-[0_30px_100px_rgba(0,0,0,0.35)]"
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close counselling modal"
                    className="absolute right-3 top-3 z-30 grid size-11 place-items-center rounded-full border border-white/20 bg-black/50 text-white shadow-lg backdrop-blur-md transition hover:rotate-90 hover:bg-white hover:text-primary sm:right-5 sm:top-5"
                >
                    <X
                        className="size-5"
                        aria-hidden="true"
                    />
                </button>

                <h2
                    id={titleId}
                    className="sr-only"
                >
                    Request free counselling
                </h2>

                <div className="grid min-h-[680px] items-stretch lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="hidden p-4 lg:block">
                        <CounsellingIntro />
                    </div>

                    <div className="p-3 sm:p-5 lg:p-6">
                        <CounsellingForm />
                    </div>
                </div>
            </section>
        </div>,
        document.body
    );
}