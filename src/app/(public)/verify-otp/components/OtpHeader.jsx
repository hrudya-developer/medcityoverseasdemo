import { LockKeyhole } from "lucide-react";


export default function OtpHeader({
    email,
}) {
    return (
        <header className="border-b border-white/10 bg-gradient-to-br from-[#bd1551]/90 via-[#801342]/90 to-[#35102e]/90 px-6 py-8 text-center text-white">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-white/20 bg-white/15">
            <LockKeyhole />
            </div>

            <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-pink-200">
                Secure verification
            </p>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                OTP Verification
            </h2>

            <p className="mt-3 text-sm text-white/70">
                Enter the four-digit code sent to
            </p>

            <p className="mt-1 break-all font-semibold text-amber-300">
                {email}
            </p>
        </header>
    );
}