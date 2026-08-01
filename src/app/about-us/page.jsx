import FAQ from "@/components/home/FAQ/FAQ";

import AboutHero from "./components/AboutHero";
import AboutStats from "./components/AboutStats";
import ChairmanSection from "./components/ChairmanSection";
import CoreValues from "./components/CoreValues";
import StorySection from "./components/StorySection";

export default function AboutUsPage() {
    return (
        <main
            id="main-content"
            className="overflow-hidden bg-white"
        >
            <AboutHero />
            <AboutStats />
            <StorySection />
            <ChairmanSection />
            <CoreValues />
            <FAQ />
        </main>
    );
}