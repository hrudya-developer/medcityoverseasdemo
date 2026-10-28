"use client";

import { useSyncExternalStore } from "react";

/*
 * A live countdown to the start of an event. The server and the first
 * browser render show dashes (the server snapshot is null), so the
 * clock never causes a hydration mismatch; the numbers appear right after.
 */

let nowSeconds = null;
const listeners = new Set();
let timer = null;

function tick() {
    nowSeconds = Math.floor(Date.now() / 1000);
    listeners.forEach((listener) => listener());
}

function subscribe(listener) {
    listeners.add(listener);

    if (!timer) {
        tick();
        timer = window.setInterval(tick, 1000);
    }

    return () => {
        listeners.delete(listener);

        if (!listeners.size) {
            window.clearInterval(timer);
            timer = null;
        }
    };
}

function getSnapshot() {
    if (nowSeconds === null) {
        nowSeconds = Math.floor(Date.now() / 1000);
    }

    return nowSeconds;
}

function getServerSnapshot() {
    return null;
}

const UNITS = [
    ["days", 86400],
    ["hours", 3600],
    ["minutes", 60],
    ["seconds", 1],
];

export default function EventCountdown({ startsAtIso }) {
    const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const start = Math.floor(Date.parse(startsAtIso ?? "") / 1000);

    if (!Number.isFinite(start) || (now !== null && start <= now)) {
        return null;
    }

    // Before the clock is known the boxes show dashes, keeping their space.
    const left = now === null ? 0 : start - now;
    const values = UNITS.map(([label, size], index) => {
        const value = index === 0 ? Math.floor(left / size) : Math.floor((left % UNITS[index - 1][1]) / size);

        return [label, now === null ? "--" : String(value).padStart(2, "0")];
    });

    return (
        <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Starts in</p>
            <div className="mt-2 grid max-w-sm grid-cols-4 gap-2" role="timer" aria-live="off">
                {values.map(([label, value]) => (
                    <div key={label} className="rounded-xl bg-darkPrimary px-2 py-2.5 text-center text-white">
                        <span className="block font-nunito text-xl font-extrabold tabular-nums sm:text-2xl">
                            {value}
                        </span>
                        <span className="block text-[11px] font-semibold uppercase tracking-wide text-white/75">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
