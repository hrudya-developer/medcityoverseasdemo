"use client";

import {
    Check,
} from "lucide-react";

const OPTIONS = [
    "Male",
    "Female",
    "Other",
];

export default function GenderField({
    value,
    onChange,
}) {
    return (
        <div className="w-full">
            <label
                className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.08em]
                    text-[#631A33]
                "
            >
                Gender
            </label>

            <div
                className="
                    mt-1.5
                    grid
                    grid-cols-3
                    gap-2
                    sm:gap-3
                "
            >
                {OPTIONS.map(
                    (option) => {
                        const selected =
                            value === option;

                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() =>
                                    onChange(
                                        option
                                    )
                                }
                                className={`
                                    relative
                                    h-11
                                    rounded-xl
                                    border
                                    px-3
                                    text-sm
                                    font-bold
                                    transition-all
                                    duration-200

                                    ${
                                        selected
                                            ? `
                                                border-[#c01f53]
                                                bg-[#c01f53]
                                                text-white
                                                shadow-[0_8px_20px_rgba(192,31,83,0.18)]
                                            `
                                            : `
                                                border-slate-200
                                                bg-white
                                                text-slate-600
                                                hover:border-[#c01f53]/30
                                                hover:bg-[#c01f53]/5
                                            `
                                    }
                                `}
                            >
                                {option}

                                {selected && (
                                    <Check
                                        size={13}
                                        className="
                                            absolute
                                            right-3
                                            top-1/2
                                            -translate-y-1/2
                                        "
                                    />
                                )}
                            </button>
                        );
                    }
                )}
            </div>
        </div>
    );
}