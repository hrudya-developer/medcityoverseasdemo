export default function PrivacySection({
    number,
    title,
    children,
}) {
    return (
        <section
            className="
                border-t
                border-slate-200
                py-8
            "
        >
            <h2
                className="
                    text-2xl
                    font-black
                    tracking-[-0.025em]
                    text-[#07365c]

                    sm:text-[28px]
                "
            >
                {number}. {title}
            </h2>

            <div
                className="
                    mt-4
                    space-y-4
                    text-[14px]
                    font-medium
                    leading-7
                    text-slate-600

                    sm:text-[15px]
                "
            >
                {children}
            </div>
        </section>
    );
}