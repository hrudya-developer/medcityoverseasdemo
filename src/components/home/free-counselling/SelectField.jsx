"use client";

import Select from "react-select";

import cn from "@/lib/cn";

const SelectField = ({
    name,
    label,
    value,
    options = [],
    icon,
    error,
    loading = false,
    disabled = false,
    placeholder = "Select option",
    onChange,
}) => {
    const errorId = `${name}-error`;

    const normalizedOptions =
        options.map((option) => {
            if (
                typeof option ===
                "string"
            ) {
                return {
                    label: option,
                    value: option,
                };
            }

            return option;
        });

    const selectedValue =
        normalizedOptions.find(
            (option) =>
                String(option?.value) ===
                String(value)
        ) || null;

    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-bold text-slate-800"
            >
                {label}
            </label>

            <div
                className={cn(`
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
                `)}
            >
                <span
                    aria-hidden="true"
                    className="shrink-0 text-slate-400"
                >
                    {icon}
                </span>

                <div className="min-w-0 flex-1">
                    <Select
                        inputId={name}
                        instanceId={name}
                        name={name}
                        value={selectedValue}
                        options={
                            normalizedOptions
                        }
                        onChange={(selected) =>
                            onChange(
                                name,
                                selected?.value ??
                                ""
                            )
                        }
                        isSearchable
                        isLoading={loading}
                        isDisabled={
                            disabled ||
                            loading
                        }
                        placeholder={
                            loading
                                ? "Loading..."
                                : placeholder
                        }
                        aria-invalid={
                            Boolean(error)
                        }
                        aria-describedby={
                            error
                                ? errorId
                                : undefined
                        }
                        styles={{
                            control: (
                                base
                            ) => ({
                                ...base,
                                minHeight: "46px",
                                border: "none",
                                boxShadow: "none",
                                backgroundColor:
                                    "transparent",
                            }),

                            valueContainer: (
                                base
                            ) => ({
                                ...base,
                                padding: 0,
                            }),

                            input: (base) => ({
                                ...base,
                                margin: 0,
                                padding: 0,
                            }),

                            indicatorsContainer:
                                (base) => ({
                                    ...base,
                                    padding: 0,
                                }),

                            indicatorSeparator:
                                () => ({
                                    display: "none",
                                }),

                            dropdownIndicator:
                                (base) => ({
                                    ...base,
                                    padding: 0,
                                }),

                            placeholder: (
                                base
                            ) => ({
                                ...base,
                                fontSize: "14px",
                                color: "#94a3b8",
                            }),

                            singleValue: (
                                base
                            ) => ({
                                ...base,
                                fontSize: "14px",
                                color: "#1e293b",
                            }),

                            menu: (base) => ({
                                ...base,
                                zIndex: 50,
                            }),
                        }}
                    />
                </div>
            </div>

            {error && (
                <p
                    id={errorId}
                    role="alert"
                    className="mt-1.5 text-xs font-medium text-red-600"
                >
                    {error}
                </p>
            )}
        </div>
    );
};

export default SelectField;