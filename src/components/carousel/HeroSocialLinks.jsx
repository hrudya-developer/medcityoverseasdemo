import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaWhatsapp,
    FaYoutube,
} from "react-icons/fa";

const socialLinks = [
    {
        name: "WhatsApp",
        href: "https://wa.me/919876543210",
        icon: FaWhatsapp,
        buttonClass: "bg-[#25D366]",
        delay: "0ms",
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/medcitystudyabroad",
        icon: FaInstagram,
        buttonClass:
            "bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5]",
        delay: "120ms",
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/share/1D8vQXJskS/",
        icon: FaFacebookF,
        buttonClass: "bg-[#1877F2]",
        delay: "240ms",
    },
    {
        name: "LinkedIn",
        href: "https://in.linkedin.com/company/medcity-study-abroad",
        icon: FaLinkedinIn,
        buttonClass: "bg-[#0A66C2]",
        delay: "360ms",
    },
    {
        name: "YouTube",
        href: "https://youtube.com/@medcitystudyabroad",
        icon: FaYoutube,
        buttonClass: "bg-[#FF0000]",
        delay: "480ms",
    },
];

const HeroSocialLinks = ({ visible = true }) => {
    return (
        <aside
            aria-label="Medcity Study Abroad social media profiles"
            className={`
        absolute
        right-0
        top-1/2
        z-40
        hidden
        -translate-y-1/2
        transition-[transform,opacity]
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        lg:block

        ${visible
                    ? "translate-x-0 opacity-100"
                    : "pointer-events-none translate-x-full opacity-0"
                }
      `}
        >
            <ul className="flex flex-col items-end gap-1">
                {socialLinks.map(
                    ({
                        name,
                        href,
                        icon: Icon,
                        buttonClass,
                        delay,
                    }) => (
                        <li key={name}>
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit Medcity Study Abroad on ${name}`}
                                title={`Medcity Study Abroad on ${name}`}
                                style={{
                                    animationDelay: delay,
                                }}
                                className={`
                  group
                  relative
                  flex
                  size-14
                  items-center
                  justify-center
                  overflow-visible
                  text-2xl
                  text-white
                  shadow-[-8px_8px_18px_rgba(15,23,42,0.24)]
                  transition-[transform,box-shadow]
                  duration-300
                  motion-safe:animate-[socialIconFloat_3.2s_ease-in-out_infinite]
                  hover:-translate-x-1
                  hover:shadow-[-12px_10px_25px_rgba(15,23,42,0.38)]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-inset
                  focus-visible:ring-white
                  ${buttonClass}
                `}
                            >
                                <span
                                    aria-hidden="true"
                                    className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    h-px
                    bg-white/50
                  "
                                />

                                <span
                                    aria-hidden="true"
                                    className="
                    pointer-events-none
                    absolute
                    left-0
                    top-1/2
                    h-7
                    w-[3px]
                    -translate-y-1/2
                    bg-white/70
                    opacity-0
                    shadow-[0_0_10px_rgba(255,255,255,0.8)]
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                    group-focus-visible:opacity-100
                  "
                                />

                                <Icon
                                    aria-hidden="true"
                                    focusable="false"
                                    className="
                    relative
                    z-10
                    transition-transform
                    duration-300
                    group-hover:scale-110
                    group-focus-visible:scale-110
                  "
                                />

                                <span
                                    aria-hidden="true"
                                    className="
                    pointer-events-none
                    absolute
                    right-[calc(100%+12px)]
                    top-1/2
                    z-50
                    -translate-y-1/2
                    translate-x-2
                    whitespace-nowrap
                    rounded-md
                    bg-slate-950
                    px-3
                    py-2
                    text-[11px]
                    font-semibold
                    text-white
                    opacity-0
                    shadow-[0_10px_24px_rgba(15,23,42,0.35)]
                    transition-[transform,opacity]
                    duration-200
                    group-hover:translate-x-0
                    group-hover:opacity-100
                    group-focus-visible:translate-x-0
                    group-focus-visible:opacity-100
                  "
                                >
                                    {name}

                                    <span
                                        className="
                      absolute
                      left-full
                      top-1/2
                      -translate-y-1/2
                      border-[6px]
                      border-transparent
                      border-l-slate-950
                    "
                                    />
                                </span>
                            </a>
                        </li>
                    )
                )}
            </ul>
        </aside>
    );
};

export default HeroSocialLinks;