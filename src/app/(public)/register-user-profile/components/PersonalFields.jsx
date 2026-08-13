"use client";

import {
    LockKeyhole,
    Mail,
    ShieldCheck,
    User,
} from "lucide-react";

function FieldShell({
    label,
    icon: Icon,
    children,
    note,
}) {
    return (
        <div>
            <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-3
                "
            >
                <label
                    className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.08em]
                        text-[#631A33]
                    "
                >
                    {label}
                </label>

                {note ? (
                    <span
                        className="
                            text-[9px]
                            font-semibold
                            text-slate-400
                        "
                    >
                        {note}
                    </span>
                ) : null}
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

                    transition-all
                    duration-200

                    hover:border-slate-300

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
                    <Icon size={15} />
                </div>

                {children}
            </div>
        </div>
    );
}

export default function PersonalFields({
    form,
    email,
    onChange,
}) {
    /*
     * Email fallback:
     *
     * 1. authenticated session email
     * 2. form.email
     * 3. database response emailId
     */
    const displayEmail =
        email ||
        form?.email ||
        form?.emailId ||
        "";

    return (
        <div className="space-y-4">

            {/* FULL NAME */}
            <FieldShell
                label="Full Name"
                icon={User}
            >
                <input
                    type="text"
                    value={form?.name || ""}
                    onChange={(event) =>
                        onChange(
                            "name",
                            event.target.value
                        )
                    }
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="
                        h-full
                        min-w-0
                        flex-1

                        bg-transparent

                        px-3

                        text-sm
                        font-semibold
                        text-slate-800

                        outline-none

                        placeholder:font-medium
                        placeholder:text-slate-400
                    "
                />
            </FieldShell>

            {/* EMAIL */}
            <FieldShell
                label="Email Address"
                icon={Mail}
                note="Verified login email"
            >
                <input
                    type="email"
                    value={displayEmail}
                    readOnly
                    aria-readonly="true"
                    tabIndex={-1}
                    placeholder="Email unavailable"
                    className="
                        h-full
                        min-w-0
                        flex-1

                        cursor-default

                        bg-transparent

                        px-3

                        text-sm
                        font-semibold
                        text-slate-700

                        outline-none

                        placeholder:text-slate-400
                    "
                />

                {displayEmail ? (
                    <div
                        className="
                            flex
                            shrink-0
                            items-center
                            gap-1

                            rounded-full

                            border
                            border-emerald-100

                            bg-emerald-50

                            px-2
                            py-1

                            text-[9px]
                            font-black

                            text-emerald-700
                        "
                    >
                        <ShieldCheck size={11} />

                        <span className="hidden sm:inline">
                            Verified
                        </span>

                        <LockKeyhole size={10} />
                    </div>
                ) : null}
            </FieldShell>
        </div>
    );
}