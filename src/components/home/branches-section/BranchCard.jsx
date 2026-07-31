import { MapPin } from "lucide-react";

const BranchCard = ({
    branch,
    index,
}) => {
    return (
        <article
            className="
                group relative isolate
                flex min-h-[108px]
                items-center gap-4
                overflow-hidden
                rounded-[22px]
                border border-slate-200/80
                bg-white
                px-4 py-4
                shadow-[0_10px_28px_rgba(15,23,42,0.07)]
                transition-all duration-300
                hover:-translate-y-1.5
                hover:border-primary/30
                hover:shadow-[0_18px_40px_rgba(192,31,83,0.15)]
                sm:px-5
            "
        >
            <span
                aria-hidden="true"
                className="
                    absolute inset-y-0 left-0
                    w-1 origin-bottom
                    scale-y-0
                    bg-gradient-to-b
                    from-primary
                    to-darkPrimary
                    transition-transform duration-300
                    group-hover:scale-y-100
                "
            />

            <span
                aria-hidden="true"
                className="
                    absolute -right-10 -top-10
                    h-24 w-24 rounded-full
                    bg-primary/5
                    transition-transform duration-500
                    group-hover:scale-150
                "
            />

            <span
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute bottom-2 right-3
                    h-9 w-9 opacity-20
                    [background-image:radial-gradient(#c01f53_1.4px,transparent_1.4px)]
                    [background-size:6px_6px]
                    transition-opacity duration-300
                    group-hover:opacity-40
                "
            />

            <span
                className="
                    relative z-10
                    flex h-14 w-14
                    shrink-0
                    items-center justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-primary/10
                    to-primary/5
                    text-primary
                    ring-1 ring-primary/10
                    shadow-[0_8px_20px_rgba(192,31,83,0.08)]
                    transition-all duration-300
                    group-hover:-rotate-3
                    group-hover:scale-105
                    group-hover:bg-primary
                    group-hover:text-white
                    group-hover:ring-primary
                "
            >
                <MapPin
                    aria-hidden="true"
                    strokeWidth={2.3}
                    className="
                        h-7 w-7
                        transition-transform duration-300
                        group-hover:-translate-y-0.5
                    "
                />
            </span>

            <div
                className="
                    relative z-10
                    min-w-0 flex-1
                "
            >
                <span
                    className="
                        block text-[10px]
                        font-bold uppercase
                        tracking-[0.14em]
                        text-slate-400
                    "
                >
                    Medcity Branch
                </span>

                <h3
                    className="
                        mt-1 line-clamp-2
                        text-base font-bold
                        leading-5
                        text-slate-900
                        transition-colors duration-300
                        group-hover:text-primary
                        xl:text-lg
                    "
                >
                    {branch}
                </h3>
            </div>

            <span
                aria-hidden="true"
                className="
                    relative z-10
                    self-start
                    text-2xl font-black
                    leading-none
                    text-slate-100
                    transition-colors duration-300
                    group-hover:text-primary/15
                "
            >
                {String(index + 1).padStart(
                    2,
                    "0"
                )}
            </span>

            <span
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute -bottom-16 -left-16
                    h-32 w-32
                    rounded-full
                    bg-primary/5
                    transition-transform duration-500
                    group-hover:scale-[2.2]
                "
            />
        </article>
    );
};

export default BranchCard;