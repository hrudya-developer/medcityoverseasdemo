export default function QualificationRadioGroup({
    name,
    value,
    options,
    onChange,
    error,
}) {
    return (
        <div>
            <div className="flex flex-wrap gap-5">
                {options.map(
                    (option) => (
                        <label
                            key={
                                option.value
                            }
                            className="
                                flex
                                cursor-pointer
                                items-center
                                gap-2
                                text-sm
                                font-bold
                                text-black
                            "
                        >
                            <input
                                type="radio"
                                name={
                                    name
                                }
                                checked={
                                    value ===
                                    option.value
                                }
                                onChange={() =>
                                    onChange(
                                        option.value
                                    )
                                }
                                className="
                                    h-4
                                    w-4
                                    accent-primary
                                "
                            />

                            {
                                option.label
                            }
                        </label>
                    )
                )}
            </div>

            {error && (
                <p className="mt-2 text-xs font-bold text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}