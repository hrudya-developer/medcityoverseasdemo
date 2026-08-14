export default function QualificationSection({
    title,
    children,
}) {
    return (
        <fieldset
            className="
                rounded-2xl
                border
                border-slate-300
                bg-white/80
                px-5
                pb-5
                pt-4
            "
        >
            <legend
                className="
                    px-3
                    text-sm
                    font-bold
                    text-primary
                "
            >
                {title}
            </legend>

            <div className="space-y-5">
                {children}
            </div>
        </fieldset>
    );
}