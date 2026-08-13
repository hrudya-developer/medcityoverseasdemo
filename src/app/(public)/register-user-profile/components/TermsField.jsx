"use client";

import {
    ShieldCheck,
} from "lucide-react";

export default function TermsField({
    checked,
    onChange,
}) {
    return (
        <div className="md:col-span-2">
            <label
                className="
                    flex

                    cursor-pointer

                    items-start

                    gap-3

                    rounded-2xl

                    border
                    border-slate-200

                    bg-slate-50

                    p-4

                    transition-all

                    hover:border-[#c01f53]/25
                    hover:bg-[#c01f53]/[0.025]
                "
            >
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) =>
                        onChange(
                            event.target.checked
                        )
                    }
                    className="
                        mt-0.5

                        h-4
                        w-4

                        shrink-0

                        accent-[#c01f53]
                    "
                />

                <span className="flex-1">
                    <span className="block text-sm font-semibold text-slate-700">
                        I accept the Terms & Conditions
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                        I consent to my profile information being used for my
                        student account and study-abroad services.
                    </span>
                </span>

                <ShieldCheck
                    size={18}
                    className="shrink-0 text-emerald-500"
                />
            </label>
        </div>
    );
}