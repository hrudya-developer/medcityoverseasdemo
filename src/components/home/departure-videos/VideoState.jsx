"use client";

import {
    CircleAlert,
    Loader2,
    VideoOff,
} from "lucide-react";

export const LoadingState = () => (
    <div
        role="status"
        className="flex min-h-[390px] w-full items-center justify-center px-5"
    >
        <div className="flex flex-col items-center gap-3 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />

            <p className="text-sm font-medium text-slate-500">
                Loading departure videos...
            </p>
        </div>
    </div>
);

export const ErrorState = ({
    message,
}) => (
    <div
        role="alert"
        className="flex min-h-[390px] w-full items-center justify-center px-5 text-center"
    >
        <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 px-6 py-5">
            <CircleAlert className="mx-auto h-8 w-8 text-red-500" />

            <p className="mt-3 text-sm leading-6 text-red-700">
                {message}
            </p>
        </div>
    </div>
);

export const EmptyState = () => (
    <div className="flex min-h-[390px] w-full items-center justify-center px-5">
        <div className="text-center">
            <VideoOff className="mx-auto h-8 w-8 text-slate-400" />

            <p className="mt-3 text-slate-500">
                No departure videos are
                currently available.
            </p>
        </div>
    </div>
);