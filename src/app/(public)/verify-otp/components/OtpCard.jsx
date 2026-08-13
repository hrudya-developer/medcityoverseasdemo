import OtpHeader from "./OtpHeader";
import OtpInputs from "./OtpInputs";

export default function OtpCard({
    email,
    otp,
    error,
    loading,
    redirecting,
    setInputRef,
    onChange,
    onKeyDown,
    onPaste,
    onSubmit,
    onDifferentEmail,
}) {
    const otpComplete =
        otp.every(Boolean);

    return (
        <main className="relative flex min-h-[calc(100dvh-140px)] items-center justify-center bg-[#080611] px-4 py-8">
            <section className="w-full max-w-md overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.08] shadow-2xl backdrop-blur-2xl">
                <OtpHeader
                    email={email}
                />

                <div className="px-5 py-7 sm:px-8 sm:py-8">
                    <form
                        onSubmit={
                            onSubmit
                        }
                    >
                        <fieldset
                            disabled={
                                loading ||
                                redirecting
                            }
                        >
                            <OtpInputs
                                otp={otp}
                                setInputRef={
                                    setInputRef
                                }
                                onChange={
                                    onChange
                                }
                                onKeyDown={
                                    onKeyDown
                                }
                                onPaste={
                                    onPaste
                                }
                                disabled={
                                    loading ||
                                    redirecting
                                }
                            />

                            {error ? (
                                <p className="mb-5 rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200">
                                    {error}
                                </p>
                            ) : null}

                            <button
                                type="submit"
                                disabled={
                                    loading ||
                                    redirecting ||
                                    !otpComplete
                                }
                                className="min-h-12 w-full rounded-xl bg-gradient-to-r from-[#d20b54] via-[#b8094e] to-[#8d0742] px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
                            >
                                {loading
                                    ? "Verifying..."
                                    : "Verify OTP"}
                            </button>
                        </fieldset>
                    </form>

                    <button
                        type="button"
                        onClick={
                            onDifferentEmail
                        }
                        className="mt-5 w-full text-center text-sm font-semibold text-white/55 hover:text-pink-400"
                    >
                        Use a different email
                    </button>
                </div>
            </section>
        </main>
    );
}