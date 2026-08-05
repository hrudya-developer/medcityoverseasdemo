export default function SearchField({
    icon: Icon,
    children,
    step,
    label,
    active = false,
    disabled = false,
}) {
    return (
        <div
            className={`relative flex min-h-[88px] w-full items-center gap-3 rounded-[22px] border p-3 transition-all duration-300 ${
                active
                    ? "border-primary/50 bg-primary/10 shadow-[0_14px_30px_rgba(192,31,83,0.13)]"
                    : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/[0.06]"
            } ${disabled ? "opacity-50" : ""}`}
        >
            <div
                className={`grid size-12 shrink-0 place-content-center rounded-2xl transition-all duration-300 ${
                    active
                        ? "bg-primary text-white shadow-[0_10px_24px_rgba(192,31,83,0.32)]"
                        : "border border-white/10 bg-white/10 text-white/80"
                }`}
            >
                <Icon
                    aria-hidden="true"
                    size={21}
                />
            </div>

            <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-primary">
                        Step {step}
                    </span>

                    <span
                        aria-hidden="true"
                        className="size-1 rounded-full bg-white/20"
                    />

                    <span className="truncate text-[10px] font-bold uppercase tracking-[0.1em] text-white/45">
                        {label}
                    </span>
                </div>

                {children}
            </div>
        </div>
    );
}