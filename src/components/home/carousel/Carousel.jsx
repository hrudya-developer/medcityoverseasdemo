"use client";

import HeroVideo from "./HeroVideo";
import HeroSocialLinks from "./HeroSocialLinks";

import WebsiteSwitchVertical from "../../header/WebsiteSwitchVertical";

export default function Carousel() {
    return (
        <section
            id="hero-section"
            aria-label="Medcity Study Abroad introduction"
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
                    aspect-video
                    w-full
                    overflow-hidden
                    bg-black

                    max-md:h-[calc(100svh-4rem)]
                    max-md:aspect-auto
                "
            >
                <HeroVideo />

                {/* WEBSITE SWITCH */}

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

                {/* SOCIAL LINKS */}

                <HeroSocialLinks />
            </div>
        </section>
    );
}