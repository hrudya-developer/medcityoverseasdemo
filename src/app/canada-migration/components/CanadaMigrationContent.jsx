import FAQ from "@/components/home/FAQ/FAQ";

import CanadaImmigrationPrograms from "./CanadaImmigrationPrograms";
import CanadaMigrationBenefits from "./CanadaMigrationBenefits";
import CanadaMigrationHero from "./CanadaMigrationHero";
import CanadaPRSteps from "./CanadaPRSteps";

export default function CanadaMigrationContent() {
    return (
        <main className="overflow-hidden bg-white">
            <CanadaMigrationHero />

            <CanadaMigrationBenefits />

            <CanadaPRSteps />

            <CanadaImmigrationPrograms />

            <MigrationDisclaimer />

            <section
                aria-label="Canada migration frequently asked questions"
                className="
                    mx-auto max-w-7xl
                    px-4 py-14
                    sm:px-6
                    lg:px-8 lg:py-20
                "
            >
                <FAQ />
            </section>
        </main>
    );
}

function MigrationDisclaimer() {
    return (
        <aside
            className="
                mx-auto max-w-7xl
                px-4 pt-12
                sm:px-6
                lg:px-8
            "
            aria-label="Immigration information disclaimer"
        >
            <div
                className="
                    rounded-2xl
                    border border-amber-200
                    bg-amber-50
                    px-5 py-4
                    text-sm leading-6
                    text-amber-950
                "
            >
                Immigration requirements, eligibility
                rules, fees, processing times and draw
                criteria can change. The information on
                this page is general guidance and should
                be confirmed with the relevant Canadian
                immigration authority before applying.
            </div>
        </aside>
    );
}