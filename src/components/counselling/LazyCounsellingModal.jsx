"use client";

import { Component, useEffect } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Phone, X } from "lucide-react";

import {
    CONTACT_PHONE,
    CONTACT_PHONE_DISPLAY,
} from "@/lib/seoSchema";

/*
 * The counselling modal pulls in the form, react-select, the phone
 * field, SimpleBar and SweetAlert2. It renders nothing until it is
 * opened, so its code stays out of the first page load:
 *
 * - it is fetched once the page has loaded and the browser is idle,
 *   or earlier when a visitor points at, focuses or touches a
 *   counselling button (see counsellingTriggerProps);
 * - a first tap before that shows the backdrop with a spinner;
 * - a failed download is retried once, and if it still fails the
 *   visitor gets a small dialog with the contact page and phone
 *   number instead of a broken page.
 */

let modalModule = null;

function loadCounsellingModal() {
    if (!modalModule) {
        modalModule = import("./CounsellingModal")
            .catch(() => import("./CounsellingModal"))
            .catch((error) => {
                // Let a later call try again from scratch.
                modalModule = null;

                throw error;
            });
    }

    return modalModule;
}

export function preloadCounsellingModal() {
    loadCounsellingModal().catch(() => {
        // Opening the modal tries again and shows the fallback.
    });
}

/* Spread onto any button that opens the counselling modal. */
export const counsellingTriggerProps = {
    onPointerEnter: preloadCounsellingModal,
    onFocus: preloadCounsellingModal,
    onTouchStart: preloadCounsellingModal,
};

function ModalLayer({ children, onBackdropClick }) {
    return createPortal(
        <div
            role="presentation"
            className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-5 lg:p-8"
        >
            <div
                aria-hidden="true"
                onClick={onBackdropClick}
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {children}
        </div>,
        document.body
    );
}

function CounsellingModalLoading() {
    return (
        <ModalLayer>
            <span
                role="status"
                aria-label="Loading"
                className="relative z-10 size-10 animate-spin rounded-full border-4 border-white/30 border-t-white"
            />
        </ModalLayer>
    );
}

const CounsellingModal = dynamic(
    () => loadCounsellingModal(),
    {
        ssr: false,
        loading: CounsellingModalLoading,
    }
);

function CounsellingModalUnavailable({ onClose }) {
    useEffect(() => {
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
            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, [onClose]);

    return (
        <ModalLayer onBackdropClick={onClose}>
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="counselling-unavailable-title"
                className="relative z-10 w-full max-w-md rounded-[26px] bg-white p-6 text-center shadow-[0_30px_100px_rgba(0,0,0,0.4)] sm:p-8"
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-3 top-3 grid size-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                >
                    <X
                        className="size-5"
                        aria-hidden="true"
                    />
                </button>

                <h2
                    id="counselling-unavailable-title"
                    className="text-xl font-bold text-slate-900"
                >
                    The counselling form could not load
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                    Please call us or use the contact page and our
                    counsellors will help you.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <a
                        href={`tel:${CONTACT_PHONE}`}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-darkPrimary"
                    >
                        <Phone
                            className="size-4"
                            aria-hidden="true"
                        />

                        {CONTACT_PHONE_DISPLAY}
                    </a>

                    <Link
                        href="/contact-us"
                        onClick={onClose}
                        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary px-5 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
                    >
                        Contact us
                    </Link>
                </div>
            </section>
        </ModalLayer>
    );
}

class CounsellingModalBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = { failed: false };
    }

    static getDerivedStateFromError() {
        return { failed: true };
    }

    componentDidCatch(error) {
        console.error(
            "Counselling modal could not be loaded:",
            error
        );
    }

    render() {
        if (this.state.failed) {
            return (
                <CounsellingModalUnavailable
                    onClose={this.props.onClose}
                />
            );
        }

        return this.props.children;
    }
}

export default function LazyCounsellingModal({
    open,
    onClose,
}) {
    // Fetch the modal in the background once the page has loaded.
    useEffect(() => {
        let idleId = null;
        let timerId = null;

        const schedule = () => {
            if ("requestIdleCallback" in window) {
                idleId = window.requestIdleCallback(
                    preloadCounsellingModal,
                    { timeout: 5000 }
                );
            } else {
                timerId = window.setTimeout(
                    preloadCounsellingModal,
                    2000
                );
            }
        };

        if (document.readyState === "complete") {
            schedule();
        } else {
            window.addEventListener("load", schedule, {
                once: true,
            });
        }

        return () => {
            window.removeEventListener("load", schedule);

            if (idleId !== null) {
                window.cancelIdleCallback(idleId);
            }

            if (timerId !== null) {
                window.clearTimeout(timerId);
            }
        };
    }, []);

    if (!open) {
        return null;
    }

    return (
        <CounsellingModalBoundary onClose={onClose}>
            <CounsellingModal
                open={open}
                onClose={onClose}
            />
        </CounsellingModalBoundary>
    );
}
