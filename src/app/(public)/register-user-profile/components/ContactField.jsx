"use client";

import { PhoneInput } from "react-international-phone";

import "react-international-phone/style.css";

function buildPhoneValue(
    code,
    mobile
) {
    const dialCode = String(
        code || "91"
    ).replace(/\D/g, "");

    let number = String(
        mobile || ""
    ).replace(/\D/g, "");

    // Prevent duplicated country code
    if (
        dialCode &&
        number.startsWith(dialCode)
    ) {
        number = number.slice(
            dialCode.length
        );
    }

    if (!number) {
        return `+${dialCode}`;
    }

    return `+${dialCode}${number}`;
}

export default function ContactField({
    form,
    onChange,
}) {
    const phoneValue =
        buildPhoneValue(
            form.code,
            form.mobile
        );

    return (
        <div className="w-full min-w-0">
            <div className="flex min-h-[16px] items-center">
                <label
                    className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.08em]
                        text-[#631A33]
                    "
                >
                    Contact Number
                </label>
            </div>

            <div
                className="
                    mt-1.5
                    flex
                    h-11
                    items-center
                    overflow-hidden
                    rounded-xl
                    border
                    border-slate-200/80
                    bg-white
                    px-2
                    shadow-[0_3px_14px_rgba(15,23,42,0.035)]

                    focus-within:border-[#c01f53]/45
                    focus-within:ring-4
                    focus-within:ring-[#c01f53]/[0.06]
                "
            >
                <PhoneInput
                    defaultCountry="in"
                    value={phoneValue}
                    onChange={(
                        value,
                        meta
                    ) => {
                        const dialCode =
                            String(
                                meta?.country
                                    ?.dialCode ||
                                    form.code ||
                                    "91"
                            ).replace(
                                /\D/g,
                                ""
                            );

                        let number =
                            String(
                                value || ""
                            ).replace(
                                /\D/g,
                                ""
                            );

                        if (
                            dialCode &&
                            number.startsWith(
                                dialCode
                            )
                        ) {
                            number =
                                number.slice(
                                    dialCode.length
                                );
                        }

                        onChange(
                            "mobile",
                            number
                        );

                        onChange(
                            "code",
                            dialCode
                        );

                        onChange(
                            "country",
                            meta?.country
                                ?.name ||
                                form.country ||
                                "India"
                        );

                        onChange(
                            "countryIso",
                            meta?.country
                                ?.iso2 ||
                                "in"
                        );
                    }}
                    className="
                        !flex
                        !h-11
                        !w-full
                        !min-w-0
                        !flex-1
                        !items-center
                    "
                    inputClassName="
                        !h-11
                        !w-0
                        !min-w-0
                        !flex-1
                        !border-0
                        !bg-transparent
                        !px-2
                        !text-sm
                        !font-semibold
                        !text-slate-700
                        !shadow-none
                        !outline-none
                    "
                    countrySelectorStyleProps={{
                        buttonClassName: `
                            !h-11
                            !shrink-0
                            !border-0
                            !bg-transparent
                            !px-2
                            !shadow-none
                        `,
                    }}
                />
            </div>
        </div>
    );
}