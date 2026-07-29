export default function ServiceCard({
    service,
    index,
}) {
    const {
        id,
        number,
        title,
        description,
        icon: Icon,
        theme,
    } = service;

    return (
        <article
            id={id}
            aria-labelledby={`${id}-title`}
            aria-describedby={`${id}-description`}
            data-aos="fade-up"
            data-aos-delay={index * 90}
            className={`
                group relative isolate
                flex min-h-[300px]
                flex-col overflow-hidden
                rounded-[24px]
                border border-white/80
                bg-gradient-to-br
                ${theme.background}
                px-5 py-6
                text-center
                shadow-[0_14px_35px_rgba(15,23,42,0.08)]
                transition-all duration-500 ease-out
                hover:-translate-y-2
                hover:shadow-[0_24px_48px_rgba(15,23,42,0.14)]
                sm:min-h-[320px]
                sm:px-6
                sm:py-7
                lg:min-h-[330px]
                ${theme.border}
            `}
        >
            {/* Layered gradient overlay */}
            <div
                aria-hidden="true"
                className={`
                    pointer-events-none
                    absolute inset-0
                    ${theme.overlay}
                    opacity-75
                `}
            />

            {/* Soft inner highlight */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute inset-x-4 top-3
                    h-20 rounded-[22px]
                    bg-gradient-to-b
                    from-white/45
                    to-transparent
                    blur-xl
                "
            />

            {/* Top-right glow */}
            <div
                aria-hidden="true"
                className={`
                    pointer-events-none
                    absolute -right-12 -top-14
                    size-36 rounded-full
                    ${theme.circle}
                    opacity-30 blur-2xl
                    transition-transform duration-700
                    group-hover:scale-125
                `}
            />

            {/* Bottom-left glow */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute -bottom-16 -left-16
                    size-36 rounded-full
                    bg-white/45 blur-2xl
                "
            />

            {/* Decorative ring */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute -bottom-10 -right-10
                    size-24 rounded-full
                    border-[12px]
                    border-white/25
                    transition-transform duration-700
                    group-hover:rotate-45
                "
            />

            {/* Subtle dot pattern */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute inset-0
                    opacity-[0.12]
                    [background-image:radial-gradient(circle,rgba(255,255,255,0.95)_1px,transparent_1px)]
                    [background-size:17px_17px]
                    [mask-image:linear-gradient(to_bottom_right,black,transparent_78%)]
                "
            />

            {/* Shine effect */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute inset-y-0
                    -left-[130%]
                    w-1/2
                    skew-x-[-18deg]
                    bg-gradient-to-r
                    from-transparent
                    via-white/35
                    to-transparent
                    transition-all duration-1000
                    group-hover:left-[150%]
                "
            />

            {/* Number */}
            <span
                aria-hidden="true"
                className={`
                    absolute right-4 top-4
                    z-10
                    text-lg font-black
                    ${theme.text}
                    opacity-80
                    transition-all duration-300
                    group-hover:scale-110
                    group-hover:opacity-100
                `}
            >
                {number}
            </span>

            {/* Icon */}
            <div className="relative z-10 mx-auto">
                <div
                    className={`
                        grid size-14
                        place-items-center
                        rounded-2xl
                        border border-white/90
                        bg-white/90
                        ${theme.iconShadow}
                        backdrop-blur-md
                        transition-all duration-500
                        group-hover:-translate-y-1
                        group-hover:rotate-[-4deg]
                        group-hover:scale-110
                        sm:size-16
                    `}
                >
                    <Icon
                        aria-hidden="true"
                        size={28}
                        strokeWidth={2.2}
                        className={theme.text}
                    />
                </div>
            </div>

            {/* Content */}
            <div
                className="
                    relative z-10
                    mt-5 flex flex-1
                    flex-col
                "
            >
                <h3
                    id={`${id}-title`}
                    className="
                        text-lg font-black
                        leading-tight
                        tracking-[-0.02em]
                        text-slate-950
                        sm:text-xl
                    "
                >
                    {title}
                </h3>

                <p
                    id={`${id}-description`}
                    className="
                        mx-auto mt-3
                        max-w-[250px]
                        text-[13px]
                        leading-6
                        text-slate-600
                        sm:text-sm
                        sm:leading-6
                    "
                >
                    {description}
                </p>

                <span
                    aria-hidden="true"
                    className={`
                        mx-auto mt-6
                        h-1 w-10
                        rounded-full
                        ${theme.accent}
                        transition-all duration-500
                        group-hover:w-16
                    `}
                />
            </div>
        </article>
    );
}