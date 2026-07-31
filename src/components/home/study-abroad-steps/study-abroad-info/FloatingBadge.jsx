const FloatingBadge = ({
    icon: Icon,
    label,
    iconClassName = "",
    className = "",
}) => {
    return (
        <div
            className={`
        absolute z-30
        hidden items-center gap-2
        rounded-2xl
        border border-white/10
        bg-white/10 px-3 py-2
        text-xs font-semibold
        text-white/80
        shadow-xl backdrop-blur-xl
        sm:flex
        ${className}
      `}
        >
            <div
                className={`
          flex h-8 w-8
          items-center justify-center
          rounded-xl text-white
          ${iconClassName}
        `}
            >
                <Icon
                    aria-hidden="true"
                    className="h-4 w-4"
                />
            </div>

            {label}
        </div>
    );
};

export default FloatingBadge;