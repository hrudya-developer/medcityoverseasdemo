import {
    ArrowRight,
    CheckCircle2,
    Download,
    LockKeyhole,
    MessageCircleMore,
    ShieldCheck,
    Sparkles,
    Zap,
} from "lucide-react";

import MobileAppFeatureItem from "./MobileAppFeatureItem";
import cn from "@/lib/cn";

import { mobileAppFeatures } from "./mobileAppData";

const PLAY_STORE_URL =
    "https://play.google.com/store/apps/details?id=com.medcity.overseas";

const trustItems = [
    {
        icon: ShieldCheck,
        label: "Secure & Reliable",
        iconClass: "text-secondary",
    },
    {
        icon: Zap,
        label: "Fast & Easy",
        iconClass: "text-amber-500",
    },
    {
        icon: LockKeyhole,
        label: "100% Free",
        iconClass: "text-violet-500",
    },
    {
        icon: CheckCircle2,
        label: "Trusted by Thousands",
        iconClass: "text-emerald-500",
    },
];

export default function MobileAppRightSection({
    onCounsellingClick,
    counsellingSectionId = "gfc_wrapper",
}) {
    return (
        <div
            className="relative order-1 mx-auto w-full max-w-[680px] text-center lg:order-2 lg:mx-0 lg:text-left"
        >
            {/* Badge */}
            <div
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 bg-white/90 px-4 py-2 text-xs font-extrabold text-primary shadow-[0_10px_30px_rgba(192,31,83,0.08)] backdrop-blur-xl sm:px-5 sm:text-sm"
            >
                <Sparkles
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={2.3}
                />

                <span>
                    Your Study Abroad Companion
                </span>
            </div>

            {/* Heading */}
            <h2
                id="mobile-app-heading"
                className="mt-5 font-nunito text-3xl font-extrabold leading-[1.04] tracking-[-0.045em] text-darkPrimary sm:text-4xl lg:text-5xl xl:text-5xl"
            >
                Medcity Study Abroad
                <span
                    className="mt-1 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                >
                    Mobile App
                </span>
            </h2>

            {/* Description */}
            <p
                className="mx-auto mt-5 max-w-[620px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:mx-0 lg:text-[17px]"
            >
                Explore universities, find suitable
                courses, track your applications and
                connect with expert study abroad
                counsellors through one powerful mobile
                app.
            </p>

            {/* Features panel */}
            <div
                className="mx-auto mt-7 w-full max-w-[640px] overflow-hidden rounded-[24px] border border-white bg-white/90 px-4 py-4 shadow-[0_24px_65px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:px-6 sm:py-5 lg:mx-0"
            >
                {mobileAppFeatures.map(
                    (feature) => (
                        <MobileAppFeatureItem
                            key={feature.title}
                            {...feature}
                        />
                    )
                )}
            </div>

            {/* CTA buttons */}
            <div
                className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
                <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download Medcity Study Abroad mobile app from Google Play"
                    className="group inline-flex min-h-[62px] items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-[#d91559] px-5 py-3 text-white shadow-[0_16px_36px_rgba(192,31,83,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(192,31,83,0.36)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                    <span
                        aria-hidden="true"
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15"
                    >
                        <Download
                            className="h-5 w-5"
                            strokeWidth={2.2}
                        />
                    </span>

                    <span className="text-left">
                        <span
                            className="block text-base font-extrabold leading-none"
                        >
                            Download App
                        </span>

                        <span
                            className="mt-1 block text-[11px] font-semibold text-white/80"
                        >
                            Get it on Google Play
                        </span>
                    </span>

                    <ArrowRight
                        aria-hidden="true"
                        className="ml-auto h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    />
                </a>

                <button onClick={onCounsellingClick}
                    className="group inline-flex min-h-[62px] items-center justify-center gap-3 rounded-2xl border border-secondary/25 bg-white/90 px-5 py-3 text-darkPrimary shadow-[0_12px_30px_rgba(15,23,42,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_38px_rgba(192,31,83,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                    <span
                        aria-hidden="true"
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/[0.08] text-primary"
                    >
                        <MessageCircleMore
                            className="h-5 w-5"
                            strokeWidth={2.2}
                        />
                    </span>

                    <span className="text-left">
                        <span
                            className="block text-base font-extrabold leading-none"
                        >
                            Get Free Counselling
                        </span>

                        <span
                            className="mt-1 block text-[11px] font-semibold text-slate-500"
                        >
                            Talk to our experts
                        </span>
                    </span>
                </button>
            </div>

            {/* Trust indicators */}
            <div
                className="mt-6 grid grid-cols-2 gap-x-3 gap-y-3 border-t border-slate-200/70 pt-5 sm:grid-cols-4 lg:gap-x-4"
            >
                {trustItems.map(
                    ({
                        icon: Icon,
                        label,
                        iconClass,
                    }) => (
                        <div
                            key={label}
                            className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-600 sm:text-[11px] lg:justify-start"
                        >
                            <Icon
                                aria-hidden="true"
                                className={cn(`
                                    h-4
                                    w-4
                                    shrink-0
                                    ${iconClass}
                                `)}
                                strokeWidth={2.3}
                            />

                            <span className="whitespace-nowrap">
                                {label}
                            </span>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}