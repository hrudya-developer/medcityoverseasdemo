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
const LANGUAGE_PROGRAM_URL =
    "https://medcityacademy.com/courses/";
const MOBILE_APP_URL =
    "https://play.google.com/store/apps/details?id=com.medcity.overseas";

const WebsiteSwitchHorizontal = ({ onNavigate }) => {
    return (
        <nav
            aria-label="Quick website links"
            className="relative grid w-full grid-cols-2 items-stretch gap-2 overflow-visible px-1 py-1 sm:grid-cols-3 lg:hidden"
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

            <HorizontalInternalLink
                href="/branches"
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
                href="/study-in-germany"
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
            aria-label={`${label}, opens in a new tab`}
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

            <span className="relative z-10 max-w-full whitespace-normal text-center text-[9px] font-semibold leading-tight text-white/80 min-[380px]:text-[10px]">
                {label}
            </span>

            {active ? (
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-logoYellow shadow-[0_0_7px_rgba(247,236,34,0.85)]"
                />
            ) : null}
        </>
    );
};

const getLinkClasses = (active) => `
  group
  relative
  flex
  min-h-[72px]
  w-full
  min-w-0
  flex-col
  justify-center
  gap-1.5
  rounded-xl
  border
  px-1.5
  py-2
  text-center
  transition-all
  duration-300
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-logoYellow
  focus-visible:ring-offset-2
  focus-visible:ring-offset-darkPrimary

  ${active
        ? `
          border-logoYellow/40
          bg-white/[0.12]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
        `
        : `
          border-white/10
          bg-white/[0.045]
          hover:-translate-y-0.5
          hover:border-white/20
          hover:bg-white/[0.10]
        `
    }
`;

export default WebsiteSwitchHorizontal;