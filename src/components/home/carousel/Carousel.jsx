"use client";

import dynamic from "next/dynamic";

import HeroSocialLinks from "./HeroSocialLinks";
import WebsiteSwitchVertical from "../../header/WebsiteSwitchVertical";

const HeroVideo = dynamic(
    () => import("./HeroVideo"),
    {
        ssr: false,
        loading: () => (
            <div className="absolute inset-0 bg-black" />
        ),
    }
);

const Carousel = () => {
    return (
        <section
            id="hero-section"
            aria-label="Medcity Study Abroad introduction"
            className="relative isolate w-full overflow-hidden bg-black"
        >
            <div className="relative w-full overflow-hidden bg-black aspect-video max-md:h-[calc(100svh-4rem)] max-md:aspect-auto">
                <HeroVideo />

                <div className="absolute left-0 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
                    <WebsiteSwitchVertical />
                </div>

                <HeroSocialLinks />
            </div>
        </section>
    );
};

export default Carousel;