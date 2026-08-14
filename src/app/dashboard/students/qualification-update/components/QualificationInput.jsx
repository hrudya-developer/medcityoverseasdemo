export default function QualificationInput({
    label,
    value,
    placeholder = "",
    onChange,
    error,
}) {
    return (
        <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                {label}
            </span>

            <input
                type="text"
                value={
                    value ?? ""
                }
                placeholder={
                    placeholder
                }
                onChange={(event) =>
                    onChange(
                        event.target.value
                    )
                }
                className={`
                    w-full
                    rounded-xl
                    border
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-slate-900
                    outline-none
                    transition

                    ${
                        error
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/10"
                    }
                `}
            />

            {error && (
                <p className="mt-2 text-xs font-bold text-red-500">
                    {error}
                </p>
            )}
        </label>
    );
}