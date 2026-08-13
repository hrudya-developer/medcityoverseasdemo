"use client";

import {
    MapPin,
} from "lucide-react";

export default function AddressField({
    value,
    onChange,
}) {
    return (
        <div className="md:col-span-2">
            <label
                htmlFor="address"
                className="
                    mb-2
                    block
                    text-[11px]
                    font-black
                    uppercase
                    tracking-[0.08em]
                    text-[#631A33]
                "
            >
                Address
            </label>

            <div
                className="
                    relative

                    overflow-hidden

                    rounded-2xl

                    border
                    border-slate-200

                    bg-white

                    transition-all

                    focus-within:border-[#c01f53]/50
                    focus-within:ring-4
                    focus-within:ring-[#c01f53]/8
                "
            >
                <MapPin
                    size={18}
                    className="
                        absolute
                        left-4
                        top-4
                        text-slate-400
                    "
                />

                <textarea
                    id="address"
                    value={value}
                    onChange={(event) =>
                        onChange(
                            event.target.value
                        )
                    }
                    rows={4}
                    placeholder="Enter your complete address"
                    className="
                        min-h-[110px]
                        w-full
                        resize-none

                        bg-transparent

                        py-4
                        pl-12
                        pr-4

                        text-sm
                        font-medium
                        text-slate-800

                        outline-none

                        placeholder:text-slate-400
                    "
                />
            </div>
        </div>
    );
}