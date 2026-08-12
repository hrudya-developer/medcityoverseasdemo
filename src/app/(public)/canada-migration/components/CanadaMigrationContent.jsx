import FAQ from "@/components/home/FAQ/FAQ";

import CanadaImmigrationPrograms from "./CanadaImmigrationPrograms";
import CanadaMigrationBenefits from "./CanadaMigrationBenefits";
import CanadaMigrationHero from "./CanadaMigrationHero";
import CanadaPRSteps from "./CanadaPRSteps";

export default function CanadaMigrationContent() {
    return (
        <>
            <div className="overflow-hidden bg-white">
                <CanadaMigrationHero />

                <CanadaMigrationBenefits />

                <CanadaPRSteps />

                <CanadaImmigrationPrograms />

                <MigrationDisclaimer />

                <section
                    aria-labelledby="canada-migration-faq-heading"
                    className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
                >
                    <h2
                        id="canada-migration-faq-heading"
                        className="sr-only"
                    >
                        Canada Migration Frequently Asked Questions
                    </h2>

                    <FAQ />
                </section>
            </div>
        </>
    );
}

function MigrationDisclaimer() {
    return (
        <aside
            aria-labelledby="canada-migration-disclaimer-heading"
            className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8"
        >
            <div
                className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-5 text-sm leading-6 text-amber-950"
            >
                <h2
                    id="canada-migration-disclaimer-heading"
                    className="font-bold"
                >
                    Important immigration information
                </h2>

                <p className="mt-2">
                    The information on this page is general
                    information only and does not constitute
                    legal or immigration advice. Canadian
                    immigration programs, eligibility rules,
                    invitation criteria, fees, occupation
                    requirements and processing arrangements
                    may change without notice.
                </p>

                <p className="mt-2">
                    Always verify current requirements through
                    Immigration, Refugees and Citizenship Canada
                    or consult an appropriately authorized
                    Canadian immigration professional before
                    submitting an application or making financial
                    decisions.
                </p>
            </div>
        </aside>
    );
}