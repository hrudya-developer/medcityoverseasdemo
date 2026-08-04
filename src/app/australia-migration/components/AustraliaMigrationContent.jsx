import FAQ from "@/components/home/FAQ/FAQ";

import AustraliaMigrationBenefits from "./AustraliaMigrationBenefits";
import AustraliaMigrationHero from "./AustraliaMigrationHero";
import AustraliaMigrationPrograms from "./AustraliaMigrationPrograms";
import AustraliaMigrationSteps from "./AustraliaMigrationSteps";
import AustraliaPostMigration from "./AustraliaPostMigration";

export default function AustraliaMigrationContent() {
    return (
        <main className="overflow-hidden bg-white">

            <AustraliaMigrationHero />

            <AustraliaMigrationBenefits />

            <AustraliaMigrationSteps />

            <AustraliaMigrationPrograms />
            <AustraliaPostMigration />

            <section
                aria-label="Australia migration frequently asked questions"
                className="
                    mx-auto max-w-9xl
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
            aria-label="Australia migration information disclaimer"
            className="
                mx-auto max-w-7xl
                px-4 pt-12
                sm:px-6
                lg:px-8
            "
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
                Visa requirements, occupation lists,
                invitation criteria, fees and processing
                arrangements can change. Confirm current
                requirements with the Australian
                Department of Home Affairs or an
                appropriately authorised professional
                before applying.
            </div>
        </aside>
    );
}