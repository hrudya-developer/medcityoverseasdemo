"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Globe2,
    GraduationCap,
    Languages,
    MapPin,
    Smartphone,
} from "lucide-react";

import germanFlag from "@/assets/germanFlag.png";

const ACADEMY_URL = "https://medcityacademy.com/";
const BRANCHES_URL = "https://medcityacademy.com/centers/";
const LANGUAGE_PROGRAM_URL = "https://medcityacademy.com/courses/";
const MOBILE_APP_URL = "https://play.google.com/store/apps/details?id=com.medcity.overseas";

const WebsiteSwitchVertical = () => {
    return (
        <div className="flex w-16 flex-col items-center gap-3">
            <nav
                aria-label="Quick website links"
                className="relative flex w-16 flex-col items-center gap-2 rounded-r-[20px] border-y border-r border-white/80 bg-black/80 px-2 py-2.5 shadow-[13px_19px_32px_rgba(15,23,42,0.20)] backdrop-blur-xl"
            >
                <VerticalInternalLink
                    href="/"
                    label="Study Abroad"
                    icon={Globe2}
                    active
                />

                <VerticalExternalLink
                    href={ACADEMY_URL}
                    label="Medcity Academy"
                    icon={GraduationCap}
                    iconClassName="bg-secondary text-white shadow-[0_5px_14px_rgba(4,102,175,0.32)] group-hover:bg-[#03558f]"
                />

                <VerticalExternalLink
                    href={BRANCHES_URL}
                    label="Our Branches"
                    icon={MapPin}
                    iconClassName="shadow-[0_5px_14px_rgba(4,102,175,0.32)] group-hover:bg-[#03558f]"
                />

                <VerticalExternalLink
                    href={LANGUAGE_PROGRAM_URL}
                    label="Our Language Program"
                    icon={Languages}
                />

                <VerticalExternalLink
                    href={MOBILE_APP_URL}
                    label="Download Mobile App"
                    icon={Smartphone}
                />

                <VerticalInternalLink
                    href="/german-programs"
                    label="German Programs"
                    image={germanFlag}
                />
            </nav>
        </div>
    );
};

const VerticalInternalLink = ({
    href,
    label,
    icon: Icon,
    image,
    active = false,
    iconClassName = "",
}) => {
    return (
        <Link
            href={href}
            aria-label={label}
            title={label}
            className={getLinkClasses(active)}
        >
            <VerticalLinkContent
                label={label}
                Icon={Icon}
                image={image}
                active={active}
                iconClassName={iconClassName}
            />
        </Link>
    );
};

const VerticalExternalLink = ({
    href,
    label,
    icon: Icon,
    image,
    active = false,
    iconClassName = "",
}) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={getLinkClasses(active)}
        >
            <VerticalLinkContent
                label={label}
                Icon={Icon}
                image={image}
                active={active}
                iconClassName={iconClassName}
            />
        </a>
    );
};

const VerticalLinkContent = ({
    label,
    Icon,
    image,
    active,
    iconClassName,
}) => {
    return (
        <>
            {image ? (
                <span className="relative z-10 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_4px_12px_rgba(15,23,42,0.16)] transition-all duration-300 group-hover:scale-110 group-hover:border-primary/30 group-hover:shadow-[0_7px_18px_rgba(15,23,42,0.20)]">
                    <Image
                        src={image}
                        alt={`${label} flag`}
                        width={36}
                        height={36}
                        className="h-full w-full object-cover"
                    />
                </span>
            ) : (
                <span
                    className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 ${active
                        ? "bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                        : iconClassName ||
                        "bg-primary/[0.08] text-primary group-hover:bg-primary group-hover:text-white"
                        }`}
                >
                    {Icon && (
                        <Icon
                            size={21}
                            strokeWidth={2.3}
                            aria-hidden="true"
                        />
                    )}
                </span>
            )}

            <Tooltip label={label} />

            {active && (
                <span className="pointer-events-none absolute -left-2 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-logoYellow shadow-[0_0_9px_rgba(247,236,34,0.90)]" />
            )}
        </>
    );
};

const Tooltip = ({ label }) => {
    return (
        <span
            role="tooltip"
            className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[9999] -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-[0_10px_25px_rgba(15,23,42,0.30)] transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
        >
            {label}

            <span className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-slate-950" />
        </span>
    );
};

const getLinkClasses = (active) =>
    `group relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ${active
        ? "bg-darkPrimary text-white shadow-[0_6px_16px_rgba(99,26,51,0.42)]"
        : "border border-slate-100 bg-white text-primary shadow-[0_4px_12px_rgba(15,23,42,0.10)] hover:-translate-y-0.5 hover:border-primary/20 hover:bg-primary/[0.04] hover:shadow-[0_7px_18px_rgba(192,31,83,0.22)]"
    }`;

export default WebsiteSwitchVertical;