// components/my-application/InfoItem.jsx

export default function InfoItem({
    icon,
    label,
    value,
}) {
    return (
        <div
            className="
                flex
                items-center
                gap-3
                rounded-xl
                bg-slate-50
                p-3
            "
        >
            <div className="text-secondary">
                {icon}
            </div>

            <div>
                <p
                    className="
                        text-xs
                        font-semibold
                        uppercase
                        text-slate-400
                    "
                >
                    {label}
                </p>

                <p
                    className="
                        text-sm
                        font-bold
                        text-[#081c47]
                    "
                >
                    {value || "N/A"}
                </p>
            </div>
        </div>
    );
}