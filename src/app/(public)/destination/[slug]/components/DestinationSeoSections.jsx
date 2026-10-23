import Link from "next/link";

import OfficialSources from "@/components/seo/OfficialSources";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";
import { officialSourcesFor } from "@/lib/officialSources";
import { joinList } from "@/lib/seoSchema";

/*
 * Server-rendered blocks for a /study-in-[country] page, built from the
 * country record and the counts in lib/countryFacts.js. Fields the
 * database does not hold are left out of the text.
 */

// The date these blocks were last changed; a page shows this or its
// newest university or course record, whichever is later.
export const DESTINATION_TEMPLATE_UPDATED = "2026-10-23";

function value(text) {
    const clean = String(text ?? "").replace(/\s+/g, " ").trim();

    return clean && clean.toLowerCase() !== "n/a" ? clean : "";
}

export function destinationSummary(countryName, country, facts) {
    const sentences = [];

    if (facts?.universities > 0) {
        sentences.push(
            `Medcity Overseas lists ${facts.universities} ${facts.universities === 1 ? "university" : "universities"} in ${countryName}${
                facts.courses > 0 ? ` with ${facts.courses.toLocaleString("en-IN")} courses between them` : ""
            }${facts.cities.length ? `, in cities such as ${joinList(facts.cities.slice(0, 3).map((city) => city.name))}` : ""}.`
        );
    } else {
        sentences.push(`Medcity Overseas helps Indian students plan their studies in ${countryName}.`);
    }

    const capital = value(country?.capital);
    const language = value(country?.language);
    const currency = value(country?.currency);
    const details = [
        capital && `the capital is ${capital}`,
        language && `the main language is ${language}`,
        currency && `the currency is ${currency}`,
    ].filter(Boolean);

    if (details.length) {
        const text = joinList(details);

        sentences.push(`In ${countryName}, ${text}.`);
    }

    sentences.push(`Our counsellors in Kerala guide you through course choice, applications and the ${countryName} student visa.`);

    return sentences.join(" ");
}

export function DestinationInShort({ countryName, country, facts, updated }) {
    return (
        <div className="space-y-12 pb-12">
            <QuickAnswer updated={updated}>{destinationSummary(countryName, country, facts)}</QuickAnswer>

            <QuestionAnswer
                eyebrow="Getting started"
                question={`How can Indian students study in ${countryName}?`}
                answer={`To study in ${countryName} from India, choose a course and university, check its entry requirements and English test scores, and apply before the intake deadline. After you receive an offer, prepare proof of funds and apply for the ${countryName} student visa. Medcity Overseas guides Kerala students through each of these steps.`}
                points={[
                    { title: "Choose", text: "shortlist courses and universities that fit your profile." },
                    { title: "Prepare", text: "take the English test and gather your documents." },
                    { title: "Apply", text: "send applications before the intake deadline." },
                    { title: "Visa", text: "apply for the student visa once you hold an offer." },
                ]}
                ordered
            />
        </div>
    );
}

export function DestinationLinks({ countryName, destinationSlug }) {
    return (
        <div className="space-y-12 bg-white py-14">
            <p className="mx-auto max-w-5xl px-4 text-sm leading-7 text-slate-600 sm:px-6 lg:px-8">
                Compare{" "}
                <Link href={`/universities-in-${destinationSlug}`} className="font-bold text-primary hover:underline">
                    universities in {countryName}
                </Link>
                , search the{" "}
                <Link href="/courses" className="font-bold text-primary hover:underline">
                    course finder
                </Link>
                , see all{" "}
                <Link href="/destinations" className="font-bold text-primary hover:underline">
                    study destinations
                </Link>{" "}
                or{" "}
                <Link href="/contact-us" className="font-bold text-primary hover:underline">
                    book free counselling
                </Link>
                .
            </p>

            <OfficialSources title={`Official sources for studying in ${countryName}`} links={officialSourcesFor(destinationSlug)} />
        </div>
    );
}
