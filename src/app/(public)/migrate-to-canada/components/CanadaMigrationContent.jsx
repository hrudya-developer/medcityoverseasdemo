import CanadaImmigrationPrograms from "./CanadaImmigrationPrograms";
import CanadaMigrationBenefits from "./CanadaMigrationBenefits";
import CanadaMigrationHero from "./CanadaMigrationHero";
import CanadaPRSteps from "./CanadaPRSteps";
import StudyInCanadaFAQ from "./CanadaMigrationFAQ";

export default function CanadaMigrationContent() {
  return (
    <main className="overflow-hidden bg-white">
      {/* H1 should be inside CanadaMigrationHero */}
      <CanadaMigrationHero />

      {/* Supporting sections should use H2 headings internally */}
      <CanadaMigrationBenefits />

      <CanadaPRSteps />

      <CanadaImmigrationPrograms />

      <MigrationDisclaimer />

      {/* This component already contains its own section + H2 */}
      <StudyInCanadaFAQ />
    </main>
  );
}

function MigrationDisclaimer() {
  return (
    <aside
      aria-labelledby="canada-migration-disclaimer-heading"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-5 text-sm leading-7 text-amber-950 sm:px-6">
        <h2
          id="canada-migration-disclaimer-heading"
          className="text-base font-bold"
        >
          Important Canada immigration information
        </h2>

        <p className="mt-3">
          The information provided on this page is for general
          informational purposes only and should not be considered
          legal or immigration advice. Canadian immigration programs,
          eligibility requirements, fees, occupation criteria,
          invitation rules and processing procedures may change.
        </p>

        <p className="mt-3">
          Applicants should verify the latest requirements through
          Immigration, Refugees and Citizenship Canada (IRCC) or seek
          advice from an appropriately authorized Canadian immigration
          professional before submitting an application or making
          financial decisions.
        </p>
      </div>
    </aside>
  );
}