import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    BriefcaseBusiness,
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    Plane,
} from "lucide-react";

import logo from "@/assets/logo.png";

const footerIcons = [
    {
        id: 1,
        label: "Study abroad",
        icon: GraduationCap,
    },
    {
        id: 2,
        label: "Work abroad",
        icon: BriefcaseBusiness,
    },
    {
        id: 3,
        label: "Travel abroad",
        icon: Plane,
    },
];

const phoneNumbers = [
    {
        label: "+91 89432 80333",
        href: "tel:+918943280333",
    },
    {
        label: "+91 96450 20503",
        href: "tel:+919645020503",
    },
];

const footerLinks = [
    {
        label: "Study Destinations",
        href: "/destinations",
    },
    {
        label: "Universities",
        href: "/universities",
    },
    {
        label: "Course Search",
        href: "/course-search",
    },
    {
        label: "Our Branches",
        href: "/branches",
    },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="
        relative
        w-full
        overflow-hidden
        bg-[#070707]
        text-white
      "
            aria-labelledby="footer-heading"
            data-aos="fade-up"
        >
            <h2 id="footer-heading" className="sr-only">
                Medcity Study Abroad footer
            </h2>

            {/* Background gradients */}
            <div
                aria-hidden="true"
                className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_bottom_left,rgba(168,13,65,0.45),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(211,39,159,0.4),transparent_30%),linear-gradient(135deg,rgba(255,0,0,0.08),transparent_40%)]
        "
            />

            <DotPattern
                className="
          left-0
          top-0
          grid
          opacity-20
        "
            />

            <DotPattern
                className="
          bottom-0
          right-0
          hidden
          opacity-20
          lg:grid
        "
            />

            <WorldPattern />

            <div
                className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-[1600px]
          gap-12
          px-6
          py-14
          sm:px-8
          lg:grid-cols-[1.05fr_0.95fr_1fr_1fr]
          lg:gap-8
          lg:px-10
          lg:py-16
        "
            >
                {/* Brand */}
                <div
                    className="
            flex
            flex-col
            items-center
            text-center
            sm:items-start
            sm:text-left
          "
                >
                    <Link
                        href="/"
                        aria-label="Medcity Study Abroad home"
                        className="
              inline-flex
              rounded-md
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
              focus-visible:ring-offset-4
              focus-visible:ring-offset-[#070707]
            "
                    >
                        <Image
                            src={logo}
                            alt="Medcity International Overseas Corporation"
                            className="
                h-auto
                w-48
                sm:w-56
                lg:w-64
              "
                            sizes="
                (max-width: 640px) 192px,
                (max-width: 1024px) 224px,
                256px
              "
                        />
                    </Link>

                    <p
                        className="
              mt-5
              max-w-sm
              text-sm
              leading-7
              text-white/75
            "
                    >
                        Supporting students and professionals with overseas education,
                        career and migration opportunities.
                    </p>

                    <div
                        className="
              mt-7
              flex
              items-center
              justify-center
              gap-3
              sm:justify-start
            "
                        aria-label="Our services"
                    >
                        {footerIcons.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.id}
                                    className="contents"
                                >
                                    <CircleIcon label={item.label}>
                                        <Icon
                                            aria-hidden="true"
                                            className="h-5 w-5 sm:h-6 sm:w-6"
                                        />
                                    </CircleIcon>

                                    {index < footerIcons.length - 1 && <Divider />}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* About */}
                <div
                    className="
            border-white/15
            lg:border-l
            lg:px-8
          "
                >
                    <FooterHeading>About Us</FooterHeading>

                    <p
                        className="
              mt-6
              text-center
              text-sm
              leading-7
              text-white/75
              sm:text-left
            "
                    >
                        Since 2012, Medcity International Overseas Corporation has
                        supported students who aspire to study overseas and professionals
                        who plan to build international careers.
                    </p>

                    <Link
                        href="/loginViaOtp"
                        className="
              mx-auto
              mt-7
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-primary
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              transition
              duration-300
              hover:-translate-y-0.5
              hover:bg-darkPrimary
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#070707]
              sm:mx-0
            "
                    >
                        Student Login

                        <ArrowRight
                            aria-hidden="true"
                            className="h-4 w-4"
                        />
                    </Link>
                </div>

                {/* Quick links */}
                <nav
                    aria-label="Footer navigation"
                    className="
            border-white/15
            lg:border-l
            lg:px-8
          "
                >
                    <FooterHeading>Quick Links</FooterHeading>

                    <ul
                        className="
              mt-6
              flex
              flex-col
              items-center
              gap-4
              sm:items-start
            "
                    >
                        {footerLinks.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    text-white/75
                    transition-colors
                    duration-300
                    hover:text-white
                    focus-visible:rounded
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-primary
                  "
                                >
                                    <ArrowRight
                                        aria-hidden="true"
                                        className="
                      h-3.5
                      w-3.5
                      text-primary
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                                    />

                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Contact */}
                <div
                    className="
            border-white/15
            lg:border-l
            lg:px-8
          "
                >
                    <FooterHeading>Contact Us</FooterHeading>

                    <address
                        className="
              mt-6
              flex
              flex-col
              items-center
              gap-6
              not-italic
              sm:items-start
            "
                    >
                        <ContactItem
                            icon={MapPin}
                            label="Office address"
                        >
                            <span>
                                Medcity International Overseas Corporation,
                                Chettipeedika, Kannur 670004, Kerala, India
                            </span>
                        </ContactItem>

                        <ContactItem
                            icon={Phone}
                            label="Phone numbers"
                        >
                            <span className="flex flex-col">
                                {phoneNumbers.map((phone) => (
                                    <a
                                        key={phone.href}
                                        href={phone.href}
                                        className="
                      transition-colors
                      duration-300
                      hover:text-white
                      hover:underline
                      focus-visible:rounded
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-primary
                    "
                                    >
                                        {phone.label}
                                    </a>
                                ))}
                            </span>
                        </ContactItem>

                        <ContactItem
                            icon={Mail}
                            label="Email address"
                        >
                            <a
                                href="mailto:info@mioc.in"
                                className="
                  transition-colors
                  duration-300
                  hover:text-white
                  hover:underline
                  focus-visible:rounded
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary
                "
                            >
                                info@mioc.in
                            </a>
                        </ContactItem>
                    </address>
                </div>
            </div>

            {/* Bottom bar */}
            <div
                className="
          relative
          z-10
          border-t
          border-white/10
        "
            >
                <div
                    className="
            mx-auto
            flex
            max-w-[1600px]
            flex-col
            items-center
            justify-between
            gap-3
            px-6
            py-5
            text-center
            text-xs
            text-white/60
            sm:px-8
            md:flex-row
            md:text-left
            lg:px-10
          "
                >
                    <p>
                        © {currentYear} Medcity International Overseas Corporation. All
                        rights reserved.
                    </p>

                    <div className="flex items-center gap-5">
                        <Link
                            href="/privacy-policy"
                            className="
                transition-colors
                hover:text-white
                hover:underline
                focus-visible:rounded
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
              "
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms-and-conditions"
                            className="
                transition-colors
                hover:text-white
                hover:underline
                focus-visible:rounded
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
              "
                        >
                            Terms and Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

function FooterHeading({ children }) {
    return (
        <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">
                {children}
            </h3>

            <div
                aria-hidden="true"
                className="
          mx-auto
          mt-4
          h-1
          w-10
          rounded-full
          bg-primary
          sm:mx-0
        "
            />
        </div>
    );
}

function CircleIcon({ children, label }) {
    return (
        <div
            role="img"
            aria-label={label}
            className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        border
        border-white/20
        bg-white
        text-darkPrimary
        shadow-lg
        shadow-black/20
        sm:h-12
        sm:w-12
        lg:h-14
        lg:w-14
      "
        >
            {children}
        </div>
    );
}

function Divider() {
    return (
        <span
            aria-hidden="true"
            className="h-10 w-px bg-white/25"
        />
    );
}

function ContactItem({
    icon: Icon,
    label,
    children,
}) {
    return (
        <div
            className="
        flex
        w-full
        max-w-sm
        flex-col
        items-center
        gap-3
        text-center
        sm:flex-row
        sm:items-start
        sm:text-left
      "
        >
            <div
                aria-hidden="true"
                className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-white/20
          text-primary
        "
            >
                <Icon className="h-5 w-5" />
            </div>

            <div>
                <span className="sr-only">{label}: </span>

                <div className="text-sm leading-7 text-white/75">
                    {children}
                </div>
            </div>
        </div>
    );
}

function DotPattern({ className = "" }) {
    return (
        <div
            aria-hidden="true"
            className={`
        pointer-events-none
        absolute
        grid-cols-10
        gap-3
        ${className}
      `}
        >
            {Array.from({ length: 100 }).map((_, index) => (
                <span
                    key={index}
                    className="h-1 w-1 rounded-full bg-white"
                />
            ))}
        </div>
    );
}

function WorldPattern() {
    return (
        <div
            aria-hidden="true"
            className="
        pointer-events-none
        absolute
        right-10
        top-8
        hidden
        opacity-20
        lg:block
      "
        >
            <svg
                width="340"
                height="180"
                viewBox="0 0 340 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {Array.from({ length: 220 }).map((_, index) => {
                    const x = (index * 31) % 330;
                    const y = (index * 17) % 170;

                    return (
                        <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="1.4"
                            fill="white"
                            opacity={x > 40 && y > 10 ? 0.8 : 0.2}
                        />
                    );
                })}

                <circle cx="80" cy="70" r="3" fill="#c01f53" />
                <circle cx="150" cy="40" r="3" fill="#c01f53" />
                <circle cx="230" cy="110" r="3" fill="#c01f53" />
                <circle cx="300" cy="75" r="3" fill="#c01f53" />
            </svg>
        </div>
    );
}