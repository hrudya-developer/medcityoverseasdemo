"use client";

import { CalendarDays } from "lucide-react";

export default function DobField({
    value,
    onChange,
}) {
    return (
        <div className="w-full min-w-0">
            <div className="flex min-h-[16px] items-center">
                <label
                    className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.08em]
                        text-[#631A33]
                    "
                >
                    Date of Birth
                </label>
            </div>

            <div
                className="
                    mt-1.5
                    flex
                    h-11
                    items-center
                    rounded-xl
                    border
                    border-slate-200/80
                    bg-white
                    px-3
                    shadow-[0_3px_14px_rgba(15,23,42,0.035)]

                    focus-within:border-[#c01f53]/45
                    focus-within:ring-4
                    focus-within:ring-[#c01f53]/[0.06]
                "
            >
                <div
                    className="
                        grid
                        h-8
                        w-8
                        shrink-0
                        place-items-center
                        rounded-lg
                        bg-slate-50
                        text-slate-400
                    "
                >
                    <CalendarDays size={15} />
                </div>

                <input
                    type="text"
                    value={value || ""}
                    onChange={(event) =>
                        onChange(
                            event.target.value
                        )
                    }
                    placeholder="DD-MM-YYYY"
                    inputMode="numeric"
                    className="
                        h-full
                        min-w-0
                        flex-1
                        bg-transparent
                        px-3
                        text-sm
                        font-semibold
                        text-slate-700
                        outline-none

                        placeholder:text-slate-400
                    "
                />
            </div>
        </div>
    );
}