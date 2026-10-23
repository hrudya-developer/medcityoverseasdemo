import {
    notFound,
} from "next/navigation";

import {
    centers,
} from "../../branches/data/centersData";

import BranchHero from "./components/BranchHero";
import BranchContactBar from "./components/BranchContactBar";
import BranchAbout from "./components/BranchAbout";
import BranchServices from "./components/BranchServices";
import BranchLocation from "./components/BranchLocation";
import BranchCTA from "./components/BranchCTA";

import {
    buildBranchMetadata,
} from "./seo/branchSeo";

import BranchSchema from "./seo/BranchSchema";
import BranchFAQ from "./components/BranchFAQ";
import { withSeoOverrides } from "@/lib/pageSeo";
import OfficialSources from "@/components/seo/OfficialSources";
import QuestionAnswer from "@/components/seo/QuestionAnswer";
import QuickAnswer from "@/components/seo/QuickAnswer";
import { STUDY_ABROAD_SOURCES } from "@/lib/officialSources";
import { BRANCH_CONTENT_UPDATED } from "./seo/branchSeo";

function branchLocation(center) {
    return String(center?.seoLocation || center?.city || center?.district || "").trim();
}

function branchPhone(center) {
    const display = Array.isArray(center?.phones) ? String(center.phones[0] ?? "").trim() : "";

    return { display, tel: display.replace(/[^\d+]/g, "") };
}

/* =========================================================
   GET CENTER
========================================================= */

function getCenterBySlug(
    slug
) {
    return centers.find(
        (center) =>
            center.slug === slug
    );
}

/* =========================================================
   STATIC PARAMS
========================================================= */

export function generateStaticParams() {
    return centers.map(
        (center) => ({
            slug:
                center.slug,
        })
    );
}

/* =========================================================
   METADATA
========================================================= */

async function pageGenerateMetadata({
    params,
}) {
    const { slug } =
        await params;

    const center =
        getCenterBySlug(slug);

    return buildBranchMetadata(
        center
    );
}

/* =========================================================
   PAGE
========================================================= */

export default async function BranchPage({
    params,
}) {
    const { slug } =
        await params;

    const center =
        getCenterBySlug(slug);

    if (!center) {
        notFound();
    }

    return (
        <>
            <BranchSchema
                center={center}
            />

            <div className="overflow-hidden bg-white">
                <BranchHero
                    center={center}
                />

                <BranchContactBar
                    center={center}
                />

                <QuickAnswer
                    className="pt-10"
                    updated={BRANCH_CONTENT_UPDATED}
                    phone={branchPhone(center).tel || undefined}
                    phoneDisplay={branchPhone(center).display || undefined}
                    whatsapp={branchPhone(center).tel ? null : undefined}
                >
                    {`${center.name} is a Medcity Overseas branch for students looking for study abroad consultants in ${branchLocation(center)}${
                        center.address ? `, at ${center.address}` : ""
                    }. Visit for one-to-one counselling on courses, universities, applications, language preparation and student visas${
                        branchPhone(center).display ? `, or call ${branchPhone(center).display}` : ""
                    }.`}
                </QuickAnswer>

                <QuestionAnswer
                    className="pt-12"
                    eyebrow="Services"
                    question={`What does Medcity Overseas ${branchLocation(center)} help with?`}
                    answer={`Medcity Overseas ${branchLocation(center)} helps students plan their study abroad journey from the first counselling session to departure. Counsellors help you choose a country, course and university, prepare applications and documents, get ready for language tests and follow the student visa and pre-departure steps.`}
                    points={[
                        { title: "Counselling", text: "one-to-one advice on countries, courses and universities." },
                        { title: "Applications", text: "documents, statements and university applications." },
                        { title: "Language preparation", text: "IELTS, PTE, OET and German language guidance." },
                        { title: "Visa and departure", text: "student visa guidance and pre-departure support." },
                    ]}
                />

                <BranchAbout
                    center={center}
                />

                <BranchServices
                    center={center}
                />

                <BranchLocation
                    center={center}
                />

                <BranchCTA
                    center={center}
                />
               <BranchFAQ center={center} />

                <OfficialSources
                    className="pb-16"
                    title="Official visa information"
                    links={STUDY_ABROAD_SOURCES}
                />
            </div>
        </>
    );
}

// Search details edited in the admin apply on top of the page's own.
export const generateMetadata = withSeoOverrides(pageGenerateMetadata);
