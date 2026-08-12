import CanadaExpressEntry from "./CanadaExpressEntry";
import CanadaFamilySponsorship from "./CanadaFamilySponsorship";
import CanadaOpportunityCard from "./CanadaOpportunityCard";
import CanadaPNPOverview from "./CanadaPNPOverview";
import CanadaVisaStartup from "./CanadaVisaStartup";
import CanadaWorkPermits from "./CanadaWorkPermits";

export default function CanadaImmigrationPrograms() {
    return (
        <section
            id="canada-immigration-programs"
            aria-labelledby="canada-programs-heading"
            className="scroll-mt-24"
        >
            <h2
                id="canada-programs-heading"
                className="sr-only"
            >
                Canada Immigration Programs
            </h2>

            <div
                className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-2 xl:gap-7"
            >
                <CanadaExpressEntry />
                <CanadaVisaStartup />
                <CanadaPNPOverview />
                <CanadaFamilySponsorship />
                <CanadaWorkPermits />
                <CanadaOpportunityCard />
            </div>
        </section>
    );
}