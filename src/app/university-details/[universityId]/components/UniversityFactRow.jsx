export default function UniversityFactRow({
    label,
    value,
}) {
    if (!value) return null;

    return (
        <div className="rounded-2xl bg-[#f7f9fd] p-4">
            <p className="text-xs font-black uppercase text-slate-500">
                {label}
            </p>

            <p className="mt-1 break-words font-black text-[#081c47]">
                {value}
            </p>
        </div>
    );
}