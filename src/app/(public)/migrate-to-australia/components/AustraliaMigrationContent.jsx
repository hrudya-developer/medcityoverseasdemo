import AustraliaMigrationBenefits from "./AustraliaMigrationBenefits";
import AustraliaMigrationHero from "./AustraliaMigrationHero";
import AustraliaMigrationPrograms from "./AustraliaMigrationPrograms";
import AustraliaMigrationSteps from "./AustraliaMigrationSteps";
import AustraliaPostMigration from "./AustraliaPostMigration";
import AustraliaMigrationFAQ from "./AustraliaMigrationFAQ";

// intro, beforeFaq and afterFaq are server-rendered sections from page.jsx.
export default function AustraliaMigrationContent({ intro = null, beforeFaq = null, afterFaq = null }) {
    return (
        <div className="overflow-hidden bg-white">

            <AustraliaMigrationHero />

            {intro}

            <AustraliaMigrationBenefits />

            <AustraliaMigrationSteps />

            <AustraliaMigrationPrograms />
            <AustraliaPostMigration />

            {beforeFaq}

            <MigrationDisclaimer />

            <AustraliaMigrationFAQ />

            {afterFaq}
        </div>
    );
}

function MigrationDisclaimer() {
    return (
        <aside
            aria-label="Australia migration information disclaimer"
            className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8"
        >
            <div
                className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950"
            >
                Visa requirements, occupation lists,
                invitation criteria, fees and processing
                arrangements can change. Confirm current
                requirements with the Australian
                Department of Home Affairs, a registered
                migration agent (MARA) or an Australian
                legal practitioner before applying.
            </div>
        </aside>
    );
}