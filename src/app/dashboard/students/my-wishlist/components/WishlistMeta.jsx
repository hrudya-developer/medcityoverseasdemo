export default function WishlistMeta({
    icon: Icon,
    value,
}) {
    if (
        value === null ||
        value === undefined ||
        String(value).trim() ===
            ""
    ) {
        return null;
    }

    return (
        <div
            className="
                inline-flex
                items-center
                gap-1.5
                rounded-lg
                bg-blue-50
                px-2.5
                py-1.5
                text-[10px]
                font-bold
                text-secondary
            "
        >
            <Icon size={12} />

            <span>
                {value}
            </span>
        </div>
    );
}