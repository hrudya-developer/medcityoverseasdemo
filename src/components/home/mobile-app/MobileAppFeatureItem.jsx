export default function MobileAppFeatureItem({
    icon: Icon,
    title,
    description,
    iconClass,
}) {
    return (
        <article
            className="
                group
                flex
                items-center
                gap-3
                border-b
                border-dashed
                border-slate-200
                py-3.5
                text-left
                first:pt-0
                last:border-b-0
                last:pb-0
                sm:gap-4
            "
        >
            <span
                aria-hidden="true"
                className={`
                    grid
                    h-11
                    w-11
                    shrink-0
                    place-items-center
                    rounded-2xl
                    border
                    transition-all
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:scale-105
                    sm:h-12
                    sm:w-12
                    ${iconClass}
                `}
            >
                <Icon
                    className="h-5 w-5"
                    strokeWidth={2.1}
                />
            </span>

            <div className="min-w-0">
                <h3
                    className="
                        text-sm
                        font-extrabold
                        leading-5
                        text-slate-900
                        sm:text-[15px]
                    "
                >
                    {title}
                </h3>

                <p
                    className="
                        mt-1
                        text-xs
                        leading-5
                        text-slate-500
                        sm:text-[13px]
                    "
                >
                    {description}
                </p>
            </div>
        </article>
    );
}