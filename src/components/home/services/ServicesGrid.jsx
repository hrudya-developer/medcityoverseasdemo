import ServiceCard from "./ServiceCard";

export default function ServicesGrid({
    services,
}) {
    return (
        <div
            role="list"
            aria-label="Study abroad consulting services"
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
        >
            {services.map(
                (service, index) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        index={index}
                    />
                )
            )}
        </div>
    );
}