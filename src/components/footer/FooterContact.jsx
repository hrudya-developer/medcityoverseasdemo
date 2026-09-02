import {
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import ContactItem from "./ContactItem";
import FooterHeading from "./FooterHeading";

export default function FooterContact() {
    return (
        <div
            className="
                border-white/15
                text-center

                lg:border-l
                lg:px-8
                lg:text-left
            "
        >
            <FooterHeading>
                Contact Us
            </FooterHeading>

            <address
                className="
                    mt-6
                    flex
                    flex-col
                    items-center
                    gap-5
                    not-italic

                    lg:items-start
                "
            >
                <ContactItem
                    icon={
                        MapPin
                    }
                    label="Office address"
                >
                    <span>
                        Medcity International Overseas
                        Corporation, Chettipeedika,
                        Kannur 670004, Kerala, India
                    </span>
                </ContactItem>

                <ContactItem
                    icon={
                        Phone
                    }
                    label="Phone number"
                >
                    <a
                        href="tel:+919072982555"
                        className="
                            transition-colors
                            hover:text-white
                            hover:underline
                        "
                    >
                        +91 90729 82555
                    </a>
                </ContactItem>

                <ContactItem
                    icon={
                        Mail
                    }
                    label="Email address"
                >
                    <a
                        href="mailto:info@mioc.in"
                        className="
                            transition-colors
                            hover:text-white
                            hover:underline
                        "
                    >
                        info@mioc.in
                    </a>
                </ContactItem>
            </address>
        </div>
    );
}