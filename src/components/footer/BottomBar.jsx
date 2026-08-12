import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";

const socialLinks = [
    {
        name: "Instagram",
        href: "https://www.instagram.com/medcitystudyabroad?igsh=Nmt2dGZqbjNrZDVk&utm_source=qr",
        icon: FaInstagram,
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/share/1D8vQXJskS/?mibextid=wwXIfr",
        icon: FaFacebookF,
    },
    {
        name: "LinkedIn",
        href: "https://in.linkedin.com/company/medcity-study-abroad",
        icon: FaLinkedinIn,
    },
    {
        name: "YouTube",
        href: "https://youtube.com/@medcitystudyabroad?si=eU1G7UToEzt_H2yj",
        icon: AiOutlineYoutube,
    },
];

const BottomBar = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div
            className="w-full bg-[#070707]"
            data-aos="fade-up"
        >
            <div
                className="relative mx-auto max-w-[1600px] border-t border-dotted border-primary/20 px-4 py-3 text-[13px] text-white sm:px-6 lg:px-8"
            >
                <div
                    className="flex flex-col items-center justify-center gap-3 sm:flex-row"
                >


                    <nav aria-label="Medcity social media links">
                        <ul className="flex items-center justify-center gap-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <li key={social.name}>
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Follow Medcity Study Abroad on ${social.name}`}
                                            title={`Medcity Study Abroad on ${social.name}`}
                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-darkPrimary text-lg text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#070707]"
                                        >
                                            <Icon aria-hidden="true" />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default BottomBar;