import {
    Plane,
} from "lucide-react";

export default function DestinationEmpty() {
    return (
        <div
            role="status"
            className="flex min-h-[280px] items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-white/70 px-5 text-center shadow-sm"
        >
            <div>
                <Plane
                    aria-hidden="true"
                    className="mx-auto h-10 w-10 text-primary"
                />

                <h3
                    className="mt-4 text-xl font-bold text-darkPrimary"
                >
                    No destinations found
                </h3>

                <p
                    className="mt-2 text-sm text-slate-600"
                >
                    Study destinations are currently
                    unavailable.
                </p>
            </div>
        </div>
    );
}