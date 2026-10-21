
export default function RegistrationField({
  field,
  value,
  onChange,
  error,
}) {
  const Icon = field.icon;
  const inputId = `registration-${field.name}`;

  return (
    <div
      className={`min-w-0 ${
        field.fullWidth ? "sm:col-span-2" : ""
      }`}
    >
      <label
        htmlFor={inputId}
        className="mb-2 block text-[13px] font-bold text-[#080e26] sm:text-sm"
      >
        {field.label}

        {field.required && (
          <span className="ml-1 text-[#c01f53]">*</span>
        )}
      </label>

      <div className="relative">
        <Icon
          size={20}
          strokeWidth={2}
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#c01f53]"
        />

        <input
          id={inputId}
          name={field.name}
          type={field.type}
          value={value}
          onChange={(event) =>
            onChange(field.name, event.target.value)
          }
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          required={field.required}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${inputId}-error` : undefined
          }
          className={`
            h-[54px] w-full min-w-0 rounded-[15px]
            border bg-white/75 py-3 pl-12 pr-4
            text-[13px] text-[#080e26]
            outline-none transition-all duration-200
            placeholder:text-[#71809c]
            focus:bg-white focus:ring-4
            focus:ring-pink-100/80
            sm:h-[60px] sm:text-sm
            ${
              error
                ? "border-red-400"
                : "border-[#f5bfd3] focus:border-[#c01f53]"
            }
          `}
        />
      </div>

      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-1.5 text-xs text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
