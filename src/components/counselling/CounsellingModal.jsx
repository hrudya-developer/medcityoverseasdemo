"use client";

import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import CustomScrollbar from "@/components/SimpleBar";
import CounsellingForm from "../home/free-counselling/CounsellingForm";

export default function CounsellingModal({ open, onClose }) {
    const titleId = useId();

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose?.();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open, onClose]);

    if (!open) {
        return null;
    }

    return createPortal(
        <div
            role="presentation"
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6"
        >
            {/* Backdrop */}
            <button
                type="button"
                aria-label="Close counselling form"
                onClick={onClose}
                className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-md"
            />

            {/* Modal wrapper */}
            <div className="relative z-10 w-full max-w-[750px]">
                {/* Close button */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close counselling modal"
                    className="absolute -right-2 -top-12 z-30 grid size-10 place-items-center rounded-full bg-primary text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition duration-300 hover:rotate-90 hover:scale-110 hover:bg-primary/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 sm:-right-3 sm:-top-3"
                >
                    <X
                        className="size-5"
                        aria-hidden="true"
                    />
                </button>

                {/* Modal */}
                <section
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    className="relative w-full overflow-hidden rounded-[26px] border border-white/60 bg-[#f7f9fd] shadow-[0_30px_100px_rgba(0,0,0,0.4)]"
                >
                    <h2
                        id={titleId}
                        className="sr-only"
                    >
                        Request free counselling
                    </h2>

                    <CustomScrollbar
                        className="max-h-[82dvh]"
                        autoHide={false}
                    >
                        <div className="p-3 pr-5 sm:p-4 sm:pr-6">
                            <div className="mx-auto w-full max-w-[700px]">
                                <CounsellingForm onSuccess={onClose} />
                            </div>
                        </div>
                    </CustomScrollbar>
                </section>
            </div>
        </div>,
        document.body
    );
}