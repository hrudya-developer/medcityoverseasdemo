"use client";

export default function ProfileItem({
    icon: Icon,
    label,
    value,
    full = false,
}) {
    return (
        <div
            className={`
                group
                rounded-2xl
                border
                border-slate-200/70
                bg-slate-50/55
                p-4
                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:border-[#c01f53]/15
                hover:bg-white
                hover:shadow-[0_8px_24px_rgba(15,23,42,0.05)]

                ${
                    full
                        ? "sm:col-span-2"
                        : ""
                }
            `}
        >
            <div
                className="
                    flex
                    items-center
                    gap-3
                "
            >
                <div
                    className="
                        grid
                        h-9
                        w-9
                        shrink-0
                        place-items-center
                        rounded-xl
                        border
                        border-slate-100
                        bg-white
                        text-[#c01f53]
                        shadow-sm
                    "
                >
                    <Icon size={16} />
                </div>

                <div className="min-w-0">
                    <p
                        className="
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.08em]
                            text-slate-400
                        "
                    >
                        {label}
                    </p>

                    <p
                        className="
                            mt-1
                            break-words
                            text-sm
                            font-bold
                            text-slate-800
                        "
                    >
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}