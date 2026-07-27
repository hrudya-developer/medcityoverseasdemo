import Link from "next/link";

import HeroSocialLinks from "./HeroSocialLinks";
import WebsiteSwitchVertical from "../header/WebsiteSwitchVertical";
import HeroVideo from "./HeroVideo";

const Carousel = () => {
    return (
        <section
            id="hero-section"
            aria-labelledby="hero-heading"
            className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-black
      "
        >
            <div
                className="
          relative
          min-h-[calc(100svh-4rem)]
          w-full
          overflow-hidden
          bg-black
          lg:min-h-[calc(100svh-4.75rem)]
        "
            >
                {/* Responsive desktop/mobile video */}
                <HeroVideo />


                {/* Desktop website switch */}
                <div
                    className="
            absolute
            left-0
            top-1/2
            z-30
            hidden
            -translate-y-1/2
            lg:block
          "
                >
                    <WebsiteSwitchVertical />
                </div>

                {/* Desktop social links */}
                <HeroSocialLinks />
            </div>
        </section>
    );
};

export default Carousel;