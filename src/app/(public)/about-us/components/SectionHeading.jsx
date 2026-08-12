const SectionHeading = ({
    eyebrow,
    title,
    description,
    centered = false,
}) => {
    return (
        <div
            className={
                centered
                    ? "text-center"
                    : ""
            }
        >
            <p
                className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary"
            >
                {eyebrow}
            </p>

            <h2
                className="mt-3 font-nunito text-3xl font-black leading-tight text-[#10204a] sm:text-4xl"
            >
                {title}
            </h2>

            {description && (
                <p
                    className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600"
                >
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeading;