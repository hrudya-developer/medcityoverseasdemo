import ServicesBackground from "./ServicesBackground";
import ServicesGrid from "./ServicesGrid";
import ServicesHeader from "./ServicesHeader";

import {
    services,
} from "./servicesData";

export default function ServicesSection() {
    return (
        <section
            id="study-abroad-services"
            aria-labelledby="essential-services-title"
            aria-describedby="essential-services-description"
            className="relative isolate overflow-hidden bg-white px-4 py-14 [content-visibility:auto] [contain-intrinsic-size:700px] sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        >
            <ServicesBackground />

            <div
                className="relative mx-auto max-w-9xl"
            >
                <ServicesHeader />

                <ServicesGrid
                    services={services}
                />
            </div>
        </section>
    );
}