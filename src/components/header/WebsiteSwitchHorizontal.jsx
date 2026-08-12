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
const BRANCHES_URL =
    "https://medcityacademy.com/centers/";
const LANGUAGE_PROGRAM_URL =
    "https://medcityacademy.com/courses/";
const MOBILE_APP_URL =
    "https://play.google.com/store/apps/details?id=com.medcity.overseas";

const WebsiteSwitchHorizontal = ({ onNavigate }) => {
    return (
        <nav
            aria-label="Quick website links"
            className="relative flex w-full flex-row items-center justify-between gap-1 overflow-visible px-1.5 py-1.5 lg:hidden"
        >
            <HorizontalInternalLink
                href="/"
                label="Study Abroad"
                icon={Globe2}
                active
                onNavigate={onNavigate}
            />

            <HorizontalExternalLink
                href={ACADEMY_URL}
                label="Medcity Academy"
                icon={GraduationCap}
                iconClassName="bg-secondary text-white"
                onNavigate={onNavigate}
            />

            <HorizontalExternalLink
                href={BRANCHES_URL}
                label="Our Branches"
                icon={MapPin}
                onNavigate={onNavigate}
            />

            <HorizontalExternalLink
                href={LANGUAGE_PROGRAM_URL}
                label="Language Programs"
                icon={Languages}
                onNavigate={onNavigate}
            />

            <HorizontalExternalLink
                href={MOBILE_APP_URL}
                label="Download Mobile App"
                icon={Smartphone}
                onNavigate={onNavigate}
            />

            <HorizontalInternalLink
                href="/german-programs"
                label="German Programs"
                image={germanFlag}
                imageAlt="German flag"
                onNavigate={onNavigate}
            />
        </nav>
    );
};

const HorizontalInternalLink = ({
    href,
    label,
    icon: Icon,
    image,
    imageAlt = "",
    active = false,
    iconClassName = "",
    onNavigate,
}) => {
    return (
        <Link
            href={href}
            aria-label={label}
            title={label}
            onClick={() => onNavigate?.()}
            className={getLinkClasses(active)}
        >
            <HorizontalLinkContent
                label={label}
                Icon={Icon}
                image={image}
                imageAlt={imageAlt}
                active={active}
                iconClassName={iconClassName}
            />
        </Link>
    );
};

const HorizontalExternalLink = ({
    href,
    label,
    icon: Icon,
    image,
    imageAlt = "",
    active = false,
    iconClassName = "",
    onNavigate,
}) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} — opens in a new tab`}
            title={label}
            onClick={() => onNavigate?.()}
            className={getLinkClasses(active)}
        >
            <HorizontalLinkContent
                label={label}
                Icon={Icon}
                image={image}
                imageAlt={imageAlt}
                active={active}
                iconClassName={iconClassName}
            />
        </a>
    );
};

const HorizontalLinkContent = ({
    label,
    Icon,
    image,
    imageAlt,
    active,
    iconClassName,
}) => {
    return (
        <>
            {image ? (
                <span
                    className="relative z-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/40 bg-white shadow-sm transition-all duration-300 group-hover:scale-105"
                >
                    <Image
                        src={image}
                        alt={imageAlt}
                        width={32}
                        height={32}
                        sizes="32px"
                        className="h-full w-full object-cover"
                    />
                </span>
            ) : (
                <span
                    aria-hidden="true"
                    className={`
            relative
            z-10
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            transition-all
            duration-300
            group-hover:scale-105

            ${active
                            ? `
                    bg-white/15
                    text-white
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]
                  `
                            : iconClassName ||
                            `
                    bg-white
                    text-primary
                    group-hover:bg-primary
                    group-hover:text-white
                  `
                        }
          `}
                >
                    {Icon ? (
                        <Icon
                            size={18}
                            strokeWidth={2.2}
                        />
                    ) : null}
                </span>
            )}

            <Tooltip label={label} />

            {active ? (
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-logoYellow shadow-[0_0_7px_rgba(247,236,34,0.85)]"
                />
            ) : null}
        </>
    );
};

const Tooltip = ({ label }) => {
    return (
        <span
            role="tooltip"
            className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] z-[9999] -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-slate-950 px-2.5 py-1.5 text-[10px] font-semibold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        >
            {label}

            <span
                aria-hidden="true"
                className="absolute bottom-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-b-slate-950"
            />
        </span>
    );
};

const getLinkClasses = (active) => `
  group
  relative
  flex
  h-[38px]
  w-[38px]
  shrink-0
  items-center
  justify-center
  rounded-full
  transition-all
  duration-300
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-primary/40
  focus-visible:ring-offset-2

  ${active
        ? `
          bg-darkPrimary
          text-white
          shadow-[0_5px_12px_rgba(99,26,51,0.4)]
        `
        : `
          border
          border-white/15
          bg-rose-100
          text-primary
          shadow-[0_3px_8px_rgba(15,23,42,0.14)]
          hover:-translate-y-0.5
          hover:bg-primary
          hover:text-white
        `
    }
`;

export default WebsiteSwitchHorizontal;