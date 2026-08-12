const FeatureCard = ({
    icon: Icon,
    title,
}) => {
    return (
        <article
            className="group flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white/85 px-3 py-4 text-center shadow-[0_10px_25px_rgba(15,23,42,0.06)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_16px_34px_rgba(192,31,83,0.11)]"
        >
            <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/[0.08] text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white"
            >
                <Icon
                    className="h-5 w-5"
                    strokeWidth={2.2}
                />
            </span>

            <h2
                className="mt-3 text-[10px] font-extrabold leading-4 text-[#132342] sm:text-[11px]"
            >
                {title}
            </h2>
        </article>
    );
};

export default FeatureCard;