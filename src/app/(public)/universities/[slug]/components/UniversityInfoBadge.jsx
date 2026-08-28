import cn from "@/lib/cn";

export default function UniversityInfoBadge({
    label,
    value,
}) {
    if (!value) return null;

    const positive = [
        "Available",
        "Not Required",
    ].includes(value);

    return (
        <div className="rounded-2xl border border-[#e6eaf2] bg-[#f7f9fd] p-4">
            <p className="text-xs font-black uppercase text-slate-500">
                {label}
            </p>

            <p
                className={cn(`mt-1 font-black ${positive
                        ? "text-emerald-600"
                        : "text-primary"
                    }`)}
            >
                {value}
            </p>
        </div>
    );
}