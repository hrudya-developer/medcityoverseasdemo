import Image from "next/image";

import cn from "@/lib/cn";

import {
    Building2,
    GraduationCap,
    Headphones,
    Plane,
    Star,
    Users,
} from "lucide-react";

import mobileAppImage from "@/assets/appImage.png";

const orbitIcons = [
    {
        icon: GraduationCap,
        position: "left-[6%] top-[17%]",
        iconClass: "text-primary",
        delay: "0s",
    },
    {
        icon: Plane,
        position: "left-[1%] top-[49%]",
        iconClass: "text-secondary",
        delay: "0.7s",
    },
    {
        icon: Users,
        position: "right-[2%] top-[46%]",
        iconClass: "text-primary",
        delay: "1.2s",
    },
    {
        icon: Headphones,
        position: "bottom-[13%] left-[7%]",
        iconClass: "text-orange-500",
        delay: "1.7s",
    },
    {
        icon: Building2,
        position: "bottom-[3%] right-[23%]",
        iconClass: "text-secondary",
        delay: "2.1s",
    },
];

export default function MobileAppLeftSection() {
    return (
        <div
            className="relative order-2 flex min-h-[360px] items-center justify-center overflow-visible sm:min-h-[480px] lg:order-1 lg:min-h-[560px]" data-aos="fade-right"
        >
            <div
                className="relative h-[350px] w-full max-w-[600px] sm:h-[460px] lg:h-[530px]"
            >
                <div
                    aria-hidden="true"
                    className="app-glow-pulse absolute left-1/2 top-1/2 h-[230px] w-[230px] rounded-full bg-gradient-to-br from-primary/30 via-[#efafd2]/25 to-secondary/25 blur-3xl sm:h-[330px] sm:w-[330px] lg:h-[390px] lg:w-[390px]"
                />

                <div
                    aria-hidden="true"
                    className="app-orbit-clockwise absolute left-1/2 top-1/2 h-[280px] w-[280px] rounded-full border border-dashed border-primary/25 sm:h-[400px] sm:w-[400px] lg:h-[470px] lg:w-[470px]"
                >
                    <span
                        className="absolute left-1/2 top-[-5px] h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_18px_rgba(192,31,83,0.65)]"
                    />

                    <span
                        className="absolute bottom-[16%] right-[2%] h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_16px_rgba(4,102,175,0.6)]"
                    />
                </div>

                <div
                    aria-hidden="true"
                    className="app-orbit-counter absolute left-1/2 top-1/2 h-[230px] w-[230px] rounded-full border border-violet-300/45 sm:h-[330px] sm:w-[330px] lg:h-[390px] lg:w-[390px]"
                >
                    <span
                        className="absolute left-[9%] top-[18%] h-2.5 w-2.5 rounded-full bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.55)]"
                    />
                </div>

                <div
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90 shadow-[inset_0_0_38px_rgba(255,255,255,0.85)] sm:h-[270px] sm:w-[270px] lg:h-[320px] lg:w-[320px]"
                />

                <div
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15 sm:h-[220px] sm:w-[220px] lg:h-[265px] lg:w-[265px]"
                />

                <svg
                    aria-hidden="true"
                    viewBox="0 0 560 420"
                    className="pointer-events-none absolute inset-0 h-full w-full text-primary/35"
                >
                    <path
                        d="M35 300C110 350 144 271 206 289C289 313 281 174 370 199C435 217 454 122 524 79"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeDasharray="7 10"
                        strokeLinecap="round"
                    />

                    <circle
                        cx="35"
                        cy="300"
                        r="4"
                        fill="currentColor"
                    />

                    <circle
                        cx="524"
                        cy="79"
                        r="4"
                        fill="currentColor"
                    />
                </svg>

                {orbitIcons.map(
                    ({
                        icon: Icon,
                        position,
                        iconClass,
                        delay,
                    }) => (
                        <span
                            key={`${position}-${delay}`}
                            aria-hidden="true"
                            style={{
                                animationDelay: delay,
                            }}
                            className={cn(`
                                app-icon-float
                                absolute
                                z-30
                                hidden
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-white
                                bg-white/90
                                shadow-[0_13px_30px_rgba(15,23,42,0.11)]
                                backdrop-blur-lg
                                sm:flex
                                sm:h-12
                                sm:w-12
                                ${position}
                                ${iconClass}
                            `)}
                        >
                            <Icon
                                className="h-5 w-5 sm:h-6 sm:w-6"
                            />
                        </span>
                    )
                )}

                <Image
                    src={mobileAppImage}
                    alt="Medcity Study Abroad mobile application"
                    sizes="
                        (max-width: 639px) 180px,
                        (max-width: 1023px) 245px,
                        300px
                    "
                    className="app-phone-float absolute left-1/2 top-1/2 z-20 h-auto w-[180px] max-w-full object-contain drop-shadow-[0_32px_34px_rgba(15,23,42,0.30)] sm:w-[245px] lg:w-[285px] xl:w-[300px]"
                />

                <div
                    aria-hidden="true"
                    className="app-platform-pulse absolute bottom-[1%] left-1/2 h-10 w-[210px] rounded-[50%] bg-gradient-to-r from-primary/25 via-violet-400/35 to-secondary/25 blur-xl sm:w-[295px] lg:w-[340px]"
                />

                <span
                    aria-hidden="true"
                    className="app-sparkle-pulse absolute left-[17%] top-[28%] h-3 w-3 rotate-45 bg-primary"
                />

                <span
                    aria-hidden="true"
                    className="app-sparkle-pulse absolute bottom-[21%] right-[14%] h-2.5 w-2.5 rotate-45 bg-secondary [animation-delay:0.7s]"
                />

                <span
                    aria-hidden="true"
                    className="app-sparkle-pulse absolute right-[19%] top-[21%] h-2 w-2 rotate-45 bg-violet-500 [animation-delay:1.2s]"
                />

                <div
                    className="app-icon-float absolute right-[7%] top-[7%] z-40 hidden items-center gap-2.5 rounded-2xl border border-white bg-white/90 px-3.5 py-2.5 shadow-[0_16px_36px_rgba(15,23,42,0.13)] backdrop-blur-xl sm:flex lg:right-[1%] [animation-delay:1s]"
                >
                    <span
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-logoYellow/20 text-amber-500"
                    >
                        <Star
                            aria-hidden="true"
                            className="h-5 w-5 fill-current"
                        />
                    </span>

                    <div className="text-left">
                        <p
                            className="text-base font-black leading-none text-slate-900"
                        >
                            4.8 Rating
                        </p>

                        <p
                            className="mt-1 text-[10px] font-semibold text-slate-500"
                        >
                            Trusted by students
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}