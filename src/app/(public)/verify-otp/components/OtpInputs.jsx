export default function OtpInputs({
    otp,
    setInputRef,
    onChange,
    onKeyDown,
    onPaste,
    disabled,
}) {
    return (
        <div className="mb-7 flex justify-center gap-2 sm:gap-3">
            {otp.map(
                (digit, index) => (
                    <input
                        key={index}
                        ref={(element) =>
                            setInputRef(
                                index,
                                element
                            )
                        }
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        disabled={disabled}
                        onChange={(
                            event
                        ) =>
                            onChange(
                                event.target.value,
                                index
                            )
                        }
                        onKeyDown={(
                            event
                        ) =>
                            onKeyDown(
                                event,
                                index
                            )
                        }
                        onPaste={
                            onPaste
                        }
                        className="
                            h-12
                            w-10
                            rounded-xl
                            border
                            border-white/20
                            bg-black/20
                            text-center
                            text-xl
                            font-black
                            text-white
                            outline-none
                            focus:border-pink-500
                            focus:ring-4
                            focus:ring-pink-500/15
                            sm:h-14
                            sm:w-12
                            sm:text-2xl
                        "
                    />
                )
            )}
        </div>
    );
}