const InputField = ({
    id,
    name,
    label,
    type = "text",
    value,
    placeholder,
    autoComplete,
    icon,
    error,
    onChange,
}) => {
    const inputId = id || name;
    const errorId = `${inputId}-error`;

    return (
        <div>
            <label
                htmlFor={inputId}
                className="
                    mb-2 block
                    text-sm font-bold
                    text-slate-800
                "
            >
                {label}
            </label>

            <div
                className={`
                    flex min-h-12
                    items-center gap-3
                    rounded-xl border
                    bg-white px-4
                    transition
                    focus-within:ring-2
                    focus-within:ring-primary/20
                    ${error
                        ? "border-red-500"
                        : "border-slate-200 focus-within:border-primary"
                    }
                `}
            >
                <span
                    aria-hidden="true"
                    className="
                        shrink-0
                        text-slate-400
                    "
                >
                    {icon}
                </span>

                <input
                    id={inputId}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    aria-invalid={
                        Boolean(error)
                    }
                    aria-describedby={
                        error
                            ? errorId
                            : undefined
                    }
                    className="
                        min-w-0 flex-1
                        bg-transparent
                        py-3 text-sm
                        text-slate-800
                        outline-none
                        placeholder:text-slate-400
                    "
                />
            </div>

            {error && (
                <p
                    id={errorId}
                    role="alert"
                    className="
                        mt-1.5 text-xs
                        font-medium
                        text-red-600
                    "
                >
                    {error}
                </p>
            )}
        </div>
    );
};

export default InputField;