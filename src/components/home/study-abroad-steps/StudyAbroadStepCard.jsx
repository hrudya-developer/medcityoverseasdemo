import { ChevronRight } from "lucide-react";

import cn from "@/lib/cn";

const StudyAbroadStepCard = ({
    id,
    title,
    description,
    Icon,
    index,
}) => {
    const isPrimary = index % 2 === 1;

    return (
        <article className="relative">
            <span
                aria-hidden="true"
                className={cn(`
          absolute -left-[34px] top-1/2
          hidden h-3.5 w-3.5
          -translate-y-1/2 rounded-full
          ring-[6px] ring-[#fafafd]
          lg:block
          ${isPrimary ? "bg-primary" : "bg-secondary"}
        `)}
            />

            <div
                className="group relative flex items-center gap-4 overflow-hidden rounded-[22px] border border-white bg-white/85 p-4 shadow-[0_10px_35px_rgba(15,23,42,0.07)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-white hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)] sm:p-5"
            >
                {/* Side accent */}
                <div
                    aria-hidden="true"
                    className={cn(`
            absolute inset-y-0 left-0
            w-1 rounded-r-full
            transition-all duration-300
            group-hover:w-1.5
            ${isPrimary
                            ? "bg-primary"
                            : "bg-secondary"
                        }
          `)}
                />

                {/* Background number */}
                <span
                    aria-hidden="true"
                    className="absolute right-14 top-1/2 -translate-y-1/2 text-6xl font-black text-slate-900/[0.025]"
                >
                    {id}
                </span>

                <div
                    className={cn(`
            relative z-10 flex h-12 w-12
            shrink-0 items-center justify-center
            rounded-2xl border
            transition-all duration-300
            group-hover:rotate-3
            group-hover:scale-105
            ${isPrimary
                            ? "border-primary/20 bg-primary/10 text-primary"
                            : "border-secondary/20 bg-secondary/10 text-secondary"
                        }
          `)}
                >
                    <Icon
                        aria-hidden="true"
                        className="h-6 w-6"
                        strokeWidth={1.8}
                    />
                </div>

                <div className="relative z-10 min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                        <span
                            className={cn(`
                text-xs font-black tracking-[0.14em]
                ${isPrimary
                                    ? "text-primary"
                                    : "text-secondary"
                                }
              `)}
                        >
                            STEP {id}
                        </span>

                        <span
                            aria-hidden="true"
                            className={cn(`
                h-px w-8
                ${isPrimary
                                    ? "bg-primary/30"
                                    : "bg-secondary/30"
                                }
              `)}
                        />
                    </div>

                    <h3 className="mt-1.5 text-base font-bold leading-tight text-darkPrimary sm:text-lg">
                        {title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-slate-600">
                        {description}
                    </p>
                </div>

                <div
                    className="relative z-10 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 text-secondary transition-all duration-300 group-hover:translate-x-1 group-hover:bg-secondary group-hover:text-white sm:flex"
                >
                    <ChevronRight
                        aria-hidden="true"
                        className="h-4 w-4"
                    />
                </div>
            </div>
        </article>
    );
};

export default StudyAbroadStepCard;