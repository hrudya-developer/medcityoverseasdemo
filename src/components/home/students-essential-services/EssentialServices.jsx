import EssentialServiceCard from "./EssentialServiceCard";
import EssentialServicesHeader from "./EssentialServicesHeader";
import { essentialServices } from "./essentialServicesData";

const EssentialServices = () => {
    return (
        <section
            id="essential-services"
            aria-labelledby="essential-services-heading"
            className="
        relative isolate overflow-hidden
        bg-[url('/assets/students-essential-services.webp')]
        bg-cover bg-center bg-no-repeat
        px-4 py-16
        sm:px-6 sm:py-20
        lg:px-8 lg:py-24
      "
        >
            {/* Dark background overlay */}
            <div
                aria-hidden="true"
                className="
          absolute inset-0 -z-10
          bg-gradient-to-b
          from-black/90
          via-black/85
          to-[#160810]/95
        "
            />

            {/* Pink glow */}
            <div
                aria-hidden="true"
                className="
          absolute -left-40 top-1/3 -z-10
          h-[420px] w-[420px]
          rounded-full bg-primary/15 blur-[120px]
        "
            />

            {/* Blue glow */}
            <div
                aria-hidden="true"
                className="
          absolute -right-40 bottom-0 -z-10
          h-[400px] w-[400px]
          rounded-full bg-secondary/15 blur-[120px]
        "
            />

            {/* Top decorative line */}
            <div
                aria-hidden="true"
                className="
          absolute left-1/2 top-0
          h-px w-2/3 -translate-x-1/2
          bg-gradient-to-r
          from-transparent via-primary/70 to-transparent
        "
            />

            <div className="mx-auto max-w-[1600px]">
                <EssentialServicesHeader />

                <div
                    className="
            grid grid-cols-1 gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
                >
                    {essentialServices.map((service) => (
                        <EssentialServiceCard
                            key={service.id}
                            {...service}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EssentialServices;