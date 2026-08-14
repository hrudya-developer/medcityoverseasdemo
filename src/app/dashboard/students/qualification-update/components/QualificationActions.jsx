export default function QualificationActions({
    saving,
    onCancel,
}) {
    return (
        <div
            className="
                mt-7
                flex
                flex-col
                justify-end
                gap-3
                border-t
                border-slate-200
                pt-5

                sm:flex-row
            "
        >
            <button
                type="submit"
                disabled={
                    saving
                }
                className="
                    inline-flex
                    min-w-[180px]
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-darkPrimary
                    px-7
                    py-3
                    text-sm
                    font-bold
                    text-white

                    hover:bg-primary

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                "
            >
                {saving && (
                    <span
                        className="
                            h-4
                            w-4
                            animate-spin
                            rounded-full
                            border-2
                            border-white/40
                            border-t-white
                        "
                    />
                )}

                {saving
                    ? "Updating..."
                    : "Update Qualification"}
            </button>

            <button
                type="button"
                onClick={
                    onCancel
                }
                disabled={
                    saving
                }
                className="
                    rounded-xl
                    bg-slate-200
                    px-6
                    py-3
                    text-sm
                    font-bold
                    text-slate-700

                    hover:bg-slate-300
                "
            >
                Cancel
            </button>
        </div>
    );
}