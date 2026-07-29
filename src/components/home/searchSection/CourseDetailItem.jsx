export default function CourseDetailItem({
    icon: Icon,
    label,
    value,
    iconClassName = "",
}) {
    return (
        <div
            className="
                flex items-start gap-3
                rounded-2xl
                border border-slate-100
                bg-slate-50/80
                p-3.5
            "
        >
            <span
                className={`
                    grid size-10
                    shrink-0
                    place-content-center
                    rounded-xl
                    ${iconClassName}
                `}
            >
                <Icon
                    aria-hidden="true"
                    size={18}
                />
            </span>

            <div className="min-w-0">
                <p
                    className="
                        text-[10px]
                        font-extrabold
                        uppercase
                        tracking-[0.13em]
                        text-slate-400
                    "
                >
                    {label}
                </p>

                <p
                    className="
                        mt-1 line-clamp-2
                        text-sm font-bold
                        leading-5
                        text-slate-700
                    "
                >
                    {value}
                </p>
            </div>
        </div>
    );
}