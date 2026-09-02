export default function ContactItem({
    icon: Icon,
    label,
    children,
}) {
    return (
        <div
            className="
                flex
                w-full
                max-w-sm
                flex-col
                items-center
                gap-3
                text-center

                lg:flex-row
                lg:items-start
                lg:text-left
            "
        >
            <div
                aria-hidden="true"
                className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-primary/20
                    bg-primary/10
                    text-primary
                "
            >
                <Icon className="size-5" />
            </div>

            <div className="min-w-0">
                <span className="sr-only">
                    {label}:{" "}
                </span>

                <div
                    className="
                        text-sm
                        leading-7
                        text-white/75
                    "
                >
                    {children}
                </div>
            </div>
        </div>
    );
}