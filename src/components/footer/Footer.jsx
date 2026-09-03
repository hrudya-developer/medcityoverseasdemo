import FooterBrand from "./FooterBrand";
import FooterAbout from "./FooterAbout";
import FooterQuickLinks from "./FooterQuickLinks";
import FooterContact from "./FooterContact";
import FooterBottom from "./FooterBottom";
import FooterDecorations from "./FooterDecorations";

export default function Footer() {
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
        >
            <h2
                id="footer-heading"
                className="sr-only"
            >
                Medcity Study Abroad footer
            </h2>

            <FooterDecorations />

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
                <FooterBrand />
                <FooterAbout />
                <FooterQuickLinks />
                <FooterContact />
            </div>

            <FooterBottom />
        </footer>
    );
}