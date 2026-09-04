import {
    CalendarDays,
} from "lucide-react";

export default function PrivacyIntro() {
    return (
        <div>
            <p
                className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.35em]
                    text-[#174567]
                "
            >
                Privacy Policy
            </p>

            <h2
                className="
                    mt-4
                    text-3xl
                    font-black
                    tracking-[-0.035em]
                    text-[#07365c]

                    sm:text-4xl
                "
            >
                Your Privacy, Our Priority
            </h2>

            <p
                className="
                    mt-4
                    max-w-[1050px]
                    text-[15px]
                    font-medium
                    leading-7
                    text-slate-600

                    sm:text-base
                "
            >
                At Medcity International Overseas
                Corporation, we are committed to
                protecting your personal information
                and maintaining transparency about how
                we collect, use, and safeguard your
                data. This Privacy Policy explains our
                practices and your rights regarding
                your information.
            </p>

            <div
                className="
                    mt-5
                    flex
                    items-center
                    gap-2.5
                    text-xs
                    font-semibold
                    text-slate-500
                "
            >
                <CalendarDays
                    size={17}
                    className="text-primary"
                />

                <span>
                    Last updated: September 2026
                </span>
            </div>
        </div>
    );
}