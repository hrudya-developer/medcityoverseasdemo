"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, X } from "lucide-react";

import EventRegistrationForm from "./EventRegistrationForm";

/*
 * The event popup's dialog, loaded lazily by EventPopup. Esc, a click
 * on the backdrop and the close button close it; focus moves into the
 * dialog, stays there while it is open and returns afterwards; the
 * page behind does not scroll.
 */

const FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function EventPopupDialog({ event, onClose }) {
    const titleId = useId();
    const dialogRef = useRef(null);
    const closeRef = useRef(null);
    const [registered, setRegistered] = useState(false);

    // Closing remembers the dismissal for a few days, unless the visitor registered.
    const close = () => onClose({ dismissed: !registered });

    // Lock the page scroll and remember where focus was.
    useEffect(() => {
        const previousFocus = document.activeElement;
        const { overflow, paddingRight } = document.body.style;
        const scrollbar = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = "hidden";

        if (scrollbar > 0) {
            document.body.style.paddingRight = `${scrollbar}px`;
        }

        closeRef.current?.focus({ preventScroll: true });

        return () => {
            document.body.style.overflow = overflow;
            document.body.style.paddingRight = paddingRight;

            if (previousFocus instanceof HTMLElement && document.contains(previousFocus)) {
                previousFocus.focus({ preventScroll: true });
            }
        };
    }, []);

    const handleKeyDown = (keyEvent) => {
        if (keyEvent.key === "Escape") {
            keyEvent.stopPropagation();
            close();

            return;
        }

        if (keyEvent.key !== "Tab" || !dialogRef.current) {
            return;
        }

        const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)].filter(
            (element) => element.offsetParent !== null || element === document.activeElement
        );

        if (!items.length) {
            return;
        }

        const first = items[0];
        const last = items[items.length - 1];

        if (keyEvent.shiftKey && document.activeElement === first) {
            keyEvent.preventDefault();
            last.focus();
        } else if (!keyEvent.shiftKey && document.activeElement === last) {
            keyEvent.preventDefault();
            first.focus();
        }
    };

    // Esc also works when focus has left the dialog (e.g. on the page behind).
    useEffect(() => {
        const onKey = (keyEvent) => {
            if (keyEvent.key === "Escape" && !dialogRef.current?.contains(keyEvent.target)) {
                onClose({ dismissed: !registered });
            }
        };

        document.addEventListener("keydown", onKey);

        return () => document.removeEventListener("keydown", onKey);
    }, [onClose, registered]);

    return createPortal(
        <div className="fixed inset-0 z-[10000] flex items-end justify-center p-0 sm:items-center sm:p-5">
            <div aria-hidden="true" onClick={close} className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />

            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                onKeyDown={handleKeyDown}
                className="relative z-10 flex max-h-[calc(100dvh-0.75rem)] w-full max-w-[880px] flex-col overflow-hidden rounded-t-[26px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:max-h-[calc(100dvh-2.5rem)] sm:rounded-[26px] md:flex-row"
            >
                <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="absolute right-3 top-3 z-20 grid size-10 place-items-center rounded-full bg-white/95 text-slate-700 shadow-md transition hover:bg-white hover:text-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
                >
                    <X className="size-5" aria-hidden="true" />
                </button>

                {event.poster && (
                    <div className="relative aspect-[2/1] w-full shrink-0 bg-gradient-to-b from-[#3a3a3a] to-[#1b1b1b] md:aspect-auto md:w-[44%]">
                        <Image
                            src={event.poster}
                            unoptimized={/^https?:/i.test(event.poster)}
                            alt={event.posterAlt}
                            fill
                            sizes="(min-width: 768px) 400px, 100vw"
                            className="object-cover object-[50%_12%] md:object-contain md:object-center"
                        />
                    </div>
                )}

                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5 pt-5 sm:px-7 sm:pb-7 sm:pt-7">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Register free</p>
                    <h2 id={titleId} className="mt-1.5 pr-10 font-nunito text-xl font-extrabold leading-snug text-darkPrimary sm:text-2xl">
                        {event.title}
                    </h2>
                    {event.dateLabel && (
                        <p className="mt-2 flex items-start gap-2 text-sm font-semibold text-slate-700">
                            <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                            <time dateTime={event.startsAtIso}>{event.dateLabel}</time>
                        </p>
                    )}

                    <div className="mt-4">
                        <EventRegistrationForm
                            event={{ slug: event.slug }}
                            source="popup"
                            compact
                            onSuccess={() => setRegistered(true)}
                        />
                    </div>

                    <Link
                        href={event.url}
                        onClick={() => onClose({ dismissed: false })}
                        className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-primary hover:underline focus:outline-none focus-visible:underline"
                    >
                        View details
                        <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </div>,
        document.body
    );
}
