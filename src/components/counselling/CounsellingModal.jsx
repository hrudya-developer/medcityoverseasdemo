"use client";

import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import CustomScrollbar from "@/components/SimpleBar";
import CounsellingForm from "../home/free-counselling/CounsellingForm";
import CounsellingIntro from "../home/free-counselling/CounsellingIntro";

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
            className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-5 lg:p-8"
        >
            <button
                type="button"
                aria-label="Close counselling form"
                onClick={onClose}
                className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-md"
            />

            <div className="relative z-10 w-full max-w-[1250px]">
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close counselling modal"
                    className="absolute -right-1 -top-12 z-30 grid size-10 place-items-center rounded-full bg-primary text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition duration-300 hover:rotate-90 hover:scale-110 hover:bg-primary/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 sm:right-0 lg:-right-3 lg:-top-3"
                >
                    <X
                        className="size-5"
                        aria-hidden="true"
                    />
                </button>

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
                        className="max-h-[88dvh]"
                        autoHide={false}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
                            <div className="hidden min-h-full lg:block">
                                <CounsellingIntro />
                            </div>

                            <div className="p-3 sm:p-5 lg:p-7">
                                <div className="mx-auto w-full max-w-[700px]">
                                    <CounsellingForm
                                        onSuccess={
                                            onClose
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </CustomScrollbar>
                </section>
            </div>
        </div>,
        document.body
    );
}