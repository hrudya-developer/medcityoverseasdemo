import {
    Loader2,
    Search,
} from "lucide-react";

export default function SearchButton({
    onClick,
    disabled,
    loading,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="group relative flex min-h-[88px] w-full items-center justify-center gap-3 overflow-hidden rounded-[22px] bg-gradient-to-br from-primary via-[#b0194a] to-darkPrimary px-6 text-sm font-black text-white shadow-[0_16px_32px_rgba(192,31,83,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_42px_rgba(192,31,83,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-45"
        >
            <span
                aria-hidden="true"
                className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
            />

            <span className="relative flex items-center gap-3">
                {loading ? (
                    <>
                        Searching

                        <Loader2
                            aria-hidden="true"
                            size={18}
                            className="animate-spin"
                        />
                    </>
                ) : (
                    <>
                        Search

                        <span className="grid size-8 place-content-center rounded-full bg-white/15 transition-transform group-hover:scale-110">
                            <Search
                                aria-hidden="true"
                                size={16}
                            />
                        </span>
                    </>
                )}
            </span>
        </button>
    );
}