"use client";

import { Component, Suspense, lazy, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
    isRegisteredFor,
    markPopupDismissed,
    markPopupShown,
    popupDismissedRecently,
    popupShownThisSession,
} from "./eventStorage";

/*
 * The site-wide event registration popup. This file is the small part
 * that ships with every public page: it only decides when to open.
 * The dialog itself (form, phone picker, poster) is fetched when the
 * browser is idle, and the poster loads only once the dialog opens.
 *
 * It opens after 8 seconds or 40% scroll, whichever comes first, at
 * most once per browser session, never on the event pages, /events or
 * account pages, not for 3 days after a dismissal and never again
 * after a registration for that event.
 */

const OPEN_AFTER_MS = 8000;
const OPEN_AT_SCROLL = 0.4;

// Account pages inside (public); admin and dashboard are outside the public layout.
const EXCLUDED_PREFIXES = ["/events", "/login", "/register-user-profile", "/verify-otp", "/admin", "/dashboard"];

let dialogModule = null;

function loadDialog() {
    if (!dialogModule) {
        dialogModule = import("./EventPopupDialog")
            .catch(() => import("./EventPopupDialog"))
            .catch((error) => {
                dialogModule = null;

                throw error;
            });
    }

    return dialogModule;
}

function preloadDialog() {
    loadDialog().catch(() => {
        // Opening tries again; a failure then shows nothing.
    });
}

let EventPopupDialog = lazy(loadDialog);

class DialogBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { failed: false };
    }

    static getDerivedStateFromError() {
        return { failed: true };
    }

    componentDidCatch(error) {
        console.error("Event popup could not be loaded:", error);
        EventPopupDialog = lazy(loadDialog);
    }

    render() {
        return this.state.failed ? null : this.props.children;
    }
}

function isExcludedPath(pathname, event) {
    const path = String(pathname || "/").replace(/\/+$/, "") || "/";

    return (
        path === event.url ||
        EXCLUDED_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))
    );
}

/* Another dialog is open, or the visitor is typing in a form: not now. */
function visitorIsBusy() {
    if (document.querySelector('[role="dialog"][aria-modal="true"], dialog[open]')) {
        return true;
    }

    if (document.body.style.overflow === "hidden" || document.documentElement.style.overflow === "hidden") {
        return true;
    }

    const active = document.activeElement;

    return Boolean(active && (active.isContentEditable || /^(INPUT|SELECT|TEXTAREA)$/.test(active.tagName)));
}

const RETRY_WHEN_BUSY_MS = 5000;

function canShow(event) {
    return !popupShownThisSession() && !popupDismissedRecently(event.slug) && !isRegisteredFor(event.slug);
}

export default function EventPopup({ event }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const excluded = !event?.slug || isExcludedPath(pathname, event);

    useEffect(() => {
        if (excluded || open || !canShow(event)) {
            return undefined;
        }

        let idleId = null;
        let timerId = null;
        let fired = false;

        const show = () => {
            if (fired) {
                return;
            }

            // Try again a little later instead of covering what they are doing.
            if (visitorIsBusy()) {
                window.clearTimeout(timerId);
                timerId = window.setTimeout(show, RETRY_WHEN_BUSY_MS);

                return;
            }

            fired = true;
            cleanup();

            // Checked again: another tab may have shown it or the visitor registered.
            if (canShow(event)) {
                markPopupShown();
                setOpen(true);
            }
        };

        const onScroll = () => {
            const root = document.documentElement;
            const scrollable = root.scrollHeight - window.innerHeight;

            if (scrollable > 0 && window.scrollY / scrollable >= OPEN_AT_SCROLL) {
                show();
            }
        };

        function cleanup() {
            window.clearTimeout(timerId);
            window.removeEventListener("scroll", onScroll);

            if (idleId !== null && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleId);
            }
        }

        timerId = window.setTimeout(show, OPEN_AFTER_MS);
        window.addEventListener("scroll", onScroll, { passive: true });

        // Fetch the dialog's code in the background so it opens at once.
        if ("requestIdleCallback" in window) {
            idleId = window.requestIdleCallback(preloadDialog, { timeout: 5000 });
        } else {
            window.setTimeout(preloadDialog, 3000);
        }

        return cleanup;
    }, [event, excluded, open]);

    if (!open || excluded) {
        return null;
    }

    const close = ({ dismissed = true } = {}) => {
        if (dismissed) {
            markPopupDismissed(event.slug);
        }

        setOpen(false);
    };

    return (
        <DialogBoundary>
            <Suspense fallback={null}>
                <EventPopupDialog event={event} onClose={close} />
            </Suspense>
        </DialogBoundary>
    );
}
