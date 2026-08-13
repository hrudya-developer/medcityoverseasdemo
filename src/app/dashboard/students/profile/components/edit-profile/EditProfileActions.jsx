"use client";

export default function EditProfileActions({
    loading,
    onCancel,
}) {
    return (
        <div
            className="
                flex
                flex-col-reverse
                gap-3

                border-t
                border-slate-100

                pt-5

                sm:flex-row
                sm:justify-end
            "
        >
            <button
                type="button"
                onClick={
                    onCancel
                }
                disabled={
                    loading
                }
                className="
                    rounded-xl

                    border
                    border-slate-200

                    bg-white

                    px-5
                    py-2.5

                    text-sm
                    font-bold

                    text-slate-600

                    transition-all

                    hover:bg-slate-50

                    disabled:opacity-50
                "
            >
                Cancel
            </button>

            <button
                type="submit"
                disabled={
                    loading
                }
                className="
                    inline-flex
                    min-w-[150px]
                    items-center
                    justify-center

                    rounded-xl

                    bg-gradient-to-r
                    from-[#c01f53]
                    to-[#8d1741]

                    px-5
                    py-2.5

                    text-sm
                    font-bold
                    text-white

                    shadow-[0_10px_24px_rgba(192,31,83,0.20)]

                    transition-all

                    hover:-translate-y-0.5

                    disabled:cursor-not-allowed
                    disabled:translate-y-0
                    disabled:opacity-60
                "
            >
                {loading
                    ? "Updating..."
                    : "Save Changes"}
            </button>
        </div>
    );
}