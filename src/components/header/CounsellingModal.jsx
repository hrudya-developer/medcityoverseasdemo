"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import FreeCounsellingForm from "./FreeCounsellingForm";

const CounsellingModal = ({ open, close }) => {
    const closeButtonRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;

        // Prevent background scrolling
        document.body.style.overflow = "hidden";

        // Focus the close button when the modal opens
        closeButtonRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                close();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, close]);

    if (!open || typeof document === "undefined") {
        return null;
    }

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            close();
        }
    };

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="counselling-modal-title"
            aria-describedby="counselling-modal-description"
            onMouseDown={handleBackdropClick}
            className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        overflow-y-auto
        bg-black/75
        p-4
        backdrop-blur-sm
        sm:p-6
      "
        >
            <div
                className="
          relative
          max-h-[90vh]
          w-full max-w-3xl
          overflow-y-auto
          rounded-2xl
          bg-white
          shadow-2xl
          sm:rounded-3xl
        "
            >
                <header className="sr-only">
                    <h2 id="counselling-modal-title">
                        Book a Free Counselling Session
                    </h2>

                    <p id="counselling-modal-description">
                        Complete the form to request free study-abroad counselling from
                        Medcity Study Abroad.
                    </p>
                </header>

                <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={close}
                    aria-label="Close counselling form"
                    className="
            absolute right-3 top-3 z-20
            inline-flex h-10 w-10
            items-center justify-center
            rounded-full
            bg-white
            text-slate-700
            shadow-md
            transition
            hover:bg-slate-100
            hover:text-primary
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
            focus-visible:ring-offset-2
            sm:right-4 sm:top-4
          "
                >
                    <X className="h-5 w-5" aria-hidden="true" />
                </button>

                <FreeCounsellingForm onSuccess={close} />
            </div>
        </div>,
        document.body,
    );
};

export default CounsellingModal;